// Pravi modeli s paletom boja. Svaka boja ima uzorak tkanine (swatch); `photo` je opcionalna originalna
// fotografija modela u toj boji — kad postoji, prikazuje se pri izboru boje.
// Sve fotografije su originali (bez ponovne kompresije). Nova boja/model: slike u public/images/modeli/<model>/.
const z = '/images/modeli/zafira';
const r = '/images/modeli/rose';

const palette = (dir, list) => list.map(([name, hex], i) => ({name, hex, swatch: `${dir}/tkanina-${i + 1}.webp`}));

export const MODELI = [
  {
    slug: 'zafira',
    name: 'Zafira',
    type: 'Haljina',
    cat: 'haljine',
    lead: 'Zafira je udobna haljina od kvalitetnog rebrastog materijala, s visokim ovratnikom i rukavima koji se skupljaju vezicama. Široki, ravni kroj pruža potpunu pokrivenost i slobodu pokreta — za svaki dan i svaku priliku.',
    photos: [[`${z}/glavna.png`, 'Zafira haljina na lutki, prikaz sprijeda'], [`${z}/detalj.webp`, 'Detalj rukava Zafira haljine s MADE BY ALY etiketom']],
    showcase: [[`${z}/sve-boje.webp`, 'Zafira haljina u svih 12 boja'], [`${z}/paleta.webp`, 'Paleta boja Zafira haljine s uzorcima tkanine']],
    features: ['Kvalitetan rebrasti materijal', 'Udobna i lagana', 'Prozračna i prijatna', 'Trajna boja'],
    details: [
      ['Materijal', 'Mekan, rebrasti pleteni materijal koji lijepo pada i zadržava oblik.'],
      ['Kroj', 'Široki ravni kroj, visoki ovratnik, rukavi s vezicama za podešavanje dužine i volumena.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Ne sušiti u mašini.']
    ],
    colors: palette(z, [
      ['Tamno plava', '#252e4c'], ['Bordo', '#561725'], ['Crna', '#1c1c1c'], ['Bijela', '#e9e6e3'],
      ['Krem', '#dfcdb8'], ['Bež', '#82665b'], ['Svijetlo bež', '#ac937e'], ['Maslinasta', '#987915'],
      ['Mint', '#718076'], ['Plava', '#263c74'], ['Ljubičasta', '#72326b'], ['Puder roza', '#cb868c']
    ])
  },
  {
    slug: 'rose',
    name: 'Rose',
    type: 'Haljina',
    cat: 'haljine',
    lead: 'Rose je mekana, široka haljina od teksturiranog pletiva, s blagim ovratnikom i balon rukavima stegnutim na manžetni. Topli, neutralni tonovi koji se lako kombinuju — udobnost bez kompromisa.',
    photos: [[`${r}/glavna.webp`, 'Rose haljina na lutki u svijetlo sivoj boji'], [`${r}/detalj.webp`, 'Detalj Rose haljine s balon rukavima i MADE BY ALY etiketom']],
    showcase: [[`${r}/sve-boje.webp`, 'Rose haljina u svih 10 boja'], [`${r}/paleta.webp`, 'Paleta boja Rose haljine s uzorcima tkanine']],
    features: ['Teksturirano pletivo', 'Balon rukavi', 'Široki kroj', 'Neutralni tonovi'],
    details: [
      ['Materijal', 'Mekano teksturirano pletivo, prijatno na koži i toplo za hladnije dane.'],
      ['Kroj', 'Široki A kroj, blagi ovratnik, balon rukavi s rebrastom manžetnom.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Sušiti položeno.']
    ],
    colors: palette(r, [
      ['Krem', '#e7e2db'], ['Svijetlo siva', '#c2c2c3'], ['Bež', '#b09e92'], ['Taupe', '#af9f96'], ['Mocca', '#8a7a72'],
      ['Crna melange', '#2a2a2a'], ['Crna', '#111113'], ['Pijesak', '#c4b7ad'], ['Siva', '#6b6c70'], ['Antracit', '#343435']
    ]),
    numbered: true
  }
];

export const getModel = slug => MODELI.find(m => m.slug === slug);
