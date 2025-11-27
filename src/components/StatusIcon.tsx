import { memo, useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

import { COLORS, FONT_SIZE, FONT_WEIGHT } from '../constants';
import { ModuleStatus, STATUS_STYLES, STATUS_ICONS } from '../types';

interface StatusIconProps {
  status: ModuleStatus;
}

export const StatusIcon = memo(({ status }: StatusIconProps) => {
  const iconStyle = useMemo<ViewStyle[]>(
    () => [styles.icon, { backgroundColor: STATUS_STYLES[status].iconBackgroundColor }],
    [status]
  );

  return (
    <View style={iconStyle}>
      <Text style={styles.iconText}>{STATUS_ICONS[status]}</Text>
    </View>
  );
});

StatusIcon.displayName = 'StatusIcon';

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
