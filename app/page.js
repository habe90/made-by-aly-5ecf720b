'use client';

import {useEffect, useState} from 'react';
import SitePage from './components/SitePage';
import ClubModal from './components/ClubModal';
import {Arrow, Crown, InstaIcon} from './components/SiteIcons';
import './home.css';

const categories = [
  {title: 'Abaye', text: ['Bezvremenski stil', 'i potpuna udobnost.'], image: '/images/pocetna/abaya-mocca-dugmad.webp', href: '/kolekcija?k=abaye'},
  {title: 'Haljine', text: ['Elegantni modeli', 'za posebne prilike.'], image: '/images/pocetna/haljina-siva.webp', href: '/kolekcija?k=haljine'},
  {title: 'Khimari', text: ['Potpuna pokrivenost', 'u modernom izdanju.'], image: '/images/pocetna/haljina-terakota.webp', href: '/kolekcija?k=khimari'}
];

// Prikazuje se dok Instagram nije povezan ili ako API trenutno ne odgovara.
const fallbackPosts = [
  {id: 'f1', image: '/images/pocetna/abaya-krem-prugice.webp', caption: 'Krem abaya s prugicama'},
  {id: 'f2', image: '/images/pocetna/haljina-siva.webp', caption: 'Siva haljina s naborima'},
  {id: 'f3', image: '/images/pocetna/abaya-mocca-dugmad.webp', caption: 'Abaya s dugmićima'},
  {id: 'f4', image: '/images/pocetna/haljina-terakota.webp', caption: 'Haljina u boji terakote'}
];

export default function Home() {
  const [clubOpen, setClubOpen] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('/api/instagram').then(r => r.json()).then(d => setPosts(d.posts || [])).catch(() => setPosts([]));
  }, []);

  const live = posts && posts.length > 0;
  const shown = live ? posts : fallbackPosts;

  return <SitePage active="Početna" className="home">
    <main className="hmWrap">
      <section className="hmHero">
        <div className="hmHeroCopy">
          <p className="hmEyebrow">MADE BY ALY</p>
          <h1>Elegancija<br/>koja ostaje.</h1>
          <i className="hmRule"/>
          <p className="hmLead">Više od odjeće.<br/>To je način da ostaneš svoja.</p>
          <a className="hmDarkBtn" href="/kolekcija">Istraži kolekciju <Arrow/></a>
          <p className="hmWords">SKROMNOST <span>·</span> SNAGA <span>·</span> LJEPOTA <span>·</span> ZAUVIJEK</p>
        </div>
        <div className="hmHeroImage"><img src="/images/pocetna/abaya-krem-prugice.webp" alt="Žena u krem abaji s prugicama u jesenjem parku"/></div>
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
          <a href="/instagram" target="_blank" rel="noopener noreferrer" className="hmSeeAll"><InstaIcon size={16}/> @madebyaly <Arrow/></a>
        </div>
        <div className={posts === null ? 'hmInstaGrid loading' : 'hmInstaGrid'}>
          {shown.map(p => <a key={p.id} href={live ? p.url : '/instagram'} target="_blank" rel="noopener noreferrer" className="hmPost">
            <img src={p.image} alt={p.caption || 'Instagram objava MADE BY ALY'} loading="lazy"/>
            {p.video && <span className="hmPlay" aria-hidden="true">▶</span>}
            <div className="hmPostHover"><InstaIcon size={28}/>{p.caption && <p>{p.caption}</p>}</div>
          </a>)}
        </div>
      </section>

      <section className="hmStory">
        <div className="hmStoryImage"><img src="/images/pocetna/haljina-terakota.webp" alt="Naša priča — žena u haljini boje terakote" loading="lazy"/><em>Skromnost<br/>je uvijek<br/>u modi.</em></div>
        <div className="hmStoryCopy">
          <p className="hmEyebrow">NAŠA PRIČA</p><h2>Više od brenda.</h2><i className="hmRule"/>
          <p>MADE BY ALY je nastao iz ljubavi prema skromnoj eleganciji i želje da svaka žena može pronaći odjeću u kojoj se osjeća dostojanstveno, ugodno i lijepo – svaki dan.</p>
          <p>Vjerujemo da modest fashion nije trend, već vrijednost koja traje.</p>
          <a href="/o-nama" className="hmDarkBtn">Upoznaj nas <Arrow/></a>
        </div>
      </section>
    </main>

    {clubOpen && <ClubModal onClose={() => setClubOpen(false)}/>}
  </SitePage>;
}
