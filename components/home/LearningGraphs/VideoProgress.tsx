// /components/home/LearningGraphs/VideoProgress.tsx を更新
import React from 'react';
import Colors from '@/constants/Colors';
import BaseProgressGraph from '@/components/study/shared/BaseProgressGraph';

// 仮のデータ
const data = [
  { date: '6/1', value: 25.5, average: 28.3 },
  { date: '6/8', value: 32.1, average: 35.2 },
  { date: '6/15', value: 45.6, average: 42.1 },
  { date: '6/22', value: 58.3, average: 55.4 },
  { date: '6/29', value: 65.8, average: 62.7 },
];

export default function VideoProgress() {
  const handlePress = () => {
    // グラフタップ時の処理（必要に応じて実装）
    console.log('Video progress graph pressed');
  };

  return (
    <BaseProgressGraph
      data={data}
      title="映像進捗推移"
      color={Colors.progressChart.video}
      gradientId="videoProgressGradient"
      onPress={handlePress}
    />
  );
}