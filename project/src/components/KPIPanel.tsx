import React from 'react';
import { TrendingUp, TrendingDown, Leaf, Users, Gauge } from 'lucide-react';
import type { CityData } from '../types';

interface KPIPanelProps {
  data: CityData;
}

export function KPIPanel({ data }: KPIPanelProps) {
  const kpis = [
    {
      title: 'Sustainability Index',
      value: `${data.sustainabilityIndex}%`,
      change: '+2.3%',
      trend: 'up',
      icon: Leaf,
      color: 'text-green-400'
    },
    {
      title: 'Citizen Comfort',
      value: `${data.citizenComfort}%`,
      change: '+1.8%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'CO₂ Reduction',
      value: `${data.co2Reduction}%`,
      change: '+3.1%',
      trend: 'up',
      icon: TrendingDown,
      color: 'text-purple-400'
    },
    {
      title: 'Energy Efficiency',
      value: `${data.energy.efficiency}%`,
      change: '-0.5%',
      trend: 'down',
      icon: Gauge,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all">
            <div className="flex items-start justify-between mb-4">
              <Icon className={`w-8 h-8 ${kpi.color}`} />
              <div className={`flex items-center space-x-1 text-sm ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                <TrendIcon className="w-4 h-4" />
                <span>{kpi.change}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <p className="text-blue-200 text-sm">{kpi.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}