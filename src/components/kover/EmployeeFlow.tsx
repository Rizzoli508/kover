"use client";

import React, { useState, useMemo } from 'react';
import { ChevronRight, Check, ArrowLeft, Heart, Shield, Sparkles, Wallet } from 'lucide-react';
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
    specificQuestion: '' // For contextual questions inside the insurance
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

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Step Header */}
      {step !== 'welcome' && step !== 'confirmation' && (
        <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => step === 'customize' ? setStep('catalog') : (step === 'review' ? setStep('catalog') : setStep('welcome'))}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </button>
            <h2 className="text-xl font-bold">
              {step === 'catalog' && 'Sua Proteção'}
              {step === 'customize' && `Personalizar ${selectedInsurance?.name}`}
              {step === 'review' && 'Revisar seu plano'}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Benefício Empresa</p>
              <p className="text-sm font-bold text-secondary">R$ {BENEFIT_AMOUNT.toFixed(2)}</p>
            </div>
            <div className="h-8 w-px bg-zinc-100" />
            <div className="text-right">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total Plano</p>
              <p className={`text-sm font-bold ${extraToPay > 0 ? 'text-primary' : 'text-zinc-900'}`}>R$ {currentTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {step === 'welcome' && (
        <div className="flex-1 flex items-center justify-center p-12 slide-in">
          <div className="max-w-2xl text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-black text-zinc-900 mb-6 tracking-tight">
              Olá, João! Tudo pronto para sua proteção?
            </h1>
            <p className="text-xl text-zinc-500 mb-10 leading-relaxed max-w-lg mx-auto">
              Sua empresa disponibilizou <span className="text-primary font-bold">R$ 80,00</span> mensais para você montar seu pacote de seguros e benefícios.
            </p>
            <Button 
              className="h-16 px-10 text-lg rounded-2xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 gap-3"
              onClick={() => setStep('catalog')}
            >
              Escolher meus seguros
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {step === 'catalog' && (
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSURANCE_CATALOG.map((item) => {
              const inCart = !!cart[item.id];
              return (
                <Card 
                  key={item.id}
                  onClick={() => {
                    setSelectedInsuranceId(item.id);
                    setStep('customize');
                    setCustomization({
                      coverage: 100000,
                      extra1: inCart ? cart[item.id].extras.includes('Proteção Premium') : false,
                      extra2: inCart ? cart[item.id].extras.includes('Assistência Especializada') : false,
                      specificQuestion: ''
                    });
                  }}
                  className={`group p-6 rounded-[2rem] border-zinc-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer relative flex flex-col justify-between h-64 ${inCart ? 'ring-2 ring-primary border-primary/20' : ''}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${inCart ? 'bg-primary text-white' : 'bg-primary/5 text-primary'}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      {inCart && (
                        <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold px-3 py-1">
                          NO SEU PLANO
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-zinc-900 mb-2">{item.name}</h4>
                    <p className="text-sm text-zinc-500 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm font-medium text-zinc-400">
                      a partir de <span className="text-lg font-bold text-zinc-900">R${item.basePrice}</span>/{item.unit}
                    </p>
                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Footer Bar for Catalog */}
          <div className="mt-12 p-8 bg-zinc-900 rounded-[2.5rem] flex items-center justify-between text-white sticky bottom-0">
            <div className="flex items-center gap-12">
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Total do Plano</p>
                <p className="text-3xl font-black">R$ {currentTotal.toFixed(2)}</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Saldo Restante</p>
                <p className={`text-xl font-bold ${remainingBenefit > 0 ? 'text-secondary' : 'text-white/60'}`}>R$ {remainingBenefit.toFixed(2)}</p>
              </div>
            </div>
            <Button 
              disabled={currentTotal === 0}
              className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold disabled:opacity-30 transition-all"
              onClick={() => setStep('review')}
            >
              Revisar e Ativar Plano
            </Button>
          </div>
        </div>
      )}

      {step === 'customize' && selectedInsurance && (
        <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
          <div className="flex-1 p-12 overflow-y-auto">
            <div className="max-w-xl mx-auto space-y-12">
              <header className="text-center">
                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
                  <selectedInsurance.icon className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-black text-zinc-900 mb-4">{selectedInsurance.name}</h3>
                <p className="text-lg text-zinc-500">{selectedInsurance.description}</p>
              </header>

              {/* CONTEXTUAL QUESTIONS - ONLY ASK WHEN NECESSARY */}
              {selectedInsurance.id === 'auto' && (
                <section className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
                  <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Pergunta rápida
                  </h4>
                  <p className="text-lg font-bold text-zinc-900 mb-4">Você utiliza seu veículo para trabalhar (ex: entregas)?</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Sim', 'Às vezes', 'Não'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setCustomization({...customization, specificQuestion: opt})}
                        className={`py-3 rounded-xl border font-bold transition-all ${customization.specificQuestion === opt ? 'bg-primary text-white border-primary' : 'bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Valor da Cobertura</h4>
                  <p className="text-2xl font-black text-primary">R$ {customization.coverage.toLocaleString('pt-BR')}</p>
                </div>
                <Slider 
                  min={50000} 
                  max={500000} 
                  step={10000} 
                  value={[customization.coverage]}
                  onValueChange={([val]) => setCustomization({...customization, coverage: val})}
                  className="[&>span:first-child]:bg-primary h-2"
                />
                <div className="flex justify-between mt-4 text-xs font-bold text-zinc-400">
                  <span>Mínimo: R$ 50 mil</span>
                  <span>Máximo: R$ 500 mil</span>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">Upgrades Disponíveis</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-zinc-100 hover:shadow-lg hover:shadow-zinc-400/5 transition-all">
                    <div>
                      <p className="font-bold text-lg">Proteção Premium</p>
                      <p className="text-sm text-zinc-500">Dobra os valores de assistência emergencial.</p>
                      <p className="text-xs font-bold text-primary mt-1">+ R$ 5,50/mês</p>
                    </div>
                    <Switch checked={customization.extra1} onCheckedChange={(v) => setCustomization({...customization, extra1: v})} />
                  </div>
                  <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-zinc-100 hover:shadow-lg hover:shadow-zinc-400/5 transition-all">
                    <div>
                      <p className="font-bold text-lg">Assistência Especializada</p>
                      <p className="text-sm text-zinc-500">Canal de suporte 24h via WhatsApp.</p>
                      <p className="text-xs font-bold text-primary mt-1">+ R$ 8,90/mês</p>
                    </div>
                    <Switch checked={customization.extra2} onCheckedChange={(v) => setCustomization({...customization, extra2: v})} />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Side Bar for Customization Summary */}
          <div className="w-full lg:w-96 bg-zinc-50 border-l border-zinc-100 p-12 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-8">Resumo da Proteção</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-zinc-900">Base</p>
                    <p className="text-xs text-zinc-500">Plano Essencial Kover</p>
                  </div>
                  <p className="font-bold text-zinc-900">R$ {selectedInsurance.basePrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-zinc-900">Cobertura Extra</p>
                    <p className="text-xs text-zinc-500">R$ {(customization.coverage - 50000).toLocaleString('pt-BR')} adicional</p>
                  </div>
                  <p className="font-bold text-zinc-900">R$ {(Math.max(0, (customization.coverage - 50000) / 10000) * 0.5).toFixed(2)}</p>
                </div>
                {(customization.extra1 || customization.extra2) && (
                  <div className="pt-6 border-t border-zinc-200 space-y-4">
                    {customization.extra1 && (
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-zinc-500">Proteção Premium</span>
                        <span className="text-zinc-900">R$ 5.50</span>
                      </div>
                    )}
                    {customization.extra2 && (
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-zinc-500">Assistência Esp.</span>
                        <span className="text-zinc-900">R$ 8.90</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-200">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Valor Mensal</p>
                  <p className="text-3xl font-black text-primary">R$ {customPrice.toFixed(2)}</p>
                </div>
              </div>
              <Button 
                className="w-full h-16 rounded-[1.5rem] bg-zinc-900 text-white hover:bg-zinc-800 font-bold text-lg shadow-xl shadow-zinc-900/10"
                onClick={addToPlan}
              >
                Confirmar Proteção
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 'review' && (
        <div className="flex-1 p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black text-zinc-900 mb-12 tracking-tight">Revise seu plano de segurança</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                {Object.entries(cart).map(([id, details]) => {
                  const info = INSURANCE_CATALOG.find(i => i.id === id);
                  return (
                    <div key={id} className="p-8 bg-white rounded-[2rem] border border-zinc-100 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                          {info && <info.icon className="w-7 h-7" />}
                        </div>
                        <div>
                          <p className="font-bold text-xl">{info?.name}</p>
                          <p className="text-sm text-zinc-400 font-medium">Cobertura: R$ {details.coverage.toLocaleString('pt-BR')}</p>
                        </div>
                      </div>
                      <p className="text-xl font-black text-primary">R$ {details.price.toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-zinc-900 text-white p-10 rounded-[3rem] h-fit sticky top-8">
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-8">RESUMO FINANCEIRO</h4>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-lg">
                    <span className="text-white/60">Subtotal</span>
                    <span className="font-bold">R$ {currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-white/60">Saldo Benefício Kover</span>
                    <span className="font-bold text-secondary">- R$ {Math.min(currentTotal, BENEFIT_AMOUNT).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total a pagar agora</span>
                    <span className="text-4xl font-black text-primary">R$ {extraToPay.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-16 rounded-[1.5rem] bg-white text-zinc-900 hover:bg-zinc-100 font-black text-xl transition-transform active:scale-95"
                  onClick={() => setStep('confirmation')}
                >
                  Confirmar e Ativar
                </Button>
                
                {extraToPay > 0 && (
                  <p className="text-center text-[11px] text-white/30 mt-6 font-medium">
                    O valor excedente de R$ {extraToPay.toFixed(2)} será descontado mensalmente via folha de pagamento.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 slide-in bg-white">
          <div className="max-w-xl text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-10 mx-auto relative shadow-2xl shadow-secondary/20">
              <Check className="w-12 h-12 text-white stroke-[4px]" />
            </div>
            <h2 className="text-5xl font-black text-zinc-900 mb-6 tracking-tight">Tudo pronto! Sua segurança está ativa.</h2>
            <p className="text-xl text-zinc-500 mb-12 leading-relaxed">
              João, você acabou de dar um passo importante. Seus certificados e apólices foram enviados para seu e-mail corporativo.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-zinc-50 p-6 rounded-[2rem] text-left">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">VIGÊNCIA</p>
                <p className="font-bold text-zinc-900">Início imediato</p>
              </div>
              <div className="bg-zinc-50 p-6 rounded-[2rem] text-left">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">SEGURADORA</p>
                <p className="font-bold text-zinc-900">Kover Partners</p>
              </div>
            </div>

            <Button 
              className="h-16 px-12 rounded-2xl bg-zinc-900 text-white font-bold text-lg hover:bg-zinc-800"
              onClick={() => setStep('welcome')}
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
