export interface Voter {
  id: string;
  name: string;
  age: string;
  booth_number: string;
  booth_center: string;
  gan: string;
  gan_full: string;
  gat: string;
  gender: string;
  mobile: string;
  prabhag_number: string;
  serial_number: number;
  village: string;
  message_sent?: boolean;
  sent_date?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface VillageData {
  [voterKey: string]: Voter;
}
