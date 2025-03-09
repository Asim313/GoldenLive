import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingBar = ({ total, current }) => {
  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>{current}/{total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 40,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#000',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default LoadingBar;
