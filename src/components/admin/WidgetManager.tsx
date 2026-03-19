'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { WidgetType } from '@/types/dashboard';
import { Plus, Settings2, LayoutDashboard } from 'lucide-react';

const availableWidgets: { type: WidgetType; title: string, defaultW: number, defaultH: number }[] = [
  { type: 'system_status_card', title: 'Honeypot Network Status', defaultW: 12, defaultH: 2 },
  { type: 'recent_threats_table', title: 'Recent Threats (IOCs)', defaultW: 8, defaultH: 6 },
  { type: 'attack_sources_chart', title: 'Top Attack Sources', defaultW: 4, defaultH: 6 },
  { type: 'network_traffic_chart', title: 'Network Traffic Over Time', defaultW: 12, defaultH: 4 },
];

const WidgetManager: React.FC = () => {
  const { config, isEditMode, toggleEditMode, updateConfig } = useDashboardStore();
  
  const addWidget = (widgetInfo: typeof availableWidgets[0]) => {
    const newWidget = {
      id: `w-${Date.now()}`,
      type: widgetInfo.type,
      title: widgetInfo.title,
      layout: { w: widgetInfo.defaultW, h: widgetInfo.defaultH }
    };
    
    updateConfig({
      ...config,
      widgets: [...config.widgets, newWidget]
    });
  };

  return (
    <div className="mb-8 p-4 bg-slate-900/80 border border-slate-700/50 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <LayoutDashboard className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">{config.name}</h2>
          <p className="text-sm text-slate-400">Configuration-Driven Widget Engine</p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {isEditMode && (
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 pr-4 md:border-r border-slate-700">
            {availableWidgets.map(w => (
              <button 
                key={w.type}
                onClick={() => addWidget(w)}
                className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 rounded-md transition-colors"
              >
                <Plus className="w-3 h-3 text-emerald-400" /> {w.title}
              </button>
            ))}
          </div>
        )}
        
        <button 
          onClick={toggleEditMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-lg ${
            isEditMode 
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
          }`}
        >
          <Settings2 className="w-4 h-4" />
          {isEditMode ? 'Save Dashboard' : 'Edit Dashboard'}
        </button>
      </div>
    </div>
  );
};

export default WidgetManager;
