import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from './src/types/navigation';
import { colors } from './src/theme/colors';
import { seedInitialData } from './src/store/seed';

import { 
  HomeScreen, 
  RollConfigScreen, 
  TimerExecutionScreen, 
  SavedConfigsScreen, 
  GasTrainingScreen, 
  TrainingHistoryScreen 
} from './src/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  React.useEffect(() => {
    seedInitialData();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Jiu Timer Pro' }}
        />
        <Stack.Screen 
          name="RollConfig" 
          component={RollConfigScreen} 
          options={{ title: 'Configurar Rola' }}
        />
        <Stack.Screen 
          name="TimerExecution" 
          component={TimerExecutionScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SavedConfigs" 
          component={SavedConfigsScreen} 
          options={{ title: 'Configurações Salvas' }}
        />
        <Stack.Screen 
          name="GasTraining" 
          component={GasTrainingScreen} 
          options={{ title: 'Treino de Gás' }}
        />
        <Stack.Screen 
          name="TrainingHistory" 
          component={TrainingHistoryScreen} 
          options={{ title: 'Histórico' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
