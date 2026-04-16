
"use client";

import React, { useState } from 'react';
import { Users, ShieldCheck, TrendingUp, Star, PlusCircle, PieChart, Activity, Loader2, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CompanyDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    cpf: '',
    cep: '',
    benefitValue: ''
  });

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

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const cleanCpf = formData.cpf.replace(/\D/g, '');
    const loginId = `C${cleanCpf.slice(-6)}`;
    const employeeId = crypto.randomUUID();

    // Simular tempo de criação de conta
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false);
        setFormData({ cpf: '', cep: '', benefitValue: '' });
      }, 2000);
    }, 2500);
  };

  return (
    <div className="flex-1 p-8 lg:p-16 bg-[#F4F4F5] overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-20">
        <div>
          <p className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">CENTRAL DA EMPRESA</p>
          <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 tracking-tighter leading-none">TechLog Transportes</h1>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="h-16 lg:h-20 px-10 lg:px-12 rounded-[1.75rem] bg-primary hover:bg-primary/90 font-black text-xs uppercase tracking-[0.2em] gap-4 shadow-2xl shadow-primary/20 transition-all text-white"
        >
          <PlusCircle className="w-6 h-6" />
          CADASTRAR FUNCIONÁRIO
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

      <Dialog open={isModalOpen} onOpenChange={(open) => !isLoading && setIsModalOpen(open)}>
        <DialogContent className="max-w-lg w-full rounded-[2rem] p-8 md:p-10 bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 animate-in zoom-in-50 duration-500">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">Conta criada com sucesso!</h3>
              <p className="text-zinc-500 font-medium">O acesso do colaborador já está liberado na plataforma.</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
              <div className="relative">
                <Loader2 className="w-20 h-20 text-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-primary/40" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">Criando conta segura...</h3>
              <p className="text-zinc-500 font-medium">Gerando credenciais e vinculando benefício flexível.</p>
            </div>
          ) : (
            <>
              <DialogHeader className="mb-8">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3">NOVO COLABORADOR</p>
                <DialogTitle className="text-4xl font-black text-zinc-900 tracking-tighter leading-none">Cadastro MVP</DialogTitle>
                <DialogDescription className="text-zinc-500 text-lg font-medium leading-relaxed mt-4">
                  Insira os dados básicos para liberar o acesso ao benefício flexível Kover.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateEmployee} className="space-y-5">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">CPF DO FUNCIONÁRIO</Label>
                  <Input required placeholder="000.000.000-00" className="h-14 rounded-2xl bg-zinc-50 border-none px-6 text-lg font-bold focus-visible:ring-2 focus-visible:ring-primary" value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">CEP RESIDENCIAL</Label>
                  <Input required placeholder="00000-000" className="h-14 rounded-2xl bg-zinc-50 border-none px-6 text-lg font-bold focus-visible:ring-2 focus-visible:ring-primary" value={formData.cep} onChange={(e) => setFormData({...formData, cep: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">VALOR DO BENEFÍCIO (R$)</Label>
                  <Input required type="number" placeholder="Ex: 120.00" className="h-14 rounded-2xl bg-zinc-50 border-none px-6 text-lg font-bold focus-visible:ring-2 focus-visible:ring-primary" value={formData.benefitValue} onChange={(e) => setFormData({...formData, benefitValue: e.target.value})} />
                </div>
                <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">CREDENCIAIS GERADAS</p>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-600 font-bold">Login: CXXXXXX</span>
                    <span className="text-zinc-600 font-bold">Senha: XXXXXX</span>
                  </div>
                </div>
                <Button onClick={handleCreateEmployee} className="w-full h-14 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 font-black text-sm shadow-2xl transition-all uppercase tracking-widest mt-2">
                  FINALIZAR CADASTRO
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
