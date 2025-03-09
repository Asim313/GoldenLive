import React, { useEffect, useRef, useState } from 'react';
import database from '@react-native-firebase/database';
import { Text, TouchableOpacity, View, Animated } from 'react-native';

const Testing = () => {
  const animated = new Animated.Value(-200);
  const duration = 500;

  const [textQueue, setTextQueue] = useState(['Text 1', 'text2', 'text3']);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const isAnimationRunning = useRef(true);

  const animateText = (index) => {
    animated.setValue(-200)
    isAnimationRunning.current = true;
    Animated.sequence([
      Animated.timing(animated, {
        toValue: 150,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(animated, {
        toValue: 500,
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        if (currentTextIndex === textQueue.length - 1) {
         // setCurrentTextIndex(0); // Reset the index to start over
        } else {
          setCurrentTextIndex(currentTextIndex + 1);
        }
      }, duration);
    });
  };

  useEffect(() => {
    animateText(currentTextIndex);
  }, [currentTextIndex]);

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/toper`)
      .on('child_added', (snapshot) => {
        console.log('New data added:', isAnimationRunning, snapshot.val());
        if (snapshot.val()?.name) {
          setTextQueue((prevTexts) => [...prevTexts, snapshot?.val().name]);
        }
      });
    return () => {
      database().ref(`/toper`).off('child_added', onChildAdd);
    };
  }, []);

  return (
    <View>
      {/* ...your UI components */}
      <Animated.View style={[{ transform: [{ translateX: animated }] }]}>
        <View style={{ backgroundColor: 'red', width: 100 }}>
          <Text>{textQueue[currentTextIndex]}</Text>
        </View>
      </Animated.View>

      <TouchableOpacity style={{ backgroundColor: 'red', padding: 5}} onPress={() => {
        animateText(currentTextIndex);
      }}>
          <Text style={{marginVertical: 5}}>restart animaton</Text>

      </TouchableOpacity>
    </View>
  );
};

export default Testing;
