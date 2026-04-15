
"use client";

import React, { useState, useMemo } from 'react';
import { ChevronRight, Check, ArrowLeft, Shield } from 'lucide-react';
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
          <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900">
            <p.icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-bold text-zinc-900 block">{p.name}</span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">R$ {p.price.toFixed(2)}/mês</span>
          </div>
        </div>
        <Switch 
          checked={activeProtections.includes(p.id)} 
          onCheckedChange={() => toggleProtection(p.id)}
          className="data-[state=checked]:bg-primary h-7 w-12"
        />
      </div>
      <div className="px-6 pb-6 pt-2">
        <p className="text-sm text-zinc-400 font-medium leading-relaxed">{p.description}</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB]">
      {/* Cabeçalho de Progresso - Agora integrado como o Dashboard de RH */}
      {(step !== 'confirmation') && (
        <div className="bg-white border-b border-zinc-100 sticky top-16 z-[90] py-8">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="flex items-center gap-8">
                {step !== 'catalog' && (
                  <button 
                    onClick={() => setStep('catalog')}
                    className="flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-50 text-zinc-400 hover:text-primary transition-all mr-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="flex gap-12">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Total Escolhido</span>
                    <span className="text-3xl font-black text-zinc-900 tracking-tighter">R$ {currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="w-px h-10 bg-zinc-100 self-center" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Saldo da Empresa</span>
                    <span className="text-3xl font-black text-[#10B981] tracking-tighter">R$ {remainingBenefit.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {step === 'catalog' && (
                <Button 
                  disabled={currentTotal === 0}
                  onClick={() => setStep('review')}
                  className="bg-primary hover:bg-primary/90 text-white h-16 px-10 rounded-[1.5rem] font-black text-xs disabled:opacity-20 shadow-xl shadow-primary/20 transition-all uppercase tracking-widest"
                >
                  REVISAR MEU PLANO
                </Button>
              )}
            </div>
            
            {/* Barra de Progresso Estilizada */}
            <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-primary transition-all duration-700 ease-out"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {step === 'catalog' && (
        <div className="flex-1 overflow-y-auto py-12 px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <header className="mb-12">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">CATÁLOGO DE BENEFÍCIOS</p>
              <h2 className="text-5xl font-black text-zinc-900 tracking-tight">Escolha suas proteções</h2>
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
                    className={cn(
                      "group p-10 rounded-[2.5rem] border-zinc-100 hover:border-primary/20 hover:shadow-2xl transition-all cursor-pointer relative flex flex-col justify-between h-80 bg-white",
                      inCart ? 'ring-2 ring-primary border-transparent shadow-xl shadow-primary/10' : 'shadow-sm'
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <div className={cn(
                          "w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all",
                          inCart ? "bg-primary text-white" : "bg-zinc-50 text-zinc-400 group-hover:bg-primary/10 group-hover:text-primary"
                        )}>
                          <item.icon className="w-8 h-8" />
                        </div>
                        {inCart && (
                          <Badge className="bg-primary text-white border-none text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                            SELECIONADO
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-2xl font-black text-zinc-900 mb-2 tracking-tight">{item.name}</h4>
                      <p className="text-sm text-zinc-400 font-medium leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-50">
                      <div>
                        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-1">A PARTIR DE</p>
                        <p className="text-2xl font-black text-zinc-900">R$ {item.basePrice}<span className="text-sm font-bold text-zinc-400 ml-1">/{item.unit}</span></p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
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
        <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-230px)] overflow-hidden">
          <div className="flex-1 p-12 lg:p-20 overflow-y-auto bg-zinc-50/50">
            <div className="max-w-2xl mx-auto space-y-16">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-6 bg-primary rounded-full" />
                  <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Coberturas Essenciais</h3>
                </div>
                {selectedInsurance.protections.filter(p => p.type === 'essential').map(renderProtectionCard)}
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-6 bg-zinc-200 rounded-full" />
                  <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Extras Disponíveis</h3>
                </div>
                {selectedInsurance.protections.filter(p => p.type === 'extra').map(renderProtectionCard)}
              </section>
            </div>
          </div>

          <aside className="w-full lg:w-[480px] bg-white border-l border-zinc-100 p-12 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-10">
              <div className="w-20 h-20 bg-primary/5 rounded-[1.75rem] flex items-center justify-center text-primary mb-8">
                <selectedInsurance.icon className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter">{selectedInsurance.name}</h3>
                <p className="text-zinc-400 text-lg font-medium leading-relaxed">{selectedInsurance.description}</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] pt-8 border-t border-zinc-100">ITENS ATIVADOS</p>
                {selectedInsurance.protections.filter(p => activeProtections.includes(p.id)).map(p => (
                  <div key={p.id} className="flex justify-between items-center py-2">
                    <span className="text-zinc-600 font-bold">{p.name}</span>
                    <span className="text-zinc-900 font-black">R$ {p.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12">
              <div className="mb-10">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">VALOR MENSAL</p>
                <p className="text-5xl font-black text-primary tracking-tighter">R$ {customPrice.toFixed(2)}</p>
              </div>
              <Button 
                className="w-full h-20 rounded-[2rem] bg-zinc-950 text-white hover:bg-zinc-800 font-black text-lg shadow-2xl transition-all uppercase tracking-widest"
                onClick={addToPlan}
              >
                ADICIONAR AO PLANO
              </Button>
            </div>
          </aside>
        </div>
      )}

      {step === 'review' && (
        <div className="flex-1 p-12 lg:p-24 overflow-y-auto bg-[#F9FAFB]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">PASSO FINAL</p>
            <h2 className="text-6xl font-black text-zinc-900 mb-16 tracking-tighter">Revise suas <span className="text-primary">escolhas</span></h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-8">
                {Object.entries(cart).map(([id, details]) => {
                  const info = INSURANCE_CATALOG.find(i => i.id === id);
                  return (
                    <Card key={id} className="p-10 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm flex justify-between items-center transition-all hover:shadow-xl group">
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-zinc-50 rounded-[1.5rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          {info && <info.icon className="w-8 h-8" />}
                        </div>
                        <div>
                          <p className="font-black text-2xl text-zinc-900 tracking-tight">{info?.name}</p>
                          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">{details.activeProtections.length} proteções ativas</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-3xl font-black text-primary tracking-tighter">R$ {details.price.toFixed(2)}</p>
                         <button 
                          onClick={() => removeFromPlan(id)}
                          className="text-[10px] font-black text-zinc-300 hover:text-destructive uppercase tracking-widest mt-3 transition-colors"
                         >
                          Remover
                         </button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="bg-zinc-950 text-white p-16 rounded-[3rem] h-fit sticky top-32 shadow-2xl">
                <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-12">RESUMO DO BENEFÍCIO</h4>
                <div className="space-y-8 mb-12">
                  <div className="flex justify-between items-center text-xl">
                    <span className="text-zinc-500 font-bold">Total do Plano</span>
                    <span className="font-black">R$ {currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl">
                    <span className="text-zinc-500 font-bold">Saldo Disponível</span>
                    <span className="font-black text-[#10B981]">- R$ {Math.min(currentTotal, BENEFIT_AMOUNT).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-zinc-800" />
                  <div className="flex justify-between items-center pt-4">
                    <div>
                       <span className="text-2xl font-black block tracking-tight">Valor Extra</span>
                       <span className="text-xs text-zinc-500 font-medium">desconto em folha</span>
                    </div>
                    <span className="text-5xl font-black text-primary tracking-tighter">R$ {Math.max(0, currentTotal - BENEFIT_AMOUNT).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-24 rounded-[2rem] bg-white text-zinc-950 hover:bg-zinc-100 font-black text-xl transition-all shadow-2xl uppercase tracking-widest"
                  onClick={() => setStep('confirmation')}
                >
                  FINALIZAR ADESÃO
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 bg-[#F9FAFB] animate-in zoom-in-95 duration-700">
          <div className="max-w-3xl text-center">
            <div className="w-32 h-32 rounded-[2.5rem] bg-[#10B981] flex items-center justify-center mb-12 mx-auto shadow-2xl shadow-secondary/20">
              <Check className="w-16 h-16 text-white stroke-[3.5px]" />
            </div>
            <h2 className="text-7xl font-black text-zinc-900 mb-8 tracking-tighter leading-[0.9]">Você está<br/><span className="text-[#10B981]">protegido!</span></h2>
            <p className="text-xl text-zinc-500 mb-16 leading-relaxed font-medium max-w-xl mx-auto">
              Sua jornada de segurança começou. Enviamos todos os detalhes e apólices para o seu e-mail corporativo.
            </p>
            <Button 
              className="h-20 px-16 rounded-[2rem] bg-zinc-950 text-white font-black text-lg hover:bg-zinc-800 transition-all shadow-xl uppercase tracking-widest"
              onClick={() => {
                setCart({});
                setStep('catalog');
              }}
            >
              VOLTAR AO INÍCIO
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
