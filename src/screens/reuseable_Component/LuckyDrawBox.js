import {View, TouchableOpacity, ImageBackground, Image} from 'react-native';
import React, { useEffect } from 'react';

const LuckyDrawBox = ({data, count, index}) => {

  return (
    <View>
      <TouchableOpacity onPress={()=>console.log('check data come or not ',data)}>
        <ImageBackground
          source={require('../../assets/images/LuckyDraw/circle.png')}
          style={{
            height: 95,
            width: 95,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: count === index ? 'green' : "red",
            borderRadius: 50,
            marginRight: 10,
            marginBottom: 10
          }}
          resizeMode="contain"
          >
          <Image
            source={require('../../assets/images/LuckyDraw/coinbox.png')}
            style={{height: 60, width: 60}}
            resizeMode="contain"
          />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default LuckyDrawBox;
