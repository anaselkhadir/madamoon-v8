#!/usr/bin/env python3
"""
Contrôle qualité SEO technique du site construit (out/), phase 7.

Pour chaque page HTML : balise <title> (présente, unique, ≤ 60 signes),
meta description (présente, unique, ≤ 158), un seul <h1>, canonique
présent et égal à l'adresse servie, hreflang réciproques, attribut lang,
JSON-LD valide (et @type listés), images sans alt, liens internes qui
mènent à une page construite, Open Graph (image, url).
Puis le plan du site : chaque entrée existe, chaque page indexable y est.

Sortie : docs/QA-<date>.md et un résumé en console. Code de sortie 1 si
un défaut bloquant est trouvé (lien mort, canonique faux, H1 absent).
"""
import collections, html, json, os, re, sys
from datetime import date
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "out")
SITE = "https://madamoon.fr"
JOUR = date.today().isoformat()
LIMITE_TITLE, LIMITE_DESC = 60, 158


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self._dans_title = False
        self.metas = []
        self.links = []
        self.h1 = []
        self._dans_h1 = 0
        self.imgs = []
        self.hrefs = []
        self.scripts_ld = []
        self._dans_ld = False
        self.lang = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang", "")
        elif tag == "title":
            self._dans_title = True
        elif tag == "meta":
            self.metas.append(a)
        elif tag == "link":
            self.links.append(a)
        elif tag == "h1":
            self._dans_h1 += 1
            self.h1.append("")
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "a" and a.get("href"):
            self.hrefs.append(a["href"])
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._dans_ld = True
            self.scripts_ld.append("")

    def handle_endtag(self, tag):
        if tag == "title":
            self._dans_title = False
        elif tag == "h1":
            self._dans_h1 = max(0, self._dans_h1 - 1)
        elif tag == "script":
            self._dans_ld = False

    def handle_data(self, data):
        if self._dans_title:
            self.title += data
        if self._dans_h1 and self.h1:
            self.h1[-1] += data
        if self._dans_ld and self.scripts_ld:
            self.scripts_ld[-1] += data


def pages_construites():
    pages = {}
    for root, _, files in os.walk(OUT):
        if "index.html" in files:
            rel = os.path.relpath(root, OUT).replace("\\", "/")
            url = "/" if rel == "." else "/" + rel.strip("/") + "/"
            pages[url] = os.path.join(root, "index.html")
    return pages


def existe(chemin):
    """Un lien interne mène-t-il à quelque chose de construit ?"""
    chemin = chemin.split("#")[0].split("?")[0]
    if not chemin.startswith("/"):
        return True
    p = os.path.join(OUT, chemin.strip("/"))
    return os.path.isdir(p) and os.path.exists(os.path.join(p, "index.html")) or os.path.isfile(p) \
        or os.path.isfile(p + ".html") or os.path.isfile(os.path.join(OUT, chemin.strip("/") + "/index.html"))


def main():
    pages = pages_construites()
    rapport = collections.defaultdict(list)  # gravité → lignes
    titres, descs = collections.defaultdict(list), collections.defaultdict(list)
    hreflang = {}
    types_ld = collections.Counter()
    noindex = set()
    for url, fichier in sorted(pages.items()):
        p = Page()
        p.feed(open(fichier, encoding="utf8", errors="ignore").read())
        titre = html.unescape(p.title.strip())
        desc = next((html.unescape(m.get("content", "")) for m in p.metas if m.get("name") == "description"), "")
        robots = next((m.get("content", "") for m in p.metas if m.get("name") == "robots"), "")
        if "noindex" in robots:
            noindex.add(url)
        canon = next((l.get("href") for l in p.links if l.get("rel") == "canonical"), None)
        alts = {l.get("hreflang"): l.get("href") for l in p.links if l.get("rel") == "alternate" and l.get("hreflang")}
        og_image = any(m.get("property") == "og:image" for m in p.metas)
        og_url = next((m.get("content") for m in p.metas if m.get("property") == "og:url"), None)

        # La page introuvable et les pages en noindex (coups de cœur, dont
        # l'intitulé ne se rend que dans le navigateur) ne sont pas tenues
        # aux règles des pages indexées.
        hors_index = url.startswith("/404") or "noindex" in robots
        if hors_index:
            continue
        if not titre:
            rapport["bloquant"].append(f"`{url}` : pas de <title>")
        elif len(titre) > LIMITE_TITLE:
            rapport["à corriger"].append(f"`{url}` : title de {len(titre)} signes — « {titre} »")
        titres[titre].append(url)
        if not desc:
            rapport["à corriger"].append(f"`{url}` : pas de meta description")
        elif len(desc) > LIMITE_DESC:
            rapport["à corriger"].append(f"`{url}` : description de {len(desc)} signes")
        descs[desc].append(url)
        if len(p.h1) != 1:
            rapport["bloquant"].append(f"`{url}` : {len(p.h1)} H1")
        attendu = f"{SITE}{url}"
        if canon != attendu:
            rapport["bloquant"].append(f"`{url}` : canonique « {canon} » au lieu de « {attendu} »")
        langue_attendue = "en" if url.startswith("/en/") else "fr"
        if p.lang != langue_attendue:
            rapport["à corriger"].append(f"`{url}` : lang=« {p.lang} »")
        if alts:
            hreflang[url] = alts
        if not og_image:
            rapport["à corriger"].append(f"`{url}` : pas d'og:image")
        if og_url and og_url != attendu:
            rapport["à corriger"].append(f"`{url}` : og:url « {og_url} »")
        for s in p.scripts_ld:
            try:
                j = json.loads(s)
                types_ld[j.get("@type", "?")] += 1
            except json.JSONDecodeError as e:
                rapport["bloquant"].append(f"`{url}` : JSON-LD invalide ({e})")
        sans_alt = [i.get("src", "?") for i in p.imgs if "alt" not in i]
        if sans_alt:
            rapport["à corriger"].append(f"`{url}` : {len(sans_alt)} image(s) sans attribut alt")
        morts = sorted({h for h in p.hrefs if h.startswith("/") and not existe(h)})
        if morts:
            rapport["bloquant"].append(f"`{url}` : lien(s) interne(s) sans page — {', '.join(morts[:6])}")

    for t, urls in titres.items():
        if len(urls) > 1:
            rapport["à corriger"].append(f"title en double « {t} » : {', '.join(urls)}")
    for d, urls in descs.items():
        if d and len(urls) > 1:
            rapport["à corriger"].append(f"description en double sur {len(urls)} pages : {', '.join(urls[:4])}")
    # hreflang réciproques
    for url, alts in hreflang.items():
        for lg, href in alts.items():
            cible = href.replace(SITE, "") or "/"
            if cible not in pages:
                rapport["bloquant"].append(f"`{url}` : hreflang {lg} vers une page absente « {cible} »")
            elif cible != url and url not in {v.replace(SITE, "") or "/" for v in hreflang.get(cible, {}).values()}:
                rapport["à corriger"].append(f"`{url}` : hreflang vers `{cible}` sans retour")

    # plan du site
    sitemap = open(os.path.join(OUT, "sitemap.xml"), encoding="utf8").read()
    locs = {l.replace(SITE, "") for l in re.findall(r"<loc>([^<]+)</loc>", sitemap)}
    for l in sorted(locs):
        if l not in pages:
            rapport["bloquant"].append(f"sitemap : « {l} » n'est pas construite")
    indexables = {u for u in pages if u not in noindex and not u.startswith("/404")}
    absentes = sorted(indexables - locs)
    for u in absentes:
        rapport["à corriger"].append(f"sitemap : `{u}` construite, indexable, mais absente du plan")

    n_bloquant, n_corriger = len(rapport["bloquant"]), len(rapport["à corriger"])
    md = [f"# Contrôle qualité SEO technique — {JOUR}", "",
          f"{len(pages)} pages HTML construites, {len(locs)} adresses au plan du site, {len(noindex)} en noindex.", "",
          f"- Défauts bloquants : **{n_bloquant}**", f"- À corriger : **{n_corriger}**", "",
          "Types JSON-LD rencontrés : " + ", ".join(f"{t} ({n})" for t, n in types_ld.most_common()), ""]
    for grav in ("bloquant", "à corriger"):
        md += [f"## {grav.capitalize()}", ""] + ([f"- {l}" for l in rapport[grav]] or ["- aucun"]) + [""]
    os.makedirs(os.path.join(ROOT, "docs"), exist_ok=True)
    open(os.path.join(ROOT, "docs", f"QA-{JOUR}.md"), "w", encoding="utf8").write("\n".join(md))
    print("\n".join(md[:8]))
    for grav in ("bloquant", "à corriger"):
        print(f"\n{grav} ({len(rapport[grav])}) :")
        for l in rapport[grav][:40]:
            print(" -", l)
    sys.exit(1 if n_bloquant else 0)


if __name__ == "__main__":
    main()
