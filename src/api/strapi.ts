import type { StrapiResponse, Resource, Partner, Category, Audience, ResourcesHub } from './types'

const BASE_URL = import.meta.env.VITE_STRAPI_URL as string
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN as string

const LOCALES = ['en', 'fr', 'es'] as const
export type Locale = (typeof LOCALES)[number]

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

const RESOURCE_POPULATE =
  'populate[0]=cover&populate[1]=partner&populate[2]=partner.logo&populate[3]=partner.country&populate[4]=categories&populate[5]=audiences'

export function fetchResources(locale: Locale = 'en') {
  return get<StrapiResponse<Resource>>(
    `/api/resources?locale=${locale}&pagination[pageSize]=100&${RESOURCE_POPULATE}`,
  )
}

export async function fetchAllResources(): Promise<Resource[]> {
  const results = await Promise.all(LOCALES.map(fetchResources))
  return results.flatMap((r) => r.data)
}

export function fetchResourceBySlug(slug: string) {
  return get<StrapiResponse<Resource>>(
    `/api/resources?filters[slug][$eq]=${slug}&${RESOURCE_POPULATE}`,
  )
}

export function fetchPartners(locale: Locale = 'en') {
  return get<StrapiResponse<Partner>>(
    `/api/partners?locale=${locale}&pagination[pageSize]=100&populate[0]=logo&populate[1]=country`,
  )
}

export function fetchCategories(locale: Locale = 'en') {
  return get<StrapiResponse<Category>>(
    `/api/categories?locale=${locale}&pagination[pageSize]=100`,
  )
}

export function fetchAudiences() {
  return get<StrapiResponse<Audience>>('/api/audiences')
}

export function fetchResourcesHub(locale: Locale = 'en') {
  return get<{ data: ResourcesHub }>(`/api/resources-hub?locale=${locale}&populate=*`)
}

export function mediaUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${BASE_URL}${path}`
}
