import React from 'react';
import { 
  Map, 
  Car, 
  Wind, 
  Thermometer, 
  Zap, 
  Trash2, 
  Bell,
  Activity
} from 'lucide-react';
import type { ActiveModule } from '../types';

interface NavigationProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
}

export function Navigation({ activeModule, setActiveModule }: NavigationProps) {
  const modules = [
    { id: 'overview' as const, name: 'City Overview', icon: Map },
    { id: 'traffic' as const, name: 'Traffic', icon: Car },
    { id: 'air-quality' as const, name: 'Air Quality', icon: Wind },
    { id: 'microclimate' as const, name: 'Microclimate', icon: Thermometer },
    { id: 'energy' as const, name: 'Energy', icon: Zap },
    { id: 'waste' as const, name: 'Waste', icon: Trash2 },
    { id: 'alerts' as const, name: 'Citizen Alerts', icon: Bell }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">SmartCity</span>
          </div>
          
          <div className="flex space-x-1">
            {modules.map(module => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeModule === module.id
                      ? 'bg-blue-500/30 text-white shadow-lg'
                      : 'text-blue-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block text-sm font-medium">{module.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}