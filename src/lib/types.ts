export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type SkillMastery = {
  stars: 0 | 1 | 2 | 3;
  progress: number; // Percentage 0-100
};

export type Skill = {
  id: 'multiplication' | 'addition_subtraction' | 'fractions' | 'divisibility';
  name: string;
  description: string;
  mastery: SkillMastery;
};

export type UserProgress = {
  xp: number;
  streak: number;
  skillsMastered: number;
  weeklyProgress: { day: string; xp: number }[];
};

export type PracticeMode = {
  id: 'smart-practice' | 'daily-mission' | 'unit-boss';
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
};
