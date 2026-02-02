'use client';

import { Card } from '@/components/ui/card';
import { Voter } from '@/lib/types';
import { useState, useEffect } from 'react';

interface VoterListProps {
  voters: Voter[];
  onVoterSelect: (voter: Voter, index: number) => void;
  currentIndex: number;
}

export function VoterList({ voters, onVoterSelect, currentIndex }: VoterListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVoters, setFilteredVoters] = useState<Voter[]>(voters);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVoters(voters);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = voters.filter(voter => 
      voter.name?.toLowerCase().includes(query) ||
      voter.mobile?.includes(query) ||
      voter.id?.toLowerCase().includes(query)
    );
    setFilteredVoters(filtered);
  }, [searchQuery, voters]);

  return (
    <div className="flex flex-col h-[300px] md:h-[400px] border-2 border-primary/20 rounded-xl overflow-hidden bg-gradient-to-br from-card to-accent/5 shadow-lg">
      <div className="bg-gradient-to-r from-primary to-accent px-4 md:px-6 py-3 md:py-4 border-b-2 border-primary/30">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-sm md:text-lg">मतदार यादी</h3>
          <span className="bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-white font-semibold text-xs md:text-sm">
            {filteredVoters.length} / {voters.length}
          </span>
        </div>
        
        {/* Search Bar */}
        <div className="mt-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="नाव, मोबाईल किंवा EPIC ID शोधा..."
              className="w-full p-2 pl-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            />
            <span className="absolute left-3 top-2.5 text-white/70">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-white/70 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-xs text-white/70 mt-1">
            मराठी नाव, मोबाईल नंबर किंवा EPIC ID द्वारे शोधा
          </p>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1 scroll-smooth">
        <div className="space-y-2 p-3 md:p-4">
          {filteredVoters.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">कोणतेही मतदार सापडले नाही</p>
              <p className="text-xs text-muted-foreground mt-1">वेगळ्या शोधासाठी प्रयत्न करा</p>
            </div>
          ) : (
            filteredVoters.map((voter, index) => {
              const originalIndex = voters.findIndex(v => v.id === voter.id);
              const isMessageSent = voter.message_sent;
              
              return (
                <Card
                  key={voter.id}
                  className={`p-2 md:p-3 cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                    originalIndex === currentIndex
                      ? 'gradient-primary text-white ring-2 ring-primary/50 shadow-lg shadow-primary/50 scale-105'
                      : isMessageSent
                      ? 'border-green-500/50 bg-green-50 dark:bg-green-900/20 hover:border-green-500'
                      : 'hover:border-primary/50 hover:shadow-md border-transparent hover:border-primary/30'
                  }`}
                  onClick={() => onVoterSelect(voter, originalIndex)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-xs md:text-sm truncate">{voter.name}</p>
                        {isMessageSent && (
                          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">✓</span>
                        )}
                      </div>
                      <p className={`text-xs truncate ${originalIndex === currentIndex ? 'text-white/80' : 'text-muted-foreground'}`}>
                        ID: {voter.id}
                      </p>
                      <p className={`text-xs truncate ${originalIndex === currentIndex ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {voter.mobile}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap ${
                        originalIndex === currentIndex
                          ? 'bg-white/20'
                          : isMessageSent
                          ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {originalIndex + 1}
                      </span>
                      {isMessageSent && (
                        <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">
                          पाठवले
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}