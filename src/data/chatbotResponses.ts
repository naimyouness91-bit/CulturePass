export type Language = "FR" | "AR";

export interface ChatbotResponse {
  keywords: string[];
  responses: Record<Language, string>;
  category: "features" | "events" | "booking" | "technical" | "general";
}

export const chatbotResponses: ChatbotResponse[] = [
  // Features
  {
    keywords: ["what can i do", "features", "what does this app do", "capabilities", "ماذا يمكنني", "ميزات", "مميزات"],
    responses: {
      FR: "CulturePass est une plateforme pour découvrir et réserver des événements culturels à Mediouna. Vous pouvez consulter les événements sur une carte, les voir dans un calendrier, rechercher par catégorie et faire des réservations. Nous offrons également des recommandations personnalisées.",
      AR: "CulturePass هي منصة لاكتشاف وحجز الأحداث الثقافية في مديونة. يمكنك عرض الأحداث على خريطة، رؤيتها في تقويم، البحث حسب الفئة وإجراء الحجوزات. نحن نقدم أيضاً توصيات مخصصة.",
    },
    category: "features",
  },
  {
    keywords: ["how do i search", "search events", "find event", "كيف ابحث", "البحث عن"],
    responses: {
      FR: "Vous pouvez rechercher des événements en utilisant la barre de recherche sur la page d'accueil. Filtrez par lieu, type d'événement et date. Vous pouvez également consulter les événements par catégorie ou les visualiser sur la carte interactive.",
      AR: "يمكنك البحث عن الأحداث باستخدام شريط البحث على الصفحة الرئيسية. قم بالتصفية حسب الموقع ونوع الحدث والتاريخ. يمكنك أيضاً عرض الأحداث حسب الفئة أو مشاهدتها على الخريطة التفاعلية.",
    },
    category: "features",
  },
  {
    keywords: ["map", "interactive map", "where are events", "خريطة", "الخريطة"],
    responses: {
      FR: "La page Carte affiche tous les événements à venir à Mediouna sur une carte interactive. Cliquez sur n'importe quel épingle d'événement pour voir les détails et faire une réservation. Vous pouvez zoomer et vous déplacer.",
      AR: "تعرض صفحة الخريطة جميع الأحداث القادمة في مديونة على خريطة تفاعلية. انقر على أي دبوس حدث لرؤية التفاصيل والقيام بحجز. يمكنك التكبير والتنقل حول الخريطة.",
    },
    category: "features",
  },
  {
    keywords: ["calendar", "when", "schedule", "view calendar", "التقويم", "موعد"],
    responses: {
      FR: "La page Calendrier affiche tous les événements organisés par date. Vous pouvez naviguer entre les mois, voir les événements de chaque jour et voir les détails en cliquant sur une date.",
      AR: "تعرض صفحة التقويم جميع الأحداث مرتبة حسب التاريخ. يمكنك التنقل بين الأشهر، عرض الأحداث لكل يوم ورؤية التفاصيل بالنقر على تاريخ.",
    },
    category: "features",
  },
  {
    keywords: ["dashboard", "my bookings", "reservations", "my tickets", "حجوزاتي", "تذاكري"],
    responses: {
      FR: "Votre Tableau de bord affiche toutes vos réservations et vos billets. Vous pouvez voir les détails, votre code QR pour l'entrée et gérer vos événements à venir.",
      AR: "لوحة تحكمك تعرض جميع حجوزاتك وتذاكرك. يمكنك رؤية التفاصيل، رمز QR الخاص بك للدخول وإدارة الأحداث القادمة.",
    },
    category: "booking",
  },

  // Events and Categories
  {
    keywords: ["what events are available", "types of events", "categories", "أنواع الأحداث", "فئات"],
    responses: {
      FR: "Nous accueillons diverses manifestations culturelles : musique traditionnelle (gnawa), théâtre, festivals, spectacles de danse, ateliers et rassemblements communautaires. Chaque événement célèbre le riche patrimoine culturel de Mediouna.",
      AR: "نستضيف أحداثاً ثقافية متنوعة: الموسيقى التقليدية (غناوة)، المسرح، المهرجانات، عروض الرقص والورش وتجمعات المجتمع. كل حدث يحتفي بالتراث الثقافي الغني لمديونة.",
    },
    category: "events",
  },
  {
    keywords: ["music", "gnawa", "theatre", "festival", "dance", "workshop", "موسيقى", "مسرح", "مهرجان"],
    responses: {
      FR: "Nous accueillons des événements culturels diversifiés : nuits gnawa traditionnelles, théâtre contemporain, festivals culturels, spectacles de danse et ateliers créatifs. Consultez notre calendrier ou notre carte pour trouver les événements à venir.",
      AR: "نستضيف أحداثاً ثقافية متنوعة: ليالي غناوة تقليدية، مسرح معاصر، مهرجانات ثقافية، عروض رقص وورش إبداعية. تحقق من تقويمنا أو خريطتنا للعثور على الأحداث القادمة.",
    },
    category: "events",
  },
  {
    keywords: ["how to book", "reserve", "make reservation", "ticket", "كيفية الحجز", "احجز"],
    responses: {
      FR: "Pour réserver un événement : 1) Trouvez l'événement qui vous intéresse, 2) Cliquez sur 'Réserver une place', 3) Connectez-vous ou créez un compte, 4) Confirmez votre réservation. Vous recevrez un code QR qui sert de billet.",
      AR: "لحجز حدث: 1) ابحث عن الحدث الذي يثير اهتمامك، 2) انقر على 'احجز مقعداً'، 3) قم بتسجيل الدخول أو إنشاء حساب، 4) أكد حجزك. ستتلقى رمز QR يخدم كتذكرة.",
    },
    category: "booking",
  },

  // Account and Auth
  {
    keywords: ["sign up", "create account", "register", "new user", "إنشاء حساب", "تسجيل جديد"],
    responses: {
      FR: "Cliquez sur 'Créer un Compte' dans la barre de navigation. Entrez votre email et mot de passe pour vous inscrire. Vous pourrez ensuite vous connecter pour faire des réservations.",
      AR: "انقر على 'إنشاء حساب' في شريط التنقل. أدخل بريدك الإلكتروني وكلمة المرور للتسجيل. يمكنك بعد ذلك تسجيل الدخول لإجراء الحجوزات.",
    },
    category: "technical",
  },
  {
    keywords: ["sign in", "log in", "login", "sign into account", "تسجيل الدخول", "دخول"],
    responses: {
      FR: "Cliquez sur 'Se Connecter' dans la barre de navigation et entrez votre email et mot de passe. Si vous n'avez pas de compte, cliquez sur 'Créer un Compte'.",
      AR: "انقر على 'تسجيل الدخول' في شريط التنقل وأدخل بريدك الإلكتروني وكلمة المرور. إذا لم يكن لديك حساب، انقر على 'إنشاء حساب'.",
    },
    category: "technical",
  },
  {
    keywords: ["forget password", "reset password", "lost password", "نسيت كلمة", "استرجاع كلمة"],
    responses: {
      FR: "Si vous avez oublié votre mot de passe, veuillez contacter notre équipe d'assistance à contact@culturepass.com. Nous vous aiderons à retrouver l'accès à votre compte.",
      AR: "إذا نسيت كلمة المرور، يرجى الاتصال بفريق الدعم لدينا على contact@culturepass.com. سنساعدك على استرجاع الوصول إلى حسابك.",
    },
    category: "technical",
  },

  // Language and Settings
  {
    keywords: ["language", "français", "arabic", "العربية", "change language", "تغيير اللغة"],
    responses: {
      FR: "Vous pouvez changer la langue en utilisant le commutateur de langue dans la barre de navigation. Nous supportons le Français et l'Arabe. Votre préférence sera sauvegardée.",
      AR: "يمكنك تغيير اللغة باستخدام مبدل اللغة في شريط التنقل. نحن ندعم الفرنسية والعربية. سيتم حفظ تفضيلك.",
    },
    category: "technical",
  },

  // General Help
  {
    keywords: ["help", "need help", "support", "contact", "problem", "ساعدني", "مساعدة", "مشكلة"],
    responses: {
      FR: "Nous sommes là pour vous aider ! Pour les demandes de soutien, veuillez nous contacter à contact@culturepass.com ou visitez notre section communauté.",
      AR: "نحن هنا لمساعدتك! للحصول على دعم، يرجى الاتصال بنا على contact@culturepass.com أو زيارة قسم المجتمع.",
    },
    category: "general",
  },
  {
    keywords: ["about", "mediouna", "who are you", "what is culturepass", "عن", "مديونة", "من أنت"],
    responses: {
      FR: "CulturePass est une plateforme numérique dédiée à la promotion et à la célébration du riche patrimoine culturel de Mediouna. Nous connectons les résidents et les visiteurs aux événements culturels.",
      AR: "CulturePass هي منصة رقمية مكرسة لتعزيز والاحتفاء بالتراث الثقافي الغني لمديونة. نحن نربط السكان والزوار بالأحداث الثقافية.",
    },
    category: "general",
  },
  {
    keywords: ["mediouna", "city", "culture", "heritage", "ثقافة", "تراث"],
    responses: {
      FR: "Mediouna est une ville dynamique au Maroc avec un riche patrimoine culturel. CulturePass célèbre ce patrimoine en connectant les gens aux événements culturels.",
      AR: "مديونة هي مدينة نابضة بالحياة في المغرب بتراث ثقافي غني. CulturePass يحتفي بهذا التراث بربط الناس بالأحداث الثقافية.",
    },
    category: "general",
  },

  // Payment and Pricing
  {
    keywords: ["price", "cost", "free", "payment", "how much", "سعر", "تكلفة", "السعر"],
    responses: {
      FR: "Les prix des événements varient selon le type et l'ampleur de l'événement. Vous verrez le prix en visualisant les détails de l'événement. Nous acceptons divers modes de paiement.",
      AR: "تختلف أسعار الأحداث حسب نوع الحدث وحجمه. سترى السعر عند عرض تفاصيل الحدث. نحن نقبل طرق دفع مختلفة.",
    },
    category: "booking",
  },

  // Venue and Location
  {
    keywords: ["where is", "venue", "location", "address", "أين", "الموقع", "العنوان"],
    responses: {
      FR: "Les événements sont organisés dans divers lieux à Mediouna. Chaque événement affiche le lieu et la localisation spécifiques. Vous pouvez voir tous les lieux sur notre carte interactive.",
      AR: "تُقام الأحداث في أماكن مختلفة في جميع أنحاء مديونة. يعرض كل حدث الموقع والعنوان المحدد. يمكنك عرض جميع الأماكن على خريطتنا التفاعلية.",
    },
    category: "events",
  },

  // Attendees and Social
  {
    keywords: ["how many people", "attendees", "going", "social", "كم شخص", "الحضور"],
    responses: {
      FR: "Chaque fiche d'événement indique combien de personnes y assistent déjà. Cela vous aide à voir la popularité d'un événement et à vous connecter avec d'autres personnes.",
      AR: "يوضح كل قائمة أحداث عدد الأشخاص الذين يحضرون بالفعل. هذا يساعدك على رؤية شهرة الحدث والتواصل مع الآخرين.",
    },
    category: "general",
  },

  // Default greeting
  {
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good evening", "مرحبا", "السلام", "أهلا"],
    responses: {
      FR: "Bonjour ! Bienvenue sur CulturePass Mediouna. Je suis ici pour vous aider à découvrir et réserver des événements culturels amazingers. Qu'aimeriez-vous savoir ?",
      AR: "مرحباً! أهلاً وسهلاً في CulturePass مديونة. أنا هنا لمساعدتك على اكتشاف وحجز الأحداث الثقافية المذهلة. ماذا تريد أن تعرف؟",
    },
    category: "general",
  },
];

export function findResponse(userMessage: string, language: Language = "FR"): string {
  const lowerMessage = userMessage.toLowerCase().trim();

  // Find matching response
  for (const item of chatbotResponses) {
    for (const keyword of item.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return item.responses[language];
      }
    }
  }

  // If no match found, return default message
  const defaultResponses: Record<Language, string> = {
    FR: "Désolé, je ne peux répondre qu'aux questions liées à cette application. N'hésitez pas à me poser des questions sur les événements, les réservations, les fonctionnalités ou comment utiliser CulturePass Mediouna.",
    AR: "آسف، يمكنني الإجابة فقط على الأسئلة المتعلقة بهذا التطبيق. لا تتردد في طرح أسئلة عني حول الأحداث والحجوزات والميزات أو كيفية استخدام CulturePass مديونة.",
  };

  return defaultResponses[language];
}

