# Strapi Backend — Data Schema

**Base URL:** `http://localhost:1337`
**Admin:** `http://localhost:1337/admin`
**Auth:** `Authorization: Bearer <VITE_STRAPI_TOKEN>`
**Default locale:** `en` — also available: `fr`, `es`

---

## Content Types

### Country
`GET /api/countries` — 9 entries — i18n: yes

| Field | Type | Localized |
|---|---|---|
| `name` | string | yes |
| `slug` | uid | no |
| `partners` | oneToMany → Partner | — |

Entries: Finland, Austria, Global, Scotland, Mexico, United Kingdom, Canada, Australia, United States

---

### Partner
`GET /api/partners` — 14 entries — i18n: yes

| Field | Type | Localized |
|---|---|---|
| `name` | string | yes |
| `slug` | uid | no |
| `url` | string | yes |
| `description` | text | yes |
| `logo` | media (image) | yes |
| `country` | manyToOne → Country | no |
| `resources` | oneToMany → Resource | — |

---

### Category
`GET /api/categories` — 75 entries — i18n: yes

Question-style strings (e.g. *"What is considered bullying?"*)

| Field | Type | Localized |
|---|---|---|
| `name` | string | yes |
| `slug` | uid | no |
| `resources` | manyToMany → Resource | — |

---

### Audience
`GET /api/audiences` — 6 entries — i18n: no

Fixed values: `adult` `teenager` `kid` `coach` `teacher` `parent`

---

### Resource
`GET /api/resources` — 79 entries — i18n: yes (one locale per entry)

> Resources are **not translated** — each resource lives in one locale only (the language of its content). To get all resources, query all 3 locales and merge.

| Field | Type | Localized |
|---|---|---|
| `name` | string | yes |
| `slug` | uid | no |
| `url` | string | yes |
| `cover` | media (image) | yes |
| `partner` | manyToOne → Partner | no |
| `categories` | manyToMany → Category | no |
| `audiences` | manyToMany → Audience | no |

---

## Relationship Graph

```
Country ──< Partner ──< Resource >── Category
                            │
                            └──> Audience
```

---

## Key Queries

### All resources (one locale) with full relations
```
GET /api/resources?locale=en&pagination[pageSize]=100
  &populate[0]=cover
  &populate[1]=partner
  &populate[2]=partner.logo
  &populate[3]=partner.country
  &populate[4]=categories
  &populate[5]=audiences
```

### All resources across all locales
Run the query above for `en`, `fr`, `es` in parallel, then merge the three `data` arrays.

### Filter by audience
```
GET /api/resources?locale=en&filters[audiences][name][$eq]=teenager&populate...
```

### Filter by category slug
```
GET /api/resources?locale=en&filters[categories][slug][$eq]=what-is-considered-bullying&populate...
```

### Single resource by slug
```
GET /api/resources?filters[slug][$eq]=your-slug&populate...
```

### Partners with logo + country
```
GET /api/partners?locale=en&pagination[pageSize]=100&populate[0]=logo&populate[1]=country
```

---

## Response Shape (Strapi v5)

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123...",
      "name": "...",
      "slug": "...",
      "locale": "en",
      "cover": { "id": 5, "url": "/uploads/image.jpg" },
      "partner": { "id": 2, "name": "...", "country": { ... } },
      "categories": [{ "id": 3, "name": "...", "slug": "..." }],
      "audiences": [{ "id": 1, "name": "teenager" }]
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 25, "pageCount": 4, "total": 79 }
  }
}
```

Media URLs are relative — prepend `VITE_STRAPI_URL`:
```js
`${import.meta.env.VITE_STRAPI_URL}${resource.cover.url}`
```
