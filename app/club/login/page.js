'use client';

import Image from 'next/image';
import { useState } from 'react';
import './style.css';
import { CartIcon } from '../../components/Icons';

const nav = [['Početna','/'],['Kolekcija','/kolekcija'],['Haljine','/kolekcija'],['Khimari','/kolekcija'],['ALY CLUB','/club'],['O nama','/#onama'],['Kontakt','#kontakt']];

export default function ClubLoginPage(){
  const [menu,setMenu]=useState(false); const [showPassword,setShowPassword]=useState(false); const [form,setForm]=useState({email:'',password:'',remember:false}); const [message,setMessage]=useState(''); const [sending,setSending]=useState(false); const [success,setSuccess]=useState(false);
  const update=e=>setForm(v=>({...v,[e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value}));
  async function submit(e){e.preventDefault();setMessage('');setSending(true);try{const res=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const data=await res.json();if(!res.ok)setMessage(data.message);else{setSuccess(true);setMessage(data.message);}}catch{setMessage('Veza trenutno nije dostupna. Pokušajte ponovo.');}finally{setSending(false);}}
  return <main className="loginPage">
    <header className="clubHeader loginHeader"><a className="brand" href="/">MADE BY ALY</a><button className="menuBtn" onClick={()=>setMenu(!menu)} aria-label={menu?'Zatvori meni':'Otvori meni'} aria-expanded={menu}>{menu?'×':'☰'}</button><nav className={menu?'nav open':'nav'}>{nav.map(([l,h])=><a key={l} className={l==='ALY CLUB'?'active':''} href={h}>{l}</a>)}</nav><div className="loginHeaderIcons"><a href="/club/login" aria-label="Korisnički račun">♙</a><span aria-hidden="true"><CartIcon/></span><small>0 KM</small></div></header>
    <section className="loginLayout">
      <aside className="loginVisual"><Image src="/images/club-login-aside.png" alt="Žena u taupe khimaru u kamenoj arhitekturi" fill priority sizes="50vw"/><div className="loginVisualShade"/><div className="loginVisualClaim">VIŠE<br/>OD ODJEĆE.<br/>NAČIN ŽIVOTA.<i/></div><div className="loginVisualBrand"><b>MADE BY ALY</b><small>MODEST FASHION<br/>FOR A BRIGHTER TOMORROW</small></div></aside>
      <div className="loginPanel">
        <div className="loginBox">
          <p className="loginKicker">ALY CLUB</p><i className="loginLine"/>
          {!success?<><h1>Dobrodošla nazad.</h1><p className="loginSubtitle">Drago nam je što si ponovo ovdje.</p>
          <form onSubmit={submit} className="loginForm"><label>E-mail adresa<input type="email" name="email" value={form.email} onChange={update} required placeholder="Unesi svoju e-mail adresu"/></label><label>Lozinka<span className="loginPassword"><input type={showPassword?'text':'password'} name="password" value={form.password} onChange={update} required placeholder="Unesi svoju lozinku"/><button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?'Sakrij lozinku':'Prikaži lozinku'}>◉</button></span></label><div className="loginOptions"><label><input type="checkbox" name="remember" checked={form.remember} onChange={update}/><span/>Zapamti me</label><button type="button" onClick={()=>setMessage('Javite se na info@madebyaly.ba za obnovu pristupa.')}>Zaboravljena lozinka?</button></div>{message&&<p className="loginMessage">{message}</p>}<button className="loginSubmit" disabled={sending}>{sending?'Prijava...':'Prijavi se　→'}</button></form>
          <div className="loginJoin"><p>Nisi članica?</p><a href="/club/prijava">Pridruži se ALY CLUB-u</a><small>Postani dio naše zajednice i otkrij ekskluzivne pogodnosti,<br/>rane pristupe kolekcijama i više.</small></div></>:<div className="loginSuccess"><h1>Dobrodošla nazad.</h1><p>Uspješno si prijavljena u ALY CLUB.</p><a href="/kolekcija">Istraži kolekciju　→</a></div>}
        </div>
      </div>
    </section>
    <footer id="kontakt" className="loginFooter"><div className="loginFooterBrand"><a className="brand" href="/">MADE BY ALY</a><p>MODEST FASHION<br/>FOR A BRIGHTER TOMORROW</p></div><div><b>Kupovina</b><a href="/kolekcija">Kolekcija</a><a href="/kolekcija">Haljine</a><a href="/kolekcija">Khimari</a><a href="/club">ALY CLUB</a></div><div><b>Pomoć</b><a href="#">Dostava i povrat</a><a href="#">Česta pitanja</a><a href="#">Veličine</a><a href="#kontakt">Kontakt</a></div><div><b>O nama</b><a href="/#onama">Naša priča</a><a href="/#onama">Vrijednosti</a><a href="#">Journal</a><a href="#kontakt">Kontakt</a></div><div className="loginNewsletter"><b>Budi dio priče.</b><p>Pretplati se na novosti i posebne ponude.</p><form><input type="email" placeholder="Tvoja e-mail adresa"/><button>→</button></form></div><small className="loginCopyright">© 2026 MADE BY ALY. Sva prava zadržana.</small><small className="loginLegal">Uslovi korištenja　 Privatnost　 Kolačići　　|　 KM⌄</small></footer>
  </main>
}
