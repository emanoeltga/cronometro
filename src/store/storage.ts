import AsyncStorage from '@react-native-async-storage/async-storage';
import { RollConfig, TrainingHistory } from '../types';

const KEYS = {
  ROLL_CONFIGS: '@jiu_timer_roll_configs',
  HISTORY: '@jiu_timer_history',
  FAVORITE_CONFIG: '@jiu_timer_favorite_config',
};

export const storage = {
  async saveRollConfigs(configs: RollConfig[]) {
    await AsyncStorage.setItem(KEYS.ROLL_CONFIGS, JSON.stringify(configs));
  },

  async getRollConfigs(): Promise<RollConfig[]> {
    const data = await AsyncStorage.getItem(KEYS.ROLL_CONFIGS);
    return data ? JSON.parse(data) : [];
  },

  async saveHistory(history: TrainingHistory[]) {
    await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
  },

  async getHistory(): Promise<TrainingHistory[]> {
    const data = await AsyncStorage.getItem(KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  },

  async addHistoryEntry(entry: TrainingHistory) {
    const history = await this.getHistory();
    await this.saveHistory([entry, ...history]);
  }
};
