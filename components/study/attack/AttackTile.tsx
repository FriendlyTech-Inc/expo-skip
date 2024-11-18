// components/study/attack/AttackTile.tsx
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getTileColor } from '@/constants/study/attack';
import type { AttackTile as AttackTileType } from '@/types/attack';
import Colors from '@/constants/Colors';

interface AttackTileProps {
  tile: AttackTileType;
  size: number;
  onPress: (tileId: string) => void;
}

export default function AttackTile({ tile, size, onPress }: AttackTileProps) {
  const backgroundColor = getTileColor(tile.level);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor,
        },
      ]}
      onPress={() => onPress(tile.id)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.number}>{tile.number}</Text>
        {tile.title && <Text style={styles.title} numberOfLines={2}>{tile.title}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
  },
});