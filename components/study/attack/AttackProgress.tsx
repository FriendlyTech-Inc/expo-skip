// components/study/attack/AttackProgress.tsx
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { ATTACK_COLORS } from '@/constants/study/attack';

interface AttackProgressProps {
  title: string;
  progress: number;
}

export default function AttackProgress({ title, progress }: AttackProgressProps) {
  const levelColors = [
    ATTACK_COLORS.LEVEL_1,
    ATTACK_COLORS.LEVEL_2,
    ATTACK_COLORS.LEVEL_3,
    ATTACK_COLORS.LEVEL_4,
    ATTACK_COLORS.LEVEL_5,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressValue}>{progress.toFixed(1)}</Text>
          <Text style={styles.progressUnit}>%</Text>
        </View>
      </View>
      
      <View style={styles.levelIndicator}>
        {levelColors.map((color, index) => (
          <View
            key={index}
            style={[
              styles.levelBox,
              {
                backgroundColor: color,
                opacity: index === 4 ? 1 : 0.7,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
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
  levelIndicator: {
    flexDirection: 'row',
    gap: 8,
  },
  levelBox: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
});