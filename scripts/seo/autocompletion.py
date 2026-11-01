#!/usr/bin/env python3
"""
Collecte d'expressions réelles par autocomplétion (Google et Bing, France,
français), autour des têtes de cluster MADAMOON.

Pourquoi : le solde d'unités de l'API Semrush est à zéro (ERROR 132) et la
base vérifiée plafonne à 1 474 expressions ciblées. L'autocomplétion est une
source publique de requêtes réellement tapées ; elle ne donne NI volume NI
difficulté. Chaque ligne produite ici est donc marquée « volume non vérifié »
dans la base, et le README de seo-research/ le dit.

Méthode :
  niveau 1 : chaque graine seule, puis graine + espace + lettre (a-z) et
             mot interrogatif + graine ("comment …", "quelle …") ;
  niveau 2 : les suggestions nouvelles qui parlent de mariage redeviennent
             graines, Google seul, lettres a-z.

Sortie : seo-research/raw/autocompletion/<moteur>_fr_<date>.csv
         (requete ; suggestion ; rang ; graine ; niveau), reprise possible.
"""
import collections, csv, json, os, re, sys, time, unicodedata, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "seo-research", "raw", "autocompletion")
os.makedirs(OUT, exist_ok=True)
JOUR = date.today().isoformat()
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"

GRAINES = [
    # génériques et locales
    "robe de mariée", "robes de mariée", "robe de mariage", "robe mariée", "robe de mariée paris",
    "boutique robe de mariée", "boutique robe de mariée paris", "magasin robe de mariée", "magasin robe de mariée paris",
    "showroom robe de mariée", "essayage robe de mariée", "robe de mariée pas cher paris", "robe de mariée sur mesure",
    "robe de mariée sur mesure paris", "créateur robe de mariée", "créateur robe de mariée paris", "robe de mariée créateur",
    "robe de mariée prix", "prix robe de mariée", "robe de mariée 2026", "robe de mariée tendance",
    # coupes
    "robe de mariée sirène", "robe de mariée princesse", "robe de mariée fluide", "robe de mariée trapèze",
    "robe de mariée deux en un", "robe de mariée courte", "robe de mariée longue", "robe de mariée empire",
    "robe de mariée fourreau", "robe de mariée évasée", "robe de mariée droite",
    # styles
    "robe de mariée bohème", "robe de mariée champêtre", "robe de mariée simple", "robe de mariée minimaliste",
    "robe de mariée romantique", "robe de mariée féerique", "robe de mariée vintage", "robe de mariée chic",
    "robe de mariée élégante", "robe de mariée moderne", "robe de mariée originale", "robe de mariée sexy",
    "robe de mariée glamour", "robe de mariée classique", "robe de mariée couture",
    # matières
    "robe de mariée dentelle", "robe de mariée en dentelle", "robe de mariée satin", "robe de mariée en satin",
    "robe de mariée tulle", "robe de mariée mousseline", "robe de mariée crêpe", "robe de mariée mikado",
    "robe de mariée organza", "robe de mariée soie", "robe de mariée jacquard", "robe de mariée brodée",
    "robe de mariée perlée", "robe de mariée paillettes",
    # détails
    "robe de mariée manches longues", "robe de mariée manches", "robe de mariée bustier", "robe de mariée dos nu",
    "robe de mariée dos", "robe de mariée décolleté", "robe de mariée col", "robe de mariée épaules dénudées",
    "robe de mariée bretelles", "robe de mariée traîne", "robe de mariée surjupe", "robe de mariée fendue",
    "robe de mariée corset", "robe de mariée transparente", "robe de mariée jupe amovible",
    # morphologies, tailles, situations
    "robe de mariée morphologie", "robe de mariée morphologie en a", "robe de mariée morphologie en o",
    "robe de mariée morphologie en v", "robe de mariée morphologie en h", "robe de mariée morphologie en 8",
    "robe de mariée morphologie en x", "robe de mariée grande taille", "robe de mariée ronde",
    "robe de mariée petite", "robe de mariée forte poitrine", "robe de mariée enceinte", "robe de mariée 40 ans",
    "robe de mariée 50 ans", "robe de mariée mariage civil", "robe mariage civil", "robe de mariée mairie",
    "robe de mariée hiver", "robe de mariée été",
    # couleurs
    "robe de mariée ivoire", "robe de mariée blanche", "robe de mariée couleur", "robe de mariée champagne",
    # maisons distribuées
    "watters", "watters robe de mariée", "casablanca bridal", "casablanca bridal robe", "olya mak", "monica loretti",
    # informationnel
    "quelle robe de mariée", "comment choisir sa robe de mariée", "quand acheter sa robe de mariée",
    "combien coûte une robe de mariée", "essayage robe de mariée conseils", "délai robe de mariée",
    "retouches robe de mariée", "robe de mariée ivoire ou blanc", "différence robe sirène",
    "tissu robe de mariée", "robe de mariée conseils", "madamoon",
]
PREFIXES = ["comment", "quelle", "quel", "pourquoi", "combien", "quand", "où", "est-ce que"]
LETTRES = list("abcdefghijklmnopqrstuvwxyz")

MARIAGE = re.compile(r"mari[ée]|mariage|nuptial|noce|bridal|wedding|fianc", re.I)


def deaccent(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def google(q):
    u = "https://suggestqueries.google.com/complete/search?client=firefox&hl=fr&gl=fr&q=" + urllib.parse.quote(q)
    with urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=15) as r:
        return json.loads(r.read().decode("utf-8", "ignore"))[1]


def bing(q):
    u = "https://api.bing.com/osjson.aspx?market=fr-FR&query=" + urllib.parse.quote(q)
    with urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=15) as r:
        return json.loads(r.read().decode("utf-8", "ignore"))[1]


MOTEURS = {"google": google, "bing": bing}


def requetes(graine):
    yield graine
    for l in LETTRES:
        yield f"{graine} {l}"
    for p in PREFIXES:
        yield f"{p} {graine}"


def interroger(moteur, q, graine, niveau):
    fn = MOTEURS[moteur]
    for essai in range(3):
        try:
            sugg = fn(q)
            return [(q, s.strip(), i + 1, graine, niveau, moteur) for i, s in enumerate(sugg) if s and s.strip()]
        except Exception as e:  # réseau, 429, JSON
            time.sleep(1.5 * (essai + 1))
    sys.stderr.write(f"échec {moteur} : {q}\n")
    return []


def collecter(moteurs, graines, niveau, fait, ecrire):
    taches = [(m, q, g) for g in graines for q in requetes(g) for m in moteurs if (m, q) not in fait]
    nouvelles = set()
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = [ex.submit(interroger, m, q, g, niveau) for m, q, g in taches]
        for n, f in enumerate(as_completed(futs), 1):
            for ligne in f.result():
                ecrire(ligne)
                nouvelles.add(ligne[1])
            if n % 200 == 0:
                print(f"  {n}/{len(taches)} requêtes, {len(nouvelles)} suggestions distinctes", flush=True)
            time.sleep(0.05)
    return nouvelles


def main():
    fichiers = {m: open(os.path.join(OUT, f"{m}_fr_{JOUR}.csv"), "a", encoding="utf-8", newline="") for m in MOTEURS}
    ecrivains = {m: csv.writer(f, delimiter=";") for m, f in fichiers.items()}
    for m, f in fichiers.items():
        if f.tell() == 0:
            ecrivains[m].writerow(["requete", "suggestion", "rang", "graine", "niveau", "moteur"])
    fait = set()
    for m in MOTEURS:
        p = os.path.join(OUT, f"{m}_fr_{JOUR}.csv")
        with open(p, encoding="utf-8") as fh:
            for r in csv.DictReader(fh, delimiter=";"):
                fait.add((m, r["requete"]))

    def ecrire(ligne):
        ecrivains[ligne[5]].writerow(ligne[:5] + (ligne[5],))

    moteurs1 = [m for m in ("google", "bing") if m != (sys.argv[3] if len(sys.argv) > 3 else "")]
    print(f"niveau 1 : {len(GRAINES)} graines × {1 + len(LETTRES) + len(PREFIXES)} requêtes × {moteurs1}", flush=True)
    n1 = collecter(moteurs1, GRAINES, 1, fait, ecrire)
    for f in fichiers.values():
        f.flush()

    # niveau 2 : les suggestions qui parlent de mariage et ne sont pas déjà graines
    deja = {deaccent(g.lower()) for g in GRAINES}
    # Les graines du niveau 2 : les suggestions les plus souvent renvoyées
    # (plusieurs requêtes mènent à elles), plafonnées — sans plafond, le
    # niveau 2 demanderait des dizaines de milliers de requêtes.
    plafond = int(sys.argv[1]) if len(sys.argv) > 1 else 400
    freq = collections.Counter()
    for m in MOTEURS:
        with open(os.path.join(OUT, f"{m}_fr_{JOUR}.csv"), encoding="utf-8") as fh:
            for r in csv.DictReader(fh, delimiter=";"):
                if r["niveau"] == "1":
                    freq[r["suggestion"].lower()] += 1
    candidates = [s for s, _ in freq.most_common()
                  if MARIAGE.search(s) and deaccent(s) not in deja and len(s) <= 45][:plafond]
    # Le moteur du niveau 2 se choisit en second argument : Google a bloqué
    # (page « Sorry ») après environ 8 000 requêtes le 1er novembre 2026 ;
    # Bing a répondu jusqu'au bout.
    moteur2 = sys.argv[2] if len(sys.argv) > 2 else "google"
    print(f"niveau 2 : {len(candidates)} graines (plafond {plafond}), {moteur2} seul", flush=True)
    collecter([moteur2], candidates, 2, fait, ecrire)
    for f in fichiers.values():
        f.close()

    total = set()
    for m in MOTEURS:
        with open(os.path.join(OUT, f"{m}_fr_{JOUR}.csv"), encoding="utf-8") as fh:
            for r in csv.DictReader(fh, delimiter=";"):
                total.add(r["suggestion"].lower())
    print(f"terminé : {len(total)} suggestions distinctes dans {OUT}", flush=True)


if __name__ == "__main__":
    main()
