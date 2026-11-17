'use client';

import {useEffect, useState} from 'react';
import SitePage from '../../components/SitePage';
import {CONTACT_EMAIL} from '../../components/siteConfig';
import {Arrow, InstaIcon, MailIcon} from '../../components/SiteIcons';
import '../luna-haljina/proizvod.css';
import RecolorCanvas from './RecolorCanvas';
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

  // Samo originalne fotografije. Odabrana boja ide prva: vlastita fotografija te boje ako postoji,
  // inače originalna fotografija obojena u browseru (recolor).
  const first = !chosen ? [] : c.photo ? [{src: c.photo, alt: `${model.name} u boji ${c.name}`}]
    : model.recolor ? [{src: model.recolor.src, mask: model.recolor.mask, hex: c.hex, alt: `${model.name} u boji ${c.name}`}] : [];
  const rest = [...model.photos, ...(model.showcase || [])].map(([src, alt]) => ({src, alt})).filter(g => !first.some(x => !x.hex && x.src === g.src));
  const gallery = [...first, ...rest];
  const big = gallery[Math.min(view, gallery.length - 1)];
  const swatchStyle = col => ({backgroundImage: col.swatch ? `url(${col.swatch})` : undefined, backgroundColor: col.hex});

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
            {gallery.map((g, i) => <button key={g.src + (g.hex || '')} className={view === i ? 'on' : ''} onClick={() => setView(i)} aria-label={g.alt}><img src={g.src} alt=""/>{g.hex && <i className="mdThumbDot" style={swatchStyle(c)}/>}</button>)}
          </div>
          {big.hex
            ? <div className="pdBig mdBig">
                <RecolorCanvas src={big.src} mask={big.mask} hex={big.hex} alt={big.alt}/>
                <span className="mdTag"><i style={swatchStyle(c)}/>{label(c, color)}<small>digitalni prikaz boje</small></span>
              </div>
            : <button className="pdBig mdBig" onClick={() => setZoom([big.src, big.alt])} aria-label={`Uvećaj: ${big.alt}`}>
                <img key={big.src} src={big.src} alt={big.alt}/>
                {first.length > 0 && view === 0 && <span className="mdTag"><i style={swatchStyle(c)}/>{label(c, color)}</span>}
              </button>}
        </div>

        <div className="pdInfo hmBox">
          <p className="hmEyebrow">MADE BY ALY · {model.type}</p>
          <h1>{model.name}</h1>
          <i className="hmRule"/>
          <p className="pdLead">{model.lead}</p>

          <div className="mdPalette">
            <p><b>Boja:</b> {chosen ? label(c, color) : 'odaberi boju'} <span>{model.colors.length} boja</span></p>
            <div role="radiogroup" aria-label="Boje">
              {model.colors.map((col, i) => <button key={col.name} role="radio" aria-checked={color === i} title={label(col, i)} aria-label={label(col, i)} className={color === i ? 'on' : ''} onClick={() => pick(i)} style={swatchStyle(col)}>{model.numbered && <small>{i + 1}</small>}</button>)}
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
            <i style={swatchStyle(col)}/>{label(col, i)}
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
