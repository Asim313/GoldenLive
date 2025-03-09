import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';

const SlideAnimationComponent = ({
  outputRange,
  imageSource,
  delay,
  animationKey,
  handleAnimattionEnd,
}) => {
  const animationValue = useRef(new Animated.Value(1)).current;
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    setShowImage(true);
    startAnimation();
  }, [animationKey]);

  const startAnimation = () => {
    setShowImage(true);
    Animated.timing(animationValue, {
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setShowImage(true);
      handleAnimattionEnd()
      animationValue?.setValue(1);
      // console.log('Animation ended');
    });
  };

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {showImage && (
        <View style={{justifyContent: 'center', alignItems: 'center', zIndex: 3}}>
          <View style={{ position: 'absolute', }}>

         <Image
         source={{uri: imageSource}}
         style={{
           width: 120,
           height: 120,
           borderRadius: 50,
           // backgroundColor: 'red',
          }}
          />
          </View>

        <Animated.View
          style={{
            transform: [
              {
                translateX: animationValue?.interpolate({
                  inputRange: [0, 1],
                  outputRange: outputRange?.translateX || [100, 0],
                }),
              },
              {
                translateY: animationValue?.interpolate({
                  inputRange: [0, 1],
                  outputRange: outputRange?.translateY || [-100, 0],
                }),
              },
              {
                scale: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 1],
                }),
              },
            ],
          }}>
          <Image
            source={{uri: imageSource}}
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              // backgroundColor: 'red',
            }}
          />
        </Animated.View>
        </View>
      )}
    </View>
  );
};

export default SlideAnimationComponent;
