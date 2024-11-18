/**
 * アプリケーション全体で使用される間隔の定数
 */
export const spacing = {
    /** 極小サイズ (4px) - アイコンの内部パディングなど */
    xs: 4,
    /** 小サイズ (8px) - 要素間の最小間隔 */
    sm: 8,
    /** 中サイズ (16px) - 一般的なパディング */
    md: 16,
    /** 大サイズ (24px) - セクション間の間隔 */
    lg: 24,
    /** 特大サイズ (32px) - 大きなセクション間の間隔 */
    xl: 32,
  } as const;
  
  export type SpacingKey = keyof typeof spacing;