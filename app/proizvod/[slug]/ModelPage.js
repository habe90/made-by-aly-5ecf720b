'use client';

import {useEffect, useState} from 'react';
import SitePage from '../../components/SitePage';
import {CONTACT_EMAIL} from '../../components/siteConfig';
import {Arrow, InstaIcon, MailIcon} from '../../components/SiteIcons';
import '../luna-haljina/proizvod.css';
import './model.css';

const NAV = {haljine: 'Haljine', khimari: 'Khimari'};
const CAT = {haljine: 'Haljine', abaye: 'Abaye', khimari: 'Khimari'};

export default function ModelPage({model}) {
  const [color, setColor] = useState(null);
  const [view, setView] = useState(0);
  const [zoom, setZoom] = useState(null);
  const c = model.colors[color ?? 0];
  const chosen = color !== null;
  const label = (col, i) => model.numbered ? `${i + 1} · ${col.name}` : col.name;

  // Samo originalne fotografije. Ako boja ima vlastitu originalnu fotografiju, ona ide prva.
  const gallery = [
    ...(chosen && c.photo ? [[c.photo, `${model.name} u boji ${c.name}`]] : []),
    ...model.photos,
    ...(model.showcase || [])
  ];
  const big = gallery[Math.min(view, gallery.length - 1)];

  function pick(i, scroll = false) {
    setColor(i);
    setView(0);
    if (scroll) window.scrollTo({top: 0, behavior: 'smooth'});
  }

  useEffect(() => {
    if (!zoom) return;
    const onKey = e => e.key === 'Escape' && setZoom(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  return <SitePage active={NAV[model.cat] || 'Kolekcija'}>
    <main className="hmWrap">
      <nav className="pdCrumb" aria-label="Putanja"><a href="/kolekcija">Kolekcija</a> <span>›</span> <a href={`/kolekcija?k=${model.cat}`}>{CAT[model.cat]}</a> <span>›</span> {model.name}</nav>

      <section className="pdMain">
        <div className="pdGallery">
          <div className="pdThumbs">
            {gallery.map(([src, alt], i) => <button key={src} className={view === i ? 'on' : ''} onClick={() => setView(i)} aria-label={alt}><img src={src} alt=""/></button>)}
          </div>
          <button className="pdBig mdBig" onClick={() => setZoom(big)} aria-label={`Uvećaj: ${big[1]}`}>
            <img key={big[0]} src={big[0]} alt={big[1]}/>
          </button>
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
        <div className="mdChips">
          {model.colors.map((col, i) => <button key={col.name} className={color === i ? 'on' : ''} onClick={() => pick(i, true)} aria-label={`Odaberi boju ${col.name}`}>
            <i style={{backgroundImage: `url(${col.swatch})`, backgroundColor: col.hex}}/>{label(col, i)}
          </button>)}
        </div>
        {model.showcase && <div className="mdShowcase">
          {model.showcase.map(([src, alt]) => <button key={src} onClick={() => setZoom([src, alt])} aria-label={`Uvećaj: ${alt}`}><img src={src} alt={alt} loading="lazy"/></button>)}
        </div>}
      </section>

      <section className="onCta mdMore">
        <div><h2>Pogledaj cijelu kolekciju.</h2><p>Abaye, haljine i khimari — svaki model se može prilagoditi tvojim mjerama.</p></div>
        <div><a className="hmGoldBtn" href="/kolekcija">Kolekcija <Arrow/></a></div>
      </section>
    </main>

    {zoom && <div className="siteModal mdZoom" role="dialog" aria-modal="true" aria-label={zoom[1]} onClick={() => setZoom(null)}>
      <button className="hmClose" onClick={() => setZoom(null)} aria-label="Zatvori">×</button>
      <img src={zoom[0]} alt={zoom[1]}/>
    </div>}
  </SitePage>;
}
