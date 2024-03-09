import { Address } from './address';

export type Therapy = {
  id: number;
  name: string;
  image: string;
};

export type NotAttendedTherapy = {
  id: number;
  sName: string;
  sAvatarPath: string;
  nSequence: number;
  sAvatarUrl: string;
};

export type Services = {
  id: 'remote' | 'home' | 'inPerson';
  name: string;
  subtitle: string;
  image: any;
};

export type CreateTherapyData = {
  idUser: number;
  idTherapy: number;
  bVirtual: boolean;
  bPresential: boolean;
  nSessionValue: number;
  nSessionDurationInMinutes: number;
  idUserAddress: null | number;
} & Partial<Address>;
