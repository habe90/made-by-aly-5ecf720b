'use client';

import { useMemo, useState } from 'react';

const products = [
  { name: 'Amara Haljina', price: 159, type: 'Haljine', color: 'Crna', sheet: 'collection-dresses.png', slot: 0, swatches: ['#070707','#e9e0d2'] },
  { name: 'Serena Haljina', price: 149, type: 'Haljine', color: 'Taupe', sheet: 'collection-dresses.png', slot: 1, swatches: ['#8d8177','#eee5d7'] },
  { name: 'Noor Haljina', price: 159, type: 'Haljine', color: 'Krem', sheet: 'collection-dresses.png', slot: 2, swatches: ['#e9dfd0','#69625c'] },
  { name: 'Zahra Khimar', price: 109, type: 'Khimari', color: 'Crna', sheet: 'collection-khimars.png', slot: 0, swatches: ['#070707','#e8ded1'] },
  { name: 'Leila Khimar', price: 99, type: 'Khimari', color: 'Taupe', sheet: 'collection-khimars.png', slot: 1, swatches: ['#8c8078','#594b45','#080808'] },
  { name: 'Alya Khimar', price: 109, type: 'Khimari', color: 'Crna', sheet: 'collection-khimars.png', slot: 2, swatches: ['#050505','#80766e','#e9e1d6'] }
];

export default function Kolekcija() {
  const [category, setCategory] = useState('Sve');
  const [color, setColor] = useState('Sve');
  const [sort, setSort] = useState('Najnovije');
  const [bag, setBag] = useState(0);
  const [menu, setMenu] = useState(false);
  const [clubOpen, setClubOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const shown = useMemo(() => {
    let list = products.filter(p => (category === 'Sve' || p.type === category) && (color === 'Sve' || p.color === color));
    if (sort === 'Cijena: niža') list.sort((a,b) => a.price-b.price);
    if (sort === 'Cijena: viša') list.sort((a,b) => b.price-a.price);
    return list;
  }, [category, color, sort]);

  async function joinClub(e) {
    e.preventDefault();
    const res = await fetch('/api/club', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email}) });
    const data = await res.json(); setMessage(data.message); if(res.ok) setEmail('');
  }

  return <main className="collectionPage">
    <header className="collectionHeader">
      <a className="brand" href="/">MADE BY ALY</a>
      <button className="menuBtn" onClick={()=>setMenu(!menu)}>{menu?'×':'☰'}</button>
      <nav className={menu?'nav open':'nav'}>
        <a href="/">Početna</a><a href="/kolekcija">Kolekcija</a><button onClick={()=>setCategory('Haljine')}>Haljine</button><button onClick={()=>setCategory('Khimari')}>Khimari</button><button onClick={()=>setClubOpen(true)}>ALY CLUB</button><a href="/#onama">O nama</a><a href="#kontakt">Kontakt</a>
      </nav>
      <div className="headerIcons"><button aria-label="Profil">♙</button><button aria-label="Korpa">♧ <b>({bag})</b></button></div>
    </header>

    <section className="collectionIntro">
      <div><h1>Kolekcija</h1><p>Odabrani komadi. Bezvremenska elegancija.</p></div>
      <aside>VIŠE OD ODJEĆE.<br/>NAČIN ŽIVOTA.<i/></aside>
    </section>

    <section className="catalog">
      <div className="catalogTools">
        <div className="tabs">{['Sve','Haljine','Khimari'].map(x=><button key={x} className={category===x?'active':''} onClick={()=>setCategory(x)}>{x}</button>)}</div>
        <div className="filters">
          <label>Veličina <select><option>Sve</option><option>S</option><option>M</option><option>L</option></select></label>
          <label>Boja <select value={color} onChange={e=>setColor(e.target.value)}><option>Sve</option><option>Crna</option><option>Taupe</option><option>Krem</option></select></label>
          <label>Sortiraj po <select value={sort} onChange={e=>setSort(e.target.value)}><option>Najnovije</option><option>Cijena: niža</option><option>Cijena: viša</option></select></label>
          <span>{shown.length} proizvoda</span>
        </div>
      </div>

      <div className="catalogGrid">
        {shown.map(p=><article className="catalogProduct" key={p.name}>
          <button className="catalogPhoto" onClick={()=>setBag(bag+1)} aria-label={`Dodaj ${p.name} u korpu`}><span style={{backgroundImage:`url(/images/${p.sheet})`,backgroundPosition:`${p.slot*50}% center`}}/></button>
          <h2>{p.name}</h2><p>{p.price},00 KM</p><div className="swatches">{p.swatches.map((s,i)=><i key={i} style={{background:s}}/>)}</div>
        </article>)}
      </div>

      <div className="clubCards">
        {['black','brown'].map(t=><article className="clubCard" key={t} style={{backgroundImage:`url(/images/club-${t}.png)`}}><span className="lock">♧</span><h2>ALY CLUB ONLY</h2><i/><p>Posebni komadi za članice.<br/>Prijavi se za pristup.</p><button onClick={()=>setClubOpen(true)}>PRIJAVI SE ZA PRISTUP</button></article>)}
      </div>
    </section>

    <footer id="kontakt" className="collectionFooter"><div className="footerTop"><div><a className="brand" href="/">MADE BY ALY</a><p>MODEST FASHION<br/>A MORE BEAUTIFUL YOU</p></div><nav><a href="/">Početna</a><a href="/kolekcija">Kolekcija</a><button onClick={()=>setCategory('Haljine')}>Haljine</button><button onClick={()=>setCategory('Khimari')}>Khimari</button><button onClick={()=>setClubOpen(true)}>ALY CLUB</button><a href="/#onama">O nama</a><a href="#kontakt">Kontakt</a><div className="social">◎　p　♪　▶</div></nav><em>BIRAJ SKROMNOST.<br/>STVARAJ LJEPOTU.</em></div><div className="footerBottom"><p>© 2024 MADE BY ALY. Sva prava zadržana.</p><p>Uslovi korištenja　　Politika privatnosti　　Kontakt　　 KM⌄</p></div></footer>

    {clubOpen&&<div className="modal"><div className="modalCard"><button className="close" onClick={()=>setClubOpen(false)}>×</button><p className="eyebrow">POSEBAN KRUG</p><h2>ALY CLUB</h2><p>Prijavi se za pristup posebnim komadima i privatnim ponudama.</p><form onSubmit={joinClub}><input required type="email" placeholder="Tvoja e-mail adresa" value={email} onChange={e=>setEmail(e.target.value)}/><button className="goldBtn">Pridruži se</button></form>{message&&<p className="formMessage">{message}</p>}</div></div>}
  </main>;
}
