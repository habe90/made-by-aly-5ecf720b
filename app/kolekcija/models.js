// Kolekcija prikazuje samo prave modele iz app/proizvod/modeli.js (svaki ima svoju stranicu i paletu boja).
import {MODELI} from '../proizvod/modeli';

export const CATEGORIES = [
  ['sve', 'Sve'],
  ['abaye', 'Abaye'],
  ['haljine', 'Haljine'],
  ['khimari', 'Khimari']
];

export const MODELS = MODELI.map(m => ({
  id: m.slug,
  name: `${m.name} ${m.type.toLowerCase()}`,
  cat: m.cat,
  image: m.photos[0][0],
  colors: m.colors.map(c => [c.name, c.hex]),
  page: `/proizvod/${m.slug}`,
  isNew: true
}));
