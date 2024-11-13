// components/home/LearningGraphs/AttackProgress.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Line, Circle, Path } from 'react-native-svg';
import Colors from '@/constants/Colors';
import { GRAPH_WIDTH, GRAPH_HEIGHT, PADDING } from '@/constants/graph/dimensions';

// 仮のデータ
const data = [
  { date: '6/1', value: 25.5, average: 28.3 },
  { date: '6/8', value: 35.2, average: 38.4 },
  { date: '6/15', value: 48.7, average: 45.6 },
  { date: '6/22', value: 62.1, average: 58.9 },
  { date: '6/29', value: 70.3, average: 65.2 },
];

export default function AttackProgress() {
  const xScale = (GRAPH_WIDTH - PADDING * 2) / (data.length - 1);
  const maxValue = Math.max(...data.map(d => Math.max(d.value, d.average)));
  const yScale = (GRAPH_HEIGHT - PADDING * 2) / maxValue;

  // パスを生成する関数
  const createPath = (points: { x: number, y: number }[]) => {
    return points.reduce((path, point, i) => {
      return path + `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }, '');
  };

  // データポイントの座標を計算
  const valuePoints = data.map((d, i) => ({
    x: PADDING + i * xScale,
    y: GRAPH_HEIGHT - (PADDING + d.value * yScale),
  }));

  const averagePoints = data.map((d, i) => ({
    x: PADDING + i * xScale,
    y: GRAPH_HEIGHT - (PADDING + d.average * yScale),
  }));

  return (
    <View style={styles.container}>
      <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
        {/* Y軸の目盛り線 */}
        {[0, 25, 50, 75, 100].map((tick, i) => (
          <React.Fragment key={tick}>
            <Line
              x1={PADDING}
              y1={GRAPH_HEIGHT - (PADDING + tick * yScale)}
              x2={GRAPH_WIDTH - PADDING}
              y2={GRAPH_HEIGHT - (PADDING + tick * yScale)}
              stroke="#EEEEEE"
              strokeWidth="1"
            />
            <Text
              style={[
                styles.yAxisLabel,
                {
                  position: 'absolute',
                  left: 0,
                  top: GRAPH_HEIGHT - (PADDING + tick * yScale) - 10,
                }
              ]}
            >
              {tick}%
            </Text>
          </React.Fragment>
        ))}

        {/* 実線のパス */}
        <Path
          d={createPath(valuePoints)}
          stroke={Colors.primary}
          strokeWidth="2"
          fill="none"
        />

        {/* 点線のパス */}
        <Path
          d={createPath(averagePoints)}
          stroke={Colors.subText}
          strokeWidth="2"
          strokeDasharray="4,4"
          fill="none"
        />

        {/* データポイントのドット */}
        {valuePoints.map((point, i) => (
          <Circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={Colors.primary}
          />
        ))}

        {/* X軸のラベル */}
        {data.map((d, i) => (
          <Text
            key={i}
            style={[
              styles.xAxisLabel,
              {
                position: 'absolute',
                left: PADDING + i * xScale - 15,
                top: GRAPH_HEIGHT - PADDING + 5,
              }
            ]}
          >
            {d.date}
          </Text>
        ))}
      </Svg>

      {/* 凡例 */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
          <Text style={styles.legendText}>あなた</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { 
            backgroundColor: Colors.subText,
            borderStyle: 'dashed',
            borderWidth: 1,
          }]} />
          <Text style={styles.legendText}>合格者の平均</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  yAxisLabel: {
    fontSize: 10,
    color: Colors.subText,
    width: 30,
    textAlign: 'right',
  },
  xAxisLabel: {
    fontSize: 10,
    color: Colors.subText,
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: Colors.subText,
  },
});