#!/usr/bin/env python3
"""Sitemap prévisionnel et table de redirections depuis src/content/arborescence.json."""
import json, csv, os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
A = json.load(open(os.path.join(ROOT, "src", "content", "arborescence.json"), encoding="utf-8"))
rows = []
for p in A["pages"]:
    n = 67 if p["url"] == "/robes/[slug]/" else 1
    rows.append([p["url"], p.get("en", ""), p["titre"], p["type"], p["cluster"], p["priorite"], p["statut"], p["sitemap"], p["freq"], n])
with open(os.path.join(ROOT, "seo-research", "sitemap-previsionnel.csv"), "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh, delimiter=";")
    w.writerow(["URL FR", "URL EN", "Titre de travail", "Type", "Cluster", "Priorité", "Statut", "Priorité sitemap", "Fréquence", "Nb d'URL"])
    w.writerows(rows)
with open(os.path.join(ROOT, "docs", "REDIRECTIONS.csv"), "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh, delimiter=";")
    w.writerow(["De", "Vers", "Code", "Motif"])
    for r in A["redirections"]:
        w.writerow([r["de"], r["vers"], r["code"], r["motif"]])
fr = sum(r[9] for r in rows)
en = sum((67 if r[0] == "/robes/[slug]/" else 1) for r in rows if r[1])
print(f"pages FR : {fr} (dont 67 fiches) ; pages EN : {en} ; total sitemap ≈ {fr + en}")
print("statuts :", {s: sum(1 for r in rows if r[6].split(' ')[0] == s) for s in ['existante', 'existantes', 'à']})
