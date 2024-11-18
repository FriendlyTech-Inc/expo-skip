// types/attack.ts
export interface AttackTile {
    id: string;
    number: number;
    level: number;  // 1-5
    isCompleted: boolean;
    title?: string;
  }
  
  export interface AttackChapter {
    id: string;
    title: string;
    tiles: AttackTile[];
    progress: number;
  }
  
  // constants/study/attackColors.ts
  export const ATTACK_COLORS = {
    LEVEL_1: '#FFE4E1', // Lightest pink
    LEVEL_2: '#FFB6C1',
    LEVEL_3: '#FF69B4',
    LEVEL_4: '#FF1493',
    LEVEL_5: '#FF0000', // Complete red
  } as const;
  
  // constants/study/attackLevels.ts
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

  export type QuestionType = 'binary' | 'multiple';

export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  choices?: Choice[];  // 4択問題用
  correctAnswer: string | boolean;  // 4択の場合はChoice.id、⭕️❎の場合はboolean
  explanation?: string;
}

export interface QuestionState {
  answer?: string | boolean;
  isCorrect?: boolean;
  isAnswered: boolean;
}