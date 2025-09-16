import React from 'react';
import type { CityData } from '../types';

interface CityMapProps {
  data: CityData;
}

export function CityMap({ data }: CityMapProps) {
  const getZoneColor = (zone: any) => {
    const intensity = (zone.congestion || zone.aqi || zone.temperature || zone.fillLevel || 0) / 100;
    const hue = Math.max(0, 120 - intensity * 120); // Green to red
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Smart City Overview</h2>
        <p className="text-blue-200">Interactive heatmap showing real-time city metrics</p>
      </div>

      <div className="relative bg-slate-800 rounded-xl p-8 h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50"></div>
        
        {/* City zones visualization */}
        <div className="relative w-full h-full">
          {data.traffic.zones.map((zone, index) => (
            <div
              key={zone.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center cursor-pointer transition-all hover:scale-125"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                backgroundColor: getZoneColor(zone),
                boxShadow: `0 0 20px ${getZoneColor(zone)}40`
              }}
              title={`${zone.name}\nCongestion: ${Math.round(zone.congestion)}%`}
            >
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <h4 className="text-white font-semibold mb-2">Traffic Intensity</h4>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-xs text-white">Low</span>
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-white">Medium</span>
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-xs text-white">High</span>
          </div>
        </div>

        {/* Pulse animation for high activity zones */}
        {data.traffic.zones
          .filter(zone => zone.congestion > 70)
          .map(zone => (
            <div
              key={`pulse-${zone.id}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-red-400 animate-ping opacity-75"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`
              }}
            ></div>
          ))
        }
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{data.traffic.zones.filter(z => z.congestion < 30).length}</p>
          <p className="text-sm text-blue-200">Low Traffic Zones</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{data.traffic.zones.filter(z => z.congestion >= 30 && z.congestion < 70).length}</p>
          <p className="text-sm text-blue-200">Medium Traffic Zones</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{data.traffic.zones.filter(z => z.congestion >= 70).length}</p>
          <p className="text-sm text-blue-200">High Traffic Zones</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{data.traffic.avgSpeed} km/h</p>
          <p className="text-sm text-blue-200">Average Speed</p>
        </div>
      </div>
    </div>
  );
}