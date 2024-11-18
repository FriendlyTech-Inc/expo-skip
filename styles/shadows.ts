import { Platform } from 'react-native';

/**
 * プラットフォーム固有のシャドウスタイルを定義
 */
export const shadows = {
  /** 小さな影 - カード、ボタンなど */
  sm: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  /** 中程度の影 - フローティングボタン、モーダルなど */
  md: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  /** 大きな影 - ドロップダウン、ポップオーバーなど */
  lg: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
} as const;

export type ShadowKey = keyof typeof shadows;