'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CartIcon } from '../../components/Icons';

const nav=[['Početna','/'],['Kolekcija','/kolekcija'],['Haljine','/kolekcija'],['Khimari','/kolekcija'],['ALY CLUB','/club'],['O nama','/#onama'],['Kontakt','#kontakt']];

export default function LunaHaljina(){
 const [menu,setMenu]=useState(false),[photo,setPhoto]=useState('main'),[color,setColor]=useState('Crna'),[size,setSize]=useState('XS'),[length,setLength]=useState('140 cm (standard)'),[qty,setQty]=useState(1),[note,setNote]=useState(''),[favorite,setFavorite]=useState(false),[bag,setBag]=useState(0),[notice,setNotice]=useState('');
 const photos={main:'/images/luna-main.png',detail:'/images/luna-detail.png',back:'/images/luna-back.png'};
 function add(){setBag(bag+qty);setNotice(`${qty} × Luna haljina dodano u korpu.`);setTimeout(()=>setNotice(''),3000)}
 return <main className="productPage">
  <header className="productHeader"><a className="brand" href="/">MADE BY ALY</a><button className="menuBtn" onClick={()=>setMenu(!menu)}>{menu?'×':'☰'}</button><nav className={menu?'nav open':'nav'}>{nav.map(([x,h])=><a key={x} href={h}>{x}</a>)}</nav><div className="productHeadIcons"><button aria-label="Pretraga">⌕</button><button aria-label="Profil">♙</button><button aria-label="Korpa"><CartIcon/>{bag>0&&<b>{bag}</b>}</button><span>KM⌄</span></div></header>

  <section className="productMain">
   <div className="productGallery"><div className="thumbs">{Object.entries(photos).map(([key,src])=><button key={key} className={photo===key?'active':''} onClick={()=>setPhoto(key)}><Image src={src} alt="Luna haljina prikaz" fill sizes="100px"/></button>)}<span>⌄</span></div><div className="productBig"><Image src={photos[photo]} alt="Luna crna haljina" fill priority sizes="52vw"/><p>SKROMNOST<br/>U SVAKOM<br/>KORAKU<i/></p></div></div>

   <div className="productForm"><p className="productMaker">MADE BY ALY</p><h1>Luna haljina</h1><div className="priceRow"><strong>229,00 KM</strong><span className="stars">★★★★★</span><small>5.0 (24 recenzije)</small></div><p className="productLead">Luna haljina donosi bezvremensku eleganciju u svakoj prilici.<br/>Njen jednostavan, profinjen kroj i fluidan pad stvaraju osjećaj<br/>udobnosti i gracioznosti, uz potpunu pokrivenost.</p>
    <label>Boja: {color}</label><div className="colorPick">{[['Crna','#050505'],['Taupe','#9e968a'],['Krem','#eee']].map(([n,c])=><button key={n} aria-label={n} className={color===n?'active':''} onClick={()=>setColor(n)} style={{background:c}}/>)}</div>
    <label>Veličina:</label><div className="sizeRow">{['XS','S','M','L','XL'].map(s=><button key={s} className={size===s?'active':''} onClick={()=>setSize(s)}>{s}</button>)}<a href="#guide">Vodič za veličine　→</a></div>
    <label>Dužina:</label><select value={length} onChange={e=>setLength(e.target.value)}><option>140 cm (standard)</option><option>145 cm</option><option>150 cm</option><option>155 cm</option></select>
    <label>Količina:</label><div className="quantity"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span>{qty}</span><button onClick={()=>setQty(qty+1)}>＋</button></div>
    <div className="buyRow"><button className="addBag" onClick={add}><CartIcon size={20}/> Dodaj u korpu</button><button className={favorite?'heart active':'heart'} onClick={()=>setFavorite(!favorite)}>♡</button></div>{notice&&<p className="cartNotice">{notice}</p>}
    <label>Napomena za izradu (opcionalno):</label><textarea maxLength="200" value={note} onChange={e=>setNote(e.target.value)} placeholder="Npr. posebne mjere, dužina rukava..."/><small className="count">{note.length}/200</small>
    <div className="accordions">{[['Opis','Elegantna haljina fluidnog pada i potpune pokrivenosti.'],['Materijal','Premium mat tkanina, lagana i prijatna za nošenje.'],['Dužina i kroj','Dostupna u više dužina, širokog i profinjenog kroja.'],['Održavanje','Nježno pranje na 30°C. Ne sušiti u mašini.']].map(([t,c])=><details key={t}><summary>{t}<span>⌄</span></summary><p>{c}</p></details>)}</div>
   </div>
  </section>

  <section className="productPair"><div className="pairCopy"><p>Upotpunite svoj izgled</p><h2>Luna khimar</h2><span>Savršen spoj. Luna khimar od istog<br/>materijala, za jedinstven i elegantan izgled.</span><strong>119,00 KM</strong><a href="/kolekcija">Pogledaj khimar　→</a></div><figure><Image src="/images/luna-khimar-front.png" alt="Luna khimar sprijeda" fill sizes="33vw"/><figcaption>JEDNOSTAVNOST<br/>KOJA GOVORI<br/>VIŠE<i/></figcaption></figure><figure><Image src="/images/luna-back.png" alt="Luna khimar straga" fill sizes="33vw"/><figcaption>ISTI PUT<br/>ISTA LJEPOTA<i/></figcaption></figure></section>

  <footer id="kontakt" className="productFooter"><div className="productFooterTop"><div><a className="brand" href="/">MADE BY ALY</a><p>Više od odjeće.<br/>To je način.</p></div><nav><a href="/">Početna</a><a href="/kolekcija">Kolekcija</a><a href="/kolekcija">Haljine</a><a href="/kolekcija">Khimari</a></nav><nav><a href="/club">ALY CLUB</a><a href="/#onama">O nama</a><a href="#kontakt">Kontakt</a></nav><div className="newsletter"><b>Prijavite se na newsletter</b><form onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Vaša e-mail adresa"/><button>→</button></form><p>Budite prve koje saznaju za nove kolekcije,<br/>posebne ponude i više.</p></div><div className="footerSocial">◎　●　♪　▰</div></div><div className="productFooterBottom"><span>© 2024 MADE BY ALY. Sva prava zadržana.</span><span>S ljubavlju, uvijek.　♡</span></div></footer>
 </main>
}
