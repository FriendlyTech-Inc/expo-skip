// app/(tabs)/index.tsx
import { StyleSheet, View, ScrollView, SafeAreaView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import ProgressSection from '@/components/home/ProgressSection';
import LearningGraphs from '@/components/home/LearningGraphs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          skip
        </Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Section - 進捗セクション */}
        <View style={styles.section}>
          <ProgressSection />
        </View>

        {/* Learning Graphs - 学習グラフセクション */}
        <View style={styles.section}>
          <LearningGraphs />
        </View>

        {/* Continue Learning Section - 前回の続きセクション */}
        <View style={styles.continueSection}>
          <Text style={styles.continueTitle}>前回の続きから学習する</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.continueButton, styles.videoButton]}
              onPress={() => console.log('Video Learning')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons 
                name="play-circle" 
                size={26}
                color={Colors.progressChart.video} 
                style={styles.buttonIcon} 
              />
              <Text style={[
                styles.buttonText, 
                { color: Colors.progressChart.video }
              ]}>
                映像授業
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.continueButton, styles.attackButton]}
              onPress={() => console.log('Attack5')}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons 
                name="lightning-bolt" 
                size={26}
                color={Colors.primary} 
                style={styles.buttonIcon} 
              />
              <Text style={[
                styles.buttonText, 
                { color: Colors.primary }
              ]}>
                Attack5
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '200',
    letterSpacing: 2,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  continueSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  continueTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 4,
  },
  continueButton: {
    flex: 1,
    maxWidth: 160,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    minHeight: 64,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  videoButton: {
    borderColor: Colors.progressChart.video,
    borderWidth: 2,
  },
  attackButton: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});