import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native';
import database from '@react-native-firebase/database';
import AnimatedLottieView from 'lottie-react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { addGiftsToQueue } from '../Redux/Actions';
import Testing10 from './testing10';

const SvgaTesting = () => {
 
  
  return (
    <View>

 <AnimatedLottieView
              autoPlay
              loop={false}
              onAnimationFinish={() => console.log("animation fnindished")}
              style={{
                width: widthPercentageToDP(100),
                height: heightPercentageToDP(100),
              }}
              source={require('../assets/json/pk-win.json')}
            />

    
    </View>
  );
};

export default SvgaTesting;



