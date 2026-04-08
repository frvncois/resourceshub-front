# Strapi `resources-hub` Single Type — Field Map

Endpoint: `GET /api/resources-hub?locale=en&populate=*`

---

## Text Fields

| Field | Type | Current EN value | Where it goes |
|---|---|---|---|
| `HeroTitle` | string | "Together, let's end bullying in schools" | |
| `HeroSubtitle` | string | "May 3th \| Anti-Bullying Day" | |
| `WelcomeTitle` | string | "Welcome to our resource hub" | |
| `WelcomeIntro` | string | "As part of the Ride Out Intimidation program…" | |
| `VideoTitle` | string | "Bullying through our kids' eyes" | |
| `VideoIntro` | string | "We asked our kids to express with drawings…" | |
| `VideoURL` | string (URL) | "https://youtu.be/C97gB_jSAX4" | |
| `PlayTitle` | string | "Le'ts talk about bullying" | |
| `PlayIntro` | string | "Starting a conversation about bullying can be challenging…" | |
| `CTAIntro` | string | "Beyond Anti-Bullying Day there's still a lot of work…" | |

---

## Rich Text Field

| Field | Type | Description | Where it goes |
|---|---|---|---|
| `IntroContent` | Blocks (rich text) | Multi-paragraph content with headings. Paragraphs about Anti-Bullying Day, BRP's mission, and the Resource Hub. | |

---

## Media Fields

| Field | Type | Current file | Where it goes |
|---|---|---|---|
| `HeroLogo` | StrapiMedia (SVG) | `logo_EN.svg` — Ride Out Intimidation logo | |
| `HeroBackground` | StrapiMedia (PNG) | `hero.png` — distressed girl with peers in background | |
| `VideoCover` | StrapiMedia (PNG) | `video.png` — child's drawing of isolation | |
| `PlayCover` | StrapiMedia (PNG) | `play.png` — paper fortune teller (Chatterbox) | |
| `CTALogo` | StrapiMedia (SVG) | `rideout_en.svg` — Ride Out Intimidation logo | |

---

## Notes

- All text fields and `localizations` are fully translated into **French** (`fr`) and **Spanish** (`es`).
- Media fields (`HeroLogo`, `CTALogo`) are SVGs and locale-specific (filename includes `_EN`).
- `IntroContent` is a Strapi Blocks rich-text field — it needs a block renderer (e.g. `@strapi/blocks-react-renderer` equivalent for Vue, or a custom renderer).
- Access media URLs via `mediaUrl(field.url)` from `src/api/strapi.ts`.
