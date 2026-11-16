import Kolekcija from './Kolekcija';
import {CATEGORIES} from './models';

export const metadata = {title: 'Kolekcija — MADE BY ALY'};

export default function Page({searchParams}) {
  const k = String(searchParams?.k || 'sve').toLowerCase();
  return <Kolekcija initial={CATEGORIES.some(([id]) => id === k) ? k : 'sve'}/>;
}
