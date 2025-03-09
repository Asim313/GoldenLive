import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../utils/styles/global-styles';
import AnimatedLottieView from 'lottie-react-native';

export const GradientButtonMain = ({txt, icon, json}) => {
  const linearGradientColors = ['#9405C6', '#C203B0'];
  return (
    <TouchableOpacity style={styles.gradientStyle}>
      <LinearGradient
        colors={linearGradientColors}
        style={[globalStyles.flexRowAndCenter, {borderRadius: 45, padding: 7, paddingHorizontal: 12}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {icon && 
          <Image
            source={icon}
            style={{height: 10, width: 12, right: 2}}
          />
        }

        {json &&
           <AnimatedLottieView
           autoPlay
           style={{
             width: 14,
             height: 14,
             right: 2
           }}
           source={json}
         />
        }
        <Text style={{fontSize: 11, color: 'white'}}>{txt ?? 'Btn'}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const DisabledButton = ({txt, icon}) => {
  return (
    <TouchableOpacity disabled style={[styles.disabledBtnStyle, {borderRadius: 45, padding: 7, paddingHorizontal: 12}]}>
        {icon && 
          <Image
            source={icon}
            style={{height: 10, width: 12, right: 2}}
          />
        }
        <Text style={{fontSize: 11, color: '#949494'}}>{txt ?? 'Btn'}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  gradientStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  disabledBtnStyle: {
    backgroundColor: '#E7E7E7',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center'
  }
});
