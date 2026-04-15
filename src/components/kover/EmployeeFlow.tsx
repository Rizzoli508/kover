
"use client";

import React, { useState, useMemo } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INSURANCE_CATALOG, Protection } from '@/lib/insurance-data';
import { cn } from '@/lib/utils';

type Step = 'catalog' | 'customize' | 'review' | 'confirmation';

export function EmployeeFlow() {
  const [step, setStep] = useState<Step>('catalog');
  const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, { price: number, activeProtections: string[] }>>({});
  
  const BENEFIT_AMOUNT = 80;
  const [activeProtections, setActiveProtections] = useState<string[]>([]);

  const selectedInsurance = useMemo(() => 
    INSURANCE_CATALOG.find(i => i.id === selectedInsuranceId),
  [selectedInsuranceId]);

  const currentTotal = Object.values(cart).reduce((acc, item) => acc + item.price, 0);
  const remainingBenefit = Math.max(0, BENEFIT_AMOUNT - currentTotal);
  const usagePercentage = Math.min(100, (currentTotal / BENEFIT_AMOUNT) * 100);
  
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

  const toggleProtection = (id: string) => {
    setActiveProtections(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const renderProtectionCard = (p: Protection) => (
    <div key={p.id} className="flex flex-col bg-white rounded-[2rem] mb-4 overflow-hidden border border-zinc-100 transition-all shadow-md hover:shadow-xl">
      <div className="flex items-center justify-between p-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900">
            <p.icon className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xl font-black text-zinc-900 block tracking-tight">{p.name}</span>
            <span className="text-xs font-black text-primary uppercase tracking-widest">R$ {p.price.toFixed(2)} / MÊS</span>
          </div>
        </div>
        <Switch 
          checked={activeProtections.includes(p.id)} 
          onCheckedChange={() => toggleProtection(p.id)}
          className="data-[state=checked]:bg-primary h-8 w-14"
        />
      </div>
      <div className="px-8 pb-8 pt-0">
        <p className="text-sm text-zinc-400 font-medium leading-relaxed max-w-lg">{p.description}</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F4F4F5]">
      {/* Cabeçalho de Orçamento */}
      {(step !== 'confirmation') && (
        <div className="bg-white border-b border-zinc-100 sticky top-20 z-[90] py-8 lg:py-12 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
              <div className="flex items-center gap-8">
                {step !== 'catalog' && (
                  <button 
                    onClick={() => setStep('catalog')}
                    className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-50 text-zinc-400 hover:text-primary transition-all border border-zinc-100 shadow-sm"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                )}
                <div className="flex gap-12 lg:gap-16">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">PLANO ESCOLHIDO</span>
                    <span className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tighter">R$ {currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="w-px h-10 bg-zinc-100 self-center" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">SALDO DISPONÍVEL</span>
                    <span className="text-4xl lg:text-5xl font-black text-[#10B981] tracking-tighter">R$ {remainingBenefit.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {step === 'catalog' && (
                <Button 
                  disabled={currentTotal === 0}
                  onClick={() => setStep('review')}
                  className="bg-primary hover:bg-primary/90 text-white h-16 lg:h-20 px-10 lg:px-12 rounded-[1.75rem] font-black text-xs disabled:opacity-20 shadow-xl shadow-primary/20 transition-all uppercase tracking-[0.2em]"
                >
                  REVISAR MEU PLANO
                </Button>
              )}
            </div>
            
            <div className="h-4 w-full bg-zinc-100 rounded-full overflow-hidden flex shadow-inner">
              <div 
                className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {step === 'catalog' && (
        <div className="flex-1 overflow-y-auto py-12 lg:py-16 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <header className="mb-12">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3">CATÁLOGO DE BENEFÍCIOS</p>
              <h2 className="text-5xl lg:text-6xl font-black text-zinc-900 tracking-tighter leading-tight">Escolha sua <span className="text-primary">proteção.</span></h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                    className={cn(
                      "group p-8 lg:p-10 rounded-[2.5rem] border border-zinc-50 hover:border-primary/20 hover:shadow-2xl transition-all cursor-pointer relative flex flex-col justify-between min-h-[380px] bg-white shadow-xl",
                      inCart ? 'ring-2 ring-primary border-transparent' : ''
                    )}
                  >
                    <div className="space-y-6 lg:space-y-8">
                      <div className="flex items-center justify-between">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                          inCart ? "bg-primary text-white" : "bg-zinc-50 text-zinc-400 group-hover:bg-primary/10 group-hover:text-primary"
                        )}>
                          <item.icon className="w-8 h-8" />
                        </div>
                        {inCart && (
                          <Badge className="bg-primary text-white border-none text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                            NO PLANO
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h4 className="text-2xl lg:text-3xl font-black text-zinc-900 mb-2 lg:mb-3 tracking-tighter leading-tight">{item.name}</h4>
                        <p className="text-sm text-zinc-400 font-medium leading-relaxed line-clamp-3">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 lg:pt-8 border-t border-zinc-50 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-1">A PARTIR DE</p>
                        <p className="text-2xl lg:text-3xl font-black text-zinc-900 tracking-tighter">
                          R$ {item.basePrice}<span className="text-xs lg:text-sm font-bold text-zinc-300 ml-1">/{item.unit}</span>
                        </p>
                      </div>
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7" />
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
        <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-260px)] overflow-hidden">
          <div className="flex-1 p-8 lg:p-16 overflow-y-auto bg-white/50">
            <div className="max-w-3xl mx-auto space-y-16 lg:space-y-20">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  <h3 className="text-[10px] font-black text-zinc-900 uppercase tracking-[0.3em]">Proteções Essenciais</h3>
                </div>
                <div className="space-y-4">
                  {selectedInsurance.protections.filter(p => p.type === 'essential').map(renderProtectionCard)}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-6 bg-zinc-200 rounded-full" />
                  <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Adicionais Extras</h3>
                </div>
                <div className="space-y-4">
                  {selectedInsurance.protections.filter(p => p.type === 'extra').map(renderProtectionCard)}
                </div>
              </section>
            </div>
          </div>

          <aside className="w-full lg:w-[480px] bg-white border-l border-zinc-100 p-10 lg:p-14 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-10 lg:space-y-12">
              <div className="w-20 h-20 bg-primary/5 rounded-[1.75rem] flex items-center justify-center text-primary mb-8">
                <selectedInsurance.icon className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-4xl lg:text-5xl font-black text-zinc-900 mb-4 tracking-tighter leading-none">{selectedInsurance.name}</h3>
                <p className="text-zinc-400 text-base lg:text-lg font-medium leading-relaxed">{selectedInsurance.description}</p>
              </div>
              
              <div className="space-y-4 pt-8 border-t border-zinc-50">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-4">COBERTURAS SELECIONADAS</p>
                {selectedInsurance.protections.filter(p => activeProtections.includes(p.id)).map(p => (
                  <div key={p.id} className="flex justify-between items-center py-1">
                    <span className="text-zinc-600 font-bold text-base lg:text-lg">{p.name}</span>
                    <span className="text-zinc-900 font-black text-base lg:text-lg">R$ {p.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12">
              <div className="mb-8 lg:mb-10">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">VALOR TOTAL DO ITEM</p>
                <p className="text-5xl lg:text-6xl font-black text-primary tracking-tighter">R$ {customPrice.toFixed(2)}</p>
              </div>
              <Button 
                className="w-full h-20 lg:h-24 rounded-[2rem] bg-zinc-950 text-white hover:bg-zinc-800 font-black text-lg lg:text-xl shadow-2xl transition-all uppercase tracking-widest"
                onClick={addToPlan}
              >
                ADICIONAR AO PLANO
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
