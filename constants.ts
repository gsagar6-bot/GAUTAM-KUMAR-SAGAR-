import type { Session } from './types';

export const SESSIONS: Session[] = [
  { id: 1, title: 'Morning Gratitude', duration: 300, description: 'Start your day with a positive mindset.' },
  { id: 2, title: 'Stress Relief', duration: 600, description: 'Release tension and find calm.' },
  { id: 3, title: 'Deep Sleep', duration: 900, description: 'Prepare your mind for restful sleep.' },
  { id: 4, title: 'Focus Boost', duration: 180, description: 'Sharpen your concentration for the task ahead.' },
];

export const Backgrounds: string[] = [
  'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600',
  'bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-600',
  'bg-gradient-to-br from-gray-900 via-teal-900 to-green-600',
  'bg-gradient-to-br from-gray-900 via-indigo-900 to-rose-600',
];

export const DAILY_GOAL_MINUTES = 10;
