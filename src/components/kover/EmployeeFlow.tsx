
"use client";

import React, { useState, useMemo } from 'react';
import { ChevronRight, Check, ArrowLeft, Heart, Shield, Sparkles, Wallet, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INSURANCE_CATALOG } from '@/lib/insurance-data';

type Step = 'welcome' | 'catalog' | 'customize' | 'review' | 'confirmation';

export function EmployeeFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, { price: number, coverage: number, extras: string[] }>>({});
  
  const BENEFIT_AMOUNT = 80;

  // Personalization state
  const [customization, setCustomization] = useState({
    coverage: 100000,
    extra1: false,
    extra2: false,
    specificQuestion: '' 
  });

  const selectedInsurance = useMemo(() => 
    INSURANCE_CATALOG.find(i => i.id === selectedInsuranceId),
  [selectedInsuranceId]);

  const currentTotal = Object.values(cart).reduce((acc, item) => acc + item.price, 0);
  const remainingBenefit = Math.max(0, BENEFIT_AMOUNT - currentTotal);
  const extraToPay = Math.max(0, currentTotal - BENEFIT_AMOUNT);

  const customPrice = useMemo(() => {
    if (!selectedInsurance) return 0;
    let price = selectedInsurance.basePrice;
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

  const removeFromPlan = (id: string) => {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
      {/* Header Contextual */}
      {step !== 'welcome' && step !== 'confirmation' && (
        <div className="px-12 py-6 border-b border-zinc-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => step === 'customize' ? setStep('catalog') : (step === 'review' ? setStep('catalog') : setStep('welcome'))}
              className="p-3 hover:bg-zinc-100 rounded-2xl transition-colors text-zinc-400 hover:text-primary"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                {step === 'catalog' && 'Sua Proteção'}
                {step === 'customize' && `Personalizar ${selectedInsurance?.name}`}
                {step === 'review' && 'Revisar seu plano'}
              </h2>
              {step === 'catalog' && <p className="text-sm font-bold text-zinc-400">ESCOLHA AS COBERTURAS QUE FAZEM SENTIDO PARA VOCÊ</p>}
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3 px-6 py-3 bg-zinc-50 rounded-2xl border border-zinc-100">
                <Info className="w-4 h-4 text-zinc-300" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Saldo disponível:</span>
                <span className="text-lg font-black text-secondary">R$ {remainingBenefit.toFixed(2)}</span>
             </div>
          </div>
        </div>
      )}

      {step === 'welcome' && (
        <div className="flex-1 flex items-center justify-center p-12 slide-in">
          <div className="max-w-3xl text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-primary/5">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-6xl font-black text-zinc-900 mb-8 tracking-tighter leading-tight">
              Olá, João!<br/>Pronto para montar sua <span className="text-primary">rede de proteção?</span>
            </h1>
            <p className="text-2xl text-zinc-500 mb-12 leading-relaxed max-w-xl mx-auto">
              Sua empresa disponibilizou <span className="text-zinc-900 font-black decoration-primary decoration-4 underline underline-offset-8">R$ 80,00</span> mensais para você escolher os seguros que mais combinam com seu estilo de vida.
            </p>
            <Button 
              className="h-20 px-12 text-xl rounded-[1.5rem] bg-zinc-900 hover:bg-zinc-800 text-white shadow-2xl shadow-zinc-900/20 gap-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setStep('catalog')}
            >
              Começar agora
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}

      {step === 'catalog' && (
        <div className="flex-1 overflow-y-auto p-12">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* BUDGET BAR NO TOPO - CONFORME SOLICITADO */}
            <div className="p-8 bg-zinc-950 rounded-[2.5rem] flex items-center justify-between text-white shadow-2xl shadow-zinc-950/20 sticky top-4 z-40 transition-all border border-white/5">
              <div className="flex items-center gap-16 ml-4">
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.25em] mb-2">TOTAL DO PLANO</p>
                  <p className="text-4xl font-black">R$ {currentTotal.toFixed(2)}</p>
                </div>
                <div className="h-14 w-px bg-zinc-800" />
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.25em] mb-2">SALDO RESTANTE</p>
                  <p className={`text-4xl font-black ${remainingBenefit > 0 ? 'text-secondary' : 'text-zinc-600'}`}>
                    R$ {remainingBenefit.toFixed(2)}
                  </p>
                </div>
              </div>
              <Button 
                disabled={currentTotal === 0}
                className="h-16 px-12 rounded-[1.25rem] bg-primary hover:bg-primary/90 text-xl font-black disabled:opacity-20 transition-all shadow-xl shadow-primary/20 mr-2"
                onClick={() => setStep('review')}
              >
                Revisar e Ativar Plano
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INSURANCE_CATALOG.map((item) => {
                const inCart = !!cart[item.id];
                return (
                  <Card 
                    key={item.id}
                    onClick={() => {
                      setSelectedInsuranceId(item.id);
                      setStep('customize');
                      setCustomization({
                        coverage: inCart ? cart[item.id].coverage : 100000,
                        extra1: inCart ? cart[item.id].extras.includes('Proteção Premium') : false,
                        extra2: inCart ? cart[item.id].extras.includes('Assistência Especializada') : false,
                        specificQuestion: ''
                      });
                    }}
                    className={`group p-8 rounded-[2.5rem] border-zinc-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer relative flex flex-col justify-between h-72 bg-white ${inCart ? 'ring-2 ring-primary border-transparent' : ''}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all ${inCart ? 'bg-primary text-white scale-110' : 'bg-zinc-50 text-zinc-400 group-hover:bg-primary/5 group-hover:text-primary'}`}>
                          <item.icon className="w-8 h-8" />
                        </div>
                        {inCart && (
                          <Badge className="bg-primary text-white border-none text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                            No seu plano
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-2xl font-black text-zinc-900 mb-2">{item.name}</h4>
                      <p className="text-sm text-zinc-400 font-medium leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div>
                        <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">A partir de</p>
                        <p className="text-xl font-black text-zinc-900">R$ {item.basePrice}<span className="text-sm font-bold text-zinc-400 ml-1">/{item.unit}</span></p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 'customize' && selectedInsurance && (
        <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
          <div className="flex-1 p-12 lg:p-20 overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-16">
              <header className="flex items-center gap-8">
                <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary shadow-inner">
                  <selectedInsurance.icon className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-5xl font-black text-zinc-900 mb-2">{selectedInsurance.name}</h3>
                  <p className="text-xl text-zinc-400 font-medium leading-relaxed">{selectedInsurance.description}</p>
                </div>
              </header>

              {/* PERGUNTAS CONTEXTUAIS - APENAS QUANDO NECESSÁRIO */}
              {selectedInsurance.id === 'auto' && (
                <section className="p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10 slide-in">
                  <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                    <Sparkles className="w-5 h-5" /> Pergunta rápida
                  </h4>
                  <p className="text-2xl font-black text-zinc-900 mb-8">Você utiliza seu veículo para atividades profissionais (ex: entregas ou visitas)?</p>
                  <div className="grid grid-cols-3 gap-4">
                    {['Sim diariamente', 'Às vezes', 'Não'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setCustomization({...customization, specificQuestion: opt})}
                        className={`py-5 rounded-2xl border-2 font-black transition-all text-sm uppercase tracking-widest ${customization.specificQuestion === opt ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section className="space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Valor da Cobertura</h4>
                    <p className="text-sm font-medium text-zinc-400">Arraste para ajustar o capital segurado</p>
                  </div>
                  <p className="text-5xl font-black text-primary">R$ {customization.coverage.toLocaleString('pt-BR')}</p>
                </div>
                <Slider 
                  min={50000} 
                  max={500000} 
                  step={10000} 
                  value={[customization.coverage]}
                  onValueChange={([val]) => setCustomization({...customization, coverage: val})}
                  className="h-3"
                />
                <div className="flex justify-between text-xs font-black text-zinc-300 uppercase tracking-widest">
                  <span>Mínimo: R$ 50 mil</span>
                  <span>Máximo: R$ 500 mil</span>
                </div>
              </section>

              <section className="space-y-6">
                <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Upgrades Premium</h4>
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center justify-between p-8 bg-white rounded-[2rem] border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/20 transition-all">
                    <div className="flex gap-6 items-center">
                      <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400">
                         <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black text-xl text-zinc-900">Proteção Premium</p>
                        <p className="text-sm text-zinc-400 font-medium">Dobra os valores de assistência emergencial.</p>
                        <p className="text-xs font-black text-primary mt-2 uppercase tracking-widest">+ R$ 5,50/mês</p>
                      </div>
                    </div>
                    <Switch checked={customization.extra1} onCheckedChange={(v) => setCustomization({...customization, extra1: v})} className="scale-125" />
                  </div>
                  <div className="flex items-center justify-between p-8 bg-white rounded-[2rem] border border-zinc-100 hover:shadow-xl hover:shadow-zinc-200/20 transition-all">
                    <div className="flex gap-6 items-center">
                      <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400">
                         <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black text-xl text-zinc-900">Assistência Especializada</p>
                        <p className="text-sm text-zinc-400 font-medium">Canal de suporte 24h prioritário via WhatsApp.</p>
                        <p className="text-xs font-black text-primary mt-2 uppercase tracking-widest">+ R$ 8,90/mês</p>
                      </div>
                    </div>
                    <Switch checked={customization.extra2} onCheckedChange={(v) => setCustomization({...customization, extra2: v})} className="scale-125" />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Lateral de Resumo - Desktop */}
          <div className="w-full lg:w-[450px] bg-white border-l border-zinc-100 p-12 lg:p-16 flex flex-col justify-between shadow-2xl">
            <div>
              <h4 className="text-xs font-black text-zinc-300 uppercase tracking-[0.2em] mb-12">RESUMO DA PROTEÇÃO</h4>
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-black text-xl text-zinc-900">Assinatura Base</p>
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">Plano Essencial Kover</p>
                  </div>
                  <p className="font-black text-xl text-zinc-900">R$ {selectedInsurance.basePrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-black text-xl text-zinc-900">Cobertura Extra</p>
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">R$ {(customization.coverage - 50000).toLocaleString('pt-BR')} adicional</p>
                  </div>
                  <p className="font-black text-xl text-zinc-900">R$ {(Math.max(0, (customization.coverage - 50000) / 10000) * 0.5).toFixed(2)}</p>
                </div>
                {(customization.extra1 || customization.extra2) && (
                  <div className="pt-8 border-t border-zinc-100 space-y-6">
                    {customization.extra1 && (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 font-bold">Proteção Premium</span>
                        <span className="text-zinc-900 font-black">R$ 5.50</span>
                      </div>
                    )}
                    {customization.extra2 && (
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 font-bold">Assistência Especializada</span>
                        <span className="text-zinc-900 font-black">R$ 8.90</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-12 border-t border-zinc-100">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <p className="text-xs font-black text-zinc-300 uppercase tracking-widest mb-2">Valor Mensal</p>
                  <p className="text-5xl font-black text-primary">R$ {customPrice.toFixed(2)}</p>
                </div>
              </div>
              <Button 
                className="w-full h-20 rounded-[1.5rem] bg-zinc-900 text-white hover:bg-zinc-800 font-black text-xl shadow-2xl shadow-zinc-900/10 transition-transform active:scale-[0.98]"
                onClick={addToPlan}
              >
                Confirmar Proteção
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 'review' && (
        <div className="flex-1 p-12 lg:p-24 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-black text-zinc-900 mb-16 tracking-tighter leading-tight">Revise seu <span className="text-primary">plano de segurança</span></h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-8">
                {Object.entries(cart).map(([id, details]) => {
                  const info = INSURANCE_CATALOG.find(i => i.id === id);
                  return (
                    <div key={id} className="p-10 bg-white rounded-[2.5rem] border border-zinc-100 flex justify-between items-center shadow-sm relative group overflow-hidden">
                      <div className="flex items-center gap-8 relative z-10">
                        <div className="w-20 h-20 bg-primary/5 rounded-[1.5rem] flex items-center justify-center text-primary">
                          {info && <info.icon className="w-10 h-10" />}
                        </div>
                        <div>
                          <p className="font-black text-2xl text-zinc-900">{info?.name}</p>
                          <p className="text-sm text-zinc-400 font-black uppercase tracking-widest mt-1">Cobertura: R$ {details.coverage.toLocaleString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="text-right relative z-10">
                         <p className="text-3xl font-black text-primary">R$ {details.price.toFixed(2)}</p>
                         <button 
                          onClick={() => removeFromPlan(id)}
                          className="text-[10px] font-black text-zinc-300 hover:text-destructive uppercase tracking-widest mt-2"
                         >
                          Remover
                         </button>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
                {Object.keys(cart).length === 0 && (
                  <div className="text-center p-20 bg-zinc-50 rounded-[2.5rem] border-2 border-dashed border-zinc-200">
                    <p className="text-zinc-400 font-bold">Nenhum seguro selecionado ainda.</p>
                  </div>
                )}
              </div>

              <div className="bg-zinc-950 text-white p-12 lg:p-16 rounded-[3rem] h-fit sticky top-24 shadow-2xl shadow-zinc-950/20">
                <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-12">RESUMO FINANCEIRO</h4>
                <div className="space-y-8 mb-12">
                  <div className="flex justify-between text-xl">
                    <span className="text-zinc-500 font-bold">Valor Total das Proteções</span>
                    <span className="font-black">R$ {currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl">
                    <span className="text-zinc-500 font-bold">Benefício TechLog</span>
                    <span className="font-black text-secondary">- R$ {Math.min(currentTotal, BENEFIT_AMOUNT).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/5 my-4" />
                  <div className="flex justify-between items-center">
                    <div>
                       <span className="text-2xl font-black block">Investimento Mensal</span>
                       <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">DESCONTO EM FOLHA (EXCEDENTE)</span>
                    </div>
                    <span className="text-6xl font-black text-primary">R$ {extraToPay.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-24 rounded-[1.75rem] bg-white text-zinc-950 hover:bg-zinc-100 font-black text-2xl transition-all shadow-xl shadow-white/5 active:scale-[0.98]"
                  onClick={() => setStep('confirmation')}
                >
                  Ativar Minha Proteção
                </Button>
                
                {extraToPay > 0 && (
                  <div className="mt-8 flex gap-4 p-6 bg-white/5 rounded-2xl items-center">
                    <Info className="w-5 h-5 text-zinc-500" />
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                      O valor excedente de <strong>R$ {extraToPay.toFixed(2)}</strong> será debitado automaticamente em sua folha de pagamento.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 slide-in bg-white">
          <div className="max-w-2xl text-center">
            <div className="w-32 h-32 rounded-[2.5rem] bg-secondary flex items-center justify-center mb-12 mx-auto relative shadow-2xl shadow-secondary/20">
              <Check className="w-16 h-16 text-white stroke-[4px]" />
            </div>
            <h2 className="text-6xl font-black text-zinc-900 mb-8 tracking-tighter leading-tight">Parabéns, João!<br/>Você agora está <span className="text-secondary">protegido.</span></h2>
            <p className="text-2xl text-zinc-500 mb-16 leading-relaxed">
              Sua escolha foi confirmada com sucesso. Em instantes você receberá as apólices digitais em seu e-mail corporativo.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-16">
              <div className="bg-zinc-50 p-8 rounded-[2.5rem] text-left border border-zinc-100">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">VIGÊNCIA</p>
                <p className="font-black text-2xl text-zinc-900">Início imediato</p>
              </div>
              <div className="bg-zinc-50 p-8 rounded-[2.5rem] text-left border border-zinc-100">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">PRÓXIMA RENOVAÇÃO</p>
                <p className="font-black text-2xl text-zinc-900">12 meses</p>
              </div>
            </div>

            <Button 
              className="h-20 px-16 rounded-[1.5rem] bg-zinc-900 text-white font-black text-xl hover:bg-zinc-800 shadow-2xl shadow-zinc-900/10"
              onClick={() => {
                setCart({});
                setStep('welcome');
              }}
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
