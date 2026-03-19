import React, { lazy, Suspense } from 'react';
import { WidgetType } from '@/types/dashboard';

// Lazy load widgets for performance
const SystemStatusWidget = lazy(() => import('@/components/widgets/SystemStatusWidget'));
const RecentThreatsWidget = lazy(() => import('@/components/widgets/RecentThreatsWidget'));
const AttackSourcesWidget = lazy(() => import('@/components/widgets/AttackSourcesWidget'));
const NetworkTrafficWidget = lazy(() => import('@/components/widgets/NetworkTrafficWidget'));

// Registry mapping string types to actual React components
const registry: Record<WidgetType, React.ComponentType<any>> = {
  system_status_card: SystemStatusWidget,
  recent_threats_table: RecentThreatsWidget,
  attack_sources_chart: AttackSourcesWidget,
  network_traffic_chart: NetworkTrafficWidget,
};

interface WidgetRendererProps {
  type: WidgetType;
  settings?: Record<string, any>;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({ type, settings }) => {
  const Component = registry[type];

  if (!Component) {
    return (
      <div className="flex items-center justify-center p-4 border border-red-500/50 bg-red-500/10 text-red-500 rounded-lg h-full w-full">
        Widget type "{type}" not found in registry.
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full w-full bg-slate-800/50 rounded-lg animate-pulse">
        <span className="text-slate-400 text-sm">Loading widget...</span>
      </div>
    }>
      <Component {...settings} />
    </Suspense>
  );
};
