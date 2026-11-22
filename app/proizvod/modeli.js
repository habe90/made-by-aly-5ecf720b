// Pravi modeli s paletom boja. Svaka boja ima uzorak tkanine (swatch); `photo` je opcionalna originalna
// fotografija modela u toj boji — kad postoji, prikazuje se pri izboru boje.
// Sve fotografije su originali (bez ponovne kompresije). Nova boja/model: slike u public/images/modeli/<model>/.
const z = '/images/modeli/zafira';
const r = '/images/modeli/rose';
const v = '/images/modeli/vintage-beauty';
const d = '/images/modeli/daly';
const ay = '/images/modeli/ayra';
const gi = '/images/modeli/gia';
const va = '/images/modeli/vayne';
const el = '/images/modeli/elise';
const eo = '/images/modeli/elodie';
const ly = '/images/modeli/leya';
const vl = '/images/modeli/velora';

import {POZADINE} from './pozadine';

const palette = (dir, list) => list.map(([name, hex], i) => ({name, hex, swatch: `${dir}/tkanina-${i + 1}.webp`}));

// Modeli s jednom originalnom fotografijom (u jednoj boji). Druge boje i mjere — na upit.
const jedan = ([slug, name, type, color, hex, lead, features]) => {
  const src = `/images/modeli/${slug}/glavna.webp`;
  const alt = `${name} ${type.toLowerCase()} u boji ${color.toLowerCase()}`;
  return {
    slug, name, type, cat: 'haljine', lead, features,
    bg: POZADINE[slug],
    photos: [[src, alt]],
    details: [
      ['Boje i mjere', `Model je prikazan u boji ${color.toLowerCase()}. Za druge boje, veličinu, dužinu ili izradu po mjeri pošalji nam upit.`],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Peglati na niskoj temperaturi.']
    ],
    colors: [{name: color, hex, photo: src}]
  };
};

const NOVI = [
  ['noor', 'Noor', 'Haljina', 'Svijetlo žuta', '#f1e594', 'Noor je lepršava haljina s bijelim prednjim dijelom ukrašenim dugmadima, naborom ispod grudi i balon rukavima s volanom na manžetni. Nježna kombinacija svijetlo žute i bijele za proljetne i svečane dane.', ['Dvobojni gornji dio', 'Dekorativna dugmad', 'Balon rukavi s volanom', 'Široki, lepršavi kroj']],
  ['abra', 'Abra', 'Haljina', 'Roza', '#d9608f', 'Abra je svečana haljina satenskog sjaja s naboranim ovratnikom od čipke, kapljičastim izrezom s biserom i balon rukavima koji završavaju volanom.', ['Satenski sjaj', 'Čipkasti ovratnik', 'Balon rukavi s volanom', 'Široki kroj']],
  ['ruqaya', 'Ruqaya', 'Haljina', 'Baby plava', '#a9c6e6', 'Ruqaya je satenska haljina s naborom ispod grudi, balon rukavima i manžetama s dugmadima i volanom. Lepršava i elegantna — za posebne prilike.', ['Satenski sjaj', 'Nabor ispod grudi', 'Manžete s dugmadima', 'Lepršav kroj']],
  ['laurel', 'Laurel', 'Haljina', 'Starinska roza', '#b26a78', 'Laurel je elegantna haljina s kragnom, dekorativnim dugmetom i finim pliseiranim linijama na grudima. Bogata suknja i dvostruki volani na rukavima daju joj nježan, ženstven izgled.', ['Kragna s dugmetom', 'Pliseirane linije', 'Dvostruki volani na rukavima', 'Bogata suknja']],
  ['elysee', 'Elysee', 'Haljina', 'Lavanda', '#b8a2dc', 'Elysee je satenska haljina u boji lavande, uz khimar od teksturirane tkanine u istom tonu. Široki kroj, balon rukavi i manžete s dugmadima — mekan, svečan i potpuno pokriven izgled.', ['Haljina i khimar', 'Satenski sjaj', 'Manžete s dugmadima', 'Široki kroj']],
  ['tia', 'Tia', 'Haljina', 'Bordo', '#6a1a2e', 'Tia je haljina na preklop s vezicom sa strane, u dubokoj bordo boji. Rukavi su na podlaktici nabrani i završavaju malim volanom.', ['Kroj na preklop', 'Vezica sa strane', 'Nabrani rukavi', 'Duboka bordo boja']],
  ['solene', 'Solene', 'Komplet', 'Maslinasta', '#6f7533', 'Solene je komplet od kimono tunike na preklop s vezicom i duge, široke suknje. Široki rukavi s manžetama i maslinasta boja daju mu moderan, opušten izgled.', ['Tunika i suknja', 'Kimono rukavi', 'Preklop s vezicom', 'Moderan kroj']],
  ['yass', 'Yass', 'Haljina', 'Smaragdno zelena', '#0d4f4c', 'Yass je haljina na preklop s vezicom sa strane i balon rukavima, u bogatoj smaragdno zelenoj boji. Lijepo pada i prati pokret — elegantna za svaki dan i svečane prilike.', ['Kroj na preklop', 'Vezica sa strane', 'Balon rukavi', 'Mekan pad']],
  ['elaris', 'Elaris', 'Haljina', 'Starinska roza', '#b8707e', 'Elaris je široka haljina s volanom pri dnu i balon rukavima koji se vežu mašnom. Jednostavna, ženstvena i udobna — u nježnoj starinskoj roza boji.', ['Volan pri dnu', 'Rukavi s mašnom', 'Široki kroj', 'Udobna za svaki dan']],
  ['tera', 'Tera', 'Haljina', 'Ljubičasta', '#8a5276', 'Tera je lepršava haljina od mekane, teksturirane tkanine, širokog kroja i balon rukava s nabranom manžetom. Topla ljubičasta nijansa i jednostavna linija za svaki dan.', ['Teksturirana tkanina', 'Balon rukavi', 'Nabrane manžete', 'Lepršav kroj']],
  ['vilma', 'Vilma', 'Haljina', 'Tirkizna', '#1e88a8', 'Vilma je svečani komplet od sjajne, plisirane tkanine — dugi khimar i široka haljina s naboranim rukavima. Bogat tirkizni ton s tamnoplavim detaljima za posebne prilike.', ['Haljina i khimar', 'Tkanina sa sjajem', 'Nabrani rukavi', 'Svečani izgled']],
  ['evara', 'Evara', 'Haljina', 'Puder roza', '#f4c3b7', 'Evara je nježna haljina u puder roza boji, s volanom pri dnu i rukavima s dvostrukim volanom i manžetom u kontrastnoj bež boji.', ['Volan pri dnu', 'Dvostruki volani na rukavima', 'Kontrastne manžete', 'Nježna boja']],
  ['tuberose', 'Tuberose', 'Haljina', 'Bijela', '#f1efea', 'Tuberose je bijela haljina s dugmadima cijelom dužinom, volanom pri dnu i balon rukavima s manžetom koja prekriva šaku. Čista, svijetla linija za svečane dane.', ['Dugmad cijelom dužinom', 'Volan pri dnu', 'Manžete preko šake', 'Svečana bijela']],
  ['noir', 'Noir', 'Komplet', 'Ciklama', '#b51e4e', 'Noir je komplet od široke tunike s nabranom vezicom sa strane i duge suknje, od mekane tkanine sa suede efektom. Zlatna dugmad na manžetama daju mu posebnu notu.', ['Tunika i suknja', 'Nabrana vezica sa strane', 'Zlatna dugmad', 'Suede efekt']],
  ['dux', 'Dux Oversize', 'Haljina', 'Mocca', '#9a6656', 'Dux je oversize haljina s visokim ovratnikom, velikim prednjim džepovima i balon rukavima. Opušten, moderan kroj za potpunu udobnost.', ['Oversize kroj', 'Visoki ovratnik', 'Veliki džepovi', 'Balon rukavi']],
  ['classic', 'Classic Oversize', 'Haljina', 'Bež melange', '#a8907e', 'Classic je oversize haljina od tkanine s melange teksturom, s V izrezom, širokim rukavima i vezicom u struku. Bezvremenski, prirodni ton koji se lako kombinuje.', ['Oversize kroj', 'Melange tekstura', 'Vezica u struku', 'Široki rukavi']],
  ['saly', 'Saly', 'Haljina', 'Baby plava', '#b4cfe0', 'Saly je haljina s tri reda volana i rukavima koji se skupljaju vezicama, uz khimar u bež boji. Nježna baby plava i lepršav kroj za upečatljiv, a skroman izgled.', ['Haljina i khimar', 'Tri reda volana', 'Rukavi s vezicama', 'Lepršav kroj']],
  ['freya', 'Freya', 'Haljina', 'Limeta', '#c9d32a', 'Freya je lepršava haljina s nabranim donjim dijelom i širokim rukavima s volanom. Živa limeta boja za odvažan, vedar izgled.', ['Široki rukavi s volanom', 'Nabrani donji dio', 'Lepršav kroj', 'Živa boja']],
  ['cleo', 'Cleo', 'Haljina', 'Koralna', '#e6766d', 'Cleo je haljina s dugmadima na prednjem dijelu, nabranim donjim dijelom i balon rukavima s volanom na manžetni. Topla koralna boja i jednostavan, ženstven kroj.', ['Dugmad sprijeda', 'Nabrani donji dio', 'Balon rukavi', 'Koralna boja']],
  ['vintage', 'Vintage', 'Haljina', 'Maslinasta', '#6a6b38', 'Vintage je komplet od dugog khimara i široke haljine s rukavima koji se zakopčavaju dugmadima i završavaju volanom. Maslinasta boja i mekan pad za smiren, elegantan izgled.', ['Haljina i khimar', 'Manžete s dugmadima', 'Volan na rukavima', 'Mekan pad']]
].map(jedan);

export const MODELI = [
  {
    slug: 'zafira',
    name: 'Zafira',
    type: 'Haljina',
    cat: 'haljine',
    lead: 'Zafira je udobna haljina od kvalitetnog rebrastog materijala, s visokim ovratnikom i rukavima koji se skupljaju vezicama. Široki, ravni kroj pruža potpunu pokrivenost i slobodu pokreta — za svaki dan i svaku priliku.',
    photos: [[`${z}/glavna.png`, 'Zafira haljina na lutki, prikaz sprijeda'], [`${z}/detalj.webp`, 'Detalj rukava Zafira haljine s MADE BY ALY etiketom']],
    // Boja se nanosi na originalnu fotografiju u browseru (maska = dio slike koji je haljina).
    recolor: {src: `${z}/glavna.png`, mask: `${z}/maska.png`},
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
    recolor: {src: `${r}/glavna.webp`, mask: `${r}/maska.png`},
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
  },
  {
    slug: 'vintage-beauty',
    name: 'Vintage beauty',
    type: 'Abaya',
    cat: 'abaye',
    lead: 'Vintage beauty je set abaye i khimara od medinske svile, s nježnim volanima na khimaru i rukavima, manžetnama s dugmićima i bogatim padom tkanine. Romantičan detalj i potpuna pokrivenost u jednom modelu.',
    photos: [[`${v}/cokolada.webp`, 'Vintage beauty abaya i khimar u boji čokolade'], [`${v}/maslinasta.webp`, 'Vintage beauty abaya i khimar u maslinasto zelenoj boji']],
    features: ['Medinska svila', 'Khimar s volanima', 'Manžete s dugmićima', 'Potpuna pokrivenost'],
    details: [
      ['Materijal', 'Medinska svila — mekana, mat tkanina koja lijepo pada, ne gužva se lako i prijatna je za nošenje.'],
      ['Kroj', 'Široka abaya s balon rukavima, manžete s dugmićima i volanom; dugi khimar s naboranim volanom.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Peglati na niskoj temperaturi.']
    ],
    colors: [
      {name: 'Čokolada', hex: '#6b3a28', photo: `${v}/cokolada.webp`},
      {name: 'Maslinasto zelena', hex: '#5f6b2a', photo: `${v}/maslinasta.webp`}
    ]
  },
  {
    slug: 'daly',
    name: 'Daly',
    type: 'Abaya',
    cat: 'abaye',
    lead: 'Daly je set abaye i dugog khimara od mekane tkanine sa suptilnim sjajem. Široki kroj s balon rukavima i rebrastim manžetama, slojeviti khimar koji lijepo pada — elegancija u 14 boja.',
    photos: [[`${d}/glavna.webp`, 'Daly abaya i khimar u maslinasto zelenoj boji, prikaz sprijeda'], [`${d}/ledja.webp`, 'Daly abaya i khimar, prikaz s leđa'], [`${d}/detalj.webp`, 'Detalj rukava Daly abaye s MADE BY ALY etiketom']],
    // Originalna fotografija je maslinasto zelena; ostale boje se nanose na nju u browseru.
    recolor: {src: `${d}/glavna.webp`, mask: `${d}/maska.png`},
    showcase: [[`${d}/paleta.webp`, 'Paleta boja Daly abaye']],
    features: ['Tkanina sa suptilnim sjajem', 'Dugi khimar u setu', 'Balon rukavi', 'Rebraste manžete'],
    details: [
      ['Materijal', 'Mekana, lagana tkanina s finim sjajem koja lijepo pada i ugodna je za nošenje.'],
      ['Kroj', 'Široka abaya s balon rukavima i rebrastim manžetama; dugi, slojeviti khimar.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Ne sušiti u mašini.']
    ],
    colors: palette(d, [
      ['Fuksija', '#c40c74'], ['Ljubičasta', '#501eba'], ['Teget plava', '#112157'], ['Maslinasto zelena', '#9e9a1f'], ['Lila', '#975d97'],
      ['Žuta', '#d9cc06'], ['Kraljevsko plava', '#032eb9'], ['Petrol zelena', '#046969'], ['Pink', '#e1198c'], ['Zelena', '#05a432'],
      ['Narandžasta', '#f14804'], ['Mint zelena', '#8bc5b1'], ['Crna', '#23242b'], ['Svijetla bež', '#e3d8cd']
    ]).map(c => c.name === 'Maslinasto zelena' ? {...c, photo: `${d}/glavna.webp`} : c)
  },
  {
    slug: 'ayra',
    name: 'Ayra',
    type: 'Haljina',
    cat: 'haljine',
    lead: 'Ayra je široka haljina od viskoznog štofa s finim prugicama, presvučenim dugmićima cijelom dužinom i bočnim džepovima. Udoban, elegantan kroj koji se lako nosi od jutra do večeri.',
    photos: [[`${ay}/siva.webp`, 'Ayra haljina u sivoj boji'], [`${ay}/krem.webp`, 'Ayra haljina u krem boji'], [`${ay}/crna.webp`, 'Ayra haljina u crnoj boji'], [`${ay}/smeda.webp`, 'Ayra haljina u čokoladnoj boji'], [`${ay}/teget.webp`, 'Ayra haljina u teget boji'], [`${ay}/bez.webp`, 'Ayra haljina u bež boji']],
    features: ['Viskozni štof', 'Fine prugice', 'Presvučeni dugmići', 'Bočni džepovi'],
    details: [
      ['Materijal', 'Viskozni štof — mekan, prozračan i ugodan na koži, s finim uzdužnim prugicama.'],
      ['Kroj', 'Široki A kroj, okrugli izrez, presvučeni dugmići cijelom dužinom, rukavi s manžetom i bočni džepovi.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Peglati na srednjoj temperaturi.']
    ],
    // Prave fotografije za svaku boju — bez digitalnog bojenja.
    colors: [
      {name: 'Siva', hex: '#7d7f82', swatch: `${ay}/tkanina-1.webp`, photo: `${ay}/siva.webp`},
      {name: 'Krem', hex: '#d7d3c9', swatch: `${ay}/tkanina-2.webp`, photo: `${ay}/krem.webp`},
      {name: 'Crna', hex: '#29282b', swatch: `${ay}/tkanina-3.webp`, photo: `${ay}/crna.webp`},
      {name: 'Čokolada', hex: '#4a2c24', swatch: `${ay}/tkanina-4.webp`, photo: `${ay}/smeda.webp`},
      {name: 'Teget', hex: '#252a45', swatch: `${ay}/tkanina-5.webp`, photo: `${ay}/teget.webp`},
      {name: 'Bež', hex: '#c0b09f', swatch: `${ay}/tkanina-6.webp`, photo: `${ay}/bez.webp`}
    ]
  },
  {
    slug: 'gia',
    name: 'Gia',
    type: 'Khimar',
    cat: 'khimari',
    lead: 'Gia je pamučni khimar koji mekano pada oko lica i ramena. Prozračan i lagan, ugodan za cjelodnevno nošenje — dostupan u 21 boji.',
    photos: [[`${gi}/glavna.jpg`, 'Gia pamučni khimar, prikaz sprijeda i straga']],
    recolor: {src: `${gi}/glavna.jpg`, mask: `${gi}/maska.png`},
    showcase: [[`${gi}/paleta.webp`, 'Paleta dostupnih boja za Gia khimar']],
    features: ['Pamučni materijal', 'Prozračan i lagan', 'Mekan pad', '21 boja'],
    details: [
      ['Materijal', 'Pamuk — prirodan, prozračan i ugodan na koži.'],
      ['Kroj', 'Khimar koji pokriva glavu, vrat i ramena, s mekanim padom naprijed i dužim stražnjim dijelom.'],
      ['Održavanje', 'Prati na 30–40°C. Peglati na srednjoj temperaturi.']
    ],
    colors: palette(gi, [
      ['Tamno smeđa', '#3c1911'], ['Smeđa', '#8e4d34'], ['Bež', '#d8b291'], ['Krem', '#f4e6d2'], ['Bijela', '#ece7ec'],
      ['Svijetlo plava', '#bfcfe2'], ['Teget', '#09184b'], ['Svijetlo siva', '#d0ccd1'], ['Tamno siva', '#888889'], ['Tirkizna', '#03a9a2'],
      ['Kraljevsko plava', '#0226c5'], ['Žuta', '#f9b40b'], ['Blijedo žuta', '#fceea9'], ['Fuksija', '#c2074e'], ['Crvena', '#af090c'],
      ['Bordo', '#79112b'], ['Ljubičasta', '#72337d'], ['Roza', '#fbb1bb'], ['Baby roze', '#fddbe5'], ['Pistacija', '#c7d292'],
      ['Smaragdno zelena', '#036d3e']
    ])
  },
  {
    slug: 'vayne',
    name: 'Vayne',
    type: 'Khimar',
    cat: 'khimari',
    lead: 'Vayne je slojeviti khimar od muslina. Više slojeva lagane tkanine stvara bogat, prozračan pad i potpunu pokrivenost — dostupan u čak 95 nijansi.',
    photos: [[`${va}/glavna.webp`, 'Vayne slojeviti khimar od muslina, prikaz straga i sprijeda']],
    recolor: {src: `${va}/glavna.webp`, mask: `${va}/maska.png`},
    showcase: [[`${va}/paleta.webp`, 'Paleta dostupnih nijansi za Vayne khimar']],
    features: ['Slojeviti muslin', 'Prozračan i lagan', 'Bogat pad u slojevima', '95 nijansi'],
    details: [
      ['Materijal', 'Muslin — lagana, prozračna tkanina koja lijepo pada u slojevima.'],
      ['Kroj', 'Dugi khimar u više slojeva s valovitim rubovima, za potpunu pokrivenost.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Ne cijediti jako.']
    ],
    colors: palette(va, [
      ['Nijansa 16', '#dddde1'], ['Nijansa 17', '#e1d9cb'], ['Nijansa 18', '#eae0cf'], ['Nijansa 19', '#dec19f'], ['Nijansa 20', '#8cbd19'],
      ['Nijansa 21', '#e68baf'], ['Nijansa 22', '#b57b50'], ['Nijansa 23', '#ac8fd2'], ['Nijansa 24', '#0e99b5'], ['Nijansa 25', '#0463be'],
      ['Nijansa 26', '#4c2e68'], ['Nijansa 27', '#472d26'], ['Nijansa 28', '#f3a6a5'], ['Nijansa 29', '#ea7284'], ['Nijansa 30', '#03479e'],
      ['Nijansa 31', '#c00951'], ['Nijansa 32', '#f4c30e'], ['Nijansa 33', '#7b6634'], ['Nijansa 34', '#7b584b'], ['Nijansa 35', '#a10417'],
      ['Nijansa 36', '#047e4d'], ['Nijansa 37', '#e3e2e4'], ['Nijansa 38', '#4c183f'], ['Nijansa 40', '#a3a1a2'], ['Nijansa 41', '#8dbe1c'],
      ['Nijansa 42', '#bda0da'], ['Nijansa 43', '#d72273'], ['Nijansa 44', '#03638d'], ['Nijansa 123', '#ab050e'], ['Nijansa 124', '#67ade2'],
      ['Nijansa 125', '#f0470c'], ['Nijansa 126', '#f8b9a7'], ['Nijansa 127', '#9d0416'], ['Nijansa 128', '#f85e14'], ['Nijansa 129', '#f68d22'],
      ['Nijansa 130', '#7cd7c2'], ['Nijansa 132', '#dcc0ab'], ['Nijansa 133', '#dfc8b6'], ['Nijansa 134', '#8ac123'], ['Nijansa 135', '#e43049'],
      ['Nijansa 136', '#404034'], ['Nijansa 140', '#61265a'], ['Nijansa 141', '#175533'], ['Nijansa 142', '#f3a608'], ['Nijansa 143', '#e3dfe0'],
      ['Nijansa 144', '#e9dfc7'], ['Nijansa 145', '#ead9c5'], ['Nijansa 146', '#bca597'], ['Nijansa 147', '#7f5343'], ['Nijansa 148', '#d3b6a0'],
      ['Nijansa 149', '#85952e'], ['Nijansa 150', '#cd6465'], ['Nijansa 151', '#5a3325'], ['Nijansa 152', '#b47671'], ['Nijansa 153', '#7e7d4d'],
      ['Nijansa 154', '#9b6d70'], ['Nijansa 155', '#c1819b'], ['Nijansa 156', '#0468bd'], ['Nijansa 158', '#0639ab'], ['Nijansa 159', '#a78cd5'],
      ['Nijansa 160', '#823e9a'], ['Nijansa 161', '#e5e1e0'], ['Nijansa 162', '#f0debc'], ['Nijansa 163', '#b47771'], ['Nijansa 164', '#794a3d'],
      ['Nijansa 165', '#b38487'], ['Nijansa 166', '#889a73'], ['Nijansa 167', '#1f522f'], ['Nijansa 94', '#848388'], ['Nijansa 95', '#a8a6b2'],
      ['Nijansa 96', '#c49671'], ['Nijansa 97', '#1f5d69'], ['Nijansa 98', '#392d8e'], ['Nijansa 99', '#70236c'], ['Nijansa 100', '#f1b5c9'],
      ['Nijansa 101', '#f26b9d'], ['Nijansa 102', '#edd3b7'], ['Nijansa 103', '#902087'], ['Nijansa 104', '#1f324f'], ['Nijansa 106', '#7b7d86'],
      ['Nijansa 107', '#2a593e'], ['Nijansa 108', '#0a3f6a'], ['Nijansa 109', '#6c7c93'], ['Nijansa 110', '#cf2f71'], ['Nijansa 111', '#12abb8'],
      ['Nijansa 112', '#9fe5e7'], ['Nijansa 113', '#f5a3c1'], ['Nijansa 114', '#cca4b2'], ['Nijansa 115', '#d8aca5'], ['Nijansa 116', '#c7b5af'],
      ['Nijansa 117', '#c9b495'], ['Nijansa 118', '#3d2448'], ['Nijansa 119', '#374443'], ['Nijansa 120', '#dfd9c9'], ['Nijansa 122', '#056f86']
    ])
  },
  {
    slug: 'elise',
    name: 'Elise',
    type: 'Khimar',
    cat: 'khimari',
    lead: 'Elise je khimar od medinske svile s nježnim volanom po rubu. Mekan, mat i bogat pad tkanine s romantičnim detaljem — dostupan u 33 boje.',
    photos: [[`${el}/glavna.webp`, 'Elise khimar od medinske svile s volanom, prikaz sprijeda i straga']],
    recolor: {src: `${el}/glavna.webp`, mask: `${el}/maska.png`},
    showcase: [[`${el}/paleta.webp`, 'Paleta dostupnih boja za Elise khimar']],
    features: ['Medinska svila', 'Volan po rubu', 'Mat i mekan pad', '33 boje'],
    details: [
      ['Materijal', 'Medinska svila — mekana, mat tkanina koja lijepo pada i ne gužva se lako.'],
      ['Kroj', 'Khimar koji pokriva glavu i ramena, s naboranim volanom po cijelom rubu.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Peglati na niskoj temperaturi.']
    ],
    colors: palette(el, [
      ['Crna', '#181920'], ['Teget plava', '#0f1c49'], ['Plava', '#354d7d'], ['Kraljevsko plava', '#042e92'], ['Taupe', '#706262'],
      ['Antracit', '#3b3944'], ['Tamno siva', '#464450'], ['Siva', '#9c9aa0'], ['Crvena', '#b0112a'], ['Bordo', '#6e142d'],
      ['Višnja', '#44182c'], ['Patlidžan', '#2c1b2e'], ['Petrol plava', '#183846'], ['Maslinasta', '#40442c'], ['Tamno zelena', '#23392f'],
      ['Zelena', '#276260'], ['Tirkizna', '#508a8d'], ['Mint zelena', '#7bb6a9'], ['Kadulja zelena', '#717e6d'], ['Limeta', '#929b2d'],
      ['Ljubičasta', '#5b35a1'], ['Lavanda', '#725e98'], ['Svijetla ljubičasta', '#a98cc9'], ['Antik roza', '#9d626e'], ['Ružičasta', '#aa6b76'],
      ['Puder roza', '#dda6a9'], ['Bijela', '#e6e3e0'], ['Bež', '#b8a792'], ['Svijetla bež', '#d0b5a4'], ['Smeđa', '#9f7e6a'],
      ['Oker', '#ce8435'], ['Narandžasta', '#b94522'], ['Cigla crvena', '#862f2c']
    ])
  },
  {
    slug: 'elodie',
    name: 'Elodie',
    type: 'Komplet',
    cat: 'abaye',
    lead: 'Elodie je komplet od tunike i suknje od hurem štofa — široka tunika s velikim manžetama i džepovima, preko duge, bogate suknje. Elegantan, slojevit izgled uz potpunu udobnost, dostupan u 13 boja.',
    photos: [[`${eo}/maslinasta-1.webp`, 'Elodie komplet u maslinastoj boji, sjedeći'], [`${eo}/maslinasta-2.webp`, 'Elodie komplet u maslinastoj boji, detalj rukava'], [`${eo}/maslinasta-3.webp`, 'Elodie komplet u maslinastoj boji, stojeći']],
    // Boje bez vlastite fotografije: komplet (tunika i suknja) se boji na originalnoj fotografiji; marama ostaje originalna.
    recolor: {src: `${eo}/babyplava-1.webp`, mask: `${eo}/maska.png`},
    showcase: [[`${eo}/paleta.webp`, 'Paleta dostupnih boja za Elodie komplet']],
    features: ['Hurem štof', 'Tunika i suknja', 'Široke manžete i džepovi', '13 boja'],
    details: [
      ['Materijal', 'Hurem štof — mekan, mat i postojan materijal koji lijepo pada. Marama na fotografijama je od muslina.'],
      ['Komplet', 'Široka tunika s velikim manžetama i džepovima, i duga, bogata suknja.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Peglati na srednjoj temperaturi.']
    ],
    colors: palette(eo, [
      ['Bijela', '#e5e1de'], ['Svijetlosiva', '#beb2ac'], ['Bež', '#caa282'], ['Smeđa', '#43241c'], ['Crna', '#111113'],
      ['Baby roza', '#efb8b9'], ['Baby plava', '#bbcfea'], ['Tamnoplava', '#171d31'], ['Tamnozelena', '#0f403a'], ['Maslinasta', '#706c53'],
      ['Crvena', '#b40e1f'], ['Bordo', '#691424'], ['Narandžasta', '#ea661e']
    ]).map(c => ({...c, photos: {
      'Bijela': ['bijela-1', 'bijela-2'],
      'Svijetlosiva': ['svijetlosiva-1', 'svijetlosiva-2', 'svijetlosiva-3'],
      'Baby plava': ['babyplava-1', 'babyplava-2', 'babyplava-3'],
      'Maslinasta': ['maslinasta-1', 'maslinasta-2', 'maslinasta-3'],
      'Crvena': ['crvena-1', 'crvena-2'],
      'Narandžasta': ['narandzasta-1', 'narandzasta-2', 'narandzasta-3']
    }[c.name]?.map(n => `${eo}/${n}.webp`)}))
  },
  {
    slug: 'leya',
    name: 'Leya',
    type: 'Komplet',
    cat: 'abaye',
    lead: 'Leya je komplet od tunike i suknje od tanke viskozne pletenine s dosta elastina. Mekan, rastezljiv i lagan — široka tunika s balon rukavima i rebrastim manžetama, i suknja s elastičnim strukom za potpunu udobnost.',
    photos: [[`${ly}/krem-1.png`, 'Leya komplet u krem boji, cijeli prikaz'], [`${ly}/krem-2.webp`, 'Leya komplet u krem boji, tunika'], [`${ly}/krem-3.webp`, 'Leya komplet u krem boji, detalj rukava s etiketom'], [`${ly}/krem-4.webp`, 'Leya komplet u krem boji, elastični struk suknje']],
    // Boje bez fotografije: komplet se boji na originalnoj fotografiji (svijetlo siva); marama ostaje originalna.
    recolor: {src: `${ly}/svijetlosiva-1.webp`, mask: `${ly}/maska.png`},
    showcase: [[`${ly}/paleta.webp`, 'Paleta dostupnih boja za Leya komplet']],
    features: ['Viskozna pletenina s elastinom', 'Tunika i suknja', 'Elastični struk', '10 boja'],
    details: [
      ['Materijal', 'Tanka viskozna pletenina s dosta elastina — mekana, rastezljiva i prijatna na koži.'],
      ['Komplet', 'Široka tunika s balon rukavima i rebrastim manžetama, i duga suknja s elastičnim strukom.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Sušiti položeno.']
    ],
    colors: palette(ly, [
      ['Krem', '#e7e2db'], ['Svijetlo siva', '#c2c2c3'], ['Bež', '#b09e92'], ['Taupe', '#af9f96'], ['Mocca', '#8a7a72'],
      ['Crna melange', '#2a2a2a'], ['Crna', '#111113'], ['Pijesak', '#c4b7ad'], ['Siva', '#6b6c70'], ['Antracit', '#343435']
    ]).map(c => ({...c, photos: {
      'Krem': ['krem-1.png', 'krem-2.webp', 'krem-3.webp', 'krem-4.webp'],
      'Svijetlo siva': ['svijetlosiva-1.webp', 'svijetlosiva-2.webp', 'svijetlosiva-3.webp', 'svijetlosiva-4.webp'],
      'Mocca': ['mocca-1.webp', 'mocca-2.webp', 'mocca-3.webp', 'mocca-4.webp'],
      'Siva': ['siva-1.webp', 'siva-2.webp', 'siva-3.webp', 'siva-4.webp']
    }[c.name]?.map(n => `${ly}/${n}`)})),
    numbered: true
  },
  {
    slug: 'velora',
    name: 'Velora',
    type: 'Komplet',
    cat: 'abaye',
    lead: 'Velora je svečani komplet od poliestera bogatog, svilenkastog sjaja — dugi khimar, gornji dio s balon rukavima i naboranim manžetama te široka suknja koja lijepo pada. Dostupna u 29 nijansi.',
    photos: [[`${vl}/crvena.webp`, 'Velora komplet u crvenoj boji'], [`${vl}/roza.webp`, 'Velora komplet u roza boji'], [`${vl}/bijela.webp`, 'Velora komplet u bijeloj boji'], [`${vl}/babyplava.webp`, 'Velora komplet u baby plavoj boji'], [`${vl}/ljubicasta.webp`, 'Velora komplet u ljubičastoj boji']],
    // Nijanse bez fotografije se boje na originalnoj (ljubičastoj) fotografiji.
    recolor: {src: `${vl}/ljubicasta.webp`, mask: `${vl}/maska.png`},
    showcase: [[`${vl}/paleta.webp`, 'Paleta dostupnih nijansi za Velora komplet']],
    features: ['Poliester sa sjajem', 'Khimar u kompletu', 'Naborane manžete', '29 nijansi'],
    details: [
      ['Materijal', 'Poliester svilenkastog sjaja i fine teksture, lagan i otporan na gužvanje.'],
      ['Komplet', 'Dugi khimar, gornji dio s balon rukavima i naboranim manžetama te široka, duga suknja.'],
      ['Održavanje', 'Prati na 30°C, na programu za osjetljive tkanine. Peglati na niskoj temperaturi.']
    ],
    // Nijanse s pravom fotografijom (prema paleti: 01 bijela, 10 roza, 16 ljubičasta, 19 crvena, 29 baby plava).
    colors: palette(vl, [
      ['Nijansa 01', '#f2eee4'], ['Nijansa 02', '#bfb295'], ['Nijansa 03', '#b19d81'], ['Nijansa 04', '#8c756c'], ['Nijansa 05', '#0a0706'],
      ['Nijansa 06', '#935c3a'], ['Nijansa 07', '#583a37'], ['Nijansa 08', '#e1ac9c'], ['Nijansa 09', '#9e757f'], ['Nijansa 10', '#cca9bf'],
      ['Nijansa 11', '#a1a6a5'], ['Nijansa 12', '#b0b8b2'], ['Nijansa 13', '#8da4ac'], ['Nijansa 14', '#898a9b'], ['Nijansa 15', '#a698c3'],
      ['Nijansa 16', '#9570a2'], ['Nijansa 17', '#c74677'], ['Nijansa 18', '#741626'], ['Nijansa 19', '#bd1f26'], ['Nijansa 20', '#8a3b2f'],
      ['Nijansa 21', '#bac00e'], ['Nijansa 22', '#866723'], ['Nijansa 23', '#9ecd7b'], ['Nijansa 24', '#473824'], ['Nijansa 25', '#4f8898'],
      ['Nijansa 26', '#1a7aa8'], ['Nijansa 27', '#346ab0'], ['Nijansa 28', '#132ca2'], ['Nijansa 29', '#9fbae3']
    ]).map(c => {
      const f = {'Nijansa 01': 'bijela', 'Nijansa 10': 'roza', 'Nijansa 16': 'ljubicasta', 'Nijansa 19': 'crvena', 'Nijansa 29': 'babyplava'}[c.name];
      return f ? {...c, photo: `${vl}/${f}.webp`} : c;
    })
  },
  ...NOVI
];


export const getModel = slug => MODELI.find(m => m.slug === slug);
