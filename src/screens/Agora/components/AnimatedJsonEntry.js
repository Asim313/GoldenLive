import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const AnimatedJsonEntry = ({inputValue, onAnimationComplete}) => {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        autoPlay
        onAnimationFinish={() => onAnimationComplete()}
         loop={false}
        style={{
          right: 0,
          height: 90,
          width: 250
        }}
        source={require('../../../Testing/白虎.json')}
      />
        <View style={{position: 'absolute'}}>
            <Text style={{fontSize: 11, color: 'white'}}>{inputValue}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedJsonEntry;
