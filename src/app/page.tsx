"use client";

import React, { useState } from 'react';
import { EmployeeFlow } from '@/components/kover/EmployeeFlow';
import { CompanyDashboard } from '@/components/kover/CompanyDashboard';
import { Building2, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [view, setView] = useState<'landing' | 'employee' | 'company'>('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-body">
        <div className="max-w-4xl w-full text-center mb-20">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">BEM-VINDO À KOVER</p>
          <h1 className="text-zinc-900 text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.9]">
            A revolução dos benefícios <span className="text-primary">flexíveis.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
          {/* Portal RH Card */}
          <div 
            onClick={() => setView('company')}
            className="bg-white rounded-[2.5rem] p-12 flex flex-col items-start border border-zinc-100 shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110">
              <Building2 className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">ACESSO CORPORATIVO</p>
            <h2 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter">Portal RH</h2>
            <p className="text-zinc-500 text-lg mb-10 leading-relaxed font-medium">
              Gerencie o saldo e acompanhe a adesão da sua equipe em tempo real.
            </p>
            <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
              ENTRAR COMO RH
            </Button>
          </div>

          {/* Colaborador Card */}
          <div 
            onClick={() => setView('employee')}
            className="bg-white rounded-[2.5rem] p-12 flex flex-col items-start border border-zinc-100 shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110">
              <User className="w-8 h-8 text-primary" />
            </div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">ÁREA DO USUÁRIO</p>
            <h2 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter">Colaborador</h2>
            <p className="text-zinc-500 text-lg mb-10 leading-relaxed font-medium">
              Monte seu pacote de proteção personalizado com o seu saldo Kover.
            </p>
            <Button className="w-full h-16 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
              COMEÇAR AGORA
            </Button>
          </div>
        </div>
        
        <div className="mt-20 flex items-center gap-2 opacity-20">
          <Shield className="w-4 h-4 text-zinc-900" />
          <span className="text-zinc-900 font-bold tracking-[0.3em] text-[10px] uppercase">Kover Secure Infrastructure</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <nav className={`bg-white border-b border-zinc-100 h-20 sticky top-0 z-[100] transition-opacity ${isModalOpen ? 'opacity-0 pointer-events-none' : ''}`}>
        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setView('landing')}
          >
            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-zinc-900">Kover</span>
          </div>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setView(view === 'employee' ? 'company' : 'employee')}
              className="text-[10px] font-black text-zinc-400 hover:text-primary uppercase tracking-[0.2em] transition-colors"
            >
              MUDAR PARA {view === 'employee' ? 'EMPRESA' : 'COLABORADOR'}
            </button>
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center border-2 border-white shadow-sm">
              <User className="w-6 h-6 text-zinc-500" />
            </div>
          </div>
        </div>
      </nav>

      {view === 'employee' ? <EmployeeFlow /> : <CompanyDashboard onModalChange={setIsModalOpen} />}
    </div>
  );
}
