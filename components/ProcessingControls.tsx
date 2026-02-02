'use client';

import { Card } from '@/components/ui/card';
import { Voter } from '@/lib/types';
import { useState, useEffect } from 'react';

interface ProcessingControlsProps {
  voters: Voter[];
  onStart: (mobileNumber: string) => void;
  isStarted: boolean;
  currentIndex: number;
  selectedVoterMobile?: string;
}

export function ProcessingControls({
  voters,
  onStart,
  isStarted,
  currentIndex,
  selectedVoterMobile,
}: ProcessingControlsProps) {
  const [mobileNumber, setMobileNumber] = useState(selectedVoterMobile || '');

  useEffect(() => {
    if (selectedVoterMobile && !isStarted) {
      setMobileNumber(selectedVoterMobile);
    }
  }, [selectedVoterMobile, isStarted]);

  const handleStart = () => {
    if (!mobileNumber.trim()) {
      alert('कृपया मोबाइल नंबर प्रविष्ट करा');
      return;
    }
    onStart(mobileNumber);
  };

  if (voters.length === 0) {
    return null;
  }

  return (
    <Card className="p-8 mb-6 animate-slide-in-up bg-gradient-to-br from-secondary/15 via-background to-accent/10 border-2 border-secondary/30 shadow-xl">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1">
          <label className="block mb-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-secondary/20">
                <span className="text-2xl">📱</span>
              </div>
              <span className="text-lg font-bold gradient-text">मोबाइल नंबर</span>
            </div>
          </label>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="उदा: 9876543210 किंवा +919876543210"
            disabled={isStarted}
            className="w-full p-3 rounded-lg text-base border-2 border-secondary/20 focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition-all bg-background"
          />
          <p className="text-xs text-muted-foreground mt-3">
            हा नंबर सर्व व्हाट्सअँप संदेशांसाठी वापरला जाईल
          </p>
        </div>

        <button
          onClick={handleStart}
          disabled={isStarted || !mobileNumber.trim() || voters.length === 0}
          className={`gap-2 h-14 px-8 font-bold text-lg transition-all duration-300 rounded-lg ${
            !isStarted && mobileNumber.trim() && voters.length > 0
              ? 'gradient-primary text-white shadow-xl shadow-secondary/50 hover:shadow-2xl hover:shadow-secondary/70 transform hover:scale-105 animate-pulse-glow'
              : 'bg-secondary/50 cursor-not-allowed'
          }`}
        >
          <span className="mr-2">▶</span>
          सुरु करा
        </button>
      </div>

      {isStarted && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl animate-fade-in-scale">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-green-700 dark:text-green-300">
              ✓ प्रक्रिया सक्रिय आहे
            </p>
            <p className="text-lg font-bold gradient-text">
              मतदार {currentIndex + 1} / {voters.length}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}