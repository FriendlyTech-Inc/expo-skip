import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '@/components/common/Typography';
import Svg, { Circle } from 'react-native-svg';
import Colors from '@/constants/Colors';

interface CircleProgressProps {
  progress: number;
  title: string;
  color: string;
  size?: number;
}

export default function CircleProgress({
  progress,
  title,
  color,
  size = 120,
}: CircleProgressProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Typography 
        variant="body1" 
        color={Colors.subText}
        style={styles.title}
      >
        {title}
      </Typography>
      <View style={styles.progressContainer}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F5F5F5"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.valueContainer}>
          <Typography 
            variant="h2" 
            color={color}
            style={styles.value}
          >
            {progress.toFixed(1)}
          </Typography>
          <Typography 
            variant="body2" 
            color={Colors.subText}
            style={styles.unit}
          >
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
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
  },
  title: {
    marginBottom: 12,
  },
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  value: {
    fontWeight: '700',
  },
  unit: {
    marginTop: 2,
  },
});