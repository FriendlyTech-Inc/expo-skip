// constants/study/attack.ts
export const ATTACK_COLORS = {
    LEVEL_1: '#FFE4E1' as const, // Lightest pink
    LEVEL_2: '#FFB6C1' as const,
    LEVEL_3: '#FF69B4' as const,
    LEVEL_4: '#FF1493' as const,
    LEVEL_5: '#FF0000' as const, // Complete red
  };
  
  export const ATTACK_LEVELS = {
    MIN: 1,
    MAX: 5,
    COMPLETION_THRESHOLD: 5,
  } as const;
  
  export const getTileColor = (level: number): string => {
    switch (level) {
      case 1:
        return ATTACK_COLORS.LEVEL_1;
      case 2:
        return ATTACK_COLORS.LEVEL_2;
      case 3:
        return ATTACK_COLORS.LEVEL_3;
      case 4:
        return ATTACK_COLORS.LEVEL_4;
      case 5:
        return ATTACK_COLORS.LEVEL_5;
      default:
        return ATTACK_COLORS.LEVEL_1;
    }
  };