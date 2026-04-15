import React from 'react';

export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-100 min-h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
