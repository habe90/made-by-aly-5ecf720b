'use client';

import {useState} from 'react';
import SitePage from '../components/SitePage';
import {Arrow, Crown, InstaIcon} from '../components/SiteIcons';
import {CATEGORIES, MODELS} from './models';
import {INSTAGRAM_HANDLE} from '../components/siteConfig';
import './kolekcija.css';

const ACTIVE = {haljine: 'Haljine', khimari: 'Khimari'};
const CAT_LABEL = Object.fromEntries(CATEGORIES);

export default function Kolekcija({initial = 'sve'}) {
  const [cat, setCat] = useState(initial);
  const shown = cat === 'sve' ? MODELS : MODELS.filter(m => m.cat === cat);

  function choose(id) {
    setCat(id);
    window.history.replaceState(null, '', id === 'sve' ? '/kolekcija' : `/kolekcija?k=${id}`);
  }

  return <SitePage active={ACTIVE[cat] || 'Kolekcija'}>
    <main className="hmWrap">
      <section className="pgIntro">
        <div>
          <p className="hmEyebrow">MADE BY ALY</p>
          <h1>Kolekcija</h1>
          <i className="hmRule"/>
          <p>Odabrani komadi. Bezvremenska elegancija. Pogledaj modele koje izrađujemo — za upit o modelu, boji ili mjerama javi nam se direktno.</p>
        </div>
        <div className="pgIntroImage"><img src="/images/collection-dresses.webp" alt="Tri modela MADE BY ALY u kamenim lukovima"/></div>
      </section>

      <div className="kolTabs" role="tablist" aria-label="Kategorije">
        {CATEGORIES.map(([id, label]) => <button key={id} role="tab" aria-selected={cat === id} className={cat === id ? 'on' : ''} onClick={() => choose(id)}>{label}</button>)}
        <span>{shown.length} {shown.length === 1 ? 'model' : 'modela'}</span>
      </div>

      {shown.length > 0 ? <section className="kolGrid" aria-live="polite">
        {shown.map(m => <a key={m.id} className="kolCard" href={m.page} aria-label={`Pogledaj ${m.name}`}>
          <span className="kolPhoto light"><img src={m.image} alt={m.name} loading="lazy"/>{m.isNew && <em className="kolBadge">Novo</em>}</span>
          <span className="kolInfo">
            <small>{CAT_LABEL[m.cat]}{m.colors.length > 3 && ` · ${m.colors.length} boja`}</small>
            <strong>{m.name}</strong>
            <span className="kolSwatches">{m.colors.slice(0, 8).map(([n, c]) => <i key={n} title={n} style={{background: c}}/>)}{m.colors.length > 8 && <b>+{m.colors.length - 8}</b>}</span>
          </span>
        </a>)}
      </section> : <section className="hmBox kolEmpty" aria-live="polite">
        <p className="hmEyebrow">USKORO</p>
        <h2>Novi modeli stižu uskoro.</h2>
        <p>Prati nas na Instagramu da prva vidiš nove {CAT_LABEL[cat].toLowerCase()}.</p>
        <a className="hmDarkBtn" href="/instagram" target="_blank" rel="noopener noreferrer"><InstaIcon size={18}/> {INSTAGRAM_HANDLE}</a>
      </section>}

      <section className="kolClub">
        <span className="hmCrown"><Crown size={40}/></span>
        <div><p className="hmEyebrow">ALY CLUB</p><h2>Posebni modeli samo za članice.</h2><p>Ograničene količine i rani pristup novim kolekcijama.</p></div>
        <a className="hmGoldBtn" href="/club">Saznaj više <Arrow/></a>
      </section>
    </main>
  </SitePage>;
}
