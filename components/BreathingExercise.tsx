
import React, { useState, useEffect } from 'react';
import { LungsIcon } from './icons/LungsIcon';

type BreathingPhase = 'Inhale' | 'Hold' | 'Exhale';

const phaseConfig: Record<BreathingPhase, { duration: number; next: BreathingPhase }> = {
  Inhale: { duration: 4000, next: 'Hold' },
  Hold: { duration: 4000, next: 'Exhale' },
  Exhale: { duration: 6000, next: 'Inhale' },
};

const BreathingExercise: React.FC = () => {
  const [phase, setPhase] = useState<BreathingPhase>('Inhale');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase(phaseConfig[phase].next);
    }, phaseConfig[phase].duration);

    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <LungsIcon className="w-12 h-12 text-cyan-300 mb-4" />
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Mindful Breathing</h1>

      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/10 rounded-full animate-breathe"></div>
        <div className="absolute inset-4 bg-white/10 rounded-full animate-breathe" style={{animationDelay: '0.2s'}}></div>
        <span className="z-10 text-4xl font-bold transition-opacity duration-1000">
          {phase}
        </span>
      </div>
      <p className="mt-8 text-lg text-gray-200 max-w-sm">
        {phase === 'Inhale' && 'Breathe in slowly through your nose for 4 seconds.'}
        {phase === 'Hold' && 'Hold your breath gently for 4 seconds.'}
        {phase === 'Exhale' && 'Exhale completely through your mouth for 6 seconds.'}
      </p>
    </div>
  );
};

export default BreathingExercise;
