export type OpportunityType = 'Local' | 'Nacional';
export type SteamArea = 'Ciencia' | 'Tecnología' | 'Ingeniería' | 'Arte' | 'Matemática';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  area: SteamArea;
  deadline: string;
  externalUrl: string;
  recommendedAffinities: SteamArea[];
  image?: string;
  level: 'Fácil' | 'Intermedio' | 'Avanzado';
  matchScore: number; // 0-100
  matchReason?: string;
  matchLabel?: 'Alta coincidencia' | 'Recomendado para ti' | 'Ideal para tu nivel actual' | 'Sugerido para mejorar tu área débil';
}
