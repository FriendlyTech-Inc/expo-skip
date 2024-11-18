import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '@/components/common/Typography';
import Colors from '@/constants/Colors';

interface ExamInfoProps {
  examDate: string;
  totalStudyHours: number;
  totalStudyDays: number;
  weeklyGoal: number;
}

export default function ExamInfo({
  examDate,
  totalStudyHours,
  totalStudyDays,
  weeklyGoal,
}: ExamInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.examDate}>
        <Typography variant="body2" color={Colors.primary}>
          試験予定日：{examDate}
        </Typography>
      </View>
      
      <View style={styles.stats}>
        <StatItem
          label="総学習時間"
          value={`${totalStudyHours}時`}
        />
        <StatItem
          label="総学習日数"
          value={`${totalStudyDays}日`}
        />
        <StatItem
          label="1週間継続率"
          value={`${weeklyGoal}%`}
        />
      </View>
    </View>
  );
}

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statItem}>
    <Typography variant="caption" color={Colors.subText}>
      {label}
    </Typography>
    <Typography variant="h3" color={Colors.primary}>
      {value}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
  },
  examDate: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
statItem: {
alignItems: 'center',
},
});