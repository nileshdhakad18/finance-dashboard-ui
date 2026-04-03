import React from 'react';
import { LayoutDashboard, Receipt, LineChart } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'insights', label: 'Insights', icon: LineChart },
  ];

  return (
    <aside className="w-64 border-r border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl flex flex-col hidden md:flex min-h-screen">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold tracking-tight text-primary-600">FinDash</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-500" 
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
