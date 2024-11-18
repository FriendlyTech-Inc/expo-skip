// app/(auth)/login.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '@/constants/Colors';

const AUTH_KEY = 'isAuthenticated';

export default function LoginScreen() {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    Keyboard.dismiss();
    
    if (!studentId || !password) {
      setError('学生番号とパスワードを入力してください 🙇‍♂️');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 開発用の認証
      if (studentId === '1234' && password === 'Pass') {
        await AsyncStorage.setItem(AUTH_KEY, 'true');
        router.replace('/(tabs)');
      } else {
        setError('学生番号またはパスワードが間違っています 🔍');
      }
    } catch (e) {
      setError('ログインに失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>skip</Text>
              <Text style={styles.subText}>skipで実りある学びを</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>学生番号</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={studentId}
                    onChangeText={text => {
                      setStudentId(text);
                      setError('');
                    }}
                    placeholder="学生番号を入力"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    keyboardType="numeric"
                    maxLength={8}
                    editable={!isLoading}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>パスワード</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, { paddingRight: 50 }]}
                    value={password}
                    onChangeText={text => {
                      setPassword(text);
                      setError('');
                    }}
                    placeholder="パスワードを入力"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                  />
                  <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                    <View style={styles.eyeIcon}>
                      <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="rgba(255, 255, 255, 0.8)"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}

              <TouchableWithoutFeedback 
                onPress={handleLogin}
                disabled={isLoading}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>
                    {isLoading ? 'ログイン中...' : 'LOGIN'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              {/* 開発用情報 */}
              {__DEV__ && (
                <Text style={styles.devInfo}>
                  開発用: 1234 / Pass
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 48,
    color: '#ffffff',
    fontWeight: '200',
    letterSpacing: 2,
  },
  subText: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
    fontSize: 14,
    letterSpacing: 1,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#ffffff',
    marginBottom: 8,
    fontSize: 14,
    marginLeft: 4,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
  errorText: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  devInfo: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
  },
});