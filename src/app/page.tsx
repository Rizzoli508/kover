"use client";

import React, { useState } from 'react';
import { AppContainer } from '@/components/kover/AppContainer';
import { EmployeeFlow } from '@/components/kover/EmployeeFlow';
import { CompanyDashboard } from '@/components/kover/CompanyDashboard';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Building2 } from 'lucide-react';

export default function Home() {
  const [view, setView] = useState<'employee' | 'company'>('employee');

  return (
    <div className="min-h-screen bg-zinc-100/50">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200 shadow-xl flex items-center gap-4">
        <div className={`flex items-center gap-2 transition-colors ${view === 'employee' ? 'text-primary' : 'text-zinc-400'}`}>
          <User className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-tighter">Colaborador</span>
        </div>
        
        <Switch 
          checked={view === 'company'}
          onCheckedChange={(checked) => setView(checked ? 'company' : 'employee')}
          className="data-[state=checked]:bg-primary"
        />

        <div className={`flex items-center gap-2 transition-colors ${view === 'company' ? 'text-primary' : 'text-zinc-400'}`}>
          <Building2 className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-tighter">Empresa</span>
        </div>
      </div>

      <AppContainer>
        {view === 'employee' ? <EmployeeFlow /> : <CompanyDashboard />}
      </AppContainer>
    </div>
  );
}