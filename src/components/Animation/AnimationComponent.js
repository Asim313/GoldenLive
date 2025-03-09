import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import database from '@react-native-firebase/database';

const AnimationComponent = memo(({}) => {
  
  const animatedValue = new Animated.Value(0);
  const animationDuration = 1000;
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [animatedText, setAnimatedText]  = useState([])
  const [isAniamtionRunning, setIsAnimatoinRunning] = useState(false)
  const [triggerEffect, setTriggerEffect] = useState(0);
  // const removeItemFrom0Index = () => {
  //   const currentArray = animatedText.current;
  //   if (currentArray.length > 0) {
  //     currentArray.shift(); // Remove the item at the 0 index
  //     animatedText.current = currentArray; // Update the useRef object
  //     contFunctoin()
  //     console.log("dfskf", animatedText.current)
  //   }
  // }

  const contFunctoin = () => {
    setTriggerEffect(prev => prev + 1)
  }

  const checkGiftStatus = () => {
    database()
      .ref(`Animation`)
      .on('child_added', snapshot => {
        console.log("animation data from firebase", snapshot?.val())
        {snapshot?.val() && setAnimatedText(prevData => [...prevData, snapshot?.val()])}
        {snapshot?.val() && contFunctoin()}
      
      });
  }

  useEffect(() => {
    database()
    .ref(`/Animation`)
    .on('child_added', snapshot => {
      console.log("animation data from firebase", snapshot?.val())
      {snapshot?.val() && setAnimatedText(prevData => [...prevData, snapshot?.val()])}
      {snapshot?.val() && setTriggerEffect(prev => prev + 1)}
      return () => {
        database().ref('Animation').off();
      };
    });
  }, []) 

  useEffect(() => {
    
   {animatedText?.length === 1 && handleAnimation()}
    console.log("dfksla;fjasd;klfjasdfjksdklfjasd;lfj;asdkf;asdlfjasd;fkj2222", triggerEffect, isAniamtionRunning, animatedText)
   
  }, [animatedText])

  // useEffect(() => {
  //   // console.log('animation Value', animatedText.current);
  //   handleAnimation()
  // }, [value]);

  const handleAnimation = async () => {
    setIsAnimatoinRunning(true)
    console.log('00000000000000000000000000000000', animatedText?.[0])
    if (animatedText?.[0]) {
      Animated.timing(animatedValue, {
        toValue: 0.5,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: animationDuration,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {
            console.log("fdjksfjl")
          //  removeElementAtIndex0();
          });
        }, 1000);
      });
    }
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      Dimensions.get('window').width / 0.2,
      0,
      -Dimensions.get('window').width / 0.2,
    ],
  });

  return (
    <View style={styles.container}>
      <View>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{translateX}],
            },
          ]}>
          <ImageBackground
            source={require('../../assets/images/globalTopBarAnimation/L1.png')}
            style={{
              width: 300,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/images/apple2.png')}
              style={{height: 30, width: 30}}
            />
            <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
              {animatedText?.[0]}
            </Text>
          </ImageBackground>
        </Animated.View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    width: 300,
    height: 50,
    // backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimationComponent;
