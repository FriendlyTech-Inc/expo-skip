// /components/study/shared/BaseProgressGraph.tsx を新規作成
import React from 'react';
import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Line, Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import { GRAPH_WIDTH, GRAPH_HEIGHT, PADDING } from '@/constants/graph/dimensions';

interface DataPoint {
  date: string;
  value: number;
  average: number;
}

interface BaseProgressGraphProps {
  data: DataPoint[];
  title: string;
  color: string;
  gradientId: string;
  onPress?: () => void;
}

export default function BaseProgressGraph({
  data,
  title,
  color,
  gradientId,
  onPress,
}: BaseProgressGraphProps) {
  const xScale = (GRAPH_WIDTH - PADDING * 2) / (data.length - 1);
  const maxValue = Math.max(...data.map(d => Math.max(d.value, d.average)));
  const yScale = (GRAPH_HEIGHT - PADDING * 2) / maxValue;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  const createPath = (points: { x: number; y: number }[]) => {
    return points.reduce((path, point, i) => (
      path + `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ), '');
  };

  const valuePoints = data.map((d, i) => ({
    x: PADDING + i * xScale,
    y: GRAPH_HEIGHT - (PADDING + d.value * yScale),
  }));

  const averagePoints = data.map((d, i) => ({
    x: PADDING + i * xScale,
    y: GRAPH_HEIGHT - (PADDING + d.average * yScale),
  }));

  const areaPath = `
    M ${valuePoints[0].x} ${GRAPH_HEIGHT - PADDING}
    L ${createPath(valuePoints).slice(1)}
    L ${valuePoints[valuePoints.length - 1].x} ${GRAPH_HEIGHT - PADDING}
    Z
  `;

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.2" />
            <Stop offset="1" stopColor={color} stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {[0, 25, 50, 75, 100].map((tick) => (
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
              ]}>
              {tick}%
            </Text>
          </React.Fragment>
        ))}

        <Path
          d={areaPath}
          fill={`url(#${gradientId})`}
        />

        <Path
          d={createPath(valuePoints)}
          stroke={color}
          strokeWidth="2.5"
          fill="none"
        />

        <Path
          d={createPath(averagePoints)}
          stroke={Colors.subText}
          strokeWidth="2"
          strokeDasharray="4,4"
          fill="none"
        />

        {valuePoints.map((point, i) => (
          <Circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#fff"
            stroke={color}
            strokeWidth="2"
          />
        ))}

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
            ]}>
            {d.date}
          </Text>
        ))}
      </Svg>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: color }]} />
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    alignSelf: 'flex-start',
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