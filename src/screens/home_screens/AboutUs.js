import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Header from '../reuseable_Component/Header';

const AboutUs = () => {
  const navigation = useNavigation();
  const version = DeviceInfo.getVersion()
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/back.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <Header name={'About Us'} />
        <View style={styles.Box}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.img}
          />
          {/* <Text style={styles.para}>
            Lorem ipsum, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur
          </Text> */}
          <View style={{alignItems: 'center'}}>
            <Text style={styles.Txt}>Version: {version}</Text>
            <Text style={styles.Txt}>Copyright 2020 - 2025</Text>
            <Text style={styles.Txt}>Golden Live</Text>
            <Text style={styles.Txt}>All Right Reserved</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingBottom: '5%',
          }}>
          <Text style={styles.Made}>Made In: </Text>
          <Text style={styles.UK}>UnitedKingdom (UK)</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A38',
  },
  settingbox: {
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP('2%'),
    alignItems: 'center',
    backgroundColor: '#303749',
  },
  settingtxt: {
    fontSize: 19,
    color: 'white',
    fontWeight: '500',
  },
  icon: {
    color: 'white',
    paddingHorizontal: 5,
  },
  img: {
    height: 180,
    width: 160,
    marginBottom: 20,
  },
  para: {
    color: '#9293B0',
    marginBottom: 20,
    width: '95%',
    textAlign: 'center',
  },
  Box: {
 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Txt: {
    color: '#FFFFFF',
    fontSize: 13,
    marginVertical: 1.5,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  Made: {
    color: '#9293B0',
    fontWeight: '400',
    fontSize: 12,
  },
  UK: {
    color: '#FFFFFF',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
export default AboutUs;
