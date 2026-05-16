import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface TimerDisplayProps {
  seconds: number;
  phase: string;
  color: string;
}

const TimerDisplay = ({ seconds, phase, color }: TimerDisplayProps) => {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.phaseText, { color }]}>{phase.toUpperCase()}</Text>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
  },
  timerText: {
    color: colors.text,
    fontSize: 100,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
});

export default TimerDisplay;
