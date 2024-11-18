import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import CircleProgress from './CircularProgress';
import ExamInfo from './ExamInfo';
import Card from '@/components/common/Card';
import Typography from '@/components/common/Typography';
import { spacing } from '@/styles/spacing';
import { shadows } from '@/styles/shadows';

interface ProgressData {
  videoProgress: number;
  quizProgress: number;
  examDate: string;
  studyScore: number;
  totalDays: number;
  remainingDays: number;
}

const progressData: ProgressData = {
  videoProgress: 15.0,
  quizProgress: 35.0,
  examDate: '2023/10/15',
  studyScore: 6.5,
  totalDays: 1000,
  remainingDays: 1000,
};

export default function ProgressSection() {
  return (
    <Card variant="elevated" style={styles.container}>
      {/* 上部の進捗表示 */}
      <View style={styles.progressContainer}>
        {/* 学習進捗率 */}
        <View style={styles.studyScoreContainer}>
          <Typography variant="caption" style={styles.label}>
            学習現在値
          </Typography>
          <View style={styles.scoreRow}>
            <Typography variant="h1" color={Colors.text} style={styles.scoreValue}>
              {progressData.studyScore}
            </Typography>
            <Typography 
              variant="body2" 
              color={Colors.subText}
              style={styles.scoreUnit}
            >
              %
            </Typography>
          </View>
          <Typography variant="caption" style={styles.subText}>
            残日数 {progressData.remainingDays}日
          </Typography>
        </View>

        {/* 進捗サークル */}
        <View style={styles.circlesContainer}>
          <View style={styles.circleWrapper}>
            <CircleProgress
              progress={progressData.videoProgress}
              title="映像進捗率"
              color={Colors.progressChart.video}
            />
          </View>
          <View style={styles.circleWrapper}>
            <CircleProgress
              progress={progressData.quizProgress}
              title="問題定着率"
              color={Colors.progressChart.quiz}
            />
          </View>
        </View>
      </View>

      {/* 試験情報 */}
      <ExamInfo
        examDate={progressData.examDate}
        totalDays={progressData.totalDays}
        remainingDays={progressData.remainingDays}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    padding: spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  studyScoreContainer: {
    flex: 1,
  },
  label: {
    marginBottom: spacing.xs,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    lineHeight: 38,
  },
  scoreUnit: {
    marginLeft: spacing.xs,
  },
  subText: {
    marginTop: spacing.xs,
  },
  circlesContainer: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
  circleWrapper: {
    ...shadows.sm,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: spacing.sm,
  },
});