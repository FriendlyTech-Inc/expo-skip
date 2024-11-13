// components/home/LearningGraphs/index.tsx
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, UIManager } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Colors from '@/constants/Colors';
import VideoProgress from './VideoProgress';
import AttackProgress from './AttackProgress';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function LearningGraphs() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー部分 */}
      <TouchableOpacity 
        style={styles.header} 
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>今日の学習推移</Text>
        <IconButton
          icon={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          onPress={toggleExpand}
          iconColor={Colors.subText}
        />
      </TouchableOpacity>

      {/* グラフ部分 */}
      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.graphContainer}>
            <Text style={styles.graphTitle}>映像進捗推移</Text>
            <VideoProgress />
          </View>

          <View style={[styles.graphContainer, styles.secondGraph]}>
            <Text style={styles.graphTitle}>Attack5推移</Text>
            <AttackProgress />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  content: {
    overflow: 'hidden',
  },
  graphContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  graphTitle: {
    fontSize: 14,
    color: Colors.subText,
    marginBottom: 12,
  },
  secondGraph: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
});