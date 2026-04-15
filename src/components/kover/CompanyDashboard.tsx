"use client";

import React from 'react';
import { Users, ShieldCheck, TrendingUp, Star, Package, ArrowUpRight, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function CompanyDashboard() {
  const metrics = [
    { label: 'Colaboradores', value: '342', icon: Users, color: 'bg-blue-50 text-blue-500' },
    { label: 'Protegidos', value: '287 / 84%', icon: ShieldCheck, color: 'bg-green-50 text-green-500' },
    { label: 'Inv. Mensal', value: 'R$27.360', icon: TrendingUp, color: 'bg-purple-50 text-purple-500' },
    { label: 'Satisfação', value: '4.7/5', icon: Star, color: 'bg-yellow-50 text-yellow-500' },
  ];

  const distribution = [
    { name: 'Seguro de Vida', percentage: 92 },
    { name: 'Acidentes Pessoais', percentage: 78 },
    { name: 'Proteção de Renda', percentage: 65 },
    { name: 'Seguro Auto', percentage: 42 },
    { name: 'Seguro Residencial', percentage: 38 },
  ];

  const topInsurances = [
    { name: 'Seguro de Vida Flex', partner: 'Liberty Seguros', count: 215 },
    { name: 'Renda Protegida', partner: 'Sura', count: 184 },
    { name: 'Auto Especial', partner: 'Azul', count: 142 },
  ];

  return (
    <div className="flex-1 p-6 bg-zinc-50 overflow-y-auto">
      <header className="mb-8">
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Dashboard Empresa</p>
        <h1 className="text-3xl font-black text-zinc-900">TechLog Transportes</h1>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {metrics.map((m, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-4">
              <div className={`w-8 h-8 ${m.color} rounded-xl flex items-center justify-center mb-3`}>
                <m.icon className="w-4 h-4" />
              </div>
              <p className="text-xs text-zinc-400 font-medium mb-1">{m.label}</p>
              <p className="text-lg font-bold text-zinc-900">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm rounded-3xl mb-8">
        <CardHeader className="p-6 pb-0">
          <CardTitle className="text-lg font-bold">Adesão por Categoria</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {distribution.map((d, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-500">{d.name}</span>
                <span className="text-primary">{d.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000" 
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <section className="mb-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" /> Mais contratados
        </h3>
        <div className="space-y-3">
          {topInsurances.map((ins, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl flex items-center justify-between border border-zinc-100">
              <div>
                <p className="font-bold text-sm text-zinc-900">{ins.name}</p>
                <p className="text-[10px] text-zinc-400">{ins.partner}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{ins.count}</p>
                <p className="text-[10px] text-zinc-400">adesões</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Card className="border-none bg-primary text-white rounded-[2rem] p-6 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Economia estimada</h3>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            Colaboradores protegidos faltam 40% menos e têm 23% mais produtividade.
          </p>
          <div className="flex items-center gap-2 text-2xl font-black">
            R$ 34.200<span className="text-sm font-normal text-white/60">/mês</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-8 -mt-8 rounded-full blur-3xl" />
      </Card>

      <Button className="w-full h-14 rounded-2xl bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 font-bold gap-2">
        <PlusCircle className="w-5 h-5 text-primary" />
        Adicionar colaboradores
      </Button>
    </div>
  );
}