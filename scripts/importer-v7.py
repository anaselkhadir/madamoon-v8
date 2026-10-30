#!/usr/bin/env python3
"""
Recopie la matière vérifiée du site actuel (projet madamoon-v7, qui est le site
en ligne madamoon.fr) dans MADAMOON V8 : données typées (robes, maisons,
morphologies, FAQ, avis, films), manifeste des médias, et médias eux-mêmes.
Rien n'est réécrit à la main : relancer ce script quand la v7 change.
"""
import os, re, shutil, subprocess, sys, datetime
V7 = os.path.expanduser("~/Desktop/madamoon-v7")
V8 = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENU = os.path.join(V8, "src", "content")
os.makedirs(CONTENU, exist_ok=True)
DATE = datetime.date.today().isoformat()
ENTETE = f"/* Recopié de madamoon-v7/lib/{{nom}}.ts le {DATE} par scripts/importer-v7.py — ne pas modifier ici : corriger la source. */\n"

MODULES: list[str] = []  # depuis le pivot du 30/10/2026, lib/ est le code v7 lui-même : rien à recopier
for nom in MODULES:
    src = os.path.join(V7, "lib", f"{nom}.ts")
    s = open(src, encoding="utf-8").read()
    s = s.replace('from "@/lib/', 'from "@/content/')
    if nom == "madamoon":
        # Élise (conseillère IA) et sa clé publique Supabase ne font pas partie de la matière du site.
        s = re.sub(r"\n/\* [—\-]+ Élise, conseillère [—\-]+ \*/.*$", "\n", s, flags=re.S)
    open(os.path.join(CONTENU, f"{nom}.ts"), "w", encoding="utf-8").write(ENTETE.format(nom=nom) + s)
    print("données :", nom, f"({s.count(chr(10))} lignes)")

# Médias : photographies, scènes, films, image de partage, marque.
for d in ["robes", "scenes", "film", "partage", "marque", "croquis", "catalogues"]:
    src = os.path.join(V7, "public", d) + "/"
    dst = os.path.join(V8, "public", d) + "/"
    os.makedirs(dst, exist_ok=True)
    subprocess.run(["rsync", "-a", "--delete", "--exclude", ".gitkeep", src, dst], check=True)
    n = sum(len(f) for _, _, f in os.walk(dst))
    print("médias :", d, n, "fichiers")
