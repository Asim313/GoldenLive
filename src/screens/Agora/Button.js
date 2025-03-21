import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';


const Button = ({text, onPress, style, image, disabled}) => {
  const renderContent = () => {
    if (image) {
      return image();
    }

    return (
      <Text style={[styles.text, disabled && styles.disabledText]}>{text}</Text>
    );
  };
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    borderRadius: 4,
    backgroundColor: '#FFF',
    padding: 5,
  },
  disabledText: {
    color: '#FFF',
    backgroundColor: '#AAA',
  },
});

export default Button;
