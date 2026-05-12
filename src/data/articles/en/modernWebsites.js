/**
 * "How modern websites help small businesses look more professional" — EN.
 *
 * First flagship article. Treats the website as a working tool that affects
 * business perception, not as a brochure or a design exercise. Naturally
 * supports the business-websites service page without keyword-stuffing.
 * Tone: founder-led, observed, editorial — not marketing.
 *
 * Body uses the structured-JSON node format consumed by ArticleBody.jsx:
 * p / h2 / h3 / ul / quote / callout / link (internal service link).
 */
export default {
  title: 'How modern websites help small businesses look more professional',
  lede:
    "Small businesses obsess over packaging, signage and how the team dresses. Most still settle on the website. But the website is usually the first place a new client meets the business — and increasingly, the only place.",
  body: [
    {
      type: 'p',
      text:
        "Something interesting has been happening over the past decade: clients no longer wait to walk in before deciding who they work with. They check the business on Google before they call. They open the site on their phone in the middle of another meeting. They compare two sites side by side before picking up a single phone."
    },
    {
      type: 'p',
      text:
        "In that reality, the website isn't a business card. It's the storefront. And sometimes — the only one."
    },

    { type: 'h2', text: "Clients meet your website before they meet you" },
    {
      type: 'p',
      text:
        "Even when a lead came through a good referral, even when the business is entirely local, even when the service is simple and clear — the prospect pauses, types the business name into Google, and checks. That check takes three seconds. The search results, the website, a glance at Instagram — all of it merges into a first impression that is overwhelmingly digital."
    },
    {
      type: 'p',
      text:
        "That impression is sealed before any first conversation. It decides whether they call, whether they walk in, whether they even remember the business name an hour later."
    },
    {
      type: 'callout',
      tone: 'soft',
      text:
        "By the time someone finally walks in the door — half of them have already decided. Based on the site."
    },

    { type: 'h2', text: "A website isn't a brochure. It's a working tool." },
    {
      type: 'p',
      text:
        "A lot of businesses still think about their website like a \"brochure online\" — a page that explains what the business does, and stops there. But a brochure is one-way: it shows, the reader decides. A good website is two-way: it shows, listens, responds, and lets the client take the next step on their own, without waiting for business hours."
    },
    {
      type: 'p',
      text:
        "When you shift from \"brochure\" to \"tool,\" three things become unusually important."
    },

    { type: 'h3', text: "It loads fast — or you've already lost half of them" },
    {
      type: 'p',
      text:
        "Google has shown again and again that every additional second of load time burns visitors. But the numbers matter less than the feeling: a site that hesitates feels broken before you've seen anything in it. A site that comes up instantly feels professional. That's the whole story."
    },

    { type: 'h3', text: "It works on a phone — or it doesn't work" },
    {
      type: 'p',
      text:
        "More than seven in ten visitors arrive from mobile. If the site looks good on a desktop and breaks on a phone, then for most of your audience the site is broken. Full stop. Mobile-first design isn't a luxury anymore; it's the new default."
    },

    {
      type: 'h3',
      text: "It explains in five seconds what other sites take three minutes to almost explain"
    },
    {
      type: 'p',
      text:
        "An average visitor gives a site about five seconds before deciding whether to stay. If in those five seconds it isn't clear what you offer and who it's for, they're back to the search results. Most sites open with a giant logo, continue with a mysterious tagline, and only reach the real offer on the third scroll. That's just too late."
    },

    { type: 'h2', text: "Professionalism, it turns out, is consistency" },
    {
      type: 'p',
      text:
        "The most unexpected thing I've learned from working on sites for small businesses is that the feeling of professionalism isn't built from one dramatic element. It's built from a thousand small decisions that quietly agree with each other."
    },
    {
      type: 'p',
      text:
        "When the colors match the logo. When the typography stays consistent across pages. When the spacing breathes. When buttons look clickable. When the tiny icon in the browser tab is the brand mark, not a default. Each detail on its own doesn't change much. Together, they create the feeling: \"Someone here cared.\""
    },
    {
      type: 'ul',
      items: [
        "The favicon in the browser tab",
        "How the preview image looks when a link is shared in WhatsApp",
        "Whether a clickable button looks clickable",
        "Whether navigation behaves the same way on every page",
        "Whether the typography is uniform",
        "Whether margins breathe",
        "Whether dark mode is supported",
        "Whether right-to-left languages are handled properly"
      ]
    },
    {
      type: 'p',
      text:
        "No client will ever list these items. But they will feel them. That's the difference between \"a site\" and \"a site that works.\""
    },

    { type: 'h2', text: "Trust is built before a word is read" },
    {
      type: 'p',
      text:
        "There is something words simply cannot do: convey credibility in the first three seconds. That part is done by the website itself — by how it looks, the rhythm at which it loads, the smoothness of moving between pages, the fact that it doesn't break when you rotate the phone."
    },
    {
      type: 'quote',
      text:
        "Trust isn't what a website says. It's how the website feels in the first three seconds."
    },
    {
      type: 'p',
      text:
        "The visitor's confidence is built from the whole — almost entirely before they have read a full sentence. By the time they begin reading, the question is no longer \"is this serious?\" but \"is this for me?\""
    },

    { type: 'h2', text: "The contact moment is the actual product" },
    {
      type: 'p',
      text:
        "You can build the most beautiful site in the world, but if the moment of getting in touch is friction-filled, it's all wasted. And I see this a lot: a contact form the length of a page, a phone number that can't be copied, a WhatsApp button that only appears on the \"Contact\" page (and nowhere else), an email link that opens an app the visitor doesn't have."
    },
    {
      type: 'p',
      text: "The things that actually change inquiry rates are the simple ones:"
    },
    {
      type: 'ul',
      items: [
        "A WhatsApp button that works in one tap, from a phone, on every page",
        "A phone number that's tappable to call",
        "A form that asks for the minimum: name, contact, one line about what's needed",
        "Immediate confirmation when a message arrives — not a \"thank you\" page that feels like the visitor was discarded",
        "A real reply on the same day — not an automation that feels like an automation"
      ]
    },
    {
      type: 'p',
      text: "The contact moment isn't an add-on to the site. It's the reason the site exists."
    },

    { type: 'h2', text: "Google reads the site too" },
    {
      type: 'p',
      text:
        "The technical side of a website isn't only about performance. It is also the language in which Google understands what the business does and who it serves. A site that is structured well — sensible heading hierarchy, metadata, schema, separate locale versions — is a site that can be found in search. A site structured poorly, however pretty, simply disappears."
    },
    {
      type: 'p',
      text:
        "Google today tries to understand a site almost the way a person would. If the message is clear to a person, it is usually clear to Google. But there is a basic technical foundation that has to be in place underneath all of that for Google to be able to see the site at all."
    },
    {
      type: 'callout',
      tone: 'strong',
      text: "A site that can't be found in search is, in practice, a site that doesn't exist."
    },

    { type: 'h2', text: "What this looks like in practice" },
    {
      type: 'p',
      text:
        "A good site for a small business doesn't have to be complicated. It has to be clear: a homepage that explains itself in five seconds, service pages that answer real questions, a frictionless contact moment, solid performance, and a clean technical foundation that Google likes too. That's all. But every piece is done deliberately."
    },
    {
      type: 'p',
      text:
        "It isn't magic. It's just serious thinking about every detail, by one person who treats the site like an actual tool of the business — not as a design exercise."
    },
    {
      type: 'link',
      label: 'See what a site built this way looks like',
      slug: 'business-websites'
    },

    {
      type: 'p',
      text:
        "The question isn't whether your business needs a website. The question is what your business looks like when clients arrive — and they're already arriving, whether you've built them somewhere to land or not."
    }
  ]
};
