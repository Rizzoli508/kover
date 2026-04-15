import React from 'react';

export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex justify-center py-0 sm:py-8">
      <div className="w-full max-w-[430px] bg-white min-h-screen sm:min-h-[844px] sm:rounded-[2.5rem] sm:border-[8px] sm:border-zinc-900 relative overflow-hidden shadow-2xl flex flex-col">
        {/* Dynamic content here */}
        <div className="flex-1 flex flex-col overflow-y-auto pb-24">
          {children}
        </div>
      </div>
    </div>
  );
}