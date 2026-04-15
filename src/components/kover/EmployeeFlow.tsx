
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
    <div key={p.id} className="flex flex-col bg-white rounded-[2rem] mb-4 overflow-hidden border border-zinc-100 transition-all hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-900">
            <p.icon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-zinc-900 block">{p.name}</span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">R$ {p.price.toFixed(2)}/mês</span>
          </div>
        </div>
        <Switch 
          checked={activeProtections.includes(p.id)} 
          onCheckedChange={() => toggleProtection(p.id)}
          className="data-[state=checked]:bg-primary"
        />
      </div>
      <div className="px-6 pb-6 pt-2">
        <p className="text-sm text-zinc-400 font-medium leading-relaxed">{p.description}</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
      {/* Barra de Orçamento Fixa (Estilo Clean) */}
      {(step === 'catalog' || step === 'customize' || step === 'review') && (
        <div className="bg-zinc-950 text-white sticky top-14 z-[90] shadow-xl">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => step === 'customize' ? setStep('catalog') : (step === 'review' ? setStep('catalog') : setStep('welcome'))}
              >
                <ArrowLeft className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors">Voltar</span>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">TOTAL ACUMULADO</p>
                  <p className="text-xl font-black">R$ {currentTotal.toFixed(2)}</p>
                </div>
                <div className="h-6 w-px bg-zinc-800" />
                <div>
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">SALDO DISPONÍVEL</p>
                  <p className={`text-xl font-black ${remainingBenefit > 0 ? 'text-secondary' : 'text-zinc-600'}`}>
                    R$ {remainingBenefit.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {step === 'catalog' && (
              <Button 
                disabled={currentTotal === 0}
                onClick={() => setStep('review')}
                className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-xl font-black text-sm disabled:opacity-20 transition-all shadow-lg shadow-primary/20"
              >
                Revisar e Ativar
              </Button>
            )}
          </div>
        </div>
      )}

      {step === 'welcome' && (
        <div className="flex-1 flex items-center justify-center p-12 bg-white">
          <div className="max-w-3xl text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-6xl font-black text-zinc-900 mb-8 tracking-tighter leading-tight">
              Olá, Thomas!<br/>Pronto para montar sua <span className="text-primary">rede de proteção?</span>
            </h1>
            <p className="text-2xl text-zinc-500 mb-12 leading-relaxed max-w-xl mx-auto">
              A sua empresa liberou <span className="text-zinc-900 font-black decoration-primary/30 decoration-8 underline underline-offset-4">R$ 80,00</span> para você escolher os benefícios que desejar.
            </p>
            <Button 
              className="h-20 px-12 text-xl rounded-[1.75rem] bg-zinc-900 hover:bg-zinc-800 text-white shadow-2xl gap-4 transition-transform hover:scale-[1.02]"
              onClick={() => setStep('catalog')}
            >
              Começar agora
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}

      {step === 'catalog' && (
        <div className="flex-1 overflow-y-auto py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-12">
              <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-2">Seu Catálogo de Benefícios</h2>
              <p className="text-zinc-400 font-medium">Escolha as proteções que fazem sentido para o seu momento.</p>
            </header>

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
                    className={`group p-8 rounded-[2.5rem] border-zinc-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer relative flex flex-col justify-between h-80 bg-white ${inCart ? 'ring-2 ring-primary border-transparent shadow-xl shadow-primary/5' : ''}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all ${inCart ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-zinc-50 text-zinc-400 group-hover:bg-primary/5 group-hover:text-primary'}`}>
                          <item.icon className="w-8 h-8" />
                        </div>
                        {inCart && (
                          <Badge className="bg-primary text-white border-none text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em]">
                            SELECIONADO
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-2xl font-black text-zinc-900 mb-2">{item.name}</h4>
                      <p className="text-sm text-zinc-400 font-medium leading-relaxed line-clamp-3">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-50">
                      <div>
                        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Investimento</p>
                        <p className="text-xl font-black text-zinc-900">R$ {item.basePrice}<span className="text-sm font-bold text-zinc-400 ml-1">/{item.unit}</span></p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1">
                        <ChevronRight className="w-5 h-5" />
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
        <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-136px)] overflow-hidden">
          <div className="flex-1 p-12 lg:p-16 overflow-y-auto bg-zinc-50/50">
            <div className="max-w-2xl mx-auto space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <h3 className="text-xl font-black text-zinc-900 uppercase tracking-widest">Proteções essenciais</h3>
                </div>
                {selectedInsurance.protections.filter(p => p.type === 'essential').map(renderProtectionCard)}
              </section>

              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-zinc-300" />
                  <h3 className="text-xl font-black text-zinc-900 uppercase tracking-widest">Personalizar Extras</h3>
                </div>
                {selectedInsurance.protections.filter(p => p.type === 'extra').map(renderProtectionCard)}
              </section>
            </div>
          </div>

          <aside className="w-full lg:w-[450px] bg-white border-l border-zinc-100 p-12 lg:p-16 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center text-primary mb-8">
                <selectedInsurance.icon className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-4xl font-black text-zinc-900 mb-4">{selectedInsurance.name}</h3>
                <p className="text-zinc-400 font-medium leading-relaxed">{selectedInsurance.description}</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] pt-8 border-t border-zinc-100">ITENS SELECIONADOS</p>
                {selectedInsurance.protections.filter(p => activeProtections.includes(p.id)).map(p => (
                  <div key={p.id} className="flex justify-between items-center py-1 slide-in">
                    <span className="text-zinc-600 font-bold">{p.name}</span>
                    <span className="text-zinc-900 font-black">R$ {p.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12">
              <div className="mb-10">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-1">TOTAL DESTE ITEM</p>
                <p className="text-5xl font-black text-primary">R$ {customPrice.toFixed(2)}</p>
              </div>
              <Button 
                className="w-full h-20 rounded-[1.75rem] bg-zinc-900 text-white hover:bg-zinc-800 font-black text-xl shadow-2xl transition-transform active:scale-[0.98]"
                onClick={addToPlan}
              >
                Confirmar Escolha
              </Button>
            </div>
          </aside>
        </div>
      )}

      {step === 'review' && (
        <div className="flex-1 p-12 lg:p-24 overflow-y-auto bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-6xl font-black text-zinc-900 mb-16 tracking-tighter leading-tight">Revise seu <span className="text-primary">plano de segurança</span></h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-6">
                {Object.entries(cart).map(([id, details]) => {
                  const info = INSURANCE_CATALOG.find(i => i.id === id);
                  return (
                    <div key={id} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 flex justify-between items-center group transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                          {info && <info.icon className="w-8 h-8" />}
                        </div>
                        <div>
                          <p className="font-black text-xl text-zinc-900">{info?.name}</p>
                          <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mt-1">{details.activeProtections.length} coberturas ativas</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-2xl font-black text-primary">R$ {details.price.toFixed(2)}</p>
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

              <div className="bg-zinc-950 text-white p-12 lg:p-16 rounded-[3rem] h-fit sticky top-24 shadow-2xl">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-12">RESUMO MENSAL</h4>
                <div className="space-y-8 mb-12">
                  <div className="flex justify-between text-lg">
                    <span className="text-zinc-500 font-bold">Total Proteções</span>
                    <span className="font-black">R$ {currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-zinc-500 font-bold">Benefício Empresa</span>
                    <span className="font-black text-secondary">- R$ {Math.min(currentTotal, BENEFIT_AMOUNT).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-zinc-800" />
                  <div className="flex justify-between items-center">
                    <div>
                       <span className="text-2xl font-black block leading-none">Você investe</span>
                       <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">DESCONTO EM FOLHA</span>
                    </div>
                    <span className="text-6xl font-black text-primary">R$ {Math.max(0, currentTotal - BENEFIT_AMOUNT).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-24 rounded-[2rem] bg-white text-zinc-950 hover:bg-zinc-100 font-black text-2xl transition-all shadow-xl active:scale-[0.98]"
                  onClick={() => setStep('confirmation')}
                >
                  Ativar Benefícios
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 slide-in bg-white">
          <div className="max-w-2xl text-center">
            <div className="w-32 h-32 rounded-[3rem] bg-secondary flex items-center justify-center mb-12 mx-auto shadow-2xl shadow-secondary/20">
              <Check className="w-16 h-16 text-white stroke-[4px]" />
            </div>
            <h2 className="text-6xl font-black text-zinc-900 mb-8 tracking-tighter leading-tight">Escolha feita,<br/>Thomas <span className="text-secondary">protegido!</span></h2>
            <p className="text-2xl text-zinc-500 mb-16 leading-relaxed">
              Você receberá suas apólices digitais e o detalhamento do benefício no seu e-mail corporativo em instantes.
            </p>
            <Button 
              className="h-20 px-16 rounded-[1.75rem] bg-zinc-900 text-white font-black text-xl hover:bg-zinc-800 shadow-2xl"
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
