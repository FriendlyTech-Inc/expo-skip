// components/study/shared/ProgressBar.tsx
import { View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  backgroundColor?: string;
}

export default function ProgressBar({
  progress,
  color = Colors.primary,
  height = 4,
  backgroundColor = '#e0e0e0',
}: ProgressBarProps) {
  const progressValue = Math.min(100, Math.max(0, progress));

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <View
        style={[
          styles.progress,
          {
            width: `${progressValue}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 2,
  },
});