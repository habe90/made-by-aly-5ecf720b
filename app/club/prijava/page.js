'use client';

import Image from 'next/image';
import { useState } from 'react';
import './style.css';

const nav = [['Početna','/'],['Kolekcija','/kolekcija'],['Haljine','/kolekcija'],['Khimari','/kolekcija'],['ALY CLUB','/club'],['O nama','/#onama'],['Kontakt','#kontakt']];
const initial = { name:'', email:'', phone:'', instagram:'', city:'', country:'', password:'', confirmPassword:'', newsletter:false, terms:false };

export default function ClubRegistrationPage(){
  const [form,setForm]=useState(initial); const [menu,setMenu]=useState(false); const [showPass,setShowPass]=useState(false); const [showConfirm,setShowConfirm]=useState(false); const [message,setMessage]=useState(''); const [sending,setSending]=useState(false); const [success,setSuccess]=useState(false);
  const update=(e)=>setForm(v=>({...v,[e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value}));
  async function submit(e){
    e.preventDefault(); setMessage('');
    if(form.password!==form.confirmPassword){setMessage('Lozinke se ne podudaraju.');return;}
    if(!form.terms){setMessage('Potrebno je prihvatiti uslove korištenja i politiku privatnosti.');return;}
    setSending(true);
    try{const res=await fetch('/api/club',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const data=await res.json();if(!res.ok) setMessage(data.message);else{setSuccess(true);setForm(initial);}}catch{setMessage('Veza trenutno nije dostupna. Pokušajte ponovo.');}finally{setSending(false);}
  }
  return <main className="clubRegisterPage">
    <header className="clubHeader registerHeader"><a className="brand" href="/">MADE BY ALY</a><button className="menuBtn" onClick={()=>setMenu(!menu)} aria-label="Otvori meni">{menu?'×':'☰'}</button><nav className={menu?'nav open':'nav'}>{nav.map(([l,h])=><a key={l} className={l==='ALY CLUB'?'active':''} href={h}>{l}</a>)}</nav><div className="clubHeaderIcons"><span>♙</span><span>♧</span></div></header>
    <section className="registerLayout">
      <aside className="registerVisual"><Image src="/images/club-registration-aside.png" alt="Žena u crnoj abaji među kamenim lukovima" fill priority sizes="38vw"/><div className="registerVisualShade"/><div className="registerVisualCopy"><p>VIŠE OD MODE.</p><h2>ZA ŽENE<br/>S VRIJEDNOSTIMA.</h2><i/><blockquote>“Zajednica koja<br/>inspiriše, podržava<br/>i raste zajedno.”</blockquote></div><p className="registerValues">SKROMNOST<br/>STIL<br/>SISTERSTVO<br/>UVIJEK</p></aside>
      <div className="registerContent">
        {!success ? <>
          <div className="registerIntro"><div><p className="clubKicker">POSEBNA ZAJEDNICA</p><h1>Postani dio<br/><em>ALY CLUB-a.</em></h1></div><ul><li>EKSKLUZIVNE POGODNOSTI</li><li>RANI PRISTUP KOLEKCIJAMA</li><li>POSEBNI POPUSTI</li><li>INSPIRATIVAN SADRŽAJ</li><li>ZAJEDNICA KOJA PODRŽAVA</li></ul></div>
          <p className="registerLead">Više od kupovine. ALY CLUB je prostor za žene koje dijele iste vrijednosti –<br/>skromnost, eleganciju i svrhu. Pridruži se i budi dio naše priče.</p>
          <form className="registerForm" onSubmit={submit}>
            <label>Ime i prezime *<input name="name" value={form.name} onChange={update} required placeholder="Unesi svoje ime i prezime"/></label>
            <label>E-mail *<input name="email" type="email" value={form.email} onChange={update} required placeholder="Unesi svoju e-mail adresu"/></label>
            <label>Broj telefona *<input name="phone" value={form.phone} onChange={update} required placeholder="+387 61 123 456"/></label>
            <label>Instagram korisničko ime (opcionalno)<input name="instagram" value={form.instagram} onChange={update} placeholder="@tvoje_korisnicko_ime"/></label>
            <label>Grad *<input name="city" value={form.city} onChange={update} required placeholder="Unesi svoj grad"/></label>
            <label>Država *<select name="country" value={form.country} onChange={update} required><option value="">Odaberi državu</option><option>Bosna i Hercegovina</option><option>Hrvatska</option><option>Srbija</option><option>Crna Gora</option><option>Slovenija</option><option>Austrija</option><option>Njemačka</option><option>Drugo</option></select></label>
            <label>Lozinka *<span className="passwordField"><input name="password" type={showPass?'text':'password'} value={form.password} onChange={update} required minLength="8" placeholder="Kreiraj lozinku (min. 8 znakova)"/><button type="button" onClick={()=>setShowPass(!showPass)} aria-label="Prikaži lozinku">◉</button></span></label>
            <label>Potvrdi lozinku *<span className="passwordField"><input name="confirmPassword" type={showConfirm?'text':'password'} value={form.confirmPassword} onChange={update} required minLength="8" placeholder="Ponovi svoju lozinku"/><button type="button" onClick={()=>setShowConfirm(!showConfirm)} aria-label="Prikaži potvrdu lozinke">◉</button></span></label>
            <div className="registerChecks"><label><input type="checkbox" name="newsletter" checked={form.newsletter} onChange={update}/><span/>Želim primati ALY novosti i obavijesti.</label><label><input type="checkbox" name="terms" checked={form.terms} onChange={update}/><span/>Prihvatam <a href="#">Uslove korištenja</a> i <a href="#">Politiku privatnosti</a>. *</label></div>
            {message&&<p className="registerMessage">{message}</p>}<button className="registerSubmit" disabled={sending}>{sending?'Kreiranje članstva...':'Postani članica　⟶'}</button><p className="loginPrompt">Već imaš račun? <a href="/club">Prijavi se.</a></p>
          </form>
        </> : <div className="registrationSuccess"><p className="clubKicker">DOBRO DOŠLA</p><h1>Postala si dio<br/><em>ALY CLUB-a.</em></h1><p>Tvoj račun je uspješno kreiran. Sada si dio posebne zajednice žena koje vjeruju da skromnost nikada ne izlazi iz mode.</p><a className="registerSubmit" href="/club">Istraži ALY CLUB　⟶</a></div>}
        <section className="successPreview"><div><p className="clubKicker">PRIMJER USPJEŠNE REGISTRACIJE</p><h2>Dobrodošla<br/>u <em>ALY CLUB.</em></h2><p>Tvoj račun je uspješno kreiran.<br/>Sada si dio posebne zajednice žena<br/>koje vjeruju da skromnost nikada<br/>ne izlazi iz mode.</p><i/>Lijepo je da si ovdje. ♡</div><div className="memberCard"><b>MADE BY ALY</b><small>ALY CLUB</small><p>Amina S.</p><span>ČLANICA BROJ<br/><strong>ALY 000128</strong></span></div></section>
      </div>
    </section>
    <footer id="kontakt" className="registerFooter"><div><a className="brand" href="/">MADE BY ALY</a><p>SKROMNOST UVIJEK U MODI.</p><p className="footerSocial">◎　f　♪　▣　p</p></div><div><b>Brzi linkovi</b>{nav.slice(0,6).map(([l,h])=><a href={h} key={l}>{l}</a>)}</div><div><b>Pomoć</b><a href="#">Česta pitanja</a><a href="#">Dostava i povrat</a><a href="#">Uslovi korištenja</a><a href="#">Politika privatnosti</a></div><div><b>Kontakt</b><p>✉　info@madebyaly.ba</p><p>⌕　+387 61 123 456</p><p>⌖　Sarajevo, Bosna i Hercegovina</p><i>Biti svoja.<br/>Uvijek.</i></div><small>© 2026 MADE BY ALY. Sva prava zadržana.</small></footer>
  </main>
}
