import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const CatLoadingComponent = ({txt, color}) => {
  return (
    <View
      style={styles.mainContainer}>
      <View
        style={styles.boxContainer}>
        <AnimatedLottieView
          loop={true}
          autoPlay={true}
          style={{
            height: 80,
            width: 80,
          }}
          source={require('../../assets/json/loading_cat.json')}
        />
        <Text style={{color: 'white', fontSize: 11}}>
          {txt ?? 'Loading Data...'}
        </Text>
      </View>
    </View>
  );
};

export default CatLoadingComponent;

const styles = StyleSheet.create({
    mainContainer: {
        height: heightPercentageToDP(100),
        width: widthPercentageToDP(100),
        justifyContent: 'center',
        alignItems: 'center',
      },
      boxContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 12,
        padding: 7,
      }
})
