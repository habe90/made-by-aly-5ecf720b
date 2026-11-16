// Modeli za prezentaciju (bez cijena i kupovine). Nazive, slike i opise slobodno mijenjati.
import {MODELI} from '../proizvod/modeli';

export const CATEGORIES = [
  ['sve', 'Sve'],
  ['abaye', 'Abaye'],
  ['haljine', 'Haljine'],
  ['khimari', 'Khimari']
];

// Pravi modeli (s paletom boja i vlastitom stranicom) idu prvi.
const REAL = MODELI.map(m => ({
  id: m.slug, name: `${m.name} ${m.type.toLowerCase()}`, cat: m.cat, image: m.photos[0][0],
  colors: m.colors.map(c => [c.name, c.hex]), page: `/proizvod/${m.slug}`, isNew: true
}));

export const MODELS = [
  ...REAL,
  {id: 'luna-haljina', name: 'Luna haljina', cat: 'haljine', image: '/images/luna-main.png', colors: [['Crna', '#0b0b0b'], ['Taupe', '#9e968a'], ['Krem', '#ece6da']],
    text: 'Fluidan pad i profinjen kroj za potpunu pokrivenost i bezvremensku eleganciju.', href: '/proizvod/luna-haljina'},
  {id: 'amara-haljina', name: 'Amara haljina', cat: 'haljine', image: '/images/collection-amara-dress.png', colors: [['Crna', '#0b0b0b'], ['Krem', '#e9e0d2']],
    text: 'Jednostavna linija i široki rukavi — elegancija za svaki dan.'},
  {id: 'serena-haljina', name: 'Serena haljina', cat: 'haljine', image: '/images/collection-serena-dress.png', colors: [['Taupe', '#8d8177'], ['Krem', '#eee5d7']],
    text: 'Topli taupe ton i mekan materijal koji prati pokret.'},
  {id: 'noor-haljina', name: 'Noor haljina', cat: 'haljine', image: '/images/collection-noor-dress.png', colors: [['Krem', '#e9dfd0'], ['Siva', '#69625c']],
    text: 'Svijetla, prozračna i nježna — za posebne prilike.'},
  {id: 'lejla-haljina', name: 'Lejla haljina', cat: 'haljine', image: '/images/product-lejla.png', colors: [['Bijela', '#f4f0e8']],
    text: 'Svečani model s detaljima koji ostaju u sjećanju.'},
  {id: 'amina-abaya', name: 'Amina abaya', cat: 'abaye', image: '/images/product-amina.png', colors: [['Crna', '#0b0b0b']],
    text: 'Klasična crna abaya slojevitog kroja i potpune udobnosti.'},
  {id: 'safa-abaya', name: 'Safa abaya', cat: 'abaye', image: '/images/club-registration-aside.png', colors: [['Crna', '#0b0b0b']],
    text: 'Raskošan pad tkanine i dostojanstvena silueta.'},
  {id: 'zahra-khimar', name: 'Zahra khimar', cat: 'khimari', image: '/images/kolekcija/zahra-khimar.webp', colors: [['Crna', '#0b0b0b'], ['Krem', '#e8ded1']],
    text: 'Dug khimar za potpunu pokrivenost i lagan osjećaj tokom dana.'},
  {id: 'leila-khimar', name: 'Leila khimar', cat: 'khimari', image: '/images/kolekcija/leila-khimar.webp', colors: [['Taupe', '#8c8078'], ['Moka', '#594b45'], ['Crna', '#0b0b0b']],
    text: 'Mekan pad i topli tonovi koji se lako kombinuju.'},
  {id: 'alya-khimar', name: 'Alya khimar', cat: 'khimari', image: '/images/kolekcija/alya-khimar.webp', colors: [['Crna', '#0b0b0b'], ['Taupe', '#80766e'], ['Krem', '#e9e1d6']],
    text: 'Jednostavan, moderan i uvijek uredan.'},
  {id: 'noor-khimar', name: 'Noor khimar', cat: 'khimari', image: '/images/product-noor.png', colors: [['Taupe', '#9a8b7f']],
    text: 'Pokrivenost u modernom izdanju, savršen uz haljine iz kolekcije.'},
  {id: 'luna-khimar', name: 'Luna khimar', cat: 'khimari', image: '/images/luna-khimar-front.png', colors: [['Crna', '#0b0b0b']],
    text: 'Od istog materijala kao Luna haljina, za jedinstven izgled.'}
];
