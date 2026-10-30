# Mettre le site en ligne chez Hostinger

La cliente garde son domaine et son hébergement Hostinger. Rien à
changer côté DNS : le domaine pointe déjà sur l'hébergement, et c'est le
contenu de `public_html` que l'on remplace.

Le site est un **export statique** : que des fichiers (HTML, images,
vidéos, PDF). Aucun Node, aucune base de données, aucun module à
installer sur le serveur. N'importe quelle formule Hostinger avec
hébergement web convient.

---

## 1. Fabriquer la version de production

```bash
npm run build:hostinger
```

Trois différences avec l'aperçu GitHub Pages :

| | Aperçu GitHub Pages | Hostinger |
|---|---|---|
| Adresses | `/madamoon-v7/robes/` | `/robes/` |
| Moteurs de recherche | interdits (`robots.txt` ferme tout) | autorisés, avec le plan du site |
| Commande | `npm run build:pages` | `npm run build:hostinger` |

Le résultat est le dossier **`out/`** : environ 570 Mo et 3 700 fichiers,
dont 330 Mo de photographies de robes et 100 Mo de vidéos. C'est le
contenu de `out/` — et non le dossier lui-même — qui va dans
`public_html`.

`out/` contient aussi `.htaccess` (forçage du HTTPS, domaine sans
« www », page 404 du site, durées de cache, compression). Le gestionnaire
de fichiers de Hostinger masque les fichiers commençant par un point :
il faut activer « Afficher les fichiers cachés » pour le voir.

---

## 2. Envoyer les fichiers

Trois façons, de la plus simple à la plus automatique.

### a. Gestionnaire de fichiers (première mise en ligne)

1. hPanel → **Fichiers** → **Gestionnaire de fichiers** → `public_html`.
2. **Sauvegarder l'ancien site avant tout** : hPanel → Fichiers →
   Sauvegardes, ou télécharger `public_html` en archive.
3. Vider `public_html`, puis envoyer une archive `.zip` du **contenu**
   de `out/` et l'extraire sur place.

```bash
cd out && zip -r ../madamoon-site.zip . -x '.DS_Store'
```

### b. FTP (mises à jour manuelles)

hPanel → Fichiers → **Comptes FTP** donne l'hôte, l'utilisateur et le
mot de passe. Avec FileZilla ou Cyberduck, envoyer le contenu de `out/`
dans `public_html`. Seuls les fichiers modifiés ont besoin de repartir.

### c. GitHub Actions (mises à jour automatiques)

Le dépôt contient `.github/workflows/hostinger.yml`. Il compile le site
et l'envoie par FTP. Il ne se déclenche qu'à la main (onglet Actions →
« Mise en ligne Hostinger » → Run workflow) : personne ne publie sur le
site de la cliente par accident.

Il faut d'abord créer trois secrets dans GitHub (Settings → Secrets and
variables → Actions) :

| Secret | Valeur |
|---|---|
| `FTP_SERVEUR` | l'hôte FTP donné par hPanel |
| `FTP_UTILISATEUR` | l'utilisateur FTP |
| `FTP_MOTDEPASSE` | son mot de passe |

Ce chemin n'a pas encore été essayé : il demande des identifiants que
nous n'avons pas. La première mise en ligne restera de toute façon plus
sûre à la main.

---

## 3. Après la mise en ligne

- **HTTPS** : hPanel → Sécurité → SSL. Le certificat gratuit suffit ;
  le `.htaccess` redirige déjà tout le trafic vers HTTPS.
- **Vérifier** : la page d'accueil, une fiche de robe, un catalogue PDF,
  le bandeau cookies, et une adresse inexistante (elle doit afficher la
  page 404 du site).
- **Google** : déposer `https://madamoon.fr/sitemap.xml` dans la Search
  Console. `robots.txt` autorise maintenant l'indexation — c'est le
  moment où le référencement commence à compter.
- **Clarity** : les statistiques ne remontent que pour les visiteuses
  qui acceptent la catégorie « analytique » du bandeau cookies.

## 4. Le jour d'une mise à jour

```bash
npm run build:hostinger
```

puis renvoyer `out/`. Les photographies et les vidéos ne changent
presque jamais : en FTP, seuls les fichiers modifiés repartent, et une
mise à jour de textes ne pèse que quelques centaines de kilo-octets.

---

## 5. Les deux autres domaines

La cliente possède trois noms :

| Domaine | Rôle |
|---|---|
| `madamoon.fr` | le site, et lui seul |
| `boutiquederobesdemarieeaparis.fr` | redirige vers l'accueil |
| `robemarieeparis.fr` | redirige vers `/robes/` |

Les deux derniers sont des noms de mots-clés. **Ils ne doivent pas
porter une copie du site** : Google verrait le même contenu à trois
adresses, ne saurait pas lequel classer, et les trois y perdraient. Ils
redirigent donc, en 301 — une redirection permanente, qui transmet à
madamoon.fr les liens et l'ancienneté que ces noms ont pu accumuler.

Pour chacun, dans hPanel :

1. **Sites web → Ajouter un site web**, avec le domaine. Hostinger lui
   crée son propre dossier (par exemple `domains/robemarieeparis.fr/public_html`).
2. Y déposer le `.htaccess` correspondant, pris dans `hebergement/` de
   ce dépôt. Rien d'autre : pas d'`index.html`.
3. **Sécurité → SSL** : activer le certificat gratuit. Sans lui, un
   visiteur qui tape l'adresse en `https://` voit une alerte avant même
   d'être redirigé.

Vérification, une fois en place :

```bash
curl -sI https://robemarieeparis.fr/ | head -3
# HTTP/… 301  +  location: https://madamoon.fr/robes/
```

Ces domaines restent disponibles pour autre chose plus tard — une page
d'atterrissage de campagne, par exemple. Il suffira de remplacer leur
`.htaccess` par de vraies pages, avec un texte qui leur est propre.
