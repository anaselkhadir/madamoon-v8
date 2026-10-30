#!/usr/bin/env python3
"""Produit les six classeurs Excel de la phase 2 dans seo-research/ à partir de
seo-research/build/*.json et des exports bruts raw/semrush/*.csv.
Aucune formule : LibreOffice n'est pas installé sur ce poste, les agrégats sont
calculés par le script et datés dans l'onglet « Lisez-moi » de chaque classeur."""
import csv, json, os, collections, datetime
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SR = os.path.join(ROOT, "seo-research")
RAW = os.path.join(SR, "raw", "semrush")
BUILD = os.path.join(SR, "build")
DATE = "30 octobre 2026"
NOUS = "madamoon.fr"
CONC = ["oscarlett.com", "marieeparisienne.com", "plumeparis.fr", "white-boutik.com"]
DOMS = [NOUS] + CONC

F = "Arial"
H_FILL = PatternFill("solid", fgColor="2B2B2B")
H_FONT = Font(name=F, bold=True, color="FFFFFF", size=10)
B_FONT = Font(name=F, size=10)
T_FONT = Font(name=F, bold=True, size=14)
NOTE_FONT = Font(name=F, italic=True, size=9, color="555555")
ALT = PatternFill("solid", fgColor="F7F5F1")
THIN = Side(style="thin", color="DDDDDD")


def lire_csv(nom):
    with open(os.path.join(RAW, nom), encoding="utf-8") as fh:
        return list(csv.DictReader(fh, delimiter=";"))


def feuille(wb, nom, colonnes, lignes, largeurs=None, formats=None, note=None):
    ws = wb.create_sheet(nom[:31])
    r0 = 1
    if note:
        ws.cell(row=1, column=1, value=note).font = NOTE_FONT
        r0 = 2
    for j, c in enumerate(colonnes, 1):
        cell = ws.cell(row=r0, column=j, value=c)
        cell.font, cell.fill = H_FONT, H_FILL
        cell.alignment = Alignment(vertical="center", wrap_text=True)
    ws.row_dimensions[r0].height = 30
    for i, l in enumerate(lignes, r0 + 1):
        for j, v in enumerate(l, 1):
            cell = ws.cell(row=i, column=j, value=v)
            cell.font = B_FONT
            cell.border = Border(bottom=THIN)
            if (i - r0) % 2 == 0:
                cell.fill = ALT
            if formats and formats.get(j):
                cell.number_format = formats[j]
    for j in range(1, len(colonnes) + 1):
        w = (largeurs or {}).get(j)
        if w is None:
            w = min(60, max(10, max([len(str(colonnes[j - 1]))] + [len(str(l[j - 1])) for l in lignes[:300] if j - 1 < len(l) and l[j - 1] is not None]) + 2))
        ws.column_dimensions[get_column_letter(j)].width = w
    ws.freeze_panes = ws.cell(row=r0 + 1, column=1)
    if lignes:
        ws.auto_filter.ref = f"A{r0}:{get_column_letter(len(colonnes))}{r0 + len(lignes)}"
    return ws


def lisez_moi(wb, titre, paragraphes):
    ws = wb.active
    ws.title = "Lisez-moi"
    ws.cell(row=1, column=1, value=titre).font = T_FONT
    ws.cell(row=2, column=1, value=f"MADAMOON V8 — recherche SEO concurrentielle — données Semrush (base France) extraites le {DATE} via le MCP Semrush.").font = NOTE_FONT
    r = 4
    for p in paragraphes:
        c = ws.cell(row=r, column=1, value=p)
        c.font = Font(name=F, bold=p.endswith(":"), size=10)
        c.alignment = Alignment(wrap_text=True, vertical="top")
        r += 1
    ws.column_dimensions["A"].width = 120


def num(v, t=float):
    try:
        return t(v) if v not in ("", None) else None
    except ValueError:
        return v


def sauver(wb, nom):
    p = os.path.join(SR, nom)
    wb.save(p)
    print("écrit", nom, "—", ", ".join(f"{ws.title} ({ws.max_row - 1})" for ws in wb.worksheets))


# ———————————————————————————————————————————————————————————————————————————————
def couverture():
    rank = {r["Domain"]: r for r in lire_csv("domain_rank_fr_2026-10-30.csv")}
    fichiers = sorted(f for f in os.listdir(RAW) if f.startswith("organic_"))
    extraits = collections.defaultdict(dict)
    for f in fichiers:
        dom = f.split("organic_")[1].split("_pos")[0]
        tr = f.split("_pos")[1].split("_")[0]
        n = sum(1 for _ in open(os.path.join(RAW, f), encoding="utf-8")) - 1
        extraits[dom][tr] = n
    lignes = []
    for d in DOMS:
        r = rank[d]
        total = int(r["Organic Keywords"]); p13, p410, p1120 = int(r["Positions 1-3"]), int(r["Positions 4-10"]), int(r["Positions 11-20"])
        reste = total - p13 - p410 - p1120
        attendu = {"1-3": p13, "4-10": p410, "11-20": p1120, "21-100": reste}
        ex = extraits.get(d, {})
        got = sum(ex.values())
        detail = ", ".join(f"positions {k} : {v} lignes" for k, v in ex.items()) or "aucune"
        lignes.append([d, total, p13, p410, p1120, reste, got, round(100 * got / total, 1) if total else 0, detail,
                       "complète" if got >= total - 1 else "PARTIELLE — solde d'unités API Semrush à zéro le 30/10/2026"])
    return lignes


def classeur_overview():
    wb = Workbook()
    lisez_moi(wb, "competitors-overview — vue d'ensemble des cinq domaines", [
        "Onglets :",
        "« Capture vs aujourd'hui » : les chiffres de la capture Semrush fournie par Anas (référence initiale) à côté des chiffres extraits le 30 octobre 2026 (rapports domain_rank et backlinks_comparison).",
        "« Positions et intentions » : répartition des mots-clés par tranche de position et par intention (domain_rank, colonnes étendues).",
        "« Historique 36 mois » : resource_rank_history, un point par mois d'octobre 2023 à septembre 2026.",
        "« Backlinks » : backlinks_comparison (root domain).",
        "« Concurrents organiques » : domain_organic_organic pour madamoon.fr et oscarlett.com — concurrents additionnels à surveiller.",
        "« Couverture extraction » : ce qui a réellement été extrait par tranche de position et ce qui manque.",
        "Limites :",
        "Les volumes et positions sont ceux de la base Semrush France ; ils ne sont pas des mesures Google. Les deux domaines tronqués de la capture ont été identifiés comme marieeparisienne.com et white-boutik.com via le rapport concurrents organiques.",
    ])
    capture = {"madamoon.fr": (9, 669, 107, 199, 126), "oscarlett.com": (26, 16900, 1900, 2600, 1800),
               "marieeparisienne.com": (24, 22200, 3600, 3200, 1900), "plumeparis.fr": (24, 5700, 1700, 729, 409),
               "white-boutik.com": (14, 4600, 2100, 2000, 1300)}
    rank = {r["Domain"]: r for r in lire_csv("domain_rank_fr_2026-10-30.csv")}
    bl = {r["target"]: r for r in lire_csv("backlinks_comparison_2026-10-30.csv")}
    lignes = []
    for d in DOMS:
        c = capture[d]; r = rank[d]; b = bl[d]
        lignes.append([d, c[0], int(b["ascore"]), c[1], int(r["Organic Traffic"]), int(r["Organic Traffic"]) - c[1],
                       c[2], int(r["Organic Keywords"]), int(r["Organic Keywords"]) - c[2],
                       c[3], int(b["backlinks_num"]), c[4], int(b["domains_num"]), int(r["Rank"]), int(r["Organic Cost"])])
    feuille(wb, "Capture vs aujourd'hui",
            ["Domaine", "Authority Score (capture)", "Authority Score (30/10/2026)", "Trafic organique (capture)", "Trafic organique (30/10/2026)", "Δ trafic",
             "Mots-clés (capture)", "Mots-clés (30/10/2026)", "Δ mots-clés", "Backlinks (capture)", "Backlinks (30/10/2026)",
             "Referring domains (capture)", "Referring domains (30/10/2026)", "Semrush Rank FR", "Valeur du trafic (USD/mois)"], lignes,
            note="Capture : valeurs lues sur la capture d'écran Semrush fournie (arrondies par Semrush : 16,9K = 16 900). Aujourd'hui : API Semrush, base fr, 30/10/2026.")
    lignes = []
    for d in DOMS:
        r = rank[d]
        tot = int(r["Organic Keywords"])
        lignes.append([d, tot, int(r["Positions 1-3"]), int(r["Positions 4-10"]), int(r["Positions 11-20"]), tot - int(r["Positions 1-3"]) - int(r["Positions 4-10"]) - int(r["Positions 11-20"]),
                       int(r["Intent Commercial Positions"]), int(r["Intent Informational Positions"]),
                       int(r["Intent Transactional Positions"]), int(r["Intent Navigational Positions"])])
    feuille(wb, "Positions et intentions",
            ["Domaine", "Mots-clés organiques", "Positions 1-3", "Positions 4-10", "Positions 11-20", "Positions 21-100",
             "Intention commerciale", "Intention informationnelle", "Intention transactionnelle", "Intention navigationnelle"], lignes)
    hist = lire_csv("rank_history_fr_2026-10-30.csv")
    lignes = [[h["Domain"], f"{h['Date'][:4]}-{h['Date'][4:6]}", int(h["Rank"]), int(h["Organic Keywords"]), int(h["Organic Traffic"]), int(h["Organic Cost"])] for h in hist]
    feuille(wb, "Historique 36 mois", ["Domaine", "Mois", "Semrush Rank", "Mots-clés organiques", "Trafic organique", "Valeur du trafic (USD)"], lignes)
    lignes = [[b["target"], int(b["ascore"]), int(b["backlinks_num"]), int(b["domains_num"]), int(b["ips_num"]), int(b["follows_num"]),
               int(b["nofollows_num"]), int(b["texts_num"]), int(b["images_num"])] for b in bl.values()]
    feuille(wb, "Backlinks", ["Domaine", "Authority Score", "Backlinks", "Referring domains", "IP référentes", "Follow", "Nofollow", "Liens texte", "Liens image"], lignes)
    lignes = []
    for src, f in [("madamoon.fr", "competitors_madamoon_fr_2026-10-30.csv"), ("oscarlett.com", "competitors_oscarlett_fr_2026-10-30.csv")]:
        for r in lire_csv(f):
            lignes.append([src, r["Domain"], float(r["Competitor Relevance"]), int(r["Common Keywords"]), int(r["Organic Keywords"]),
                           int(r["Organic Traffic"]), int(r["Organic Cost"]), "oui" if r["Domain"] in CONC else ""])
    feuille(wb, "Concurrents organiques", ["Analysé depuis", "Concurrent", "Pertinence", "Mots-clés communs", "Mots-clés organiques", "Trafic organique", "Valeur trafic (USD)", "Dans la comparaison"], lignes)
    feuille(wb, "Couverture extraction",
            ["Domaine", "Mots-clés (Semrush)", "Attendus 1-3", "Attendus 4-10", "Attendus 11-20", "Attendus 21-100", "Lignes extraites", "% extrait", "Détail des tranches extraites", "Statut"],
            couverture(), largeurs={9: 70, 10: 55})
    sauver(wb, "competitors-overview.xlsx")


def classeur_keywords(data):
    wb = Workbook()
    lisez_moi(wb, "competitors-keywords — mots-clés organiques extraits (resource_organic, base fr)", [
        "Une ligne par (domaine, mot-clé, URL positionnée). Colonnes Semrush : position, position précédente, volume mensuel, CPC (USD), URL, trafic estimé, part de trafic, difficulté (KD 0-100), intention (0 commercial, 1 informationnel, 2 navigationnel, 3 transactionnel), densité concurrentielle, tendance 12 mois (indices 0-1).",
        "Couverture : l'extraction par tranche de position a été interrompue par l'épuisement des unités API Semrush. Voir l'onglet « Couverture » et seo-opportunities.md. Les tranches manquantes sont à relancer avec le même paramétrage (scripts/seo/README).",
        "Onglets par domaine + « Tous les domaines » + « Tranches » (nombre de lignes par tranche de position par domaine).",
    ])
    cols = ["Domaine", "Mot-clé", "Position", "Position précédente", "Volume", "CPC (USD)", "URL positionnée", "Trafic estimé", "Part de trafic (%)", "KD", "Intention", "Densité concurrentielle", "Tendance 12 mois", "Tranche extraite", "Fichier source"]
    INT = {"0": "commercial", "1": "informationnel", "2": "navigationnel", "3": "transactionnel"}
    def row(l):
        return [l["domaine"], l["keyword"], l["position"], l["position_prec"] or None, l["volume"], l["cpc"], l["url"], l["trafic"],
                l["part_trafic"], l["kd"], " / ".join(INT.get(c, c) for c in l["intents"].split(",") if c) or "inconnue", l["competition"], l["trend"], l["tranche"], l["fichier"]]
    lignes = [row(l) for l in data["lignes_brutes"]]
    feuille(wb, "Tous les domaines", cols, lignes, largeurs={2: 42, 7: 60, 13: 40}, formats={6: "0.00", 10: "0"})
    for d in DOMS:
        feuille(wb, d, cols, [row(l) for l in data["lignes_brutes"] if l["domaine"] == d], largeurs={2: 42, 7: 60, 13: 40}, formats={6: "0.00"})
    tr = collections.Counter((l["domaine"], l["tranche"]) for l in data["lignes_brutes"])
    buckets = lambda p: "1-3" if p <= 3 else "4-10" if p <= 10 else "11-20" if p <= 20 else "21-50" if p <= 50 else "51-100"
    bk = collections.Counter((l["domaine"], buckets(l["position"])) for l in data["lignes_brutes"])
    lignes = [[d, b, bk.get((d, b), 0)] for d in DOMS for b in ["1-3", "4-10", "11-20", "21-50", "51-100"]]
    feuille(wb, "Tranches", ["Domaine", "Tranche de position", "Lignes extraites"], lignes, note="Un 0 signifie : tranche non extraite (unités épuisées) ou vide.")
    feuille(wb, "Couverture", ["Domaine", "Mots-clés (Semrush)", "Attendus 1-3", "Attendus 4-10", "Attendus 11-20", "Attendus 21-100", "Lignes extraites", "% extrait", "Détail", "Statut"], couverture(), largeurs={9: 70, 10: 55})
    sauver(wb, "competitors-keywords.xlsx")


def classeur_gap(base):
    wb = Workbook()
    lisez_moi(wb, "keyword-gap — madamoon.fr face aux quatre concurrents", [
        "Méthode : le rapport Keyword Gap de Semrush (domain_domains) n'a pas pu être exécuté — solde d'unités API à zéro. Le gap ci-dessous est CALCULÉ LOCALEMENT en croisant les exports resource_organic de chaque domaine (positions madamoon.fr vs concurrents, même base fr, même date).",
        "Conséquence : un mot-clé classé « untapped » ou « missing » l'est au regard des tranches extraites. Un concurrent peut s'y positionner dans une tranche non extraite (voir Couverture). Le gap devra être recalculé après complément d'extraction ou via domain_domains.",
        "Catégories (définitions Semrush) : missing = madamoon absent, ≥ 2 concurrents extraits positionnés ; untapped = madamoon absent, 1 concurrent ; weak = madamoon derrière tous ; shared = positions mêlées ; strong = madamoon devant tous ; unique = madamoon seul.",
        "Seuls les mots-clés jugés pertinents pour MADAMOON (boutique de robes de mariée à Paris) sont dans l'onglet principal ; les autres statuts sont dans « Non ciblés ».",
    ])
    cols = ["Mot-clé", "Volume", "KD", "CPC (USD)", "Intention", "Cluster", "Local Paris", "Gap", "Pos. madamoon.fr", "Pos. oscarlett.com", "Pos. marieeparisienne.com", "Pos. plumeparis.fr", "Pos. white-boutik.com", "Nb concurrents", "Meilleur concurrent", "Page cible V8", "Priorité", "URL madamoon", "URL oscarlett", "URL marieeparisienne", "URL plumeparis", "URL white-boutik"]
    def row(b):
        return [b["keyword"], b["volume"], b["kd"], b["cpc"], b["intention"], b["cluster"], b["local_paris"], b["gap"], b["pos_madamoon"] or None,
                *[b[f"pos_{d}"] or None for d in CONC], b["nb_concurrents"], b["meilleur_concurrent"] or None, b["page_cible"], b["priorite"],
                b["url_madamoon"], *[b[f"url_{d}"] for d in CONC]]
    pert = [b for b in base if b["statut"] == "pertinent"]
    feuille(wb, "Gap (pertinents)", cols, [row(b) for b in pert], largeurs={1: 42, 6: 30, 16: 36}, formats={4: "0.00"})
    for nom, pref in [("Missing", "missing"), ("Untapped", "untapped"), ("Weak", "weak"), ("Shared", "shared"), ("Strong & Unique", "strong"), ]:
        sel = [b for b in pert if b["gap"].startswith(pref) or (pref == "strong" and b["gap"].startswith("unique"))]
        feuille(wb, nom, cols, [row(b) for b in sel], largeurs={1: 42, 6: 30, 16: 36}, formats={4: "0.00"})
    autres = [b for b in base if b["statut"] != "pertinent"]
    feuille(wb, "Non ciblés", ["Mot-clé", "Volume", "KD", "Statut (raison)", "Gap", *[f"Pos. {d}" for d in DOMS]],
            [[b["keyword"], b["volume"], b["kd"], b["statut"], b["gap"], b["pos_madamoon"] or None, *[b[f"pos_{d}"] or None for d in CONC]] for b in autres], largeurs={1: 42, 4: 40})
    sauver(wb, "keyword-gap.xlsx")


def classeur_clusters(base, exp):
    wb = Workbook()
    pert = [b for b in base if b["statut"] == "pertinent"]
    lisez_moi(wb, "keyword-clusters — base sémantique MADAMOON V8", [
        f"Base : {len(base)} mots-clés uniques extraits de Semrush (5 domaines), dont {len(pert)} pertinents pour MADAMOON, regroupés en {len({b['cle_variante'] for b in pert})} groupes de variantes proches et {len({b['cluster'] for b in pert})} clusters thématiques. {len(exp)} requêtes d'expansion sémantique (non vérifiées) sont listées à part.",
        "Groupe de variantes : mots-clés qui partagent les mêmes mots pleins (accents, pluriels, ordre et mots de liaison ignorés). Le représentant est la variante au plus fort volume. Une page cible un groupe entier, jamais une variante isolée.",
        "Cluster : thème principal attribué par règles lexicales (coupe, style, matière, détail, morphologie, local, prix, créateur, guide…). Les clusters secondaires signalent les croisements (ex. « sirène » × « dentelle »).",
        "Priorité (0-100) : volume (log), difficulté inversée, intention commerciale/transactionnelle, dimension locale Paris, nombre de concurrents positionnés (marché prouvé), quick win si madamoon est déjà en positions 4-30.",
        "Statut : « pertinent » = cœur de cible (robe de mariée, boutique, Paris, morphologie, créateurs distribués). Les autres statuts (marque tierce, adjacent, mode générique, local hors Paris, parasite, hors sujet) sont conservés pour traçabilité mais ne génèrent aucune page.",
        "Objectif de 5 000 expressions : la base vérifiée compte aujourd'hui 1 474 expressions pertinentes ; l'objectif se complète par les tranches Semrush manquantes (≈ 5 700 lignes), les rapports phrase_related / phrase_questions par cluster, puis la validation en volume des 482 requêtes d'expansion. Voir seo-strategy.md.",
    ])
    cols = ["Mot-clé", "Groupe de variantes (représentant)", "Nb variantes", "Volume", "Volume du groupe", "KD", "CPC (USD)", "Intention", "Cluster principal", "Clusters secondaires", "Local Paris", "Gap", "Nb concurrents", "Pos. madamoon", "Page cible V8", "Type de page", "Statut de la page", "Priorité", "Tendance 12 mois", "Source"]
    def row(b):
        return [b["keyword"], b["groupe_variantes"], b["nb_variantes"], b["volume"], b["volume_groupe"], b["kd"], b["cpc"], b["intention"], b["cluster"], b["clusters_secondaires"], b["local_paris"], b["gap"], b["nb_concurrents"], b["pos_madamoon"] or None, b["page_cible"], b["type_page"], b["statut_page"], b["priorite"], b["trend"], b["sources"]]
    feuille(wb, "Base pertinente", cols, [row(b) for b in pert], largeurs={1: 42, 2: 36, 9: 30, 10: 40, 15: 36, 17: 40, 19: 40, 20: 50}, formats={7: "0.00"})
    cl = collections.defaultdict(list)
    for b in pert:
        cl[b["cluster"]].append(b)
    lignes = []
    for nom, ms in sorted(cl.items(), key=lambda kv: -sum(m["volume"] for m in kv[1])):
        ms.sort(key=lambda m: -m["volume"])
        kd = [m["kd"] for m in ms if m["kd"]]
        p = ms[0]
        lignes.append([nom, len(ms), len({m["cle_variante"] for m in ms}), sum(m["volume"] for m in ms), round(sum(kd) / len(kd), 1) if kd else None,
                       round(sum(m["priorite"] for m in ms) / len(ms), 1), sum(1 for m in ms if m["local_paris"]),
                       sum(1 for m in ms if m["gap"].startswith(("missing", "untapped"))), p["page_cible"], p["type_page"], p["statut_page"],
                       " | ".join(f"{m['keyword']} ({m['volume']})" for m in ms[:8])])
    feuille(wb, "Clusters", ["Cluster", "Nb mots-clés", "Nb groupes", "Volume cumulé", "KD moyenne", "Priorité moyenne", "Dont local Paris", "Dont missing/untapped", "Page cible V8", "Type de page", "Statut de la page", "Mots-clés principaux"], lignes, largeurs={1: 32, 9: 36, 11: 40, 12: 90})
    gr = collections.defaultdict(list)
    for b in pert:
        gr[b["groupe_variantes"]].append(b)
    lignes = []
    for rep, ms in sorted(gr.items(), key=lambda kv: -kv[1][0]["volume_groupe"]):
        ms.sort(key=lambda m: -m["volume"])
        lignes.append([rep, len(ms), ms[0]["volume_groupe"], ms[0]["cluster"], ms[0]["page_cible"], " | ".join(m["keyword"] for m in ms)])
    feuille(wb, "Groupes de variantes", ["Représentant", "Nb variantes", "Volume du groupe", "Cluster", "Page cible V8", "Variantes"], lignes, largeurs={1: 42, 4: 30, 5: 36, 6: 100})
    autres = [b for b in base if b["statut"] != "pertinent"]
    feuille(wb, "Non ciblés", ["Mot-clé", "Volume", "KD", "Statut (raison d'exclusion)", "Cluster détecté", "Pos. madamoon", "Nb concurrents", "Source"],
            [[b["keyword"], b["volume"], b["kd"], b["statut"], b["cluster"], b["pos_madamoon"] or None, b["nb_concurrents"], b["sources"]] for b in autres], largeurs={1: 42, 4: 40, 5: 40, 8: 50})
    feuille(wb, "Expansion (non vérifiée)", ["Requête proposée", "Cluster", "Page cible V8", "Intention présumée", "Motif", "Source", "Volume Semrush", "KD Semrush"],
            [[e["keyword"], e["cluster"], e["page_cible"], e["intention"], e["motif"], e["source"], None, None] for e in exp], largeurs={1: 55, 2: 30, 3: 36, 5: 60, 6: 48},
            note="À valider par lots de 100 avec les rapports Semrush phrase_these (volume, CPC) et phrase_kdi (difficulté) dès que des unités API sont disponibles. Aucune de ces requêtes n'est à utiliser telle quelle dans un texte.")
    sauver(wb, "keyword-clusters.xlsx")


def classeur_mapping(base, exp):
    wb = Workbook()
    pert = [b for b in base if b["statut"] == "pertinent"]
    lisez_moi(wb, "keyword-to-page-mapping — chaque groupe de mots-clés a une page, chaque page a un cluster", [
        "Règle anti-cannibalisation : une page cible un cluster principal et ses variantes ; un mot-clé n'a qu'une page principale. Les croisements (ex. « robe de mariée sirène dentelle ») vivent dans une section de la page de coupe et pointent vers la page matière par lien interne, sans page dédiée.",
        "Statut de page : « existante v7 » = déjà sur madamoon.fr (à refondre), « à créer » = justifiée par les données, « à créer si volume suffisant » = à confirmer après complément d'extraction, « à intégrer » = section d'une page existante.",
        "Les pages de type Guide ne sont créées que lorsque l'intention est informationnelle et distincte d'une page commerciale.",
        "Onglet « Cannibalisation » : groupes de variantes dont des membres pointent vers des pages différentes, ou pages partageant plus de 30 % de leurs mots-clés — à arbitrer en phase 3.",
    ])
    pages = collections.defaultdict(list)
    for b in pert:
        pages[(b["page_cible"], b["type_page"], b["statut_page"])].append(b)
    for e in exp:
        pass
    lignes = []
    for (url, typ, st), ms in sorted(pages.items(), key=lambda kv: -sum(m["volume"] for m in kv[1])):
        ms.sort(key=lambda m: -m["priorite"])
        clusters = collections.Counter(m["cluster"] for m in ms)
        nb_exp = sum(1 for e in exp if e["page_cible"] == url)
        lignes.append([url, typ, st, " | ".join(f"{c} ({n})" for c, n in clusters.most_common()), len(ms), len({m["cle_variante"] for m in ms}),
                       sum(m["volume"] for m in ms), round(sum(m["priorite"] for m in ms) / len(ms), 1), nb_exp,
                       sum(1 for m in ms if m["pos_madamoon"]), " | ".join(f"{m['keyword']} ({m['volume']}, prio {m['priorite']})" for m in ms[:10])])
    feuille(wb, "Pages", ["Page cible V8", "Type", "Statut", "Clusters servis", "Nb mots-clés", "Nb groupes", "Volume cumulé", "Priorité moyenne", "Requêtes d'expansion rattachées", "Mots-clés où madamoon se positionne déjà", "Mots-clés prioritaires"], lignes, largeurs={1: 40, 3: 45, 4: 50, 11: 110})
    cols = ["Mot-clé", "Groupe de variantes", "Page cible V8", "Rôle", "Cluster principal", "Clusters secondaires (liens internes vers)", "Volume", "KD", "Intention", "Priorité", "Pos. madamoon", "Gap"]
    lignes = []
    for b in sorted(pert, key=lambda m: (m["page_cible"], -m["priorite"])):
        role = "principal" if b["keyword"] == b["groupe_variantes"] else "variante"
        liens = " | ".join(PAGES_SEC.get(c, "") for c in b["clusters_secondaires"].split(" | ") if c and PAGES_SEC.get(c))
        lignes.append([b["keyword"], b["groupe_variantes"], b["page_cible"], role, b["cluster"], liens, b["volume"], b["kd"], b["intention"], b["priorite"], b["pos_madamoon"] or None, b["gap"]])
    feuille(wb, "Mots-clés → page", cols, lignes, largeurs={1: 42, 2: 36, 3: 36, 5: 30, 6: 50})
    lignes = [[e["keyword"], e["page_cible"], e["cluster"], e["intention"], e["motif"]] for e in exp]
    feuille(wb, "Expansion → page", ["Requête (non vérifiée)", "Page cible V8", "Cluster", "Intention présumée", "Motif"], lignes, largeurs={1: 55, 2: 36, 3: 30, 5: 60})
    # cannibalisation : groupes de variantes éclatés sur plusieurs pages
    gr = collections.defaultdict(set)
    for b in pert:
        gr[b["groupe_variantes"]].add(b["page_cible"])
    lignes = [[rep, len(p), " | ".join(sorted(p)), "groupe de variantes réparti sur plusieurs pages : choisir une page principale"] for rep, p in gr.items() if len(p) > 1]
    # pages partageant des clusters
    pc = collections.defaultdict(set)
    for b in pert:
        pc[b["page_cible"]].add(b["cluster"])
        for c in b["clusters_secondaires"].split(" | "):
            if c:
                pc[b["page_cible"]].add(c)
    urls = sorted(pc)
    for i, u in enumerate(urls):
        for v in urls[i + 1:]:
            inter = pc[u] & pc[v]
            if len(inter) >= 2:
                lignes.append([f"{u} ↔ {v}", len(inter), " | ".join(sorted(inter)), "pages partageant ≥ 2 clusters : différencier les angles et le maillage"])
    feuille(wb, "Cannibalisation", ["Élément", "Nb", "Détail", "Risque / action"], lignes, largeurs={1: 60, 3: 80, 4: 70})
    sauver(wb, "keyword-to-page-mapping.xlsx")


PAGES_SEC = {}


def classeur_pages():
    wb = Workbook()
    lisez_moi(wb, "competitor-top-pages — les pages qui génèrent le trafic organique des concurrents", [
        "Source : rapport Semrush resource_organic_unique (pages), base fr, 30/10/2026, triées par trafic estimé, 100 premières pages (oscarlett.com : 57 pages, les pages à trafic nul au-delà ont été omises).",
        "Colonnes : nombre de mots-clés positionnés par page, trafic mensuel estimé, part du trafic du domaine, et répartition des positions par intention.",
        "Onglet « Synthèse » : type de page déduit de l'URL (accueil, catégorie coupe/style, matière/détail, marque distribuée, prix, guide, fiche produit, boutique locale) et enseignement pour l'architecture V8.",
    ])
    def typer(u):
        u = u.lower()
        if u.rstrip("/").count("/") <= 2:
            return "Accueil"
        if any(k in u for k in ["/en/", "/wedding", "/bridal"]):
            return "Version anglaise"
        if any(k in u for k in ["pa_marques", "pronovias", "rosa-clara", "nicole", "alma-novia", "luna-novias", "aire-barcelona", "tony-ward", "wona", "white-one", "san-patrick", "adriana", "sonia-pena", "pronuptia", "modeca", "randy", "justin", "tarik", "eddy", "watters", "jenny-yoo", "anna-kara", "truvelle", "made-with-love", "eliza-jane", "jesus-peiro", "rembo", "marylise", "bella-", "amelie-", "les-marques", "martha-blanc"]):
            return "Marque distribuée"
        if any(k in u for k in ["/produit/", "/robe-mariee/", "/robe-de-mariee/"]) and u.count("/") >= 5:
            return "Fiche produit"
        if any(k in u for k in ["1600e", "1100e", "euros", "promotion", "outlet", "destockage", "sale", "prix"]):
            return "Prix / promotion"
        if any(k in u for k in ["morphologie", "guide", "checklist", "tissus", "lendemain", "meilleures-boutiques", "coupe-robe", "danser", "style/", "noces-de-plume", "votre-experience", "avis"]):
            return "Guide / éditorial"
        if any(k in u for k in ["boutique", "showroom", "villes", "contact", "annecy", "nogent", "paris"]):
            return "Boutique / local"
        if any(k in u for k in ["sirene", "princesse", "boheme", "trapeze", "fluide", "courte", "simple", "moderne", "champetre", "romantique", "sexy", "evasee", "coupe-a", "a-line", "ballgown", "bohemian"]):
            return "Catégorie coupe / style"
        if any(k in u for k in ["dentelle", "satin", "tulle", "mikado", "organza", "crepe", "mousseline", "manches", "decollete", "bustier", "dos-nu", "col-", "bretelles", "cape", "jupe", "paillettes", "perles", "grande-taille", "brocart", "jacquard", "surjupe"]):
            return "Catégorie matière / détail"
        if "categorie-produit" in u or "robe-de-mariee" in u or "robe-mariee" in u or "toutes-nos-robes" in u:
            return "Catalogue"
        return "Autre"
    cols = ["Domaine", "URL", "Type de page (déduit)", "Nb mots-clés", "Trafic estimé", "Part du trafic (%)", "Positions commerciales", "Positions informationnelles", "Positions transactionnelles", "Positions navigationnelles"]
    tout = []
    for d in DOMS:
        rows = lire_csv(f"pages_{d}_2026-10-30.csv")
        lignes = [[d, r["Url"], typer(r["Url"]), int(r["Number of Keywords"]), int(r["Traffic"]), float(r["Traffic (%)"]), int(r["Intent Commercial Positions"]), int(r["Intent Informational Positions"]), int(r["Intent Transactional Positions"]), int(r["Intent Navigational Positions"])] for r in rows]
        tout += lignes
        feuille(wb, d, cols, lignes, largeurs={2: 80, 3: 26})
    synth = collections.defaultdict(lambda: [0, 0, 0])
    for l in tout:
        s = synth[(l[0], l[2])]
        s[0] += 1; s[1] += l[3]; s[2] += l[4]
    lignes = [[d, t, v[0], v[1], v[2]] for (d, t), v in sorted(synth.items(), key=lambda kv: (kv[0][0], -kv[1][2]))]
    feuille(wb, "Synthèse", ["Domaine", "Type de page", "Nb pages (top 100)", "Mots-clés cumulés", "Trafic cumulé"], lignes,
            note="Enseignement : l'accueil et une page catalogue concentrent 50-70 % du trafic ; les pages coupe/style (princesse, bohème, sirène) et matière/détail (dentelle, manches longues, bateau) font le reste chez marieeparisienne.com ; les pages marques distribuées et prix comptent chez oscarlett.com et marieeparisienne.com ; white-boutik.com gagne avec des guides (meilleures boutiques Paris, tissus, morphologies).")
    sauver(wb, "competitor-top-pages.xlsx")


if __name__ == "__main__":
    data = json.load(open(os.path.join(BUILD, "base_mots_cles.json"), encoding="utf-8"))
    exp = json.load(open(os.path.join(BUILD, "expansion.json"), encoding="utf-8"))
    base = data["base"]
    import importlib.util
    spec = importlib.util.spec_from_file_location("bmc", os.path.join(ROOT, "scripts", "seo", "base_mots_cles.py"))
    bmc = importlib.util.module_from_spec(spec); spec.loader.exec_module(bmc)
    PAGES_SEC.update({k: v[0] for k, v in bmc.PAGES.items()})
    classeur_overview()
    classeur_keywords(data)
    classeur_gap(base)
    classeur_clusters(base, exp)
    classeur_mapping(base, exp)
    classeur_pages()
