import { Opportunity } from '@/types/opportunity';

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Hackathon de Robótica Escolar',
    description: 'Participa en la competencia nacional de robótica donde podrás diseñar y programar tu propio robot para superar desafíos complejos. Una oportunidad única para conectar con otros entusiastas de la tecnología.',
    type: 'Nacional',
    area: 'Tecnología',
    deadline: '15 de Marzo, 2026',
    externalUrl: 'https://example.com/hackathon',
    recommendedAffinities: ['Tecnología', 'Ingeniería'],
    image: 'https://picsum.photos/seed/robotics/800/400',
    level: 'Intermedio',
    matchScore: 95,
    matchLabel: 'Alta coincidencia',
    matchReason: 'Se alinea perfectamente con tu afinidad dominante en Tecnología y tu creciente interés en Ingeniería.'
  },
  {
    id: '2',
    title: 'Taller de Diseño Sustentable',
    description: 'Aprende a crear soluciones innovadoras utilizando materiales reciclados y principios de diseño ecológico. Este taller combina arte y conciencia ambiental.',
    type: 'Local',
    area: 'Arte',
    deadline: '22 de Marzo, 2026',
    externalUrl: 'https://example.com/taller-diseno',
    recommendedAffinities: ['Arte', 'Ciencia'],
    image: 'https://picsum.photos/seed/design/800/400',
    level: 'Fácil',
    matchScore: 82,
    matchLabel: 'Recomendado para ti',
    matchReason: 'Tu perfil creativo y tu interés por la sostenibilidad hacen de este taller una excelente opción.'
  },
  {
    id: '3',
    title: 'Olimpiada de Matemáticas Avanzadas',
    description: 'Pon a prueba tus habilidades lógicas y de resolución de problemas en esta competencia regional. Ideal para quienes disfrutan de los retos intelectuales.',
    type: 'Nacional',
    area: 'Matemática',
    deadline: '05 de Abril, 2026',
    externalUrl: 'https://example.com/math-olympiad',
    recommendedAffinities: ['Matemática'],
    image: 'https://picsum.photos/seed/math/800/400',
    level: 'Avanzado',
    matchScore: 88,
    matchLabel: 'Ideal para tu nivel actual',
    matchReason: 'Dado tu alto rendimiento en matemáticas, este reto te permitirá llevar tus habilidades al siguiente nivel.'
  },
  {
    id: '4',
    title: 'Exploración de Ecosistemas Locales',
    description: 'Únete a una expedición científica para estudiar la biodiversidad de nuestra región. Aprenderás técnicas de recolección de datos y análisis biológico.',
    type: 'Local',
    area: 'Ciencia',
    deadline: '10 de Abril, 2026',
    externalUrl: 'https://example.com/science-expedition',
    recommendedAffinities: ['Ciencia'],
    image: 'https://picsum.photos/seed/nature/800/400',
    level: 'Intermedio',
    matchScore: 75,
    matchLabel: 'Sugerido para mejorar tu área débil',
    matchReason: 'Esta actividad te ayudará a fortalecer tus habilidades en investigación científica de manera práctica.'
  }
];

export function getRecommendedOpportunities(limit?: number) {
  // In a real app, this would use the scoring logic
  // For now, we return the mock data sorted by matchScore
  const sorted = [...MOCK_OPPORTUNITIES].sort((a, b) => b.matchScore - a.matchScore);
  return limit ? sorted.slice(0, limit) : sorted;
}
