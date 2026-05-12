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
      title: 'יובל דיגיטל — אתרים, אוטומציות וכלי AI לעסקים',
      description:
        'יובל דיגיטל בונה לעסקים אתרים מודרניים, דפי נחיתה, אוטומציות חכמות וכלי AI — פתרונות דיגיטליים שמתחברים יחד ומותאמים לתהליך העבודה של העסק. תקשורת ישירה, מענה תוך 24 שעות, איכות פרימיום.'
    },
    en: {
      title: 'Yuval Digital — Websites, Automation & AI Workflows for Businesses',
      description:
        'Yuval Digital builds modern websites, landing pages, smart automations and AI-assisted workflows for businesses — modern digital solutions designed to fit together as one connected system per project. Direct communication, response within 24h, premium quality.'
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
  },
  about: {
    he: {
      title: 'אודות — יובל זכאי · יובל דיגיטל',
      description:
        'אודות יובל זכאי, מייסד יובל דיגיטל — סטודיו דיגיטלי עצמאי הבונה אתרים, אוטומציות וכלי AI לעסקים בישראל. סיפור הסטודיו, פילוסופיה ותחומי עבודה.'
    },
    en: {
      title: 'About — Yuval Zakay · Yuval Digital',
      description:
        'About Yuval Zakay, founder of Yuval Digital — an independent digital studio building modern websites, automations and AI-assisted tools for businesses in Israel. Studio story, approach and current focus.'
    }
  },
  blog: {
    he: {
      title: 'בלוג — יובל דיגיטל',
      description:
        'מאמרים מעשיים על אתרים לעסקים, אוטומציות, AI וקידום בגוגל — מנקודת מבט של מפתח עצמאי שעובד עם עסקים קטנים ובינוניים בישראל.'
    },
    en: {
      title: 'Blog — Yuval Digital',
      description:
        'Practical articles on business websites, automation, AI and search visibility — from the perspective of an independent developer working with small and mid-sized businesses in Israel.'
    }
  },
  /* Service detail pages. Keyed by slug to match SERVICE_CATALOG entries
     in src/data/serviceCatalog.js. Service.jsx looks up by slug. */
  services: {
    'business-websites': {
      he: {
        title: 'בניית אתרים לעסקים — יובל דיגיטל',
        description:
          'בניית אתרים מקצועיים לעסקים: מהירים, מותאמים למובייל, חזקים בגוגל. קוד מותאם, דו-לשוני עברית/אנגלית, SEO טכני ונגישות מובנים. מ-₪3,900.'
      },
      en: {
        title: 'Business Website Development — Yuval Digital',
        description:
          'Custom business websites: fast, mobile-first, search-friendly. Bespoke code, full HE/EN bilingual, technical SEO and accessibility built in. From ₪3,900.'
      }
    },
    'landing-pages': {
      he: {
        title: 'בניית דפי נחיתה ממירים — יובל דיגיטל',
        description:
          'דפי נחיתה ממוקדים לעסקים: מהירים, ממירים, ומותאמים לקמפיינים בגוגל ובפייסבוק. מסר ממוקד, טופס חכם, מעקב המרות ותשתית A/B מובנית. מ-₪1,900.'
      },
      en: {
        title: 'High-Converting Landing Pages — Yuval Digital',
        description:
          'Focused landing pages for businesses: fast, conversion-driven, and tuned for Google and Facebook campaigns. Clear messaging, smart form, conversion tracking and A/B-ready foundation. From ₪1,900.'
      }
    },
    'ai-automation': {
      he: {
        title: 'אוטומציות עסקיות ו-AI לעסקים — יובל דיגיטל',
        description:
          'אוטומציות מעשיות לעסקים קטנים ובינוניים: חיבור בין כלים (Make, n8n, Zapier), ניהול לידים אוטומטי, התראות חכמות ודוחות שמתעדכנים בעצמם. מ-₪1,500.'
      },
      en: {
        title: 'Business Automation & AI Workflows — Yuval Digital',
        description:
          'Practical automations for small and mid-sized businesses: tool integrations (Make, n8n, Zapier), automatic lead routing, smart alerts and self-updating reports. From ₪1,500.'
      }
    }
  }
};
