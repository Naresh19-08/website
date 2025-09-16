import React from 'react';
import { Zap, Sun, Lightbulb, Battery } from 'lucide-react';
import type { EnergyData } from '../types';

interface EnergyModuleProps {
  data: EnergyData;
}

export function EnergyModule({ data }: EnergyModuleProps) {
  const solarPercentage = Math.round((data.solarGeneration / data.totalConsumption) * 100);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            <span>Smart Energy Management</span>
          </h2>
          <p className="text-blue-200 mt-1">Monitor and optimize city-wide energy consumption</p>
        </div>
        
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Sun className="w-5 h-5 text-green-400" />
            <span className="text-green-300 text-sm font-medium">{solarPercentage}% Solar Powered</span>
          </div>
        </div>
      </div>

      {/* Energy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-white">Total Consumption</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{(data.totalConsumption / 1000).toFixed(1)}</span>
            <span className="text-blue-200 text-sm">MWh</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Sun className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-white">Solar Generation</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{(data.solarGeneration / 1000).toFixed(1)}</span>
            <span className="text-blue-200 text-sm">MWh</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Battery className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white">Efficiency</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.efficiency}%</span>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-green-400"
                style={{ width: `${data.efficiency}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Street Lights</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.streetLights.toLocaleString()}</span>
            <span className="text-blue-200 text-sm">active units</span>
          </div>
        </div>
      </div>

      {/* Energy Flow Visualization */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-6">Energy Flow Distribution</h3>
        
        <div className="relative">
          {/* Consumption vs Generation Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-blue-200 text-sm">Energy Balance</span>
              <span className="text-white text-sm">{(data.totalConsumption / 1000).toFixed(1)} MWh consumed</span>
            </div>
            
            <div className="relative h-8 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-400 to-orange-400"
                style={{ width: '100%' }}
              ></div>
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-blue-400"
                style={{ width: `${Math.min(solarPercentage, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-2">
              <span className="text-green-300 text-sm">Solar: {(data.solarGeneration / 1000).toFixed(1)} MWh</span>
              <span className="text-orange-300 text-sm">Grid: {((data.totalConsumption - data.solarGeneration) / 1000).toFixed(1)} MWh</span>
            </div>
          </div>

          {/* Smart Lighting Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">LED Conversion</h4>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div className="w-4/5 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <span className="text-white text-sm font-bold">80%</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Motion Sensors</h4>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div className="w-3/5 h-2 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-white text-sm font-bold">60%</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Solar Powered</h4>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div className="w-2/5 h-2 bg-yellow-400 rounded-full"></div>
                </div>
                <span className="text-white text-sm font-bold">40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Energy Details */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">District Energy Consumption</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.zones.map((zone) => {
            const zoneEfficiency = Math.round((zone.solar / zone.consumption) * 100);
            return (
              <div key={zone.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white text-sm">{zone.name}</h4>
                  <div className={`w-3 h-3 rounded-full ${
                    zoneEfficiency > 50 ? 'bg-green-400' :
                    zoneEfficiency > 25 ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-200">Consumption</span>
                    <span className="text-sm font-bold text-white">{zone.consumption} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-200">Solar</span>
                    <span className="text-sm font-bold text-green-400">{zone.solar} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-200">Self-sufficient</span>
                    <span className={`text-sm font-bold ${
                      zoneEfficiency > 50 ? 'text-green-400' :
                      zoneEfficiency > 25 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>{zoneEfficiency}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-2">
                    <div
                      className={`h-1 rounded-full ${
                        zoneEfficiency > 50 ? 'bg-green-400' :
                        zoneEfficiency > 25 ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}
                      style={{ width: `${Math.min(zoneEfficiency, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Energy Savings Projections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-green-300 mb-2">Monthly Savings</h4>
          <p className="text-2xl font-bold text-white">€{Math.round((data.solarGeneration * 0.15) / 1000 * 1000).toLocaleString()}</p>
          <p className="text-sm text-green-200">from solar generation</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-blue-300 mb-2">CO₂ Reduction</h4>
          <p className="text-2xl font-bold text-white">{Math.round(data.solarGeneration * 0.0004)} tons</p>
          <p className="text-sm text-blue-200">per month</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-yellow-300 mb-2">Grid Independence</h4>
          <p className="text-2xl font-bold text-white">{solarPercentage}%</p>
          <p className="text-sm text-yellow-200">renewable energy</p>
        </div>
      </div>
    </div>
  );
}