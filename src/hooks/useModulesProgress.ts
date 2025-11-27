import { useMemo } from 'react';

import { LearningModule } from '../types';

interface ModulesProgress {
  completedCount: number;
  totalCount: number;
  progressPercent: number;
}

export const useModulesProgress = (modules: LearningModule[]): ModulesProgress => {
  return useMemo(() => {
    const completedCount = modules.filter((m) => m.status === 'done').length;
    const totalCount = modules.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return { completedCount, totalCount, progressPercent };
  }, [modules]);
};
