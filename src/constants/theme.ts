/**
 * SmartBiz AI - Design System Theme
 * Alta contrasto per uso all'aperto
 */

import '@/global.css';

export const Colors = {
  // Sfondo Principale: Navy / Nero Profondo
  backgroundPrimary: '#0B0F17',
  
  // Card e Container: Dark Slate
  cardBackground: '#161F30',
  
  // Bordi e Separatori: Slate Scuro
  borderSlate: '#233047',
  
  // Colore Primario / Navigazione / FAB: Blu Elettrico
  primaryBlue: '#3B82F6',
  primaryBlueDark: '#2563EB',
  primaryBlueLight: '#60A5FA',
  
  // Stati / Badges
  successGreen: '#10B981',
  warningAmber: '#F59E0B',
  dangerRed: '#EF4444',
  infoIndigo: '#6366F1',
  
  // Testo
  textWhite: '#FFFFFF',
  textGray: '#94A3B8',
  textMuted: '#64748B',
  
  // Gradienti e Accenti
  gradientPrimary: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
  gradientSuccess: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  
  // Opacità
  opacityOverlay: 'rgba(0, 0, 0, 0.7)',
  opacityModal: 'rgba(0, 0, 0, 0.5)',
} as const;

export type ThemeColor = keyof typeof Colors;

/**
 * Spaziatura standardizzata
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Tipografia
 */
export const Typography = {
  h1: { fontSize: 28, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: '600' },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: 'normal' },
  subtitle: { fontSize: 14, fontWeight: '500' },
  caption: { fontSize: 12, fontWeight: '400' },
} as const;

/**
 * Raggi per bordi arrotondati
 */
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
