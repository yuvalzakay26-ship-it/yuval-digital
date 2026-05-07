/**
 * Per-route SEO copy (title + description), keyed by route id and locale.
 *
 * Centralised so future service / industry / insights pages add an entry
 * here and share the same Helmet rendering pipeline. Pages either look
 * up their copy from this map or pass overrides directly to <Seo />.
 */

export const seoCopy = {
  home: {
    he: {
      title: 'יובל דיגיטל — אתרים, אוטומציות ופתרונות דיגיטליים לעסקים',
      description:
        'הנדסאי תוכנה מצטיין שבונה לעסקים אתרים, דפי נחיתה, אוטומציות חכמות ופתרונות AI. תקשורת ישירה, מענה תוך 24 שעות, איכות בלי פשרות.'
    },
    en: {
      title: 'Yuval Digital — Websites, Automation & Smart Digital Solutions',
      description:
        'Outstanding practical software graduate building websites, landing pages, automations and AI-assisted solutions for businesses ready to grow.'
    }
  },
  privacy: {
    he: {
      title: 'מדיניות פרטיות — יובל דיגיטל',
      description:
        'מדיניות הפרטיות של יובל דיגיטל: אילו פרטים נאספים, כיצד הם נשמרים ומה הזכויות שלך.'
    },
    en: {
      title: 'Privacy Policy — Yuval Digital',
      description:
        'How Yuval Digital handles personal data: what is collected, how it is stored and your rights as a visitor.'
    }
  },
  accessibility: {
    he: {
      title: 'הצהרת נגישות — יובל דיגיטל',
      description:
        'הצהרת הנגישות של יובל דיגיטל: התאמות, סטנדרטים נתמכים ויצירת קשר לדיווח על תקלה.'
    },
    en: {
      title: 'Accessibility Statement — Yuval Digital',
      description:
        'Yuval Digital accessibility statement: adaptations, supported standards and how to report an issue.'
    }
  }
};
