import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import CircleProgress from './CircularProgress';
import Card from '@/components/common/Card';
import Typography from '@/components/common/Typography';
import { LinearProgress } from '@/components/common/Progress';

interface ProgressData {
  videoProgress: number;
  quizProgress: number;
  examDate: string;
  studyScore: number;
  elapsedDays: number;
  remainingDays: number;
  totalStudyHours: number;
  totalStudyDays: number;
  weeklyGoal: number;
}

const progressData: ProgressData = {
  videoProgress: 15.0,
  quizProgress: 35.0,
  examDate: '2023/10/15',
  studyScore: 6.5,
  elapsedDays: 15,
  remainingDays: 215,
  totalStudyHours: 1000,
  totalStudyDays: 1000,
  weeklyGoal: 80,
};

export default function ProgressSection() {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h2" style={styles.mainScore}>
          学習現在地 {progressData.studyScore}%
        </Typography>
        
        <View style={styles.progressBar}>
          <LinearProgress 
            progress={progressData.studyScore / 100}
            color={Colors.primary}
            height={8}
          />
        </View>

        <View style={styles.daysContainer}>
          <View style={styles.dayIndicator}>
            <View style={[styles.dayMarker, { backgroundColor: Colors.primary }]} />
            <Typography variant="caption">
              経過日数 {progressData.elapsedDays}日
            </Typography>
          </View>
          <View style={styles.dayIndicator}>
            <View style={[styles.dayMarker, { backgroundColor: Colors.border }]} />
            <Typography variant="caption">
              残り {progressData.remainingDays}日
            </Typography>
          </View>
        </View>
      </View>

      <View style={styles.progressCharts}>
        <View style={styles.circleProgressWrapper}>
          <CircleProgress
            progress={progressData.videoProgress}
            title="映像進捗率"
            color={Colors.progressChart.video}
            size={120}
          />
        </View>
        <View style={styles.circleProgressWrapper}>
          <CircleProgress
            progress={progressData.quizProgress}
            title="問題定着率"
            color={Colors.progressChart.quiz}
            size={120}
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Typography variant="body1" style={styles.examDate}>
          試験予定日：{progressData.examDate}
        </Typography>
        
        <View style={styles.statsGrid}>
          <StatItem label="総学習時間" value={`${progressData.totalStudyHours}時`} />
          <StatItem label="総学習日数" value={`${progressData.totalStudyDays}日`} />
          <StatItem label="1週間継続率" value={`${progressData.weeklyGoal}%`} />
        </View>
      </View>
    </Card>
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
    padding: 16,
    margin: 16,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  header: {
    marginBottom: 24,
  },
  mainScore: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  progressBar: {
    marginBottom: 8,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  progressCharts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  circleProgressWrapper: {
    flex: 1,
    maxWidth: '48%',
  },
  statsContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
  },
  examDate: {
    textAlign: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  }
});