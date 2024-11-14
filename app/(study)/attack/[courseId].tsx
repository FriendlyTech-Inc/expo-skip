// app/(study)/attack/[courseId].tsx
import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CourseHeader from '@/components/study/shared/CourseHeader';
import Colors from '@/constants/Colors';
import { mockAttackCourses } from '@/constants/study/mockData';

export default function AttackCourseDetail() {
  const { courseId } = useLocalSearchParams();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  // 該当コースのデータを取得
  const courseData = mockAttackCourses[courseId as string];
  
  if (!courseData) {
    return (
      <View style={styles.container}>
        <Text>コースが見つかりません</Text>
      </View>
    );
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <CourseHeader
        title={courseData.title}
        progress={courseData.progress.progress}
        totalItems={courseData.progress.totalItems}
        completedItems={courseData.progress.completedItems}
      />

      <View style={styles.sectionsContainer}>
        {courseData.sections.map((section) => (
          <View key={section.id} style={styles.sectionContainer}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={
                  expandedSections.includes(section.id)
                    ? 'chevron-down'
                    : 'chevron-right'
                }
                size={24}
                color={Colors.text}
                style={styles.expandIcon}
              />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </TouchableOpacity>

            {expandedSections.includes(section.id) && (
              <View style={styles.questionsContainer}>
                {section.questions.map((question) => (
                  <TouchableOpacity
                    key={question.id}
                    style={styles.questionItem}
                    onPress={() => {
                      // TODO: 問題画面への遷移
                      console.log('Navigate to question:', question.id);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.questionInfo}>
                      <View style={styles.questionTitleRow}>
                        <MaterialCommunityIcons
                          name={question.isCompleted ? 'check-circle' : 'lightning-bolt'}
                          size={20}
                          color={question.isCompleted ? Colors.success : Colors.primary}
                          style={styles.questionIcon}
                        />
                        <Text style={styles.questionTitle}>{question.title}</Text>
                      </View>
                      {question.isCompleted && question.score !== undefined && (
                        <View style={styles.scoreContainer}>
                          <Text style={[
                            styles.scoreText,
                            { color: question.score >= 80 ? Colors.success : Colors.subText }
                          ]}>
                            スコア: {question.score}点
                          </Text>
                          <Text style={styles.dateText}>
                            最終受講: {question.lastAttemptDate}
                          </Text>
                        </View>
                      )}
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color={Colors.subText}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionsContainer: {
    marginTop: 8,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  expandIcon: {
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  questionsContainer: {
    backgroundColor: '#f8f8f8',
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingLeft: 52,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  questionInfo: {
    flex: 1,
    marginRight: 16,
  },
  questionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionIcon: {
    marginRight: 8,
  },
  questionTitle: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  scoreContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 12,
    marginRight: 8,
  },
  dateText: {
    fontSize: 12,
    color: Colors.subText,
  },
});