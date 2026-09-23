'use client';

import Image from 'next/image';
import { useState } from 'react';

const nav = [
  ['Početna', '/'], ['Kolekcija', '/kolekcija'], ['Haljine', '/kolekcija'],
  ['Khimari', '/kolekcija'], ['ALY CLUB', '/club'], ['O nama', '/#onama'], ['Kontakt', '#kontakt']
];

export default function ClubPage() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(e) {
    e.preventDefault(); setSending(true); setMessage('');
    try {
      const res = await fetch('/api/club', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
      const data = await res.json(); setMessage(modal === 'login' && res.ok ? 'Prijava je uspješna. Dobro došla nazad.' : data.message);
      if (res.ok) setEmail('');
    } catch { setMessage('Veza trenutno nije dostupna. Pokušajte ponovo.'); }
    setSending(false);
  }

  return <main className="clubPage">
    <header className="clubHeader">
      <a className="brand" href="/">MADE BY ALY</a>
      <button className="menuBtn" onClick={() => setMenu(!menu)} aria-label={menu ? 'Zatvori meni' : 'Otvori meni'} aria-expanded={menu}>{menu ? '×' : '☰'}</button>
      <nav className={menu ? 'nav open' : 'nav'}>{nav.map(([label, href]) => <a key={label} className={label === 'ALY CLUB' ? 'active' : ''} href={href}>{label}</a>)}</nav>
      <div className="clubHeaderIcons"><button aria-label="Korisnički profil">♙</button><button aria-label="Korpa">♧</button></div>
    </header>

    <section className="clubHero">
      <Image src="/images/club-hero.png" alt="Žena u raskošnoj crnoj abaji među kamenim stubovima" fill priority sizes="100vw" />
      <div className="clubHeroShade" />
      <p className="clubSideClaim">VIŠE<br/>OD MODE<br/><i/>TO JE<br/>PRIPADNOST</p>
      <div className="clubHeroCopy">
        <p className="clubKicker">MADE BY ALY</p><h1>ALY CLUB</h1><h2>Tvoj krug. Tvoja elegancija.</h2>
        <p>ALY CLUB je naš način da ti budemo bliže.<br/>Mjesto za žene koje cijene smisao, ljepotu i posebno iskustvo.<br/>Jer neke priče su ljepše kada ih dijelimo.</p>
        <div className="clubActions"><a className="clubGoldBtn" href="/club/prijava">Postani članica　⟶</a><button className="clubOutlineBtn" onClick={() => setModal('login')}>Već si članica? Prijavi se</button></div>
      </div>
      <aside className="clubMonogram"><span>A<small>LY</small></span><p>ISTE<br/>VRIJEDNOSTI<br/>LJEPŠE<br/>PRIČE</p></aside>
    </section>

    <section className="clubBenefits">
      <article><span className="benefitIcon">♧</span><h3>Raniji pristup</h3><p>Prva saznaj za nove kolekcije,<br/>posebna izdanja i važne najave.</p></article>
      <article><span className="benefitIcon">❀</span><h3>Limitirane kolekcije</h3><p>Ekskluzivan pristup pažljivo<br/>odabranim, limitiranim komadima.</p></article>
      <article><span className="benefitIcon">♡</span><h3>Posebne pogodnosti</h3><p>Uživaj u pažljivo biranim<br/>iznenađenjima i posebnim iskustvima.</p></article>
    </section>

    <section className="clubCardStory">
      <Image src="/images/club-card-scene.png" alt="Crna ALY CLUB članska kartica na kamenu" fill sizes="100vw" />
      <div className="clubCardShade" />
      <div className="clubCardCopy"><p className="clubKicker">ČLANSTVO KOJE IMA<br/>POSEBAN ZNAČAJ</p><h2>Više od kartice.<br/>Dio tvoje priče.</h2><i/><p>ALY CLUB kartica simbol je pripadnosti<br/>zajednici žena koje biraju više – smisao,<br/>eleganciju i autentičnost.</p></div>
      <div className="clubCardWords"><p>ISTE ŽENE</p><p>VEĆA INSPIRACIJA</p><p>DUBLJE POVEZIVANJE</p><p>LJEPŠE PRIČE</p><i/><b>ALY CLUB</b></div>
    </section>

    <section className="clubTeaser">
      <Image src="/images/club-teaser.png" alt="Krem khimar uz crnu svilu" fill sizes="100vw" />
      <div className="clubTeaserShade" />
      <div><p className="clubKicker">SAMO ZA ČLANICE</p><h2>NEŠTO POSEBNO DOLAZI</h2><i/><p>Limitirana kolekcija uskoro. Budi među prvima koje će je otkriti.</p></div>
      <aside><span>♙</span><p>EKSKLUZIVNO<br/>ZA ČLANICE</p></aside>
    </section>

    <section className="clubFaq">
      <p className="clubKicker">ČESTA PITANJA</p><h2>Sve što želiš znati o ALY CLUBU</h2>
      <div><article><h3>Kako postati članica?</h3><p>Članstvo je besplatno. Dovoljno je da klikneš na dugme “Postani članica” i ispuniš kratku prijavu.</p></article><article><h3>Da li postoje neke obaveze?</h3><p>Ne. ALY CLUB je tu da ti pruži više inspiracije, raniji pristup i posebna iskustva – bez ikakvih obaveza.</p></article><article><h3>Kako ću saznati za novosti?</h3><p>Sve važne informacije stižu direktno na tvoj e-mail, a možeš ih pronaći i u svom korisničkom profilu.</p></article></div>
    </section>

    <footer id="kontakt" className="clubFooter">
      <div className="clubFooterTop"><div><a className="brand" href="/">MADE BY ALY</a><p>ELEGANCIJA IMA DUBLJI SMISAO</p></div><nav>{nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav><div className="clubSocial">◎　f　p　▣　 <small>KM⌄</small></div></div>
      <div className="clubFooterBottom"><p>© 2026 MADE BY ALY. Sva prava zadržana.</p><p>Uslovi korištenja　│　Politika privatnosti　│　Kontakt</p><p>TVOJ KRUG. TVOJA ELEGANCIJA.</p></div>
    </footer>

    {modal && <div className="modal" role="dialog" aria-modal="true"><div className="modalCard"><button className="close" onClick={() => {setModal(null);setMessage('')}}>×</button><p className="eyebrow">{modal === 'join' ? 'POSTANI DIO KRUGA' : 'DOBRO DOŠLA NAZAD'}</p><h2>ALY CLUB</h2><p>{modal === 'join' ? 'Unesi svoju e-mail adresu za rani pristup kolekcijama i posebnim pogodnostima.' : 'Unesi e-mail adresu povezanu s tvojim članstvom.'}</p><form onSubmit={submit}><input type="email" required placeholder="Tvoja e-mail adresa" value={email} onChange={e=>setEmail(e.target.value)}/><button className="goldBtn" disabled={sending}>{sending ? 'Šaljem...' : modal === 'join' ? 'Postani članica' : 'Prijavi se'}</button></form>{message && <p className="formMessage">{message}</p>}</div></div>}
  </main>;
}
