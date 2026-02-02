import { Voter } from '@/lib/types';

const FIXED_NOMINEE_NAME = 'सौ.मेघाताई प्रशांतदादा भागवत';

export function generateVoterMessage(voter: Voter, _nomineeName?: string): string {
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
  const encodedMessage = encodeMessageForWhatsApp(message);
  // Remove +91 prefix if present and ensure proper formatting
  const cleanPhone = phoneNumber.replace(/^(\+91|91)/, '');
  const fullPhone = `91${cleanPhone}`;
  return `https://wa.me/${fullPhone}?text=${encodedMessage}`;
}
