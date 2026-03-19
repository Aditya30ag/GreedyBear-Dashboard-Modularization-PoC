# GreedyBear Dashboard Modularization PoC

Proof-of-concept demonstrating the transition of the GreedyBear user interface from a hard-coded dashboard into a modern, modular, scalable Next.js architecture utilizing a configuration-driven widget engine.

GSoC 2026 acceptance criteria PoC for the project [Greedybear: Dashboard Modularization](https://www.honeynet.org/gsoc/gsoc-2026/google-summer-of-code-2026-project-ideas/).

## What This Demonstrates

*   **Widget Registry System**: A plug-and-play architecture where React components are mapped to string identifiers, allowing widgets to be loaded dynamically and lazily to improve performance.
*   **Configuration-Driven Dashboard**: The entire layout, structure, and enabled widgets of the dashboard are controlled by a single JSON schema. No hard-coded layout blocks.
*   **Global State Management**: Using **Zustand** to persist the active dashboard configuration and control the application's "Edit Mode," ensuring complex component trees remain synchronized.
*   **Admin Interface**: A functional toggle mechanism that lets authorized users switch to "Edit Mode," enabling them to add new widgets (System Status, Recent Threats Table, Attack Sources Charts) or remove existing ones seamlessly.
*   **Scalable Modern UI**: High-performance, responsive charts via **Recharts**, customized styling via **TailwindCSS**, and polished iconography using **Lucide-React**.

## Architecture & Data Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    Next.js Frontend                              │
│                                                                  │
│  ┌───────────────────┐    Reads Config                           │
│  │ DynamicDashboard  │ ◄────────────────────────────┐            │
│  │                   │                              │            │
│  │ • Renders Grid    │                              │            │
│  │ • Manages Layout  │                              │            │
│  └────────┬──────────┘                              │            │
│           │                                         │            │
│           │ Resolves Component                      │            │
│           ▼                                         │            │
│  ┌──────────────────┐                               │            │
│  │ Widget Registry  │                               │            │
│  │                  │                               │            │
│  │ • Maps ID → Component                            │            │
│  │ • Lazy Loads     │                               │            │
│  └────────┬─────────┘                               │            │
│           │                                         │            │
│           │ Renders                                 │            │
│           ▼                                         │            │
│  ┌──────────────────┐                      ┌────────┴──────────┐ │
│  │ Widget Component │     Mutates State    │ Zustand Store     │ │
│  │ (e.g., Grid,     │ ◄─────────────────── │ (Dashboard Config)│ │
│  │ Recharts, Table) │                      └────────┬──────────┘ │
│  └──────────────────┘                               │            │
│                                                     │            │
│  ┌───────────────────┐                              │            │
│  │ Admin UI          │ ─────────────────────────────┘            │
│  │ (WidgetManager)   │     Updates configuration schema          │
│  └───────────────────┘                                           │
└──────────────────────────────────────────────────────────────────┘
```

**Key Flow:**
1. User loads the `/` route. Next.js serves the Dashboard Layout containing the `DynamicDashboard` component.
2. The grid mounts and reads the default `DashboardConfig` schema directly from the global **Zustand store**.
3. It iterates over the array of requested widgets. For each widget type (e.g., `attack_sources_chart`), it pings the **Widget Registry** which asynchronously lazy-loads the corresponding React component.
4. If an Admin toggle is activated, the **WidgetManager** injects Add/Remove controls. Any change instantly modifies the JSON configuration in Zustand, structurally updating the Dashboard DOM in real-time.

## Detailed Walkthrough

1.  **Global State (Zustand)**
    Located in `src/store/useDashboardStore.ts`. Handles layout structure.
2.  **Plugin Architecture (Registry)**
    Located in `src/registry/WidgetRegistry.tsx`. Keeps the main Engine agnostic to underlying charts.
3.  **Modular Components (Recharts & Tables)**
    Located in `src/components/widgets/`. Standalone, reusable UI artifacts.
4.  **Dynamic Assembly (Engine)**
    Located in `src/components/dashboard/DynamicDashboard.tsx`. Maps JSON to CSS Grid layouts.

## Relevance to GSoC 2026

This PoC directly tackles the core objectives established in my GSoC proposal for Greedybear. Currently, the GreedyBear dashboard is hard-coded, significantly slowing down maintainers who wish to inject custom visualizations. By adopting this configuration-driven architecture, the barrier to adding new intelligence dashboards drops significantly. Developers only need to write a simple React widget once, register it, and administrators can arrange it infinitely via the UI.

**Author**: Aditya Agrawal
GSoC 2026 Applicant, Greedybear Project
