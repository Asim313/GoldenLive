import {View, Text, Image, SafeAreaView} from 'react-native';
import React from 'react';
import {primaryColor, txtgrey, white} from '../../utils/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AnimatedLottieView from 'lottie-react-native';
const AudioPerson = props => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#303749',
        height: 55,
        width: 55,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {props.img  &&
            <AnimatedLottieView autoPlay
                          style={{
                            height: 50,
                            width: 50,
                            position: 'absolute',
                            zIndex: 1,
                            borderRadius: 50,
                          }}
                          source={require('../../assets/json/audio-waves.json')}
         />
         }
      <Image source={{ uri : props.img}} style={{height: 40, width: 40, position: 'absolute', zIndex: 1,borderRadius: 50,}} />
      <Icon name={"seat"} size={25} color={'#8793D9'} />
    </SafeAreaView>
  );
};

export default AudioPerson;
