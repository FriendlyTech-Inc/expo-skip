// app/(study)/attack/question/[questionId].tsx
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import QuestionView from '@/components/study/attack/question/QuestionView';
import type { Question, QuestionState } from '@/types/attack';

// モック問題データ
const mockQuestion: Question = {
  id: '1',
  type: 'binary',
  text: '民法の規定及び判例によれば、成年被後見人が成年後見人の事前の同意を得て土地を売却する意思表示を行った場合、成年後見人は、当然意思表示を取り消すことができる。',
  correctAnswer: true,
  explanation: '成年被後見人の保護者である成年後見人の権限として、代理権・取消権は与えられているが、同意権は与えられていない。よって、成年被後見人及び成年後見人は、成年被後見人が成年後見人の同意を得て行った意思表示を取り消すことができる。',
};

export default function QuestionScreen() {
  const router = useRouter();
  const { questionId } = useLocalSearchParams();
  const [state, setState] = useState<QuestionState>({
    isAnswered: false,
  });

  const handleAnswer = useCallback((answer: string | boolean) => {
    setState({
      answer,
      isAnswered: true,
      isCorrect: answer === mockQuestion.correctAnswer,
    });
  }, []);

  const handleNextQuestion = useCallback(() => {
    // モックなので単にバックします
    router.back();
  }, [router]);

  const handleRetry = useCallback(() => {
    setState({ isAnswered: false });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        <QuestionView
          question={mockQuestion}
          state={state}
          onAnswer={handleAnswer}
          showAnswer={state.isAnswered}
        />
      </ScrollView>

      {state.isAnswered && (
        <View style={styles.bottomButtons}>
          <Button
            mode="contained"
            onPress={handleNextQuestion}
            style={styles.button}
            buttonColor={Colors.primary}
          >
            次の問題へ
          </Button>
          <Button
            mode="outlined"
            onPress={handleRetry}
            style={styles.button}
            textColor={Colors.primary}
          >
            もう一度
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bottomButtons: {
    padding: 16,
    backgroundColor: '#fff',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  button: {
    borderRadius: 8,
  },
});