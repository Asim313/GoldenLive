import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, StyleSheet, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const AnimatedLinearGradient = ({ children, inputValue, image, ...rest }) => {
  const slideAnim = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
      <LinearGradient {...rest}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
          <Image source={{uri: image}} style={styles.image} />
          <Text style={styles.text}>{inputValue}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const SlideAnimationView = ({ image, inputValue, onAnimationComplete }) => {
  const slideAnim = useRef(new Animated.Value(1000)).current;
  const [entryMsg, setEntryMsg] = useState(inputValue);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setAnimationCompleted(true);
    });
  }, [slideAnim]);

  useEffect(() => {
    if (animationCompleted) {
      Animated.timing(slideAnim, {
        toValue: -1000,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onAnimationComplete()
        setEntryMsg('');
      });
    }
  }, [animationCompleted, slideAnim]);

  return (
    <View style={styles.container}>
      {entryMsg ? (
        <AnimatedLinearGradient
          colors={['#69B803', 'rgba(0, 0, 0, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, { width: widthPercentageToDP(70) ,alignItems:'flex-start' }]} // Set width to 80%
          inputValue={entryMsg}
          image={image}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    borderRadius: 75,
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 7,
    color: 'black',
  },
  image: {
    height: 35,
    width: 70,
  },
});

export default SlideAnimationView;
