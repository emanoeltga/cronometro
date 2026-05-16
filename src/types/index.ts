export type Phase = 'preparation' | 'rolling' | 'rest' | 'finished';

export interface RollConfig {
  id: string;
  name: string;
  rollsCount: number;
  rollDuration: number; // in seconds
  restDuration: number; // in seconds
  prepDuration: number; // in seconds
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  lastTenSecondsAlert: boolean;
  isFavorite?: boolean;
}

export interface GasTrainingConfig {
  id: string;
  name: string;
  type: 'championship' | 'shark-tank' | 'hiit' | 'simulation' | 'custom';
  rounds: number;
  workDuration: number;
  restDuration: number;
  intensity: 'light' | 'moderate' | 'heavy' | 'championship';
  exercises?: string[];
  instructions?: string[];
}

export interface TrainingHistory {
  id: string;
  date: string;
  type: 'roll' | 'gas';
  configName: string;
  totalRolls: number;
  totalDuration: number;
  totalRest: number;
  perceivedExertion: 'light' | 'medium' | 'heavy' | 'extreme';
  notes?: string;
}
