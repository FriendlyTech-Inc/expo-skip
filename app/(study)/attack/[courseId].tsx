// app/(study)/attack/[courseId].tsx
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { useCallback } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import AttackProgress from '@/components/study/attack/AttackProgress';
import AttackTileGrid from '@/components/study/attack/AttackTileGrid';
import type { AttackTile } from '@/types/attack';

// Mock data for demonstration
const mockTiles: AttackTile[] = Array.from({ length: 25 }, (_, i) => ({
  id: `tile-${i + 1}`,
  number: i + 1,
  level: Math.floor(Math.random() * 5) + 1, // Random level for demonstration
  isCompleted: Math.random() > 0.5,
  title: i % 3 === 0 ? `問題 ${i + 1}` : undefined,
}));

export default function AttackCourseDetail() {
  const { courseId } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  // Calculate grid height based on number of rows needed (5 columns)
  const tileSize = (width - 32 - (8 * 4)) / 5; // width - padding - (gaps)
  const rows = Math.ceil(mockTiles.length / 5);
  const gridHeight = rows * tileSize + (rows - 1) * 8; // height + gaps

  const handleTileTap = useCallback((tileId: string) => {
    router.push(`/attack/question/${tileId}`);
  }, [router]);
  
  return (
    <ScrollView style={styles.container}>
      <AttackProgress
        title="アタックカテゴリ名アタックカテゴ 18文字"
        progress={35.5}
      />
      
      <View style={styles.gridContainer}>
        <AttackTileGrid 
          tiles={mockTiles} 
          onPressTile={handleTileTap}  // タップハンドラを追加
        />
      </View>
      
      {/* Add enough padding at the bottom for all tiles to be visible */}
      <View style={{ height: gridHeight + 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gridContainer: {
    marginTop: 8,
  },
});