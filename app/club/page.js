'use client';

import SitePage from '../components/SitePage';
import {Arrow, ClockIcon, HeartIcon, StarIcon} from '../components/SiteIcons';
import './club.css';

const benefits = [
  [ClockIcon, 'Raniji pristup', 'Prva saznaj za nove kolekcije, posebna izdanja i važne najave.'],
  [StarIcon, 'Limitirane kolekcije', 'Ekskluzivan pristup pažljivo odabranim, limitiranim komadima.'],
  [HeartIcon, 'Posebne pogodnosti', 'Uživaj u pažljivo biranim iznenađenjima i posebnim iskustvima.']
];
const faq = [
  ['Kako postati članica?', 'Članstvo je besplatno. Dovoljno je da klikneš na dugme “Postani članica” i ispuniš kratku prijavu.'],
  ['Da li postoje neke obaveze?', 'Ne. ALY CLUB je tu da ti pruži više inspiracije, raniji pristup i posebna iskustva – bez ikakvih obaveza.'],
  ['Kako ću saznati za novosti?', 'Sve važne informacije stižu direktno na tvoj e-mail, a možeš ih pronaći i u svom korisničkom profilu.']
];

export default function ClubPage() {
  return <SitePage active="ALY CLUB">
    <main className="hmWrap">
      <section className="clHero">
        <img src="/images/club-hero.png" alt="Žena u raskošnoj crnoj abaji među kamenim stubovima"/>
        <div className="clHeroCopy">
          <p className="hmEyebrow">MADE BY ALY</p>
          <h1>ALY CLUB</h1>
          <h2>Tvoj krug. Tvoja elegancija.</h2>
          <i className="hmRule"/>
          <p>ALY CLUB je naš način da ti budemo bliže. Mjesto za žene koje cijene smisao, ljepotu i posebno iskustvo. Jer neke priče su ljepše kada ih dijelimo.</p>
          <div className="clActions">
            <a className="hmGoldBtn" href="/club/prijava">Postani članica <Arrow/></a>
            <a className="hmOutlineBtn" href="/club/login">Već si članica? Prijavi se</a>
          </div>
        </div>
      </section>

      <section className="clBenefits">
        {benefits.map(([Icon, title, text]) => <article key={title} className="hmBox">
          <span className="clIcon"><Icon/></span><h3>{title}</h3><p>{text}</p>
        </article>)}
      </section>

      <section className="clCard">
        <div className="clCardImage"><img src="/images/club-card-scene.png" alt="Crna ALY CLUB članska kartica na kamenu" loading="lazy"/></div>
        <div className="clCardCopy">
          <p className="hmEyebrow">ČLANSTVO KOJE IMA POSEBAN ZNAČAJ</p>
          <h2>Više od kartice.<br/>Dio tvoje priče.</h2>
          <i className="hmRule"/>
          <p>ALY CLUB kartica simbol je pripadnosti zajednici žena koje biraju više – smisao, eleganciju i autentičnost.</p>
          <ul><li>Iste vrijednosti</li><li>Veća inspiracija</li><li>Dublje povezivanje</li><li>Ljepše priče</li></ul>
        </div>
      </section>

      <section className="clTeaser">
        <div>
          <p className="hmEyebrow">SAMO ZA ČLANICE</p>
          <h2>Nešto posebno dolazi.</h2>
          <p>Limitirana kolekcija uskoro. Budi među prvima koje će je otkriti.</p>
        </div>
        <a className="hmGoldBtn" href="/club/prijava">Pridruži se <Arrow/></a>
      </section>

      <section className="hmBox clFaq">
        <p className="hmEyebrow">ČESTA PITANJA</p>
        <h2>Sve što želiš znati o ALY CLUB-u</h2>
        <div>{faq.map(([q, a]) => <article key={q}><h3>{q}</h3><p>{a}</p></article>)}</div>
      </section>
    </main>
  </SitePage>;
}
