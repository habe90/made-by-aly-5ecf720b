'use client';

import {useEffect, useState} from 'react';
import SitePage from '../components/SitePage';
import {Arrow} from '../components/SiteIcons';
import './racun.css';

const memberNo = id => 'ALY ' + String(id).padStart(6, '0');

export default function Account() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState({text: '', ok: false});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/account', {cache: 'no-store'})
      .then(async r => { if (r.status === 401) { location.href = '/club/login'; return null; } return r.json(); })
      .then(d => d && setData(d))
      .catch(() => setError('Profil trenutno nije dostupan.'));
  }, []);

  function change(e) {
    const {name, value, type, checked} = e.target;
    setData(d => ({...d, member: {...d.member, [name]: type === 'checkbox' ? checked : value}}));
  }

  async function save(e) {
    e.preventDefault(); setSaving(true); setMsg({text: '', ok: false});
    const m = data.member;
    try {
      const r = await fetch('/api/account', {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({...m, birthDate: m.birth_date})});
      const d = await r.json();
      setMsg({text: d.message, ok: r.ok});
      if (r.ok) setData(v => ({...v, member: {...v.member, ...d.member}}));
    } catch { setMsg({text: 'Izmjene trenutno nije moguće sačuvati.', ok: false}); }
    setSaving(false);
  }

  async function logout() {
    await fetch('/api/account/logout', {method: 'POST'});
    location.href = '/club/login';
  }

  if (!data) return <SitePage active="Profil"><main className="hmWrap"><div className="hmBox acLoading">{error || 'Učitavanje profila…'}</div></main></SitePage>;

  const m = data.member;
  const first = m.name?.split(' ')[0] || 'članice';
  const created = new Date(m.created_at);
  const since = `${String(created.getMonth() + 1).padStart(2, '0')}/${created.getFullYear()}`;

  return <SitePage active="Profil">
    <main className="hmWrap">
      <section className="pgIntro">
        <div>
          <p className="hmEyebrow">MOJ RAČUN</p>
          <h1>Dobrodošla, {first}.</h1>
          <i className="hmRule"/>
          <p>Hvala što si dio naše priče. Ljepota ima veći smisao kada je dijelimo.</p>
        </div>
        <div className="pgIntroImage"><img src="/images/member-profile-hero.png" alt="ALY CLUB elegantna članica"/></div>
      </section>

      <div className="acLayout">
        <aside className="acSide">
          <article className="acCard">
            <img src="/images/logo-aly.png" alt="MADE BY ALY" width="640" height="328"/>
            <p className="acCardName">{m.name}</p>
            <div><span>Članica broj<b>{memberNo(m.id)}</b></span><span>Članica od<b>{since}</b></span></div>
            <em><i/> Aktivno članstvo</em>
          </article>
          <nav className="hmBox acNav">
            <a href="#profil">Lični podaci</a>
            <a href="#novosti">Novosti</a>
            <a href="/kolekcija">Kolekcija</a>
            <button onClick={logout}>Odjava</button>
          </nav>
        </aside>

        <div className="acMain">
          <form id="profil" className="hmBox" onSubmit={save}>
            <div className="acHead"><h2>Lični podaci</h2><p>Ažuriraj svoje podatke u bilo kojem trenutku.</p></div>
            <div className="fGrid">
              <label className="fField">Ime i prezime *<input name="name" value={m.name || ''} onChange={change} required/></label>
              <label className="fField">Korisničko ime<input name="username" value={m.username || ''} onChange={change}/></label>
              <label className="fField">E-mail<input type="email" value={m.email || ''} readOnly title="E-mail adresu nije moguće promijeniti."/></label>
              <label className="fField">Telefon<input name="phone" type="tel" value={m.phone || ''} onChange={change}/></label>
              <label className="fField">Grad<input value={m.city || ''} disabled/></label>
              <label className="fField">Datum rođenja<input type="date" name="birth_date" value={m.birth_date?.slice(0, 10) || ''} onChange={change}/></label>
            </div>
            <div id="novosti" className="acNews">
              <label className="fCheck"><input type="checkbox" name="newsletter" checked={!!m.newsletter} onChange={change}/>
                <span><b>ALY novosti</b><br/>Želim primati obavijesti o novim kolekcijama, posebnim pogodnostima i ranom pristupu.</span></label>
            </div>
            {msg.text && <p className={msg.ok ? 'fMsg ok' : 'fMsg'}>{msg.text}</p>}
            <button className="hmDarkBtn" disabled={saving}>{saving ? 'Čuvanje…' : 'Sačuvaj izmjene'}</button>
          </form>

          <section className="acClub">
            <div><p className="hmEyebrow">ALY CLUB</p><h2>Posebna si.</h2><p>Kao članica imaš rani pristup novim modelima i posebnim pogodnostima stvorenim samo za tebe.</p></div>
            <a className="hmGoldBtn" href="/kolekcija">Istraži kolekciju <Arrow/></a>
          </section>
        </div>
      </div>
    </main>
  </SitePage>;
}
