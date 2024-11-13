// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { 
  Platform, 
  View, 
  Animated, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Text, 
  Dimensions,
  Easing,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useState, useRef, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TabLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.OS === 'ios' ? 50 + insets.bottom : 60;

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start(({ finished }) => {
      if (finished) {
        setModalVisible(false);
      }
    });
  };

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  }, [modalVisible]);

  const handleModalPress = () => {
    if (!modalVisible) {
      handleOpenModal();
    } else {
      handleCloseModal();
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: '#999',
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: tabBarHeight,
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 0,
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
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginBottom: Platform.OS === 'ios' ? 0 : 8,
          },
          tabBarIconStyle: {
            marginTop: Platform.OS === 'ios' ? 0 : 8,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: '学習状況',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="study"
          options={{
            title: '',
            tabBarButton: () => (
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TouchableOpacity
                  onPress={handleModalPress}
                  style={{
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? -20 : -30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 68,
                    height: 68,
                    backgroundColor: '#fff',
                    borderRadius: 34,
                    ...Platform.select({
                      ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                      },
                      android: {
                        elevation: 4,
                      },
                    }),
                  }}>
                  <View style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: Colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <MaterialCommunityIcons name="book-open-variant" size={28} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="compass" size={24} color={color} />
            ),
          }}
        />
      </Tabs>

      {modalVisible && (
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: slideAnimation,
            }}
          />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        pointerEvents={modalVisible ? 'auto' : 'none'}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: tabBarHeight + 20,
          paddingHorizontal: 20,
          opacity: slideAnimation,
          transform: [{
            translateY: slideAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [300, 0],
            })
          }],
        }}>
        {/* 新規学習セクション */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
            },
            android: {
              elevation: 8,
            },
          }),
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.progressChart.video,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 56,
            }}
            activeOpacity={0.7}>
            <MaterialCommunityIcons name="play-circle" size={24} color="#fff" style={{ marginRight: 12 }} />
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>映像学習</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 56,
            }}
            activeOpacity={0.7}>
            <MaterialCommunityIcons name="lightning-bolt" size={24} color="#fff" style={{ marginRight: 12 }} />
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Attack5</Text>
          </TouchableOpacity>
        </View>

        {/* 前回の続きセクション */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 20,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
            },
            android: {
              elevation: 8,
            },
          }),
        }}>
          <Text style={{
            fontSize: 15,
            fontWeight: '600',
            color: '#666',
            marginBottom: 16,
          }}>
            前回の続きから学習する
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1.5,
              borderColor: Colors.progressChart.video,
              minHeight: 56,
            }}
            activeOpacity={0.7}>
            <MaterialCommunityIcons 
              name="play-circle" 
              size={24} 
              color={Colors.progressChart.video} 
              style={{ marginRight: 12 }} 
            />
            <Text style={{ color: Colors.progressChart.video, fontSize: 16, fontWeight: '600' }}>映像学習</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1.5,
              borderColor: Colors.primary,
              minHeight: 56,
            }}
            activeOpacity={0.7}>
            <MaterialCommunityIcons 
              name="lightning-bolt" 
              size={24} 
              color={Colors.primary} 
              style={{ marginRight: 12 }} 
            />
            <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: '600' }}>Attack5</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}