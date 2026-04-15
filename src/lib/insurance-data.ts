import { Heart, Zap, Wallet, Car, Smartphone, Home, Bike, PawPrint, Plane, ShieldAlert } from 'lucide-react';

export interface InsuranceCategory {
  id: string;
  name: string;
  basePrice: number;
  icon: any;
  description: string;
  recommended?: boolean;
  unit: string;
}

export const INSURANCE_CATALOG: InsuranceCategory[] = [
  {
    id: 'vida',
    name: 'Seguro de Vida',
    basePrice: 13,
    icon: Heart,
    description: 'Proteção para quem você ama nos momentos mais difíceis.',
    unit: 'mês'
  },
  {
    id: 'acidentes',
    name: 'Acidentes Pessoais',
    basePrice: 9,
    icon: Zap,
    description: 'Segurança contra imprevistos do dia a dia.',
    unit: 'mês'
  },
  {
    id: 'renda',
    name: 'Proteção de Renda',
    basePrice: 19,
    icon: Wallet,
    description: 'Garanta sua estabilidade financeira em caso de afastamento.',
    unit: 'mês'
  },
  {
    id: 'auto',
    name: 'Seguro Auto',
    basePrice: 39,
    icon: Car,
    description: 'Cobertura completa para o seu veículo.',
    unit: 'mês'
  },
  {
    id: 'celular',
    name: 'Seguro Celular',
    basePrice: 15,
    icon: Smartphone,
    description: 'Proteção contra roubo, furto e quebra acidental.',
    unit: 'mês'
  },
  {
    id: 'residencial',
    name: 'Seguro Residencial',
    basePrice: 12,
    icon: Home,
    description: 'Cuide do seu patrimônio com assistências 24h.',
    unit: 'mês'
  },
  {
    id: 'bike',
    name: 'Seguro Bike/Patinete',
    basePrice: 8,
    icon: Bike,
    description: 'Pedale com tranquilidade pela cidade.',
    unit: 'mês'
  },
  {
    id: 'pet',
    name: 'Seguro Pet',
    basePrice: 29,
    icon: PawPrint,
    description: 'Saúde e bem-estar para o seu melhor amigo.',
    unit: 'mês'
  },
  {
    id: 'viagem',
    name: 'Seguro Viagem',
    basePrice: 5,
    icon: Plane,
    description: 'Assistência médica e bagagem para suas viagens.',
    unit: 'uso'
  },
  {
    id: 'digital',
    name: 'Proteção Digital/Cyber',
    basePrice: 7,
    icon: ShieldAlert,
    description: 'Sua vida online segura e monitorada.',
    unit: 'mês'
  }
];

export const MAPPING_NAME_TO_ID: Record<string, string> = {
  'Seguro de Vida': 'vida',
  'Acidentes Pessoais': 'acidentes',
  'Proteção de Renda': 'renda',
  'Seguro Auto': 'auto',
  'Seguro Celular': 'celular',
  'Seguro Residencial': 'residencial',
  'Seguro Bike/Patinete': 'bike',
  'Seguro Pet': 'pet',
  'Seguro Viagem': 'viagem',
  'Proteção Digital/Cyber': 'digital',
};