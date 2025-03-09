import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {headings, primaryColor, white} from '../../utils/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CoverPicProfile(props) {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/images/img1.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={{...styles.iconContainer}}>
          <View style={styles.roundContainer}>
            <Ionicons size={25} name={props.iconleft} color={white} />
          </View>
          <View style={styles.roundContainer}>
            <Ionicons size={25} name={props.iconright} color={white} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: 'red',
    height: heightPercentageToDP(25),
  },
  image: {
    height: heightPercentageToDP(25),
  },
  iconContainer: {
    // flex: 1,
    height: '40%',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundContainer: {
    height: widthPercentageToDP(8),
    width: widthPercentageToDP(8),
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
