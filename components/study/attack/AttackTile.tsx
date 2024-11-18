import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import Typography from '@/components/common/Typography';
import { getTileColor } from '@/constants/study/attack';
import type { AttackTile as AttackTileType } from '@/types/attack';
import { shadows } from '@/styles/shadows';
import { spacing } from '@/styles/spacing';
import { animations } from '@/styles/animations';

interface AttackTileProps {
  tile: AttackTileType;
  size: number;
  onPress: (tileId: string) => void;
}

export default function AttackTile({ tile, size, onPress }: AttackTileProps) {
  const backgroundColor = getTileColor(tile.level);
  const scale = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(tile.id)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            backgroundColor,
            transform: [{ scale }],
            opacity: tile.isCompleted ? 1 : 0.85,
          },
        ]}
      >
        <View style={styles.content}>
          <Typography 
            variant="h2"
            style={styles.number}
            color="#fff"
          >
            {tile.number}
          </Typography>
          {tile.title && (
            <Typography 
              variant="caption"
              style={styles.title}
              color="#fff"
              numberOfLines={2}
            >
              {tile.title}
            </Typography>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  number: {
    fontSize: 20,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});