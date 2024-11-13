// components/home/ProgressSection/index.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '@/constants/Colors';
import CircularProgress from './CircularProgress';
import ExamInfo from './ExamInfo';

// 仮のデータ型定義
interface ProgressData {
  videoProgress: number;
  quizProgress: number;
  examDate: string;
  studyScore: number;
  totalDays: number;
  remainingDays: number;
}

// 仮のデータ
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
    <View style={styles.container}>
      {/* 上部の進捗表示 */}
      <View style={styles.progressContainer}>
        {/* 学習進捗率 */}
        <View style={styles.studyScoreContainer}>
          <Text style={styles.label}>学習現在値</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreValue}>{progressData.studyScore}</Text>
            <Text style={styles.scoreUnit}>%</Text>
          </View>
          <Text style={styles.subText}>残日数 {progressData.remainingDays}日</Text>
        </View>

        {/* 進捗サークル */}
        <View style={styles.circlesContainer}>
          <View style={styles.circleWrapper}>
            <CircularProgress
              progress={progressData.videoProgress}
              title="映像進捗率"
              color={Colors.progressChart.video}
            />
          </View>
          <View style={styles.circleWrapper}>
            <CircularProgress
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  studyScoreContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: Colors.subText,
    marginBottom: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.text,
  },
  scoreUnit: {
    fontSize: 16,
    color: Colors.subText,
    marginLeft: 4,
  },
  subText: {
    fontSize: 12,
    color: Colors.subText,
    marginTop: 4,
  },
  circlesContainer: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'flex-end',
  },
  circleWrapper: {
    marginLeft: 16,
  },
});