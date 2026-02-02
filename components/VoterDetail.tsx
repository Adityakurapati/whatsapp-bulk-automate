'use client';

import { Card } from '@/components/ui/card';
import { Voter } from '@/lib/types';
import { generateVoterMessage, generateWhatsAppLink } from '@/lib/whatsapp';
import { useState } from 'react';

interface VoterDetailProps {
  voter: Voter | null;
  currentIndex: number;
  totalVoters: number;
  onNext: () => void;
  onPrevious: () => void;
  onMessageSent: (voterId: string, isSent: boolean) => void;
  startingMobileNumber: string;
}

const VoterDetail = ({
  voter,
  currentIndex,
  totalVoters,
  onNext,
  onPrevious,
  onMessageSent,
  startingMobileNumber,
}: VoterDetailProps) => {
  const [isSending, setIsSending] = useState(false);

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

  const message = generateVoterMessage(voter);
  // Safely check if message_sent is true (handle both boolean and string cases)
  const isMessageSent = voter.message_sent === true || voter.message_sent === 'true';

  const handleSendWhatsApp = () => {
    // Check if voter has a mobile number
    if (!voter.mobile) {
      alert('या मतदाराचा मोबाइल नंबर उपलब्ध नाही');
      return;
    }
    
    setIsSending(true);
    const whatsappLink = generateWhatsAppLink(voter.mobile, message);
    window.open(whatsappLink, '_blank');
    
    // After sending message, update the status
    setTimeout(() => {
      onMessageSent(voter.id, true);
      setIsSending(false);
    }, 1000);
  };

  const toggleMessageStatus = () => {
    onMessageSent(voter.id, !isMessageSent);
  };

  return (
    <Card className="p-4 md:p-8 animate-fade-in-scale bg-gradient-to-br from-background to-accent/5 border-2 border-primary/20 shadow-xl flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-6">
          <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-br ${isMessageSent ? 'from-green-500 to-emerald-500' : 'from-primary to-accent'} shadow-lg`}>
            <span className="text-2xl md:text-4xl">{isMessageSent ? '✓' : '📱'}</span>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-xs md:text-sm font-semibold text-muted-foreground mb-2">मतदार</p>
          <h2 className="text-xl md:text-3xl font-bold gradient-text">{voter.name}</h2>
          <p className="text-sm md:text-lg text-muted-foreground mt-2">EPIC: {voter.id}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-3 text-center">
          <p className="text-xs font-semibold text-muted-foreground mb-1">मोबाइल नंबर</p>
          <p className="text-lg md:text-xl font-bold gradient-text">
            {voter.mobile || 'उपलब्ध नाही'}
          </p>
        </div>
      </div>

      <div className="flex-1 mb-6 p-4 bg-gradient-to-br from-accent/10 to-primary/5 rounded-xl overflow-y-auto border-2 border-accent/30">
        <p className="text-xs font-bold text-primary mb-3 flex items-center gap-2">
          <span>📝</span>
          संदेश पूर्वावलोकन
        </p>
        <p className="text-xs md:text-sm whitespace-pre-wrap font-mono text-foreground/80 leading-relaxed">{message}</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Action Buttons Row 1 */}
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="flex-1 font-bold border-2 hover:border-primary hover:bg-primary/5 transition-all bg-transparent text-sm md:text-base p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← मागील
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === totalVoters - 1}
            className="flex-1 font-bold border-2 hover:border-primary hover:bg-primary/5 transition-all bg-transparent text-sm md:text-base p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            पुढील →
          </button>
        </div>

        {/* Action Buttons Row 2 */}
        <div className="flex gap-2">
          {/* Toggle Status Button */}
          <button
            onClick={toggleMessageStatus}
            className={`flex-1 font-bold border-2 text-sm md:text-base p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
              isMessageSent
                ? 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-300 hover:bg-green-500/20'
                : 'border-primary/50 bg-primary/5 text-primary hover:border-primary hover:bg-primary/10'
            }`}
          >
            {isMessageSent ? (
              <>
                <span>❌</span>
                संदेश रद्द करा
              </>
            ) : (
              <>
                <span>✅</span>
                संदेश पाठवला
              </>
            )}
          </button>
          
          <button
            onClick={handleSendWhatsApp}
            disabled={!voter.mobile || isSending}
            className="flex-1 font-bold md:text-base py-4 md:py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300 transform hover:scale-105 animate-pulse-glow text-sm rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
          >
            {isSending ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              <>
                <span className="mr-2">💬</span>
                व्हाट्सअँप पाठवा
              </>
            )}
          </button>
        </div>

        {/* Status Indicator */}
        {isMessageSent && (
          <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg text-center animate-fade-in-scale">
            <p className="text-sm font-bold text-green-700 dark:text-green-300 flex items-center justify-center gap-2">
              <span>✅</span>
              संदेश पाठवला गेला आहे
            </p>
          </div>
        )}
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

export default VoterDetail;