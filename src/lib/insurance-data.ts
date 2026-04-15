import { Heart, Zap, Wallet, Car, Smartphone, Home, Bike, PawPrint, Plane, ShieldAlert, ShieldCheck, UserCheck, Flame, Lock, Globe, Camera } from 'lucide-react';

export interface Protection {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: any;
  type: 'essential' | 'extra';
}

export interface InsuranceCategory {
  id: string;
  name: string;
  basePrice: number;
  icon: any;
  description: string;
  recommended?: boolean;
  unit: string;
  protections: Protection[];
}

export const INSURANCE_CATALOG: InsuranceCategory[] = [
  {
    id: 'celular',
    name: 'Seguro Celular',
    basePrice: 15,
    icon: Smartphone,
    description: 'Proteção contra roubo, furto e quebra acidental.',
    unit: 'mês',
    protections: [
      { id: 'cel-1', name: 'Danos acidentais', description: 'Reparo ou outro celular', price: 15, icon: Zap, type: 'essential' },
      { id: 'cel-2', name: 'Roubo e furto', description: 'Receba outro celular', price: 12, icon: ShieldAlert, type: 'essential' },
      { id: 'cel-3', name: 'Transações digitais', description: 'Até R$ 5.000,00', price: 8, icon: Lock, type: 'extra' },
      { id: 'cel-4', name: 'Cobertura internacional', description: 'Proteção fora do Brasil', price: 5, icon: Globe, type: 'extra' }
    ]
  },
  {
    id: 'vida',
    name: 'Seguro de Vida',
    basePrice: 13,
    icon: Heart,
    description: 'Proteção para quem você ama nos momentos mais difíceis.',
    unit: 'mês',
    protections: [
      { id: 'vid-1', name: 'Morte natural ou acidental', description: 'Capital para dependentes', price: 13, icon: Heart, type: 'essential' },
      { id: 'vid-2', name: 'Invalidez por acidente', description: 'Proteção para você', price: 7, icon: UserCheck, type: 'essential' },
      { id: 'vid-3', name: 'Assistência funeral', description: 'Apoio total à família', price: 4, icon: ShieldCheck, type: 'extra' },
      { id: 'vid-4', name: 'Doenças graves', description: 'Antecipação do capital', price: 10, icon: Zap, type: 'extra' }
    ]
  },
  {
    id: 'auto',
    name: 'Seguro Auto',
    basePrice: 39,
    icon: Car,
    description: 'Cobertura completa para o seu veículo.',
    unit: 'mês',
    protections: [
      { id: 'aut-1', name: 'Colisão e Danos', description: 'Reparos e perda total', price: 39, icon: Car, type: 'essential' },
      { id: 'aut-2', name: 'Roubo e Furto', description: '100% da tabela FIPE', price: 25, icon: ShieldAlert, type: 'essential' },
      { id: 'aut-3', name: 'Assistência 24h', description: 'Guincho e chaveiro ilimitado', price: 12, icon: Zap, type: 'essential' },
      { id: 'aut-4', name: 'Danos a Terceiros', description: 'Até R$ 50.000,00', price: 15, icon: UserCheck, type: 'extra' },
      { id: 'aut-5', name: 'Carro Reserva', description: '7 ou 15 dias', price: 9, icon: Smartphone, type: 'extra' }
    ]
  },
  {
    id: 'residencial',
    name: 'Seguro Residencial',
    basePrice: 12,
    icon: Home,
    description: 'Cuide do seu patrimônio com assistências 24h.',
    unit: 'mês',
    protections: [
      { id: 'res-1', name: 'Incêndio e Raio', description: 'Danos estruturais', price: 12, icon: Flame, type: 'essential' },
      { id: 'res-2', name: 'Danos Elétricos', description: 'Eletrodomésticos e fiação', price: 8, icon: Zap, type: 'essential' },
      { id: 'res-3', name: 'Roubo e Furto', description: 'Bens dentro de casa', price: 10, icon: Lock, type: 'essential' },
      { id: 'res-4', name: 'Serviços Hidráulicos', description: 'Encanador 24h', price: 5, icon: Home, type: 'extra' },
      { id: 'res-5', name: 'Responsabilidade Civil', description: 'Danos a vizinhos', price: 4, icon: UserCheck, type: 'extra' }
    ]
  }
];

export const MAPPING_NAME_TO_ID: Record<string, string> = {
  'Seguro de Vida': 'vida',
  'Seguro Auto': 'auto',
  'Seguro Celular': 'celular',
  'Seguro Residencial': 'residencial',
};
