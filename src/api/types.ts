export interface StrapiTextNode {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
}

export interface StrapiBlock {
  type: 'paragraph' | 'heading'
  level?: number
  children: StrapiTextNode[]
}

export interface ResourcesHub {
  id: number
  documentId: string
  HeroTitle: string
  HeroSubtitle: string
  IntroContent: StrapiBlock[]
  VideoTitle: string
  VideoIntro: string
  VideoURL: string
  PlayTitle: string
  PlayIntro: string
  CTAIntro: string
  WelcomeTitle: string
  WelcomeIntro: string
  HeroLogo: StrapiMedia | null
  HeroBackground: StrapiMedia | null
  VideoCover: StrapiMedia | null
  PlayCover: StrapiMedia | null
  CTALogo: StrapiMedia | null
  locale: string
}

export interface StrapiMedia {
  id: number
  documentId: string
  url: string
  name: string
  alternativeText: string | null
  width: number | null
  height: number | null
}

export interface StrapiMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export interface StrapiResponse<T> {
  data: T[]
  meta: StrapiMeta
}

export interface Country {
  id: number
  documentId: string
  name: string
  slug: string
  locale: string
}

export interface Audience {
  id: number
  documentId: string
  name: 'adult' | 'teenager' | 'kid' | 'coach' | 'teacher' | 'parent'
}

export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  locale: string
}

export interface Partner {
  id: number
  documentId: string
  name: string
  slug: string
  url: string
  description: string
  logo: StrapiMedia | null
  country: Country | null
  locale: string
}

export interface Resource {
  id: number
  documentId: string
  name: string
  slug: string
  url: string
  cover: StrapiMedia | null
  partner: Partner | null
  categories: Category[]
  audiences: Audience[]
  locale: string
}
