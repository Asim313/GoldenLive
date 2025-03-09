import {View, Text, ImageBackground} from 'react-native';
import React from 'react';

export default function ComingSoon() {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <ImageBackground
        source={require('../../assets/images/comingsoon.jpeg')}
        resizeMode={'center'}
        style={{height: '100%', width: '100%'}}></ImageBackground>
    </View>
  );
}
