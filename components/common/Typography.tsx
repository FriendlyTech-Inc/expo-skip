import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import Colors from '@/constants/Colors';

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3'
  | 'subtitle1'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button';

interface TypographyProps extends Omit<TextProps, 'style'> {
  /** タイポグラフィのバリエーション */
  variant?: TypographyVariant;
  /** 子要素 */
  children: React.ReactNode;
  /** カスタムスタイル */
  style?: TextStyle;
  /** テキストカラー */
  color?: string;
  /** 中央揃え */
  center?: boolean;
  /** 太字 */
  bold?: boolean;
}

/**
 * 汎用タイポグラフィコンポーネント
 */
export default function Typography({ 
  variant = 'body1',
  children,
  style,
  color,
  center = false,
  bold = false,
  ...textProps
}: TypographyProps) {
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        center && styles.center,
        bold && styles.bold,
        color && { color },
        style,
      ]}
      {...textProps}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: Colors.text,
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: '700',
  },
  h1: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 44,
  },
  h2: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: 0.25,
    lineHeight: 40,
  },
  h3: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 0.25,
    lineHeight: 36,
  },
  subtitle1: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 32,
  },
  body1: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 32,
  },
  body2: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
  },
  caption: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: Colors.subText,
  },
  button: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 32,
  },
});