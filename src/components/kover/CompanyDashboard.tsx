"use client";

import React from 'react';
import { Users, ShieldCheck, TrendingUp, Star, Package, ArrowUpRight, PlusCircle, PieChart, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function CompanyDashboard() {
  const metrics = [
    { label: 'Total de Colaboradores', value: '342', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Colaboradores Protegidos', value: '287 (84%)', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Investimento Mensal', value: 'R$ 27.360', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Média de Satisfação', value: '4.7 / 5.0', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  ];

  const distribution = [
    { name: 'Seguro Pet', percentage: 45, count: 154 },
    { name: 'Renda Protegida', percentage: 88, count: 301 },
    { name: 'Seguro Celular', percentage: 92, count: 315 },
    { name: 'Equipamentos de Trabalho', percentage: 35, count: 120 },
    { name: 'Proteção Digital', percentage: 78, count: 267 },
  ];

  return (
    <div className="flex-1 p-8 lg:p-12 bg-zinc-50/50 overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2">CENTRAL DA EMPRESA</p>
          <h1 className="text-5xl font-black text-zinc-900 tracking-tight">TechLog Transportes</h1>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 font-bold gap-3 shadow-xl shadow-primary/20">
          <PlusCircle className="w-5 h-5" />
          Gerenciar Colaboradores
        </Button>
      </header>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((m, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2rem] p-8 bg-white">
            <div className={`w-14 h-14 ${m.bg} ${m.color} rounded-[1.25rem] flex items-center justify-center mb-6`}>
              <m.icon className="w-7 h-7" />
            </div>
            <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest mb-2">{m.label}</p>
            <p className="text-3xl font-black text-zinc-900">{m.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Adhesion Chart Card */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] p-10 bg-white">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
              <PieChart className="w-6 h-6 text-primary" />
              Adesão por Categoria
            </h3>
            <span className="text-xs font-bold text-zinc-400">ÚLTIMOS 30 DIAS</span>
          </div>
          <div className="space-y-8">
            {distribution.map((d, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-lg font-bold text-zinc-900">{d.name}</span>
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">{d.count} colaboradores</p>
                  </div>
                  <span className="text-2xl font-black text-primary">{d.percentage}%</span>
                </div>
                <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Impact / Economy Card */}
        <div className="space-y-8">
          <Card className="border-none bg-primary text-white rounded-[2.5rem] p-10 relative overflow-hidden h-full">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <Activity className="w-10 h-10 mb-8 opacity-60" />
                <h3 className="text-3xl font-black mb-4 leading-tight">Impacto na Operação</h3>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Colaboradores com seguro pet e renda protegida apresentam <strong>32% mais engajamento</strong> em benefícios.
                </p>
              </div>
              <div>
                <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-2">ECONOMIA ESTIMADA</p>
                <div className="flex items-end gap-2 text-5xl font-black">
                  R$ 34.200<span className="text-lg font-bold text-white/40 mb-2">/mês</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 -mr-24 -mt-24 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 -ml-8 -mb-8 rounded-full blur-2xl" />
          </Card>
        </div>
      </div>

      <section className="mt-12">
        <h3 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3">
          <Package className="w-6 h-6 text-primary" />
          Planos de Nicho em Alta
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Seguro Pet Saúde+', partner: 'Kover Pet', count: 154, color: 'bg-green-500' },
            { name: 'Renda Garantida DIT', partner: 'Kover Renda', count: 301, color: 'bg-primary' },
            { name: 'Tech Shield Pro', partner: 'Kover Máquinas', count: 120, color: 'bg-zinc-900' },
          ].map((ins, i) => (
            <Card key={i} className="p-8 border-none shadow-sm rounded-[2rem] bg-white flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`w-3 h-12 rounded-full ${ins.color}`} />
                <div>
                  <p className="font-black text-xl text-zinc-900">{ins.name}</p>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{ins.partner}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-primary">{ins.count}</p>
                <p className="text-[10px] font-black text-zinc-400 uppercase">ADESÕES</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
