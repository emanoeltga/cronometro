import { storage } from './storage';
import { RollConfig } from '../types';

const defaultConfigs: RollConfig[] = [
  {
    id: '1',
    name: 'Rola Padrão',
    rollsCount: 6,
    rollDuration: 360,
    restDuration: 60,
    prepDuration: 10,
    soundEnabled: true,
    vibrationEnabled: true,
    lastTenSecondsAlert: true,
    isFavorite: true
  },
  {
    id: '2',
    name: 'Campeonato',
    rollsCount: 5,
    rollDuration: 300,
    restDuration: 60,
    prepDuration: 15,
    soundEnabled: true,
    vibrationEnabled: true,
    lastTenSecondsAlert: true
  }
];

export const seedInitialData = async () => {
  const existing = await storage.getRollConfigs();
  if (existing.length === 0) {
    await storage.saveRollConfigs(defaultConfigs);
  }
};
