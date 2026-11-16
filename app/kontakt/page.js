import SitePage from '../components/SitePage';
import {CONTACT_EMAIL} from '../components/siteConfig';
import {Arrow, InstaIcon, MailIcon, PinIcon} from '../components/SiteIcons';
import '../pages.css';

export const metadata = {title: 'Kontakt — MADE BY ALY'};

export default function Kontakt() {
  return <SitePage active="Kontakt">
    <main className="hmWrap">
      <section className="pgIntro">
        <div>
          <p className="hmEyebrow">KONTAKT</p>
          <h1>Tu smo za tebe.</h1>
          <i className="hmRule"/>
          <p>Imaš pitanje o modelu, boji, mjerama ili izradi po narudžbi? Javi nam se — rado ćemo pomoći da pronađeš komad koji je baš za tebe.</p>
        </div>
        <div className="pgIntroImage"><img src="/images/instagram-stone.png" alt="Kameni lukovi i stubovi"/></div>
      </section>

      <section className="ktCards">
        <a className="hmBox ktCard" href="/instagram" target="_blank" rel="noopener noreferrer">
          <span className="ktIcon"><InstaIcon size={26}/></span>
          <h3>Instagram</h3>
          <p>Najbrži odgovor — pošalji nam poruku u DM.</p>
          <b>@madebyaly <Arrow size={16}/></b>
        </a>
        <a className="hmBox ktCard" href={`mailto:${CONTACT_EMAIL}`}>
          <span className="ktIcon"><MailIcon size={26}/></span>
          <h3>E-mail</h3>
          <p>Za upite, saradnju i izradu po mjeri.</p>
          <b>{CONTACT_EMAIL} <Arrow size={16}/></b>
        </a>
        <div className="hmBox ktCard">
          <span className="ktIcon"><PinIcon size={26}/></span>
          <h3>Lokacija</h3>
          <p>Naši modeli nastaju u Sarajevu.</p>
          <b>Sarajevo, Bosna i Hercegovina</b>
        </div>
      </section>

      <section className="onCta">
        <div><h2>Postani dio ALY CLUB-a.</h2><p>Rani pristup kolekcijama, posebne pogodnosti i novosti prve.</p></div>
        <div><a className="hmGoldBtn" href="/club/prijava">Pridruži se <Arrow/></a></div>
      </section>
    </main>
  </SitePage>;
}
