'use client';
import {useEffect, useState} from 'react';
import {CartIcon} from './Icons';
import './site-header.css';

const LINKS = [
  ['Početna', '/'],
  ['Kolekcija', '/kolekcija'],
  ['Haljine', '/kolekcija'],
  ['Khimari', '/kolekcija'],
  ['ALY CLUB', '/club'],
  ['O nama', '/#onama'],
  ['Kontakt', '/#kontakt']
];

function SearchIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>;
}
function UserIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.2-6 8-6s6.8 2 8 6"/></svg>;
}

export default function SiteHeader({active = 'Početna', cartCount = 0}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return <header className="siteHeader">
    <div className="shInner">
      <a className="shLogo" href="/" aria-label="MADE BY ALY — početna">
        <img src="/images/logo-aly.png" alt="MADE BY ALY" width="640" height="328"/>
      </a>
      <nav className={open ? 'shNav open' : 'shNav'} aria-label="Glavna navigacija">
        {LINKS.map(([label, href]) => <a key={label} href={href} className={label === active ? 'on' : ''} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <div className="shIcons">
        <a href="/kolekcija" aria-label="Pretraga"><SearchIcon/></a>
        <a href="/moj-racun" aria-label="Moj račun"><UserIcon/></a>
        <a href="/kolekcija" aria-label={`Korpa (${cartCount})`} className="shCart"><CartIcon size={23}/><b>{cartCount}</b></a>
        <button className={open ? 'shBurger open' : 'shBurger'} onClick={() => setOpen(!open)} aria-label={open ? 'Zatvori meni' : 'Otvori meni'} aria-expanded={open}><span/><span/><span/></button>
      </div>
    </div>
  </header>;
}
