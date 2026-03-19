export type WidgetType = 'recent_threats_table' | 'attack_sources_chart' | 'system_status_card' | 'network_traffic_chart';

export interface WidgetConfig {
  id: string; // Unique identifier for the widget instance
  type: WidgetType; // The type of widget to render from the registry
  title: string; // Display title for the widget
  layout: {
    w: number; // Width (e.g. out of a 12-column grid)
    h: number; // Height (relative units)
    x?: number; // X position (optional, for explicit grids)
    y?: number; // Y position (optional, for explicit grids)
  };
  settings?: Record<string, any>; // Widget-specific settings
}

export interface DashboardConfig {
  id: string;
  name: string;
  widgets: WidgetConfig[];
}
