import { COLORS } from '../constants';

export type ModuleStatus = 'done' | 'active' | 'locked';

export interface LearningModule {
  id: number;
  title: string;
  status: ModuleStatus;
}

export interface StatusStyleConfig {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  iconBackgroundColor: string;
}

export const STATUS_STYLES: Record<ModuleStatus, StatusStyleConfig> = {
  done: {
    backgroundColor: COLORS.doneBackground,
    borderColor: COLORS.doneBorder,
    textColor: COLORS.doneText,
    iconBackgroundColor: COLORS.doneIcon,
  },
  active: {
    backgroundColor: COLORS.activeBackground,
    borderColor: COLORS.activeBorder,
    textColor: COLORS.activeText,
    iconBackgroundColor: COLORS.activeIcon,
  },
  locked: {
    backgroundColor: COLORS.lockedBackground,
    borderColor: COLORS.lockedBorder,
    textColor: COLORS.lockedText,
    iconBackgroundColor: COLORS.lockedIcon,
  },
} as const;

export const STATUS_LABELS: Record<ModuleStatus, string> = {
  done: 'Завершено',
  active: 'Начать урок',
  locked: 'Заблокировано',
} as const;

export const STATUS_ICONS: Record<ModuleStatus, string> = {
  done: '✓',
  active: '▶',
  locked: '🔒',
} as const;
