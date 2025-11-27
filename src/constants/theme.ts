export const COLORS = {
  // Primary
  white: '#FFFFFF',
  black: '#000000',

  // Text
  textPrimary: '#1A1A1A',
  textSecondary: '#757575',

  // Status: Done
  doneBackground: '#E8F5E9',
  doneBorder: '#4CAF50',
  doneText: '#2E7D32',
  doneIcon: '#4CAF50',

  // Status: Active
  activeBackground: '#FFF3E0',
  activeBorder: '#FF9800',
  activeText: '#E65100',
  activeIcon: '#FF9800',

  // Status: Locked
  lockedBackground: '#F5F5F5',
  lockedBorder: '#BDBDBD',
  lockedText: '#9E9E9E',
  lockedIcon: '#BDBDBD',

  // UI Elements
  border: '#EEEEEE',
  progressBackground: '#EEEEEE',
  progressFill: '#4CAF50',
  shadow: '#000000',
  overlay: 'rgba(255, 255, 255, 0.8)',
} as const;

export const SPACING = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  xxxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
} as const;

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 28,
} as const;

export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const SHADOW = {
  card: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;
