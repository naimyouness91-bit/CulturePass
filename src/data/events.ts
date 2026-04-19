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
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  longDescription: string;
  longDescriptionAr?: string;
  culturalContext: string;
  culturalContextAr?: string;
  category: EventCategory;
  categoryAr?: string;
  date: string;
  endDate?: string;
  location: string;
  venue: string;
  venueAr?: string;
  lat: number;
  lng: number;
  image: string;
  price: string;
  capacity: number;
  registered: number;
  organizer: string;
  organizerAr?: string;
  featured?: boolean;
}

export const events: CultureEvent[] = [
  {
    id: "evt-001",
    title: "Festival National de Tbourida",
    titleAr: "مهرجان الطبوريدة الوطني",
    description:
      "Cavaliers et chevaux d'apparat livrent une démonstration spectaculaire de l'art équestre marocain.",
    descriptionAr:
      "فرسان وخيول مزينة يقدمون عرضًا مدهشًا لفن الفروسية المغربي.",
    longDescription:
      "Plus de douze sorbas venues de toutes les régions du Royaume se rassemblent à Mediouna pour trois jours de tbourida — l'art équestre inscrit au patrimoine immatériel de l'UNESCO. Costumes brodés, selles d'apparat et coups de baroud rythment cette célébration unique.",
    longDescriptionAr:
      "تجتمع أكثر من اثنتي عشرة سربًا من جميع مناطق المملكة في مديونة لثلاثة أيام من الطبوريدة — فن الفروسية المدرج في التراث الثقافي غير المادي لليونسكو. الأزياء المطرزة والأعناق المزخرفة وصيحات الفرح تميز هذا الاحتفال الفريد.",
    culturalContext:
      "La tbourida puise ses racines dans les traditions guerrières des tribus marocaines. Aujourd'hui, elle est célébrée comme un art vivant qui transmet de génération en génération le lien sacré entre le cavalier, son cheval et la terre.",
    culturalContextAr:
      "الطبوريدة تنبع من التقاليد القتالية للقبائل المغربية. اليوم تُحتفى بها كفن حي ينقل عبر الأجيال الرابط المقدس بين الفارس وفرسه والأرض.",
    category: "Heritage",
    date: "2025-06-12T15:00:00",
    endDate: "2025-06-14T19:00:00",
    location: "Mediouna",
    venue: "Hippodrome Royal",
    venueAr: "المضمار الملكي",
    lat: 33.4561,
    lng: -7.5106,
    image: tbouridaImg,
    price: "Free",
    capacity: 5000,
    registered: 2840,
    organizer: "Province de Mediouna",
    organizerAr: "جهة مديونة",
    featured: true,
  },
  {
    id: "evt-002",
    title: "Exposition des Produits du Terroir",
    titleAr: "معرض منتجات التراث",
    description:
      "Coopératives locales présentent huiles, miels et produits artisanaux dans un cadre festif.",
    descriptionAr:
      "تقدم تعاونيات محلية الزيوت والعسل والمنتجات الحرفية في جو احتفالي.",
    longDescription:
      "À l'occasion de la Fête du Trône, la Province de Mediouna organise la 26ème édition de l'exposition des produits du terroir. Découvrez le savoir-faire des coopératives féminines, dégustez l'huile d'argan et le miel de la région.",
    longDescriptionAr:
      "بمناسبة عيد العرش، تنظم جهة مديونة النسخة السادسة والعشرين من معرض منتجات التراث. اكتشفوا خبرة التعاونيات النسائية وتذوقوا زيت الأركان وعسل المنطقة.",
    culturalContext:
      "Cette exposition met à l'honneur l'économie solidaire et le rôle central des coopératives féminines dans la préservation des savoir-faire ancestraux du terroir marocain.",
    culturalContextAr:
      "يكرم هذا المعرض الاقتصاد التضامني والدور المحوري للتعاونيات النسائية في الحفاظ على الحرف التقليدية لمور المغرب.",
    category: "Exhibition",
    date: "2025-07-30T10:00:00",
    endDate: "2025-08-03T20:00:00",
    location: "Mediouna",
    venue: "Place du Méchouar",
    venueAr: "ساحة المشور",
    lat: 33.4598,
    lng: -7.515,
    image: exhibitionImg,
    price: "Free",
    capacity: 3000,
    registered: 1247,
    organizer: "Province de Mediouna",
    organizerAr: "جهة مديونة",
  },
  {
    id: "evt-003",
    title: "Inauguration du Boulevard Culturel",
    titleAr: "افتتاح شارع الثقافة",
    description:
      "Cérémonie officielle d'ouverture du nouveau boulevard reliant la médina au quartier culturel.",
    descriptionAr:
      "حفل رسمي لافتتاح شارع الثقافة الجديد الذي يربط المدينة القديمة بالحي الثقافي.",
    longDescription:
      "Une cérémonie officielle marque l'inauguration du nouveau boulevard culturel de Mediouna, en présence des autorités locales. L'événement sera suivi d'une visite guidée des nouveaux espaces publics et d'une animation musicale.",
    longDescriptionAr:
      "تحتفي السلطات المحلية بافتتاح شارع الثقافة الجديد في مديونة. يتضمن الحدث زيارة موجهة للمساحات العامة الجديدة وعروض موسيقية.",
    culturalContext:
      "Ce projet urbain réunit l'ancien et le moderne, en créant un axe culturel qui met en valeur les portes historiques de Mediouna tout en offrant aux habitants de nouveaux espaces de vie.",
    culturalContextAr:
      "يجمع هذا المشروع الحضري بين القديم والحديث، ويخلق محورًا ثقافيًا يسلط الضوء على أبواب مديونة التاريخية ويوفر مساحات جديدة للعيش.",
    category: "Community",
    date: "2025-05-20T10:00:00",
    location: "Mediouna",
    venue: "Boulevard Mohammed V",
    venueAr: "شارع محمد الخامس",
    lat: 33.453,
    lng: -7.508,
    image: inaugurationImg,
    price: "Free",
    capacity: 800,
    registered: 312,
    organizer: "Mairie de Mediouna",
    organizerAr: "بلدية مديونة",
  },
  {
    id: "evt-004",
    title: "Salon des Coopératives Féminines",
    titleAr: "معرض التعاونيات النسائية",
    description:
      "Rencontre dédiée aux coopératives portées par les femmes de la région de Mediouna.",
    descriptionAr:
      "لقاء مخصص للتعاونيات التي تديرها نساء منطقة مديونة.",
    longDescription:
      "Trois jours de rencontres, de dégustations et d'ateliers pour découvrir les coopératives féminines de Mediouna : couscous, semoules, plantes aromatiques, cosmétiques naturels. Une plateforme pour soutenir l'économie sociale locale.",
    longDescriptionAr:
      "ثلاثة أيام من اللقاءات والتذوق وورش العمل لاكتشاف التعاونيات النسائية في مديونة: الكسكس، السميد، النباتات العطرية، المستحضرات الطبيعية. منصة لدعم الاقتصاد الاجتماعي المحلي.",
    culturalContext:
      "Les coopératives féminines marocaines incarnent une révolution silencieuse : elles allient transmission des savoirs traditionnels, autonomie économique des femmes et développement durable des territoires.",
    culturalContextAr:
      "التعاونيات النسائية في المغرب تمثل ثورة صامتة تجمع بين نقل المعارف التقليدية، الاستقلال الاقتصادي للنساء والتنمية المستدامة للمناطق.",
    category: "Exhibition",
    date: "2025-06-05T09:00:00",
    endDate: "2025-06-07T19:00:00",
    location: "Mediouna",
    venue: "Centre des Coopératives",
    venueAr: "مركز التعاونيات",
    lat: 33.458,
    lng: -7.512,
    image: cooperativeImg,
    price: "Free",
    capacity: 1500,
    registered: 624,
    organizer: "Initiative Nationale pour le Développement Humain",
    organizerAr: "المبادرة الوطنية للتنمية البشرية",
  },
  {
    id: "evt-005",
    title: "Première Édition — Marché des Produits Locaux",
    titleAr: "النسخة الأولى — سوق المنتجات المحلية",
    description: "Un marché solidaire célébrant les produits et le savoir-faire de Mediouna.",
    descriptionAr: "سوق تضامني يحتفي بمنتجات وخبرة مديونة.",
    longDescription:
      "Sous le thème « Renforcer l'économie solidaire vers des coopératives durables et intelligentes », la Province organise une grande exposition rassemblant artisans, coopératives et producteurs de toute la région.",
    longDescriptionAr:
      "تحت شعار تعزيز الاقتصاد التضامني نحو تعاونيات مستدامة وذكية، تنظم الجهة معرضًا كبيرًا يجمع الحرفيين والتعاونيات والمنتجين من جميع أنحاء المنطقة.",
    culturalContext:
      "Ce marché s'inscrit dans une démarche de valorisation du patrimoine économique et culturel de Mediouna, à l'occasion de la commémoration de la Fête du Trône.",
    culturalContextAr:
      "يندرج هذا السوق في إطار تثمين التراث الاقتصادي والثقافي لمديونة، بمناسبة الاحتفال بعيد العرش.",
    category: "Festival",
    date: "2025-07-15T09:00:00",
    endDate: "2025-07-21T22:00:00",
    location: "Mediouna",
    venue: "Place El Mosalla",
    venueAr: "ساحة المصلى",
    lat: 33.45,
    lng: -7.505,
    image: posterImg,
    price: "Free",
    capacity: 4000,
    registered: 2103,
    organizer: "Province de Mediouna",
    organizerAr: "جهة مديونة",
  },
  {
    id: "evt-006",
    title: "Fresque Murale — Mémoires de Mediouna",
    titleAr: "جدارية — ذكريات مديونة",
    description:
      "Inauguration d'une fresque monumentale célébrant les figures et motifs de la culture locale.",
    descriptionAr:
      "افتتاح جدارية ضخمة تحتفي بالشخصيات والزخارف من الثقافة المحلية.",
    longDescription:
      "Une fresque de 200 mètres signée par un collectif d'artistes locaux a transformé l'enceinte de la médina en galerie à ciel ouvert. Visite guidée et rencontre avec les artistes au programme.",
    longDescriptionAr:
      "حوّلت جدارية طولها 200 متر من توقيع مجموعة من الفنانين المحليين أسوار المدينة القديمة إلى معرض في الهواء الطلق. تتضمن الفعالية جولة موجهة ولقاء مع الفنانين.",
    culturalContext:
      "L'art mural est devenu à Mediouna un langage pour raconter la mémoire collective : motifs zellige, portraits de femmes, calligraphie arabe et bleu majorelle dialoguent sur les remparts.",
    culturalContextAr:
      "أصبح الفن الجداري في مديونة لغة لسرد الذاكرة الجماعية: زخارف الزليج، صور النساء، الخط العربي والأزرق الماجوريل تتحدث على الأسوار.",
    category: "Exhibition",
    date: "2025-05-25T17:00:00",
    location: "Mediouna",
    venue: "Remparts de la Médina",
    venueAr: "أسوار المدينة القديمة",
    lat: 33.457,
    lng: -7.51,
    image: muralImg,
    price: "Free",
    capacity: 600,
    registered: 198,
    organizer: "Collectif Bleu Majorelle",
    organizerAr: "تجمع بلو ماجوريل",
  },
  {
    id: "evt-007",
    title: "Soirée Gnawa au Riad El Andalous",
    titleAr: "أمسية غناوة في رياض الأندلس",
    description: "Une lila intime menée par Maâlem Hassan dans un riad historique.",
    descriptionAr: "ليلة غناوة حميمة بقيادة المعلّم حسن في رياض تاريخي.",
    longDescription:
      "Maâlem Hassan et son ensemble offrent une lila gnawa dans la cour d'un riad de la médina. Une plongée hypnotique dans l'une des musiques les plus spirituelles du Maroc.",
    longDescriptionAr:
      "يقدم المعلّم حسن وفرقه ليلة غناوة في فناء رياض المدينة القديمة. تجربة من الغوص الروحي في واحدة من أكثر الموسيقى المغربية تقديسًا.",
    culturalContext:
      "La musique gnawa, héritage des populations subsahariennes installées au Maroc, est une pratique musicale et spirituelle reconnue par l'UNESCO depuis 2019.",
    culturalContextAr:
      "موسيقى الغناوة، تراث السكان السودانيين الذين استقروا في المغرب، هي ممارسة موسيقية وروحية معترف بها من اليونسكو منذ 2019.",
    category: "Music",
    date: "2025-05-22T20:30:00",
    location: "Mediouna",
    venue: "Riad El Andalous",
    venueAr: "رياض الأندلس",
    lat: 33.4598,
    lng: -7.515,
    image: musicImg,
    price: "80 MAD",
    capacity: 120,
    registered: 89,
    organizer: "Association Sawt El Madina",
    organizerAr: "جمعية صوت المدينة",
  },
  {
    id: "evt-008",
    title: "Théâtre — Les Voix du Sud",
    titleAr: "مسرحية — أصوات الجنوب",
    description: "Pièce contemporaine bilingue sur la mémoire et les femmes de l'Atlas.",
    descriptionAr: "مسرحية معاصرة ثنائية اللغة عن الذاكرة ونساء الأطلس.",
    longDescription:
      "Trois actrices tissent un récit lumineux à partir d'histoires orales recueillies dans l'Atlas. Pièce en darija et français, surtitrée.",
    longDescriptionAr:
      "تحيك ثلاث ممثلات قصة مضيئة من الحكايات الشفوية المجمعة في الأطلس. مسرحية بالدارجة والفرنسية مع ترجمة نصية.",
    culturalContext:
      "Le théâtre marocain a longtemps été un espace où dialectes, langues et histoires silencieuses se rencontrent.",
    culturalContextAr:
      "لطالما كان المسرح المغربي مساحة تلتقي فيها اللهجات واللغات والقصص الصامتة.",
    category: "Theatre",
    date: "2025-05-30T19:30:00",
    location: "Mediouna",
    venue: "Théâtre Municipal",
    venueAr: "المسرح البلدي",
    lat: 33.4555,
    lng: -7.509,
    image: theatreImg,
    price: "60 MAD",
    capacity: 280,
    registered: 152,
    organizer: "Compagnie Nour",
    organizerAr: "فرقة نور",
  },
  {
    id: "evt-009",
    title: "Nuit de la Poésie",
    titleAr: "ليلة الشعر",
    description: "Lectures poétiques en arabe, tamazight et français accompagnées d'oud.",
    descriptionAr: "قراءات شعرية بالعربية، الأمازيغية، والفرنسية مصحوبة بعزف العود.",
    longDescription:
      "Sept poètes partagent leurs nouveaux textes en trois langues, accompagnés de calligraphie en direct et d'un solo d'oud.",
    longDescriptionAr:
      "يشارك سبعة شعراء نصوصهم الجديدة بثلاث لغات، مع خطوط مباشرة وعزف منفرد على العود.",
    culturalContext:
      "La poésie est au cœur de la vie culturelle marocaine depuis plus de mille ans, du zajal andalou aux voix contemporaines.",
    culturalContextAr:
      "الشعر في قلب الحياة الثقافية المغربية منذ أكثر من ألف عام، من الزجل الأندلسي إلى الأصوات المعاصرة.",
    category: "Poetry",
    date: "2025-06-02T19:00:00",
    location: "Mediouna",
    venue: "Bibliothèque Al Manar",
    venueAr: "مكتبة المنار",
    lat: 33.454,
    lng: -7.514,
    image: poetryImg,
    price: "Free",
    capacity: 80,
    registered: 41,
    organizer: "Cercle Littéraire Al Manar",
    organizerAr: "الدائرة الأدبية المنار",
  },
];

export const categories: { name: EventCategory; icon: string; labelFr: string; labelAr: string }[] = [
  { name: "Music", icon: "Music2", labelFr: "Musique", labelAr: "موسيقى" },
  { name: "Theatre", icon: "Drama", labelFr: "Théâtre", labelAr: "مسرح" },
  { name: "Festival", icon: "PartyPopper", labelFr: "Festival", labelAr: "مهرجان" },
  { name: "Community", icon: "Users", labelFr: "Communauté", labelAr: "مجتمع" },
  { name: "Heritage", icon: "Landmark", labelFr: "Patrimoine", labelAr: "تراث" },
  { name: "Exhibition", icon: "Palette", labelFr: "Exposition", labelAr: "معرض" },
  { name: "Poetry", icon: "BookOpen", labelFr: "Poésie", labelAr: "شعر" },
];

export const getEventById = (id: string) => events.find((e) => e.id === id);
export const featuredEvent = events.find((e) => e.featured) ?? events[0];
