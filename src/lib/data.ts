import {
  Sparkles,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react';
import type { User, Skill, UserProgress, PracticeMode } from './types';

export const mockUser: User = {
  id: 'user_1',
  name: 'Alex',
  avatarUrl: 'https://picsum.photos/seed/123/40/40',
};

export const mockSkills: Skill[] = [
  {
    id: 'multiplication',
    name: 'Multiplication Tables',
    description: 'Facts, missing factors, and more.',
    mastery: { stars: 2, progress: 75 },
  },
  {
    id: 'addition_subtraction',
    name: 'Two-Digit +/-',
    description: 'Practice with and without carrying.',
    mastery: { stars: 3, progress: 100 },
  },
  {
    id: 'fractions',
    name: 'Fractions',
    description: 'Equivalence, simplifying, and operations.',
    mastery: { stars: 1, progress: 40 },
  },
  {
    id: 'divisibility',
    name: 'Divisibility Rules',
    description: 'Learn the rules for 2, 3, 5, and more.',
    mastery: { stars: 0, progress: 15 },
  },
];

export const mockUserProgress: UserProgress = {
  xp: 12540,
  streak: 14,
  skillsMastered: 1,
  weeklyProgress: [
    { day: 'Mon', xp: 150 },
    { day: 'Tue', xp: 220 },
    { day: 'Wed', xp: 180 },
    { day: 'Thu', xp: 300 },
    { day: 'Fri', xp: 250 },
    { day: 'Sat', xp: 120 },
    { day: 'Sun', xp: 80 },
  ],
};

export const practiceModes: PracticeMode[] = [
    {
        id: 'smart-practice',
        title: 'Smart Practice',
        description: 'Adaptive challenges in a skill of your choice.',
        icon: Sparkles,
        href: '/practice'
    },
    {
        id: 'daily-mission',
        title: 'Daily Mission',
        description: 'A quick mix of skills to keep your mind sharp.',
        icon: CalendarCheck,
        href: '/practice'
    },
    {
        id: 'unit-boss',
        title: 'Unit Boss',
        description: 'Prove your mastery and earn the final star!',
        icon: ShieldCheck,
        href: '/practice'
    }
]
