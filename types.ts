export type TransportMode = 'train' | 'bus' | 'walk' | 'taxi' | 'shinkansen';

export interface ItineraryItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  title: string;
  duration: string;
  travelTime?: string; // Google Maps estimate
  location: string;
  transport: TransportMode;
  notes?: string;
  link?: string;
  photo?: string;
}

export interface ProductRecommendation {
  id: string;
  region: 'Kyoto' | 'Osaka' | 'Tokyo';
  nameCN: string;
  nameJP: string;
  price: string;
  description: string;
  image?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: string;
  location: string; // Where to buy
  checked: boolean;
}

export interface TranslationItem {
  category: string;
  cn: string;
  jp: string;
  pronunciation: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  currency: 'JPY' | 'MYR';
  notes?: string;
}

export interface Member {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // Member ID
  splitAmong: string[]; // Array of Member IDs
  date: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  location: string;
}
