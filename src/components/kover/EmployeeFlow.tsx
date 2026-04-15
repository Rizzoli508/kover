
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
      {/* Barra de Progresso e Dados Minimalista */}
      {(step !== 'confirmation') && (
        <div className="bg-white/80 backdrop-blur-md sticky top-16 z-[90] border-b border-zinc-100 py-6">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-8">
                {step !== 'catalog' && (
                  <button 
                    onClick={() => setStep('catalog')}
                    className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Voltar</span>
                  </button>
                )}
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-0.5">Total Escolhido</span>
                    <span className="text-xl font-black text-zinc-900">R$ {currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="w-px h-8 bg-zinc-100 self-center" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-0.5">Saldo da Empresa</span>
                    <span className="text-xl font-black text-[#10B981]">R$ {remainingBenefit.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {step === 'catalog' && (
                <Button 
                  disabled={currentTotal === 0}
                  onClick={() => setStep('review')}
                  className="bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-full font-black text-xs disabled:opacity-20 transition-all"
                >
                  REVISAR PLANO
                </Button>
              )}
            </div>
            
            {/* Barra de Progresso Estilizada */}
            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${usagePercentage}%` }}
              />
              <div 
                className="h-full bg-primary/20 transition-all duration-500 ease-out"
                style={{ width: `${100 - usagePercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {step === 'catalog' && (
        <div className="flex-1 overflow-y-auto py-12 px-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-10">
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-2">Seus Benefícios Flexíveis</h2>
              <p className="text-zinc-400 font-medium">Personalize suas proteções usando o saldo fornecido pela empresa.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className={`group p-8 rounded-[2rem] border-zinc-100 hover:border-primary/20 hover:shadow-xl transition-all cursor-pointer relative flex flex-col justify-between h-72 bg-white ${inCart ? 'ring-2 ring-primary border-transparent shadow-lg shadow-primary/5' : ''}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${inCart ? 'bg-primary text-white' : 'bg-zinc-50 text-zinc-400 group-hover:bg-primary/5 group-hover:text-primary'}`}>
                          <item.icon className="w-7 h-7" />
                        </div>
                        {inCart && (
                          <Badge className="bg-primary text-white border-none text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                            ATIVO
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-xl font-black text-zinc-900 mb-1">{item.name}</h4>
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-5 border-t border-zinc-50">
                      <div>
                        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-0.5">A partir de</p>
                        <p className="text-xl font-black text-zinc-900">R$ {item.basePrice}<span className="text-xs font-bold text-zinc-400 ml-1">/{item.unit}</span></p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
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
        <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-160px)] overflow-hidden">
          <div className="flex-1 p-10 lg:p-16 overflow-y-auto bg-zinc-50/50">
            <div className="max-w-2xl mx-auto space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Coberturas base</h3>
                </div>
                {selectedInsurance.protections.filter(p => p.type === 'essential').map(renderProtectionCard)}
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-4 bg-zinc-200 rounded-full" />
                  <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Personalizar Extras</h3>
                </div>
                {selectedInsurance.protections.filter(p => p.type === 'extra').map(renderProtectionCard)}
              </section>
            </div>
          </div>

          <aside className="w-full lg:w-[400px] bg-white border-l border-zinc-100 p-10 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <selectedInsurance.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-zinc-900 mb-3 tracking-tight">{selectedInsurance.name}</h3>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed">{selectedInsurance.description}</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.2em] pt-6 border-t border-zinc-100">ATIVADOS NESTE PLANO</p>
                {selectedInsurance.protections.filter(p => activeProtections.includes(p.id)).map(p => (
                  <div key={p.id} className="flex justify-between items-center py-1">
                    <span className="text-zinc-600 text-sm font-bold">{p.name}</span>
                    <span className="text-zinc-900 text-sm font-black">R$ {p.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10">
              <div className="mb-8">
                <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-1">VALOR DESTE SEGURO</p>
                <p className="text-4xl font-black text-primary">R$ {customPrice.toFixed(2)}</p>
              </div>
              <Button 
                className="w-full h-16 rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 font-black text-base shadow-xl transition-all"
                onClick={addToPlan}
              >
                Confirmar e Adicionar
              </Button>
            </div>
          </aside>
        </div>
      )}

      {step === 'review' && (
        <div className="flex-1 p-10 lg:p-20 overflow-y-auto bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-zinc-900 mb-12 tracking-tight">Revise sua <span className="text-primary">proteção</span></h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                {Object.entries(cart).map(([id, details]) => {
                  const info = INSURANCE_CATALOG.find(i => i.id === id);
                  return (
                    <div key={id} className="p-8 bg-[#F9FAFB] rounded-[2rem] border border-zinc-100 flex justify-between items-center group transition-all hover:bg-white hover:shadow-xl">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                          {info && <info.icon className="w-6 h-6" />}
                        </div>
                        <div>
                          <p className="font-black text-xl text-zinc-900">{info?.name}</p>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">{details.activeProtections.length} itens ativos</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-2xl font-black text-primary">R$ {details.price.toFixed(2)}</p>
                         <button 
                          onClick={() => removeFromPlan(id)}
                          className="text-[9px] font-black text-zinc-300 hover:text-destructive uppercase tracking-widest mt-2 transition-colors"
                         >
                          Remover
                         </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-zinc-950 text-white p-12 rounded-[2.5rem] h-fit sticky top-24 shadow-2xl">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-10">RESUMO DO PLANO</h4>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-lg">
                    <span className="text-zinc-500 font-bold">Total Escolhido</span>
                    <span className="font-black">R$ {currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-zinc-500 font-bold">Saldo Disponível</span>
                    <span className="font-black text-[#10B981]">- R$ {Math.min(currentTotal, BENEFIT_AMOUNT).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-zinc-800" />
                  <div className="flex justify-between items-center pt-2">
                    <div>
                       <span className="text-xl font-black block">Desconto em folha</span>
                    </div>
                    <span className="text-4xl font-black text-primary">R$ {Math.max(0, currentTotal - BENEFIT_AMOUNT).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-20 rounded-2xl bg-white text-zinc-950 hover:bg-zinc-100 font-black text-lg transition-all shadow-xl"
                  onClick={() => setStep('confirmation')}
                >
                  Confirmar Adesão
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white animate-in zoom-in-95 duration-500">
          <div className="max-w-2xl text-center">
            <div className="w-24 h-24 rounded-[2rem] bg-[#10B981] flex items-center justify-center mb-10 mx-auto shadow-xl shadow-secondary/20">
              <Check className="w-12 h-12 text-white stroke-[3px]" />
            </div>
            <h2 className="text-5xl font-black text-zinc-900 mb-6 tracking-tight">Tudo pronto,<br/>você está <span className="text-[#10B981]">protegido!</span></h2>
            <p className="text-lg text-zinc-500 mb-12 leading-relaxed font-medium">
              Suas proteções foram ativadas com sucesso. Enviamos os detalhes das apólices para seu e-mail corporativo.
            </p>
            <Button 
              className="h-16 px-12 rounded-full bg-zinc-950 text-white font-black text-base hover:bg-zinc-800"
              onClick={() => {
                setCart({});
                setStep('catalog');
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
