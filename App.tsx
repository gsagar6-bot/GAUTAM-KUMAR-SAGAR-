
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import BottomNav from './components/BottomNav';
import MeditationPlayer from './components/MeditationPlayer';
import BreathingExercise from './components/BreathingExercise';
import AffirmationCard from './components/AffirmationCard';
import DailyGoalTracker from './components/DailyGoalTracker';
import { Backgrounds, DAILY_GOAL_MINUTES } from './constants';
import type { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Affirm');
  const [meditatedMinutesToday, setMeditatedMinutesToday] = useState<number>(0);

  // Load and manage goal progress from localStorage
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const storedData = localStorage.getItem('meditationGoal');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.date === today) {
          setMeditatedMinutesToday(parsedData.minutes);
        } else {
          // It's a new day, reset the goal
          localStorage.setItem('meditationGoal', JSON.stringify({ minutes: 0, date: today }));
        }
      } else {
        // No data stored yet for today
         localStorage.setItem('meditationGoal', JSON.stringify({ minutes: 0, date: today }));
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  }, []);

  const handleSessionComplete = useCallback((durationInSeconds: number) => {
    const today = new Date().toISOString().split('T')[0];
    setMeditatedMinutesToday(prevMinutes => {
      const newTotalMinutes = prevMinutes + (durationInSeconds / 60);
      try {
        localStorage.setItem('meditationGoal', JSON.stringify({ minutes: newTotalMinutes, date: today }));
      } catch (error) {
         console.error("Failed to save to localStorage:", error);
      }
      return newTotalMinutes;
    });
  }, []);
  
  // Memoize the background to prevent re-rendering on every state change
  const backgroundClass = useMemo(() => {
    return Backgrounds[Math.floor(Math.random() * Backgrounds.length)];
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Meditate':
        return <MeditationPlayer onSessionComplete={handleSessionComplete} />;
      case 'Breathe':
        return <BreathingExercise />;
      case 'Affirm':
        // Fix: Removed stray 'g' character that was causing a syntax error.
        return <AffirmationCard />;
      default:
        return <AffirmationCard />;
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col font-sans text-white ${backgroundClass} transition-all duration-1000`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <main className="flex-grow flex flex-col items-center justify-center p-4 z-10">
        <DailyGoalTracker 
          currentMinutes={meditatedMinutesToday} 
          goalMinutes={DAILY_GOAL_MINUTES} 
        />
        {renderContent()}
      </main>
      <footer className="w-full p-4 z-20">
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </footer>
    </div>
  );
};

export default App;