import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "FR" | "AR";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation object
const translations: Record<Language, Record<string, string>> = {
  FR: {
    // Navigation
    "nav.discover": "Découvrir",
    "nav.home": "Accueil",
    "nav.map": "Carte",
    "nav.calendar": "Calendrier",
    "nav.myBookings": "Mes Réservations",
    "nav.admin": "Admin",
    "nav.signIn": "Se Connecter",
    "nav.createAccount": "Créer un Compte",
    "nav.signOut": "Se Déconnecter",
    "nav.notifications": "Notifications",
    "nav.toggleMenu": "Basculer le menu",

    // Home Page
    "home.title": "Découvrez les Événements Culturels",
    "home.subtitle": "Explorez les festivals, ateliers et célébrations de votre région",
    "home.heroTitle": "Vivez l'âme de Mediouna, un événement à la fois",
    "home.heroSubtitle": "Des nuits gnawa et festivals tbourida aux rassemblements communautaires et au théâtre contemporain — découvrez et réservez les expériences qui façonnent notre ville.",
    "home.cultural_agenda": "L'agenda culturel de Mediouna",
    "home.browseByCategory": "Parcourir par catégorie",
    "home.sevenWorlds": "Sept mondes de la culture, tous en train de se passer dans votre ville.",
    "home.seeFullCalendar": "Voir le calendrier complet",
    "home.featured": "EN VEDETTE",
    "home.upcomingInMediouna": "À venir à Mediouna",
    "home.handPickedEvents": "Événements sélectionnés se déroulant dans les prochaines semaines.",
    "home.reserveASeat": "Réserver une place",
    "home.searchWhere": "Où",
    "home.searchWhat": "Quoi",
    "home.searchWhen": "Quand",
    "home.searchPlaceholderWhere": "Mediouna, quartier…",
    "home.searchPlaceholderWhat": "Musique, festival, théâtre…",
    "home.searchPlaceholderWhen": "Ajouter une date",
    "home.search": "Rechercher",

    // Events
    "event.title": "Événements Culturels",
    "event.filter": "Filtrer les événements",
    "event.search": "Rechercher un événement",
    "event.noEvents": "Aucun événement trouvé",
    "event.upcomingEvents": "Événements à venir",
    "event.pastEvents": "Événements passés",
    "event.date": "Date",
    "event.location": "Localisation",
    "event.attendees": "Participants",
    "event.alreadyGoing": "personnes vont déjà",
    "event.register": "S'inscrire",
    "event.unregister": "Se désinscrire",
    "event.details.back": "Retour",
    "event.details.date": "Date",
    "event.details.time": "Heure",
    "event.details.venue": "Lieu",
    "event.details.organizer": "Organisateur",
    "event.details.aboutThisEvent": "À propos de cet événement",
    "event.details.culturalContext": "Contexte culturel",
    "event.details.perPerson": "par personne",
    "event.details.reserveSeat": "Réserver une place",
    "event.details.share": "Partager",
    "event.details.qrPassInfo": "Présentez ce QR code à l'entrée pour valider votre place.",
    "event.details.organizedBy": "Organisé par",
    "event.details.seats": "places",
    "event.notFound": "Événement introuvable",
    "event.notFoundMessage": "Cet événement a peut-être été déplacé ou supprimé.",
    "event.errorTitle": "Une erreur est survenue",
    "event.errorMessage": "Veuillez réessayer plus tard.",
    "common.backToEvents": "Retour aux événements",

    // Calendar
    "calendar.title": "Calendrier des Événements",
    "calendar.subtitle": "Planifiez vos semaines autour des événements importants.",
    "calendar.month": "Mois",
    "calendar.week": "Semaine",
    "calendar.day": "Jour",
    "calendar.today": "Aujourd'hui",
    "calendar.previous": "Précédent",
    "calendar.next": "Suivant",
    "calendar.subscribe": "S'abonner au calendrier",
    "calendar.noEvents": "Aucun événement prévu. Choisissez un autre jour dans le calendrier.",

    // Map
    "map.title": "Carte des Événements",
    "map.description": "Explorez les événements de Mediouna sur une carte interactive",
    "map.search": "Rechercher sur la carte",
    "map.zoom": "Zoom",
    "map.event": "Événement",
    "map.events": "Événements",
    "map.viewDetails": "Voir les détails →",

    // Dashboard
    "dashboard.title": "Mon Tableau de Bord",
    "dashboard.myBookings": "Mes Réservations",
    "dashboard.upcomingEvents": "Événements à venir",
    "dashboard.pastEvents": "Événements passés",
    "dashboard.totalEvents": "Événements total",
    "dashboard.cancelBooking": "Annuler la réservation",
    "dashboard.welcomeBack": "Content de vous revoir",
    "dashboard.memberSince": "Membre depuis",
    "dashboard.editProfile": "Modifier le profil",
    "dashboard.notifications": "Notifications",
    "dashboard.scanAtEntry": "Scanner عند الدخول",
    "dashboard.profile": "Profil",
    "dashboard.email": "E-mail",
    "dashboard.phone": "Téléphone",
    "dashboard.city": "Ville",
    "dashboard.bookingReference": "Réf.",
    "dashboard.statusUpcoming": "À venir",
    "dashboard.statusPast": "Passé",
    "dashboard.noNotifications": "Aucune notification",

    // Admin
    "admin.title": "Panneau d'Administration",
    "admin.events": "Événements",
    "admin.users": "Utilisateurs",
    "admin.statistics": "Statistiques",
    "admin.settings": "Paramètres",
    "admin.totalEvents": "Événements total",
    "admin.totalUsers": "Utilisateurs total",
    "admin.totalAttendees": "Participants total",
    "admin.revenueGenerated": "Revenu généré",
    "admin.createEvent": "Créer un événement",
    "admin.editEvent": "Modifier l'événement",
    "admin.deleteEvent": "Supprimer l'événement",

    // Auth
    "auth.signIn": "Se Connecter",
    "auth.signUp": "S'inscrire",
    "auth.email": "E-mail",
    "auth.password": "Mot de passe",
    "auth.passwordConfirm": "Confirmer le mot de passe",
    "auth.firstName": "Prénom",
    "auth.lastName": "Nom",
    "auth.forgotPassword": "Mot de passe oublié ?",
    "auth.rememberMe": "Se souvenir de moi",
    "auth.dontHaveAccount": "Vous n'avez pas de compte ?",
    "auth.alreadyHaveAccount": "Vous avez déjà un compte ?",
    "auth.signInWithGoogle": "Se connecter avec Google",
    "auth.signInWithFacebook": "Se connecter avec Facebook",
    "auth.emailPlaceholder": "vous@exemple.com",
    "auth.passwordPlaceholder": "••••••••",
    "auth.confirmPasswordPlaceholder": "••••••••",
    "auth.fullName": "Nom complet",
    "auth.createAccountAction": "Créer un compte",
    "auth.welcomeCommunity": "Bienvenue dans notre communauté !",
    "auth.createAccountSuccess": "Votre compte a été créé avec succès.",
    "auth.noAccount": "Vous n'avez pas de compte ?",
    "auth.haveAccount": "Vous avez déjà un compte ?",
    "auth.createOne": "Créez-en un",
    "auth.signInInstead": "Connectez-vous",
    "auth.error": "Erreur d'authentification",
    "auth.success": "Authentification réussie",

    // Common
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.sort": "Trier",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.add": "Ajouter",
    "common.close": "Fermer",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.language": "Langue",
    "common.settings": "Paramètres",
    "common.logout": "Se Déconnecter",
    "footer.description": "CulturePass relie les résidents et les visiteurs de Mediouna à la musique, au théâtre et aux rassemblements communautaires qui façonnent notre patrimoine partagé.",
    "footer.explore": "Explorez",
    "footer.community": "Communauté",
    "footer.events": "Événements",
    "footer.map": "Carte",
    "footer.calendar": "Calendrier",
    "footer.myAccount": "Mon compte",
    "footer.contact": "Contact",
    "footer.allRights": "Tous droits réservés.",
    "footer.madeWithCare": "Conçu avec soin pour la culture marocaine.",
  },
  AR: {
    // Navigation
    "nav.discover": "اكتشف",
    "nav.home": "الرئيسية",
    "nav.map": "خريطة",
    "nav.calendar": "التقويم",
    "nav.myBookings": "حجوزاتي",
    "nav.admin": "مسؤول",
    "nav.signIn": "تسجيل الدخول",
    "nav.createAccount": "إنشاء حساب",
    "nav.signOut": "تسجيل الخروج",
    "nav.notifications": "الإخطارات",
    "nav.toggleMenu": "تبديل القائمة",

    // Home Page
    "home.title": "اكتشف الأحداث الثقافية",
    "home.subtitle": "استكشف المهرجانات والورش والاحتفالات في منطقتك",
    "home.heroTitle": "عش روح مديونة، حدث واحد في كل مرة",
    "home.heroSubtitle": "من ليالي الغناء والمهرجانات الفنية إلى التجمعات المجتمعية والمسرح المعاصر — اكتشف واحجز التجارب التي تشكل مدينتنا.",
    "home.cultural_agenda": "الأجندة الثقافية لمديونة",
    "home.browseByCategory": "تصفح حسب الفئة",
    "home.sevenWorlds": "سبع عوالم من الثقافة، تحدث في مدينتك.",
    "home.seeFullCalendar": "عرض التقويم الكامل",
    "home.featured": "مميز",
    "home.upcomingInMediouna": "قريباً في مديونة",
    "home.handPickedEvents": "أحداث مختارة بعناية تحدث في الأسابيع القادمة.",
    "home.reserveASeat": "احجز مقعداً",
    "home.searchWhere": "أين",
    "home.searchWhat": "ماذا",
    "home.searchWhen": "متى",
    "home.searchPlaceholderWhere": "مديونة، حي…",
    "home.searchPlaceholderWhat": "موسيقى، مهرجان، مسرح…",
    "home.searchPlaceholderWhen": "إضافة تاريخ",
    "home.search": "بحث",

    // Events
    "event.title": "الأحداث الثقافية",
    "event.filter": "تصفية الأحداث",
    "event.search": "البحث عن حدث",
    "event.noEvents": "لم يتم العثور على أحداث",
    "event.upcomingEvents": "الأحداث القادمة",
    "event.pastEvents": "الأحداث الماضية",
    "event.date": "التاريخ",
    "event.location": "الموقع",
    "event.attendees": "الحضور",
    "event.alreadyGoing": "أشخاص سيذهبون بالفعل",
    "event.register": "سجل",
    "event.unregister": "إلغاء التسجيل",
    "event.details.back": "رجوع",
    "event.details.date": "التاريخ",
    "event.details.time": "الوقت",
    "event.details.venue": "المكان",
    "event.details.organizer": "المنظم",
    "event.details.aboutThisEvent": "حول هذا الحدث",
    "event.details.culturalContext": "السياق الثقافي",
    "event.details.perPerson": "لكل شخص",
    "event.details.reserveSeat": "احجز مقعدًا",
    "event.details.share": "مشاركة",
    "event.details.qrPassInfo": "اعرض رمز الاستجابة السريعة هذا عند المدخل لتأكيد مقعدك.",
    "event.details.organizedBy": "منظم بواسطة",
    "event.details.seats": "مقاعد",
    "event.notFound": "لم يتم العثور على الحدث",
    "event.notFoundMessage": "قد يكون هذا الحدث قد تم نقله أو إزالته.",
    "event.errorTitle": "حدث خطأ",
    "event.errorMessage": "يرجى المحاولة مرة أخرى لاحقًا.",
    "common.backToEvents": "العودة إلى الأحداث",

    // Calendar
    "calendar.title": "التقويم الثقافي",
    "calendar.subtitle": "خطط أسابيعك حول الأحداث التي تهمك.",
    "calendar.month": "الشهر",
    "calendar.week": "الأسبوع",
    "calendar.day": "اليوم",
    "calendar.today": "اليوم",
    "calendar.previous": "السابق",
    "calendar.next": "التالي",
    "calendar.subscribe": "الاشتراك في التقويم",
    "calendar.noEvents": "لا توجد أحداث مجدولة. اختر يومًا آخر من التقويم.",

    // Map
    "map.title": "خريطة الأحداث",
    "map.description": "اكتشف أحداث مديونة على خريطة تفاعلية",
    "map.search": "البحث على الخريطة",
    "map.zoom": "تكبير/تصغير",
    "map.event": "حدث",
    "map.events": "أحداث",
    "map.viewDetails": "عرض التفاصيل →",
    "footer.description": "CulturePass يربط سكان وزوار مديونة بالموسيقى والمسرح والتجمعات المجتمعية التي تشكل تراثنا المشترك.",
    "footer.explore": "استكشف",
    "footer.community": "المجتمع",
    "footer.events": "الأحداث",
    "footer.map": "الخريطة",
    "footer.calendar": "التقويم",
    "footer.myAccount": "حسابي",
    "footer.contact": "اتصل",
    "footer.allRights": "جميع الحقوق محفوظة لCulturePass مديونة.",
    "footer.madeWithCare": "مصنوع بعناية من أجل الثقافة المغربية.",

    // Dashboard
    "dashboard.title": "لوحة التحكم الخاصة بي",
    "dashboard.myBookings": "حجوزاتي",
    "dashboard.upcomingEvents": "الأحداث القادمة",
    "dashboard.pastEvents": "الأحداث الماضية",
    "dashboard.totalEvents": "إجمالي الأحداث",
    "dashboard.cancelBooking": "إلغاء الحجز",
    "dashboard.welcomeBack": "مرحبًا بعودتك",
    "dashboard.memberSince": "عضو منذ",
    "dashboard.editProfile": "تعديل الملف الشخصي",
    "dashboard.notifications": "الإشعارات",
    "dashboard.scanAtEntry": "امسح عند الدخول",
    "dashboard.profile": "الملف الشخصي",
    "dashboard.email": "البريد الإلكتروني",
    "dashboard.phone": "الهاتف",
    "dashboard.city": "المدينة",
    "dashboard.bookingReference": "المرجع",
    "dashboard.statusUpcoming": "قادم",
    "dashboard.statusPast": "منتهي",
    "dashboard.noNotifications": "لا توجد إشعارات",

    // Admin
    "admin.title": "لوحة الإدارة",
    "admin.events": "الأحداث",
    "admin.users": "المستخدمون",
    "admin.statistics": "الإحصائيات",
    "admin.settings": "الإعدادات",
    "admin.totalEvents": "إجمالي الأحداث",
    "admin.totalUsers": "إجمالي المستخدمين",
    "admin.totalAttendees": "إجمالي الحضور",
    "admin.revenueGenerated": "الإيرادات المحققة",
    "admin.createEvent": "إنشاء حدث",
    "admin.editEvent": "تحرير الحدث",
    "admin.deleteEvent": "حذف الحدث",

    // Auth
    "auth.signIn": "تسجيل الدخول",
    "auth.signUp": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.passwordConfirm": "تأكيد كلمة المرور",
    "auth.firstName": "الاسم الأول",
    "auth.lastName": "الاسم الأخير",
    "auth.forgotPassword": "هل نسيت كلمة المرور؟",
    "auth.rememberMe": "تذكرني",
    "auth.dontHaveAccount": "ليس لديك حساب؟",
    "auth.alreadyHaveAccount": "هل لديك حساب بالفعل؟",
    "auth.signInWithGoogle": "تسجيل الدخول باستخدام جوجل",
    "auth.signInWithFacebook": "تسجيل الدخول باستخدام فيسبوك",
    "auth.emailPlaceholder": "أنت@مثال.كوم",
    "auth.passwordPlaceholder": "••••••••",
    "auth.confirmPasswordPlaceholder": "••••••••",
    "auth.fullName": "الاسم الكامل",
    "auth.createAccountAction": "إنشاء حساب",
    "auth.welcomeCommunity": "مرحبًا بكم في مجتمعنا!",
    "auth.createAccountSuccess": "تم إنشاء حسابك بنجاح.",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.haveAccount": "هل لديك حساب بالفعل؟",
    "auth.createOne": "أنشئ واحدًا",
    "auth.signInInstead": "سجّل الدخول",
    "auth.error": "خطأ في المصادقة",
    "auth.success": "تمت المصادقة بنجاح",

    // Common
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.sort": "ترتيب",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.delete": "حذف",
    "common.edit": "تحرير",
    "common.add": "إضافة",
    "common.close": "إغلاق",
    "common.loading": "جاري التحميل...",
    "common.error": "خطأ",
    "common.success": "نجح",
    "common.language": "اللغة",
    "common.settings": "الإعدادات",
    "common.logout": "تسجيل الخروج",
    "footer.description": "CulturePass يربط سكان وزوار مديونة بالموسيقى والمسرح والتجمعات المجتمعية التي تشكل تراثنا المشترك.",
    "footer.explore": "استكشف",
    "footer.community": "المجتمع",
    "footer.events": "الأحداث",
    "footer.map": "الخريطة",
    "footer.calendar": "التقويم",
    "footer.myAccount": "حسابي",
    "footer.contact": "اتصل",
    "footer.allRights": "جميع الحقوق محفوظة لCulturePass مديونة.",
    "footer.madeWithCare": "مصنوع بعناية من أجل الثقافة المغربية.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("FR");

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
      updateDocumentDir(savedLanguage);
    }
  }, []);

  const updateDocumentDir = (lang: Language) => {
    document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "AR" ? "ar" : "fr";
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
    updateDocumentDir(newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isRTL: language === "AR",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
