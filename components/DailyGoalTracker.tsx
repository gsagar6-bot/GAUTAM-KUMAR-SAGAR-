import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface DailyGoalTrackerProps {
  currentMinutes: number;
  goalMinutes: number;
}

const DailyGoalTracker: React.FC<DailyGoalTrackerProps> = ({ currentMinutes, goalMinutes }) => {
  const progressPercentage = Math.min((currentMinutes / goalMinutes) * 100, 100);
  const isComplete = progressPercentage >= 100;

  return (
    <div className="w-full max-w-sm mx-auto bg-black/20 p-4 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">Today's Goal</h3>
        {isComplete && <CheckIcon className="w-6 h-6 text-green-400" />}
      </div>
      <p className="text-sm text-gray-300 mb-2">
        Meditate for {goalMinutes} minutes.
        {isComplete && <span className="font-bold text-green-400 ml-2">Goal Complete!</span>}
      </p>
      <div className="w-full bg-white/10 rounded-full h-2.5">
        <div 
          className="bg-purple-400 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}>
        </div>
      </div>
       <p className="text-right text-xs text-gray-400 mt-1">{Math.floor(currentMinutes)} / {goalMinutes} min</p>
    </div>
  );
};

export default DailyGoalTracker;
