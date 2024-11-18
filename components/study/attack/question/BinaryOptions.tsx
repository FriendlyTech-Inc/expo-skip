// components/study/attack/question/BinaryOptions.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '@/constants/Colors';

interface BinaryOptionsProps {
  selectedAnswer?: boolean;
  correctAnswer?: boolean;
  onSelect: (value: boolean) => void;
  showAnswer: boolean;
  disabled: boolean;
}

export default function BinaryOptions({
  selectedAnswer,
  correctAnswer,
  onSelect,
  showAnswer,
  disabled,
}: BinaryOptionsProps) {
  const getBorderColor = (value: boolean) => {
    if (!showAnswer) {
      return selectedAnswer === value ? Colors.primary : '#e0e0e0';
    }
    if (value === correctAnswer) {
      return Colors.success;
    }
    if (value === selectedAnswer && value !== correctAnswer) {
      return Colors.error;
    }
    return '#e0e0e0';
  };

  const getBackgroundColor = (value: boolean) => {
    if (!showAnswer) {
      return selectedAnswer === value ? `${Colors.primary}15` : '#fff';
    }
    if (value === correctAnswer) {
      return `${Colors.success}15`;
    }
    if (value === selectedAnswer && value !== correctAnswer) {
      return `${Colors.error}15`;
    }
    return '#fff';
  };

  const getFeedbackText = (value: boolean) => {
    if (!showAnswer || value !== selectedAnswer) return null;
    if (value === correctAnswer) {
      return '正解!';
    }
    return '不正解';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          { 
            borderColor: getBorderColor(true),
            backgroundColor: getBackgroundColor(true),
          }
        ]}
        onPress={() => !disabled && onSelect(true)}
        disabled={disabled}
      >
        <View style={styles.content}>
          <Text style={[styles.symbol, { color: getBorderColor(true) }]}>⭕️</Text>
          {getFeedbackText(true) && (
            <Text style={[
              styles.feedback,
              { color: true === correctAnswer ? Colors.success : Colors.error }
            ]}>
              {getFeedbackText(true)}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          {
            borderColor: getBorderColor(false),
            backgroundColor: getBackgroundColor(false),
          }
        ]}
        onPress={() => !disabled && onSelect(false)}
        disabled={disabled}
      >
        <View style={styles.content}>
          <Text style={[styles.symbol, { color: getBorderColor(false) }]}>❌</Text>
          {getFeedbackText(false) && (
            <Text style={[
              styles.feedback,
              { color: false === correctAnswer ? Colors.success : Colors.error }
            ]}>
              {getFeedbackText(false)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  option: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    gap: 8,
  },
  symbol: {
    fontSize: 40,
  },
  feedback: {
    fontSize: 14,
    fontWeight: '600',
  },
});