import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { TrainingHistory } from '../types';
import { storage } from '../store/storage';
import { Calendar, Clock, Activity } from 'lucide-react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const TrainingHistoryScreen = () => {
  const [history, setHistory] = useState<TrainingHistory[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await storage.getHistory();
    setHistory(data);
  };

  const renderItem = ({ item }: { item: TrainingHistory }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.configName}</Text>
        <Text style={styles.cardDate}>
          {format(new Date(item.date), "dd 'de' MMMM", { locale: ptBR })}
        </Text>
      </View>
      
      <View style={styles.cardStats}>
        <View style={styles.stat}>
          <Activity size={16} color={colors.success} />
          <Text style={styles.statText}>{item.totalRolls} rolas</Text>
        </View>
        <View style={styles.stat}>
          <Clock size={16} color={colors.info} />
          <Text style={styles.statText}>{Math.floor(item.totalDuration / 60)} min</Text>
        </View>
        <View style={styles.intensityBadge}>
          <Text style={styles.intensityText}>{item.perceivedExertion.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{history.length}</Text>
          <Text style={styles.summaryLabel}>Treinos</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {history.reduce((acc, curr) => acc + curr.totalRolls, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Rolas</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {Math.floor(history.reduce((acc, curr) => acc + curr.totalDuration, 0) / 60)}
          </Text>
          <Text style={styles.summaryLabel}>Minutos</Text>
        </View>
      </View>

      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Calendar size={48} color={colors.border} />
            <Text style={styles.emptyText}>Nenhum treino registrado ainda.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 25,
    margin: 20,
    borderRadius: 16,
    justifyContent: 'space-between',
    elevation: 4,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    color: colors.success,
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDate: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: colors.text,
    fontSize: 14,
  },
  intensityBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  intensityText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
    gap: 15,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default TrainingHistoryScreen;
