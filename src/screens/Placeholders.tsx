import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const Placeholder = ({ name }: { name: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{name} Screen</Text>
    <Text style={styles.subtext}>Em desenvolvimento...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 10,
  },
});

export const RollConfigScreen = () => <Placeholder name="Roll Config" />;
export const TimerExecutionScreen = () => <Placeholder name="Timer Execution" />;
export const SavedConfigsScreen = () => <Placeholder name="Saved Configs" />;
export const GasTrainingScreen = () => <Placeholder name="Gas Training" />;
export const TrainingHistoryScreen = () => <Placeholder name="Training History" />;
