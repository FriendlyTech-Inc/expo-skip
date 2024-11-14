// app/(study)/attack/index.tsx
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import CategoryList from '@/components/study/shared/CategoryList';
import CircleProgress from '@/components/study/shared/CircleProgress';
import { attackCategories } from '@/constants/study/attackCategories';
import Colors from '@/constants/Colors';

export default function AttackIndexScreen() {
  const router = useRouter();

  // 総合進捗の計算
  const totalProgress = 15.0; // 画像の通り15.0%に設定
  const totalQuestions = 1005; // 画像の通り
  const remainingQuestions = 205; // 画像の通り

  const handlePressCategory = (categoryId: string) => {
    router.push(`/attack/${categoryId}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 進捗サークル */}
      <CircleProgress
        title="問題定着率"
        progress={totalProgress}
        progressColor={Colors.primary}
        size={160}
        strokeWidth={12}
        total={totalQuestions}
        remaining={remainingQuestions}
      />

      {/* カテゴリーリスト */}
      <View style={styles.categoriesContainer}>
        <CategoryList
          categories={attackCategories}
          onPressCategory={handlePressCategory}
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