import { Heart, Zap, Wallet, Car, Smartphone, Home, Bike, PawPrint, Plane, ShieldAlert, ShieldCheck, UserCheck, Flame, Lock, Globe, Camera, Briefcase, Syringe, Crosshair, MapPin } from 'lucide-react';

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
    id: 'pet',
    name: 'Seguro Pet',
    basePrice: 25,
    icon: PawPrint,
    description: 'Saúde e tranquilidade para o seu melhor amigo.',
    unit: 'mês',
    protections: [
      { id: 'pet-1', name: 'Consultas e Exames', description: 'Rede credenciada nacional', price: 25, icon: Syringe, type: 'essential' },
      { id: 'pet-2', name: 'Vacinas e Prevenção', description: 'Anual e check-ups', price: 15, icon: ShieldCheck, type: 'essential' },
      { id: 'pet-3', name: 'Cirurgias e Internação', description: 'Cobertura para imprevistos', price: 30, icon: Heart, type: 'extra' },
      { id: 'pet-4', name: 'Responsabilidade Civil', description: 'Danos causados pelo pet', price: 8, icon: UserCheck, type: 'extra' },
      { id: 'pet-5', name: 'Funeral e Cremação', description: 'Apoio no momento difícil', price: 5, icon: Flame, type: 'extra' }
    ]
  },
  {
    id: 'maquinas',
    name: 'Equipamentos de Trabalho',
    basePrice: 18,
    icon: Briefcase,
    description: 'Proteção para suas ferramentas de trabalho e máquinas.',
    unit: 'mês',
    protections: [
      { id: 'maq-1', name: 'Danos Físicos', description: 'Quedas e acidentes externos', price: 18, icon: Zap, type: 'essential' },
      { id: 'maq-2', name: 'Roubo e Furto Qualificado', description: 'Proteção no local de trabalho', price: 15, icon: Lock, type: 'essential' },
      { id: 'maq-3', name: 'Danos Elétricos', description: 'Curto-circuito e raios', price: 10, icon: Flame, type: 'extra' },
      { id: 'maq-4', name: 'Lucros Cessantes', description: 'Diária se a máquina parar', price: 22, icon: Wallet, type: 'extra' }
    ]
  },
  {
    id: 'renda',
    name: 'Renda Protegida (DIT)',
    basePrice: 20,
    icon: Wallet,
    description: 'Garante seu salário se você precisar parar por doença ou acidente.',
    unit: 'mês',
    protections: [
      { id: 'dit-1', name: 'Incapacidade Temporária', description: 'Diárias por afastamento', price: 20, icon: UserCheck, type: 'essential' },
      { id: 'dit-2', name: 'Invalidez Permanente', description: 'Indenização total ou parcial', price: 12, icon: ShieldAlert, type: 'essential' },
      { id: 'dit-3', name: 'Assistência Médica 24h', description: 'Telemedicina inclusa', price: 8, icon: Heart, type: 'extra' }
    ]
  },
  {
    id: 'bike',
    name: 'Bike & Patinete',
    basePrice: 14,
    icon: Bike,
    description: 'Mobilidade segura para o seu dia a dia.',
    unit: 'mês',
    protections: [
      { id: 'bik-1', name: 'Roubo e Furto', description: 'Inclusive fora de casa', price: 14, icon: ShieldAlert, type: 'essential' },
      { id: 'bik-2', name: 'Danos na Tentativa de Roubo', description: 'Reparos e peças', price: 7, icon: Zap, type: 'essential' },
      { id: 'bik-3', name: 'Danos a Terceiros', description: 'Acidentes no trânsito', price: 9, icon: UserCheck, type: 'extra' },
      { id: 'bik-4', name: 'Transporte de Bike', description: 'Danos em transito no carro', price: 5, icon: Car, type: 'extra' }
    ]
  },
  {
    id: 'digital',
    name: 'Proteção Digital',
    basePrice: 9,
    icon: Lock,
    description: 'Segurança para seus dados e transações bancárias.',
    unit: 'mês',
    protections: [
      { id: 'dig-1', name: 'Saques sob Coação', description: 'Reembolso por PIX/Cartão', price: 9, icon: Wallet, type: 'essential' },
      { id: 'dig-2', name: 'Phishing e Fraudes', description: 'Proteção em compras online', price: 12, icon: Globe, type: 'essential' },
      { id: 'dig-3', name: 'Recuperação de Identidade', description: 'Apoio jurídico e técnico', price: 6, icon: UserCheck, type: 'extra' }
    ]
  },
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
    id: 'viagem',
    name: 'Seguro Viagem',
    basePrice: 12,
    icon: Plane,
    description: 'Assistência completa para suas viagens nacionais e internacionais.',
    unit: 'mês',
    protections: [
      { id: 'via-1', name: 'Despesas Médicas', description: 'Até US$ 30.000', price: 12, icon: Heart, type: 'essential' },
      { id: 'via-2', name: 'Extravio de Bagagem', description: 'Indenização imediata', price: 8, icon: Briefcase, type: 'essential' },
      { id: 'via-3', name: 'Atraso de Voo', description: 'Reembolso de gastos', price: 5, icon: Globe, type: 'extra' }
    ]
  }
];

export const MAPPING_NAME_TO_ID: Record<string, string> = {
  'Seguro Pet': 'pet',
  'Equipamentos de Trabalho': 'maquinas',
  'Renda Protegida (DIT)': 'renda',
  'Bike & Patinete': 'bike',
  'Proteção Digital': 'digital',
  'Seguro Celular': 'celular',
  'Seguro Viagem': 'viagem',
};
