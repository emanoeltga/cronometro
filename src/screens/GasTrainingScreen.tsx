import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { Flame, Shield, Zap, Target } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GasTraining'>;

const GasTrainingScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const trainingModes = [
    {
      id: 'championship',
      title: 'Gás para Campeonato',
      description: '5 rounds de 5 min com variação de intensidade a cada minuto.',
      icon: <Shield color="white" size={24} />,
      color: '#D32F2F',
      config: {
        rollsCount: 5,
        rollDuration: 300,
        restDuration: 60,
        prepDuration: 10,
        name: 'Gás para Campeonato'
      }
    },
    {
      id: 'shark-tank',
      title: 'Shark Tank',
      description: '10 minutos ininterruptos com troca de parceiro a cada 1 min.',
      icon: <Target color="white" size={24} />,
      color: '#1976D2',
      config: {
        rollsCount: 10,
        rollDuration: 60,
        restDuration: 0,
        prepDuration: 10,
        name: 'Shark Tank'
      }
    },
    {
      id: 'hiit',
      title: 'HIIT Jiu-Jitsu',
      description: '30s explosão / 15s descanso - 10 séries de exercícios específicos.',
      icon: <Zap color="white" size={24} />,
      color: '#FBC02D',
      config: {
        rollsCount: 10,
        rollDuration: 30,
        restDuration: 15,
        prepDuration: 5,
        name: 'HIIT Jiu-Jitsu'
      }
    },
    {
      id: 'simulation',
      title: 'Simulado de Luta',
      description: 'Round único com comandos motivacionais e alertas de tempo.',
      icon: <Flame color="white" size={24} />,
      color: '#7B1FA2',
      config: {
        rollsCount: 1,
        rollDuration: 600,
        restDuration: 0,
        prepDuration: 15,
        name: 'Simulado de Luta'
      }
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>Escolha um protocolo de treinamento focado em condicionamento específico para o tatame.</Text>
      
      {trainingModes.map((mode) => (
        <TouchableOpacity 
          key={mode.id} 
          style={styles.card}
          onPress={() => navigation.navigate('TimerExecution', { 
            config: {
              ...mode.config,
              id: mode.id,
              soundEnabled: true,
              vibrationEnabled: true,
              lastTenSecondsAlert: true
            } 
          })}
        >
          <View style={[styles.iconContainer, { backgroundColor: mode.color }]}>
            {mode.icon}
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{mode.title}</Text>
            <Text style={styles.cardDescription}>{mode.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 25,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
});

export default GasTrainingScreen;
