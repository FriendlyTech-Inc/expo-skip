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
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.25,
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.25,
    lineHeight: 26,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: Colors.subText,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
});