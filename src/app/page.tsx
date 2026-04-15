"use client";

import React, { useState } from 'react';
import { AppContainer } from '@/components/kover/AppContainer';
import { EmployeeFlow } from '@/components/kover/EmployeeFlow';
import { CompanyDashboard } from '@/components/kover/CompanyDashboard';
import { Switch } from '@/components/ui/switch';
import { User, Building2, Shield } from 'lucide-react';

export default function Home() {
  const [view, setView] = useState<'employee' | 'company'>('employee');

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header / Navigation */}
      <nav className="bg-white border-b border-zinc-200 h-16 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-zinc-900">Kover</span>
          </div>

          <div className="bg-zinc-100 p-1 rounded-full flex items-center gap-1">
            <button 
              onClick={() => setView('employee')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${view === 'employee' ? 'bg-white text-primary shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              <User className="w-3 h-3" />
              COLABORADOR
            </button>
            <button 
              onClick={() => setView('company')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${view === 'company' ? 'bg-white text-primary shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              <Building2 className="w-3 h-3" />
              EMPRESA
            </button>
          </div>
        </div>
      </nav>

      <AppContainer>
        {view === 'employee' ? <EmployeeFlow /> : <CompanyDashboard />}
      </AppContainer>
    </div>
  );
}
