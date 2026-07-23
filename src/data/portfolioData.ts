import { PortfolioItem, TimelineMilestone, SkillItem, NavigationItem } from '../types';

export const NAV_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const HERO_DATA = {
  eyebrow: 'Portfolio · 2026',
  name: 'Sophia Vance',
  role: 'Creative Director & Visual Artist',
  tagline: 'Crafting expressive digital stories, fine art photography, and human-centric design through light, color, and dynamic motion.',
  heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  stats: [
    { label: 'Years Experience', value: '6+' },
    { label: 'Curated Works', value: '45+' },
    { label: 'Design Awards', value: '12' },
  ]
};

export const ABOUT_DATA = {
  eyebrow: 'About Her',
  title: 'A passion for visual storytelling & modern digital aesthetics',
  bioParagraph1: 'Specializing in visual direction, branding, and conceptual photography. My journey began with a curiosity for how light interacts with shadows and evolved into a full-scale creative practice.',
  bioParagraph2: 'Working across digital mediums, I help brands and individuals express their unique narratives with warmth, precision, and unforgettable aesthetic poise.',
  quote: '"Art is not what you see, but what you make others see."',
  aboutImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
};

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: '1',
    year: '2020',
    title: 'The First Spark',
    description: 'Began exploring analog portraiture and digital medium photography. Launched her inaugural exhibition in Seattle.'
  },
  {
    id: '2',
    year: '2022',
    title: 'First Commercial Studio Project',
    description: 'Partnered with luxury lifestyle brands for editorial campaigns, combining brand identity design with high-end creative direction.'
  },
  {
    id: '3',
    year: '2024',
    title: 'Refining the Aesthetic Signature',
    description: 'Expanded into interactive motion graphics, 3D web spaces, and interactive visual installations across North America & Europe.'
  },
  {
    id: '4',
    year: '2026',
    title: 'Present & Beyond',
    description: 'Leading independent creative direction, mentoring aspiring artists, and building cutting-edge visual experiences.'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Luminescent Horizons',
    category: 'Photography',
    subtitle: 'Fine Art Landscape & Lighting',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    description: 'A study on golden hour reflection and atmospheric color hues captured in coastal Southern California.',
    aspectRatio: 'square'
  },
  {
    id: 'p2',
    title: 'Neon Bloom Identity',
    category: 'Branding',
    subtitle: 'Brand Identity & Typographic System',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    description: 'Complete brand packaging, web concept, and color story for an avant-garde boutique design studio.',
    aspectRatio: 'square'
  },
  {
    id: 'p3',
    title: 'Velvet Shadows Portrait',
    category: 'Photography',
    subtitle: 'Studio Editorial Series',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
    description: 'High contrast black and subtle violet tone editorial portraiture focused on emotion and form.',
    aspectRatio: 'square'
  },
  {
    id: 'p4',
    title: 'Ethereal Motion Dynamics',
    category: 'Visuals',
    subtitle: 'Abstract 3D Motion Art',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80',
    description: 'Fluid dynamic simulations depicting organic motion, light refractors, and glowing silk aesthetics.',
    aspectRatio: 'square'
  },
  {
    id: 'p5',
    title: 'Urban Synthesis',
    category: 'Photography',
    subtitle: 'Architectural Photography',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    description: 'Exploration of glass facades, geometric lines, and ambient neon night reflections in Tokyo.',
    aspectRatio: 'square'
  },
  {
    id: 'p6',
    title: 'Aura UI Framework',
    category: 'Design',
    subtitle: 'UI/UX & Design System',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    description: 'Dark-mode glassmorphic interface system crafted for next-generation creative portfolio platforms.',
    aspectRatio: 'square'
  }
];

export const SKILLS_DATA: SkillItem[] = [
  { id: 's1', name: 'Creative Direction & Concepting', percentage: 95, category: 'Creative' },
  { id: 's2', name: 'Fine Art & Editorial Photography', percentage: 90, category: 'Photography' },
  { id: 's3', name: 'UI/UX Design & Glassmorphism', percentage: 88, category: 'Design' },
  { id: 's4', name: 'Motion Graphics & 3D Visuals', percentage: 82, category: 'Motion' },
  { id: 's5', name: 'TypeScript & Modern Web Frontend', percentage: 85, category: 'Development' },
  { id: 's6', name: 'Color Grading & Post-Production', percentage: 92, category: 'Post' }
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com', icon: 'Github' },
  { name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  { name: 'Dribbble', url: 'https://dribbble.com', icon: 'Dribbble' },
  { name: 'Email', url: 'mailto:sophia@vanceart.com', icon: 'Mail' }
];
