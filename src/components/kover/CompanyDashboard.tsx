
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
    <div className="flex-1 p-8 lg:p-12 bg-[#F9FAFB] overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">CENTRAL DA EMPRESA</p>
          <h1 className="text-6xl font-black text-zinc-900 tracking-tighter">TechLog Transportes</h1>
        </div>
        <Button className="h-16 px-10 rounded-[1.5rem] bg-primary hover:bg-primary/90 font-black text-xs uppercase tracking-widest gap-3 shadow-xl shadow-primary/20 transition-all">
          <PlusCircle className="w-5 h-5" />
          Gerenciar Equipe
        </Button>
      </header>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {metrics.map((m, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2.5rem] p-10 bg-white transition-all hover:shadow-xl group">
            <div className={`w-16 h-16 ${m.bg} ${m.color} rounded-[1.5rem] flex items-center justify-center mb-8 transition-all group-hover:scale-110`}>
              <m.icon className="w-8 h-8" />
            </div>
            <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-2">{m.label}</p>
            <p className="text-4xl font-black text-zinc-900 tracking-tighter">{m.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Gráfico de Adesão */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] p-12 bg-white">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
              <PieChart className="w-8 h-8 text-primary" />
              Adesão por Categoria
            </h3>
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">DADOS EM TEMPO REAL</span>
          </div>
          <div className="space-y-10">
            {distribution.map((d, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xl font-black text-zinc-900 tracking-tight">{d.name}</span>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">{d.count} colaboradores ativos</p>
                  </div>
                  <span className="text-3xl font-black text-primary tracking-tighter">{d.percentage}%</span>
                </div>
                <div className="h-4 w-full bg-zinc-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Card de Impacto/Economia */}
        <div className="space-y-10">
          <Card className="border-none bg-primary text-white rounded-[2.5rem] p-12 relative overflow-hidden h-full shadow-2xl shadow-primary/30">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <Activity className="w-12 h-12 mb-10 opacity-60" />
                <h3 className="text-4xl font-black mb-6 leading-tight tracking-tighter">Impacto na Operação</h3>
                <p className="text-white/70 text-xl leading-relaxed mb-10 font-medium">
                  Seus colaboradores com benefícios de nicho apresentam <strong className="text-white">32% mais retenção</strong> em comparação ao setor.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">RETORNO ESTIMADO</p>
                <div className="flex items-end gap-3 text-6xl font-black tracking-tighter">
                  R$ 34.2k<span className="text-lg font-bold text-white/40 mb-3 tracking-normal">/ano</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 -mr-32 -mt-32 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 -ml-12 -mb-12 rounded-full blur-2xl" />
          </Card>
        </div>
      </div>

      <section className="mt-16">
        <div className="flex items-center gap-4 mb-10">
          <Package className="w-8 h-8 text-primary" />
          <h3 className="text-3xl font-black text-zinc-900 tracking-tight">Produtos em Alta</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Seguro Pet Saúde+', partner: 'Kover Pet', count: 154, color: 'bg-green-500' },
            { name: 'Renda Garantida DIT', partner: 'Kover Renda', count: 301, color: 'bg-primary' },
            { name: 'Tech Shield Pro', partner: 'Kover Máquinas', count: 120, color: 'bg-zinc-900' },
          ].map((ins, i) => (
            <Card key={i} className="p-10 border-none shadow-sm rounded-[2.5rem] bg-white flex items-center justify-between transition-all hover:shadow-xl">
              <div className="flex items-center gap-8">
                <div className={`w-1.5 h-16 rounded-full ${ins.color}`} />
                <div>
                  <p className="font-black text-2xl text-zinc-900 tracking-tight">{ins.name}</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{ins.partner}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-primary tracking-tighter">{ins.count}</p>
                <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">ADESÕES</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
