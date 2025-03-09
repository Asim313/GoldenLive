// GradientContainer.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientComponent = ({ colors, children, style }) => {
  return (
    <LinearGradient colors={colors} style={[styles.gradient, style]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default LinearGradientComponent;
