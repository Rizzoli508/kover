
"use client";

import React from 'react';
import { Users, ShieldCheck, TrendingUp, Star, PlusCircle, PieChart, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
    <div className="flex-1 p-8 lg:p-16 bg-[#F4F4F5] overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-20">
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">CENTRAL DA EMPRESA</p>
          <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 tracking-tighter leading-none">TechLog Transportes</h1>
        </div>
        <Button className="h-16 lg:h-20 px-10 lg:px-12 rounded-[1.75rem] bg-primary hover:bg-primary/90 font-black text-xs uppercase tracking-[0.2em] gap-4 shadow-2xl shadow-primary/20 transition-all">
          <PlusCircle className="w-6 h-6" />
          GERENCIAR EQUIPE
        </Button>
      </header>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16 lg:mb-20">
        {metrics.map((m, i) => (
          <Card key={i} className="border-none shadow-xl rounded-[2.5rem] p-10 lg:p-12 bg-white transition-all hover:shadow-2xl group border border-zinc-50 flex flex-col justify-between min-h-[280px]">
            <div className={`w-16 h-16 ${m.bg} ${m.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110`}>
              <m.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-2">{m.label}</p>
              <p className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tighter leading-tight">{m.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        {/* Gráfico de Adesão */}
        <Card className="lg:col-span-2 border-none shadow-xl rounded-[2.5rem] lg:rounded-[3rem] p-10 lg:p-16 bg-white border border-zinc-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 lg:mb-16">
            <h3 className="text-3xl lg:text-4xl font-black text-zinc-900 tracking-tighter flex items-center gap-4 lg:gap-5">
              <PieChart className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
              Adesão por Categoria
            </h3>
            <span className="text-[10px] font-black text-zinc-200 uppercase tracking-widest">DADOS EM TEMPO REAL</span>
          </div>
          <div className="space-y-10 lg:space-y-12">
            {distribution.map((d, i) => (
              <div key={i} className="space-y-4 lg:space-y-5">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xl lg:text-2xl font-black text-zinc-900 tracking-tighter">{d.name}</span>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">{d.count} COLABORADORES ATIVOS</p>
                  </div>
                  <span className="text-3xl lg:text-4xl font-black text-primary tracking-tighter">{d.percentage}%</span>
                </div>
                <div className="h-4 w-full bg-zinc-50 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Card de Impacto */}
        <div className="space-y-12">
          <Card className="border-none bg-primary text-white rounded-[2.5rem] lg:rounded-[3rem] p-10 lg:p-16 relative overflow-hidden h-full shadow-2xl shadow-primary/30 flex flex-col justify-between min-h-[400px]">
            <div className="relative z-10">
              <Activity className="w-12 h-12 lg:w-16 lg:h-16 mb-8 lg:mb-12 opacity-60" />
              <h3 className="text-4xl lg:text-5xl font-black mb-6 lg:mb-8 leading-[0.9] tracking-tighter">Impacto na Operação</h3>
              <p className="text-white/70 text-xl lg:text-2xl leading-relaxed font-medium">
                Seus colaboradores com benefícios de nicho apresentam <strong className="text-white">32% mais retenção</strong> em comparação ao setor.
              </p>
            </div>
            <div className="relative z-10 pt-10">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">RETORNO ESTIMADO</p>
              <div className="flex items-end gap-3 text-5xl lg:text-7xl font-black tracking-tighter">
                R$ 34.2k<span className="text-base lg:text-xl font-bold text-white/40 mb-2 lg:mb-4 tracking-normal">/ANO</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 lg:w-96 lg:h-96 bg-white/10 -mr-32 lg:-mr-40 -mt-32 lg:-mt-40 rounded-full blur-3xl" />
          </Card>
        </div>
      </div>
    </div>
  );
}
