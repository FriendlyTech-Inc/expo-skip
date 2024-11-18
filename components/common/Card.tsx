import React from 'react';
import { 
  View, 
  StyleSheet, 
  ViewStyle, 
  Pressable, 
  PressableProps,
  Animated,
} from 'react-native';
import { shadows } from '@/styles/shadows';
import { spacing } from '@/styles/spacing';
import Colors from '@/constants/Colors';
import { animations } from '@/styles/animations';

interface CardProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  /** カードの種類 */
  variant?: 'default' | 'elevated';
  /** カスタムスタイル */
  style?: ViewStyle;
  /** パディングを無効にする */
  noPadding?: boolean;
  /** プレスアニメーションを無効にする */
  noAnimation?: boolean;
  /** カードを押下可能にする */
  pressable?: boolean;
}

/**
 * 汎用カードコンポーネント
 */
export default function Card({ 
  children, 
  variant = 'default',
  style,
  noPadding = false,
  noAnimation = false,
  pressable = false,
  onPress,
  ...pressableProps
}: CardProps) {
  // プレスアニメーション用のAnimated.Value
  const scale = React.useRef(new Animated.Value(1)).current;

  // プレス時のアニメーション処理
  const handlePressIn = React.useCallback(() => {
    if (!noAnimation) {
      animations.pressAnimation(scale).start();
    }
  }, [noAnimation, scale]);

  const content = (
    <Animated.View style={[
      styles.base,
      variant === 'elevated' && styles.elevated,
      !noPadding && styles.padding,
      { transform: [{ scale }] },
      style
    ]}>
      {children}
    </Animated.View>
  );

  if (pressable || onPress) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressed
        ]}
        {...pressableProps}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    ...shadows.sm,
  },
  elevated: {
    ...shadows.md,
  },
  padding: {
    padding: spacing.md,
  },
  pressable: {
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
  },
});