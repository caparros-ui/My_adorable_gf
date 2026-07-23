export interface ProvenanceRecord {
  id: string;
  year: number;
  dateString: string;
  owner: string;
  location: string;
  role: 'Artist' | 'Collector' | 'Dealer' | 'Auction House' | 'Museum';
  transactionType: 'Commission' | 'Inheritance' | 'Private Sale' | 'Auction' | 'Donation';
  price?: string;
  priceUSD?: string;
  currencyHistorical?: string;
  documentTitle: string;
  lotNumber?: string;
  transcription: string;
  notes: string;
  catalogId: string;
  buyer?: string;
  seller?: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  type: 'artwork' | 'collector' | 'dealer' | 'museum' | 'artist';
  year: number;
  connectionsCount: number;
  details: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface NetworkLink {
  source: string;
  target: string;
  relationship: string;
  year: number;
  value?: string;
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  startYear: number;
  endYear: number;
}

export interface TimelineEvent {
  year: number;
  title: string;
  subtitle: string;
  recordId: string;
  location: string;
  description: string;
}
