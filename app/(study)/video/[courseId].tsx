// app/(study)/video/[courseId].tsx
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CourseHeader from '@/components/study/shared/CourseHeader';
import ProgressBar from '@/components/study/shared/ProgressBar';
import Colors from '@/constants/Colors';
import { mockVideoCourses } from '@/constants/study/mockData';

export default function VideoCourseDetail() {
  const { courseId } = useLocalSearchParams();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  
  // 該当コースのデータを取得
  const courseData = mockVideoCourses[courseId as string];
  
  if (!courseData) {
    return (
      <View style={styles.container}>
        <Text>コースが見つかりません</Text>
      </View>
    );
  }

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  // レッスンタップ時の処理を追加
  const handleLessonPress = (lessonId: string) => {
    router.push(`/video/player/${lessonId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <CourseHeader
        title={courseData.title}
        progress={courseData.progress.progress}
        totalItems={courseData.progress.totalItems}
        completedItems={courseData.progress.completedItems}
      />

      <View style={styles.chaptersContainer}>
        {courseData.chapters.map((chapter) => (
          <View key={chapter.id} style={styles.chapterContainer}>
            <TouchableOpacity
              style={styles.chapterHeader}
              onPress={() => toggleChapter(chapter.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={
                  expandedChapters.includes(chapter.id)
                    ? 'chevron-down'
                    : 'chevron-right'
                }
                size={24}
                color={Colors.text}
                style={styles.expandIcon}
              />
              <Text style={styles.chapterTitle}>{chapter.title}</Text>
            </TouchableOpacity>

            {expandedChapters.includes(chapter.id) && (
              <View style={styles.lessonsContainer}>
                {chapter.lessons.map((lesson) => (
                  <TouchableOpacity
                    key={lesson.id}
                    style={styles.lessonItem}
                    onPress={() => handleLessonPress(lesson.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.lessonInfo}>
                      <View style={styles.lessonTitleRow}>
                        <MaterialCommunityIcons
                          name={lesson.isCompleted ? 'check-circle' : 'play-circle-outline'}
                          size={20}
                          color={lesson.isCompleted ? Colors.success : Colors.primary}
                          style={styles.lessonIcon}
                        />
                        <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      </View>
                      {lesson.progress > 0 && lesson.progress < 100 && (
                        <View style={styles.progressBarContainer}>
                          <ProgressBar
                            progress={lesson.progress}
                            color={Colors.progressChart.video}
                            height={2}
                          />
                        </View>
                      )}
                    </View>
                    <Text style={styles.lessonDuration}>{lesson.duration}</Text>
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
  chaptersContainer: {
    marginTop: 8,
  },
  chapterContainer: {
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  expandIcon: {
    marginRight: 12,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  lessonsContainer: {
    backgroundColor: '#f8f8f8',
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingLeft: 52,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  lessonInfo: {
    flex: 1,
    marginRight: 16,
  },
  lessonTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonIcon: {
    marginRight: 8,
  },
  lessonTitle: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  lessonDuration: {
    fontSize: 12,
    color: Colors.subText,
  },
});