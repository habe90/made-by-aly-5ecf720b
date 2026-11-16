'use client';
import {useEffect, useState} from 'react';
import {Arrow} from './SiteIcons';

// Brza prijava na ALY CLUB novosti (samo e-mail).
export default function ClubModal({onClose}) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function submit(e) {
    e.preventDefault(); setSending(true); setMessage('');
    try {
      const res = await fetch('/api/club', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      const data = await res.json(); setMessage(data.message); setOk(res.ok);
      if (res.ok) setEmail('');
    } catch { setMessage('Veza trenutno nije dostupna. Pokušajte ponovo.'); setOk(false); }
    setSending(false);
  }

  return <div className="siteModal" role="dialog" aria-modal="true" aria-label="Pridruži se ALY CLUB-u" onClick={e => e.target === e.currentTarget && onClose()}>
    <div className="hmBox dark">
      <button className="hmClose" onClick={onClose} aria-label="Zatvori">×</button>
      <img src="/images/logo-aly.png" alt="MADE BY ALY" style={{height: 70, width: 'auto'}}/>
      <h2>ALY CLUB</h2>
      <p>Prijavi se za rani pristup kolekcijama, privatne ponude i priče iza svakog modela.</p>
      <form onSubmit={submit}>
        <label className="fField"><span className="srOnly">E-mail</span><input type="email" required placeholder="Tvoja e-mail adresa" value={email} onChange={e => setEmail(e.target.value)}/></label>
        <button className="hmGoldBtn" disabled={sending}>{sending ? 'Šaljem…' : <>Pridruži se <Arrow/></>}</button>
      </form>
      {message && <p className={ok ? 'fMsg ok' : 'fMsg'} style={{marginTop: 16}}>{message}</p>}
      <p style={{marginTop: 18, fontSize: 13}}>Želiš puno članstvo? <a href="/club/prijava">Kreiraj profil</a></p>
    </div>
  </div>;
}
