import SitePage from '../components/SitePage';
import {Arrow} from '../components/SiteIcons';
import '../pages.css';

export const metadata = {title: 'O nama — MADE BY ALY'};

const values = [
  ['Skromnost', 'Kroj koji pokriva, a ne skriva — dostojanstvo u svakom detalju.'],
  ['Snaga', 'Odjeća za ženu koja zna svoju vrijednost i nosi je s ponosom.'],
  ['Ljepota', 'Pažljivo birani materijali, boje i linije koje traju.'],
  ['Zauvijek', 'Bezvremenski modeli, napravljeni da budu dio tvoje priče.']
];

export default function ONama() {
  return <SitePage active="O nama">
    <main className="hmWrap">
      <section className="pgIntro">
        <div>
          <p className="hmEyebrow">NAŠA PRIČA</p>
          <h1>Više od brenda.</h1>
          <i className="hmRule"/>
          <p>MADE BY ALY je nastao iz ljubavi prema skromnoj eleganciji i želje da svaka žena može pronaći odjeću u kojoj se osjeća dostojanstveno, ugodno i lijepo – svaki dan.</p>
        </div>
        <div className="pgIntroImage"><img src="/images/story.png" alt="Žena u crnoj abaji među kamenim stubovima" style={{objectPosition: 'center 30%'}}/></div>
      </section>

      <section className="onSplit">
        <div className="onImage"><img src="/images/fabric.png" alt="Crna premium tkanina" loading="lazy"/><em>Skromnost<br/>je uvijek<br/>u modi.</em></div>
        <div className="hmBox onText">
          <p className="hmEyebrow">KO SMO MI</p>
          <h2>Svaki komad s namjerom.</h2>
          <i className="hmRule"/>
          <p>Vjerujemo da modest fashion nije trend, već vrijednost koja traje. Zato svaki model nastaje polako i promišljeno — od izbora tkanine do posljednjeg šava.</p>
          <p>Naše abaye, haljine i khimare kreiramo u Tuzli, za žene koje žele spojiti pokrivenost, udobnost i bezvremensku eleganciju.</p>
        </div>
      </section>

      <section>
        <div className="hmSectionHead"><span/><h2>NAŠE VRIJEDNOSTI</h2><span/></div>
        <div className="onValues">{values.map(([t, d], i) => <article key={t} className="hmBox"><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
      </section>

      <section className="onCta">
        <div><h2>Upoznaj našu kolekciju.</h2><p>Abaye, haljine i khimari koji spajaju skromnost i eleganciju.</p></div>
        <div><a className="hmGoldBtn" href="/kolekcija">Kolekcija <Arrow/></a><a className="hmOutlineBtn" href="/kontakt">Kontakt</a></div>
      </section>
    </main>
  </SitePage>;
}
