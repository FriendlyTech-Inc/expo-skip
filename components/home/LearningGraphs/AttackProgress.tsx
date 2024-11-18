// /components/home/LearningGraphs/AttackProgress.tsx を更新
import React from 'react';
import Colors from '@/constants/Colors';
import BaseProgressGraph from '@/components/study/shared/BaseProgressGraph';

// 仮のデータ
const data = [
  { date: '6/1', value: 25.5, average: 28.3 },
  { date: '6/8', value: 35.2, average: 38.4 },
  { date: '6/15', value: 48.7, average: 45.6 },
  { date: '6/22', value: 62.1, average: 58.9 },
  { date: '6/29', value: 70.3, average: 65.2 },
];

export default function AttackProgress() {
  const handlePress = () => {
    // グラフタップ時の処理（必要に応じて実装）
    console.log('Attack progress graph pressed');
  };

  return (
    <BaseProgressGraph
      data={data}
      title="Attack5推移"
      color={Colors.primary}
      gradientId="attackProgressGradient"
      onPress={handlePress}
    />
  );
}