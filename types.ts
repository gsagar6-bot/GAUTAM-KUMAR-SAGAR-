
export type Tab = 'Meditate' | 'Breathe' | 'Affirm';

export interface Session {
  id: number;
  title: string;
  duration: number; // in seconds
  description: string;
}

export interface Scene {
  id: string;
  name: string;
  video: string;
  audio: string;
}
