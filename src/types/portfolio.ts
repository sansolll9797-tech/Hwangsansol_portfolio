export type ProjectCategory = 
  | 'all'
  | 'video'
  | 'brand'
  | 'medical'
  | 'poster'
  | 'marketing'
  | 'performance';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'video' | 'brand' | 'medical' | 'poster' | 'marketing' | 'performance' | string;
  categoryLabel: string;
  section: 'marketing' | 'design'; // Distinguishes marketing vs design!
  thumbnail: string;
  heroImage?: string;
  galleryImages?: string[];
  videoUrl?: string; // YouTube URL or embed link
  youtubeId?: string; // YouTube 11-char video ID
  summary: string;
  description: string;
  challenge?: string;
  solution?: string;
  keyMetric?: string;
  metricDetail?: string;
  contribution: string;
  tools: string[];
  link?: string;
  client?: string;
  keywords?: string[];
  colors?: { hex: string; label: string }[];
  featured?: boolean;
  date: string;
}

export interface MarketingMetric {
  id: string;
  label: string;
  value: string;
  growth: string;
  description: string;
  category: string;
  benchmark?: string;
}

export interface ProfileInfo {
  name: string;
  engName: string;
  birth: string;
  phone: string;
  email: string;
  secondaryEmail?: string;
  licenses: {
    date: string;
    title: string;
  }[];
  skills: string[];
}

export interface ThemeConfig {
  accentColor: string; // e.g. "#00FF66"
  headlineScale: 'compact' | 'normal' | 'impact';
  heroBadgeText: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutPhilosophy: string;
  statusBadge: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface SocialLinks {
  email: string;
  phone: string;
  linkedin: string;
  behance: string;
  instagram: string;
  github: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface SiteData {
  theme: ThemeConfig;
  seo: SEOConfig;
  profile: ProfileInfo;
  socials: SocialLinks;
  marketingProjects: Project[];
  designProjects: Project[];
  projects: Project[]; // Combined for legacy CMS compatibility
  metrics: MarketingMetric[];
  inquiries: ContactInquiry[];
}
