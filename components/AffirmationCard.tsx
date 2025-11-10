
import React, { useState, useEffect, useCallback } from 'react';
import { fetchAffirmation } from '../services/geminiService';
import { SparkleIcon } from './icons/SparkleIcon';

const AffirmationCard: React.FC = () => {
  const [affirmation, setAffirmation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNewAffirmation = useCallback(async () => {
    setIsLoading(true);
    const newAffirmation = await fetchAffirmation();
    setAffirmation(newAffirmation);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getNewAffirmation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 text-center">
      <SparkleIcon className="w-12 h-12 text-yellow-300 mb-4" />
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Affirmation for Today</h1>
      <div className="w-full h-48 flex items-center justify-center p-4 bg-white/10 rounded-lg shadow-xl mb-6">
        {isLoading ? (
          <div className="animate-pulse text-gray-300">Finding your inner light...</div>
        ) : (
          <p className="text-xl md:text-2xl font-serif italic">"{affirmation}"</p>
        )}
      </div>
      <button
        onClick={getNewAffirmation}
        disabled={isLoading}
        className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'New Affirmation'}
      </button>
    </div>
  );
};

export default AffirmationCard;
