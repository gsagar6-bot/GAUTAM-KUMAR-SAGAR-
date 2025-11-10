import React, { useState } from 'react';
import type { Session } from '../types';
import { SESSIONS } from '../constants';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { BrainIcon } from './icons/BrainIcon';

interface MeditationPlayerProps {
  onSessionComplete: (durationInSeconds: number) => void;
}

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ onSessionComplete }) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Timer effect for UI demonstration and progress tracking
  React.useEffect(() => {
    if (!isPlaying || !selectedSession || progress >= 100) {
      return;
    }
    
    const timer = window.setInterval(() => {
        // We use the state value directly here to ensure we have the latest session
        setProgress(currentProgress => {
            const newProgress = currentProgress + (100 / selectedSession.duration);
            if (newProgress >= 100) {
                setIsPlaying(false);
                onSessionComplete(selectedSession.duration);
                return 100;
            }
            return newProgress;
        });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPlaying, selectedSession, onSessionComplete, progress]);


  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setIsPlaying(false);
    setProgress(0);
  };
  
  const handlePlayPause = () => {
    if (!selectedSession) return;
    if (progress >= 100) { // Reset if finished
        setProgress(0);
        setIsPlaying(true);
    } else {
        setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!selectedSession) {
    return (
      <div className="w-full max-w-md text-center">
        <BrainIcon className="w-12 h-12 text-purple-300 mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Choose a Session</h1>
        <div className="space-y-4">
          {SESSIONS.map(session => (
            <button
              key={session.id}
              onClick={() => handleSessionSelect(session)}
              className="w-full p-4 bg-white/10 rounded-lg text-left hover:bg-white/20 transition-all duration-200"
            >
              <h2 className="font-bold text-lg">{session.title}</h2>
              <p className="text-sm text-gray-300">{session.description}</p>
              <p className="text-xs text-gray-400 mt-1">{formatTime(session.duration)}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-center flex flex-col items-center p-4">
        <button onClick={() => setSelectedSession(null)} className="self-start mb-4 text-sm text-gray-300 hover:text-white">&larr; Back to sessions</button>
        <div className="w-48 h-48 rounded-full bg-cover bg-center mb-6 shadow-2xl" style={{backgroundImage: `url(https://picsum.photos/seed/${selectedSession.id}/200)`}}></div>
        <h2 className="text-2xl font-bold">{selectedSession.title}</h2>
        <p className="text-gray-300 mb-6">{selectedSession.description}</p>

        <div className="w-full bg-white/10 rounded-full h-2.5 mb-4">
            <div className="bg-purple-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="w-full flex justify-between text-xs text-gray-400 mb-6">
            <span>{formatTime(Math.min(selectedSession.duration, progress / 100 * selectedSession.duration))}</span>
            <span>{formatTime(selectedSession.duration)}</span>
        </div>

        <button onClick={handlePlayPause} className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-transform transform hover:scale-110">
            {isPlaying ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10 pl-1" />}
        </button>
    </div>
  );
};

export default MeditationPlayer;
