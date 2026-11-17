'use client';

import {useState} from 'react';
import SitePage from '../../components/SitePage';
import {INSTAGRAM_HANDLE} from '../../components/siteConfig';
import {Arrow} from '../../components/SiteIcons';
import '../club.css';

export default function ClubLoginPage() {
  const [form, setForm] = useState({email: '', password: '', remember: false});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState(false);
  const [sending, setSending] = useState(false);

  const update = e => setForm(v => ({...v, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}));

  async function submit(e) {
    e.preventDefault(); setMessage(''); setSending(true);
    try {
      const res = await fetch('/api/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(form)});
      const data = await res.json();
      setOk(res.ok); setMessage(data.message);
      if (res.ok) window.setTimeout(() => { window.location.href = '/moj-racun'; }, 650);
    } catch { setOk(false); setMessage('Veza trenutno nije dostupna. Pokušajte ponovo.'); }
    finally { setSending(false); }
  }

  return <SitePage active="ALY CLUB">
    <main className="hmWrap">
      <section className="authLayout">
        <aside className="authVisual"><img src="/images/club-login-aside.png" alt="Žena u taupe khimaru u kamenoj arhitekturi"/><p>Više od odjeće.<br/>Način života.</p></aside>
        <div className="authPanel hmBox dark">
          <img className="authLogo" src="/images/logo-aly.png" alt="MADE BY ALY" width="640" height="328"/>
          <h1>Dobrodošla nazad.</h1>
          <p className="authSub">Drago nam je što si ponovo ovdje.</p>
          <form onSubmit={submit}>
            <label className="fField">E-mail adresa<input type="email" name="email" autoComplete="email" value={form.email} onChange={update} required placeholder="Unesi svoju e-mail adresu"/></label>
            <label className="fField">Lozinka<span className="fPass"><input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" value={form.password} onChange={update} required placeholder="Unesi svoju lozinku"/><button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Sakrij lozinku' : 'Prikaži lozinku'}>{showPassword ? 'Sakrij' : 'Prikaži'}</button></span></label>
            <div className="authRow">
              <label className="fCheck"><input type="checkbox" name="remember" checked={form.remember} onChange={update}/>Zapamti me</label>
              <button type="button" onClick={() => { setOk(false); setMessage(`Za obnovu pristupa piši nam na Instagramu (${INSTAGRAM_HANDLE}) ili Facebooku.`); }}>Zaboravljena lozinka?</button>
            </div>
            {message && <p className={ok ? 'fMsg ok' : 'fMsg'}>{message}</p>}
            <button className="hmGoldBtn" disabled={sending}>{sending ? 'Prijava…' : <>Prijavi se <Arrow/></>}</button>
          </form>
          <div className="authSwitch">
            <p>Nisi članica?</p>
            <a className="hmOutlineBtn" href="/club/prijava">Pridruži se ALY CLUB-u</a>
          </div>
        </div>
      </section>
    </main>
  </SitePage>;
}
