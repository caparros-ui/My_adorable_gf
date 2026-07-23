export interface Chapter {
  id: number;
  number: string; // e.g. "CHAPTER 01"
  title: string;
  subtitle: string;
  date: string;
  location: string;
  image: string;
  fallbackImage: string;
  quote: string;
  story: string[];
  highlights: string[];
  tag: 'Firsts' | 'Adventures' | 'Cozy' | 'Milestones' | 'Forever';
  accentColor?: string;
}

export interface LoveNote {
  id: string;
  text: string;
  author: string;
  date: string;
  isCustom?: boolean;
}

export interface MemoryStat {
  label: string;
  value: string;
  iconName: string;
  description: string;
}
