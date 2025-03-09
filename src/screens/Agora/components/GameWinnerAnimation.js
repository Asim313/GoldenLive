import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AllIcons, { IconList } from '../../../components/AllIcons';
import AnimatedLottieView from 'lottie-react-native';

const GameWinnerAnimation = ({profName,profImage,beansText,coinImage}) => {

  // console.log("prof", profName)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimeEnd = useRef(new Animated.Value(3)).current;
  const [endVal, setEndVal] = useState(3);
  const [isAnimationEnd, setIsAnimationEnd] = useState(true) 
  useEffect(() => {
    setIsAnimationEnd(false)
    fadeAnim.setValue(0)
    fadeAnimeEnd.setValue(3)
    Animated.timing(fadeAnim, {
      toValue: fadeAnimeEnd,
      duration: 4000, 
      useNativeDriver: true,
    }).start(() => {
      // console.log("yes3")
      fadeAnimeEnd.setValue(0)
      setIsAnimationEnd(true)
    });
  }, [profName]);

const startAnimation = () => {
  fadeAnim.setValue(0)
  Animated.timing(fadeAnim, {
    toValue: endVal,
    duration: 4000, 
    useNativeDriver: true,
  }).start(() => {
    console.log("yes3")
    setEndVal(0)
  });
}
  return (
    <SafeAreaView style={styles.FullView}>
      {!isAnimationEnd &&
      <Animated.View style={[styles.MainView, {opacity: fadeAnim}]}>
        <LinearGradient colors={['#FF5733', '#F5B041']} style={[styles.gradient, {opacity: 0.8}]}>
       <Image source={profImage ?? require('../../../assets/images/events.jpg')} style={styles.imgView} />
          <View style={[styles.midView]}>
            <Text style={styles.txt1}>
            {profName?.name} {profName?.message} to {profName?.hostName}</Text>
           <View style={styles.bottomView}>
           { profName?.beans &&    <Text style={styles.txt2}>beans: {profName?.beans}</Text> }
                <AllIcons name={IconList.FontAwesome5} iconName={'coins'} size={18} color={'gold'}/>
              <Image
                source={coinImage}
                style={styles.img2}
              />
            </View>
          </View>
        </LinearGradient>
{/* 
        <LinearGradient colors={['#cc2b5e', '#753a88']} style={[styles.gradient, {marginTop: 20, opacity: 0.8, width: widthPercentageToDP(70)}]}>
          <Image source={profImage ?? require('../../../assets/images/events.jpg')} style={styles.imgView} />
          <View style={[styles.midView]}>
            <Text style={styles.txt1}>
            {profName?.name} {profName?.message} to {profName?.hostName}</Text>
           <View style={styles.bottomView}>
           { profName?.beans &&    <Text style={styles.txt2}>beans: {profName?.beans}</Text> }
                <AllIcons name={IconList.FontAwesome5} iconName={'coins'} size={18} color={'gold'}/>
              <Image
                source={coinImage}
                style={styles.img2}
              />
            </View>
          </View>
          <AnimatedLottieView
          // // autoPlay
          // ref={ref}
          // loop={false}
          loop
          autoPlay={true}
          style={{
            width: 30,
            height: 30,
          }}
         // onAnimationFinish={pauseAnim}
          source={require('../../../assets/json/audio-waves.json')}
        />
        </LinearGradient> */}

      </Animated.View>
}
    </SafeAreaView>
  );
};

export default GameWinnerAnimation;

const styles = StyleSheet.create({
  // FullView: {
  //   flex: 1,
  // },
  // MainView: {
  //   height: heightPercentageToDP(100),
  //   width: '100%'
  // },
  gradient: {
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
    // height: '6%',
    borderRadius: 150 / 1,
    flexGrow: 0,
  },
  imgView: {
    height: 35,
    width: 35,
    borderRadius: 150 / 1,
    left: 4,
  },
  midView: {
    left: 10,
  },
  txt1: {
    fontSize: 11,
    width: '90%',
    fontWeight: 'bold',
    color: 'black',
  },
  bottomView: {
    flexDirection: 'row',
  },
  txt2: {
    fontSize: 11,
    color: 'black',
    marginTop: 3,
    marginRight: 3,
    bottom: 3,
    fontWeight: 'bold',
  },
  img2: {
    height: 18,
    width: 40,
  },
});
