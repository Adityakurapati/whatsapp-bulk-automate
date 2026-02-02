'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Voter } from '@/lib/types';

interface VoterListProps {
  voters: Voter[];
  onVoterSelect: (voter: Voter, index: number) => void;
  currentIndex: number;
}

export function VoterList({ voters, onVoterSelect, currentIndex }: VoterListProps) {
  return (
    <div className="flex flex-col h-[300px] md:h-[400px] border-2 border-primary/20 rounded-xl overflow-hidden bg-gradient-to-br from-card to-accent/5 shadow-lg">
      <div className="bg-gradient-to-r from-primary to-accent px-4 md:px-6 py-3 md:py-4 border-b-2 border-primary/30">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-sm md:text-lg">मतदार यादी</h3>
          <span className="bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-white font-semibold text-xs md:text-sm">
            {voters.length}
          </span>
        </div>
      </div>
      <div className="overflow-y-auto flex-1 scroll-smooth">
        <div className="space-y-2 p-3 md:p-4">
          {voters.map((voter, index) => (
            <Card
              key={voter.id}
              className={`p-2 md:p-3 cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                index === currentIndex
                  ? 'gradient-primary text-white ring-2 ring-primary/50 shadow-lg shadow-primary/50 scale-105'
                  : 'hover:border-primary/50 hover:shadow-md border-transparent hover:border-primary/30'
              }`}
              onClick={() => onVoterSelect(voter, index)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-xs md:text-sm truncate">{voter.name}</p>
                  <p className={`text-xs truncate ${index === currentIndex ? 'text-white/80' : 'text-muted-foreground'}`}>
                    ID: {voter.id}
                  </p>
                  <p className={`text-xs truncate ${index === currentIndex ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {voter.mobile}
                  </p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap ${
                  index === currentIndex
                    ? 'bg-white/20'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {index + 1}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
