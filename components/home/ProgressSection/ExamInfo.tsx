// components/home/ProgressSection/ExamInfo.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '@/constants/Colors';

interface ExamInfoProps {
  examDate: string;
  totalDays: number;
  remainingDays: number;
}

export default function ExamInfo({ examDate, totalDays, remainingDays }: ExamInfoProps) {
  const completionRate = ((totalDays - remainingDays) / totalDays) * 100;

  return (
    <View style={styles.container}>
      {/* 試験予定日 */}
      <View style={styles.row}>
        <Text style={styles.label}>試験予定日:</Text>
        <Text style={styles.value}>{examDate}</Text>
      </View>

      {/* プログレスバー */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${completionRate}%` }
            ]} 
          />
        </View>
        <View style={styles.progressValues}>
          <Text style={styles.progressText}>{totalDays}点</Text>
          <Text style={styles.progressText}>{totalDays}点</Text>
        </View>
      </View>

      {/* 目標達成率 */}
      <View style={styles.achievementContainer}>
        <Text style={styles.achievementRate}>1週間後の目標達成率：80%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: Colors.subText,
    marginRight: 8,
  },
  value: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  progressValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: Colors.subText,
  },
  achievementContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  achievementRate: {
    fontSize: 12,
    color: Colors.text,
  },
});