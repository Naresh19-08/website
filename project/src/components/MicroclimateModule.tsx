import React, { useState } from 'react';
import { Thermometer, Leaf, Droplets, Sun, Plus, Minus } from 'lucide-react';
import type { MicroclimateData, CityData } from '../types';

interface MicroclimateModuleProps {
  data: MicroclimateData;
  setCityData: React.Dispatch<React.SetStateAction<CityData>>;
}

export function MicroclimateModule({ data, setCityData }: MicroclimateModuleProps) {
  const [greenSpaces, setGreenSpaces] = useState(data.greenSpaces);

  const addGreenSpace = () => {
    const newCount = greenSpaces + 1;
    setGreenSpaces(newCount);
    
    // Simulate temperature reduction and energy savings improvement
    setCityData(prev => ({
      ...prev,
      microclimate: {
        ...prev.microclimate,
        greenSpaces: newCount,
        avgTemperature: Math.max(15, prev.microclimate.avgTemperature - 0.5),
        energySavings: Math.min(50, prev.microclimate.energySavings + 2),
        zones: prev.microclimate.zones.map(zone => ({
          ...zone,
          temperature: Math.max(15, zone.temperature - 0.3),
          heatIndex: Math.max(40, zone.heatIndex - 2)
        }))
      }
    }));
  };

  const removeGreenSpace = () => {
    if (greenSpaces > 0) {
      const newCount = greenSpaces - 1;
      setGreenSpaces(newCount);
      
      setCityData(prev => ({
        ...prev,
        microclimate: {
          ...prev.microclimate,
          greenSpaces: newCount,
          avgTemperature: Math.min(40, prev.microclimate.avgTemperature + 0.5),
          energySavings: Math.max(0, prev.microclimate.energySavings - 2),
          zones: prev.microclimate.zones.map(zone => ({
            ...zone,
            temperature: Math.min(40, zone.temperature + 0.3),
            heatIndex: Math.min(100, zone.heatIndex + 2)
          }))
        }
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Thermometer className="w-8 h-8 text-orange-400" />
            <span>Urban Microclimate</span>
          </h2>
          <p className="text-blue-200 mt-1">Simulate and optimize city temperature patterns</p>
        </div>
      </div>

      {/* Climate Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Thermometer className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-white">Avg Temperature</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.avgTemperature}°C</span>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-yellow-400 to-red-400"
                style={{ width: `${(data.avgTemperature / 40) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Sun className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-white">Heat Islands</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.heatIslands}</span>
            <span className="text-blue-200 text-sm">zones detected</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Leaf className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white">Green Spaces</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{greenSpaces}</span>
            <span className="text-blue-200 text-sm">parks & gardens</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Droplets className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Energy Savings</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.energySavings}%</span>
            <span className="text-blue-200 text-sm">cooling reduction</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">Urban Planning Simulator</h3>
        <p className="text-blue-200 mb-6">Add or remove green spaces to see the impact on city temperature</p>
        
        <div className="flex items-center justify-center space-x-8">
          <button
            onClick={removeGreenSpace}
            disabled={greenSpaces <= 0}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30 rounded-lg transition-all"
          >
            <Minus className="w-5 h-5 text-red-400" />
            <span className="text-red-300 font-medium">Remove Green Space</span>
          </button>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{greenSpaces}</div>
            <div className="text-blue-200 text-sm">Active Green Spaces</div>
          </div>
          
          <button
            onClick={addGreenSpace}
            className="flex items-center space-x-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-all"
          >
            <Plus className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-medium">Add Green Space</span>
          </button>
        </div>
      </div>

      {/* Temperature Heatmap */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">Temperature Heatmap by Zone</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.zones.map((zone) => (
            <div key={zone.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white text-sm">{zone.name}</h4>
                <div className={`w-4 h-4 rounded-full ${
                  zone.temperature < 20 ? 'bg-blue-400' :
                  zone.temperature < 25 ? 'bg-green-400' :
                  zone.temperature < 30 ? 'bg-yellow-400' :
                  zone.temperature < 35 ? 'bg-orange-400' :
                  'bg-red-400'
                }`}></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-200">Temperature</span>
                  <span className="text-lg font-bold text-white">{Math.round(zone.temperature)}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-200">Heat Index</span>
                  <span className={`text-sm font-bold ${
                    zone.heatIndex < 70 ? 'text-green-400' :
                    zone.heatIndex < 85 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>{Math.round(zone.heatIndex)}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      zone.temperature < 20 ? 'bg-blue-400' :
                      zone.temperature < 25 ? 'bg-green-400' :
                      zone.temperature < 30 ? 'bg-yellow-400' :
                      zone.temperature < 35 ? 'bg-orange-400' :
                      'bg-red-400'
                    }`}
                    style={{ width: `${(zone.temperature / 40) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-green-300 mb-2">Environmental Impact</h4>
          <p className="text-2xl font-bold text-white">{Math.round((greenSpaces / 50) * 100)}%</p>
          <p className="text-sm text-green-200">Carbon absorption increase</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-blue-300 mb-2">Energy Efficiency</h4>
          <p className="text-2xl font-bold text-white">{data.energySavings}%</p>
          <p className="text-sm text-blue-200">Cooling energy saved</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <h4 className="font-semibold text-purple-300 mb-2">Comfort Index</h4>
          <p className="text-2xl font-bold text-white">{Math.max(60, 90 - data.avgTemperature)}%</p>
          <p className="text-sm text-purple-200">Citizen comfort level</p>
        </div>
      </div>
    </div>
  );
}