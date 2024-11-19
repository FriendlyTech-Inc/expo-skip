// components/study/shared/CircleProgress.tsx
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Typography from '@/components/common/Typography';
import Svg, { Circle, G } from 'react-native-svg';
import Colors from '@/constants/Colors';

interface CircleProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  title?: string;
  total?: number;
  remaining?: number;
}

export default function CircleProgress({
  progress,
  size = 140,
  strokeWidth = 12,
  progressColor = Colors.primary,
  backgroundColor = '#F5F5F5',
  title,
  total,
  remaining,
}: CircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circleCircumference = radius * 2 * Math.PI;
  const progressValue = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circleCircumference - (progressValue / 100) * circleCircumference;

  return (
    <View style={styles.container}>
      {title && (
        <Typography variant="subtitle1" style={styles.title}>
          {title}
        </Typography>
      )}
      
      <View style={styles.progressContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          <G rotation="-135" origin={`${size / 2}, ${size / 2}`}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={backgroundColor}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={progressColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </G>
        </Svg>
        <View style={styles.valueContainer}>
          <Typography variant="h2" style={styles.progressValue}>
            {progressValue.toFixed(1)}
          </Typography>
          <Typography variant="caption" style={styles.progressUnit}>
            %
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    margin: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    marginBottom: 16,
  },
  progressContainer: {
    position: 'relative',
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  valueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    lineHeight: 38,
  },
  progressUnit: {
    marginTop: 2,
  },
});