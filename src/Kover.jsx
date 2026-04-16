import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Heart, Shield, Zap, Wallet, Car, Smartphone, Home, Bike,
  PawPrint, Plane, Lock, ChevronRight, ChevronLeft, Check,
  Users, TrendingUp, DollarSign, Star, ShoppingCart, X,
  Building2, UserCircle, ArrowRight, Search, AlertCircle,
  CheckCircle2, Plus, Minus, BarChart3, Award, Info
} from 'lucide-react'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const BENEFIT = 80

const INSURANCES = [
  {
    id: 'vida', name: 'Seguro de Vida', icon: Heart, basePrice: 13,
    unit: 'mês', color: 'bg-rose-50', iconColor: 'text-rose-500',
    tags: ['familia', 'renda'],
    description: 'Proteção financeira para quem você ama em caso de falecimento ou invalidez.',
    coverageMin: 50000, coverageMax: 500000, coverageDefault: 150000, coverageStep: 10000,
    essentials: [
      { id: 'morte', label: 'Morte por qualquer causa', price: 0 },
      { id: 'invalidez', label: 'Invalidez permanente', price: 0 },
    ],
    extras: [
      { id: 'funeral', label: 'Assistência funeral', price: 3.5 },
      { id: 'doenças', label: 'Doenças graves (cancer, AVC)', price: 6.0 },
      { id: 'diaria', label: 'Diária por internação', price: 4.0 },
    ],
  },
  {
    id: 'ap', name: 'Acidentes Pessoais', icon: Zap, basePrice: 9,
    unit: 'mês', color: 'bg-amber-50', iconColor: 'text-amber-500',
    tags: ['veiculo', 'campo'],
    description: 'Cobertura para acidentes no trabalho, trânsito e dia a dia.',
    coverageMin: 20000, coverageMax: 200000, coverageDefault: 50000, coverageStep: 5000,
    essentials: [
      { id: 'morte_ac', label: 'Morte acidental', price: 0 },
      { id: 'invalidez_ac', label: 'Invalidez por acidente', price: 0 },
    ],
    extras: [
      { id: 'dmd', label: 'Despesas médicas e hospitalares', price: 2.5 },
      { id: 'odonto', label: 'Tratamento odontológico', price: 1.5 },
      { id: 'fraturas', label: 'Fraturas e queimaduras', price: 2.0 },
    ],
  },
  {
    id: 'renda', name: 'Proteção de Renda', icon: Wallet, basePrice: 19,
    unit: 'mês', color: 'bg-purple-50', iconColor: 'text-purple-500',
    tags: ['renda', 'familia'],
    description: 'Garante sua renda mensal em caso de desemprego involuntário ou incapacidade.',
    coverageMin: 1000, coverageMax: 10000, coverageDefault: 3000, coverageStep: 500,
    essentials: [
      { id: 'desemprego', label: 'Desemprego involuntário', price: 0 },
      { id: 'incapacidade', label: 'Incapacidade temporária', price: 0 },
    ],
    extras: [
      { id: 'prazo', label: 'Cobertura estendida (12 meses)', price: 5.0 },
      { id: 'autonomo', label: 'Proteção autônomo/PJ', price: 4.0 },
    ],
  },
  {
    id: 'auto', name: 'Seguro Auto', icon: Car, basePrice: 39,
    unit: 'mês', color: 'bg-blue-50', iconColor: 'text-blue-500',
    tags: ['veiculo'],
    description: 'Proteção completa para seu veículo contra roubo, colisão e danos.',
    coverageMin: 20000, coverageMax: 150000, coverageDefault: 50000, coverageStep: 5000,
    essentials: [
      { id: 'colisao', label: 'Colisão e capotamento', price: 0 },
      { id: 'roubo', label: 'Roubo e furto', price: 0 },
    ],
    extras: [
      { id: 'terceiros', label: 'Danos a terceiros (R$100k)', price: 8.0 },
      { id: 'vidros', label: 'Vidros, lanternas e retrovisores', price: 4.5 },
      { id: 'carro_reserva', label: 'Carro reserva 15 dias', price: 6.0 },
      { id: 'guincho', label: 'Guincho ilimitado', price: 3.5 },
    ],
  },
  {
    id: 'celular', name: 'Seguro Celular', icon: Smartphone, basePrice: 15,
    unit: 'mês', color: 'bg-indigo-50', iconColor: 'text-indigo-500',
    tags: ['bens'],
    description: 'Proteção para seu smartphone contra quebra, roubo e danos acidentais.',
    coverageMin: 500, coverageMax: 8000, coverageDefault: 2000, coverageStep: 500,
    essentials: [
      { id: 'quebra', label: 'Quebra acidental (tela)', price: 0 },
      { id: 'roubo_cel', label: 'Roubo e furto qualificado', price: 0 },
    ],
    extras: [
      { id: 'dano_liquido', label: 'Dano por líquido', price: 3.0 },
      { id: 'acessorios', label: 'Acessórios (fone, case)', price: 2.0 },
    ],
  },
  {
    id: 'residencial', name: 'Seguro Residencial', icon: Home, basePrice: 12,
    unit: 'mês', color: 'bg-emerald-50', iconColor: 'text-emerald-500',
    tags: ['bens'],
    description: 'Protege seu imóvel e bens contra incêndio, roubo, vendaval e danos elétricos.',
    coverageMin: 50000, coverageMax: 500000, coverageDefault: 150000, coverageStep: 10000,
    essentials: [
      { id: 'incendio', label: 'Incêndio e explosão', price: 0 },
      { id: 'danos_eletricos', label: 'Danos elétricos', price: 0 },
    ],
    extras: [
      { id: 'roubo_res', label: 'Roubo de bens', price: 3.0 },
      { id: 'responsabilidade', label: 'Responsabilidade civil', price: 2.5 },
      { id: 'assistencia', label: 'Assistência 24h (encanador, eletricista)', price: 2.0 },
    ],
  },
  {
    id: 'bike', name: 'Seguro Bike/Patinete', icon: Bike, basePrice: 8,
    unit: 'mês', color: 'bg-lime-50', iconColor: 'text-lime-600',
    tags: ['veiculo', 'campo'],
    description: 'Cobertura para bicicletas e patinetes contra roubo, furto e danos.',
    coverageMin: 500, coverageMax: 10000, coverageDefault: 3000, coverageStep: 500,
    essentials: [
      { id: 'roubo_bike', label: 'Roubo e furto', price: 0 },
      { id: 'dano_bike', label: 'Dano acidental', price: 0 },
    ],
    extras: [
      { id: 'acidentes_bike', label: 'Acidentes pessoais no uso', price: 2.5 },
      { id: 'rc_bike', label: 'Responsabilidade civil', price: 1.5 },
    ],
  },
  {
    id: 'pet', name: 'Seguro Pet', icon: PawPrint, basePrice: 29,
    unit: 'mês', color: 'bg-orange-50', iconColor: 'text-orange-500',
    tags: ['saude'],
    description: 'Plano de saúde para seu pet com consultas, exames e emergências.',
    coverageMin: 5000, coverageMax: 50000, coverageDefault: 15000, coverageStep: 2500,
    essentials: [
      { id: 'consultas', label: 'Consultas veterinárias', price: 0 },
      { id: 'emergencia', label: 'Emergência 24h', price: 0 },
    ],
    extras: [
      { id: 'cirurgia', label: 'Cirurgias e internações', price: 8.0 },
      { id: 'vacinas', label: 'Vacinas e prevenção', price: 4.0 },
      { id: 'telemedicina_pet', label: 'Telemedicina veterinária', price: 2.5 },
    ],
  },
  {
    id: 'viagem', name: 'Seguro Viagem', icon: Plane, basePrice: 5,
    unit: 'uso', color: 'bg-sky-50', iconColor: 'text-sky-500',
    tags: ['saude', 'bens'],
    description: 'Proteção completa para viagens nacionais e internacionais.',
    coverageMin: 10000, coverageMax: 100000, coverageDefault: 30000, coverageStep: 5000,
    essentials: [
      { id: 'medico', label: 'Despesas médicas no exterior', price: 0 },
      { id: 'cancelamento', label: 'Cancelamento de viagem', price: 0 },
    ],
    extras: [
      { id: 'bagagem', label: 'Extravio de bagagem', price: 1.5 },
      { id: 'atraso', label: 'Atraso de voo (>4h)', price: 1.0 },
      { id: 'esportes', label: 'Esportes radicais', price: 3.0 },
    ],
  },
  {
    id: 'cyber', name: 'Proteção Digital', icon: Lock, basePrice: 7,
    unit: 'mês', color: 'bg-slate-50', iconColor: 'text-slate-500',
    tags: ['bens', 'renda'],
    description: 'Proteção contra golpes, fraudes digitais, roubo de dados e extorsão online.',
    coverageMin: 5000, coverageMax: 50000, coverageDefault: 15000, coverageStep: 2500,
    essentials: [
      { id: 'fraude', label: 'Fraude e golpes digitais', price: 0 },
      { id: 'roubo_dados', label: 'Roubo de identidade', price: 0 },
    ],
    extras: [
      { id: 'extorsao', label: 'Extorsão online (ransomware)', price: 2.0 },
      { id: 'monitoramento', label: 'Monitoramento 24/7 da dark web', price: 1.5 },
      { id: 'assistencia_cyber', label: 'Assistência jurídica digital', price: 2.0 },
    ],
  },
]

const QUIZ_QUESTIONS = [
  {
    id: 'q1', title: 'Qual é a sua atividade profissional?',
    subtitle: 'Isso nos ajuda a encontrar as melhores coberturas.',
    type: 'single',
    options: [
      { id: 'motorista', label: 'Motorista / Entregador', icon: Car, tags: ['veiculo', 'ap'] },
      { id: 'escritorio', label: 'Escritório / Administrativo', icon: Building2, tags: ['renda', 'cyber'] },
      { id: 'operacao', label: 'Operação / Campo', icon: Zap, tags: ['ap', 'veiculo'] },
      { id: 'remoto', label: 'Remoto / Home office', icon: Home, tags: ['cyber', 'renda'] },
      { id: 'vendas', label: 'Vendas externas', icon: TrendingUp, tags: ['veiculo', 'renda'] },
      { id: 'outro', label: 'Outro', icon: UserCircle, tags: ['renda'] },
    ],
    searchable: true,
  },
  {
    id: 'q2', title: 'Você utiliza veículo próprio no trabalho?',
    subtitle: 'Mesmo que seja eventualmente.',
    type: 'single',
    options: [
      { id: 'sim_sempre', label: 'Sim, diariamente', icon: Car, tags: ['veiculo'] },
      { id: 'sim_as_vezes', label: 'Sim, às vezes', icon: Car, tags: ['veiculo'] },
      { id: 'nao', label: 'Não utilizo', icon: X, tags: [] },
    ],
    searchable: false,
  },
  {
    id: 'q3', title: 'Tem dependentes financeiros?',
    subtitle: 'Pode selecionar mais de um.',
    type: 'multi',
    options: [
      { id: 'filhos', label: 'Filhos', icon: Users, tags: ['familia', 'vida'] },
      { id: 'conjuge', label: 'Cônjuge / Parceiro(a)', icon: Heart, tags: ['familia', 'vida'] },
      { id: 'pais', label: 'Pais / Familiares', icon: Home, tags: ['familia'] },
      { id: 'nenhum', label: 'Não tenho', icon: UserCircle, tags: [] },
    ],
    searchable: false,
  },
  {
    id: 'q4', title: 'Qual sua maior preocupação hoje?',
    subtitle: 'Escolha a principal.',
    type: 'single',
    options: [
      { id: 'renda', label: 'Proteger minha renda', icon: Wallet, tags: ['renda'] },
      { id: 'familia', label: 'Proteger minha família', icon: Heart, tags: ['familia', 'vida'] },
      { id: 'veiculo_pref', label: 'Proteger meu veículo', icon: Car, tags: ['veiculo'] },
      { id: 'bens', label: 'Proteger meus bens', icon: Home, tags: ['bens'] },
      { id: 'saude', label: 'Saúde e imprevistos', icon: Shield, tags: ['saude', 'ap'] },
    ],
    searchable: false,
  },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmt(value) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtCoverage(value) {
  if (value >= 1000) return `R$${(value / 1000).toLocaleString('pt-BR')}k`
  return `R$${value.toLocaleString('pt-BR')}`
}

function getRecommended(quizAnswers) {
  const tags = new Set()
  Object.values(quizAnswers).flat().forEach(answer => {
    const allOpts = QUIZ_QUESTIONS.flatMap(q => q.options)
    const opt = allOpts.find(o => o.id === answer)
    if (opt) opt.tags.forEach(t => tags.add(t))
  })
  return INSURANCES.filter(ins => ins.tags.some(t => tags.has(t))).map(i => i.id)
}

function calcPrice(insurance, coverage, essentialToggles, extraToggles) {
  const coverageRatio = (coverage - insurance.coverageMin) / (insurance.coverageMax - insurance.coverageMin)
  const base = insurance.basePrice + coverageRatio * insurance.basePrice * 1.5
  const extras = insurance.extras.reduce((sum, e) => sum + (extraToggles[e.id] ? e.price : 0), 0)
  return Math.round((base + extras) * 100) / 100
}

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function ProgressBar({ step, total }) {
  return (
    <div className="w-full bg-purple-100 rounded-full h-1.5">
      <div
        className="bg-primary h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${(step / total) * 100}%` }}
      />
    </div>
  )
}

function Toggle({ checked, onChange, disabled = false }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? 'bg-primary' : 'bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium">
      <ChevronLeft size={18} />
      Voltar
    </button>
  )
}

function KoverLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
        <Shield size={15} className="text-white" />
      </div>
      <span className="font-bold text-lg text-gray-900 tracking-tight">kover</span>
    </div>
  )
}

// ─── SCREEN 1: SPLASH ────────────────────────────────────────────────────────

function SplashScreen({ onSelect }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col flex-1 px-6 pt-16 pb-10">
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Shield size={20} className="text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-900 tracking-tight">kover</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Bem-vindo ao</p>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Benefício de<br />proteção<br />financeira
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-12">
            Plataforma B2B2C que conecta empresas, colaboradores e seguradoras para uma proteção simples e acessível.
          </p>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Como deseja entrar?</p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => onSelect('employee')}
              className="flex items-center justify-between bg-primary text-white rounded-2xl px-5 py-4 shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors active:scale-95"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <UserCircle size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-base">Sou Colaborador</p>
                  <p className="text-white/70 text-xs mt-0.5">Quero montar meu plano</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/70" />
            </button>

            <button
              onClick={() => onSelect('company')}
              className="flex items-center justify-between bg-white text-gray-900 rounded-2xl px-5 py-4 border-2 border-gray-100 hover:border-primary/30 hover:bg-primary-light/30 transition-colors active:scale-95"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Building2 size={20} className="text-gray-500" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-base">Sou Empresa</p>
                  <p className="text-gray-400 text-xs mt-0.5">Ver dashboard e métricas</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-6">
          {['Porto Seguro', 'Zurich', 'Bradesco Seguros'].map(name => (
            <span key={name} className="text-xs text-gray-300 font-medium">{name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── SCREEN 2: WELCOME ───────────────────────────────────────────────────────

function WelcomeScreen({ onNext, onBack }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <KoverLogo />
        <button onClick={onBack} className="text-gray-400 text-sm">Sair</button>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-8 pb-24">
        <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mb-8">
          <Shield size={30} className="text-primary" />
        </div>

        <p className="text-sm text-primary font-semibold mb-2">TechLog Transportes</p>
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
          Olá, João! 👋
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Sua empresa disponibilizou{' '}
          <span className="font-bold text-primary">R$80/mês</span>{' '}
          para a sua proteção financeira.
        </p>

        <div className="bg-primary-light rounded-2xl p-5 mb-8">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Seu benefício</p>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-4xl font-extrabold text-primary">R$80</span>
            <span className="text-primary/60 text-sm mb-1.5">/mês</span>
          </div>
          <p className="text-primary/70 text-sm">100% custeado pela empresa. Use como quiser nos seguros disponíveis.</p>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { icon: Check, text: 'Monte seu plano em menos de 5 minutos' },
            { icon: Check, text: 'Escolha os seguros que fazem sentido pra você' },
            { icon: Check, text: 'Ativação imediata após confirmação' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-success-light rounded-full flex items-center justify-center flex-shrink-0">
                <Icon size={11} className="text-success" />
              </div>
              <span className="text-gray-600 text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-6 py-4">
        <button
          onClick={onNext}
          className="w-full bg-primary text-white font-bold text-base rounded-2xl py-4 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          Descobrir meus planos
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

// ─── SCREEN 3: LGPD ──────────────────────────────────────────────────────────

function LGPDScreen({ onNext, onBack }) {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <BackButton onClick={onBack} />
      </div>

      <div className="flex-1 px-6 pt-6 pb-28 overflow-y-auto">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
          <Lock size={22} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Privacidade e dados</h2>
        <p className="text-gray-500 text-sm mb-6">Antes de continuar, precisamos do seu consentimento.</p>

        <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-600 leading-relaxed space-y-3 mb-6">
          <p><span className="font-semibold text-gray-800">O que coletamos:</span> dados profissionais, preferências de cobertura e informações de contato.</p>
          <p><span className="font-semibold text-gray-800">Para que usamos:</span> recomendar seguros adequados ao seu perfil e processar sua apólice junto às seguradoras parceiras.</p>
          <p><span className="font-semibold text-gray-800">Com quem compartilhamos:</span> apenas com as seguradoras parceiras (Porto Seguro, Zurich, Bradesco Seguros) para emissão da apólice.</p>
          <p><span className="font-semibold text-gray-800">Seus direitos:</span> acesso, correção, exclusão e portabilidade dos dados a qualquer momento pelo app.</p>
          <p>Seguimos integralmente a <span className="font-semibold text-gray-800">Lei Geral de Proteção de Dados (LGPD – Lei 13.709/2018)</span>.</p>
        </div>

        <div className="flex items-start gap-4 bg-primary-light rounded-2xl p-4">
          <div className="mt-0.5">
            <Toggle checked={accepted} onChange={setAccepted} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Concordo com o uso dos meus dados</p>
            <p className="text-xs text-gray-500 mt-1">Aceito o tratamento dos meus dados conforme descrito acima e a Política de Privacidade da Kover.</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-6 py-4">
        <button
          onClick={onNext}
          disabled={!accepted}
          className={`w-full font-bold text-base rounded-2xl py-4 flex items-center justify-center gap-2 transition-all active:scale-95 ${
            accepted
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continuar
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

// ─── SCREEN 4: QUIZ ──────────────────────────────────────────────────────────

function QuizScreen({ questionIndex, answers, onAnswer, onNext, onBack }) {
  const question = QUIZ_QUESTIONS[questionIndex]
  const [search, setSearch] = useState('')
  const currentAnswer = answers[question.id] || (question.type === 'multi' ? [] : null)
  const isMulti = question.type === 'multi'

  const filtered = question.options.filter(o =>
    !search || o.label.toLowerCase().includes(search.toLowerCase())
  )

  const isSelected = (optId) =>
    isMulti ? currentAnswer.includes(optId) : currentAnswer === optId

  const handleSelect = (optId) => {
    if (isMulti) {
      if (optId === 'nenhum') {
        onAnswer(question.id, ['nenhum'])
      } else {
        const prev = currentAnswer.filter(id => id !== 'nenhum')
        const next = prev.includes(optId) ? prev.filter(id => id !== optId) : [...prev, optId]
        onAnswer(question.id, next)
      }
    } else {
      onAnswer(question.id, optId)
    }
  }

  const hasAnswer = isMulti ? currentAnswer.length > 0 : !!currentAnswer

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-5 pt-10 pb-3">
        <div className="flex items-center justify-between mb-4">
          <BackButton onClick={onBack} />
          <span className="text-xs text-gray-400 font-medium">{questionIndex + 1} de {QUIZ_QUESTIONS.length}</span>
        </div>
        <ProgressBar step={questionIndex + 1} total={QUIZ_QUESTIONS.length} />
      </div>

      <div className="flex-1 px-6 pt-6 pb-28 overflow-y-auto">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2 leading-snug">{question.title}</h2>
        <p className="text-gray-500 text-sm mb-6">{question.subtitle}</p>

        {question.searchable && (
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-4 border border-gray-100">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {filtered.map(opt => {
            const Icon = opt.icon
            const sel = isSelected(opt.id)
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 transition-all text-left active:scale-[0.98] ${
                  sel
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  sel ? 'bg-primary' : 'bg-gray-100'
                }`}>
                  <Icon size={18} className={sel ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className={`flex-1 font-semibold text-sm ${sel ? 'text-primary' : 'text-gray-700'}`}>
                  {opt.label}
                </span>
                {sel && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-white" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-6 py-4">
        <button
          onClick={onNext}
          disabled={!hasAnswer}
          className={`w-full font-bold text-base rounded-2xl py-4 flex items-center justify-center gap-2 transition-all active:scale-95 ${
            hasAnswer
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {questionIndex === QUIZ_QUESTIONS.length - 1 ? 'Ver meus seguros' : 'Próximo'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

// ─── SCREEN 5: CATALOG ───────────────────────────────────────────────────────

function CatalogScreen({ quizAnswers, cart, onSelect, onViewCart, onBack }) {
  const recommended = getRecommended(quizAnswers)

  const sortedInsurances = [...INSURANCES].sort((a, b) => {
    const aRec = recommended.includes(a.id)
    const bRec = recommended.includes(b.id)
    if (aRec && !bRec) return -1
    if (!aRec && bRec) return 1
    return 0
  })

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <BackButton onClick={onBack} />
          {cart.length > 0 && (
            <button onClick={onViewCart} className="flex items-center gap-1.5 text-primary text-sm font-semibold">
              <ShoppingCart size={15} />
              {cart.length} no plano
            </button>
          )}
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mt-3 mb-1">Seguros para você</h2>
        <p className="text-gray-500 text-sm">Com base no seu perfil, recomendamos:</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-6 px-4 pt-4 space-y-3">
        {sortedInsurances.map(ins => {
          const Icon = ins.icon
          const isRec = recommended.includes(ins.id)
          const inCart = cart.some(c => c.id === ins.id)
          return (
            <button
              key={ins.id}
              onClick={() => onSelect(ins)}
              className={`w-full flex items-center gap-4 bg-white rounded-2xl px-4 py-4 border-2 text-left transition-all active:scale-[0.98] shadow-sm ${
                isRec ? 'border-primary/20' : 'border-gray-100'
              }`}
            >
              <div className={`w-12 h-12 ${ins.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} className={ins.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-gray-900 text-sm">{ins.name}</p>
                  {isRec && (
                    <span className="bg-primary-light text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs mt-0.5">
                  a partir de <span className="font-semibold text-gray-600">R${fmt(ins.basePrice)}/{ins.unit}</span>
                </p>
              </div>
              <div className="flex-shrink-0">
                {inCart ? (
                  <div className="w-7 h-7 bg-success rounded-full flex items-center justify-center">
                    <Check size={13} className="text-white" />
                  </div>
                ) : (
                  <ChevronRight size={18} className="text-gray-300" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-6 py-4">
          <button
            onClick={onViewCart}
            className="w-full bg-primary text-white font-bold text-base rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-95 transition-transform"
          >
            <ShoppingCart size={18} />
            Ver meu plano ({cart.length} seguro{cart.length !== 1 ? 's' : ''})
          </button>
        </div>
      )}
    </div>
  )
}

// ─── SCREEN 6: PERSONALIZATION ───────────────────────────────────────────────

function PersonalizationScreen({ insurance, existingConfig, benefit, usedBenefit, onAdd, onBack }) {
  const initEssentials = insurance.essentials.reduce((acc, e) => ({ ...acc, [e.id]: true }), {})
  const initExtras = insurance.extras.reduce((acc, e) => ({ ...acc, [e.id]: false }), {})

  const [coverage, setCoverage] = useState(existingConfig?.coverage ?? insurance.coverageDefault)
  const [extraToggles, setExtraToggles] = useState(existingConfig?.extraToggles ?? initExtras)

  const price = calcPrice(insurance, coverage, initEssentials, extraToggles)
  const remainingBenefit = Math.max(0, benefit - usedBenefit)
  const fromBenefit = Math.min(price, remainingBenefit)
  const fromCard = Math.max(0, price - fromBenefit)

  const toggleExtra = (id, val) => setExtraToggles(prev => ({ ...prev, [id]: val }))

  const Icon = insurance.icon

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-gray-100">
        <BackButton onClick={onBack} />
        <div className="flex items-center gap-3 mt-4">
          <div className={`w-12 h-12 ${insurance.color} rounded-xl flex items-center justify-center`}>
            <Icon size={22} className={insurance.iconColor} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">{insurance.name}</h2>
            <p className="text-gray-400 text-xs">Personalize sua cobertura</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-40 px-5 pt-5 space-y-5">
        {/* Description */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed">{insurance.description}</p>
        </div>

        {/* Coverage Slider */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Valor de cobertura</p>
          <div className="text-center mb-4">
            <span className="text-3xl font-extrabold text-gray-900">{fmtCoverage(coverage)}</span>
          </div>
          <input
            type="range"
            min={insurance.coverageMin}
            max={insurance.coverageMax}
            step={insurance.coverageStep}
            value={coverage}
            onChange={e => setCoverage(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, #6C3AED ${((coverage - insurance.coverageMin) / (insurance.coverageMax - insurance.coverageMin)) * 100}%, #EDE9FD ${((coverage - insurance.coverageMin) / (insurance.coverageMax - insurance.coverageMin)) * 100}%)`
            }}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>{fmtCoverage(insurance.coverageMin)}</span>
            <span>{fmtCoverage(insurance.coverageMax)}</span>
          </div>
        </div>

        {/* Essentials */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Proteções essenciais</p>
          <div className="space-y-4">
            {insurance.essentials.map(e => (
              <div key={e.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-5 h-5 bg-success-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-success" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{e.label}</span>
                </div>
                <Toggle checked={true} onChange={() => {}} disabled={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Proteções extras</p>
          <div className="space-y-4">
            {insurance.extras.map(e => (
              <div key={e.id} className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium">{e.label}</p>
                  <p className="text-xs text-primary font-semibold mt-0.5">+R${fmt(e.price)}/mês</p>
                </div>
                <Toggle checked={extraToggles[e.id]} onChange={val => toggleExtra(e.id, val)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-2xl font-extrabold text-gray-900">R${fmt(price)}<span className="text-sm text-gray-400 font-normal">/{insurance.unit}</span></p>
            <div className="flex items-center gap-3 mt-0.5">
              {fromBenefit > 0 && (
                <span className="text-xs text-success font-semibold">
                  R${fmt(fromBenefit)} do benefício
                </span>
              )}
              {fromCard > 0 && (
                <span className="text-xs text-gray-400 font-medium">
                  + R${fmt(fromCard)} cartão
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Saldo restante</p>
            <p className="text-sm font-bold text-primary">R${fmt(remainingBenefit - fromBenefit)}</p>
          </div>
        </div>
        <button
          onClick={() => onAdd({ id: insurance.id, price, coverage, extraToggles })}
          className="w-full mt-3 bg-primary text-white font-bold text-base rounded-2xl py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-95 transition-transform"
        >
          <Plus size={18} />
          Adicionar ao meu plano
        </button>
      </div>
    </div>
  )
}

// ─── SCREEN 7: CART ──────────────────────────────────────────────────────────

function CartScreen({ cart, onRemove, onActivate, onBack, onAddMore }) {
  const total = cart.reduce((sum, c) => sum + c.price, 0)
  const fromBenefit = Math.min(total, BENEFIT)
  const fromCard = Math.max(0, total - BENEFIT)

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-gray-100">
        <BackButton onClick={onBack} />
        <h2 className="text-2xl font-extrabold text-gray-900 mt-3 mb-0.5">Meu plano</h2>
        <p className="text-gray-400 text-sm">{cart.length} seguro{cart.length !== 1 ? 's' : ''} selecionado{cart.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-52 px-4 pt-4 space-y-3">
        {cart.map(item => {
          const ins = INSURANCES.find(i => i.id === item.id)
          const Icon = ins.icon
          return (
            <div key={item.id} className="bg-white rounded-2xl px-4 py-4 border border-gray-100 flex items-center gap-3 shadow-sm">
              <div className={`w-11 h-11 ${ins.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className={ins.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{ins.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">Cobertura: {fmtCoverage(item.coverage)}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-primary text-sm">R${fmt(item.price)}/mês</p>
                <button onClick={() => onRemove(item.id)} className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors">
                  <Minus size={12} className="text-red-400" />
                </button>
              </div>
            </div>
          )
        })}

        <button
          onClick={onAddMore}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Plus size={16} />
          Adicionar mais seguros
        </button>

        {/* Breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Resumo financeiro</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total mensal</span>
            <span className="font-bold text-gray-900">R${fmt(total)}/mês</span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Saldo benefício (empresa)</span>
            <span className="font-bold text-success">−R${fmt(fromBenefit)}</span>
          </div>
          {fromCard > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Desconto em folha / cartão</span>
              <span className="font-bold text-gray-700">R${fmt(fromCard)}</span>
            </div>
          )}
          <div className="h-px bg-gray-100" />
          <div className="flex justify-between">
            <span className="text-sm font-bold text-gray-900">Seu custo líquido</span>
            <span className="font-extrabold text-lg text-primary">R${fmt(fromCard)}/mês</span>
          </div>
          <div className="bg-primary-light rounded-xl p-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-light border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary">
                Saldo restante: R${fmt(Math.max(0, BENEFIT - fromBenefit))}
              </p>
              <p className="text-[10px] text-primary/60">Pode usar em outros benefícios Kover</p>
            </div>
          </div>
        </div>

        {/* Aviso */}
        <div className="bg-amber-50 rounded-2xl p-4 flex items-start gap-3 border border-amber-100">
          <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            A ativação é imediata após confirmação. Cobranças adicionais ao benefício serão descontadas em folha no próximo ciclo.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-6 py-4">
        <button
          onClick={onActivate}
          className="w-full bg-primary text-white font-bold text-base rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-95 transition-transform"
        >
          <Shield size={18} />
          Ativar proteção
        </button>
      </div>
    </div>
  )
}

// ─── SCREEN 8: CONFIRMATION ──────────────────────────────────────────────────

function ConfirmationScreen({ cart, onDone }) {
  const total = cart.reduce((sum, c) => sum + c.price, 0)
  const fromCard = Math.max(0, total - BENEFIT)
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center px-6 pt-16 pb-10">
        <div className="relative mb-8">
          {pulse && (
            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping scale-150" />
          )}
          <div className="w-24 h-24 bg-success-light rounded-full flex items-center justify-center relative z-10">
            <CheckCircle2 size={52} className="text-success" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Tudo certo!</h1>
        <p className="text-xl font-semibold text-success text-center mb-1">Sua proteção está ativa.</p>
        <p className="text-gray-500 text-sm text-center mb-10">Um resumo foi enviado para o seu e-mail e WhatsApp.</p>

        <div className="w-full bg-gray-50 rounded-2xl p-5 mb-6 space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Seguros contratados</p>
          {cart.map(item => {
            const ins = INSURANCES.find(i => i.id === item.id)
            const Icon = ins.icon
            return (
              <div key={item.id} className="flex items-center gap-3">
                <div className={`w-9 h-9 ${ins.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={16} className={ins.iconColor} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{ins.name}</p>
                  <p className="text-xs text-gray-400">{fmtCoverage(item.coverage)} de cobertura</p>
                </div>
                <p className="text-sm font-bold text-primary">R${fmt(item.price)}/mês</p>
              </div>
            )
          })}
        </div>

        <div className="w-full flex items-center justify-between bg-success-light rounded-2xl px-5 py-4 mb-4">
          <div>
            <p className="text-sm font-bold text-success">Seu custo mensal</p>
            <p className="text-xs text-success/60">Após desconto do benefício</p>
          </div>
          <p className="text-2xl font-extrabold text-success">R${fmt(fromCard)}</p>
        </div>

        <div className="w-full flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 mb-2 border border-gray-100">
          <Award size={16} className="text-primary flex-shrink-0" />
          <p className="text-xs text-gray-600">Apólice emitida em parceria com <span className="font-semibold">Porto Seguro</span></p>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={onDone}
          className="w-full bg-primary text-white font-bold text-base rounded-2xl py-4 shadow-lg shadow-primary/25 active:scale-95 transition-transform"
        >
          Ver meus seguros
        </button>
      </div>
    </div>
  )
}

// ─── COMPANY DASHBOARD ───────────────────────────────────────────────────────

const DIST_DATA = [
  { name: 'Acidentes Pessoais', count: 187, color: 'bg-amber-400' },
  { name: 'Seguro de Vida', count: 156, color: 'bg-primary' },
  { name: 'Proteção de Renda', count: 134, color: 'bg-purple-400' },
  { name: 'Seguro Auto', count: 98, color: 'bg-blue-400' },
  { name: 'Seguro Celular', count: 87, color: 'bg-indigo-400' },
  { name: 'Seguro Residencial', count: 63, color: 'bg-emerald-400' },
]

const TOP_INSURANCES = [
  { name: 'Acidentes Pessoais', insurer: 'Porto Seguro', count: 187, icon: Zap, color: 'bg-amber-50', iconColor: 'text-amber-500' },
  { name: 'Seguro de Vida', insurer: 'Zurich', count: 156, icon: Heart, color: 'bg-rose-50', iconColor: 'text-rose-500' },
  { name: 'Proteção de Renda', insurer: 'Bradesco Seguros', count: 134, icon: Wallet, color: 'bg-purple-50', iconColor: 'text-purple-500' },
  { name: 'Seguro Auto', insurer: 'Porto Seguro', count: 98, icon: Car, color: 'bg-blue-50', iconColor: 'text-blue-500' },
  { name: 'Seguro Celular', insurer: 'Zurich', count: 87, icon: Smartphone, color: 'bg-indigo-50', iconColor: 'text-indigo-500' },
]

function CompanyDashboard({ onBack }) {
  const maxCount = Math.max(...DIST_DATA.map(d => d.count))

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <KoverLogo />
          <button onClick={onBack} className="flex items-center gap-1.5 text-gray-500 text-sm font-medium hover:text-gray-700">
            <ChevronLeft size={16} />
            Trocar visão
          </button>
        </div>
        <p className="text-xs font-semibold text-primary uppercase tracking-widest">Dashboard</p>
        <h2 className="text-xl font-extrabold text-gray-900 mt-0.5">TechLog Transportes</h2>
        <p className="text-gray-400 text-xs mt-0.5">Atualizado agora · Abril 2026</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Colaboradores', value: '342', sub: 'total', icon: Users, color: 'bg-blue-50', iconColor: 'text-blue-500' },
            { label: 'Protegidos', value: '287', sub: '84% da equipe', icon: Shield, color: 'bg-success-light', iconColor: 'text-success' },
            { label: 'Investimento', value: 'R$27.360', sub: 'mensal', icon: DollarSign, color: 'bg-primary-light', iconColor: 'text-primary' },
            { label: 'Satisfação', value: '4.7/5', sub: '⭐ média geral', icon: Star, color: 'bg-amber-50', iconColor: 'text-amber-500' },
          ].map(m => {
            const Icon = m.icon
            return (
              <div key={m.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className={`w-9 h-9 ${m.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={17} className={m.iconColor} />
                </div>
                <p className="text-xl font-extrabold text-gray-900 leading-tight">{m.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{m.label}</p>
                <p className="text-[10px] text-gray-300 mt-0.5">{m.sub}</p>
              </div>
            )
          })}
        </div>

        {/* Proteção rate */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-bold text-gray-700">Taxa de proteção</p>
            <span className="text-sm font-extrabold text-success">84%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all" style={{ width: '84%' }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">287 de 342 colaboradores com ao menos 1 seguro ativo</p>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-primary" />
            <p className="text-sm font-bold text-gray-700">Distribuição por seguro</p>
          </div>
          <div className="space-y-3">
            {DIST_DATA.map(d => (
              <div key={d.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600 font-medium">{d.name}</span>
                  <span className="text-gray-400 font-semibold">{d.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`${d.color} h-2.5 rounded-full transition-all duration-700`}
                    style={{ width: `${(d.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-700 mb-4">Top 5 mais contratados</p>
          <div className="space-y-3">
            {TOP_INSURANCES.map((ins, i) => {
              const Icon = ins.icon
              return (
                <div key={ins.name} className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-gray-300 w-4">{i + 1}</span>
                  <div className={`w-9 h-9 ${ins.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} className={ins.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{ins.name}</p>
                    <p className="text-[10px] text-gray-400">{ins.insurer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-gray-700">{ins.count}</p>
                    <p className="text-[10px] text-gray-400">adesões</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Economia */}
        <div className="bg-gradient-to-br from-primary to-purple-700 rounded-2xl p-5 text-white shadow-lg shadow-primary/30">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-white/80" />
            <p className="text-sm font-bold text-white/80 uppercase tracking-wide">Economia estimada</p>
          </div>
          <p className="text-3xl font-extrabold mb-2">R$34.200<span className="text-lg font-normal text-white/60">/mês</span></p>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Colaboradores protegidos faltam <span className="text-white font-bold">40% menos</span> e têm <span className="text-white font-bold">23% mais produtividade</span> — impacto direto na sua operação.
          </p>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold">40%</p>
              <p className="text-[10px] text-white/60 mt-0.5">menos absenteísmo</p>
            </div>
            <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold">23%</p>
              <p className="text-[10px] text-white/60 mt-0.5">mais produtividade</p>
            </div>
            <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold">84%</p>
              <p className="text-[10px] text-white/60 mt-0.5">satisfação</p>
            </div>
          </div>
        </div>

        {/* NPS / Info */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Info size={15} className="text-gray-400" />
            <p className="text-sm font-bold text-gray-700">Últimos 30 dias</p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 text-center">
              <p className="text-2xl font-extrabold text-success">+47</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Novas adesões</p>
            </div>
            <div className="w-px bg-gray-100" />
            <div className="flex-1 text-center">
              <p className="text-2xl font-extrabold text-gray-800">3</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Cancelamentos</p>
            </div>
            <div className="w-px bg-gray-100" />
            <div className="flex-1 text-center">
              <p className="text-2xl font-extrabold text-primary">12</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Sinistros pagos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add colaboradores */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-6 py-4">
        <button className="w-full bg-primary text-white font-bold text-base rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-95 transition-transform">
          <Plus size={18} />
          Adicionar mais colaboradores
        </button>
      </div>
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function Kover() {
  const [view, setView] = useState('splash') // splash | employee | company
  const [step, setStep] = useState('welcome') // welcome | lgpd | quiz | catalog | personalize | cart | done
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [selectedInsurance, setSelectedInsurance] = useState(null)
  const [cart, setCart] = useState([])

  const usedBenefit = cart.reduce((sum, c) => Math.min(BENEFIT, sum + c.price), 0)

  const goTo = useCallback((s) => setStep(s), [])

  const handleQuizAnswer = (qId, answer) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: answer }))
  }

  const handleQuizNext = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(i => i + 1)
    } else {
      goTo('catalog')
    }
  }

  const handleQuizBack = () => {
    if (quizIndex > 0) {
      setQuizIndex(i => i - 1)
    } else {
      goTo('lgpd')
    }
  }

  const handleAddToCart = (config) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === config.id)
      if (exists) return prev.map(c => c.id === config.id ? config : c)
      return [...prev, config]
    })
    goTo('catalog')
  }

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  if (view === 'splash') {
    return <SplashScreen onSelect={v => { setView(v === 'employee' ? 'employee' : 'company'); if (v === 'employee') goTo('welcome') }} />
  }

  if (view === 'company') {
    return <CompanyDashboard onBack={() => setView('splash')} />
  }

  // Employee flow
  switch (step) {
    case 'welcome':
      return <WelcomeScreen onNext={() => goTo('lgpd')} onBack={() => setView('splash')} />
    case 'lgpd':
      return <LGPDScreen onNext={() => { setQuizIndex(0); goTo('quiz') }} onBack={() => goTo('welcome')} />
    case 'quiz':
      return (
        <QuizScreen
          questionIndex={quizIndex}
          answers={quizAnswers}
          onAnswer={handleQuizAnswer}
          onNext={handleQuizNext}
          onBack={handleQuizBack}
        />
      )
    case 'catalog':
      return (
        <CatalogScreen
          quizAnswers={quizAnswers}
          cart={cart}
          onSelect={(ins) => { setSelectedInsurance(ins); goTo('personalize') }}
          onViewCart={() => goTo('cart')}
          onBack={() => { setQuizIndex(QUIZ_QUESTIONS.length - 1); goTo('quiz') }}
        />
      )
    case 'personalize':
      return (
        <PersonalizationScreen
          insurance={selectedInsurance}
          existingConfig={cart.find(c => c.id === selectedInsurance?.id)}
          benefit={BENEFIT}
          usedBenefit={usedBenefit - (cart.find(c => c.id === selectedInsurance?.id)?.price ?? 0)}
          onAdd={handleAddToCart}
          onBack={() => goTo('catalog')}
        />
      )
    case 'cart':
      return (
        <CartScreen
          cart={cart}
          onRemove={handleRemoveFromCart}
          onActivate={() => goTo('done')}
          onBack={() => goTo('catalog')}
          onAddMore={() => goTo('catalog')}
        />
      )
    case 'done':
      return (
        <ConfirmationScreen
          cart={cart}
          onDone={() => { setCart([]); setView('splash'); setStep('welcome'); setQuizAnswers({}) }}
        />
      )
    default:
      return <SplashScreen onSelect={v => setView(v)} />
  }
}
