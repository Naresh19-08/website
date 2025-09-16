import React from 'react';
import { Wind, AlertCircle, Activity } from 'lucide-react';
import type { AirQualityData } from '../types';

interface AirQualityModuleProps {
  data: AirQualityData;
}

export function AirQualityModule({ data }: AirQualityModuleProps) {
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive Groups', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    if (aqi <= 200) return { status: 'Unhealthy', color: 'text-red-400', bg: 'bg-red-500/20' };
    return { status: 'Hazardous', color: 'text-purple-400', bg: 'bg-purple-500/20' };
  };

  const aqiStatus = getAQIStatus(data.aqi);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Wind className="w-8 h-8 text-green-400" />
            <span>Air Quality Monitor</span>
          </h2>
          <p className="text-blue-200 mt-1">Real-time air quality and pollution tracking</p>
        </div>
        
        <div className={`${aqiStatus.bg} border border-opacity-30 rounded-lg p-3 flex items-center space-x-2`}>
          <Activity className={`w-5 h-5 ${aqiStatus.color}`} />
          <span className={`text-sm font-medium ${aqiStatus.color}`}>{aqiStatus.status}</span>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">AQI</h3>
            <div className={`w-3 h-3 rounded-full ${
              data.aqi <= 50 ? 'bg-green-400' :
              data.aqi <= 100 ? 'bg-yellow-400' :
              data.aqi <= 150 ? 'bg-orange-400' :
              data.aqi <= 200 ? 'bg-red-400' :
              'bg-purple-400'
            }`}></div>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.aqi}</span>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  data.aqi <= 50 ? 'bg-green-400' :
                  data.aqi <= 100 ? 'bg-yellow-400' :
                  data.aqi <= 150 ? 'bg-orange-400' :
                  data.aqi <= 200 ? 'bg-red-400' :
                  'bg-purple-400'
                }`}
                style={{ width: `${Math.min(data.aqi / 2, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <h3 className="font-semibold text-white">CO₂ Level</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.co2}</span>
            <span className="text-blue-200 text-sm">ppm</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
            <h3 className="font-semibold text-white">PM2.5</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.pm25}</span>
            <span className="text-blue-200 text-sm">μg/m³</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <h3 className="font-semibold text-white">Noise Level</h3>
          </div>
          <div className="space-y-2">
            <span className="text-3xl font-bold text-white">{data.noiseLevel}</span>
            <span className="text-blue-200 text-sm">dB</span>
          </div>
        </div>
      </div>

      {/* Historical Chart */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-6">24-Hour Trends</h3>
        
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end justify-between">
            {data.historical.map((point, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div className="relative flex flex-col items-center space-y-1">
                  <div 
                    className="w-2 bg-blue-400 rounded-t"
                    style={{ height: `${(point.aqi / 200) * 120}px` }}
                  ></div>
                  <div 
                    className="w-2 bg-green-400 rounded-t"
                    style={{ height: `${((point.co2 - 200) / 400) * 120}px` }}
                  ></div>
                </div>
                {index % 4 === 0 && (
                  <span className="text-xs text-blue-200 transform rotate-45">{point.time}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span className="text-sm text-blue-200">AQI</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span className="text-sm text-blue-200">CO₂ (scaled)</span>
          </div>
        </div>
      </div>

      {/* Zone Air Quality */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">Zone Air Quality Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.zones.map((zone) => {
            const zoneStatus = getAQIStatus(zone.aqi);
            return (
              <div key={zone.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white text-sm">{zone.name}</h4>
                  {zone.aqi > 100 && (
                    <AlertCircle className="w-4 h-4 text-orange-400" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-200">AQI</span>
                    <span className={`text-sm font-bold ${zoneStatus.color}`}>{zone.aqi}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-200">CO₂</span>
                    <span className="text-sm font-bold text-white">{zone.co2} ppm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-200">Noise</span>
                    <span className="text-sm font-bold text-white">{zone.noise} dB</span>
                  </div>
                  <div className={`text-xs ${zoneStatus.color} mt-2`}>{zoneStatus.status}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}