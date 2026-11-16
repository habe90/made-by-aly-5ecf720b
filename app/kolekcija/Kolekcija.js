'use client';

import {useEffect, useState} from 'react';
import SitePage from '../components/SitePage';
import {CONTACT_EMAIL} from '../components/siteConfig';
import {Arrow, Crown, InstaIcon, MailIcon} from '../components/SiteIcons';
import {CATEGORIES, MODELS} from './models';
import './kolekcija.css';

const ACTIVE = {haljine: 'Haljine', khimari: 'Khimari'};
const CAT_LABEL = Object.fromEntries(CATEGORIES);

export default function Kolekcija({initial = 'sve'}) {
  const [cat, setCat] = useState(initial);
  const [open, setOpen] = useState(null);
  const shown = cat === 'sve' ? MODELS : MODELS.filter(m => m.cat === cat);

  function choose(id) {
    setCat(id);
    window.history.replaceState(null, '', id === 'sve' ? '/kolekcija' : `/kolekcija?k=${id}`);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return <SitePage active={ACTIVE[cat] || 'Kolekcija'}>
    <main className="hmWrap">
      <section className="pgIntro">
        <div>
          <p className="hmEyebrow">MADE BY ALY</p>
          <h1>Kolekcija</h1>
          <i className="hmRule"/>
          <p>Odabrani komadi. Bezvremenska elegancija. Pogledaj modele koje izrađujemo — za upit o modelu, boji ili mjerama javi nam se direktno.</p>
        </div>
        <div className="pgIntroImage"><img src="/images/collection-dresses.png" alt="Tri modela MADE BY ALY u kamenim lukovima"/></div>
      </section>

      <div className="kolTabs" role="tablist" aria-label="Kategorije">
        {CATEGORIES.map(([id, label]) => <button key={id} role="tab" aria-selected={cat === id} className={cat === id ? 'on' : ''} onClick={() => choose(id)}>{label}</button>)}
        <span>{shown.length} {shown.length === 1 ? 'model' : 'modela'}</span>
      </div>

      <section className="kolGrid" aria-live="polite">
        {shown.map(m => {
          const inner = <>
            <span className={m.page ? 'kolPhoto light' : 'kolPhoto'}><img src={m.image} alt={m.name} loading="lazy"/>{m.isNew && <em className="kolBadge">Novo</em>}</span>
            <span className="kolInfo">
              <small>{CAT_LABEL[m.cat]}{m.colors.length > 3 && ` · ${m.colors.length} boja`}</small>
              <strong>{m.name}</strong>
              <span className="kolSwatches">{m.colors.slice(0, 8).map(([n, c]) => <i key={n} title={n} style={{background: c}}/>)}{m.colors.length > 8 && <b>+{m.colors.length - 8}</b>}</span>
            </span>
          </>;
          return m.page
            ? <a key={m.id} className="kolCard" href={m.page} aria-label={`Pogledaj ${m.name}`}>{inner}</a>
            : <button key={m.id} className="kolCard" onClick={() => setOpen(m)} aria-label={`Pogledaj ${m.name}`}>{inner}</button>;
        })}
      </section>

      <section className="kolClub">
        <span className="hmCrown"><Crown size={40}/></span>
        <div><p className="hmEyebrow">ALY CLUB</p><h2>Posebni modeli samo za članice.</h2><p>Ograničene količine i rani pristup novim kolekcijama.</p></div>
        <a className="hmGoldBtn" href="/club">Saznaj više <Arrow/></a>
      </section>
    </main>

    {open && <div className="siteModal kolModal" role="dialog" aria-modal="true" aria-label={open.name} onClick={e => e.target === e.currentTarget && setOpen(null)}>
      <div className="kolModalCard">
        <button className="hmClose" onClick={() => setOpen(null)} aria-label="Zatvori">×</button>
        <div className="kolModalImage"><img src={open.image} alt={open.name}/></div>
        <div className="kolModalCopy">
          <p className="hmEyebrow">{CAT_LABEL[open.cat]}</p>
          <h2>{open.name}</h2>
          <i className="hmRule"/>
          <p>{open.text}</p>
          <p className="kolColors"><b>Boje:</b> {open.colors.map(([n]) => n).join(' · ')}</p>
          <p className="kolNote">Svaki model se može prilagoditi tvojim mjerama. Za upit o dostupnosti, boji ili izradi piši nam.</p>
          <div className="kolActions">
            <a className="hmDarkBtn" href="/instagram" target="_blank" rel="noopener noreferrer"><InstaIcon size={18}/> Pošalji upit</a>
            <a className="hmOutlineBtn" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Upit: ' + open.name)}`}><MailIcon size={18}/> E-mail</a>
          </div>
          {open.href && <a className="kolMore" href={open.href}>Pogledaj detalje modela <Arrow size={16}/></a>}
        </div>
      </div>
    </div>}
  </SitePage>;
}
