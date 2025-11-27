import { useCallback } from 'react';
import { FlatList, StyleSheet, SafeAreaView, StatusBar, ListRenderItem } from 'react-native';

import { COLORS, SPACING } from '../constants';
import { ModuleCard, ProgressHeader } from '../components';
import { MODULES_DATA } from '../data';
import { LearningModule } from '../types';
import { useModulesProgress } from '../hooks';

const keyExtractor = (item: LearningModule): string => item.id.toString();

export const GrowthMapScreen = () => {
  const { completedCount, totalCount, progressPercent } = useModulesProgress(MODULES_DATA);

  const renderItem: ListRenderItem<LearningModule> = useCallback(
    ({ item, index }) => <ModuleCard module={item} index={index} />,
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ProgressHeader
        title="Карта развития"
        subtitle="Growth Map"
        completedCount={completedCount}
        totalCount={totalCount}
        progressPercent={progressPercent}
      />

      <FlatList
        data={MODULES_DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    paddingVertical: SPACING.lg,
  },
});
