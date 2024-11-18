import React from 'react';
import { View, StyleSheet, useWindowDimensions, LayoutAnimation, Platform, UIManager } from 'react-native';
import type { AttackTile as AttackTileType } from '@/types/attack';
import AttackTile from './AttackTile';
import { spacing } from '@/styles/spacing';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AttackTileGridProps {
  tiles: AttackTileType[];
  columns?: number;
  onPressTile: (tileId: string) => void;
}

export default function AttackTileGrid({ 
  tiles, 
  columns = 5,
  onPressTile,
}: AttackTileGridProps) {
  const { width: windowWidth } = useWindowDimensions();
  
  // Calculate tile size based on window width and number of columns
  const padding = spacing.xl * 2; // Total horizontal padding
  const gap = spacing.sm; // Gap between tiles
  const availableWidth = windowWidth - padding;
  const tileSize = (availableWidth - (gap * (columns - 1))) / columns;

  React.useEffect(() => {
    // Animate layout changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [tiles]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {tiles.map((tile, index) => {
          // Calculate row and column position
          const row = Math.floor(index / columns);
          const col = index % columns;
          
          return (
            <View
              key={tile.id}
              style={[
                styles.tileWrapper,
                {
                  left: col * (tileSize + gap),
                  top: row * (tileSize + gap),
                  width: tileSize,
                  height: tileSize,
                },
              ]}
            >
              <AttackTile
                tile={tile}
                size={tileSize}
                onPress={onPressTile}
              />
            </View>
          );
        })}
      </View>
      
      {/* Add a view for total height calculation */}
      <View style={{
        height: Math.ceil(tiles.length / columns) * (tileSize + gap) - gap
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  grid: {
    position: 'relative',
    width: '100%',
  },
  tileWrapper: {
    position: 'absolute',
  },
});