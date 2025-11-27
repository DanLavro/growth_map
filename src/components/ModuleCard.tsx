import { memo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOW } from '../constants';
import { LearningModule, STATUS_STYLES, STATUS_LABELS } from '../types';
import { showAlert } from '../utils';
import { StatusIcon } from './StatusIcon';

interface ModuleCardProps {
  module: LearningModule;
  index: number;
}

export const ModuleCard = memo(({ module, index }: ModuleCardProps) => {
  const { status, title } = module;
  const { backgroundColor, borderColor, textColor } = STATUS_STYLES[status];

  const handlePress = useCallback((): void => {
    switch (status) {
      case 'active':
        console.log('Start lesson');
        break;
      case 'locked':
        showAlert({
          title: 'Урок недоступен',
          message: 'Завершите предыдущие уроки, чтобы разблокировать этот модуль.',
        });
        break;
      case 'done':
        console.log('Lesson already completed');
        break;
    }
  }, [status]);

  const colorStyle = { color: textColor };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor, borderColor }]}
      onPress={handlePress}
      activeOpacity={status === 'locked' ? 0.6 : 0.8}
    >
      <View style={styles.indexContainer}>
        <Text style={[styles.index, colorStyle]}>{index + 1}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, colorStyle]}>{title}</Text>
        <Text style={[styles.statusLabel, colorStyle]}>{STATUS_LABELS[status]}</Text>
      </View>

      <StatusIcon status={status} />
    </TouchableOpacity>
  );
});

ModuleCard.displayName = 'ModuleCard';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xl,
    marginHorizontal: SPACING.xl,
    marginVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    ...SHADOW.card,
  },
  indexContainer: {
    width: SPACING.xxxl,
    height: SPACING.xxxl,
    borderRadius: SPACING.xl,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  index: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    marginBottom: SPACING.xs + 2,
  },
  statusLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    opacity: 0.8,
  },
});
