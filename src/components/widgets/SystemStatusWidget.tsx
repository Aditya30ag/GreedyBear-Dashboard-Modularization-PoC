import React from 'react';
import { ShieldAlert, Server, Activity } from 'lucide-react';

const SystemStatusWidget: React.FC = () => {
  return (
    <div className="flex flex-col h-full justify-between p-4 bg-slate-900 border border-slate-700/50 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-slate-300 font-medium text-sm flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-400" />
          Active Honeypots
        </h3>
        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-full border border-emerald-500/20">
          Online
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs mb-1">Total Sensors</span>
          <span className="text-2xl font-semibold text-slate-100">24</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs mb-1">Status</span>
          <div className="flex bg-slate-800 rounded-full h-2 mt-2">
            <div className="bg-emerald-500 w-[95%] rounded-full"></div>
            <div className="bg-rose-500 w-[5%] rounded-r-full"></div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <Activity className="w-8 h-8 text-indigo-400 opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default SystemStatusWidget;
