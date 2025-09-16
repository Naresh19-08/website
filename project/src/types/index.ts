export type ActiveModule = 
  | 'overview' 
  | 'traffic' 
  | 'air-quality' 
  | 'microclimate' 
  | 'energy' 
  | 'waste' 
  | 'alerts';

export interface Zone {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface TrafficData {
  congestionLevel: number;
  avgSpeed: number;
  incidents: number;
  predictedDelay: number;
  zones: Array<Zone & { congestion: number; }>;
}

export interface AirQualityData {
  aqi: number;
  co2: number;
  noiseLevel: number;
  pm25: number;
  zones: Array<Zone & { aqi: number; co2: number; noise: number; }>;
  historical: Array<{ time: string; aqi: number; co2: number; }>;
}

export interface MicroclimateData {
  avgTemperature: number;
  heatIslands: number;
  greenSpaces: number;
  energySavings: number;
  zones: Array<Zone & { temperature: number; heatIndex: number; }>;
}

export interface EnergyData {
  totalConsumption: number;
  solarGeneration: number;
  efficiency: number;
  streetLights: number;
  zones: Array<Zone & { consumption: number; solar: number; }>;
}

export interface WasteData {
  binsFull: number;
  recyclingRate: number;
  collectionEfficiency: number;
  overflowAlerts: number;
  zones: Array<Zone & { fillLevel: number; recycling: number; }>;
}

export interface CityData {
  traffic: TrafficData;
  airQuality: AirQualityData;
  microclimate: MicroclimateData;
  energy: EnergyData;
  waste: WasteData;
  sustainabilityIndex: number;
  citizenComfort: number;
  co2Reduction: number;
}