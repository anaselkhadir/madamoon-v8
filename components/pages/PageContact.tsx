import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import TitreSection from "@/components/TitreSection";
import FilDAriane from "@/components/FilDAriane";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import { MAISON, SITE_URL } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";
import { FICHE_GOOGLE, ID_MAISON } from "@/lib/schema";
import { maison, signatures } from "@/lib/contenu";
import { t } from "@/lib/textes";
import { versLangue, type Langue } from "@/lib/langue";

/*
 * Le contact.
 *
 * madamoon.fr n'avait pas de page de contact : le pied de page portait
 * l'adresse et le courriel, et c'était tout. Une boutique qui reçoit sur
 * rendez-vous a pourtant besoin d'une page où tout est écrit au même
 * endroit — l'adresse et son plan, le téléphone, le courriel, les
 * horaires, les réseaux, et le bouton de rendez-vous.
 *
 * Rien n'y est inventé : les coordonnées sont celles de MAISON, les
 * horaires ceux du pied de page, la gratuité de l'essayage celle que la
 * page de rendez-vous annonce déjà. Pas de formulaire : le site est
 * statique, et la maison répond au téléphone et au courriel.
 *
 * Le balisage dit « ContactPage » et renvoie à l'entité de la maison,
 * dont le gabarit publie déjà l'adresse, le téléphone et les horaires :
 * on ne les répète pas, on les désigne.
 */
export default function PageContact({ langue }: { langue: Langue }) {
  const T = t(langue);
  const L = T.pages.contact;
  const M = maison(langue);
  const adresse = versLangue("/contact", langue);

  const donnees = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}${adresse}/#page`,
    url: `${SITE_URL}${adresse}/`,
    name: L.titre,
    inLanguage: langue === "en" ? "en" : "fr-FR",
    isPartOf: { "@id": `${SITE_URL}/#site` },
    about: { "@id": ID_MAISON },
    mainEntity: { "@id": ID_MAISON },
  };

  return (
    <div className="pt-[var(--entete)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane langue={langue} rangs={[{ nom: T.ariane.contact, adresse: "/contact" }]} />
      <TitreSection niveau={1} titre={L.titre} />

      <div className="gouttiere">
        <p className="phrase est-moyenne mesure-l">{L.intro}</p>

        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[34rem]">
            {/* La même photographie que le bloc « Poussez la porte » de
              * l'accueil, et le même cadrage : on vient ici pour venir. */}
            <Photo
              media={SCENES["showroom"]}
              position="50% 42%"
              dossier="scenes"
              alt={altScene(L.altScene, langue)}
              sizes="(max-width: 768px) 100vw, 50vw"
              priorite
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-10 md:py-2">
            <section aria-labelledby="contact-showroom">
              <h2 id="contact-showroom" className="legende">
                {L.showroom}
              </h2>
              <address className="phrase mt-4 not-italic">
                {M.adresse}
                <br />
                {M.codePostal} {M.ville}
              </address>
              <a
                href={FICHE_GOOGLE.lieu}
                target="_blank"
                rel="noreferrer noopener"
                className="lien-nav souligne mt-3 inline-block text-encre"
              >
                {L.voirPlan}
              </a>
            </section>

            <section aria-labelledby="contact-joindre">
              <h2 id="contact-joindre" className="legende">
                {L.joindre}
              </h2>
              <dl className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="mention text-plomb">{L.telephone}</dt>
                  <dd className="mt-1">
                    <a href={MAISON.telephoneHref} className="phrase souligne text-encre">
                      {MAISON.telephone}
                    </a>
                    <span className="texte mt-1 block text-plomb">{L.telephoneNote}</span>
                  </dd>
                </div>
                <div>
                  <dt className="mention text-plomb">{L.courriel}</dt>
                  <dd className="mt-1">
                    <a href={MAISON.emailHref} className="phrase souligne break-all text-encre">
                      {MAISON.email}
                    </a>
                    <span className="texte mt-1 block text-plomb">{L.courrielNote}</span>
                  </dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="contact-horaires">
              <h2 id="contact-horaires" className="legende">
                {L.horaires}
              </h2>
              <p className="texte mt-4">
                {M.horaires.map((h) => (
                  <span key={h.jour} className="block">
                    {h.jour} — {h.heures}
                  </span>
                ))}
                <span className="block text-plomb">{M.mentionHoraires}</span>
              </p>
            </section>

            <section aria-labelledby="contact-reseaux">
              <h2 id="contact-reseaux" className="legende">
                {L.reseaux}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-5">
                {MAISON.reseaux.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="texte souligne text-encre"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* ————————————————————————————————————— le rendez-vous —————
        * Le même bloc crème que celui qui ferme la page du showroom : la
        * page de contact mène au même endroit. */}
      <section
        aria-labelledby="contact-rendezvous"
        className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]"
      >
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-[1fr_1fr]">
          <div>
            <h2 id="contact-rendezvous" className="legende">
              {L.rendezvous}
            </h2>
            <p className="phrase mesure-l mt-4">{L.rendezvousNote}</p>
            <AppelRendezvous className="bouton mt-8">{L.rendezvous}</AppelRendezvous>
          </div>
          <ul className="flex flex-col gap-4 self-center">
            {signatures(langue).map((s) => (
              <li key={s.titre} className="flex gap-4">
                <span aria-hidden="true" className="mt-[0.6rem] h-px w-6 shrink-0 bg-fil" />
                <span>
                  <span className="legende block text-encre">{s.titre}</span>
                  <span className="texte">{s.texte}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ————————————————————————————————————— avant de venir ————— */}
      <section aria-labelledby="contact-avant" className="gouttiere py-[clamp(3rem,5.5vw,5rem)]">
        <h2 id="contact-avant" className="titre-section">
          {L.avantDeVenir}
        </h2>
        <ul className="mt-6 flex flex-col gap-3">
          {L.liens.map((x) => (
            <li key={x.href}>
              <Link href={x.href} className="texte souligne text-encre">
                {x.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
