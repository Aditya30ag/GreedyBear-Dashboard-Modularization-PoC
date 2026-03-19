'use client';

import React from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { WidgetRenderer } from '@/registry/WidgetRegistry';
import { X } from 'lucide-react';

const DynamicDashboard: React.FC = () => {
  const { config, isEditMode, removeWidget } = useDashboardStore();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">
        {config.widgets.map((widget) => {
          return (
            <div 
              key={widget.id} 
              style={{
                gridColumn: `span ${widget.layout.w} / span ${widget.layout.w}`,
                gridRow: `span ${Math.ceil(widget.layout.h / 2)} / span ${Math.ceil(widget.layout.h / 2)}`,
              }}
              className={`relative min-h-[300px] w-full transition-all duration-300 ${isEditMode ? 'ring-2 ring-indigo-500/50 hover:ring-indigo-400 rounded-xl' : ''}`}
            >
              {isEditMode && (
                <div className="absolute top-2 right-2 z-10">
                  <button 
                    onClick={() => removeWidget(widget.id)}
                    className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-full transition-colors focus:outline-none"
                    title="Remove Widget"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <WidgetRenderer type={widget.type} settings={widget.settings} />
            </div>
          );
        })}
        {config.widgets.length === 0 && (
          <div className="col-span-12 flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-900/50 text-slate-400">
            <p className="mb-2">No widgets configured on this dashboard.</p>
            {isEditMode && <p className="text-sm text-slate-500">Use the Admin panel to add widgets.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicDashboard;
