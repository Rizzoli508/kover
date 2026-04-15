
"use client";

import React, { useState } from 'react';
import { EmployeeFlow } from '@/components/kover/EmployeeFlow';
import { CompanyDashboard } from '@/components/kover/CompanyDashboard';
import { Building2, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [view, setView] = useState<'landing' | 'employee' | 'company'>('landing');

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4F6BE3] via-[#6C3AED] to-[#8B5CF6] flex flex-col items-center justify-center p-6 font-body">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-16 text-center tracking-tight max-w-2xl">
          A revolução dos benefícios flexíveis de seguros.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {/* Portal RH Card */}
          <div className="bg-white rounded-[2.5rem] p-12 flex flex-col items-start shadow-2xl transition-transform hover:scale-[1.01]">
            <div className="w-16 h-16 bg-[#F0F4FF] rounded-2xl flex items-center justify-center mb-8">
              <Building2 className="w-8 h-8 text-[#4F6BE3]" />
            </div>
            <h2 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter">Portal RH</h2>
            <p className="text-zinc-500 text-lg mb-10 leading-relaxed font-medium">
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
          <div className="bg-white rounded-[2.5rem] p-12 flex flex-col items-start shadow-2xl transition-transform hover:scale-[1.01]">
            <div className="w-16 h-16 bg-[#F5F3FF] rounded-2xl flex items-center justify-center mb-8">
              <User className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <h2 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter">Colaborador</h2>
            <p className="text-zinc-500 text-lg mb-10 leading-relaxed font-medium">
              Monte seu pacote de proteção personalizado.
            </p>
            <Button 
              onClick={() => setView('employee')}
              className="w-full h-16 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-2xl font-bold text-lg transition-all"
            >
              Entrar como Colaborador
            </Button>
          </div>
        </div>
        
        <div className="mt-16 flex items-center gap-2 opacity-50">
          <Shield className="w-4 h-4 text-white" />
          <span className="text-white font-bold tracking-[0.3em] text-[10px] uppercase">Kover Secure</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Mini-header de navegação */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-100 h-16 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('landing')}
          >
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-black text-xl tracking-tighter">Kover</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView(view === 'employee' ? 'company' : 'employee')}
              className="text-[10px] font-black text-zinc-400 hover:text-primary uppercase tracking-[0.2em] transition-colors"
            >
              Mudar para {view === 'employee' ? 'EMPRESA' : 'COLABORADOR'}
            </button>
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
              <User className="w-5 h-5 text-zinc-500" />
            </div>
          </div>
        </div>
      </nav>

      {view === 'employee' ? <EmployeeFlow /> : <CompanyDashboard />}
    </div>
  );
}
