import React, { useState } from 'react';
import { AlertTriangle, Navigation, Clock, Car } from 'lucide-react';
import type { TrafficData } from '../types';

interface TrafficModuleProps {
  data: TrafficData;
}

export function TrafficModule({ data }: TrafficModuleProps) {
  const [selectedRoute, setSelectedRoute] = useState<string>('optimal');

  const routes = [
    { id: 'optimal', name: 'Optimal Route', time: '12 min', traffic: 'Light', color: 'text-green-400' },
    { id: 'alternative1', name: 'Alternative 1', time: '18 min', traffic: 'Medium', color: 'text-yellow-400' },
    { id: 'alternative2', name: 'Alternative 2', time: '25 min', traffic: 'Heavy', color: 'text-red-400' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Car className="w-8 h-8 text-blue-400" />
            <span>Traffic Management</span>
          </h2>
          <p className="text-blue-200 mt-1">Real-time traffic analysis and route optimization</p>
        </div>
        
        {data.incidents > 0 && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-300 text-sm">{data.incidents} Active Incidents</span>
          </div>
        )}
      </div>

      {/* Traffic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Congestion Level</h3>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              data.congestionLevel < 30 ? 'bg-green-500/20 text-green-300' :
              data.congestionLevel < 70 ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              {data.congestionLevel < 30 ? 'Low' : data.congestionLevel < 70 ? 'Medium' : 'High'}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-3xl font-bold text-white">{data.congestionLevel}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  data.congestionLevel < 30 ? 'bg-green-400' :
                  data.congestionLevel < 70 ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}
                style={{ width: `${data.congestionLevel}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Navigation className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Average Speed</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.avgSpeed}</span>
            <span className="text-blue-200 text-sm">km/h</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-white">Predicted Delay</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.predictedDelay}</span>
            <span className="text-blue-200 text-sm">minutes</span>
          </div>
        </div>
      </div>

      {/* Route Suggestions */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-blue-400" />
          <span>Recommended Routes</span>
        </h3>
        
        <div className="space-y-3">
          {routes.map((route) => (
            <div
              key={route.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedRoute === route.id
                  ? 'border-blue-500/50 bg-blue-500/10'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
              onClick={() => setSelectedRoute(route.id)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-white">{route.name}</p>
                  <p className="text-sm text-blue-200">Traffic: {route.traffic}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${route.color}`}>{route.time}</p>
                  <p className="text-xs text-blue-200">ETA</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone Details */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">Zone Traffic Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.zones.map((zone) => (
            <div key={zone.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white text-sm">{zone.name}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  zone.congestion < 30 ? 'bg-green-400' :
                  zone.congestion < 70 ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}></div>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-white">{Math.round(zone.congestion)}%</p>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full ${
                      zone.congestion < 30 ? 'bg-green-400' :
                      zone.congestion < 70 ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}
                    style={{ width: `${zone.congestion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}