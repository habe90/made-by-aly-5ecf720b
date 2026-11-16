'use client';

import {useEffect, useState} from 'react';
import SiteHeader from './components/SiteHeader';
import './home.css';

const categories = [
  {title: 'Abaye', text: ['Bezvremenski stil', 'i potpuna udobnost.'], image: '/images/product-amina.png', href: '/kolekcija'},
  {title: 'Haljine', text: ['Elegantni modeli', 'za posebne prilike.'], image: '/images/product-lejla.png', href: '/kolekcija'},
  {title: 'Khimari', text: ['Potpuna pokrivenost', 'u modernom izdanju.'], image: '/images/product-noor.png', href: '/kolekcija'}
];

// Prikazuje se dok Instagram nije povezan ili ako API trenutno ne odgovara.
const fallbackPosts = [
  {id: 'f1', image: '/images/luna-khimar-front.png', caption: 'Luna khimar'},
  {id: 'f2', image: '/images/editorial-taupe.png', caption: 'Inspiracija svaki dan'},
  {id: 'f3', image: '/images/instagram-box.png', caption: 'MADE BY ALY pakovanje'},
  {id: 'f4', image: '/images/collection-serena-dress.png', caption: 'Serena haljina'}
];

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>;
}
function Crown() {
  return <svg width="46" height="38" viewBox="0 0 46 38" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d="M5 30 2 9l12 9L23 3l9 15 12-9-3 21Z"/><path d="M6 35h34"/></svg>;
}
function InstaIcon({size = 22}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>;
}

export default function Home() {
  const [clubOpen, setClubOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [insta, setInsta] = useState({posts: null, profileUrl: 'https://www.instagram.com/madebyaly/'});

  useEffect(() => {
    fetch('/api/instagram').then(r => r.json()).then(d => setInsta({posts: d.posts || [], profileUrl: d.profileUrl || insta.profileUrl})).catch(() => setInsta(v => ({...v, posts: []})));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinClub = async (e) => {
    e.preventDefault(); setSending(true); setMessage('');
    try {
      const res = await fetch('/api/club', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      const data = await res.json(); setMessage(data.message);
      if (res.ok) setEmail('');
    } catch { setMessage('Veza trenutno nije dostupna. Pokušajte ponovo.'); }
    setSending(false);
  };

  const live = insta.posts && insta.posts.length > 0;
  const posts = live ? insta.posts : fallbackPosts;

  return <div className="home">
    <SiteHeader active="Početna"/>

    <main className="hmWrap">
      <section id="pocetna" className="hmHero">
        <div className="hmHeroCopy">
          <p className="hmEyebrow">MADE BY ALY</p>
          <h1>Elegancija<br/>koja ostaje.</h1>
          <i className="hmRule"/>
          <p className="hmLead">Više od odjeće.<br/>To je način da ostaneš svoja.</p>
          <a className="hmDarkBtn" href="/kolekcija">Istraži kolekciju <Arrow/></a>
          <p className="hmWords">SKROMNOST <span>·</span> SNAGA <span>·</span> LJEPOTA <span>·</span> ZAUVIJEK</p>
        </div>
        <div className="hmHeroImage"><img src="/images/luna-main.png" alt="Žena u elegantnoj crnoj abaji među kamenim lukovima"/></div>
      </section>

      <section className="hmCats" aria-label="Kategorije">
        {categories.map(c => <a key={c.title} href={c.href} className="hmCat">
          <img src={c.image} alt="" loading="lazy"/>
          <div>
            <h2>{c.title}</h2><i className="hmRule light"/>
            <p>{c.text[0]}<br/>{c.text[1]}</p>
            <span className="hmCircle"><Arrow/></span>
          </div>
        </a>)}
      </section>

      <section className="hmClub">
        <span className="hmCrown"><Crown/></span>
        <strong>ALY CLUB</strong>
        <div><h2>Budi dio posebnog kruga.</h2><p>Rani pristup kolekcijama, posebne pogodnosti i više.</p></div>
        <button className="hmGoldBtn" onClick={() => setClubOpen(true)}>Pridruži se <Arrow/></button>
      </section>

      <section className="hmInsta" aria-labelledby="insta-title">
        <div className="hmSectionHead">
          <span/><h2 id="insta-title">PRATI NAS NA INSTAGRAMU</h2><span/>
          <a href={insta.profileUrl} target="_blank" rel="noopener noreferrer" className="hmSeeAll"><InstaIcon size={16}/> @madebyaly <Arrow/></a>
        </div>
        <div className={insta.posts === null ? 'hmInstaGrid loading' : 'hmInstaGrid'}>
          {posts.map(p => <a key={p.id} href={live ? p.url : insta.profileUrl} target="_blank" rel="noopener noreferrer" className="hmPost">
            <img src={p.image} alt={p.caption || 'Instagram objava MADE BY ALY'} loading="lazy"/>
            {p.video && <span className="hmPlay" aria-hidden="true">▶</span>}
            <div className="hmPostHover"><InstaIcon size={28}/>{p.caption && <p>{p.caption}</p>}</div>
          </a>)}
        </div>
      </section>

      <section id="onama" className="hmStory">
        <div className="hmStoryImage"><img src="/images/story.png" alt="Naša priča — žena u crnoj abaji" loading="lazy"/><em>Skromnost<br/>je uvijek<br/>u modi.</em></div>
        <div className="hmStoryCopy">
          <p className="hmEyebrow">NAŠA PRIČA</p><h2>Više od brenda.</h2><i className="hmRule"/>
          <p>MADE BY ALY je nastao iz ljubavi prema skromnoj eleganciji i želje da svaka žena može pronaći odjeću u kojoj se osjeća dostojanstveno, ugodno i lijepo – svaki dan.</p>
          <p>Vjerujemo da modest fashion nije trend, već vrijednost koja traje.</p>
          <a href="#kontakt" className="hmDarkBtn">Upoznaj nas <Arrow/></a>
        </div>
      </section>
    </main>

    <footer id="kontakt" className="hmFooter">
      <div className="hmFooterInner">
        <div className="hmFooterBrand"><img src="/images/logo-aly.png" alt="MADE BY ALY" width="640" height="328"/><p>Skromnost je uvijek lijep izbor.</p></div>
        <nav>
          <a href="/">Početna</a><a href="/kolekcija">Kolekcija</a><a href="/kolekcija">Haljine</a><a href="/kolekcija">Khimari</a>
          <a href="/club">ALY CLUB</a><a href="#onama">O nama</a><a href="mailto:info@madebyaly.ba">Kontakt</a>
        </nav>
        <div className="hmFooterSocial">
          <a href={insta.profileUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstaIcon/></a>
          <em>Hvala što si dio ove priče. ♡</em>
        </div>
      </div>
      <div className="hmFooterBottom"><p>© 2026 MADE BY ALY. Sva prava zadržana.</p><p>Uslovi korištenja · Politika privatnosti · Dostava · Pomoć</p></div>
    </footer>

    {clubOpen && <div className="modal" role="dialog" aria-modal="true" aria-label="Pridruži se ALY CLUB-u"><div className="modalCard"><button className="close" onClick={() => setClubOpen(false)}>×</button><p className="eyebrow">POSEBAN KRUG</p><h2>ALY CLUB</h2><p>Prijavi se za rani pristup kolekcijama, privatne ponude i priče iza svakog modela.</p><form onSubmit={joinClub}><input type="email" required placeholder="Tvoja e-mail adresa" value={email} onChange={e => setEmail(e.target.value)}/><button className="goldBtn" disabled={sending}>{sending ? 'Šaljem...' : 'Pridruži se'}</button></form>{message && <p className="formMessage">{message}</p>}</div></div>}
  </div>;
}
