import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { RollConfig } from '../types';
import { storage } from '../store/storage';
import { Play, Trash2, Clock, RotateCcw } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SavedConfigs'>;

const SavedConfigsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [configs, setConfigs] = useState<RollConfig[]>([]);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    const data = await storage.getRollConfigs();
    setConfigs(data);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Excluir',
      'Deseja excluir esta configuração?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive', 
          onPress: async () => {
            const updated = configs.filter(c => c.id !== id);
            await storage.saveRollConfigs(updated);
            setConfigs(updated);
          } 
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: RollConfig }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.cardDetails}>
          <View style={styles.detailItem}>
            <RotateCcw size={14} color={colors.textSecondary} />
            <Text style={styles.detailText}>{item.rollsCount} rolas</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={14} color={colors.textSecondary} />
            <Text style={styles.detailText}>{item.rollDuration / 60} min</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity 
          onPress={() => handleDelete(item.id)}
          style={styles.actionButton}
        >
          <Trash2 size={20} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('TimerExecution', { config: item })}
          style={[styles.actionButton, styles.playButton]}
        >
          <Play size={20} color="white" fill="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={configs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhuma configuração salva.</Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => navigation.navigate('RollConfig')}
            >
              <Text style={styles.createButtonText}>Criar Primeira</Text>
            </TouchableOpacity>
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
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDetails: {
    flexDirection: 'row',
    gap: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  playButton: {
    backgroundColor: colors.success,
  },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: colors.success,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SavedConfigsScreen;
