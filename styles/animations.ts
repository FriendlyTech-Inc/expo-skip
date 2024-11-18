import { Animated, Easing } from 'react-native';

/**
 * アニメーション用のユーティリティ関数群
 */
export const animations = {
  /**
   * フェードインアニメーション
   * @param value Animated.Value
   * @param duration アニメーション時間（ミリ秒）
   */
  fadeIn: (value: Animated.Value, duration = 300) => {
    return Animated.timing(value, {
      toValue: 1,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    });
  },
  
  /**
   * フェードアウトアニメーション
   * @param value Animated.Value
   * @param duration アニメーション時間（ミリ秒）
   */
  fadeOut: (value: Animated.Value, duration = 300) => {
    return Animated.timing(value, {
      toValue: 0,
      duration,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    });
  },
  
  /**
   * 下から上へのスライドアニメーション
   * @param value Animated.Value
   * @param duration アニメーション時間（ミリ秒）
   */
  slideUp: (value: Animated.Value, duration = 300) => {
    return Animated.timing(value, {
      toValue: 0,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    });
  },

  /**
   * タッチ時のプレスアニメーション
   * @param scale Animated.Value
   */
  pressAnimation: (scale: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
    ]);
  },
};

/**
 * アニメーション設定の定数
 */
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    DEFAULT: Easing.ease,
    SMOOTH: Easing.inOut(Easing.ease),
    BOUNCE: Easing.bounce,
  },
} as const;