import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { Play, Flame, History, Bookmark, Trophy } from 'lucide-react-native';
import { storage } from '../store/storage';
import { isToday } from 'date-fns';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const [stats, setStats] = useState({ rolls: 0, time: 0 });
  const [lastTraining, setLastTraining] = useState<string | null>(null);

  useEffect(() => {
    if (isFocused) {
      loadStats();
    }
  }, [isFocused]);

  const loadStats = async () => {
    const history = await storage.getHistory();
    const todayTrainings = history.filter(h => isToday(new Date(h.date)));
    
    const totalRolls = todayTrainings.reduce((acc, curr) => acc + curr.totalRolls, 0);
    const totalTime = todayTrainings.reduce((acc, curr) => acc + curr.totalDuration, 0);
    
    setStats({
      rolls: totalRolls,
      time: Math.floor(totalTime / 60)
    });

    if (history.length > 0) {
      setLastTraining(history[0].configName);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Oss! Pronto para o treino?</Text>
      </View>

      <View style={styles.mainActions}>
        <TouchableOpacity 
          style={[styles.bigButton, { backgroundColor: colors.success }]}
          onPress={() => navigation.navigate('RollConfig')}
        >
          <Play size={40} color="white" fill="white" />
          <Text style={styles.bigButtonText}>Iniciar Rola</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.bigButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('GasTraining')}
        >
          <Flame size={40} color="white" fill="white" />
          <Text style={styles.bigButtonText}>Treino de Gás</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.secondaryActions}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('SavedConfigs')}
        >
          <Bookmark color={colors.text} size={24} />
          <Text style={styles.menuItemText}>Configurações Salvas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('TrainingHistory')}
        >
          <History color={colors.text} size={24} />
          <Text style={styles.menuItemText}>Histórico de Treinos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Resumo de Hoje</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.rolls}</Text>
            <Text style={styles.statLabel}>Rolas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.time}m</Text>
            <Text style={styles.statLabel}>Tempo Total</Text>
          </View>
        </View>
      </View>

      {lastTraining && (
        <View style={styles.lastTrainingCard}>
          <Trophy size={20} color={colors.secondary} />
          <View>
            <Text style={styles.lastTrainingLabel}>Último treino:</Text>
            <Text style={styles.lastTrainingName}>{lastTraining}</Text>
          </View>
        </View>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  mainActions: {
    gap: 15,
    marginBottom: 30,
  },
  bigButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 16,
    gap: 15,
    elevation: 5,
  },
  bigButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  secondaryActions: {
    gap: 10,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 12,
    gap: 15,
  },
  menuItemText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    color: colors.success,
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 5,
  },
  lastTrainingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 12,
    gap: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lastTrainingLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  lastTrainingName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
