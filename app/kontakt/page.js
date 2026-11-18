import SitePage from '../components/SitePage';
import {FACEBOOK_NAME, FACEBOOK_URL, INSTAGRAM_HANDLE, LOCATION} from '../components/siteConfig';
import {Arrow, FacebookIcon, InstaIcon, PinIcon} from '../components/SiteIcons';
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
        <div className="pgIntroImage"><img src="/images/instagram-stone.webp" alt="Kameni lukovi i stubovi"/></div>
      </section>

      <section className="ktCards">
        <a className="hmBox ktCard" href="/instagram" target="_blank" rel="noopener noreferrer">
          <span className="ktIcon"><InstaIcon size={26}/></span>
          <h3>Instagram</h3>
          <p>Najbrži odgovor — pošalji nam poruku u DM.</p>
          <b>{INSTAGRAM_HANDLE} <Arrow size={16}/></b>
        </a>
        <a className="hmBox ktCard" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
          <span className="ktIcon"><FacebookIcon size={26}/></span>
          <h3>Facebook</h3>
          <p>Za upite, saradnju i izradu po mjeri — piši nam na Messenger.</p>
          <b>{FACEBOOK_NAME} <Arrow size={16}/></b>
        </a>
        <div className="hmBox ktCard">
          <span className="ktIcon"><PinIcon size={26}/></span>
          <h3>Lokacija</h3>
          <p>Naši modeli nastaju u Tuzli.</p>
          <b>{LOCATION}</b>
        </div>
      </section>

      <section className="onCta">
        <div><h2>Postani dio ALY CLUB-a.</h2><p>Rani pristup kolekcijama, posebne pogodnosti i novosti prve.</p></div>
        <div><a className="hmGoldBtn" href="/club/prijava">Pridruži se <Arrow/></a></div>
      </section>
    </main>
  </SitePage>;
}
