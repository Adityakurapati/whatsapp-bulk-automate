'use client';

import { useState, useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, child, get } from 'firebase/database';
import { Card } from '@/components/ui/card';
import { Voter } from '@/lib/types';

interface VillageSelectorProps {
  onVillageSelect: (village: string, voters: Voter[]) => void;
}

export function VillageSelector({ onVillageSelect }: VillageSelectorProps) {
  const [selectedVillage, setSelectedVillage] = useState<string>('');
  const [villageLoading, setVillageLoading] = useState(false);

  // Define the fixed list of villages (removed duplicates)
  const villages = [
    "आंबी",
    "इंदोरी",
    "जांभवडे",
    "जांभूळ",
    "नवलाख उंबरे",
    "नानोती तर्फे चाकण",
    "बदलवाडी",
    "ब्राम्हणवाडी (साते)",
    "माळवाडी",
    "मिंडेवाडी",
    "मोहितेवाडी",
    "राजपुरी",
    "वराळे",
    "वारंगवाडी",
    "सांगवी",
    "साते",
    "सुदवडी",
    "सुदुंबरे",
    "सोमाटणे"
  ]


  const handleSelectVillage = async (village: string) => {
    setSelectedVillage(village);
    setVillageLoading(true);
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, village));

      if (snapshot.exists()) {
        const votersData = snapshot.val();
        const votersArray: Voter[] = Object.entries(votersData).map(([key, value]) => {
          const voterObj: Voter = {
            id: key,
            name: '',
            age: '',
            booth_number: '',
            booth_center: '',
            gan: '',
            gan_full: '',
            gat: '',
            gender: '',
            mobile: '',
            prabhag_number: '',
            serial_number: 0,
            village: ''
          };

          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(voterObj, value);
          }
          return voterObj;
        });
        onVillageSelect(village, votersArray);
      } else {
        console.log('No data available for village:', village);
        alert(`"${village}" गावाचा डेटा उपलब्ध नाही`);
      }
    } catch (error) {
      console.error('Error fetching village data:', error);
      alert(`"${village}" गावाचा डेटा लोड करताना त्रुटी`);
    } finally {
      setVillageLoading(false);
    }
  };

  return (
    <Card className="p-8 mb-6 animate-slide-in-down bg-gradient-to-br from-background via-background to-accent/5 border-2 border-primary/20">
      <div className="mb-6">
        <h2 className="text-3xl font-bold gradient-text mb-2">गाव निवडा</h2>
        <p className="text-sm text-muted-foreground">आपला गाव निवडून सुरु करा</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {villages.map((village, index) => (
          <button
            key={village}
            onClick={() => handleSelectVillage(village)}
            disabled={villageLoading}
            className={`text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-105 p-3 rounded-lg border-2 ${selectedVillage === village
                ? 'gradient-primary text-white shadow-lg shadow-primary/50 animate-pulse-glow border-transparent'
                : 'border-primary/20 hover:border-primary/50 hover:shadow-md bg-background'
              }`}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            {villageLoading && selectedVillage === village ? (
              <span className="inline-block animate-spin">⚙️</span>
            ) : (
              village
            )}
          </button>
        ))}
      </div>
    </Card>
  );
}