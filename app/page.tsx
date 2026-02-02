'use client';

import { useState, useEffect } from 'react';
import { VillageSelector } from '@/components/VillageSelector';
import { VoterList } from '@/components/VoterList';
import { VoterDetail } from '@/components/VoterDetail';
import { ProcessingControls } from '@/components/ProcessingControls'; // Import ProcessingControls

import { Card } from '@/components/ui/card';
import { Voter } from '@/lib/types';

export default function Home() {
  const [selectedVillage, setSelectedVillage] = useState<string>('');
  const [voters, setVoters] = useState<Voter[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('voterAppState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setSelectedVillage(state.village);
        setVoters(state.voters);
        setCurrentIndex(state.index);
        setIsProcessing(state.isProcessing);
        setMobileNumber(state.mobileNumber);
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (selectedVillage && voters.length > 0) {
      const state = {
        village: selectedVillage,
        voters,
        index: currentIndex,
        isProcessing,
        mobileNumber,
      };
      localStorage.setItem('voterAppState', JSON.stringify(state));
    }
  }, [selectedVillage, voters, currentIndex, isProcessing, mobileNumber]);

  const handleVillageSelect = (village: string, votersData: any[]) => {
    setSelectedVillage(village);
    setVoters(votersData);
    setCurrentIndex(0);
  };

  const handleVoterSelect = (voter: Voter, index: number) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < voters.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleStart = (mobile: string) => {
    setMobileNumber(mobile);
    setIsProcessing(true);
    // Auto-navigate to first voter
    setCurrentIndex(0);
  };

  const currentVoter = voters[currentIndex] || null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center animate-slide-in-down">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
            <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <span className="text-2xl md:text-3xl">📱</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black gradient-text">मतदार संपर्क</h1>
          </div>
          <p className="text-sm md:text-lg text-muted-foreground font-semibold">व्हाट्सअँप द्वारे मतदार व्यवस्थापन</p>
          <div className="mt-3 md:mt-4 flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-semibold">
            <span className="px-2 md:px-4 py-1 md:py-2 rounded-full bg-primary/10 text-primary">⚡ संपर्क</span>
            <span className="px-2 md:px-4 py-1 md:py-2 rounded-full bg-secondary/10 text-secondary">🎯 लक्ष्य</span>
            <span className="px-2 md:px-4 py-1 md:py-2 rounded-full bg-accent/10 text-accent">✓ ट्रॅक</span>
          </div>
        </div>

        {/* Village Selector */}
        <VillageSelector
          onVillageSelect={handleVillageSelect}
          isLoading={isLoading}
        />

        {voters.length > 0 && (
          <>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Left Column: Voter List */}
              <div className="min-h-[300px]">
                <VoterList
                  voters={voters}
                  onVoterSelect={handleVoterSelect}
                  currentIndex={currentIndex}
                />
              </div>

              {/* Right Column: Voter Detail and WhatsApp Send */}
              <div className="min-h-[300px]">
                <VoterDetail
                  voter={currentVoter}
                  currentIndex={currentIndex}
                  totalVoters={voters.length}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  startingMobileNumber={mobileNumber}
                />
              </div>
            </div>

            {/* Summary Card */}
            {isProcessing && (
              <Card className="mt-8 p-6 animate-fade-in-scale bg-gradient-to-r from-primary/20 via-accent/15 to-secondary/20 border-2 border-primary/30 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="font-bold text-lg gradient-text">प्रक्रिया संक्षेप</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur border border-primary/20">
                    <p className="text-xs font-semibold text-primary mb-1">गाव</p>
                    <p className="font-bold text-lg">{selectedVillage}</p>
                  </div>
                  <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur border border-secondary/20">
                    <p className="text-xs font-semibold text-secondary mb-1">एकूण मतदार</p>
                    <p className="font-bold text-lg">{voters.length}</p>
                  </div>
                  <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur border border-accent/20">
                    <p className="text-xs font-semibold text-accent mb-1">वर्तमान</p>
                    <p className="font-bold text-lg">मतदार {currentIndex + 1}</p>
                  </div>
                  <div className="p-4 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur border border-primary/20">
                    <p className="text-xs font-semibold text-primary mb-1">मोबाइल नंबर</p>
                    <p className="font-bold text-lg">{mobileNumber}</p>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </main>
  );
}
