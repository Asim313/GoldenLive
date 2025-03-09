import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import React from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP} from 'react-native-responsive-screen';
export default function Pending({navigation}) {
  return (
    <View>
      <LinearGradient colors={['#4568DC', '#B06AB3']} style={styles.settingbox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon name="left" size={20} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.settingtxt}>Host Request</Text>
      </LinearGradient>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{bottom: 50}}>
          <Text style={{color: 'white'}}>Your Request is pending</Text>
          {/* <View>
            <DotIndicator size={8} color={'white'} />
          </View> */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
