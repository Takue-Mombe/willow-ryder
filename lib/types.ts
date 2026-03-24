export type TitledItem = {
  title: string;
  description: string;
};

export type SiteSettings = {
  id: string;
  businessName: string;
  logoUrl: string;
  businessTagline: string;
  businessDescription: string;
  phone: string;
  whatsapp: string;
  email: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  websiteUrl: string;
  foundedYear: string;
  heroEyebrow: string;
  heroTitlePrefix: string;
  heroTitleEmphasis: string;
  heroTitleSuffix: string;
  heroDescription: string;
  heroQuote: string;
  heroLocationText: string;
  heroMediaUrl: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  yearsCrafting: string;
  projectsCompleted: string;
  clientRating: string;
  servicesSectionTitle: string;
  servicesSectionSubtitle: string;
  servicesSectionCtaLabel: string;
  servicesSectionCtaHref: string;
  portfolioSectionTitle: string;
  portfolioSectionSubtitle: string;
  portfolioSectionCtaLabel: string;
  portfolioSectionCtaHref: string;
  aboutSectionTitle: string;
  aboutMediaUrl: string;
  aboutValues: TitledItem[];
  teamSectionTitle: string;
  teamSectionSubtitle: string;
  studioFilmTitle: string;
  studioFilmDescription: string;
  storyMediaUrl: string;
  processSectionTitle: string;
  processSectionSubtitle: string;
  processSteps: TitledItem[];
  testimonialsSectionTitle: string;
  testimonialsSectionSubtitle: string;
  testimonialsRatingLabel: string;
  testimonialsPrimaryCtaLabel: string;
  testimonialsPrimaryCtaHref: string;
  blogSectionTitle: string;
  blogSectionSubtitle: string;
  blogSectionCtaLabel: string;
  blogSectionCtaHref: string;
  contactSectionTitle: string;
  marqueeItems: string[];
  aboutStory: string;
  aboutStorySecondary: string;
  aboutStoryTertiary: string;
  contactIntro: string;
  seoDefaultTitle: string;
  seoDefaultDescription: string;
  seoKeywords: string[];
  ogImageUrl: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  category: string;
  imageUrl: string;
  bullets: string[];
  featured: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  location: string;
  year: string;
  featured: boolean;
  sortOrder: number;
  challenge: string;
  solution: string;
  imageUrl: string;
  palette: string[];
  materials: string[];
  metrics: string[];
  seoTitle: string;
  seoDescription: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  rating: number;
  sortOrder: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  featured: boolean;
  publishedAt: string;
  coverAccent: string;
  coverImageUrl: string;
  seoTitle: string;
  seoDescription: string;
};

export type StudioAssetKind = "image" | "video";

export type StudioAsset = {
  id: string;
  src: string;
  fileName: string;
  title: string;
  alt: string;
  kind: StudioAssetKind;
  category: string;
  source?: "public" | "database";
  poster?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  photoUrl: string;
  sortOrder: number;
};

export type MediaAssetRecord = {
  id: string;
  title: string;
  alt: string;
  src: string;
  storagePath: string;
  kind: StudioAssetKind;
  category: string;
  source: "database";
  sortOrder: number;
};

export type FeaturedMedia = {
  heroVideo: StudioAsset | null;
  aboutImage: StudioAsset | null;
  storyVideo: StudioAsset | null;
};

export type JourneyStep = {
  phase: string;
  title: string;
  body: string;
  details: string[];
  quote: string;
  accent: string;
  mood: string;
};

export type JourneyTheme = {
  key: string;
  number: string;
  label: string;
  description: string;
  category: string;
  colors: string[];
  steps: JourneyStep[];
};

export type InquiryState = {
  ok: boolean;
  message: string;
};
