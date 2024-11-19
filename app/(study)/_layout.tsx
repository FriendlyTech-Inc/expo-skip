// app/(study)/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Colors from '@/constants/Colors';

export default function StudyLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,  // すべてのスクリーンでデフォルトヘッダーを非表示
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        <Stack.Screen
          name="video/index"
          options={{
            headerShown: true,  // カスタムヘッダーを表示
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: '#fff',
            headerShadowVisible: false,
            title: '映像授業',
          }}
        />
        <Stack.Screen
          name="attack/index"
          options={{
            headerShown: true,  // カスタムヘッダーを表示
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: '#fff',
            headerShadowVisible: false,
            title: 'Attack5',
          }}
        />
        <Stack.Screen
          name="video/[courseId]"
          options={{
            headerShown: true,  // カスタムヘッダーを表示
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: '#fff',
            headerShadowVisible: false,
            title: '授業一覧',
          }}
        />
        <Stack.Screen
          name="attack/[courseId]"
          options={{
            headerShown: true,  // カスタムヘッダーを表示
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: '#fff',
            headerShadowVisible: false,
            title: '問題一覧',
          }}
        />
      </Stack>
    </View>
  );
}