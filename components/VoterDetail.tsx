'use client';

import { useState } from "react"

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Voter } from '@/lib/types';
import { generateVoterMessage, generateWhatsAppLink } from '@/lib/whatsapp';

interface VoterDetailProps {
  voter: Voter | null;
  currentIndex: number;
  totalVoters: number;
  onNext: () => void;
  onPrevious: () => void;
  startingMobileNumber: string;
}

export function VoterDetail({
  voter,
  currentIndex,
  totalVoters,
  onNext,
  onPrevious,
  startingMobileNumber,
}: VoterDetailProps) {
  const FIXED_NOMINEE_NAME = 'सौ.मेघाताई प्रशांतदादा भागवत';
  const [nomineeName, setNomineeName] = useState(FIXED_NOMINEE_NAME);

  if (!voter) {
    return (
      <Card className="p-12 text-center bg-gradient-to-br from-accent/10 to-primary/5 border-2 border-dashed border-primary/30">
        <div className="space-y-4">
          <div className="text-4xl">📋</div>
          <p className="text-lg font-semibold text-muted-foreground">एक गाव आणि मतदार निवडा</p>
        </div>
      </Card>
    );
  }

  const message = generateVoterMessage(voter, nomineeName);
  const whatsappLink = generateWhatsAppLink(startingMobileNumber, message);

  const handleSendWhatsApp = () => {
    window.open(whatsappLink, '_blank');
  };

  return (
    <Card className="p-4 md:p-8 animate-fade-in-scale bg-gradient-to-br from-background to-accent/5 border-2 border-primary/20 shadow-xl flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
            <span className="text-2xl md:text-4xl">✓</span>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">मतदार</p>
          <h2 className="text-xl md:text-3xl font-bold gradient-text">{voter.name}</h2>
          <p className="text-sm md:text-lg text-muted-foreground mt-2">EPIC: {voter.id}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-3 text-center">
          <p className="text-xs font-semibold text-muted-foreground mb-1">मोबाइल नंबर</p>
          <p className="text-lg md:text-xl font-bold gradient-text">{voter.mobile}</p>
        </div>
      </div>

      <div className="flex-1 mb-6 p-4 bg-gradient-to-br from-accent/10 to-primary/5 rounded-xl overflow-y-auto border-2 border-accent/30">
        <p className="text-xs font-bold text-primary mb-3 flex items-center gap-2">
          <span>📝</span>
          संदेश पूर्वावलोकन
        </p>
        <p className="text-xs md:text-sm whitespace-pre-wrap font-mono text-foreground/80 leading-relaxed">{message}</p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <Button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="flex-1 md:flex-none font-bold border-2 hover:border-primary hover:bg-primary/5 transition-all bg-transparent text-sm md:text-base"
          >
            ← मागील
          </Button>
          <Button
            onClick={onNext}
            disabled={currentIndex === totalVoters - 1}
            variant="outline"
            className="flex-1 md:flex-none font-bold border-2 hover:border-primary hover:bg-primary/5 transition-all bg-transparent text-sm md:text-base"
          >
            पुढील →
          </Button>
        </div>

        <Button
          onClick={handleSendWhatsApp}
          className="gap-2 font-bold w-full md:w-auto md:text-base py-4 md:py-6 md:px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300 transform hover:scale-105 animate-pulse-glow text-sm"
        >
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          व्हाट्सअँप पाठवा
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t-2 border-primary/10">
        <p className="text-center text-xs md:text-sm font-bold">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            मतदार {currentIndex + 1}
          </span>
          <span className="text-muted-foreground mx-2">/</span>
          <span className="text-muted-foreground font-semibold">{totalVoters}</span>
        </p>
      </div>
    </Card>
  );
}
