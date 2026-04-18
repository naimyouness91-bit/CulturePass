import tbouridaImg from "@/assets/upload-tbourida.png";
import exhibitionImg from "@/assets/upload-exhibition.png";
import inaugurationImg from "@/assets/upload-inauguration.png";
import cooperativeImg from "@/assets/upload-cooperative.png";
import posterImg from "@/assets/upload-poster.png";
import muralImg from "@/assets/upload-mural.png";
import musicImg from "@/assets/event-music.jpg";
import theatreImg from "@/assets/event-theatre.jpg";
import poetryImg from "@/assets/event-poetry.jpg";

export const HERO_IMAGE = muralImg;
export const TBOURIDA_IMAGE = tbouridaImg;

export type EventCategory =
  | "Music"
  | "Theatre"
  | "Festival"
  | "Community"
  | "Heritage"
  | "Exhibition"
  | "Poetry";

export interface CultureEvent {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  culturalContext: string;
  category: EventCategory;
  date: string;
  endDate?: string;
  location: string;
  venue: string;
  lat: number;
  lng: number;
  image: string;
  price: string;
  capacity: number;
  registered: number;
  organizer: string;
  featured?: boolean;
}

export const events: CultureEvent[] = [
  {
    id: "evt-001",
    title: "Festival National de Tbourida",
    description:
      "Cavaliers et chevaux d'apparat livrent une démonstration spectaculaire de l'art équestre marocain.",
    longDescription:
      "Plus de douze sorbas venues de toutes les régions du Royaume se rassemblent à Mediouna pour trois jours de tbourida — l'art équestre inscrit au patrimoine immatériel de l'UNESCO. Costumes brodés, selles d'apparat et coups de baroud rythment cette célébration unique.",
    culturalContext:
      "La tbourida puise ses racines dans les traditions guerrières des tribus marocaines. Aujourd'hui, elle est célébrée comme un art vivant qui transmet de génération en génération le lien sacré entre le cavalier, son cheval et la terre.",
    category: "Heritage",
    date: "2025-06-12T15:00:00",
    endDate: "2025-06-14T19:00:00",
    location: "Mediouna",
    venue: "Hippodrome Royal",
    lat: 33.4561,
    lng: -7.5106,
    image: tbouridaImg,
    price: "Free",
    capacity: 5000,
    registered: 2840,
    organizer: "Province de Mediouna",
    featured: true,
  },
  {
    id: "evt-002",
    title: "Exposition des Produits du Terroir",
    description:
      "Coopératives locales présentent huiles, miels et produits artisanaux dans un cadre festif.",
    longDescription:
      "À l'occasion de la Fête du Trône, la Province de Mediouna organise la 26ème édition de l'exposition des produits du terroir. Découvrez le savoir-faire des coopératives féminines, dégustez l'huile d'argan et le miel de la région.",
    culturalContext:
      "Cette exposition met à l'honneur l'économie solidaire et le rôle central des coopératives féminines dans la préservation des savoir-faire ancestraux du terroir marocain.",
    category: "Exhibition",
    date: "2025-07-30T10:00:00",
    endDate: "2025-08-03T20:00:00",
    location: "Mediouna",
    venue: "Place du Méchouar",
    lat: 33.4598,
    lng: -7.515,
    image: exhibitionImg,
    price: "Free",
    capacity: 3000,
    registered: 1247,
    organizer: "Province de Mediouna",
  },
  {
    id: "evt-003",
    title: "Inauguration du Boulevard Culturel",
    description:
      "Cérémonie officielle d'ouverture du nouveau boulevard reliant la médina au quartier culturel.",
    longDescription:
      "Une cérémonie officielle marque l'inauguration du nouveau boulevard culturel de Mediouna, en présence des autorités locales. L'événement sera suivi d'une visite guidée des nouveaux espaces publics et d'une animation musicale.",
    culturalContext:
      "Ce projet urbain réunit l'ancien et le moderne, en créant un axe culturel qui met en valeur les portes historiques de Mediouna tout en offrant aux habitants de nouveaux espaces de vie.",
    category: "Community",
    date: "2025-05-20T10:00:00",
    location: "Mediouna",
    venue: "Boulevard Mohammed V",
    lat: 33.453,
    lng: -7.508,
    image: inaugurationImg,
    price: "Free",
    capacity: 800,
    registered: 312,
    organizer: "Mairie de Mediouna",
  },
  {
    id: "evt-004",
    title: "Salon des Coopératives Féminines",
    description:
      "Rencontre dédiée aux coopératives portées par les femmes de la région de Mediouna.",
    longDescription:
      "Trois jours de rencontres, de dégustations et d'ateliers pour découvrir les coopératives féminines de Mediouna : couscous, semoules, plantes aromatiques, cosmétiques naturels. Une plateforme pour soutenir l'économie sociale locale.",
    culturalContext:
      "Les coopératives féminines marocaines incarnent une révolution silencieuse : elles allient transmission des savoirs traditionnels, autonomie économique des femmes et développement durable des territoires.",
    category: "Exhibition",
    date: "2025-06-05T09:00:00",
    endDate: "2025-06-07T19:00:00",
    location: "Mediouna",
    venue: "Centre des Coopératives",
    lat: 33.458,
    lng: -7.512,
    image: cooperativeImg,
    price: "Free",
    capacity: 1500,
    registered: 624,
    organizer: "Initiative Nationale pour le Développement Humain",
  },
  {
    id: "evt-005",
    title: "Première Édition — Marché des Produits Locaux",
    description: "Un marché solidaire célébrant les produits et le savoir-faire de Mediouna.",
    longDescription:
      "Sous le thème « Renforcer l'économie solidaire vers des coopératives durables et intelligentes », la Province organise une grande exposition rassemblant artisans, coopératives et producteurs de toute la région.",
    culturalContext:
      "Ce marché s'inscrit dans une démarche de valorisation du patrimoine économique et culturel de Mediouna, à l'occasion de la commémoration de la Fête du Trône.",
    category: "Festival",
    date: "2025-07-15T09:00:00",
    endDate: "2025-07-21T22:00:00",
    location: "Mediouna",
    venue: "Place El Mosalla",
    lat: 33.45,
    lng: -7.505,
    image: posterImg,
    price: "Free",
    capacity: 4000,
    registered: 2103,
    organizer: "Province de Mediouna",
  },
  {
    id: "evt-006",
    title: "Fresque Murale — Mémoires de Mediouna",
    description:
      "Inauguration d'une fresque monumentale célébrant les figures et motifs de la culture locale.",
    longDescription:
      "Une fresque de 200 mètres signée par un collectif d'artistes locaux a transformé l'enceinte de la médina en galerie à ciel ouvert. Visite guidée et rencontre avec les artistes au programme.",
    culturalContext:
      "L'art mural est devenu à Mediouna un langage pour raconter la mémoire collective : motifs zellige, portraits de femmes, calligraphie arabe et bleu majorelle dialoguent sur les remparts.",
    category: "Exhibition",
    date: "2025-05-25T17:00:00",
    location: "Mediouna",
    venue: "Remparts de la Médina",
    lat: 33.457,
    lng: -7.51,
    image: muralImg,
    price: "Free",
    capacity: 600,
    registered: 198,
    organizer: "Collectif Bleu Majorelle",
  },
  {
    id: "evt-007",
    title: "Soirée Gnawa au Riad El Andalous",
    description: "Une lila intime menée par Maâlem Hassan dans un riad historique.",
    longDescription:
      "Maâlem Hassan et son ensemble offrent une lila gnawa dans la cour d'un riad de la médina. Une plongée hypnotique dans l'une des musiques les plus spirituelles du Maroc.",
    culturalContext:
      "La musique gnawa, héritage des populations subsahariennes installées au Maroc, est une pratique musicale et spirituelle reconnue par l'UNESCO depuis 2019.",
    category: "Music",
    date: "2025-05-22T20:30:00",
    location: "Mediouna",
    venue: "Riad El Andalous",
    lat: 33.4598,
    lng: -7.515,
    image: musicImg,
    price: "80 MAD",
    capacity: 120,
    registered: 89,
    organizer: "Association Sawt El Madina",
  },
  {
    id: "evt-008",
    title: "Théâtre — Les Voix du Sud",
    description: "Pièce contemporaine bilingue sur la mémoire et les femmes de l'Atlas.",
    longDescription:
      "Trois actrices tissent un récit lumineux à partir d'histoires orales recueillies dans l'Atlas. Pièce en darija et français, surtitrée.",
    culturalContext:
      "Le théâtre marocain a longtemps été un espace où dialectes, langues et histoires silencieuses se rencontrent.",
    category: "Theatre",
    date: "2025-05-30T19:30:00",
    location: "Mediouna",
    venue: "Théâtre Municipal",
    lat: 33.4555,
    lng: -7.509,
    image: theatreImg,
    price: "60 MAD",
    capacity: 280,
    registered: 152,
    organizer: "Compagnie Nour",
  },
  {
    id: "evt-009",
    title: "Nuit de la Poésie",
    description: "Lectures poétiques en arabe, tamazight et français accompagnées d'oud.",
    longDescription:
      "Sept poètes partagent leurs nouveaux textes en trois langues, accompagnés de calligraphie en direct et d'un solo d'oud.",
    culturalContext:
      "La poésie est au cœur de la vie culturelle marocaine depuis plus de mille ans, du zajal andalou aux voix contemporaines.",
    category: "Poetry",
    date: "2025-06-02T19:00:00",
    location: "Mediouna",
    venue: "Bibliothèque Al Manar",
    lat: 33.454,
    lng: -7.514,
    image: poetryImg,
    price: "Free",
    capacity: 80,
    registered: 41,
    organizer: "Cercle Littéraire Al Manar",
  },
];

export const categories: { name: EventCategory; icon: string }[] = [
  { name: "Music", icon: "Music2" },
  { name: "Theatre", icon: "Drama" },
  { name: "Festival", icon: "PartyPopper" },
  { name: "Community", icon: "Users" },
  { name: "Heritage", icon: "Landmark" },
  { name: "Exhibition", icon: "Palette" },
  { name: "Poetry", icon: "BookOpen" },
];

export const getEventById = (id: string) => events.find((e) => e.id === id);
export const featuredEvent = events.find((e) => e.featured) ?? events[0];
