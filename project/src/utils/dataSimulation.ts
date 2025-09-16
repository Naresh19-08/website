import type { CityData } from '../types';

const zones = [
  { id: 'downtown', name: 'Downtown', x: 50, y: 50 },
  { id: 'residential', name: 'Residential District', x: 30, y: 70 },
  { id: 'industrial', name: 'Industrial Zone', x: 80, y: 30 },
  { id: 'commercial', name: 'Commercial Area', x: 70, y: 80 },
  { id: 'suburbs', name: 'Suburbs', x: 20, y: 20 },
  { id: 'university', name: 'University District', x: 40, y: 30 },
  { id: 'waterfront', name: 'Waterfront', x: 90, y: 70 },
  { id: 'airport', name: 'Airport Zone', x: 10, y: 90 }
];

export function generateSimulatedData(): CityData {
  const currentHour = new Date().getHours();
  const isPeakHour = currentHour >= 7 && currentHour <= 9 || currentHour >= 17 && currentHour <= 19;

  // Generate traffic data
  const trafficZones = zones.map(zone => ({
    ...zone,
    congestion: Math.random() * (isPeakHour ? 90 : 40) + 10
  }));

  const traffic = {
    congestionLevel: Math.round(trafficZones.reduce((sum, z) => sum + z.congestion, 0) / zones.length),
    avgSpeed: Math.round(60 - (trafficZones.reduce((sum, z) => sum + z.congestion, 0) / zones.length) * 0.6),
    incidents: Math.floor(Math.random() * 5),
    predictedDelay: Math.floor(Math.random() * 15) + 5,
    zones: trafficZones
  };

  // Generate air quality data
  const airQualityZones = zones.map(zone => ({
    ...zone,
    aqi: Math.floor(Math.random() * 150) + 50,
    co2: Math.floor(Math.random() * 200) + 300,
    noise: Math.floor(Math.random() * 40) + 40
  }));

  const airQuality = {
    aqi: Math.round(airQualityZones.reduce((sum, z) => sum + z.aqi, 0) / zones.length),
    co2: Math.round(airQualityZones.reduce((sum, z) => sum + z.co2, 0) / zones.length),
    noiseLevel: Math.round(airQualityZones.reduce((sum, z) => sum + z.noise, 0) / zones.length),
    pm25: Math.floor(Math.random() * 50) + 20,
    zones: airQualityZones,
    historical: generateHistoricalData()
  };

  // Generate microclimate data
  const microclimateZones = zones.map(zone => ({
    ...zone,
    temperature: Math.floor(Math.random() * 15) + 20,
    heatIndex: Math.floor(Math.random() * 40) + 60
  }));

  const microclimate = {
    avgTemperature: Math.round(microclimateZones.reduce((sum, z) => sum + z.temperature, 0) / zones.length),
    heatIslands: microclimateZones.filter(z => z.heatIndex > 80).length,
    greenSpaces: Math.floor(Math.random() * 20) + 15,
    energySavings: Math.floor(Math.random() * 30) + 10,
    zones: microclimateZones
  };

  // Generate energy data
  const energyZones = zones.map(zone => ({
    ...zone,
    consumption: Math.floor(Math.random() * 500) + 200,
    solar: Math.floor(Math.random() * 200) + 50
  }));

  const energy = {
    totalConsumption: energyZones.reduce((sum, z) => sum + z.consumption, 0),
    solarGeneration: energyZones.reduce((sum, z) => sum + z.solar, 0),
    efficiency: Math.floor(Math.random() * 30) + 70,
    streetLights: Math.floor(Math.random() * 1000) + 5000,
    zones: energyZones
  };

  // Generate waste data
  const wasteZones = zones.map(zone => ({
    ...zone,
    fillLevel: Math.floor(Math.random() * 100),
    recycling: Math.floor(Math.random() * 50) + 30
  }));

  const waste = {
    binsFull: wasteZones.filter(z => z.fillLevel > 85).length,
    recyclingRate: Math.round(wasteZones.reduce((sum, z) => sum + z.recycling, 0) / zones.length),
    collectionEfficiency: Math.floor(Math.random() * 20) + 80,
    overflowAlerts: wasteZones.filter(z => z.fillLevel > 95).length,
    zones: wasteZones
  };

  return {
    traffic,
    airQuality,
    microclimate,
    energy,
    waste,
    sustainabilityIndex: Math.floor(Math.random() * 30) + 70,
    citizenComfort: Math.floor(Math.random() * 25) + 75,
    co2Reduction: Math.floor(Math.random() * 20) + 15
  };
}

function generateHistoricalData() {
  const data = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      aqi: Math.floor(Math.random() * 100) + 50,
      co2: Math.floor(Math.random() * 200) + 300
    });
  }
  
  return data;
}