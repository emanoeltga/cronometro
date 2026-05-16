import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { RollConfig } from '../types';
import { storage } from '../store/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RollConfig'>;

const RollConfigScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  
  const [config, setConfig] = useState<RollConfig>({
    id: Date.now().toString(),
    name: 'Novo Treino',
    rollsCount: 6,
    rollDuration: 360, // 6 min
    restDuration: 60,  // 1 min
    prepDuration: 10,  // 10 sec
    soundEnabled: true,
    vibrationEnabled: true,
    lastTenSecondsAlert: true,
  });

  const handleStart = () => {
    navigation.navigate('TimerExecution', { config });
  };

  const handleSave = async () => {
    try {
      const existing = await storage.getRollConfigs();
      await storage.saveRollConfigs([...existing, config]);
      Alert.alert('Sucesso', 'Configuração salva com sucesso!');
      navigation.navigate('SavedConfigs');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a configuração.');
    }
  };

  const updateConfig = (key: keyof RollConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return mins.toString();
  };

  const handleTimeChange = (key: keyof RollConfig, text: string) => {
    const mins = parseInt(text) || 0;
    updateConfig(key, mins * 60);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Nome do Treino</Text>
        <TextInput
          style={styles.input}
          value={config.name}
          onChangeText={(text) => updateConfig('name', text)}
          placeholder="Ex: Treino de Sábado"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.label}>Rolas</Text>
          <TextInput
            style={styles.input}
            value={config.rollsCount.toString()}
            onChangeText={(text) => updateConfig('rollsCount', parseInt(text) || 0)}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.label}>Tempo Rola (min)</Text>
          <TextInput
            style={styles.input}
            value={formatTime(config.rollDuration)}
            onChangeText={(text) => handleTimeChange('rollDuration', text)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.label}>Descanso (min)</Text>
          <TextInput
            style={styles.input}
            value={formatTime(config.restDuration)}
            onChangeText={(text) => handleTimeChange('restDuration', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.section, { flex: 1 }]}>
          <Text style={styles.label}>Prep (seg)</Text>
          <TextInput
            style={styles.input}
            value={config.prepDuration.toString()}
            onChangeText={(text) => updateConfig('prepDuration', parseInt(text) || 0)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Ativar Som</Text>
        <Switch
          value={config.soundEnabled}
          onValueChange={(val) => updateConfig('soundEnabled', val)}
          trackColor={{ false: '#767577', true: colors.success }}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Ativar Vibração</Text>
        <Switch
          value={config.vibrationEnabled}
          onValueChange={(val) => updateConfig('vibrationEnabled', val)}
          trackColor={{ false: '#767577', true: colors.success }}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Configuração</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>INICIAR TREINO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  switchLabel: {
    color: colors.text,
    fontSize: 16,
  },
  actions: {
    marginTop: 30,
    gap: 15,
    paddingBottom: 40,
  },
  saveButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.success,
  },
  saveButtonText: {
    color: colors.success,
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: colors.success,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RollConfigScreen;
