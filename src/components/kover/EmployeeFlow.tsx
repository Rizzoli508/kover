"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Search, Check, Info, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INSURANCE_CATALOG, MAPPING_NAME_TO_ID, InsuranceCategory } from '@/lib/insurance-data';
import { recommendInsurancePlans, RecommendInsurancePlansInput, RecommendInsurancePlansOutput } from '@/ai/flows/recommend-insurance-plans';

type Step = 'welcome' | 'lgpd' | 'quiz' | 'catalog' | 'customize' | 'review' | 'confirmation';

export function EmployeeFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [quizIndex, setQuizIndex] = useState(0);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  
  // Quiz Answers
  const [answers, setAnswers] = useState<RecommendInsurancePlansInput>({
    professionalActivity: '',
    usesOwnVehicleForWork: 'Não',
    financialDependents: [],
    mainConcern: 'Proteger minha renda',
  });

  // Recommendations
  const [recommendations, setRecommendations] = useState<RecommendInsurancePlansOutput>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  // Cart / Customization
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, { price: number, coverage: number, extras: string[] }>>({});
  const BENEFIT_AMOUNT = 80;

  const currentStepProgress = useMemo(() => {
    if (step === 'quiz') return (quizIndex + 1) * 25;
    if (step === 'catalog') return 100;
    return 0;
  }, [step, quizIndex]);

  const handleNextQuiz = async () => {
    if (quizIndex < 3) {
      setQuizIndex(quizIndex + 1);
    } else {
      setLoadingRecommendations(true);
      setStep('catalog');
      try {
        const recs = await recommendInsurancePlans(answers);
        setRecommendations(recs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingRecommendations(false);
      }
    }
  };

  const currentTotal = Object.values(cart).reduce((acc, item) => acc + item.price, 0);
  const remainingBenefit = Math.max(0, BENEFIT_AMOUNT - currentTotal);
  const extraToPay = Math.max(0, currentTotal - BENEFIT_AMOUNT);

  // Helper for personalization screen
  const selectedInsurance = useMemo(() => 
    INSURANCE_CATALOG.find(i => i.id === selectedInsuranceId),
  [selectedInsuranceId]);

  const [customization, setCustomization] = useState({
    coverage: 100000,
    essentialToggled: true,
    extra1: false,
    extra2: false
  });

  const customPrice = useMemo(() => {
    if (!selectedInsurance) return 0;
    let price = selectedInsurance.basePrice;
    // Simple logic: +R$10 for every 100k above base (50k)
    price += Math.max(0, (customization.coverage - 50000) / 10000) * 0.5;
    if (customization.extra1) price += 5.50;
    if (customization.extra2) price += 8.90;
    return Number(price.toFixed(2));
  }, [selectedInsurance, customization]);

  const addToPlan = () => {
    if (selectedInsuranceId) {
      setCart({
        ...cart,
        [selectedInsuranceId]: {
          price: customPrice,
          coverage: customization.coverage,
          extras: [
            ...(customization.extra1 ? ['Proteção Premium'] : []),
            ...(customization.extra2 ? ['Assistência Especializada'] : [])
          ]
        }
      });
      setStep('catalog');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      {/* Header Progress */}
      {['quiz', 'catalog', 'customize'].includes(step) && (
        <div className="px-6 pt-6 pb-2 sticky top-0 bg-[#FAFAFA] z-20">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => step === 'quiz' ? (quizIndex > 0 ? setQuizIndex(quizIndex - 1) : setStep('lgpd')) : setStep('catalog')}>
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <span className="text-xs font-semibold text-primary">Kover</span>
            <div className="w-5" />
          </div>
          <Progress value={currentStepProgress} className="h-1 bg-zinc-100 rounded-full [&>div]:bg-primary" />
        </div>
      )}

      {step === 'welcome' && (
        <div className="flex-1 flex flex-col p-8 pt-20 slide-in">
          <div className="mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-primary font-bold text-xl">K</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Olá, João! 👋
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed">
              Sua empresa disponibilizou <span className="text-primary font-bold">R$80/mês</span> para sua proteção financeira.
            </p>
          </div>
          <div className="mt-auto">
            <Button 
              className="w-full h-14 text-lg rounded-2xl bg-primary hover:bg-primary/90"
              onClick={() => setStep('lgpd')}
            >
              Descobrir meus planos
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {step === 'lgpd' && (
        <div className="flex-1 flex flex-col p-8 slide-in">
          <h2 className="text-3xl font-bold mb-6">Sua privacidade em primeiro lugar</h2>
          <div className="space-y-4 text-zinc-600">
            <p>Para recomendar as melhores coberturas, precisamos entender seu perfil.</p>
            <p>Seus dados são criptografados e utilizados apenas para a personalização das ofertas de seguro, seguindo a LGPD.</p>
          </div>
          <div className="mt-10 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="font-semibold">Aceito os termos</p>
              <p className="text-sm text-zinc-400">Uso de dados para cotação</p>
            </div>
            <Switch 
              checked={lgpdAccepted} 
              onCheckedChange={setLgpdAccepted}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          <div className="mt-auto">
            <Button 
              disabled={!lgpdAccepted}
              className="w-full h-14 text-lg rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-50"
              onClick={() => setStep('quiz')}
            >
              Continuar
            </Button>
          </div>
        </div>
      )}

      {step === 'quiz' && (
        <div className="flex-1 flex flex-col p-8 slide-in">
          {quizIndex === 0 && (
            <>
              <h3 className="text-2xl font-bold mb-8">Qual é a sua atividade profissional?</h3>
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Buscar profissão..." 
                  className="w-full h-12 pl-11 pr-4 bg-zinc-100 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <RadioGroup 
                value={answers.professionalActivity} 
                onValueChange={(v) => setAnswers({...answers, professionalActivity: v})}
                className="space-y-3"
              >
                {['Motorista/Entregador', 'Escritório/Administrativo', 'Operação/Campo', 'Remoto/Home office', 'Vendas externas', 'Outro'].map((opt) => (
                  <Label 
                    key={opt}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${answers.professionalActivity === opt ? 'border-primary bg-primary/5' : 'border-zinc-100 bg-white'}`}
                  >
                    <span>{opt}</span>
                    <RadioGroupItem value={opt} className="sr-only" />
                    {answers.professionalActivity === opt && <Check className="w-5 h-5 text-primary" />}
                  </Label>
                ))}
              </RadioGroup>
            </>
          )}

          {quizIndex === 1 && (
            <>
              <h3 className="text-2xl font-bold mb-8">Você utiliza veículo próprio no trabalho?</h3>
              <RadioGroup 
                value={answers.usesOwnVehicleForWork} 
                onValueChange={(v: any) => setAnswers({...answers, usesOwnVehicleForWork: v})}
                className="space-y-3"
              >
                {['Sim diariamente', 'Sim às vezes', 'Não'].map((opt) => (
                  <Label 
                    key={opt}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${answers.usesOwnVehicleForWork === opt ? 'border-primary bg-primary/5' : 'border-zinc-100 bg-white'}`}
                  >
                    <span>{opt}</span>
                    <RadioGroupItem value={opt} className="sr-only" />
                    {answers.usesOwnVehicleForWork === opt && <Check className="w-5 h-5 text-primary" />}
                  </Label>
                ))}
              </RadioGroup>
            </>
          )}

          {quizIndex === 2 && (
            <>
              <h3 className="text-2xl font-bold mb-2">Tem dependentes financeiros?</h3>
              <p className="text-zinc-400 mb-8 text-sm">Selecione todas as opções que se aplicam.</p>
              <div className="space-y-3">
                {['Filhos', 'Cônjuge', 'Pais', 'Não tenho'].map((opt) => (
                  <div 
                    key={opt}
                    onClick={() => {
                      const current = answers.financialDependents;
                      if (opt === 'Não tenho') {
                        setAnswers({...answers, financialDependents: ['Não tenho']});
                      } else {
                        const filtered = current.filter(d => d !== 'Não tenho');
                        const next = filtered.includes(opt as any) 
                          ? filtered.filter(d => d !== opt) 
                          : [...filtered, opt as any];
                        setAnswers({...answers, financialDependents: next});
                      }
                    }}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${answers.financialDependents.includes(opt as any) ? 'border-primary bg-primary/5' : 'border-zinc-100 bg-white'}`}
                  >
                    <span>{opt}</span>
                    <Checkbox checked={answers.financialDependents.includes(opt as any)} className="sr-only" />
                    {answers.financialDependents.includes(opt as any) && <Check className="w-5 h-5 text-primary" />}
                  </div>
                ))}
              </div>
            </>
          )}

          {quizIndex === 3 && (
            <>
              <h3 className="text-2xl font-bold mb-8">Qual sua maior preocupação hoje?</h3>
              <RadioGroup 
                value={answers.mainConcern} 
                onValueChange={(v: any) => setAnswers({...answers, mainConcern: v})}
                className="space-y-3"
              >
                {['Proteger minha renda', 'Proteger minha família', 'Proteger meu veículo', 'Proteger meus bens', 'Saúde e imprevistos'].map((opt) => (
                  <Label 
                    key={opt}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${answers.mainConcern === opt ? 'border-primary bg-primary/5' : 'border-zinc-100 bg-white'}`}
                  >
                    <span>{opt}</span>
                    <RadioGroupItem value={opt} className="sr-only" />
                    {answers.mainConcern === opt && <Check className="w-5 h-5 text-primary" />}
                  </Label>
                ))}
              </RadioGroup>
            </>
          )}

          <div className="mt-auto pt-6">
            <Button 
              className="w-full h-14 rounded-2xl bg-primary"
              onClick={handleNextQuiz}
              disabled={quizIndex === 0 && !answers.professionalActivity}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}

      {step === 'catalog' && (
        <div className="flex-1 flex flex-col p-6 slide-in">
          <header className="mb-6">
            <h2 className="text-2xl font-bold">Seguros recomendados</h2>
            <p className="text-zinc-500 text-sm">Com base no seu perfil de João</p>
          </header>

          <div className="grid grid-cols-1 gap-4 overflow-y-auto pb-8">
            {INSURANCE_CATALOG.map((item) => {
              const isRecommended = recommendations.find(r => MAPPING_NAME_TO_ID[r.name] === item.id)?.isRecommended;
              const inCart = !!cart[item.id];
              
              return (
                <Card 
                  key={item.id}
                  onClick={() => {
                    setSelectedInsuranceId(item.id);
                    setStep('customize');
                  }}
                  className={`p-4 rounded-3xl border-zinc-100 kover-shadow cursor-pointer hover:scale-[0.98] transition-transform flex flex-col relative ${inCart ? 'ring-2 ring-primary' : ''}`}
                >
                  {isRecommended && (
                    <Badge className="absolute top-4 right-4 bg-primary/10 text-primary hover:bg-primary/10 border-none text-[10px] px-2">
                      Recomendado
                    </Badge>
                  )}
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-xs text-zinc-400">a partir de R${item.basePrice}/{item.unit}</p>
                    </div>
                  </div>
                  {inCart && (
                    <div className="mt-2 text-xs font-semibold text-primary flex items-center">
                      <Check className="w-3 h-3 mr-1" /> No seu plano
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white border-t border-zinc-100 z-30">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-zinc-400">Total do plano</p>
                <p className="text-xl font-bold text-primary">R$ {currentTotal.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-400">Saldo restante</p>
                <p className={`text-sm font-semibold ${remainingBenefit > 0 ? 'text-secondary' : 'text-zinc-500'}`}>R$ {remainingBenefit.toFixed(2)}</p>
              </div>
            </div>
            <Button 
              disabled={currentTotal === 0}
              className="w-full h-12 rounded-xl bg-primary"
              onClick={() => setStep('review')}
            >
              Revisar plano
            </Button>
          </div>
        </div>
      )}

      {step === 'customize' && selectedInsurance && (
        <div className="flex-1 flex flex-col p-6 slide-in">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-4 mx-auto">
              <selectedInsurance.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-center">{selectedInsurance.name}</h3>
            <p className="text-zinc-500 text-center text-sm mt-2 px-6">
              {selectedInsurance.description}
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Proteção essencial</h4>
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-100">
                <div className="flex-1 pr-4">
                  <p className="font-semibold text-sm">Cobertura Principal</p>
                  <p className="text-xs text-zinc-400">Assistência completa e auxílio funeral inclusos.</p>
                </div>
                <Switch checked={true} disabled className="data-[state=checked]:bg-primary" />
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Valor da Cobertura</h4>
                <p className="text-primary font-bold">R$ {customization.coverage.toLocaleString('pt-BR')}</p>
              </div>
              <Slider 
                min={50000} 
                max={500000} 
                step={10000} 
                value={[customization.coverage]}
                onValueChange={([val]) => setCustomization({...customization, coverage: val})}
                className="[&>span:first-child]:bg-primary"
              />
              <div className="flex justify-between mt-2 text-[10px] text-zinc-400">
                <span>R$ 50 mil</span>
                <span>R$ 500 mil</span>
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Proteções extras</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-100">
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-sm">Proteção Premium</p>
                    <p className="text-xs text-zinc-400">+ Assistência em dobro (+R$ 5,50)</p>
                  </div>
                  <Switch 
                    checked={customization.extra1} 
                    onCheckedChange={(v) => setCustomization({...customization, extra1: v})}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-100">
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-sm">Assistência Especializada</p>
                    <p className="text-xs text-zinc-400">+ Suporte técnico 24h (+R$ 8,90)</p>
                  </div>
                  <Switch 
                    checked={customization.extra2} 
                    onCheckedChange={(v) => setCustomization({...customization, extra2: v})}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white border-t border-zinc-100 z-30">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-zinc-400">Valor deste seguro</p>
                <p className="text-xl font-bold text-primary">R$ {customPrice.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-400">Saldo benefício</p>
                <p className="text-sm font-semibold text-zinc-500">R$ {BENEFIT_AMOUNT.toFixed(2)}</p>
              </div>
            </div>
            <Button 
              className="w-full h-12 rounded-xl bg-primary"
              onClick={addToPlan}
            >
              Adicionar ao meu plano
            </Button>
          </div>
        </div>
      )}

      {step === 'review' && (
        <div className="flex-1 flex flex-col p-6 slide-in">
          <h2 className="text-3xl font-bold mb-8">Resumo do plano</h2>
          
          <div className="space-y-4 mb-8">
            {Object.entries(cart).map(([id, details]) => {
              const info = INSURANCE_CATALOG.find(i => i.id === id);
              return (
                <div key={id} className="p-4 bg-white rounded-3xl border border-zinc-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                      {info && <info.icon className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{info?.name}</p>
                      <p className="text-xs text-zinc-400">Cobertura: R$ {details.coverage.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>
                  <p className="font-bold text-primary">R$ {details.price.toFixed(2)}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-primary/5 p-6 rounded-[2rem] space-y-3 mb-10">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Subtotal</span>
              <span className="font-bold">R$ {currentTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Saldo do Benefício</span>
              <span className="font-bold text-secondary">- R$ {Math.min(currentTotal, BENEFIT_AMOUNT).toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-primary/10 flex justify-between items-center">
              <span className="font-bold text-lg">A pagar agora</span>
              <span className="font-black text-2xl text-primary">R$ {extraToPay.toFixed(2)}</span>
            </div>
            {extraToPay > 0 && (
              <p className="text-[10px] text-zinc-400 text-center pt-2">
                O valor excedente será descontado mensalmente via cartão cadastrado.
              </p>
            )}
          </div>

          <div className="mt-auto">
            <Button 
              className="w-full h-14 rounded-2xl bg-primary text-lg"
              onClick={() => setStep('confirmation')}
            >
              Ativar proteção
            </Button>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center slide-in">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-8 relative">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path className="check-animation" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Sua proteção está ativa!</h2>
          <p className="text-zinc-500 mb-8 px-6">
            Tudo pronto, João. Você já está protegido e seus certificados foram enviados para o e-mail.
          </p>
          
          <div className="w-full bg-zinc-50 rounded-3xl p-6 text-left mb-10">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Sua apólice digital</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Início da vigência</span>
                <span className="font-semibold">Hoje</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Seguradora líder</span>
                <span className="font-semibold">Kover & Partners</span>
              </div>
            </div>
          </div>

          <Button 
            variant="outline"
            className="w-full h-14 rounded-2xl border-zinc-200 text-zinc-600 font-bold"
            onClick={() => window.location.reload()}
          >
            Ver meus seguros
          </Button>
        </div>
      )}
    </div>
  );
}