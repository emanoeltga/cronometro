import { RollConfig, GasTrainingConfig } from './index';

export type RootStackParamList = {
  Home: undefined;
  RollConfig: { config?: RollConfig } | undefined;
  TimerExecution: { config: RollConfig };
  SavedConfigs: undefined;
  GasTraining: undefined;
  GasTrainingConfig: { config?: GasTrainingConfig } | undefined;
  TrainingHistory: undefined;
  TrainingSummary: { history: any };
  Settings: undefined;
};
