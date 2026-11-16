'use client';

import {useState} from 'react';
import SitePage from '../../components/SitePage';
import {Arrow} from '../../components/SiteIcons';
import '../club.css';

const initial = {name: '', email: '', phone: '', instagram: '', city: '', country: '', password: '', confirmPassword: '', newsletter: false, terms: false};
const countries = ['Bosna i Hercegovina', 'Hrvatska', 'Srbija', 'Crna Gora', 'Slovenija', 'Austrija', 'Njemačka', 'Švicarska', 'Drugo'];

export default function ClubRegistrationPage() {
  const [form, setForm] = useState(initial);
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = e => setForm(v => ({...v, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}));

  async function submit(e) {
    e.preventDefault(); setMessage('');
    if (form.password !== form.confirmPassword) { setMessage('Lozinke se ne podudaraju.'); return; }
    if (!form.terms) { setMessage('Potrebno je prihvatiti uslove korištenja i politiku privatnosti.'); return; }
    setSending(true);
    try {
      const res = await fetch('/api/club', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(form)});
      const data = await res.json();
      if (!res.ok) setMessage(data.message); else { setSuccess(true); setForm(initial); }
    } catch { setMessage('Veza trenutno nije dostupna. Pokušajte ponovo.'); }
    finally { setSending(false); }
  }

  return <SitePage active="ALY CLUB">
    <main className="hmWrap">
      <section className="authLayout wide">
        <aside className="authVisual"><img src="/images/club-registration-aside.png" alt="Žena u crnoj abaji među kamenim lukovima"/><p>Zajednica koja inspiriše,<br/>podržava i raste zajedno.</p></aside>
        <div className="authPanel hmBox dark">
          <img className="authLogo" src="/images/logo-aly.png" alt="MADE BY ALY" width="640" height="328"/>
          {!success ? <>
            <h1>Postani dio ALY CLUB-a.</h1>
            <p className="authSub">Prostor za žene koje dijele iste vrijednosti – skromnost, eleganciju i svrhu.</p>
            <ul className="authPerks"><li>Rani pristup kolekcijama</li><li>Posebne pogodnosti</li><li>Inspirativan sadržaj</li></ul>
            <form onSubmit={submit}>
              <div className="fGrid">
                <label className="fField">Ime i prezime *<input name="name" autoComplete="name" value={form.name} onChange={update} required placeholder="Ime i prezime"/></label>
                <label className="fField">E-mail *<input name="email" type="email" autoComplete="email" value={form.email} onChange={update} required placeholder="tvoja@email.com"/></label>
                <label className="fField">Broj telefona *<input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} required placeholder="+387 61 123 456"/></label>
                <label className="fField">Instagram (opcionalno)<input name="instagram" value={form.instagram} onChange={update} placeholder="@korisnicko_ime"/></label>
                <label className="fField">Grad *<input name="city" autoComplete="address-level2" value={form.city} onChange={update} required placeholder="Grad"/></label>
                <label className="fField">Država *<select name="country" value={form.country} onChange={update} required><option value="">Odaberi državu</option>{countries.map(c => <option key={c}>{c}</option>)}</select></label>
                <label className="fField">Lozinka *<span className="fPass"><input name="password" type={showPass ? 'text' : 'password'} autoComplete="new-password" value={form.password} onChange={update} required minLength={8} placeholder="Najmanje 8 znakova"/><button type="button" onClick={() => setShowPass(!showPass)} aria-label={showPass ? 'Sakrij lozinku' : 'Prikaži lozinku'}>{showPass ? 'Sakrij' : 'Prikaži'}</button></span></label>
                <label className="fField">Potvrdi lozinku *<input name="confirmPassword" type={showPass ? 'text' : 'password'} autoComplete="new-password" value={form.confirmPassword} onChange={update} required minLength={8} placeholder="Ponovi lozinku"/></label>
              </div>
              <label className="fCheck"><input type="checkbox" name="newsletter" checked={form.newsletter} onChange={update}/>Želim primati ALY novosti i obavijesti.</label>
              <label className="fCheck"><input type="checkbox" name="terms" checked={form.terms} onChange={update}/>Prihvatam uslove korištenja i politiku privatnosti. *</label>
              {message && <p className="fMsg">{message}</p>}
              <button className="hmGoldBtn" disabled={sending}>{sending ? 'Kreiranje članstva…' : <>Postani članica <Arrow/></>}</button>
            </form>
            <div className="authSwitch"><p>Već imaš račun? <a href="/club/login">Prijavi se.</a></p></div>
          </> : <div className="authSuccess">
            <h1>Dobrodošla u ALY CLUB.</h1>
            <p>Tvoj račun je uspješno kreiran. Sada si dio posebne zajednice žena koje vjeruju da skromnost nikada ne izlazi iz mode.</p>
            <a className="hmGoldBtn" href="/club/login">Prijavi se <Arrow/></a>
          </div>}
        </div>
      </section>
    </main>
  </SitePage>;
}
