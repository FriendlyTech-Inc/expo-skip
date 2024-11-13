// app/(auth)/login.tsx
import { StyleSheet, View, Animated, Keyboard, Platform } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native';

const __DEV__ = process.env.NODE_ENV === 'development';

export default function LoginScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScaleAnim = useRef(new Animated.Value(1)).current;

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const keyboardWillShow = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardWillHide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const keyboardShowListener = Keyboard.addListener(keyboardWillShow, () => {
      Animated.timing(logoScaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener(keyboardWillHide, () => {
      Animated.timing(logoScaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    Keyboard.dismiss();
    
    if (!studentId || !password) {
      setError('学生番号とパスワードを入力してください 🙇‍♂️');
      return;
    }

    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (studentId === '1234' && password === 'Pass') {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -30,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        router.replace('/(tabs)');
      });
    } else {
      setError('学生番号またはパスワードが間違っています 🔍');
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: logoScaleAnim }
            ],
          }
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            skip
          </Text>
          <Text style={styles.subText}>
            skipで実りある学びを（サブテキスト）
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>学生番号</Text>
            <TextInput
              value={studentId}
              onChangeText={(text) => {
                setStudentId(text);
                setError('');
              }}
              style={[
                styles.input,
                error && !studentId && styles.inputError
              ]}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              editable={!isLoading}
              maxLength={8}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>パスワード</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError('');
                }}
                secureTextEntry={!showPassword}
                style={[
                  styles.input,
                  styles.passwordInput,
                  error && !password && styles.inputError
                ]}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                editable={!isLoading}
              />
              <IconButton
                icon={showPassword ? 'eye-off' : 'eye'}
                iconColor="#ffffff"
                size={24}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              />
            </View>
          </View>

          {error ? (
            <Animated.Text style={styles.errorText}>{error}</Animated.Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            loading={isLoading}
            disabled={isLoading}
            contentStyle={styles.buttonContent}
            buttonColor="#ffffff"
            textColor="#E75480"
          >
            {isLoading ? 'ログイン中...' : 'LOGIN'}
          </Button>

          {__DEV__ && (
            <Text style={styles.helpText}>
              開発用: 1234 / Pass
            </Text>
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E75480',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    fontSize: 48,
    color: '#ffffff',
    fontWeight: '200',
    letterSpacing: 2,
  },
  subText: {
    color: '#ffffff',
    marginTop: 8,
    opacity: 0.8,
    fontSize: 14,
    letterSpacing: 1,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#ffffff',
    marginBottom: 8,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
    padding: 12,
    color: '#ffffff',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputError: {
    borderColor: '#FFB6C1',
    borderWidth: 2,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: -8,
    top: -8,
  },
  button: {
    marginTop: 32,
    marginBottom: 24,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContent: {
    paddingVertical: 12,  // 8から12に増やして十分な高さを確保
  },
  helpText: {
    textAlign: 'center',
    color: '#ffffff',
    opacity: 0.7,
    fontSize: 12,
  },
  errorText: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 4,
  }
});