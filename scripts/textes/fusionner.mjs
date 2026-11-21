// Fusion : le fichier d'origine, où seules les chaînes autorisées (r, chapo,
// texte[], liste[], aRetenir[], hors « style ») sont remplacées par celles du
// rédacteur. Tout le reste est donc identique à l'octet près.
// usage : node fusionner.mjs <dossier> <lot …>
import fs from "node:fs";
import path from "node:path";
const [, , S, ...noms] = process.argv;
const RE = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`|[A-Za-z_][A-Za-z0-9_]*(?=\s*:)|[\[\]{}]/g;
const TABLEAUX = new Set(["texte", "liste", "aRetenir"]), DIRECTS = new Set(["r", "chapo"]);

function autorisees(code) {
  const pile = []; let cle = null; const out = [];
  for (const m of code.matchAll(RE)) {
    const t = m[0], i = m.index;
    if (t.startsWith("/*") || t.startsWith("//")) continue;
    const haut = pile.at(-1);
    if (t === "[" || t === "{") { pile.push({ type: t, cle: haut?.type === "[" ? haut.cle : cle }); cle = null; continue; }
    if (t === "]" || t === "}") { pile.pop(); cle = null; continue; }
    if (t[0] === '"' || t[0] === "`") {
      if (/^\s*:/.test(code.slice(i + t.length, i + t.length + 6)) && haut?.type === "{") { cle = t.slice(1, -1); continue; } // clé entre guillemets
      const dansStyle = pile.some((p) => p.cle === "style");
      const ok = !dansStyle && ((haut?.type === "[" && TABLEAUX.has(haut.cle)) || (haut?.type === "{" && DIRECTS.has(cle)));
      if (ok) out.push({ i, n: t.length, src: t });
      cle = haut?.type === "{" ? null : cle;
      continue;
    }
    cle = t; // identifiant suivi de « : »
  }
  return out;
}

// La typographie des fichiers d'origine (coupes, morphologies, FAQ) : espace
// insécable avant « : », fine insécable avant « ? », insécable dans les nombres.
const typo = (s, faq) => {
  let x = s.replace(/[   ]:/g, " :").replace(/[   ]\?/g, " ?");
  if (faq) x = x.replace(/(\d)[  ](\d{3})(?!\d)/g, "$1 $2").replace(/[  ]€/g, " €");
  return x;
};

fs.mkdirSync(path.join(S, "lots-fusion"), { recursive: true });
for (const nom of noms) {
  const a = fs.readFileSync(path.join(S, "lots-avant", nom + ".ts"), "utf8");
  const b = fs.readFileSync(path.join(S, "lots", nom + ".ts"), "utf8");
  const la = autorisees(a), lb = autorisees(b);
  if (la.length !== lb.length) { console.log(`✗ ${nom} : ${la.length} chaînes autorisées à l'origine, ${lb.length} chez le rédacteur — fusion impossible`); continue; }
  let out = a, change = 0;
  for (let k = la.length - 1; k >= 0; k--) {
    let src = lb[k].src;
    if (!nom.startsWith("g")) src = typo(src, nom.startsWith("q"));
    if (src !== la[k].src) change++;
    out = out.slice(0, la[k].i) + src + out.slice(la[k].i + la[k].n);
  }
  fs.writeFileSync(path.join(S, "lots-fusion", nom + ".ts"), out);
  console.log(`✓ ${nom} : ${la.length} chaînes autorisées, ${change} réécrites`);
}
