'use client';
import SiteHeader, {SITE_LINKS} from './SiteHeader';
import {InstaIcon, MailIcon} from './SiteIcons';
import './site.css';

import {CONTACT_EMAIL} from './siteConfig';
export {CONTACT_EMAIL};

export function SiteFooter() {
  return <footer className="hmFooter">
    <div className="hmFooterInner">
      <div className="hmFooterBrand"><img src="/images/logo-aly.png" alt="MADE BY ALY" width="640" height="328" loading="lazy"/><p>Skromnost je uvijek lijep izbor.</p></div>
      <nav aria-label="Footer navigacija">{SITE_LINKS.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
      <div className="hmFooterSocial">
        <div>
          <a href="/instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstaIcon/></a>
          <a href={`mailto:${CONTACT_EMAIL}`} aria-label="E-mail"><MailIcon/></a>
        </div>
        <em>Hvala što si dio ove priče. ♡</em>
      </div>
    </div>
    <div className="hmFooterBottom"><p>© {new Date().getFullYear()} MADE BY ALY. Sva prava zadržana.</p><p>Sarajevo · Bosna i Hercegovina</p></div>
  </footer>;
}

// Okvir svake javne stranice: tamni header s logom, svijetli sadržaj, tamni footer.
export default function SitePage({active, className = '', children}) {
  return <div className={`site ${className}`.trim()}>
    <SiteHeader active={active}/>
    {children}
    <SiteFooter/>
  </div>;
}
