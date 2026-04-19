export type Language = "FR" | "AR";

export interface PredefinedQuestion {
  id: string;
  label_fr: string;
  label_ar: string;
  keywords: string[];
  response_fr: string;
  response_ar: string;
}

// 5 main question types
export const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
  {
    id: "q1",
    label_fr: "Comment utiliser CulturePass ?",
    label_ar: "كيفية استخدام CulturePass؟",
    keywords: ["comment utiliser", "how to use", "استخدام", "كيفية"],
    response_fr:
      "CulturePass est une plateforme numérique qui vous permet de découvrir et réserver les événements culturels de Mediouna. Utilisez la carte pour voir les emplacements, le calendrier pour planifier vos visites, et la fonction de réservation pour sécuriser votre place à chaque événement.",
    response_ar:
      "CulturePass هي منصة رقمية تتيح لك اكتشاف وحجز الأحداث الثقافية في مديونة. استخدم الخريطة لرؤية المواقع، والتقويم لتخطيط زياراتك، ووظيفة الحجز لحجز مقعدك في كل حدث.",
  },
  {
    id: "q2",
    label_fr: "C'est quoi CulturePass ?",
    label_ar: "ما هي CulturePass؟",
    keywords: ["c'est quoi", "what is", "what's", "ما هي", "عن"],
    response_fr:
      "CulturePass est une application dédiée à la promotion et la célébration de la riche héritage culturel de Mediouna. Elle connecte les habitants et les visiteurs avec la musique traditionnelle (gnawa), le théâtre, les festivals, les ateliers et les rassemblements communautaires qui façonnent l'identité culturelle de la ville.",
    response_ar:
      "CulturePass هي تطبيق مكرس لتعزيز والاحتفاء بالتراث الثقافي الغني لمديونة. إنها تربط السكان والزوار بالموسيقى التقليدية (غناوة)، والمسرح، والمهرجانات، والورش، والتجمعات المجتمعية التي تشكل الهوية الثقافية للمدينة.",
  },
  {
    id: "q3",
    label_fr: "Parlez-moi de Mediouna",
    label_ar: "أخبرني عن مديونة",
    keywords: ["mediouna", "مديونة", "city", "ville"],
    response_fr:
      "Mediouna est une ville dynamique au Maroc, située près de Casablanca. Elle est connue pour son patrimoine culturel vibrant, combinant les traditions marocaines modernes avec des événements contemporains. Mediouna accueille une population diversifiée passionnée par l'art, la musique et les rassemblements communautaires.",
    response_ar:
      "مديونة هي مدينة نابضة بالحياة في المغرب، تقع بالقرب من الدار البيضاء. تشتهر بتراثها الثقافي النابض بالحياة، الذي يجمع بين التقاليد المغربية الحديثة مع الأحداث المعاصرة. تستضيف مديونة سكاناً متنوعين شغوفين بالفن والموسيقى والتجمعات المجتمعية.",
  },
  {
    id: "q4",
    label_fr: "Histoire de Mediouna",
    label_ar: "تاريخ مديونة",
    keywords: ["histoire", "history", "تاريخ", "origins"],
    response_fr:
      "Mediouna a une riche histoire culturelle enracinée dans les traditions marocaines authentiques. Au fil des siècles, la ville a conservé ses coutumes locales tout en évoluant comme centre culturel moderne. Aujourd'hui, elle est reconnue comme un foyer vibrant de créativité artistique, de musique traditionnelle et d'innovation culturelle qui célèbre son héritage unique.",
    response_ar:
      "لمديونة تاريخ ثقافي غني متجذر في التقاليد المغربية الأصيلة. على مدى قرون، احتفظت المدينة بعاداتها المحلية بينما تطورت كمركز ثقافي حديث. اليوم، تُعترف بها كمركز نابض للإبداع الفني والموسيقى التقليدية والابتكار الثقافي الذي يحتفي بتراثها الفريد.",
  },
  {
    id: "q5",
    label_fr: "Autre question liée au sujet",
    label_ar: "سؤال آخر متعلق بالموضوع",
    keywords: ["autre", "question", "سؤال", "autre chose"],
    response_fr:
      "Vous pouvez me poser toute question liée à CulturePass, Mediouna, ou aux événements culturels. Sinon, consultez notre équipe d'aide ou visitez notre site web pour plus d'informations.",
    response_ar:
      "يمكنك أن تسأل أي سؤال متعلق بـ CulturePass أو مديونة أو الأحداث الثقافية. وإلا، استشر فريق المساعدة لدينا أو قم بزيارة موقعنا للمزيد من المعلومات.",
  },
];

export const MAX_QUESTIONS = 5;

// Message when max questions reached
export const MAX_QUESTIONS_MESSAGE = {
  FR: "Vous avez atteint la limite de 5 questions. Merci d'avoir utilisé CulturePass Support. Pour plus d'aide, contactez: support@culturepass.com",
  AR: "لقد وصلت إلى حد 5 أسئلة. شكراً لاستخدام دعم CulturePass. للمزيد من المساعدة، اتصل بـ: support@culturepass.com",
};

// Message for out of scope questions
export const OUT_OF_SCOPE_MESSAGE = {
  FR: "Désolé, je peux seulement répondre aux questions liées à CulturePass et Mediouna.",
  AR: "عذراً، أستطيع الإجابة فقط على أسئلة متعلقة بـ CulturePass ومديونة.",
};

export function findMatchingQuestion(
  userMessage: string
): PredefinedQuestion | null {
  const lowerMessage = userMessage.toLowerCase().trim();

  for (const question of PREDEFINED_QUESTIONS) {
    for (const keyword of question.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return question;
      }
    }
  }

  return null;
}

export function getResponseForQuestion(
  question: PredefinedQuestion,
  language: Language
): string {
  return language === "AR" ? question.response_ar : question.response_fr;
}

export function getQuestionLabel(
  question: PredefinedQuestion,
  language: Language
): string {
  return language === "AR" ? question.label_ar : question.label_fr;
}
