// /components/home/LearningGraphs/index.tsx を更新
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, UIManager } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Colors from '@/constants/Colors';
import VideoProgress from './VideoProgress';
import AttackProgress from './AttackProgress';
import * as Haptics from 'expo-haptics';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function LearningGraphs() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
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

      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.graphContainer}>
            <VideoProgress />
          </View>
          <View style={styles.graphContainer}>
            <AttackProgress />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  content: {
    padding: 16,
  },
  graphContainer: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
});