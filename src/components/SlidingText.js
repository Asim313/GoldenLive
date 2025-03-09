//items list
{/* <SlidingText initialTextArray={["item 1", "item 2", "item 3"]}/> */}

import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { Animated, Text, TextInput, View } from 'react-native';

const SlidingText = ({ initialTextArray  }) => {
  const [textArray, setTextArray] = useState([]);
  const [newText, setNewText] = useState(initialTextArray ?? null);
  const animatedValues = useRef(textArray?.map(() => new Animated.Value(500))).current;
  const [show, setShow] = useState(true)
  useEffect(() => {
   { initialTextArray && setNewText(initialTextArray)}
    console.log('textarray', textArray, newText)
   { initialTextArray && handleSubmit()}
  }, [initialTextArray]);

  const handleSubmit = () => {
    setShow(true)
    const newAnimatedValue = new Animated.Value(300);
    console.log('new', newText,textArray)
    animatedValues.push(newAnimatedValue);
    setTextArray([...textArray, initialTextArray]);
    Animated.timing(newAnimatedValue, {
      toValue: -1000,
      duration: 10000,
      useNativeDriver: true,
    }).start(() => {
      console.log("done")
      setShow(false)
    });
  };

  return (
    <View>
      {show && 
        <View style={{
          flexDirection: 'row', width: '60%', overflow: 'hidden',
          backgroundColor: '#393749', borderRadius:12
        }}>
          {textArray?.map((text, index) => (
            <Animated.View key={index} style={{ transform: [{ translateX: animatedValues[index] }] }}>
              <Text style={{ fontSize: 11, color: 'white', fontWeight: 'bold', width: '100%' }}>{text}</Text>
            </Animated.View>
          ))}
        </View>
      }
    </View>
  );
};

export default SlidingText;
