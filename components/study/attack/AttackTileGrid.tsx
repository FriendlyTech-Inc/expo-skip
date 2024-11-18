// components/study/attack/AttackTileGrid.tsx
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import type { AttackTile as AttackTileType } from '@/types/attack';
import AttackTile from './AttackTile';

interface AttackTileGridProps {
  tiles: AttackTileType[];
  columns?: number;
  onPressTile: (tileId: string) => void; // タップハンドラを追加
}

export default function AttackTileGrid({ 
  tiles, 
  columns = 5,
  onPressTile,
}: AttackTileGridProps) {
  const { width: windowWidth } = useWindowDimensions();
  
  // Calculate tile size based on window width and number of columns
  const padding = 32; // Total horizontal padding
  const gap = 8; // Gap between tiles
  const availableWidth = windowWidth - padding;
  const tileSize = (availableWidth - (gap * (columns - 1))) / columns;

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
                onPress={onPressTile} // タップハンドラを渡す
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
    padding: 16,
  },
  grid: {
    position: 'relative',
    width: '100%',
  },
  tileWrapper: {
    position: 'absolute',
  },
});