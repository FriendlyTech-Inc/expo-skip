// components/study/shared/CategoryList.tsx
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Category {
  id: string;
  title: string;
  progress: number;
  subCategories?: {
    id: string;
    title: string;
    progress: number;
  }[];
}

interface CategoryListProps {
  categories: Category[];
  onPressCategory: (categoryId: string) => void;
  expandedCategories?: string[];
  onToggleExpand?: (categoryId: string) => void;
}

export default function CategoryList({
  categories,
  onPressCategory,
  expandedCategories = [],
  onToggleExpand,
}: CategoryListProps) {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={category.id} style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryHeader}
            onPress={() => {
              if (category.subCategories) {
                onToggleExpand?.(category.id);
              } else {
                onPressCategory(category.id);
              }
            }}
            activeOpacity={0.7}
          >
            <View style={styles.categoryTitleContainer}>
              {category.subCategories && (
                <MaterialCommunityIcons
                  name={expandedCategories.includes(category.id) ? 'chevron-down' : 'chevron-right'}
                  size={24}
                  color={Colors.text}
                  style={styles.expandIcon}
                />
              )}
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>{category.progress}%</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.subText} />
            </View>
          </TouchableOpacity>

          {/* サブカテゴリー */}
          {category.subCategories && expandedCategories.includes(category.id) && (
            <View style={styles.subCategoriesContainer}>
              {category.subCategories.map((subCategory) => (
                <TouchableOpacity
                  key={subCategory.id}
                  style={styles.subCategoryItem}
                  onPress={() => onPressCategory(subCategory.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.subCategoryTitle}>{subCategory.title}</Text>
                  <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>{subCategory.progress}%</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.subText} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoryContainer: {
    marginBottom: 1,
    backgroundColor: '#fff',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  categoryTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandIcon: {
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: Colors.subText,
    marginRight: 4,
  },
  subCategoriesContainer: {
    backgroundColor: '#f8f8f8',
  },
  subCategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 48,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  subCategoryTitle: {
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
});