
"use client";

import React, { useState } from 'react';
import { EmployeeFlow } from '@/components/kover/EmployeeFlow';
import { CompanyDashboard } from '@/components/kover/CompanyDashboard';
import { Building2, User, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [view, setView] = useState<'landing' | 'employee' | 'company'>('landing');

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4F6BE3] via-[#6C3AED] to-[#8B5CF6] flex flex-col items-center justify-center p-6">
        <h1 className="text-white text-2xl md:text-3xl font-medium mb-12 text-center tracking-tight">
          A revolução dos benefícios flexíveis de seguros.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {/* Portal RH Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-10 flex flex-col items-start shadow-2xl">
            <div className="w-16 h-16 bg-[#F0F4FF] rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="w-8 h-8 text-[#4F6BE3]" />
            </div>
            <h2 className="text-3xl font-black text-zinc-900 mb-3">Portal RH</h2>
            <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
              Gerencie o saldo e acompanhe a adesão da sua equipe.
            </p>
            <Button 
              onClick={() => setView('company')}
              className="w-full h-16 bg-[#3B59C9] hover:bg-[#2D449E] text-white rounded-2xl font-bold text-lg transition-all"
            >
              Entrar como RH
            </Button>
          </div>

          {/* Colaborador Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-10 flex flex-col items-start shadow-2xl">
            <div className="w-16 h-16 bg-[#F5F3FF] rounded-2xl flex items-center justify-center mb-6">
              <User className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <h2 className="text-3xl font-black text-zinc-900 mb-3">Colaborador</h2>
            <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
              Monte seu pacote de proteção personalizado.
            </p>
            <Button 
              onClick={() => setView('employee')}
              className="w-full h-16 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-2xl font-bold text-lg transition-all"
            >
              Entrar como Thomas
            </Button>
          </div>
        </div>
        
        <div className="mt-12 flex items-center gap-2 opacity-60">
          <Shield className="w-4 h-4 text-white" />
          <span className="text-white font-bold tracking-widest text-xs">KOVER SECURE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Mini-header de navegação para alternar entre as visões quando logado */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-100 h-14 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('landing')}
          >
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-black text-lg tracking-tight">Kover</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView(view === 'employee' ? 'company' : 'employee')}
              className="text-[10px] font-black text-zinc-400 hover:text-primary uppercase tracking-[0.2em] transition-colors"
            >
              Mudar para {view === 'employee' ? 'EMPRESA' : 'COLABORADOR'}
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-500" />
            </div>
          </div>
        </div>
      </nav>

      {view === 'employee' ? <EmployeeFlow /> : <CompanyDashboard />}
    </div>
  );
}
