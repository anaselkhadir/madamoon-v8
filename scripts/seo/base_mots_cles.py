#!/usr/bin/env python3
"""
Construit la base de mots-clés MADAMOON V8 à partir des exports Semrush bruts
(seo-research/raw/semrush/organic_*.csv) : normalisation, dédoublonnage,
regroupement des variantes, pertinence, cluster thématique, intention,
page cible, priorité, keyword gap local.

Relancer ce script dès qu'un nouvel export est déposé dans raw/semrush/.
Sortie : seo-research/build/*.json et *.csv, consommés par livrables_xlsx.py.
"""
import csv, glob, json, math, os, re, unicodedata, collections

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW = os.path.join(ROOT, "seo-research", "raw", "semrush")
OUT = os.path.join(ROOT, "seo-research", "build")
os.makedirs(OUT, exist_ok=True)

NOUS = "madamoon.fr"
CONCURRENTS = ["oscarlett.com", "marieeparisienne.com", "plumeparis.fr", "white-boutik.com"]
DOMAINES = [NOUS] + CONCURRENTS

INTENTS = {"0": "commercial", "1": "informationnel", "2": "navigationnel", "3": "transactionnel"}

# ————————————————————————————————————————————————— normalisation
STOP = {"de", "la", "le", "les", "des", "du", "d", "l", "pour", "en", "a", "au", "aux", "et",
        "une", "un", "the", "of", "in", "sur", "avec", "ma", "mon", "sa", "son", "ses", "mes"}
PLURIELS = {"robes": "robe", "mariees": "mariee", "maries": "marie", "manches": "manche",
            "boutiques": "boutique", "magasins": "magasin", "createurs": "createur",
            "creatrices": "creatrice", "dresses": "dress", "gowns": "gown", "longues": "longue",
            "courtes": "courte", "tissus": "tissu", "chaussures": "chaussure", "prix": "prix",
            "annees": "annee", "mariages": "mariage", "soirees": "soiree", "invitees": "invitee",
            "marques": "marque", "modeles": "modele", "coupes": "coupe", "styles": "style",
            "tendances": "tendance", "idees": "idee", "conseils": "conseil", "femmes": "femme",
            "rondes": "ronde", "grandes": "grande", "tailles": "taille", "simples": "simple",
            "originales": "originale", "elegantes": "elegante", "chics": "chic", "blanches": "blanche",
            "fluides": "fluide", "bustiers": "bustier", "sirenes": "sirene", "princesses": "princesse",
            "boheme": "boheme", "bohemes": "boheme", "dentelles": "dentelle", "voiles": "voile",
            "robe": "robe", "mariee": "mariee"}
EQUIV = {"marié": "mariee", "mariée": "mariee", "mariee": "mariee", "marie": "mariee",
         "mari": "mariee", "mariées": "mariee", "mariés": "mariee", "mariage": "mariage",
         "mariages": "mariage", "mariag": "mariage", "mariee's": "mariee", "wedding": "wedding",
         "boheme": "boheme", "bohème": "boheme", "bohemienne": "boheme", "bohème-chic": "boheme chic",
         "sirène": "sirene", "sirene": "sirene", "trapèze": "trapeze", "trapeze": "trapeze",
         "a-line": "trapeze", "aline": "trapeze", "princesse": "princesse",
         "manche": "manche", "pas-cher": "pas cher"}


def deaccent(s):
    s = unicodedata.normalize("NFD", s)
    return "".join(c for c in s if unicodedata.category(c) != "Mn")


def norm(s):
    s = deaccent(s.lower().replace("'", " ").replace("’", " ").replace("-", " "))
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def tokens(s):
    out = []
    for t in norm(s).split():
        t = EQUIV.get(t, t)
        t = PLURIELS.get(t, t)
        if t in STOP:
            continue
        if len(t) > 4 and t.endswith("s") and not t.endswith(("ss", "us", "is", "os")):
            t = t[:-1]
        out.append(t)
    return out


def cle_variante(s):
    """Clé de regroupement des variantes proches : mêmes mots pleins, ordre ignoré."""
    return " ".join(sorted(set(tokens(s))))


# ————————————————————————————————————————————————— marques
MARQUES_TIERCES = [
    "oscarlett", "scarlett", "oscar lett", "plume paris", "plumeparis", "white boutik", "whiteboutik",
    "mariee parisienne", "pronuptia", "pronovias", "rosa clara", "cymbeline", "carla ruiz", "linea raffaelli",
    "luna novias", "alma novia", "aire barcelona", "jesus peiro", "made with love", "eliza jane howell",
    "truvelle", "rembo", "marylise", "jenny yoo", "anna kara", "modeca", "randy fenoli", "justin alexander",
    "eddy k", "tarik ediz", "sonia pena", "san patrick", "white one", "tony ward", "wona", "adriana alier",
    "lillian west", "ladybird", "berta", "vera wang", "la sposa", "valerio luna", "manu garcia",
    "couture club", "mademoiselle o", "bianco evento", "joseph ribkoff", "lambert creations", "creatif paris",
    "creations bochet", "eva lendel", "ms moda", "marfil", "susanna rivieri", "selestia", "bella", "amelie",
    "martha blanc", "nicole", "elsa gary", "elsamode", "promissa", "sonia l", "zeus", "demetrios",
    "atelier emelia", "rime arodaky", "laure de sagazan", "maison floret", "margaux tardits", "mademoiselle de guise",
    "fabienne alagama", "1robepour1soir", "dressing club", "espace mariages", "robe paris", "mabonneamie",
    "ma bonne amie", "harpe", "lorafolk", "donatelle godart", "cyrielle", "marie laporte", "lk paris",
    "pivoines and love", "mariees de paris", "dream dress", "the bride paris", "mylesia", "graine de coton",
    "lilar", "dress in paris", "maison mossen", "mossen", "mannda", "seamone", "maison aman", "madame a dit oui",
    "dame modest", "dm couture", "lammari", "mademoiselle se marie", "manon gontero", "madessa", "meravigliosa",
    "mado mariage", "madam paris", "secrets de mariage", "paradise boutik", "boutik", "pure wedding", "cymbeline",
    "diego luna", "sheryfa luna", "luna and star", "petula", "haylie duff", "maida", "yolanda", "nelsia", "karsen",
    "joao feliz", "feliz", "blanc couture", "white house", "adore", "lavetir", "mavie", "chez plume",
    "noce de plume", "noces de plume", "noces de plumes", "noce de plumes", "confidence mariage", "mariage factory",
    "sublime mariage", "formidable mariage", "divine mariee", "isabelle saporta", "caroline takvorian",
    "la ravanne", "vo boutik", "le boutik", "paradise", "les maries d amelie", "mariee d amelie", "mariees d amelie",
    "elsa gary", "yolanda", "nelsia", "lilar", "cymbeline", "harpe", "margaux tardits", "rime arodaky",
    # ajoutées le 01/11/2026 avec l'autocomplétion : luxe, prêt-à-porter, célébrités, autres maisons
    "chanel", "dior", "givenchy", "jimmy choo", "valentino", "elie saab", "zuhair murad", "galia lahav",
    "oscar de la renta", "monique lhuillier", "maggie sottero", "essense", "stella york", "allure bridals",
    "mori lee", "morilee", "paolo sebastian", "lambert creation", "lambert creations", "ana torres", "max mara",
    "yves saint laurent", "saint laurent", "balenciaga", "armani", "versace", "dolce", "gucci", "prada", "celine",
    "hermes", "chloe", "sandro", "maje", "ba sh", "sezane", "rouje", "jacquemus", "claudie pierlot", "the kooples",
    "kiabi", "gemo", "la redoute", "jennyfer", "naf naf", "etam", "primark", "c a", "camaieu", "promod", "bonobo",
    "cache cache", "pimkie", "morgan", "boohoo", "pretty little thing", "ever pretty", "jj s house", "jjshouse",
    "milanoo", "light in the box", "lightinthebox", "wish", "cdiscount", "vinted", "leboncoin", "le bon coin",
    "kim kardashian", "taylor swift", "zendaya", "meghan markle", "kate middleton", "grace kelly", "lady di",
    "sabrina carpenter", "hailey bieber", "beyonce", "rihanna", "jlo", "jennifer lopez", "selena gomez",
    "madame est couturiere", "au premier regard", "mariés au premier regard", "4 mariages", "quatre mariages",
    "jesse watters", "watters world", "casa blanca bridal", "cymbeline", "point mariage", "tati mariage",
    "complicite", "declaration mariage", "empire du mariage", "eglantine", "bella sposa", "robe marie", "shein", "temu", "naumy",
    "vivienne westwood", "westwood", "zalando", "bonprix", "tati", "asos", "gitane", "barbe", "paul", "hayward", "kinshasa",
    "joseph", "harlow", "reko", "creek", "torrean", "veronica", "kitt", "avery", "verity", "veridiana", "willa", "june",
    "soeurs joubert", "sœurs joubert", "joubert", "herve paris", "milla nova", "lady diana", "diana", "negafa", "ronde des rubans",
    "alina marti", "delphine manivet", "manivet", "douces mesures", "zaz", "mariee capricieuse", "barbesse", "ceremony day",
    "erdem", "vogue", "marie antoinette", "kreation", "magenta", "uni", "monde", "kosovo", "usine", "amazon", "aliexpress",
    "aliexpres", "la mariee aux pieds nus", "pieds nus", "cymbeline", "harpe", "laure de sagazan", "sagazan", "rime arodaky",
    "zara", "azazie", "etsy", "vive les maries", "margaux mariage", "eva mariage", "bridal gallery", "gilles zimmer", "zimmer",
    "anais", "roll", "design bride", "alexandra", "plume", "kabyle", "chretienne", "tu es mariee", "frere",
]
CREATEURS_MADAMOON = {
    "watters": "Watters Designs", "wtoo": "Watters Designs", "casablanca bridal": "Casablanca Bridal",
    "olya mak": "Olya Mak", "monica loretti": "Monica Loretti",
}
# Un nom de maison ne vaut que dans le contexte d'une robe : « jesse watters »
# ou « casablanca airport » n'ont rien à faire ici.
CONTEXTE_MAISON = re.compile(r"\b(robe|robes|dress|dresses|gown|gowns|bridal|mariee|mariage|wedding|collection|"
                             r"prix|price|paris|revendeur|stockist|essayage|boutique|avis|review|reviews|2025|2026|"
                             r"dentelle|lace|sirene|mermaid|princesse|satin|tulle|catalogue|lookbook|france)\b")
PARASITES_FORTS = re.compile(r"\b(porn|pornhub|hentai|sex|sexe|sissy|sissies|sissygasm|chastity|xxx|"
                             r"nude|onlyfans|la mariee etait en noir)\b")
PARASITES_NOMS = re.compile(r"\b(nue|tiktok|pokemon|font|mots fleches|solana|amaryllis|oksana|charlize|theron|"
                            r"seraphina|affleck|aleida rosales|santana motors|shiloh|zina park|elin avis|motors|"
                            r"crypto|movie|movies|actress|director|oil|powder|duff|funeral|avocat|gite|puy du fou|"
                            r"anime|lyrics|paroles|film|serie|netflix|dammarie|greyson|d r e a|deejay|deedee|"
                            r"melania trump|frankie faison|elie yaffa|seydou yaffa|dalma|hieke|doan|bellazaza|"
                            r"lainie kazan|metal flaque|eliza dushku|amarynth|galfi|alysa liu|mavie|sascha|"
                            r"olivier sinic|cheri|guapo|sampa|umi roanne|flor de jamaica|marley aliah|luna park|"
                            r"damaris lewis|pena des copains|ilse|cagliari|anela denisova|assurance|trump|"
                            r"joseph marie jacquard|rue joseph|jacquard biographie|old coach|castleblayney|"
                            r"login|customer service|phone number|flagship|coupon|promo code|discount code|"
                            r"gisele|michael|justine|paulina|hadley|le126|boston|australia|santa maria)\b")
HORS_PARIS = re.compile(r"\b(annecy|nogent|perpignan|lyon|marseille|toulouse|bordeaux|lille|nantes|"
                        r"strasbourg|montpellier|rennes|grenoble|rouen|reims|dijon|tours|metz|nancy|"
                        r"orleans|caen|brest|le havre|amiens|limoges|clermont|besancon|poitiers|pau|bayonne|"
                        r"biarritz|avignon|aix|antibes|monaco|geneve|bruxelles|lausanne|chambery|"
                        r"annemasse|haute savoie|savoie|normandie|bretagne|alsace|provence|belgique|suisse|"
                        r"luxembourg|maroc|tunisie|algerie|casablanca maroc|montreal|quebec|londres|london|"
                        r"espagne|espagnol|espagnole|italie|italienne|turque|turquie|liban|libanaise|"
                        r"versailles|saint germain|boulogne|neuilly|vincennes|creteil|evry|cergy|meaux|"
                        r"melun|pontoise|argenteuil|nanterre|montreuil|saint denis|ivry|levallois|courbevoie|"
                        # ajoutées le 01/11/2026 : préfectures, grandes communes, départements, régions, pays
                        r"cannes|antibes|nice|haguenau|thionville|albi|mulhouse|narbonne|vichy|barentin|fleury|valenciennes|angouleme|"
                        r"montauban|quimper|liege|longueau|finistere|chignac|colmar|troyes|auxerre|nevers|bourges|"
                        r"chartres|evreux|alencon|laval|le mans|cholet|niort|la rochelle|rochefort|saintes|"
                        r"perigueux|bergerac|agen|auch|tarbes|lourdes|montpellier|nimes|beziers|sete|ales|carcassonne|"
                        r"toulon|hyeres|frejus|draguignan|digne|manosque|arles|istres|martigues|aubagne|"
                        r"la ciotat|bastia|ajaccio|corse|chambery|annecy|thonon|valence|romans|montelimar|"
                        r"aurillac|rodez|millau|cahors|mende|saint etienne|roanne|villeurbanne|bourg en bresse|"
                        r"macon|chalon|le creusot|beaune|lons|dole|vesoul|belfort|montbeliard|epinal|saint die|"
                        r"verdun|chaumont|langres|sedan|charleville|laon|soissons|saint quentin|compiegne|"
                        r"beauvais|creil|senlis|arras|lens|bethune|douai|cambrai|maubeuge|dunkerque|calais|boulogne sur mer|"
                        r"abbeville|saint omer|tourcoing|roubaix|wattrelos|armentieres|hazebrouck|lorient|vannes|"
                        r"saint brieuc|saint malo|dinan|lannion|morlaix|concarneau|cherbourg|saint lo|coutances|"
                        r"bayeux|lisieux|honfleur|deauville|dieppe|fecamp|le havre|elbeuf|louviers|vernon|dreux|"
                        r"blois|vendome|vierzon|chateauroux|montlucon|moulins|gueret|limoges|brive|ussel|"
                        r"perpignan|foix|pamiers|castres|mazamet|saint gaudens|dax|mont de marsan|bayonne|anglet|"
                        r"saint jean de luz|pau|oloron|orthez|libourne|arcachon|merignac|pessac|talence|royan|cognac|"
                        r"poitiers|chatellerault|tours|amboise|orleans|montargis|gien|pithiviers|meaux|coulommiers|"
                        r"provins|fontainebleau|etampes|rambouillet|mantes|poissy|saint germain en laye|sartrouville|"
                        r"houilles|chatou|rueil|suresnes|puteaux|clichy|asnieres|colombes|gennevilliers|saint ouen|"
                        r"aubervilliers|pantin|bobigny|bondy|villemomble|chelles|"
                        r"marne la vallee|champigny|saint maur|maisons alfort|vitry|orly|thiais|rungis|"
                        r"antony|massy|palaiseau|orsay|les ulis|evry|corbeil|savigny|juvisy|draveil|"
                        r"versailles|velizy|saint cloud|sevres|meudon|issy|vanves|malakoff|montrouge|bagneux|"
                        r"fontenay|sceaux|le plessis|cachan|arcueil|gentilly|charenton|nogent sur marne|"
                        r"le perreux|joinville|saint mande|vincennes|montreuil|bagnolet|les lilas|romainville|"
                        r"sarcelles|goussainville|roissy|villiers le bel|franconville|"
                        r"conflans|cergy|saint ouen l aumone|l isle adam|"
                        r"rive nord|rive sud|quebec|montreal|laval quebec|gatineau|sherbrooke|belgique|bruxelles|"
                        r"liege|namur|charleroi|mons|tournai|anvers|gand|bruges|suisse|geneve|lausanne|fribourg|"
                        r"neuchatel|luxembourg|monaco|andorre|maroc|rabat|marrakech|tanger|fes|agadir|"
                        r"tunisie|tunis|sfax|sousse|algerie|alger|oran|constantine|senegal|dakar|cote d ivoire|"
                        r"abidjan|cameroun|douala|yaounde|madagascar|antananarivo|reunion|saint denis reunion|"
                        r"martinique|fort de france|guadeloupe|pointe a pitre|guyane|cayenne|tahiti|polynesie|"
                        r"nouvelle caledonie|noumea|mayotte|vietnam|hanoi|saigon|thailande|bangkok|liban|beyrouth|"
                        r"dubai|turquie|istanbul|italie|milan italie|rome|florence|venise|naples|espagne|madrid|"
                        r"barcelone|seville|valence espagne|portugal|lisbonne|porto|allemagne|berlin|munich|"
                        r"angleterre|londres|royaume uni|irlande|dublin|pays bas|amsterdam|etats unis|new york|"
                        r"los angeles|miami|chicago|dallas|houston|canada|toronto|vancouver|australie|sydney|"
                        r"melbourne|japon|tokyo|chine|pekin|shanghai|coree|seoul|inde|mumbai|delhi|bresil|"
                        r"sao paulo|mexique|argentine|chili|colombie|perou|grece|athenes|croatie|pologne|varsovie|"
                        r"republique tcheque|prague|autriche|hongrie|budapest|roumanie|bucarest|bulgarie|"
                        r"ukraine|kiev|lviv ukraine|russie|moscou|israel|tel aviv|egypte|le caire|afrique|europe|"
                        r"bretagne|normandie|picardie|lorraine|champagne ardenne|bourgogne|"
                        r"franche comte|auvergne|rhone alpes|paca|languedoc|roussillon|midi pyrenees|occitanie|"
                        r"aquitaine|nouvelle aquitaine|limousin|poitou|charente|vendee|pays de la loire|"
                        r"centre val de loire|grand est|hauts de france|nord pas de calais|dom tom|outre mer|"
                        r"ardeche|ardennes|ariege|aveyron|calvados|cantal|charente maritime|"
                        r"correze|cotes d armor|dordogne|drome|eure et loir|haute garonne|"
                        r"gironde|herault|ille et vilaine|indre et loire|isere|landes|loir et cher|"
                        r"haute loire|loire atlantique|loiret|lot et garonne|lozere|maine et loire|"
                        r"haute marne|mayenne|meurthe et moselle|meuse|morbihan|moselle|"
                        r"pas de calais|puy de dome|pyrenees|hautes pyrenees|pyrenees orientales|bas rhin|haut rhin|"
                        r"haute saone|saone et loire|haute savoie|seine maritime|seine et marne|"
                        r"yvelines|deux sevres|tarn et garonne|vaucluse|haute vienne|vosges|"
                        r"territoire de belfort|essonne|val d oise|seine saint denis|val de marne|hauts de seine|"
                        r"\d{5})\b")
ADJACENT = re.compile(r"\b(gant|gants|chale|echarpe|talon|talons|haut mariee|planning|organisation|listing|"
                      r"check liste|liste to do|to do|barbie|tissu pour mariage|tissu mariage|tissu mariee|tissus mariage|"
                      r"chignon|coiffure|coiffeur|henne|caftan|takchita|ongle|pyjama|basket|fleur|bouquet|"
                      r"bridal shower|check list|checklist|to do list|cadeau|rachete|rachat|revendre|revente|"
                      r"depot vente|voile|voil|chaussure|ensemble mariee|jupe seule|"
                      r"soiree|cocktail|ceremonie|invitee|invite|temoin|demoiselle|honneur|mere|maman|"
                      r"costume|smoking|homme|marie homme|chaussure|escarpin|bijou|bijoux|voile|jupon|"
                      r"lingerie|boléro|bolero|etole|cape seule|accessoire|coiffure|maquillage|bouquet|"
                      r"faire part|alliance|bague|lendemain|brunch|enterrement|evjf|bapteme|communion|"
                      r"gala|bal|prom|soir|fiancailles|fiançailles|retouche|nettoyage|pressing|location|louer|"
                      r"occasion|seconde main|vinted|leboncoin|patron|couture patron|tissu au metre|"
                      r"grossiste|fournisseur|fabricant|usine|chine|aliexpress|amazon|shein|temu|zara|"
                      r"mango|asos|kiabi|h m|tati|cocktail)\b")
# Hors de l'offre de la maison, même quand la requête dit « robe de mariée » :
# l'occasion, la grande distribution, les tenues d'invitée ou d'enfant, les
# cérémonies traditionnelles qu'elle ne couvre pas, l'entretien, la couture.
HORS_OFFRE = re.compile(r"\b(occasion|d occasion|seconde main|second hand|pas cher a moins|moins de 100|moins de 150|"
                        r"moins de 200|moins de 300|moins de 500|a moins de|invitee|invitees|invite|invites|petite fille|"
                        r"fillette|fille|enfant|enfants|bebe|garcon|homme|hommes|costume|temoin|demoiselle|cortege|"
                        r"mere de la mariee|mere du marie|belle mere|maman|grand mere|anniversaire de mariage|"
                        r"ans de mariage|noces d or|noces d argent|renouvellement|musulmane|musulman|islamique|"
                        r"hijab|voilee|juive|chinoise|indienne|pakistanaise|orientale|marocaine|algerienne|tunisienne|"
                        r"turque|africaine|caftan|takchita|sari|kimono|gothique|gothic|medievale|elfique|"
                        r"disney|barbie|deguisement|halloween|coudre|couture facile|patron|tuto|diy|faire soi meme|"
                        r"nettoyage|nettoyer|laver|lavage|detacher|repasser|conserver|conservation|garder|stockage|"
                        r"encadrement|encadrer|vitrine|mannequin|cintre|housse|rangement|teindre|teinture|"
                        r"retractation|remboursement|revendre|revente|rachat|louer sa|vendre sa|dupe|dupes|"
                        r"pinterest|instagram|tiktok|film|serie|chanson|paroles|dessin|coloriage|image|images|photo|"
                        r"photos|wallpaper|fond d ecran|gif|meme|emoji|jeu|jeux|poupee|lego|playmobil|"
                        r"robe de soiree|robe de cocktail|robe de ceremonie|robe de gala|robe de bal|tenue de ville|"
                        r"signification|reve|rever|islam|interpretation|histoire de la|inventeur|inventee|origine|"
                        r"mother of|used|usagee|usage|formation|apprendre|ecole|careers|career|logo|realty|tuxedo|"
                        r"international|headquarters|wholesale|grossiste|western|country|marilyn|20(0[0-9]|1[0-9]|2[0-4])|"
                        r"estrade|tabouret|podium|vitrine|cocktail|soiree|chaussur|chaussure|rachete|rachat|organiser|"
                        r"organisation|liste de mariage|fiable|site fiable|avec qui|capricieuse|test|quiz)\b")
TRANSAC_LOC = re.compile(r"\b(location|louer|loue)\b")
MARIAGE = re.compile(r"\b(mariee|mariage|wedding|bridal|bride|nuptial|nuptiale|noce|fiancee|epouse|"
                     r"marier|marie|civil|civile|mairie|essayage|showroom)\b")
MORPHO = re.compile(r"\b(morphologie|morpho|silhouette|grande taille|ronde|plus size|enceinte|grossesse|"
                    r"forte poitrine|petite|hanches)\b")
PERTINENT = re.compile(r"\b(robe|robes|mariee|mariage|wedding|bridal|bride|nuptial|nuptiale|noce|noces|"
                       r"bustier|sirene|princesse|boheme|trapeze|traine|essayage|showroom|couturiere|"
                       r"dentelle|satin|tulle|mikado|crepe|organza|mousseline|morphologie|fiancee|"
                       r"civil|dress|gown|createur|creatrice|boutique|magasin)\b")

PARIS = re.compile(r"\b(paris|parisien|parisienne|75\d{3}|ile de france|idf|pres de moi|near me|"
                   r"autour de moi|a cote|proche|ouest parisien|est parisien|banlieue|rive gauche|rive droite|"
                   r"marais|montmartre|bastille|republique|gare du nord|gare de l est|canal saint martin|"
                   r"faubourg saint martin|10e|10eme|1er|2e|3e|4e|5e|6e|7e|8e|9e|11e|12e|13e|14e|15e|16e|17e|"
                   r"18e|19e|20e|2eme|3eme|4eme|5eme|6eme|7eme|8eme|9eme|11eme|12eme|13eme|14eme|15eme|16eme|"
                   r"17eme|18eme|19eme|20eme|arrondissement)\b")

# ————————————————————————————————————————————————— clusters thématiques
# (ordre = priorité d'attribution du cluster principal)
CLUSTERS = [
    # coupes
    ("Coupe sirène", r"\b(sirene|mermaid|fourreau|moulante|pres du corps|ajustee|trompette|trumpet)\b"),
    ("Coupe princesse", r"\b(princesse|princess|ball gown|ballgown|volumineuse|meringue|jupe volume|crinoline)\b"),
    ("Coupe fluide", r"\b(fluide|flowy|legere|vaporeuse|aerienne|mousseline|voilage)\b"),
    ("Coupe trapèze", r"\b(trapeze|a line|coupe a|evasee|evase|forme a)\b"),
    ("Coupe deux-en-un", r"\b(deux en un|2 en 1|2en1|surjupe|amovible|amovibles|transformable|convertible|detachable)\b"),
    ("Coupe empire", r"\b(empire|taille haute)\b"),
    ("Coupe droite / colonne", r"\b(droite|colonne|column|sheath|tube)\b"),
    ("Robe courte", r"\b(courte|court|mini|midi|genou|genoux|short)\b"),
    # styles
    ("Style bohème", r"\b(boheme|bohemian|boho|champetre|hippie|folk|rustique|campagne|nature|gipsy|gypsy|"
                     r"bohème)\b"),
    ("Style minimaliste", r"\b(simple|minimaliste|minimalist|sobre|epuree|epure|discrete|basique|lisse|"
                          r"sans dentelle|unie|clean)\b"),
    ("Style romantique", r"\b(romantique|romantic|feerique|feerie|conte de fee|poetique|fleurie|fleurs|"
                         r"floral|florale|3d)\b"),
    ("Style vintage / rétro", r"\b(vintage|retro|annee 20|annees 20|annee 30|annee 50|annee 60|annee 70|"
                              r"charleston|gatsby|art deco|ancienne|old fashion|victorienne|retro)\b"),
    ("Style chic / élégant / luxe", r"\b(chic|elegante|elegant|luxe|luxueuse|haut de gamme|haute couture|"
                                    r"couture|prestige|sophistiquee|raffinee|glamour)\b"),
    ("Style moderne / originale", r"\b(moderne|modern|originale|original|tendance|design|contemporaine|"
                                  r"atypique|differente|audacieuse|rock|graphique)\b"),
    ("Style sexy / dos nu", r"\b(sexy|dos nu|dos nus|dos ouvert|decollete plongeant|transparente|transparence|"
                            r"tattoo|illusion|fendue|fente|echancree)\b"),
    ("Robe colorée / non blanche", r"\b(rouge|rose|noire|noir|bleu|bleue|verte|champagne|blush|nude|doree|"
                                   r"argentee|coloree|couleur|poudre|ivoire|ecru|creme|beige|pastel|bordeaux|"
                                   r"lavande|lilas)\b"),
    # matières et détails
    ("Matière dentelle", r"\b(dentelle|dentelles|lace|guipure|chantilly|calais|broderie|brodee|macrame)\b"),
    ("Matière satin / soie", r"\b(satin|satinee|soie|duchesse|silk|crepe|mikado|taffetas|zibeline)\b"),
    ("Matière tulle / organza", r"\b(tulle|organza|plumetis|pois|point d esprit|mousseline de soie)\b"),
    ("Détails : manches", r"\b(manche|manches|manches longues|manche longue|manches courtes|bouffantes|"
                          r"ballon|3 4|sans manche|bretelle|bretelles|epaules denudees|epaule)\b"),
    ("Détails : bustier / décolleté", r"\b(bustier|corset|corsage|decollete|col|encolure|bateau|coeur|carre|"
                                      r"americain|halter|v|rond|montant|cache coeur)\b"),
    ("Détails : traîne / cape / jupe", r"\b(traine|cape|jupe|surjupe|fendue|asymetrique|volants|volant|"
                                        r"plissee|drapee|drape|poches|noeud|ceinture)\b"),
    ("Détails : perles / paillettes", r"\b(perles|perle|paillettes|paillette|strass|sequins|brillante|"
                                       r"scintillante|cristaux|swarovski)\b"),
    # morphologies et tailles
    ("Grande taille", r"\b(grande taille|grandes tailles|ronde|rondes|plus size|curvy|pulpeuse|xl|xxl|"
                     r"taille 44|taille 46|taille 48|taille 50|taille 52|forte|voluptueuse)\b"),
    ("Mariée enceinte", r"\b(enceinte|grossesse|maternite|future maman|baby bump)\b"),
    ("Morphologie", r"\b(morphologie|morpho|silhouette|en a|en o|en v|en h|en 8|en x|petite|"
                    r"forte poitrine|petite poitrine|hanches|ventre|epaules larges|mince|fine)\b"),
    ("Âge / mariée mature", r"\b(40 ans|50 ans|60 ans|mature|senior|femme de|deuxieme mariage|second mariage|remariage)\b"),
    # occasions
    ("Mariage civil", r"\b(civil|civile|mairie|laique|laïque|hotel de ville|ceremonie civile|tailleur|"
                      r"combinaison|jumpsuit|tenue civil)\b"),
    ("Saison / destination", r"\b(hiver|ete|automne|printemps|plage|beach|destination|montagne|chateau|"
                             r"jardin|exterieur|chaud|froid|pluie)\b"),
    # transactionnel local
    ("Boutique robe de mariée Paris", r"\b(boutique|magasin|showroom|atelier|maison|adresse|ou acheter|"
                                      r"ou trouver|meilleure|meilleures|meilleur|top|liste|avis|essayer|"
                                      r"essayage|rendez vous|rdv|horaires|prise de rendez)\b"),
    ("Prix / budget", r"\b(prix|tarif|budget|cout|combien|euros|euro|eur|cher|chere|pas cher|petit prix|"
                      r"abordable|moins de|a partir de|promo|promotion|solde|soldes|destockage|outlet|"
                      r"degriffe|degriffee|fin de serie|bon plan|offre)\b"),
    ("Location robe de mariée", r"\b(location|louer|loue)\b"),
    ("Sur mesure / créateur", r"\b(sur mesure|surmesure|mesure|createur|creatrice|designer|couturiere|"
                              r"atelier|confection|fait main|artisanale|personnalisee|personnalisable)\b"),
    # informationnel
    ("Guide / conseils", r"\b(comment|quelle|quel|quels|quelles|choisir|conseil|conseils|guide|idee|idees|"
                         r"inspiration|tendance|tendances|2025|2026|2027|quand|pourquoi|faut il|est ce|"
                         r"peut on|difference|signification|histoire|origine|tradition|regle|regles|"
                         r"astuce|astuces|erreur|erreurs|checklist|liste|etapes|preparer|preparation|"
                         r"combien de temps|delai|delais|essayages|photos|photo|image|images|modele|modeles|"
                         r"catalogue|collection|nouvelle collection|nouveautes|lookbook)\b"),
    ("Anglais local (site EN)", r"\b(bridal|wedding) (shop|shops|store|stores|places|boutique|boutiques|showroom|"
                                 r"showrooms|salon|salons|atelier)\b|\bnear me\b|\bin paris\b"),
    ("Anglais (site EN)", r"\b(wedding dress|wedding dresses|bridal gown|bridal gowns|bridal dress|bridal shop|"
                           r"bridal boutique|wedding gown|wedding gowns|bridal store|bride dress)\b"),
    ("Robe de mariée (générique)", r"\b(robe|robes|dress|dresses|gown|gowns|tenue|tenue de mariee)\b"),
    ("Mariage (générique)", r"\b(mariage|mariee|wedding|bridal|bride|noces|nuptial|nuptiale)\b"),
]
CLUSTERS_RE = [(n, re.compile(p)) for n, p in CLUSTERS]

# Pages cibles par cluster : (URL V8, type, statut)
PAGES = {
    "Coupe sirène": ("/coupes/sirene/", "Page coupe", "existante (madamoon.fr/coupes/sirene)"),
    "Coupe princesse": ("/coupes/princesse/", "Page coupe", "existante"),
    "Coupe fluide": ("/coupes/fluide/", "Page coupe", "existante"),
    "Coupe trapèze": ("/coupes/trapeze/", "Page coupe", "existante"),
    "Coupe deux-en-un": ("/coupes/deux-en-un/", "Page coupe", "existante"),
    "Coupe empire": ("/coupes/fluide/", "Page coupe (section)", "à intégrer à la page fluide"),
    "Coupe droite / colonne": ("/coupes/sirene/", "Page coupe (section)", "à intégrer à la page sirène ou page dédiée si volume"),
    "Robe courte": ("/details/courte/", "Page détail", "créée le 01/11/2026 sous /details/ (quatre robes courtes) ; /coupes/courte/ si la maison en fait une coupe"),
    "Style bohème": ("/styles/boheme/", "Page style", "à créer"),
    "Style minimaliste": ("/styles/minimaliste/", "Page style", "à créer"),
    "Style romantique": ("/styles/romantique/", "Page style", "à créer"),
    "Style vintage / rétro": ("/guides/robe-de-mariee-vintage/", "Guide", "à créer si volume suffisant"),
    "Style chic / élégant / luxe": ("/robes/", "Page catalogue (angle éditorial)", "existante (madamoon.fr/robes)"),
    "Style moderne / originale": ("/styles/minimaliste/", "Page style (section)", "à intégrer"),
    "Style sexy / dos nu": ("/details/dos-nu/", "Page détail", "à créer"),
    "Robe colorée / non blanche": ("/guides/ivoire-ou-blanc/", "Guide (section « Et les robes de couleur ? »)", "existante ; /guides/robe-de-mariee-couleur/ si la maison confirme des coloris"),
    "Matière dentelle": ("/matieres/dentelle/", "Page matière", "à créer"),
    "Matière satin / soie": ("/matieres/satin/", "Page matière", "à créer"),
    "Matière tulle / organza": ("/guides/tissus-robe-de-mariee/", "Guide", "à créer"),
    "Détails : manches": ("/details/manches-longues/", "Page détail", "à créer"),
    "Détails : bustier / décolleté": ("/details/bustier/", "Page détail", "à créer"),
    "Détails : traîne / cape / jupe": ("/guides/traine-robe-de-mariee/", "Guide", "à créer si volume suffisant"),
    "Détails : perles / paillettes": ("/styles/romantique/", "Page style (section féerique : Carrie, Agnessa, Hélène)", "existante"),
    "Morphologie": ("/morphologies/", "Hub morphologies + 6 pages", "existantes (madamoon.fr/morphologies)"),
    "Grande taille": ("/morphologies/grande-taille/", "Page éditoriale", "à créer (vérifier les tailles disponibles)"),
    "Mariée enceinte": ("/guides/robe-de-mariee-enceinte/", "Guide", "à créer"),
    "Âge / mariée mature": ("/guides/robe-de-mariee-apres-40-ans/", "Guide", "créée le 01/11/2026 (conseil, sans produit spécifique)"),
    "Mariage civil": ("/styles/mariage-civil/", "Page éditoriale", "à créer"),
    "Saison / destination": ("/guides/tissus-robe-de-mariee/", "Guide (section « Quel tissu pour quelle saison ? »)", "existante"),
    "Boutique robe de mariée Paris": ("/", "Accueil + /showroom/", "existantes"),
    "Prix / budget": ("/guides/prix-robe-de-mariee-paris/", "Guide", "à créer (à partir de 1 500 € : rester factuel)"),
    "Location robe de mariée": ("/guides/acheter-ou-louer-sa-robe-de-mariee/", "Guide", "à créer SEULEMENT si la maison confirme ne pas louer : réponse honnête"),
    "Sur mesure / créateur": ("/createurs/", "Hub créateurs + pages maisons", "existantes"),
    "Guide / conseils": ("/guides/", "Hub guides", "hub à créer (madamoon.fr n'a pas de section guides)"),
    "Robe de mariée (générique)": ("/robes/", "Page catalogue", "existante (madamoon.fr/robes)"),
    "Mariage (générique)": ("/", "Accueil", "existante"),
    "Créateurs MADAMOON": ("/createurs/[maison]/", "Pages créateurs", "existantes"),
    "Marque MADAMOON": ("/", "Accueil (requêtes de marque)", "existante"),
    "Local Paris": ("/showroom/", "Showroom", "existante v7"),
    "Anglais (site EN)": ("/en/dresses/", "Catalogue anglais", "existante (site bilingue)"),
    "Anglais local (site EN)": ("/en/", "Accueil anglais", "existante (site bilingue)"),
}


# ————————————————————————————————————————————————— chargement
def charger():
    lignes = []
    fichiers = sorted(glob.glob(os.path.join(RAW, "organic_*.csv")))
    for f in fichiers:
        base = os.path.basename(f)
        dom = base.split("organic_")[1].split("_pos")[0]
        tranche = base.split("_pos")[1].split("_")[0]
        with open(f, encoding="utf-8") as fh:
            for r in csv.DictReader(fh, delimiter=";"):
                lignes.append({
                    "domaine": dom, "tranche": tranche, "fichier": base,
                    "keyword": r["Keyword"].strip(),
                    "position": int(r["Position"] or 0),
                    "position_prec": int(r["Previous Position"] or 0),
                    "volume": int(float(r["Search Volume"] or 0)),
                    "cpc": float(r["CPC"] or 0),
                    "url": r["Url"],
                    "trafic": int(float(r["Traffic"] or 0)),
                    "part_trafic": float(r["Traffic (%)"] or 0),
                    "kd": float(r["Keyword Difficulty"] or 0),
                    "intents": r["Intents"],
                    "competition": float(r["Competition"] or 0),
                    "trend": r["Trends"],
                })
    return lignes, fichiers


AUTO = os.path.join(ROOT, "seo-research", "raw", "autocompletion")


def charger_autocompletion():
    """Suggestions Google / Bing (scripts/seo/autocompletion.py) : des requêtes
    réellement tapées, SANS volume ni difficulté. Elles complètent la base là
    où Semrush s'est arrêté, et restent marquées « volume non vérifié »."""
    sugg = collections.defaultdict(set)
    for f in sorted(glob.glob(os.path.join(AUTO, "*_fr_*.csv"))):
        moteur = os.path.basename(f).split("_fr_")[0]
        with open(f, encoding="utf-8") as fh:
            for r in csv.DictReader(fh, delimiter=";"):
                kw = r["suggestion"].strip().lower()
                if kw:
                    sugg[kw].add(moteur)
    return sugg


def intention(code):
    codes = [c for c in code.split(",") if c]
    if not codes:
        return "inconnue"
    return " / ".join(INTENTS.get(c, c) for c in codes)


def classer(kw):
    """Pertinence pour MADAMOON."""
    n = norm(kw)
    nt = " ".join(tokens(kw))
    nn = n + " || " + nt
    mariage = bool(MARIAGE.search(nn))
    if PARASITES_FORTS.search(nn):
        return "parasite", None
    if re.search(r"\bmadamoon|mada moon|madamoun|madamon\b", nn):
        return "pertinent", "Marque MADAMOON"
    if PARASITES_NOMS.search(nn) and not mariage:
        return "parasite", None
    for m in sorted(CREATEURS_MADAMOON, key=len, reverse=True):
        if re.search(r"\b" + re.escape(m) + r"\b", n):
            if CONTEXTE_MAISON.search(nn) and not re.search(r"\b(jesse|airport|maroc|morocco)\b", nn):
                return "pertinent", "Créateurs MADAMOON"
            return "hors sujet", None
    for m in MARQUES_TIERCES:
        if re.search(r"\b" + re.escape(m) + r"\b", nn):
            return "marque tierce", None
    if HORS_PARIS.search(nn):
        return "local hors Paris", None
    if HORS_OFFRE.search(nn):
        return "adjacent", None
    if ADJACENT.search(nn) and not re.search(r"\b(robe de mariee|robe mariee|robe de mariage|robe mariage|"
                                             r"wedding dress|bridal gown|bridal dress)\b", nn):
        return "adjacent", None
    if not PERTINENT.search(nn):
        return "hors sujet", None
    # L'intention de mariage est obligatoire : une « robe femme enceinte bleu
    # ciel » ou une « robe grande taille vert sauge » ne cherche pas de mariée.
    if not mariage and not re.search(r"\bmorpho", nn):
        return "mode générique (sans intention mariage)", None
    return "pertinent", None


def cluster_de(kw):
    n = norm(kw) + " || " + " ".join(tokens(kw))
    trouves = [nom for nom, rx in CLUSTERS_RE if rx.search(n)]
    # « manche courte » parle des manches, pas d'une robe courte
    if re.search(r"\bmanches? courtes?\b", n) and "Détails : manches" in trouves:
        trouves = ["Détails : manches"] + [t for t in trouves if t != "Détails : manches"]
    local = bool(PARIS.search(n))
    if not trouves:
        principal = "Local Paris" if local else "Mariage (générique)"
    else:
        principal = trouves[0]
        # un mot-clé purement local + générique bascule sur le cluster boutique/local
        if principal in ("Robe de mariée (générique)", "Mariage (générique)", "Guide / conseils") and local:
            principal = "Boutique robe de mariée Paris"
    secondaires = [t for t in trouves[1:] if t not in ("Robe de mariée (générique)", "Mariage (générique)")]
    return principal, secondaires[:3], local


def priorite(volume, kd, intent, local, nb_conc, pos_nous):
    """Score 0-100 : potentiel commercial, volume, difficulté, local, quick win."""
    s = 0.0
    s += min(40.0, 8.0 * math.log10(volume + 1) * 1.6)           # volume (log)
    s += max(0.0, 25.0 - kd * 0.35)                               # difficulté
    if "transactionnel" in intent or "commercial" in intent:
        s += 15
    elif "informationnel" in intent:
        s += 6
    if local:
        s += 12
    s += min(8, 2 * nb_conc)                                      # plusieurs concurrents = marché prouvé
    if pos_nous and 4 <= pos_nous <= 30:
        s += 8                                                    # quick win
    return round(min(100.0, s), 1)


def construire():
    lignes, fichiers = charger()
    par_kw = collections.defaultdict(list)
    for l in lignes:
        par_kw[l["keyword"]].append(l)

    sugg = charger_autocompletion()
    # une suggestion déjà présente dans Semrush n'ajoute qu'une source ;
    # les autres entrent sans volume
    semrush_norm = {norm(k): k for k in par_kw}
    ajoutees = 0
    for kw, moteurs in sugg.items():
        if norm(kw) in semrush_norm:
            continue
        semrush_norm[norm(kw)] = kw
        par_kw[kw] = [{"domaine": "", "tranche": "", "fichier": "autocompletion:" + "+".join(sorted(moteurs)),
                       "keyword": kw, "position": 0, "position_prec": 0, "volume": 0, "cpc": 0.0, "url": "",
                       "trafic": 0, "part_trafic": 0.0, "kd": 0.0, "intents": "", "competition": 0.0, "trend": "",
                       "autocompletion": True}]
        ajoutees += 1
    for kw, moteurs in sugg.items():
        k = semrush_norm.get(norm(kw))
        if k in par_kw and not any(l.get("autocompletion") for l in par_kw[k]):
            par_kw[k].append({**par_kw[k][0], "fichier": "autocompletion:" + "+".join(sorted(moteurs)),
                              "autocompletion": True, "domaine": "", "position": 0})
    print("suggestions d'autocomplétion distinctes:", len(sugg), "| nouvelles (absentes de Semrush):", ajoutees)

    # Le vocabulaire sûr : les mots des mots-clés Semrush jugés pertinents.
    # Derrière « boutique », « magasin », « showroom », « atelier » ou
    # « couturière », un mot qui n'en fait pas partie est presque toujours
    # une ville — et la maison ne vend qu'à Paris.
    VOCAB = set()
    for kw, ls in par_kw.items():
        if any(not l.get("autocompletion") for l in ls) and classer(kw)[0] == "pertinent":
            VOCAB.update(tokens(kw))
    VOCAB.update("""paris parisien parisienne idf ile france avis prix tarif cher chere mesure luxe rdv rendez vous
        sans gratuit essayage essayer meilleur meilleure ouvert dimanche lundi samedi ligne site adresse horaires
        telephone contact madamoon showroom boutique magasin atelier couturiere createur creatrice marque marques
        multimarque multimarques collection nouvelle nouveautes arrivage promotion promo solde soldes degriffe
        destockage outlet petit budget haut gamme prestige couture semi confection retouche retouches delai delais
        rapide urgent derniere minute grande taille ronde enceinte civil civile mairie courte simple boheme
        dentelle satin sirene princesse fluide trapeze bustier manche manches dos nu romantique vintage chic
        elegante moderne originale ivoire blanche couleur 10e 10eme arrondissement gare nord est republique
        canal saint martin faubourg metro proche pres cote quartier centre ville rive gauche droite""".split())
    LOCAL_PATTERN = re.compile(r"\b(boutique|magasin|magasins|boutiques|showroom|atelier|couturiere|createur|createurs|"
                               r"creatrice|essayage|ou trouver|ou acheter)\b")

    base = []
    for kw, ls in par_kw.items():
        volume = max(l["volume"] for l in ls)
        verifie = any(not l.get("autocompletion") for l in ls)
        kd = max(l["kd"] for l in ls)
        cpc = max(l["cpc"] for l in ls)
        intents = next((l["intents"] for l in ls if l["intents"]), "")
        trend = ls[0]["trend"]
        positions = {}
        urls = {}
        for l in ls:
            d = l["domaine"]
            if not d or l.get("autocompletion"):
                continue
            if d not in positions or l["position"] < positions[d]:
                positions[d] = l["position"]
                urls[d] = l["url"]
        statut, forcé = classer(kw)
        if statut == "pertinent" and not verifie and LOCAL_PATTERN.search(norm(kw)):
            inconnus = [t for t in tokens(kw) if t not in VOCAB and not t.isdigit()]
            if inconnus and not PARIS.search(norm(kw)):
                statut = "local hors Paris"
        principal, secondaires, local = cluster_de(kw)
        if forcé:
            principal = forcé
        if statut != "pertinent":
            principal = {"parasite": "— parasite", "marque tierce": "— marque tierce",
                         "local hors Paris": "— local hors Paris", "adjacent": "— adjacent (hors cœur de cible)",
                         "hors sujet": "— hors sujet",
                         "mode générique (sans intention mariage)": "— mode générique (sans intention mariage)"}[statut]
        conc = [d for d in CONCURRENTS if d in positions]
        pos_nous = positions.get(NOUS)
        meilleur_conc = min((positions[d] for d in conc), default=None)
        # keyword gap (calcul local sur extraction partielle)
        if pos_nous and conc:
            if pos_nous < meilleur_conc:
                gap = "strong (nous devant)"
            elif pos_nous > max(positions[d] for d in conc):
                gap = "weak (nous derrière tous)"
            else:
                gap = "shared (positions mêlées)"
        elif pos_nous and not conc:
            gap = "unique (nous seuls)"
        elif conc and not pos_nous:
            gap = "missing (tous les concurrents extraits)" if len(conc) >= 2 else "untapped (≥ 1 concurrent)"
        else:
            gap = ""
        inten = intention(intents)
        page, type_page, statut_page = PAGES.get(principal, ("", "", ""))
        if principal == "Créateurs MADAMOON":
            n_ = norm(kw)
            slug = ("watters-designs" if "watters" in n_ or "wtoo" in n_ else "casablanca-bridal" if "casablanca" in n_
                    else "olya-mak" if "olya" in n_ else "monica-loretti")
            anglais = bool(re.search(r"\b(dress|dresses|gown|gowns|price|prices|review|reviews|stockist|near me|"
                                     r"wedding|bridal|collection|style|overskirt|sleeves|formal|size|photos)\b", n_)) \
                and not re.search(r"\b(robe|robes|mariee|mariage|prix|avis|boutique|essayage|paris|revendeur)\b", n_)
            page = f"/en/designers/{slug}/" if anglais else f"/createurs/{slug}/"
            type_page = "Page maison" + (" (anglais)" if anglais else "")
        if statut != "pertinent":
            page, type_page, statut_page = ("— aucune (non ciblé)", "", "")
        base.append({
            "keyword": kw, "cle_variante": cle_variante(kw), "volume": volume, "kd": kd, "cpc": cpc,
            "volume_verifie": "oui (Semrush)" if verifie else "non (autocomplétion)",
            "source_type": "semrush" if verifie else "autocompletion",
            "intention": inten, "intents_code": intents, "trend": trend,
            "statut": statut, "cluster": principal, "clusters_secondaires": " | ".join(secondaires),
            "local_paris": "oui" if local else "",
            "pos_madamoon": pos_nous or "", "url_madamoon": urls.get(NOUS, ""),
            **{f"pos_{d}": positions.get(d, "") for d in CONCURRENTS},
            **{f"url_{d}": urls.get(d, "") for d in CONCURRENTS},
            "nb_concurrents": len(conc), "meilleur_concurrent": meilleur_conc or "",
            "gap": gap, "page_cible": page, "type_page": type_page, "statut_page": statut_page,
            "priorite": priorite(volume, kd, inten, local, len(conc), pos_nous) if statut == "pertinent" else 0,
            "sources": " | ".join(sorted(set(l["fichier"] for l in ls))),
        })

    # groupes de variantes : représentant = plus fort volume
    groupes = collections.defaultdict(list)
    for b in base:
        groupes[(b["statut"], b["cle_variante"])].append(b)
    for (st, cle), membres in groupes.items():
        membres.sort(key=lambda b: (-b["volume"], b["keyword"]))
        rep = membres[0]["keyword"]
        for m in membres:
            m["groupe_variantes"] = rep
            m["nb_variantes"] = len(membres)
            m["volume_groupe"] = sum(x["volume"] for x in membres)

    base.sort(key=lambda b: (b["statut"] != "pertinent", -b["priorite"], -b["volume"]))
    with open(os.path.join(OUT, "base_mots_cles.json"), "w", encoding="utf-8") as fh:
        json.dump({"lignes_brutes": lignes, "base": base, "fichiers": [os.path.basename(f) for f in fichiers]},
                  fh, ensure_ascii=False)
    cols = list(base[0].keys())
    with open(os.path.join(OUT, "base_mots_cles.csv"), "w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=cols, delimiter=";")
        w.writeheader()
        w.writerows(base)

    # statistiques
    st = collections.Counter(b["statut"] for b in base)
    pert = [b for b in base if b["statut"] == "pertinent"]
    cl = collections.Counter(b["cluster"] for b in pert)
    print("lignes brutes Semrush:", len(lignes), "| mots-clés uniques:", len(base),
          "| dont volume vérifié:", sum(1 for b in base if b["source_type"] == "semrush"),
          "| dont autocomplétion seule:", sum(1 for b in base if b["source_type"] == "autocompletion"))
    pert_auto = sum(1 for b in base if b["statut"] == "pertinent" and b["source_type"] == "autocompletion")
    print("pertinents par source : semrush", sum(1 for b in base if b["statut"] == "pertinent" and b["source_type"] == "semrush"),
          "| autocomplétion", pert_auto)
    print("statuts:", dict(st))
    print("pertinents:", len(pert), "| groupes de variantes:", len({b['cle_variante'] for b in pert}))
    print("volume cumulé pertinents:", sum(b["volume"] for b in pert))
    print("gap:", collections.Counter(b["gap"] for b in pert).most_common())
    for nom, n in cl.most_common():
        vol = sum(b["volume"] for b in pert if b["cluster"] == nom)
        print(f"  {n:4d}  vol {vol:7d}  {nom}")
    return base



# ————————————————————————————————————————————————— expansion sémantique (non vérifiée)
def expansion(base):
    """Requêtes plausibles déduites de l'architecture MADAMOON, absentes des exports.
    Volume et KD NON vérifiés (unités Semrush épuisées) : à passer dans phrase_these / phrase_kdi."""
    existants = {cle_variante(b["keyword"]) for b in base}
    gen = []
    def add(kw, cluster, page, intent, motif):
        if cle_variante(kw) in existants:
            return
        existants.add(cle_variante(kw))
        gen.append({"keyword": kw, "cluster": cluster, "page_cible": page, "intention": intent,
                    "motif": motif, "source": "expansion sémantique MADAMOON (volume non vérifié)"})
    coupes = {"sirène": "Coupe sirène", "princesse": "Coupe princesse", "fluide": "Coupe fluide",
              "trapèze": "Coupe trapèze", "deux-en-un": "Coupe deux-en-un", "bohème": "Style bohème",
              "courte": "Robe courte", "minimaliste": "Style minimaliste", "romantique": "Style romantique",
              "en dentelle": "Matière dentelle", "en satin": "Matière satin / soie",
              "manches longues": "Détails : manches", "dos nu": "Style sexy / dos nu", "bustier": "Détails : bustier / décolleté",
              "grande taille": "Grande taille", "civile": "Mariage civil"}
    for c, cl in coupes.items():
        page = PAGES[cl][0]
        for t in ["robe de mariée {c} paris", "robe de mariée {c} boutique paris", "essayer une robe de mariée {c} à paris",
                  "robe de mariée {c} sur mesure paris", "robe de mariée {c} prix", "robe de mariée {c} 2026",
                  "robe de mariée {c} à quelle morphologie", "robe de mariée {c} avis"]:
            add(t.format(c=c), cl, page, "commercial / local", "déclinaison locale et commerciale d'une page coupe/style")
    for a, b in [("sirène", "dentelle"), ("sirène", "satin"), ("sirène", "manches longues"), ("sirène", "dos nu"),
                 ("princesse", "dentelle"), ("princesse", "tulle"), ("princesse", "manches longues"), ("princesse", "bustier"),
                 ("fluide", "dentelle"), ("fluide", "satin"), ("fluide", "mousseline"), ("fluide", "dos nu"),
                 ("trapèze", "dentelle"), ("trapèze", "satin"), ("trapèze", "manches longues"), ("trapèze", "bustier"),
                 ("bohème", "dentelle"), ("bohème", "manches longues"), ("bohème", "dos nu"), ("bohème", "fluide"),
                 ("courte", "dentelle"), ("courte", "satin"), ("civile", "courte"), ("civile", "simple"),
                 ("deux-en-un", "surjupe amovible"), ("deux-en-un", "traîne amovible")]:
        cl = coupes.get(a, "Robe de mariée (générique)")
        add(f"robe de mariée {a} {b}", cl, PAGES[cl][0], "commercial", "croisement coupe × matière/détail (section de page)")
        add(f"robe de mariée {a} {b} paris", cl, PAGES[cl][0], "commercial / local", "croisement coupe × matière/détail, local")
    for m in ["O", "A", "V", "H", "8", "X"]:
        page = f"/morphologies/{m.lower()}/"
        for t in ["robe de mariée morphologie en {m}", "robe de mariée pour morphologie {m}",
                  "quelle robe de mariée pour une morphologie en {m}", "morphologie en {m} quelle robe de mariée choisir",
                  "robe de mariée morphologie {m} paris", "coupe de robe de mariée morphologie en {m}",
                  "robe de mariée sirène morphologie en {m}", "robe de mariée princesse morphologie en {m}",
                  "robe de mariée fluide morphologie en {m}", "robe de mariée trapèze morphologie en {m}",
                  "robe de mariée bohème morphologie en {m}", "morphologie en {m} mariée"]:
            add(t.format(m=m), "Morphologie", page, "informationnel / commercial", "grille morphologie × coupe (pages morphologies)")
    for n in range(1, 21):
        arr = "1er" if n == 1 else f"{n}e"
        for t in ["robe de mariée paris {a}", "boutique robe de mariée paris {a}", "magasin robe de mariée paris {a}",
                  "essayage robe de mariée paris {a}"]:
            add(t.format(a=arr), "Local Paris", "/showroom/", "commercial / local", "maillage local par arrondissement (une seule page showroom, pas 20 pages)")
    for q in ["gare du nord", "gare de l'est", "canal saint-martin", "république", "faubourg saint-martin", "paris 10", "paris nord",
              "paris est", "paris centre", "rive droite", "île-de-france", "seine-saint-denis", "val-de-marne", "hauts-de-seine",
              "montreuil", "saint-denis", "pantin", "vincennes", "neuilly", "boulogne"]:
        add(f"robe de mariée {q}", "Local Paris", "/showroom/", "commercial / local", "proximité du showroom (234 rue du Faubourg Saint-Martin)")
        add(f"boutique robe de mariée {q}", "Local Paris", "/showroom/", "commercial / local", "proximité du showroom")
    for c, slug in [("watters", "watters-designs"), ("watters designs", "watters-designs"), ("wtoo by watters", "watters-designs"),
                    ("casablanca bridal", "casablanca-bridal"), ("olya mak", "olya-mak"), ("monica loretti", "monica-loretti")]:
        page = f"/createurs/{slug}/"
        for t in ["{c} paris", "{c} robe de mariée", "robe de mariée {c}", "{c} boutique paris", "{c} revendeur paris",
                  "{c} revendeur france", "{c} prix", "{c} avis", "{c} collection 2026", "{c} essayage paris", "où essayer {c}",
                  "robe {c} dentelle", "robe {c} sirène", "robe {c} princesse"]:
            add(t.format(c=c), "Créateurs MADAMOON", page, "navigationnel / commercial", "requêtes de marque des maisons distribuées")
    for q, cl, page in [
        ("comment choisir sa robe de mariée", "Guide / conseils", "/guides/choisir-sa-robe-de-mariee/"),
        ("quand acheter sa robe de mariée", "Guide / conseils", "/guides/quand-acheter-sa-robe-de-mariee/"),
        ("combien de temps avant le mariage acheter sa robe", "Guide / conseils", "/guides/quand-acheter-sa-robe-de-mariee/"),
        ("comment se passe un essayage de robe de mariée", "Guide / conseils", "/showroom/"),
        ("combien d'essayages pour une robe de mariée", "Guide / conseils", "/showroom/"),
        ("essayage robe de mariée combien de personnes", "Guide / conseils", "/showroom/"),
        ("essayage robe de mariée que porter", "Guide / conseils", "/showroom/"),
        ("essayage privé robe de mariée paris", "Boutique robe de mariée Paris", "/showroom/"),
        ("showroom robe de mariée paris", "Boutique robe de mariée Paris", "/showroom/"),
        ("rendez-vous essayage robe de mariée paris", "Boutique robe de mariée Paris", "/rendez-vous/"),
        ("prendre rendez-vous boutique robe de mariée paris", "Boutique robe de mariée Paris", "/rendez-vous/"),
        ("boutique robe de mariée paris sur rendez-vous", "Boutique robe de mariée Paris", "/rendez-vous/"),
        ("boutique robe de mariée paris avis", "Boutique robe de mariée Paris", "/"),
        ("meilleure boutique robe de mariée paris", "Boutique robe de mariée Paris", "/"),
        ("boutique robe de mariée paris multimarque", "Boutique robe de mariée Paris", "/createurs/"),
        ("boutique robe de mariée créateurs américains paris", "Sur mesure / créateur", "/createurs/"),
        ("robe de mariée américaine paris", "Sur mesure / créateur", "/createurs/"),
        ("quelle robe de mariée pour une petite taille", "Morphologie", "/morphologies/"),
        ("quelle robe de mariée pour une grande taille", "Grande taille", "/morphologies/grande-taille/"),
        ("quelle robe de mariée pour une forte poitrine", "Morphologie", "/morphologies/v/"),
        ("quelle robe de mariée pour une petite poitrine", "Morphologie", "/morphologies/"),
        ("quelle robe de mariée pour cacher le ventre", "Morphologie", "/morphologies/o/"),
        ("quelle robe de mariée pour des hanches larges", "Morphologie", "/morphologies/a/"),
        ("quelle robe de mariée pour des épaules larges", "Morphologie", "/morphologies/v/"),
        ("quelle robe de mariée pour une taille marquée", "Morphologie", "/morphologies/x/"),
        ("quelle robe de mariée pour une silhouette rectangle", "Morphologie", "/morphologies/h/"),
        ("différence robe sirène et robe fourreau", "Coupe sirène", "/coupes/sirene/"),
        ("différence robe trapèze et robe princesse", "Coupe trapèze", "/coupes/trapeze/"),
        ("robe de mariée deux en un c'est quoi", "Coupe deux-en-un", "/coupes/deux-en-un/"),
        ("robe de mariée à surjupe amovible", "Coupe deux-en-un", "/coupes/deux-en-un/"),
        ("robe de mariée transformable cérémonie soirée", "Coupe deux-en-un", "/coupes/deux-en-un/"),
        ("prix robe de mariée sur mesure paris", "Prix / budget", "/guides/prix-robe-de-mariee-paris/"),
        ("budget robe de mariée paris", "Prix / budget", "/guides/prix-robe-de-mariee-paris/"),
        ("robe de mariée à partir de 1500 euros", "Prix / budget", "/guides/prix-robe-de-mariee-paris/"),
        ("robe de mariée entre 1500 et 3000 euros", "Prix / budget", "/guides/prix-robe-de-mariee-paris/"),
        ("retouches robe de mariée comprises", "Prix / budget", "/guides/prix-robe-de-mariee-paris/"),
        ("délai confection robe de mariée sur mesure", "Sur mesure / créateur", "/guides/quand-acheter-sa-robe-de-mariee/"),
        ("robe de mariée confection sur mesure paris", "Sur mesure / créateur", "/createurs/"),
        ("robe de mariée semi-mesure paris", "Sur mesure / créateur", "/createurs/watters-designs/"),
        ("robe de mariée mariage civil paris", "Mariage civil", "/styles/mariage-civil/"),
        ("robe de mariée mairie chic", "Mariage civil", "/styles/mariage-civil/"),
        ("robe de mariée bohème chic paris", "Style bohème", "/styles/boheme/"),
        ("robe de mariée bohème dentelle manches longues", "Style bohème", "/styles/boheme/"),
        ("robe de mariée minimaliste satin paris", "Style minimaliste", "/styles/minimaliste/"),
        ("robe de mariée épurée crêpe", "Style minimaliste", "/styles/minimaliste/"),
        ("robe de mariée romantique dentelle fleurs 3d", "Style romantique", "/styles/romantique/"),
        ("robe de mariée dos illusion dentelle", "Style sexy / dos nu", "/details/dos-nu/"),
        ("robe de mariée manches longues dentelle paris", "Détails : manches", "/details/manches-longues/"),
        ("robe de mariée manches longues hiver", "Détails : manches", "/details/manches-longues/"),
        ("robe de mariée bustier cœur dentelle", "Détails : bustier / décolleté", "/details/bustier/"),
        ("robe de mariée col bateau manches longues", "Détails : bustier / décolleté", "/details/bustier/"),
        ("robe de mariée tendance 2026", "Guide / conseils", "/guides/tendances-robe-de-mariee-2026/"),
        ("tendance robe de mariée 2027", "Guide / conseils", "/guides/tendances-robe-de-mariee-2026/"),
        ("robe de mariée ivoire ou blanc", "Guide / conseils", "/guides/ivoire-ou-blanc/"),
        ("différence blanc et ivoire robe de mariée", "Guide / conseils", "/guides/ivoire-ou-blanc/"),
        ("robe de mariée dentelle de calais", "Matière dentelle", "/matieres/dentelle/"),
        ("robe de mariée dentelle guipure", "Matière dentelle", "/matieres/dentelle/"),
        ("robe de mariée mikado paris", "Matière satin / soie", "/matieres/satin/"),
        ("robe de mariée crêpe de soie", "Matière satin / soie", "/matieres/satin/"),
    ]:
        add(q, cl, page, "informationnel / commercial", "intention réelle d'une future mariée, à vérifier en volume")
    return gen


if __name__ == "__main__":
    base = construire()
    gen = expansion(base)
    with open(os.path.join(OUT, "expansion.json"), "w", encoding="utf-8") as fh:
        json.dump(gen, fh, ensure_ascii=False)
    print("expansion (non vérifiée):", len(gen))
