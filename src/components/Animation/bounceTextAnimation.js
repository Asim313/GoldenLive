import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

const BubbleTextAnimation = ({text}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateBubble();
  }, []); // Run the animation once when the component mounts

  const animateBubble = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, { toValue: 1, duration: 500, easing: Easing.inOut(Easing.ease), useNativeDriver: true, }),
        Animated.timing(scaleValue, { toValue: 0, duration: 500, easing: Easing.inOut(Easing.ease), useNativeDriver: true, }),
      ]),
    ).start();
  };

  const interpolatedScale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2], // Adjust the value to control the zoom in/out effect
  });

  return (
    <View style={{  }}>
      <Animated.Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', transform: [{ scale: interpolatedScale }] }}>
     { text }
      </Animated.Text>
    </View>
  );
};

export default BubbleTextAnimation;
