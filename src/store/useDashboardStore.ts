import { create } from 'zustand';
import { DashboardConfig } from '@/types/dashboard';

interface DashboardState {
  config: DashboardConfig;
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateConfig: (newConfig: DashboardConfig) => void;
  removeWidget: (widgetId: string) => void;
}

const initialConfig: DashboardConfig = {
  id: 'default',
  name: 'Default Dashboard',
  widgets: [
    {
      id: 'w1',
      type: 'system_status_card',
      title: 'Honeypot Network Status',
      layout: { w: 12, h: 2 }
    },
    {
      id: 'w2',
      type: 'recent_threats_table',
      title: 'Recent Threats (IOCs)',
      layout: { w: 8, h: 6 }
    },
    {
      id: 'w3',
      type: 'attack_sources_chart',
      title: 'Attack Sources',
      layout: { w: 4, h: 6 }
    },
    {
      id: 'w4',
      type: 'network_traffic_chart',
      title: 'Network Traffic Over Time',
      layout: { w: 12, h: 4 }
    }
  ]
};

export const useDashboardStore = create<DashboardState>((set) => ({
  config: initialConfig,
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  updateConfig: (newConfig) => set({ config: newConfig }),
  removeWidget: (widgetId) => set((state) => ({
    config: {
      ...state.config,
      widgets: state.config.widgets.filter((w) => w.id !== widgetId)
    }
  }))
}));
