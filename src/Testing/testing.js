import React, { useEffect, useRef, useState } from 'react';
import database from '@react-native-firebase/database';
import { Text, TouchableOpacity, View, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import base64 from 'base-64';
import TextSlideAnimation from '../components/Animation/TextSlideAnimation';

const Testing = () => {
  const animated = new Animated.Value(-200);
  const duration = 7000;
  let textFont  = null
  const checking = useRef('hello')
  const [textQueue, setTextQueue] = useState(['Text 1', 'text2', 'text3']);
  const testingRef = useRef([])
  const loopRef = useRef()
  // const [currentTextIndex, setCurrentTextIndex] = useState(0);
   const currentTextIndex = useRef(0);
  const isAnimationRunning = useRef(true);

  // useFocusEffect(
  //   React.useCallback(() => {
     
  //     return () => {
  //      loopRef.current &&  loopRef.current.stop();
  //       // Stop your animation when the component loses focus
  //     };
  //   }, [])
  // );

  const animateText = (index) => {
    isAnimationRunning.current = true;
    animated.setValue(-200)
    // Create an animated sequence

    Animated.loop(
      Animated.timing(animated, {
        toValue: 500,
        duration: duration,
      })
    ).start();

  //   const animationData  = [
  //     Animated.timing(animated, {
  //       toValue: 500,
  //       duration: duration,
  //       useNativeDriver: true,
  //     }),
  //   ]

  //  loopRef.current = Animated.sequence(animationData)
  //  loopRef.current.start(() => {
  //   console.log("heeeeeeeeeeeeeeeeeeeeeee", testingRef.current?.[currentTextIndex?.current])
  //   if(testingRef.current?.length > currentTextIndex.current) {
  //     console.log("have value", testingRef.current.length, currentTextIndex)
  //     checking.current = 'hello'
  //    // setTextQueue(testingRef.current?.[currentTextIndex?.current])
  //    textFont = testingRef.current?.[currentTextIndex?.current]
  //     currentTextIndex.current = currentTextIndex.current + 1
  //     animateText(0)
  //   }
  //   else {
  //     console.log('animation ended', testingRef.current.length, currentTextIndex)
  //     currentTextIndex.current = 0
  //     testingRef.current = []
  //   }
  //  })

    // when we use .start with sequence or timing then loop works only one time and stop animatin
    // Create an Animated.loop and store it in a ref
   // const loop = Animated.loop(sequence);
  
    // // Start the loop animation
    // loop.start(() => {
    //   console.log('sequence ended');
    //   if(testingRef.current.length >= 1) {
    //     animateText(0)
    //   } else {
    //     console.log("testing ref is empty")
    //   }
    // });
  
    // // Store the loop in a ref to access it later
    // loopRef.current = loop;
  
    // setTimeout(() => {
    //   if (isAnimationRunning.current) {
    //     // Stop the loop animation
    //     console.log('Animation stopped');
    //   }
    // }, duration + 2000);
  };

  const chekingAgoraAPi = () => {
      // Customer ID
      const customerKey = '8f5a8e7afca141f882b624cda005cc60';
      // Customer secret
      const customerSecret = 'e95036734bd441b280366ab9a42638a7';
      // Concatenate customer key and customer secret and use base64 to encode the concatenated string
      const plainCredential = customerKey + ':' + customerSecret;
      // Encode with base64
      const encodedCredential = base64.encode(plainCredential)
      // Buffer.from(plainCredential).toString('base64');
      const authorizationField = 'Basic ' + encodedCredential;
      const appid = '668d0ba86a5a4a96a5801aba820fc762'
      // Set request parameters
      const options = {
        method: 'GET',
        headers: {
          Authorization: authorizationField,
          'Content-Type': 'application/json',
        },
      };
  
      // API endpoint
      const apiUrl = `https://api.agora.io/dev/v1/channel/${appid}`;
  
      // Make the API request
      fetch(apiUrl, options)
        .then((response) => {
          console.log('resssssssss', response)
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((data) => {
          console.log('Response Data:', data?.data?.channels);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    
  }
  

  useEffect(() => {
   // animateText(0);
  }, []);

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/toper`)
      .on('child_added', (snapshot) => {
        console.log('New data added:', isAnimationRunning, snapshot.val());
        if (snapshot.val()?.name) {
          testingRef.current.push(snapshot.val()?.name);
          if(testingRef.current.length === 1) {
            animateText(0)

          }       
         }
      });
    return () => {
      if (loopRef.current) {
        loopRef.current.stop(); // Stop the animation loop
      }
      database().ref(`/toper`).off('child_added', onChildAdd);
    };
  }, []);

  return (
    <View>
      <TextSlideAnimation name={'testing'} />
      {/* ...your UI components */}
      <Animated.View style={[{ transform: [{ translateX: animated }] }]}>
        <View style={{ backgroundColor: 'red', width: 100, marginVertical: 10 }}>
          <Text style={{textAlign: 'center' }}>{'hello'}</Text>
        </View>
      </Animated.View>

      <TouchableOpacity style={{ backgroundColor: 'red', padding: 5}} onPress={() => {
        // animateText(currentTextIndex);
        chekingAgoraAPi()
      }}>
          <Text style={{marginVertical: 5}}>restart animaton</Text>

      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: 'red', padding: 5}} onPress={() => {
        database().ref('/toper').push({
          name: testingRef.current.length + 1
        })
      }}>
          <Text style={{marginVertical: 5}}>send to firebase</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ backgroundColor: 'red', padding: 5}} onPress={() => {
        database().ref('/toper').remove()
      }}>
          <Text style={{marginVertical: 5}}>Remove from firebase</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: 'red', padding: 5}} onPress={() => {
        animated.stopAnimation()
      }}>
          <Text style={{marginVertical: 5}}>Stop Animation</Text>
          <Text style={{marginVertical: 5}}>{checking.current}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Testing;
