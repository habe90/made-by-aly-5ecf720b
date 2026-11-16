'use client';

import {useState} from 'react';
import SitePage from '../../components/SitePage';
import {CONTACT_EMAIL} from '../../components/siteConfig';
import {Arrow, InstaIcon, MailIcon} from '../../components/SiteIcons';
import '../luna-haljina/proizvod.css';
import './model.css';

const NAV = {haljine: 'Haljine', khimari: 'Khimari'};
const CAT = {haljine: 'Haljine', abaye: 'Abaye', khimari: 'Khimari'};

export default function ModelPage({model}) {
  const [color, setColor] = useState(null);
  const [view, setView] = useState('photo-0');
  const c = model.colors[color ?? 0];
  const chosen = color !== null;
  const label = (col, i) => model.numbered ? `${i + 1} · ${col.name}` : col.name;

  const big = view === 'color'
    ? [c.photo, `${model.name} u boji ${c.name}`]
    : model.photos[Number(view.split('-')[1])];

  function pick(i, scroll = false) {
    setColor(i);
    setView('color');
    if (scroll) window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return <SitePage active={NAV[model.cat] || 'Kolekcija'}>
    <main className="hmWrap">
      <nav className="pdCrumb" aria-label="Putanja"><a href="/kolekcija">Kolekcija</a> <span>›</span> <a href={`/kolekcija?k=${model.cat}`}>{CAT[model.cat]}</a> <span>›</span> {model.name}</nav>

      <section className="pdMain">
        <div className="pdGallery">
          <div className="pdThumbs">
            {model.photos.map(([src, alt], i) => <button key={src} className={view === `photo-${i}` ? 'on' : ''} onClick={() => setView(`photo-${i}`)} aria-label={alt}><img src={src} alt=""/></button>)}
            <button className={view === 'color' ? 'on mdThumbColor' : 'mdThumbColor'} onClick={() => setView('color')} aria-label={`Prikaz u boji ${c.name}`}><img src={c.photo} alt=""/></button>
          </div>
          <div className="pdBig mdBig">
            <img key={big[0]} src={big[0]} alt={big[1]}/>
            {view === 'color' && <span className="mdTag"><i style={{backgroundImage: `url(${c.swatch})`}}/>{label(c, color)}</span>}
          </div>
        </div>

        <div className="pdInfo hmBox">
          <p className="hmEyebrow">MADE BY ALY · {model.type}</p>
          <h1>{model.name}</h1>
          <i className="hmRule"/>
          <p className="pdLead">{model.lead}</p>

          <div className="mdPalette">
            <p><b>Boja:</b> {chosen ? label(c, color) : 'odaberi boju'} <span>{model.colors.length} boja</span></p>
            <div role="radiogroup" aria-label="Boje">
              {model.colors.map((col, i) => <button key={col.name} role="radio" aria-checked={color === i} title={label(col, i)} aria-label={label(col, i)} className={color === i ? 'on' : ''} onClick={() => pick(i)} style={{backgroundImage: `url(${col.swatch})`, backgroundColor: col.hex}}>{model.numbered && <small>{i + 1}</small>}</button>)}
            </div>
          </div>

          <ul className="mdFeatures">{model.features.map(f => <li key={f}>{f}</li>)}</ul>

          <div className="pdCta">
            <p>{chosen
              ? <>Sviđa ti se {model.name} u boji <b>{c.name}</b>? Pošalji nam upit za veličinu, dužinu ili izradu po mjeri.</>
              : <>Odaberi boju i pošalji nam upit za veličinu, dužinu ili izradu po mjeri.</>}</p>
            <div>
              <a className="hmDarkBtn" href="/instagram" target="_blank" rel="noopener noreferrer"><InstaIcon size={18}/> Pošalji upit</a>
              <a className="hmOutlineBtn" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Upit: ${model.name}${chosen ? ` (${label(c, color)})` : ''}`)}`}><MailIcon size={18}/> E-mail</a>
            </div>
          </div>

          <div className="pdDetails">{model.details.map(([t, d], i) => <details key={t} open={i === 0}><summary>{t}</summary><p>{d}</p></details>)}</div>
        </div>
      </section>

      <section className="hmBox mdAll" aria-labelledby="boje">
        <div className="mdAllHead"><span/><p className="hmEyebrow">{model.type}</p><span/></div>
        <h2 id="boje">Dostupne boje</h2>
        <div className={`mdGrid n${model.colors.length}`}>
          {model.colors.map((col, i) => <button key={col.name} className={color === i ? 'on' : ''} onClick={() => pick(i, true)} aria-label={`Prikaži ${model.name} u boji ${col.name}`}>
            <span className="mdGridPhoto"><img src={col.photo} alt={`${model.name} — ${col.name}`} loading="lazy"/></span>
            <span className="mdGridName"><i style={{backgroundImage: `url(${col.swatch})`, backgroundColor: col.hex}}/>{label(col, i)}</span>
          </button>)}
        </div>
      </section>

      <section className="onCta mdMore">
        <div><h2>Pogledaj cijelu kolekciju.</h2><p>Abaye, haljine i khimari — svaki model se može prilagoditi tvojim mjerama.</p></div>
        <div><a className="hmGoldBtn" href="/kolekcija">Kolekcija <Arrow/></a></div>
      </section>
    </main>
  </SitePage>;
}
