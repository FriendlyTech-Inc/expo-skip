// app/(study)/video/index.tsx
import { View, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import CategoryList from '@/components/study/shared/CategoryList';
import CircleProgress from '@/components/study/shared/CircleProgress';
import { videoCategories } from '@/constants/study/videoCategories';
import Colors from '@/constants/Colors';

export default function VideoIndexScreen() {
  const router = useRouter();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // 総合進捗の計算
  const totalProgress = 15.0; // 画像の通り15.0%に設定
  const totalDays = 1005; // 画像の通り
  const remainingDays = 205; // 画像の通り

  const handlePressCategory = (categoryId: string) => {
    router.push(`/video/${categoryId}`);
  };

  const handleToggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 進捗サークル */}
      <CircleProgress
        title="映像進捗率"
        progress={totalProgress}
        progressColor={Colors.progressChart.video}
        size={160}
        strokeWidth={12}
        total={totalDays}
        remaining={remainingDays}
      />

      {/* カテゴリーリスト */}
      <View style={styles.categoriesContainer}>
        <CategoryList
          categories={videoCategories}
          onPressCategory={handlePressCategory}
          expandedCategories={expandedCategories}
          onToggleExpand={handleToggleExpand}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoriesContainer: {
    flex: 1,
    marginTop: 8,
  },
});