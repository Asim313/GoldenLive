// not using
import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

const SlideInView = ({ children, onAnimationComplete }) => {
  const slideAnim = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    const slideIn = Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    });

    const slideOut = Animated.timing(slideAnim, {
      toValue: -500,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    });

    // Slide in animation
    Animated.sequence([slideIn, delay(3000), slideOut]).start(() => {
        onAnimationComplete()
        console.log('hreeeeee')
    });
  }, [slideAnim]);

  const delay = (time) => {
    return Animated.delay(time);
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        // Other styles for your view
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default SlideInView;
