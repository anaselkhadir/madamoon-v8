#!/usr/bin/env python3
"""
Mesure l'implantation de la base de mots-clés dans le site construit (out/).

Pour chaque expression ciblée (page_cible renseignée) :
  - verbatim_page   : l'expression, accents et apostrophes neutralisés, figure
                      telle quelle sur sa page cible ;
  - verbatim_site   : … quelque part sur le site français ;
  - vocabulaire     : tous ses mots pleins (singulier/pluriel confondus) sont
                      sur la page cible — ce que Google rapproche sans peine ;
  - page_existe     : la page cible est construite.

Sorties dans seo-research/build/ : implantation_<date>.csv (une ligne par
expression), implantation_pages_<date>.csv (synthèse par page), et
implantation_<date>.md (le résumé lisible, avec les manques par page).

À relancer après chaque build : `npm run build:hostinger` puis ce script.
"""
import csv, html, json, os, re, sys, unicodedata, collections
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BUILD = os.path.join(ROOT, "seo-research", "build")
OUT_HTML = os.path.join(ROOT, "out")
JOUR = date.today().isoformat()

STOP = set("de du des la le les l d un une a au aux en et pour sur avec ou ma mon mes sa son ses pas ce cette".split())


def norm(t):
    t = t.replace("œ", "oe").replace("Œ", "oe").replace("æ", "ae")
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode().lower()
    # la ponctuation ne fait pas partie des mots : « rouge, » est « rouge »
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


# Ce que Google tient pour le même mot : la mariée, le mariage, se marier ;
# bohème et boho ; cher et chère. Le pluriel tombe avec le s ou le x final.
EQUIV = {"mariage": "mariee", "mariages": "mariee", "marier": "mariee", "marie": "mariee", "maries": "mariee",
         "mariees": "mariee", "mari": "mariee", "bohemienne": "boheme", "boho": "boheme", "bohemes": "boheme",
         "chere": "cher", "cheres": "cher", "chers": "cher", "prix": "prix", "sirenes": "sirene", "princesses": "princesse",
         "trapezes": "trapeze", "fluides": "fluide", "dentelles": "dentelle", "manche": "manche", "longues": "longue",
         "longs": "long", "courtes": "courte", "courts": "court", "simples": "simple", "blanches": "blanche", "blancs": "blanc",
         "femmes": "femme", "rondes": "ronde", "petites": "petite", "grandes": "grande", "tailles": "taille"}


def stem(m):
    m = EQUIV.get(m, m)
    return EQUIV.get(re.sub(r"(s|x)$", "", m), re.sub(r"(s|x)$", "", m))


def mots(k):
    return [stem(m) for m in norm(k).split() if m not in STOP and len(m) > 1]


def pages_construites():
    pages = {}
    for root, _, files in os.walk(OUT_HTML):
        if "index.html" not in files:
            continue
        rel = os.path.relpath(root, OUT_HTML).replace("\\", "/")
        url = "/" if rel == "." else "/" + rel.strip("/") + "/"
        h = open(os.path.join(root, "index.html"), encoding="utf8", errors="ignore").read()
        h = re.sub(r"<script[^>]*>.*?</script>|<style[^>]*>.*?</style>", "", h, flags=re.S)
        texte = norm(html.unescape(re.sub(r"<[^>]+>", " ", h)))
        pages[url] = {"texte": texte, "mots": set(stem(m) for m in texte.split())}
    return pages


def main():
    base = json.load(open(os.path.join(BUILD, "base_mots_cles.json")))["base"]
    pages = pages_construites()
    fr = {u: p for u, p in pages.items() if not u.startswith("/en/")}
    tout = " \n ".join(p["texte"] for p in fr.values())
    cibles = [b for b in base if b.get("page_cible") and not b["page_cible"].startswith("—")]
    lignes = []
    for b in cibles:
        pc = b["page_cible"].strip()
        k = norm(b["keyword"])
        page = fr.get(pc)
        vp = bool(page) and k in page["texte"]
        vs = k in tout
        voc = bool(page) and all(m in page["mots"] for m in mots(k))
        lignes.append({
            "page_cible": pc, "keyword": b["keyword"], "volume": b.get("volume") or 0,
            "volume_verifie": b.get("volume_verifie", "oui (Semrush)"), "kd": b.get("kd"),
            "intention": b.get("intention"), "cluster": b.get("cluster"), "groupe": b.get("groupe_variantes"),
            "page_existe": bool(page), "verbatim_page": vp, "verbatim_site": vs, "vocabulaire": voc,
            "mots_manquants": "" if not page else " ".join(m for m in mots(k) if m not in page["mots"]),
        })
    n = len(lignes)
    tot = lambda f: sum(1 for l in lignes if l[f])
    vol = sum(l["volume"] for l in lignes)
    vol_f = lambda f: sum(l["volume"] for l in lignes if l[f])
    par_page = collections.defaultdict(list)
    for l in lignes:
        par_page[l["page_cible"]].append(l)

    with open(os.path.join(BUILD, f"implantation_{JOUR}.csv"), "w", newline="", encoding="utf8") as f:
        w = csv.DictWriter(f, fieldnames=list(lignes[0].keys()), delimiter=";")
        w.writeheader()
        w.writerows(sorted(lignes, key=lambda x: (x["page_cible"], -x["volume"])))
    synth = []
    for pc, ls in sorted(par_page.items(), key=lambda kv: -sum(l["volume"] for l in kv[1])):
        synth.append({
            "page_cible": pc, "existe": ls[0]["page_existe"], "expressions": len(ls),
            "verbatim_page": sum(1 for l in ls if l["verbatim_page"]),
            "vocabulaire": sum(1 for l in ls if l["vocabulaire"]),
            "couvertes": sum(1 for l in ls if l["verbatim_page"] or l["vocabulaire"]),
            "volume": sum(l["volume"] for l in ls),
            "volume_couvert": sum(l["volume"] for l in ls if l["verbatim_page"] or l["vocabulaire"]),
        })
    with open(os.path.join(BUILD, f"implantation_pages_{JOUR}.csv"), "w", newline="", encoding="utf8") as f:
        w = csv.DictWriter(f, fieldnames=list(synth[0].keys()), delimiter=";")
        w.writeheader()
        w.writerows(synth)

    couv = sum(1 for l in lignes if l["verbatim_page"] or l["vocabulaire"])
    md = [f"# Implantation des mots-clés — {JOUR}", "",
          f"Base : {len(base)} expressions, dont {n} ciblées sur {len(par_page)} pages "
          f"({sum(1 for p in par_page if p in fr)} construites). Volume ciblé : {vol:,}.".replace(",", " "), "",
          "| Mesure | Expressions | Part | Volume |", "|---|---:|---:|---:|",
          f"| Verbatim sur la page cible | {tot('verbatim_page')} | {tot('verbatim_page')/n:.0%} | {vol_f('verbatim_page'):,} |".replace(",", " "),
          f"| Verbatim quelque part sur le site | {tot('verbatim_site')} | {tot('verbatim_site')/n:.0%} | {vol_f('verbatim_site'):,} |".replace(",", " "),
          f"| Vocabulaire complet sur la page cible | {tot('vocabulaire')} | {tot('vocabulaire')/n:.0%} | {vol_f('vocabulaire'):,} |".replace(",", " "),
          f"| **Couvertes (verbatim ou vocabulaire)** | **{couv}** | **{couv/n:.0%}** | **{sum(l['volume'] for l in lignes if l['verbatim_page'] or l['vocabulaire']):,}** |".replace(",", " "),
          "", "## Par page", "", "| Page | Existe | Expressions | Verbatim | Vocabulaire | Couvertes | Volume |", "|---|---|---:|---:|---:|---:|---:|"]
    for s in synth:
        md.append(f"| `{s['page_cible']}` | {'oui' if s['existe'] else 'non'} | {s['expressions']} | {s['verbatim_page']} | {s['vocabulaire']} | {s['couvertes']} | {s['volume']:,} |".replace(",", " "))
    md += ["", "## Manques par page (non couvertes, par volume puis par mots manquants)", ""]
    for s in synth:
        if not s["existe"]:
            continue
        manq = [l for l in par_page[s["page_cible"]] if not (l["verbatim_page"] or l["vocabulaire"])]
        if not manq:
            continue
        manq.sort(key=lambda l: -l["volume"])
        md.append(f"### `{s['page_cible']}` — {len(manq)} non couvertes")
        md.append("")
        mm = collections.Counter(m for l in manq for m in l["mots_manquants"].split() if m)
        md.append("Mots manquants les plus fréquents : " + ", ".join(f"{m} ({c})" for m, c in mm.most_common(12)))
        md.append("")
        for l in manq[:15]:
            md.append(f"- {l['keyword']} ({l['volume']}{'' if l['volume_verifie'].startswith('oui') else ', non vérifié'})")
        md.append("")
    open(os.path.join(BUILD, f"implantation_{JOUR}.md"), "w", encoding="utf8").write("\n".join(md))
    print("\n".join(md[:12]))
    print(f"\nfichiers : build/implantation_{JOUR}.csv, implantation_pages_{JOUR}.csv, implantation_{JOUR}.md")


if __name__ == "__main__":
    main()
