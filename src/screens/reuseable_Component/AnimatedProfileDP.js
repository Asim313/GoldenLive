import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';


const AnimatedProfileDp = ({img, imgSize, frameSize, frame}) => {
  //  console.log("Frames", frame)  
  return (
    <View style={[styles.container]}>
      <View style={styles.absolute}>
        <Image
          style={[styles.img, {height: imgSize, width: imgSize}]}
          resizeMode='contain'
          source={
            img == null
              ? require('../../assets/images/events.jpg')
              : { uri: img }
          }
        />
      </View>
{frame &&
        <AnimatedLottieView
          style={[styles.lottie,  {height: heightPercentageToDP(frameSize), width: widthPercentageToDP(frameSize)}]}
          source={{uri: frame}}
          autoPlay
          loop
          enableMergePathsAndroidForKitKatAndAbove={true}
          audio={true}
        />
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',

    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 75,
    width: 75,
    borderRadius: 200,
    position: 'absolute',
    
  },
  lottie: {
    height: heightPercentageToDP(10),
    position: 'absolute',

  },
});

export default AnimatedProfileDp;