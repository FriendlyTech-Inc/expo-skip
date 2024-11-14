// constants/study/mockData.ts

// 共通の型定義
export interface CourseProgress {
    totalItems: number;
    completedItems: number;
    progress: number;
  }
  
  // 映像講座関連の型定義
  export interface VideoLesson {
    id: string;
    title: string;
    duration: string;
    progress: number;
    isCompleted: boolean;
  }
  
  export interface VideoChapter {
    id: string;
    title: string;
    lessons: VideoLesson[];
  }
  
  export interface VideoCourse {
    id: string;
    title: string;
    chapters: VideoChapter[];
    progress: CourseProgress;
  }
  
  // Attack5関連の型定義
  export interface AttackQuestion {
    id: string;
    title: string;
    isCompleted: boolean;
    score?: number;
    lastAttemptDate?: string;
  }
  
  export interface AttackSection {
    id: string;
    title: string;
    questions: AttackQuestion[];
  }
  
  export interface AttackCourse {
    id: string;
    title: string;
    sections: AttackSection[];
    progress: CourseProgress;
  }
  
  // 映像講座のモックデータ
  export const mockVideoCourses: Record<string, VideoCourse> = {
    'hop-1': {
      id: 'hop-1',
      title: '宅建業法 完全攻略',
      progress: {
        totalItems: 24,
        completedItems: 18,
        progress: 75.0,
      },
      chapters: [
        {
          id: '1',
          title: '第1章 宅地建物取引業法の登録',
          lessons: [
            {
              id: '1-1',
              title: '1. 宅地建物取引業法の目的',
              duration: '15:30',
              progress: 100,
              isCompleted: true,
            },
            {
              id: '1-2',
              title: '2. 宅地建物取引業の定義',
              duration: '12:45',
              progress: 60,
              isCompleted: false,
            },
            {
              id: '1-3',
              title: '3. 登録制度の概要',
              duration: '18:20',
              progress: 0,
              isCompleted: false,
            },
          ],
        },
        {
          id: '2',
          title: '第2章 宅地建物取引業者の業務',
          lessons: [
            {
              id: '2-1',
              title: '1. 重要事項の説明',
              duration: '20:15',
              progress: 0,
              isCompleted: false,
            },
            {
              id: '2-2',
              title: '2. 契約書面の交付',
              duration: '16:40',
              progress: 0,
              isCompleted: false,
            },
          ],
        },
      ],
    },
  };
  
  // Attack5のモックデータ
  export const mockAttackCourses: Record<string, AttackCourse> = {
    'rights': {
      id: 'rights',
      title: '権利関係 Attack5',
      progress: {
        totalItems: 50,
        completedItems: 10,
        progress: 20.0,
      },
      sections: [
        {
          id: '1',
          title: '第1章 民法の総則',
          questions: [
            {
              id: '1-1',
              title: '権利能力と行為能力',
              isCompleted: true,
              score: 85,
              lastAttemptDate: '2024-03-15',
            },
            {
              id: '1-2',
              title: '制限行為能力者',
              isCompleted: false,
            },
          ],
        },
        {
          id: '2',
          title: '第2章 物権',
          questions: [
            {
              id: '2-1',
              title: '物権変動',
              isCompleted: false,
            },
            {
              id: '2-2',
              title: '所有権',
              isCompleted: false,
            },
          ],
        },
      ],
    },
  };