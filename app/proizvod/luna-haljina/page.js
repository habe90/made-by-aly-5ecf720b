'use client';

import {useState} from 'react';
import SitePage from '../../components/SitePage';
import {CONTACT_EMAIL} from '../../components/siteConfig';
import {Arrow, InstaIcon, MailIcon} from '../../components/SiteIcons';
import './proizvod.css';

const photos = [
  ['main', '/images/luna-main.png', 'Luna haljina sprijeda'],
  ['detail', '/images/luna-detail.png', 'Detalj rukava Luna haljine'],
  ['back', '/images/luna-back.png', 'Luna haljina straga']
];
const colors = [['Crna', '#0b0b0b'], ['Taupe', '#9e968a'], ['Krem', '#ece6da']];
const details = [
  ['Opis', 'Elegantna haljina fluidnog pada i potpune pokrivenosti. Jednostavan, profinjen kroj stvara osjećaj udobnosti i gracioznosti.'],
  ['Materijal', 'Mekani premium saten, lagan i prijatan za nošenje.'],
  ['Dužina i kroj', 'Standardna dužina 145 cm, širok i profinjen kroj. Moguća izrada po mjeri.'],
  ['Održavanje', 'Prati ručno ili na programu za osjetljive tkanine na 30°C. Ne sušiti u mašini.']
];

export default function LunaHaljina() {
  const [photo, setPhoto] = useState(0);
  const [color, setColor] = useState('Crna');

  return <SitePage active="Haljine">
    <main className="hmWrap">
      <nav className="pdCrumb" aria-label="Putanja"><a href="/kolekcija">Kolekcija</a> <span>›</span> <a href="/kolekcija?k=haljine">Haljine</a> <span>›</span> Luna haljina</nav>

      <section className="pdMain">
        <div className="pdGallery">
          <div className="pdThumbs">{photos.map(([key, src, alt], i) => <button key={key} className={photo === i ? 'on' : ''} onClick={() => setPhoto(i)} aria-label={alt}><img src={src} alt=""/></button>)}</div>
          <div className="pdBig"><img src={photos[photo][1]} alt={photos[photo][2]}/></div>
        </div>

        <div className="pdInfo hmBox">
          <p className="hmEyebrow">MADE BY ALY · HALJINE</p>
          <h1>Luna haljina</h1>
          <i className="hmRule"/>
          <p className="pdLead">Luna haljina donosi bezvremensku eleganciju u svakoj prilici. Njen jednostavan, profinjen kroj i fluidan pad stvaraju osjećaj udobnosti i gracioznosti, uz potpunu pokrivenost.</p>

          <div className="pdRow"><b>Boja: <span>{color}</span></b><div className="pdColors">{colors.map(([n, c]) => <button key={n} aria-label={n} title={n} className={color === n ? 'on' : ''} onClick={() => setColor(n)} style={{background: c}}/>)}</div></div>
          <div className="pdRow"><b>Veličine</b><div className="pdSizes">{['XS', 'S', 'M', 'L', 'XL'].map(s => <span key={s}>{s}</span>)}<span className="pdCustom">Po mjeri</span></div></div>

          <div className="pdCta">
            <p>Zanima te ovaj model? Pošalji nam upit za boju, veličinu ili izradu po mjeri.</p>
            <div>
              <a className="hmDarkBtn" href="/instagram" target="_blank" rel="noopener noreferrer"><InstaIcon size={18}/> Pošalji upit</a>
              <a className="hmOutlineBtn" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Upit: Luna haljina (' + color + ')')}`}><MailIcon size={18}/> E-mail</a>
            </div>
          </div>

          <div className="pdDetails">{details.map(([t, c], i) => <details key={t} open={i === 0}><summary>{t}</summary><p>{c}</p></details>)}</div>
        </div>
      </section>

      <section className="pdPair">
        <div className="pdPairCopy hmBox">
          <p className="hmEyebrow">UPOTPUNI IZGLED</p>
          <h2>Luna khimar</h2>
          <i className="hmRule"/>
          <p>Savršen spoj. Luna khimar od istog materijala, za jedinstven i elegantan izgled.</p>
          <a className="hmDarkBtn" href="/kolekcija?k=khimari">Pogledaj khimare <Arrow/></a>
        </div>
        <figure><img src="/images/luna-khimar-front.png" alt="Luna khimar sprijeda" loading="lazy"/><figcaption>Jednostavnost<br/>koja govori više</figcaption></figure>
        <figure><img src="/images/luna-back.png" alt="Luna khimar straga" loading="lazy"/><figcaption>Isti put,<br/>ista ljepota</figcaption></figure>
      </section>
    </main>
  </SitePage>;
}
