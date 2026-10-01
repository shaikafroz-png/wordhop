export type NavigationTab = 'grades-and-plan' | 'adventure-map' | 'daily-practice' | 'progress';

export type GradeTrackId = 'grades-1-3' | 'grades-4-6' | 'grades-7-9';

export interface GradeTrack {
  id: GradeTrackId;
  label: string;
  title: string;
  ageRange: string;
  tag?: string;
  color: string;
}

export interface PracticeStep {
  id: number;
  levelNumber: number;
  stepNumber: number;
  totalSteps: number;
  coachName: string;
  coachTopic: string;
  coachPrompt: string;
  sceneImage: string;
  targetVocabulary: string;
  phrase: string;
  phonetics: string;
  tokens: string[];
  correctOrder: string[];
  xp: number;
}

export interface LevelNode {
  id: number;
  levelNumber: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'active' | 'locked';
  stars: number;
  type: 'normal' | 'boss' | 'trophy';
  durationMinutes: number;
  wordsCount: number;
  icon: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlockedAt?: string;
  category: 'speech' | 'streak' | 'vocabulary' | 'challenge';
}

export interface DriveItem {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  updatedAt: string;
  type: 'certificate' | 'audio' | 'report';
  driveUrl?: string;
}
