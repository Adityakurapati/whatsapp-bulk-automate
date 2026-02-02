import { Voter } from '@/lib/types';

const FIXED_NOMINEE_NAME = 'सौ.मेघाताई प्रशांतदादा भागवत';

export function generateVoterMessage(voter: Voter): string {
  const message = `नाव: ${voter.name}
गण: ${voter.gan}
गण-संपूर्ण: ${voter.gan_full}
गट: ${voter.gat}
वय: ${voter.age}
EPIC ID: ${voter.id}
प्रभाग-भाग क्र.: ${voter.prabhag_number}
अनु. क्र.: ${voter.serial_number}
मतदान केंद्र: ${voter.booth_center}
बूथ क्रमांक: ${voter.booth_number}
गाव: ${voter.village}
लिंग: ${voter.gender}

आपली नम्र: ${FIXED_NOMINEE_NAME}

मतदार यादीत नाव शोधण्याकरिता : https://meghaprashantbhagwat.com`;

  return message;
}

export function encodeMessageForWhatsApp(message: string): string {
  return encodeURIComponent(message);
}

export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  // Check if phoneNumber is defined and is a string
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    console.error('Invalid phone number:', phoneNumber);
    alert('Invalid phone number. Please check the mobile number.');
    return '#';
  }
  
  const encodedMessage = encodeMessageForWhatsApp(message);
  
  // Clean the phone number - remove all non-digit characters
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Check if phone number is valid (should be 10 digits for India)
  if (cleanPhone.length !== 10) {
    console.error('Invalid phone number length:', cleanPhone, 'from original:', phoneNumber);
    alert(`Invalid phone number: ${phoneNumber}. Please enter a 10-digit Indian mobile number.`);
    return '#';
  }
  
  // Format for WhatsApp API: country code + phone number
  const fullPhone = `91${cleanPhone}`;
  
  // Return WhatsApp API link
  return `https://wa.me/${fullPhone}?text=${encodedMessage}`;
}