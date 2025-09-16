import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { KPIPanel } from './components/KPIPanel';
import { TrafficModule } from './components/TrafficModule';
import { AirQualityModule } from './components/AirQualityModule';
import { MicroclimateModule } from './components/MicroclimateModule';
import { EnergyModule } from './components/EnergyModule';
import { WasteModule } from './components/WasteModule';
import { CitizenAlertsModule } from './components/CitizenAlertsModule';
import { CityMap } from './components/CityMap';
import { generateSimulatedData } from './utils/dataSimulation';
import type { CityData, ActiveModule } from './types';

function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('overview');
  const [cityData, setCityData] = useState<CityData>(generateSimulatedData());
  const [alerts, setAlerts] = useState<string[]>([]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCityData(generateSimulatedData());
      
      // Generate random alerts
      const alertMessages = [
        'High traffic congestion detected in Downtown zone',
        'Air quality warning in Industrial District',
        'Waste bin overflow detected on Main Street',
        'Energy consumption spike in Commercial zone',
        'Heat island effect increasing in Central Park area'
      ];
      
      if (Math.random() > 0.8) {
        const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
        setAlerts(prev => [...prev.slice(-2), randomAlert]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'overview':
        return <CityMap data={cityData} />;
      case 'traffic':
        return <TrafficModule data={cityData.traffic} />;
      case 'air-quality':
        return <AirQualityModule data={cityData.airQuality} />;
      case 'microclimate':
        return <MicroclimateModule data={cityData.microclimate} setCityData={setCityData} />;
      case 'energy':
        return <EnergyModule data={cityData.energy} />;
      case 'waste':
        return <WasteModule data={cityData.waste} />;
      case 'alerts':
        return <CitizenAlertsModule alerts={alerts} setAlerts={setAlerts} />;
      default:
        return <CityMap data={cityData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <div className="pt-16 px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Smart City Sustainability Dashboard</h1>
            <p className="text-blue-200">Real-time monitoring and simulation of urban sustainability metrics</p>
          </div>

          <KPIPanel data={cityData} />
          
          <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            {renderActiveModule()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;