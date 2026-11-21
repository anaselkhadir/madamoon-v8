// Compare les lots avant / après réécriture.
// usage : node comparer.mjs <dossier textes> <chemin lib/madamoon.ts> [lot …]
import fs from "node:fs";
import path from "node:path";

const [, , S, madamoon, ...seuls] = process.argv;
const lots = JSON.parse(fs.readFileSync(path.join(S, "lots.json"), "utf8"));

// ——— lecture d'un extrait : un littéral d'objet ou de tableau, évalué dans
// un bac à sable où tout identifiant inconnu rend un jeton « ${nom} ».
function jeton(nom) {
  const f = () => jeton(nom + "()");
  return new Proxy(f, {
    get: (_, k) => (k === Symbol.toPrimitive ? () => "${" + nom + "}" : k === "toString" ? () => "${" + nom + "}" : jeton(nom + "." + String(k))),
  });
}
function lire(fichier) {
  const code = fs.readFileSync(fichier, "utf8");
  const objet = /^\s*("[^"]+"|[A-Za-z0-9_]+):\s*\[/.test(code);
  const bac = new Proxy({}, { has: () => true, get: (_, k) => (k === Symbol.unscopables ? undefined : jeton(String(k))) });
  const src = objet ? "({" + code + "})" : "[" + code + "]";
  const v = new Function("B", "with(B){ return " + src + " }")(bac);
  return { code, articles: objet ? Object.values(v)[0] : v };
}

const norm = (t) =>
  t.replace(/œ/g, "oe").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// ——— lexiques
const noms = new Set(
  [...fs.readFileSync(madamoon, "utf8").matchAll(/nom:\s*"([^"]+)"/g)].map((m) => norm(m[1])).filter((n) => n && !n.includes(" ")),
);
["casablanca", "watters", "olya", "loretti", "madamoon", "bridgerton"].forEach((n) => noms.add(n));
const TERMES = `satin soie crepe mikado dentelle chantilly alencon caterina highclare mousseline tulle organza charmeuse georgette dupioni jacquard neoprene
perle perles perlee perle paillette paillettes strass brode brodee broderie corset bustier bretelle bretelles manche manches traine fente surjupe cape veste voile
poche poches bouton boutons lacage baleine baleines decollete bardot illusion sirene princesse trapeze fluide fourreau empire trompette courte ivoire blanc blanche
champagne mairie eglise civil civile religieuse hiver ete automne printemps champetre boheme vintage amovible amovibles detachable drape drapee ceinture doublure
retouche retouches essayage essayages acompte rendez semi mesure mesures location`.split(/\s+/);
const termes = new Set(TERMES);
const INTERDITS = [/catalogue/i, /\bfiches?\b/i, /est rangée/i, /\bVoici\b/, /!/, /incontournable/i, /plus beau jour/i, /écrin/i, /couper le souffle/i, /la boutique conseille/i];

const ens = (t, lex) => new Set(norm(t).split(" ").filter((m) => lex.has(m)));
const nombres = (t) => (t.match(/\d+(?:[\s ]\d{3})*/g) || []).map((x) => x.replace(/\s/g, "")).sort().join(",");
const lettres = (t) => [...t.matchAll(/\ben (O|A|V|H|8|X)\b/g)].map((m) => m[1]).sort().join("");
const citations = (t) => [...t.matchAll(/«\s*([^»]+?)\s*»/g)].map((m) => m[1]);
const mots = (t) => new Set(norm(t).split(" ").filter((m) => m.length > 3));

const AUTORISES = new Set(["r", "chapo"]);
let total = { chaines: 0, identiques: 0, graves: 0, alertes: 0, interdits: 0 };

for (const [nom] of lots) {
  if (seuls.length && !seuls.includes(nom)) continue;
  const fa = path.join(S, "lots-avant", nom + ".ts"), fb = path.join(S, process.env.LOTS || "lots", nom + ".ts");
  let A, B;
  try { A = lire(fa); } catch (e) { console.log(`\n## ${nom} : AVANT illisible ${e.message}`); continue; }
  try { B = lire(fb); } catch (e) { console.log(`\n## ${nom} : ✗ GRAVE après illisible — ${e.message}`); total.graves++; continue; }
  const graves = [], alertes = [];
  const la = A.code.split("\n"), lb = B.code.split("\n");
  if (la[0] !== lb[0]) graves.push("première ligne changée");
  if (la.filter(Boolean).at(-1) !== lb.filter(Boolean).at(-1)) graves.push("dernière ligne changée");
  if (A.articles.length !== B.articles.length) graves.push(`articles ${A.articles.length} → ${B.articles.length}`);
  let n = 0, ident = 0, interdits = 0, ratioSomme = 0;

  const paire = (a, b, ou) => {
    n++; total.chaines++;
    a = String(a); b = String(b);
    if (a === b) { ident++; total.identiques++; }
    for (const re of INTERDITS) if (re.test(b)) { interdits++; total.interdits++; alertes.push(`${ou} : tournure « ${b.match(re)[0]} » → ${b.slice(0, 90)}`); break; }
    if (nombres(a) !== nombres(b)) graves.push(`${ou} : chiffres [${nombres(a)}] → [${nombres(b)}]`);
    if (lettres(a) !== lettres(b)) graves.push(`${ou} : morphologies [${lettres(a)}] → [${lettres(b)}]`);
    const na = ens(a, noms), nb = ens(b, noms);
    const np = [...na].filter((x) => !nb.has(x)), nn = [...nb].filter((x) => !na.has(x));
    if (np.length) graves.push(`${ou} : noms perdus ${np.join(", ")}`);
    if (nn.length) graves.push(`${ou} : noms AJOUTÉS ${nn.join(", ")}`);
    const ta = ens(a, termes), tb = ens(b, termes);
    const tp = [...ta].filter((x) => !tb.has(x)), tn = [...tb].filter((x) => !ta.has(x));
    if (tn.length) alertes.push(`${ou} : termes ajoutés ${tn.join(", ")} | ${b.slice(0, 110)}`);
    if (tp.length) alertes.push(`${ou} : termes perdus ${tp.join(", ")} | ${a.slice(0, 80)} → ${b.slice(0, 80)}`);
    for (const c of citations(a)) if (!b.includes(c)) alertes.push(`${ou} : citation modifiée « ${c.slice(0, 60)} »`);
    for (const j of a.match(/\$\{[^}]+\}/g) || []) if (!b.includes(j)) graves.push(`${ou} : expression ${j} perdue`);
    const r = b.length / Math.max(a.length, 1); ratioSomme += r;
    if (a.length > 60 && (r < 0.7 || r > 1.4)) alertes.push(`${ou} : longueur ×${r.toFixed(2)}`);
    const ma = mots(a), mb = mots(b);
    const garde = [...ma].filter((x) => mb.has(x)).length / Math.max(ma.size, 1);
    if (ma.size > 8 && garde < 0.45) alertes.push(`${ou} : vocabulaire gardé ${(garde * 100) | 0} %`);
  };

  const marche = (a, b, ou, cle) => {
    if (typeof a === "string" || typeof b === "string" || typeof a === "function" || typeof b === "function") {
      const sa = String(a), sb = String(b);
      const libre = AUTORISES.has(cle) || /\.(texte|liste|aRetenir)\[\d+\]$/.test(ou);
      if (libre) paire(sa, sb, ou);
      else if (sa !== sb) graves.push(`${ou} : champ protégé modifié « ${sa.slice(0, 50)} » → « ${sb.slice(0, 50)} »`);
      return;
    }
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) { graves.push(`${ou} : ${a.length} éléments → ${Array.isArray(b) ? b.length : "?"}`); return; }
      a.forEach((x, i) => marche(x, b[i], `${ou}[${i}]`, cle));
      return;
    }
    if (a && typeof a === "object") {
      const ka = Object.keys(a), kb = Object.keys(b || {});
      if (ka.join() !== kb.join()) { graves.push(`${ou} : champs ${ka.join()} → ${kb.join()}`); return; }
      for (const k of ka) marche(a[k], b[k], `${ou}.${k}`, k);
      return;
    }
    if (a !== b) graves.push(`${ou} : ${a} → ${b}`);
  };
  const m = Math.min(A.articles.length, B.articles.length);
  for (let i = 0; i < m; i++) marche(A.articles[i], B.articles[i], A.articles[i].slug || `#${i}`, "");

  total.graves += graves.length; total.alertes += alertes.length;
  console.log(`\n## ${nom} : ${A.articles.length} articles, ${n} textes, ${ident} inchangés (${((ident / Math.max(n, 1)) * 100) | 0} %), longueur moyenne ×${(ratioSomme / Math.max(n, 1)).toFixed(2)} | graves ${graves.length}, alertes ${alertes.length}, tournures ${interdits}`);
  graves.forEach((g) => console.log("  ✗ " + g));
  if (process.env.ALERTES) alertes.forEach((g) => console.log("  · " + g));
}
console.log(`\nTOTAL : ${total.chaines} textes, ${total.identiques} inchangés, ${total.graves} graves, ${total.alertes} alertes, ${total.interdits} tournures à revoir`);
