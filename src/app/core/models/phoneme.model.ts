export type PhonemeCategory = 'Voyelle orale' | 'Voyelle nasale' | 'Consonne' | 'Semi-voyelle';

export interface PhonemeInfo {
  symbol: string;
  category: PhonemeCategory;
  example: string;
  exampleWord: string;
  sound: string;
  image: string;
}

export const FRENCH_ALPHABET: PhonemeInfo[] = [
  // Voyelles orales
  {
    symbol: 'a',
    category: 'Voyelle orale',
    example: 'rat',
    exampleWord: 'a',
    sound: 'a',
    image: 'rat.png',
  },
  {
    symbol: 'e',
    category: 'Voyelle orale',
    example: 'épée',
    exampleWord: 'é',
    sound: 'é',
    image: 'epee.png',
  },
  {
    symbol: 'i',
    category: 'Voyelle orale',
    example: 'île',
    exampleWord: 'i',
    sound: 'i',
    image: 'ile.png',
  },
  {
    symbol: 'o',
    category: 'Voyelle orale',
    example: 'eau',
    exampleWord: 'o / eau',
    sound: 'o',
    image: 'eau.png',
  },
  {
    symbol: 'u',
    category: 'Voyelle orale',
    example: 'ours',
    exampleWord: 'ou',
    sound: 'ou',
    image: 'ours.png',
  },
  {
    symbol: 'y',
    category: 'Voyelle orale',
    example: 'usine',
    exampleWord: 'u',
    sound: 'u',
    image: 'usine.png',
  },
  {
    symbol: 'ə',
    category: 'Voyelle orale',
    example: 'œuf',
    exampleWord: 'e',
    sound: 'euh',
    image: 'oeuf frit.png',
  },

  // Voyelles nasales
  {
    symbol: 'ɑ̃',
    category: 'Voyelle nasale',
    example: 'âne',
    exampleWord: 'an / en',
    sound: 'en',
    image: 'ane.png',
  },
  {
    symbol: 'ɛ̃',
    category: 'Voyelle nasale',
    example: 'insecte',
    exampleWord: 'in / ain',
    sound: 'in',
    image: 'insecte.png',
  },
  {
    symbol: 'ɔ̃',
    category: 'Voyelle nasale',
    example: 'oignon',
    exampleWord: 'on',
    sound: 'on',
    image: 'oignon rouge.png',
  },

  // Consonnes
  // Note: On ajoute un 'e' caduc pour que le moteur prononce le son et non le nom de la lettre
  {
    symbol: 'p',
    category: 'Consonne',
    example: 'paille',
    exampleWord: 'p',
    sound: 'p',
    image: 'paille.png',
  },
  {
    symbol: 'b',
    category: 'Consonne',
    example: 'bébé',
    exampleWord: 'b',
    sound: 'b',
    image: 'bebe.png',
  },
  {
    symbol: 't',
    category: 'Consonne',
    example: 'télé',
    exampleWord: 't',
    sound: 't',
    image: 'tele.png',
  },
  {
    symbol: 'd',
    category: 'Consonne',
    example: 'dent',
    exampleWord: 'd',
    sound: 'd',
    image: 'dent.png',
  },
  {
    symbol: 'k',
    category: 'Consonne',
    example: 'cœur',
    exampleWord: 'c',
    sound: 'k',
    image: 'coeur.png',
  },
  {
    symbol: 'g',
    category: 'Consonne',
    example: 'gâteau',
    exampleWord: 'g',
    sound: 'gueuh',
    image: 'gateau.png',
  },
  {
    symbol: 'f',
    category: 'Consonne',
    example: 'feu',
    exampleWord: 'f',
    sound: 'f',
    image: 'feu.png',
  },
  {
    symbol: 'v',
    category: 'Consonne',
    example: 'verre',
    exampleWord: 'v',
    sound: 'v',
    image: 'verre.png',
  },
  {
    symbol: 's',
    category: 'Consonne',
    example: 'soleil',
    exampleWord: 's',
    sound: 's',
    image: 'soleil.png',
  },
  {
    symbol: 'z',
    category: 'Consonne',
    example: 'zèbre',
    exampleWord: 'z',
    sound: 'z',
    image: 'zebre.png',
  },
  {
    symbol: 'ʃ',
    category: 'Consonne',
    example: 'chat',
    exampleWord: 'ch',
    sound: 'che',
    image: 'chat.png',
  },
  {
    symbol: 'ʒ',
    category: 'Consonne',
    example: 'jaune',
    exampleWord: 'j',
    sound: 'j',
    image: 'jaune.png',
  },
  {
    symbol: 'm',
    category: 'Consonne',
    example: 'main',
    exampleWord: 'm',
    sound: 'm',
    image: 'main.png',
  },
  {
    symbol: 'n',
    category: 'Consonne',
    example: 'nez',
    exampleWord: 'n',
    sound: 'n',
    image: 'nez.png',
  },
  {
    symbol: 'ɲ',
    category: 'Consonne',
    example: 'peigne',
    exampleWord: 'gn',
    sound: 'gne',
    image: 'peigne.png',
  },
  {
    symbol: 'ŋ',
    category: 'Consonne',
    example: 'parking',
    exampleWord: 'ng',
    sound: 'ngue',
    image: 'parking.png',
  },
  {
    symbol: 'l',
    category: 'Consonne',
    example: 'lit',
    exampleWord: 'l',
    sound: 'l',
    image: 'lit.png',
  },
  {
    symbol: 'ʁ',
    category: 'Consonne',
    example: 'roue',
    exampleWord: 'r',
    sound: 'r',
    image: 'roue.png',
  },

  // Semi-voyelles
  {
    symbol: 'j',
    category: 'Semi-voyelle',
    example: 'yaourt',
    exampleWord: 'y',
    sound: 'ille',
    image: 'yaourt.png',
  },
  {
    symbol: 'w',
    category: 'Semi-voyelle',
    example: 'oiseau',
    exampleWord: 'ou',
    sound: 'oué',
    image: 'oiseau.png',
  },
  {
    symbol: 'ɥ',
    category: 'Semi-voyelle',
    example: 'huit',
    exampleWord: 'u',
    sound: 'ui',
    image: 'huit.png',
  },
];

export const PHONEME_GROUPS: { label: string; category: PhonemeCategory }[] = [
  { label: 'Voyelles orales', category: 'Voyelle orale' },
  { label: 'Voyelles nasales', category: 'Voyelle nasale' },
  { label: 'Consonnes', category: 'Consonne' },
  { label: 'Semi-voyelles', category: 'Semi-voyelle' },
];
