import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { Phase } from '../types';
import { storage } from '../store/storage';
import { X, Play, Pause, SkipForward } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TimerExecution'>;
type TimerRouteProp = RouteProp<RootStackParamList, 'TimerExecution'>;

const TimerExecutionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TimerRouteProp>();
  const { config } = route.params;

  const [phase, setPhase] = useState<Phase>('preparation');
  const [currentRoll, setCurrentRoll] = useState(1);
  const [timeLeft, setTimeLeft] = useState(config.prepDuration);
  const [isActive, setIsActive] = useState(true);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playSound = async () => {
    if (!config.soundEnabled) return;
    // In a real app, we would load local assets. For this demo, we use a placeholder logic.
    console.log('Playing sound alert');
  };

  const triggerVibration = () => {
    if (config.vibrationEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const saveToHistory = async () => {
    try {
      await storage.addHistoryEntry({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type: 'roll',
        configName: config.name,
        totalRolls: config.rollsCount,
        totalDuration: config.rollsCount * config.rollDuration,
        totalRest: (config.rollsCount - 1) * config.restDuration,
        perceivedExertion: 'medium',
      });
    } catch (e) {
      console.error('Error saving history:', e);
    }
  };

  const nextPhase = useCallback(() => {
    triggerVibration();
    playSound();

    if (phase === 'preparation') {
      setPhase('rolling');
      setTimeLeft(config.rollDuration);
    } else if (phase === 'rolling') {
      if (currentRoll < config.rollsCount) {
        setPhase('rest');
        setTimeLeft(config.restDuration);
      } else {
        setPhase('finished');
        setIsActive(false);
        saveToHistory();
      }
    } else if (phase === 'rest') {
      setPhase('rolling');
      setCurrentRoll(prev => prev + 1);
      setTimeLeft(config.rollDuration);
    }
  }, [phase, currentRoll, config]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      nextPhase();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, nextPhase]);

  const getPhaseTitle = () => {
    switch (phase) {
      case 'preparation': return 'PREPARAÇÃO';
      case 'rolling': return 'ROLA EM ANDAMENTO';
      case 'rest': return 'DESCANSO';
      case 'finished': return 'TREINO FINALIZADO';
    }
  };

  const getPhaseColor = () => {
    return colors.phases[phase];
  };

  const handleExit = () => {
    Alert.alert(
      'Encerrar Treino',
      'Tem certeza que deseja sair do treino?',
      [
        { text: 'Continuar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => navigation.navigate('Home') }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: getPhaseColor() }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleExit} style={styles.closeButton}>
          <X color="white" size={30} />
        </TouchableOpacity>
        <Text style={styles.rollCounter}>
          {phase === 'finished' ? 'Concluído' : `Rola ${currentRoll} de ${config.rollsCount}`}
        </Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.phaseTitle}>{getPhaseTitle()}</Text>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>

      <View style={styles.controls}>
        {phase !== 'finished' && (
          <>
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={() => setIsActive(!isActive)}
            >
              {isActive ? <Pause size={40} color="white" /> : <Play size={40} color="white" />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={nextPhase}
            >
              <SkipForward size={40} color="white" />
            </TouchableOpacity>
          </>
        )}
        
        {phase === 'finished' && (
          <TouchableOpacity 
            style={styles.finishButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.finishButtonText}>VOLTAR AO INÍCIO</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  closeButton: {
    padding: 10,
  },
  rollCounter: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20,
  },
  timerText: {
    color: 'white',
    fontSize: 120,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingBottom: 60,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButton: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  finishButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TimerExecutionScreen;
