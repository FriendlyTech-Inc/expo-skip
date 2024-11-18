import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '@/components/common/Typography';
import Colors from '@/constants/Colors';
import { spacing } from '@/styles/spacing';
import Card from '@/components/common/Card';

interface ExamInfoProps {
  examDate: string;
  totalDays: number;
  remainingDays: number;
}

export default function ExamInfo({ 
  examDate, 
  totalDays, 
  remainingDays 
}: ExamInfoProps) {
  const completionRate = ((totalDays - remainingDays) / totalDays) * 100;

  return (
    <Card style={styles.container}>
      {/* 試験予定日 */}
      <View style={styles.row}>
        <Typography variant="caption" color={Colors.subText}>
          試験予定日:
        </Typography>
        <Typography variant="body2" style={styles.value}>
          {examDate}
        </Typography>
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
          <Typography variant="caption" color={Colors.subText}>
            {totalDays}点
          </Typography>
          <Typography variant="caption" color={Colors.subText}>
            {totalDays}点
          </Typography>
        </View>
      </View>

      {/* 目標達成率 */}
      <View style={styles.achievementContainer}>
        <Typography 
          variant="body2" 
          color={Colors.text}
          center
        >
          1週間後の目標達成率：80%
        </Typography>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  value: {
    marginLeft: spacing.xs,
  },
  progressBarContainer: {
    marginBottom: spacing.sm,
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
    marginTop: spacing.xs,
  },
  achievementContainer: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
});