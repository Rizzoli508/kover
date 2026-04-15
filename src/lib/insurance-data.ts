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
    id: 'vida',
    name: 'Seguro de Vida',
    basePrice: 15,
    icon: Heart,
    description: 'Tranquilidade financeira para você e quem você ama.',
    unit: 'mês',
    protections: [
      { id: 'vid-1', name: 'Morte Natural ou Acidental', description: 'Indenização para beneficiários', price: 15, icon: ShieldCheck, type: 'essential' },
      { id: 'vid-2', name: 'Invalidez por Acidente', description: 'Pagamento em vida ao segurado', price: 10, icon: ShieldAlert, type: 'essential' },
      { id: 'vid-3', name: 'Doenças Graves', description: 'Auxílio para tratamentos', price: 18, icon: Syringe, type: 'extra' },
      { id: 'vid-4', name: 'Assistência Funeral', description: 'Suporte completo à família', price: 5, icon: Flame, type: 'extra' }
    ]
  },
  {
    id: 'auto',
    name: 'Seguro Auto',
    basePrice: 45,
    icon: Car,
    description: 'Proteção completa para o seu veículo contra imprevistos.',
    unit: 'mês',
    protections: [
      { id: 'aut-1', name: 'Roubo e Furto', description: 'Cobertura de 100% da FIPE', price: 45, icon: Lock, type: 'essential' },
      { id: 'aut-2', name: 'Colisão e Danos a Terceiros', description: 'Até R$ 50.000,00', price: 35, icon: ShieldAlert, type: 'essential' },
      { id: 'aut-3', name: 'Carro Reserva', description: '7 ou 15 dias de uso', price: 12, icon: Car, type: 'extra' },
      { id: 'aut-4', name: 'Cobertura de Vidros', description: 'Troca de parabrisas e faróis', price: 8, icon: Camera, type: 'extra' }
    ]
  },
  {
    id: 'pet',
    name: 'Seguro Pet',
    basePrice: 25,
    icon: PawPrint,
    description: 'Saúde e assistência para o seu melhor amigo.',
    unit: 'mês',
    protections: [
      { id: 'pet-1', name: 'Consultas e Exames', description: 'Rede credenciada nacional', price: 25, icon: Syringe, type: 'essential' },
      { id: 'pet-2', name: 'Vacinas e Prevenção', description: 'Anual e check-ups', price: 15, icon: ShieldCheck, type: 'essential' },
      { id: 'pet-3', name: 'Cirurgias e Internação', description: 'Cobertura para imprevistos', price: 30, icon: Heart, type: 'extra' },
      { id: 'pet-4', name: 'Responsabilidade Civil', description: 'Danos causados pelo pet', price: 8, icon: UserCheck, type: 'extra' }
    ]
  },
  {
    id: 'renda',
    name: 'Renda Protegida (DIT)',
    basePrice: 22,
    icon: Wallet,
    description: 'Garante sua renda se você precisar parar por doença ou acidente.',
    unit: 'mês',
    protections: [
      { id: 'dit-1', name: 'Incapacidade Temporária', description: 'Diárias por afastamento', price: 22, icon: UserCheck, type: 'essential' },
      { id: 'dit-2', name: 'Invalidez Permanente', description: 'Indenização total ou parcial', price: 12, icon: ShieldAlert, type: 'essential' },
      { id: 'dit-3', name: 'Telemedicina 24h', description: 'Consultas online ilimitadas', price: 8, icon: Heart, type: 'extra' }
    ]
  },
  {
    id: 'maquinas',
    name: 'Equipamentos de Trabalho',
    basePrice: 20,
    icon: Briefcase,
    description: 'Proteção para notebooks, câmeras e ferramentas.',
    unit: 'mês',
    protections: [
      { id: 'maq-1', name: 'Danos Físicos', description: 'Quedas e acidentes externos', price: 20, icon: Zap, type: 'essential' },
      { id: 'maq-2', name: 'Roubo e Furto Qualificado', description: 'Proteção em qualquer local', price: 18, icon: Lock, type: 'essential' },
      { id: 'maq-3', name: 'Danos Elétricos', description: 'Curto-circuito e raios', price: 12, icon: Flame, type: 'extra' },
      { id: 'maq-4', name: 'Lucros Cessantes', description: 'Diária se o equipamento parar', price: 25, icon: Wallet, type: 'extra' }
    ]
  },
  {
    id: 'celular',
    name: 'Seguro Celular',
    basePrice: 18,
    icon: Smartphone,
    description: 'Proteção contra roubo, quebra e transações indevidas.',
    unit: 'mês',
    protections: [
      { id: 'cel-1', name: 'Danos Acidentais', description: 'Reparo ou reposição rápida', price: 18, icon: Zap, type: 'essential' },
      { id: 'cel-2', name: 'Roubo e Furto', description: 'Inclusive furto simples', price: 22, icon: ShieldAlert, type: 'essential' },
      { id: 'cel-3', name: 'Transações Digitais', description: 'PIX e Apps de Banco', price: 10, icon: Lock, type: 'extra' },
      { id: 'cel-4', name: 'Cobertura Internacional', description: 'Proteção em viagens', price: 7, icon: Globe, type: 'extra' }
    ]
  },
  {
    id: 'residencial',
    name: 'Seguro Residencial',
    basePrice: 12,
    icon: Home,
    description: 'Segurança para sua casa e assistência 24h.',
    unit: 'mês',
    protections: [
      { id: 'res-1', name: 'Incêndio e Explosão', description: 'Proteção estrutural e bens', price: 12, icon: Flame, type: 'essential' },
      { id: 'res-2', name: 'Danos Elétricos', description: 'Eletrodomésticos e fiação', price: 15, icon: Zap, type: 'essential' },
      { id: 'res-3', name: 'Roubo de Bens', description: 'Móveis e eletrônicos internos', price: 18, icon: Lock, type: 'extra' },
      { id: 'res-4', name: 'Assistência 24h Premium', description: 'Chaveiro, encanador e eletricista', price: 10, icon: UserCheck, type: 'extra' }
    ]
  },
  {
    id: 'bike',
    name: 'Bike & Patinete',
    basePrice: 14,
    icon: Bike,
    description: 'Mobilidade segura para o seu deslocamento.',
    unit: 'mês',
    protections: [
      { id: 'bik-1', name: 'Roubo e Furto', description: 'Inclusive em trânsito', price: 14, icon: ShieldAlert, type: 'essential' },
      { id: 'bik-2', name: 'Acidentes e Danos', description: 'Reparos e peças originais', price: 12, icon: Zap, type: 'essential' },
      { id: 'bik-3', name: 'Danos a Terceiros', description: 'Responsabilidade civil', price: 9, icon: UserCheck, type: 'extra' }
    ]
  }
];

export const MAPPING_NAME_TO_ID: Record<string, string> = {
  'Seguro de Vida': 'vida',
  'Seguro Auto': 'auto',
  'Seguro Pet': 'pet',
  'Renda Protegida (DIT)': 'renda',
  'Equipamentos de Trabalho': 'maquinas',
  'Seguro Celular': 'celular',
  'Seguro Residencial': 'residencial',
  'Bike & Patinete': 'bike',
};
