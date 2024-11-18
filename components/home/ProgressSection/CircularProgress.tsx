import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Colors from '@/constants/Colors';
import Typography from '@/components/common/Typography';
import { spacing } from '@/styles/spacing';

interface CircleProgressProps {
  progress: number;
  title: string;
  color: string;
  size?: number;
  strokeWidth?: number;
}

export default function CircleProgress({
  progress,
  title,
  color,
  size = 80,
  strokeWidth = 8,
}: CircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressValue = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (progressValue / 100) * circumference;

  return (
    <View style={styles.container}>
      <Typography variant="caption" style={styles.title}>
        {title}
      </Typography>
      <View style={styles.progressContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={0.2}
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={String(strokeDashoffset)}
            strokeLinecap="round"
            fill="none"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.valueContainer}>
          <Typography variant="body1" style={styles.value}>
            {progressValue.toFixed(1)}
          </Typography>
          <Typography variant="caption" style={styles.unit}>
            %
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: Colors.subText,
    marginBottom: spacing.xs,
  },
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
  valueContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  unit: {
    fontSize: 10,
    color: Colors.subText,
  },
});