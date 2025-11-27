import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '../constants';

interface ProgressHeaderProps {
  title: string;
  subtitle: string;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
}

export const ProgressHeader = memo(
  ({ title, subtitle, completedCount, totalCount, progressPercent }: ProgressHeaderProps) => (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {completedCount} из {totalCount} модулей ({progressPercent}%)
        </Text>
      </View>
    </View>
  )
);

ProgressHeader.displayName = 'ProgressHeader';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xl,
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: SPACING.md,
    backgroundColor: COLORS.progressBackground,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.progressFill,
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm + 2,
    textAlign: 'center',
  },
});
