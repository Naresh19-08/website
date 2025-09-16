import React from 'react';
import { Trash2, Recycle, AlertTriangle, TrendingUp } from 'lucide-react';
import type { WasteData } from '../types';

interface WasteModuleProps {
  data: WasteData;
}

export function WasteModule({ data }: WasteModuleProps) {
  const getRouteOptimization = () => {
    const overflowZones = data.zones.filter(zone => zone.fillLevel > 85);
    if (overflowZones.length > 0) {
      return `Priority route: ${overflowZones.map(z => z.name).join(' → ')}`;
    }
    return 'All zones operating normally';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Trash2 className="w-8 h-8 text-gray-400" />
            <span>Smart Waste Management</span>
          </h2>
          <p className="text-blue-200 mt-1">Monitor collection schedules and optimize routes</p>
        </div>
        
        {data.overflowAlerts > 0 && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-300 text-sm">{data.overflowAlerts} Overflow Alerts</span>
          </div>
        )}
      </div>

      {/* Waste Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Trash2 className="w-5 h-5 text-gray-400" />
            <h3 className="font-semibold text-white">Bins Full</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.binsFull}</span>
            <span className="text-blue-200 text-sm">require collection</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Recycle className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white">Recycling Rate</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.recyclingRate}%</span>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-400"
                style={{ width: `${data.recyclingRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Collection Efficiency</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.collectionEfficiency}%</span>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-blue-400"
                style={{ width: `${data.collectionEfficiency}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-white">Overflow Alerts</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.overflowAlerts}</span>
            <span className="text-blue-200 text-sm">critical bins</span>
          </div>
        </div>
      </div>

      {/* Route Optimization */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <span>Smart Route Optimization</span>
        </h3>
        
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-300 mb-2">Recommended Collection Route</h4>
            <p className="text-white">{getRouteOptimization()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-400">-23%</p>
              <p className="text-sm text-blue-200">Distance Saved</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">-18%</p>
              <p className="text-sm text-blue-200">Fuel Consumption</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">+12%</p>
              <p className="text-sm text-blue-200">Efficiency Gain</p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Waste Status */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">Waste Collection Status by Zone</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.zones.map((zone) => (
            <div key={zone.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white text-sm">{zone.name}</h4>
                <div className="flex items-center space-x-1">
                  {zone.fillLevel > 95 && (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  <div className={`w-3 h-3 rounded-full ${
                    zone.fillLevel < 60 ? 'bg-green-400' :
                    zone.fillLevel < 85 ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-200">Fill Level</span>
                  <span className={`text-sm font-bold ${
                    zone.fillLevel < 60 ? 'text-green-400' :
                    zone.fillLevel < 85 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>{zone.fillLevel}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      zone.fillLevel < 60 ? 'bg-green-400' :
                      zone.fillLevel < 85 ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}
                    style={{ width: `${zone.fillLevel}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-200">Recycling</span>
                  <span className="text-sm font-bold text-green-400">{zone.recycling}%</span>
                </div>
                <div className="text-xs text-center mt-2">
                  {zone.fillLevel > 95 ? (
                    <span className="text-red-300">⚠️ Immediate Collection Required</span>
                  ) : zone.fillLevel > 85 ? (
                    <span className="text-yellow-300">⏰ Schedule Collection Soon</span>
                  ) : (
                    <span className="text-green-300">✓ Normal Operation</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recycling Analytics */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">Recycling Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-blue-200">Material Breakdown</h4>
            <div className="space-y-3">
              {[
                { name: 'Plastic', percentage: 35, color: 'bg-blue-400' },
                { name: 'Paper', percentage: 28, color: 'bg-green-400' },
                { name: 'Glass', percentage: 20, color: 'bg-yellow-400' },
                { name: 'Metal', percentage: 17, color: 'bg-purple-400' }
              ].map((material, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-20 text-sm text-blue-200">{material.name}</div>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${material.color}`}
                      style={{ width: `${material.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-white font-medium">{material.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-blue-200">Monthly Trends</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-400">+12%</p>
                <p className="text-xs text-blue-200">Recycling Increase</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-blue-400">-8%</p>
                <p className="text-xs text-blue-200">Waste Reduction</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-purple-400">2.4 tons</p>
                <p className="text-xs text-blue-200">Materials Recycled</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-yellow-400">€1,200</p>
                <p className="text-xs text-blue-200">Cost Savings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}