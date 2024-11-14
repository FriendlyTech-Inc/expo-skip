// components/study/shared/CourseHeader.tsx
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '@/constants/Colors';

interface CourseHeaderProps {
  title: string;
  progress: number;
  totalItems: number;
  completedItems: number;
}

export default function CourseHeader({
  title,
  progress,
  totalItems,
  completedItems,
}: CourseHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressValue}>{progress.toFixed(1)}</Text>
          <Text style={styles.progressUnit}>%</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.itemsContainer}>
          <Text style={styles.itemsText}>
            {completedItems} / {totalItems} 項目
          </Text>
          <Text style={styles.completionText}>完了</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
  },
  progressUnit: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  itemsContainer: {
    flex: 1,
  },
  itemsText: {
    fontSize: 14,
    color: Colors.text,
  },
  completionText: {
    fontSize: 12,
    color: Colors.subText,
    marginTop: 2,
  },
});