export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Photography' | 'Design' | 'Visuals' | 'Branding';
  subtitle: string;
  imageUrl?: string;
  placeholderLabel?: string;
  description: string;
  aspectRatio: 'portrait' | 'square' | 'wide';
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  percentage: number;
  category: string;
  iconName?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}
