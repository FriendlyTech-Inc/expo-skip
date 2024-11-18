// components/study/attack/question/QuestionView.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Colors from '@/constants/Colors';
import type { Question, QuestionState } from '@/types/attack';
import BinaryOptions from './BinaryOptions';

interface QuestionViewProps {
  question: Question;
  state: QuestionState;
  onAnswer: (answer: string | boolean) => void;
  showAnswer?: boolean;
}

export default function QuestionView({ 
  question, 
  state, 
  onAnswer,
  showAnswer = false,
}: QuestionViewProps) {
  const renderQuestion = () => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question.text}</Text>
    </View>
  );

  const renderBinaryQuestion = () => (
    <BinaryOptions
      selectedAnswer={state.answer as boolean | undefined}
      correctAnswer={question.correctAnswer as boolean}
      onSelect={onAnswer}
      showAnswer={showAnswer}
      disabled={state.isAnswered}
    />
  );

  const renderMultipleChoice = () => (
    <View style={styles.choicesContainer}>
      {question.choices?.map((choice) => (
        <TouchableOpacity
          key={choice.id}
          style={[
            styles.choiceOption,
            state.answer === choice.id && styles.selectedOption,
            showAnswer && question.correctAnswer === choice.id && styles.correctOption,
          ]}
          onPress={() => onAnswer(choice.id)}
          disabled={state.isAnswered}
        >
          <Text style={styles.choiceText}>{choice.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderExplanation = () => {
    if (!showAnswer || !state.isAnswered) return null;
    
    return (
      <View style={styles.explanationContainer}>
        <Text style={styles.explanationTitle}>解説</Text>
        <Text style={styles.explanationText}>{question.explanation}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionHeader}>
        <Text style={styles.headerText}>
          {question.type === 'binary' ? '正誤問題' : '選択問題'}
        </Text>
      </View>

      {renderQuestion()}
      {question.type === 'binary' ? renderBinaryQuestion() : renderMultipleChoice()}
      {renderExplanation()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  questionHeader: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  questionContainer: {
    padding: 20,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  choicesContainer: {
    padding: 20,
    gap: 12,
  },
  choiceOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  choiceText: {
    fontSize: 16,
    color: Colors.text,
  },
  selectedOption: {
    backgroundColor: '#E8F4FE',
    borderColor: Colors.primary,
  },
  correctOption: {
    backgroundColor: '#E8F7EF',
    borderColor: Colors.success,
  },
  explanationContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text,
  },
});