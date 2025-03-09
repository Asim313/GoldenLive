import AnimatedLottieView from 'lottie-react-native';
import React, { useRef, useEffect, memo } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const StickerAnimatedBox = memo(({ position, toValue, sticker }) => {
  const animatedPosition = useRef(new Animated.ValueXY(position)).current;

  useEffect(() => {
    console.log("animatedPosition", animatedPosition)
    Animated.timing(animatedPosition, {
      toValue: { x: toValue.x, y: toValue.y },
      duration: 1000,
      useNativeDriver: false,
    }).start(() => console.log('Animation ended'));
  }, [toValue]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { transform: animatedPosition.getTranslateTransform() }]}>
          <AnimatedLottieView
            autoPlay
            style={{
                width: 60,
                height: 60,
            }}
            source={sticker}
            />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  box: {
    borderRadius: 40,
    width: 30,
    height: 30,
    // backgroundColor: 'white',
  },
});

export default StickerAnimatedBox;
