"use client";

import React, { useState, useMemo } from 'react';
import { ChevronRight, Check, ArrowLeft, Heart, Shield, Sparkles, Wallet, Info, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INSURANCE_CATALOG, Protection } from '@/lib/insurance-data';
import { cn } from '@/lib/utils';

type Step = 'welcome' | 'catalog' | 'customize' | 'review' | 'confirmation';

export function EmployeeFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, { price: number, activeProtections: string[] }>>({});
  
  const BENEFIT_AMOUNT = 80;

  // Personalization state
  const [activeProtections, setActiveProtections] = useState<string[]>([]);

  const selectedInsurance = useMemo(() => 
    INSURANCE_CATALOG.find(i => i.id === selectedInsuranceId),
  [selectedInsuranceId]);

  const currentTotal = Object.values(cart).reduce((acc, item) => acc + item.price, 0);
  const remainingBenefit = Math.max(0, BENEFIT_AMOUNT - currentTotal);
  
  const customPrice = useMemo(() => {
    if (!selectedInsurance) return 0;
    return selectedInsurance.protections
      .filter(p => activeProtections.includes(p.id))
      .reduce((acc, p) => acc + p.price, 0);
  }, [selectedInsurance, activeProtections]);

  const addToPlan = () => {
    if (selectedInsuranceId) {
      setCart({
        ...cart,
        [selectedInsuranceId]: {
          price: customPrice,
          activeProtections: [...activeProtections]
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

  const toggleProtection = (id: string) => {
    setActiveProtections(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const renderProtectionCard = (p: Protection) => (
    <div key={p.id} className="flex flex-col bg-white rounded-3xl mb-4 overflow-hidden shadow-sm border border-zinc-50 transition-all hover:shadow-md">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900">
            <p.icon className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-zinc-900">{p.name}</span>
        </div>
        <ChevronRight className="w-5 h-5 text-zinc-300" />
      </div>
      <div className="h-px bg-zinc-100 mx-6" />
      <div className="flex items-center justify-between p-6 bg-white">
        <div>
          <p className="text-zinc-500 font-medium">{p.description}</p>
          <p className="text-xs font-black text-primary uppercase mt-1">R$ {p.price.toFixed(2)} / mês</p>
        </div>
        <Switch 
          checked={activeProtections.includes(p.id)} 
          onCheckedChange={() => toggleProtection(p.id)}
          className="data-[state=checked]:bg-primary"
        />
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F5F5F7]">
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
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">
                {step === 'catalog' && 'Sua Proteção'}
                {step === 'customize' && selectedInsurance?.name}
                {step === 'review' && 'Revisar seu plano'}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3 px-6 py-3 bg-zinc-50 rounded-2xl border border-zinc-100">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Saldo disponível:</span>
                <span className="text-lg font-black text-secondary">R$ {remainingBenefit.toFixed(2)}</span>
             </div>
          </div>
        </div>
      )}

      {step === 'welcome' && (
        <div className="flex-1 flex items-center justify-center p-12 slide-in bg-white">
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
              className="h-20 px-12 text-xl rounded-[1.5rem] bg-zinc-900 hover:bg-zinc-800 text-white shadow-2xl shadow-zinc-900/20 gap-4 transition-transform hover:scale-[1.02]"
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
            
            <div className="p-8 bg-zinc-950 rounded-[2.5rem] flex items-center justify-between text-white shadow-2xl shadow-zinc-950/20 sticky top-4 z-40 border border-white/5">
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
                      setActiveProtections(inCart ? cart[item.id].activeProtections : item.protections.filter(p => p.type === 'essential').map(p => p.id));
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
          <div className="flex-1 p-12 lg:p-20 overflow-y-auto bg-[#F5F5F7]">
            <div className="max-w-xl mx-auto">
              
              <section className="mb-12">
                <h3 className="text-2xl font-black text-zinc-900 mb-8">Proteções essenciais</h3>
                {selectedInsurance.protections.filter(p => p.type === 'essential').map(renderProtectionCard)}
              </section>

              <section className="mb-12">
                <h3 className="text-2xl font-black text-zinc-900 mb-8">Proteções extra</h3>
                {selectedInsurance.protections.filter(p => p.type === 'extra').map(renderProtectionCard)}
              </section>

            </div>
          </div>

          {/* Resumo Estilo Nubank Lateral */}
          <div className="w-full lg:w-[450px] bg-white border-l border-zinc-100 p-12 lg:p-16 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="w-20 h-20 bg-primary/5 rounded-[1.5rem] flex items-center justify-center text-primary mb-8">
                <selectedInsurance.icon className="w-10 h-10" />
              </div>
              <h3 className="text-4xl font-black text-zinc-900 mb-4">{selectedInsurance.name}</h3>
              <p className="text-zinc-400 font-medium mb-12">{selectedInsurance.description}</p>
              
              <div className="space-y-6">
                <p className="text-[11px] font-black text-zinc-300 uppercase tracking-[0.2em]">RESUMO DO ITEM</p>
                {selectedInsurance.protections.filter(p => activeProtections.includes(p.id)).map(p => (
                  <div key={p.id} className="flex justify-between items-center slide-in">
                    <span className="text-zinc-600 font-bold">{p.name}</span>
                    <span className="text-zinc-900 font-black">R$ {p.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-zinc-100">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">Total deste item</p>
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
        <div className="flex-1 p-12 lg:p-24 overflow-y-auto bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-black text-zinc-900 mb-16 tracking-tighter leading-tight">Revise seu <span className="text-primary">plano de segurança</span></h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-8">
                {Object.entries(cart).map(([id, details]) => {
                  const info = INSURANCE_CATALOG.find(i => i.id === id);
                  return (
                    <div key={id} className="p-10 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 flex justify-between items-center relative group overflow-hidden">
                      <div className="flex items-center gap-8 relative z-10">
                        <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center text-primary shadow-sm">
                          {info && <info.icon className="w-10 h-10" />}
                        </div>
                        <div>
                          <p className="font-black text-2xl text-zinc-900">{info?.name}</p>
                          <p className="text-xs text-zinc-400 font-black uppercase tracking-widest mt-1">{details.activeProtections.length} coberturas ativas</p>
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
                    </div>
                  );
                })}
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
                       <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">DESCONTO EM FOLHA</span>
                    </div>
                    <span className="text-6xl font-black text-primary">R$ {Math.max(0, currentTotal - BENEFIT_AMOUNT).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-24 rounded-[1.75rem] bg-white text-zinc-950 hover:bg-zinc-100 font-black text-2xl transition-all shadow-xl active:scale-[0.98]"
                  onClick={() => setStep('confirmation')}
                >
                  Ativar Minha Proteção
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 slide-in bg-white">
          <div className="max-w-2xl text-center">
            <div className="w-32 h-32 rounded-[2.5rem] bg-secondary flex items-center justify-center mb-12 mx-auto shadow-2xl shadow-secondary/20">
              <Check className="w-16 h-16 text-white stroke-[4px]" />
            </div>
            <h2 className="text-6xl font-black text-zinc-900 mb-8 tracking-tighter leading-tight">Parabéns, João!<br/>Você agora está <span className="text-secondary">protegido.</span></h2>
            <p className="text-2xl text-zinc-500 mb-16 leading-relaxed">
              Sua escolha foi confirmada com sucesso. Em instantes você receberá as apólices digitais em seu e-mail corporativo.
            </p>
            <Button 
              className="h-20 px-16 rounded-[1.5rem] bg-zinc-900 text-white font-black text-xl hover:bg-zinc-800 shadow-2xl"
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
