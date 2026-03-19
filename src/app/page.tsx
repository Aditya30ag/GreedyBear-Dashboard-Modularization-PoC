import DynamicDashboard from '@/components/dashboard/DynamicDashboard';
import WidgetManager from '@/components/admin/WidgetManager';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-slate-200 p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent inline-block mb-2">
            GreedyBear Modular Dashboard PoC
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            A proof-of-concept demonstrating a configuration-driven, scalable widget architecture for the GSoC 2026 proposal.
          </p>
        </header>

        <WidgetManager />
        
        <DynamicDashboard />
      </div>
    </main>
  );
}
