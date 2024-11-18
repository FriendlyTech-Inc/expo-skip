import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';

interface LinearProgressProps {
  progress: number;
  color?: string;
  height?: number;
}

export default function LinearProgress({
  progress,
  color = Colors.primary,
  height = 4,
}: LinearProgressProps) {
  return (
    <View style={[styles.container, { height }]}>
      <View
        style={[
          styles.progress,
          {
            width: `${Math.min(100, Math.max(0, progress * 100))}%`,
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
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 2,
  },
});