'use client';

import { useState } from 'react';
import Image from 'next/image';

const products = [
  { name: 'Amina haljina', price: '139,00 KM', image: '/images/product-amina.png' },
  { name: 'Noor khimar', price: '89,00 KM', image: '/images/product-noor.png' },
  { name: 'Lejla haljina', price: '149,00 KM', image: '/images/product-lejla.png' }
];

function Arrow() { return <span aria-hidden="true">⟶</span>; }

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [bag, setBag] = useState(0);
  const [clubOpen, setClubOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const joinClub = async (e) => {
    e.preventDefault(); setSending(true); setMessage('');
    try {
      const res = await fetch('/api/club', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json(); setMessage(data.message);
      if (res.ok) setEmail('');
    } catch { setMessage('Veza trenutno nije dostupna. Pokušajte ponovo.'); }
    setSending(false);
  };

  return <main>
    <header className="header">
      <a className="brand" href="#pocetna">MADE BY ALY</a>
      <button className="menuBtn" onClick={() => setMenu(!menu)} aria-label="Otvori navigaciju">{menu ? '×' : '☰'}</button>
      <nav className={menu ? 'nav open' : 'nav'}>
        <a href="#pocetna">Početna</a><a href="/kolekcija">Kolekcija</a><a href="/kolekcija">Haljine</a>
        <a href="#khimari">Khimari</a><button onClick={() => setClubOpen(true)}>ALY CLUB</button><a href="#onama">O nama</a><a href="#kontakt">Kontakt</a>
      </nav>
      <div className="headerIcons"><button aria-label="Profil">♙</button><button aria-label="Korpa">♧ <b>{bag}</b></button></div>
    </header>

    <section id="pocetna" className="hero">
      <Image src="/images/hero.png" alt="Žena u elegantnoj crnoj abaji među kamenim stubovima" fill priority sizes="100vw" />
      <div className="shade" />
      <div className="heroCopy">
        <p className="eyebrow">MADE BY ALY</p><h1>Elegancija<br/>koja ostaje.</h1><i className="goldLine" />
        <p>Više od odjeće.<br/>To je način da ostaneš svoja.</p>
        <a className="outlineBtn" href="#kolekcija">Istraži kolekciju <Arrow /></a>
      </div>
      <p className="sideText">MODEST<br/>FASHION<br/>A BRIGHTER<br/>TOMORROW</p>
      <p className="heroWords">SKROMNOST　·　SNAGA　·　LJEPOTA　·　ZAUVIJEK</p>
    </section>

    <section className="clubBar">
      <strong>ALY CLUB</strong><span className="vline"/><div><h2>Budi dio posebnog kruga.</h2><p>Rani pristup kolekcijama, posebne pogodnosti i više.</p></div>
      <button className="goldBtn" onClick={() => setClubOpen(true)}>Pridruži se ALY CLUB-u <Arrow /></button>
    </section>

    <section id="kolekcija" className="collection wrap">
      <div className="sectionHead"><span/><h2>NOVO U PONUDI</h2><span/></div><a href="#haljine" className="seeAll">Pogledaj sve　<Arrow /></a>
      <div className="productGrid">
        {products.map((p, i) => <article className="product" id={i===1?'khimari':'haljine'} key={p.name}>
          <div className="productImage"><Image src={p.image} alt={p.name} fill sizes="(max-width: 700px) 100vw, 24vw" /></div>
          <div className="productInfo"><div><h3>{p.name}</h3><p>{p.price}</p></div><button onClick={() => setBag(bag + 1)} aria-label={`Dodaj ${p.name} u korpu`}>♧</button></div>
        </article>)}
        <article className="exclusive"><Image src="/images/fabric.png" alt="Crna premium tkanina" fill sizes="(max-width: 700px) 100vw, 24vw"/><div><p className="eyebrow">EKSKLUZIVNA<br/>KOLEKCIJA</p><h2>Samo za<br/>članice.</h2><i className="goldLine"/><p>Posebni modeli. Ograničene količine.<br/>Samo za članice ALY CLUB-a.</p><button className="outlineBtn" onClick={() => setClubOpen(true)}>Otkrij više <Arrow /></button></div></article>
      </div>
    </section>

    <section id="onama" className="story">
      <div className="storyImage"><Image src="/images/story.png" alt="Naša priča — žena u crnoj abaji" fill sizes="60vw"/><em>Skromnost<br/>je uvijek<br/>u modi.</em></div>
      <div className="storyCopy"><p className="eyebrow">NAŠA PRIČA</p><h2>Više od brenda.</h2><i className="goldLine"/>
        <p>MADE BY ALY je nastao iz ljubavi prema skromnoj eleganciji i želje da svaka žena može pronaći odjeću u kojoj se osjeća dostojanstveno, ugodno i lijepo – svaki dan.</p>
        <p>Vjerujemo da modest fashion nije trend, već vrijednost koja traje.</p><a href="#kontakt" className="outlineBtn">Upoznaj nas <Arrow /></a>
      </div>
    </section>

    <section className="instagram wrap"><div className="sectionHead"><span/><h2>PRATI NAS NA INSTAGRAMU</h2><span/></div><b>@madebyaly</b>
      <div className="instaGrid"><div><Image src="/images/instagram-stone.png" alt="Arhitektura i inspiracija" fill/><p>LJEPOTA<br/>U JEDNOSTAVNOSTI</p></div><div><Image src="/images/editorial-taupe.png" alt="Modna inspiracija" fill/><p>INSPIRACIJA<br/>SVAKI DAN</p></div><div><Image src="/images/instagram-box.png" alt="Made By Aly pakovanje" fill/></div></div>
    </section>

    <footer id="kontakt"><div className="footerTop"><div><a className="brand" href="#pocetna">MADE BY ALY</a><p>Skromnost je uvijek lijep izbor.</p></div><nav><a href="#pocetna">Početna</a><a href="#kolekcija">Kolekcija</a><a href="#haljine">Haljine</a><a href="#khimari">Khimari</a><button onClick={() => setClubOpen(true)}>ALY CLUB</button><a href="#onama">O nama</a><a href="mailto:info@madebyaly.ba">Kontakt</a><div className="social">◎　f　♪　▶　p</div></nav><em>Hvala što si dio ove priče. ♡</em></div>
      <div className="footerBottom"><p>© 2026 MADE BY ALY. Sva prava zadržana.</p><p>Uslovi korištenja　|　Politika privatnosti　|　Dostava　|　Pomoć　　KM⌄</p></div>
    </footer>

    {clubOpen && <div className="modal" role="dialog" aria-modal="true" aria-label="Pridruži se ALY CLUB-u"><div className="modalCard"><button className="close" onClick={() => setClubOpen(false)}>×</button><p className="eyebrow">POSEBAN KRUG</p><h2>ALY CLUB</h2><p>Prijavi se za rani pristup kolekcijama, privatne ponude i priče iza svakog modela.</p><form onSubmit={joinClub}><input type="email" required placeholder="Tvoja e-mail adresa" value={email} onChange={e=>setEmail(e.target.value)}/><button className="goldBtn" disabled={sending}>{sending ? 'Šaljem...' : 'Pridruži se'}</button></form>{message && <p className="formMessage">{message}</p>}</div></div>}
  </main>;
}
