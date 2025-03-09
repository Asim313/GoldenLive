import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Switch} from 'react-native-paper';
import {headings} from '../../utils/Styles';
import Header from '../reuseable_Component/Header';
const Room_Effects = () => {
  const navigation = useNavigation();
  const [switch1, setswitch1] = useState(false);
  const [switch2, setswitch2] = useState(false);
  const [switch3, setswitch3] = useState(false);
  const [switch4, setswitch4] = useState(false);
  const onToggleSwitch1 = () => {
    setswitch1(!switch1);
  };
  const onToggleSwitch2 = () => {
    setswitch2(!switch2);
  };
  const onToggleSwitch3 = () => {
    setswitch3(!switch3);
  };
  const onToggleSwitch4 = () => {
    setswitch4(!switch4);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <Header name={'Room Effects'} />
        <View>
          <View style={styles.SwitchView}>
            <Text style={styles.SwitchTxt}>
              Gift Effects(Animation + Sound)
            </Text>
            <Switch
              value={switch1}
              onValueChange={onToggleSwitch1}
              color="#FF6E1C"
            />
          </View>
          <View style={styles.SwitchView}>
            <Text style={styles.SwitchTxt}>Gift Sound Effects</Text>
            <Switch
              value={switch2}
              onValueChange={onToggleSwitch2}
              color="#FF6E1C"
            />
          </View>
          <View style={[styles.SwitchView, {marginTop: '2%'}]}>
            <Text style={styles.SwitchTxt}>
              Entrance Effects(Animation + Sound)
            </Text>
            <Switch
              value={switch3}
              onValueChange={onToggleSwitch3}
              color="#FF6E1C"
            />
          </View>
          <View style={styles.SwitchView}>
            <Text style={styles.SwitchTxt}>Entrance Sound Effects</Text>
            <Switch
              value={switch4}
              onValueChange={onToggleSwitch4}
              color="#FF6E1C"
            />
          </View>
        </View>
        <View style={styles.TxtBox}>
          <Text style={styles.TxtStyle}>
            Note: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={[styles.logbox]}>
            <Text style={styles.power}>
              Powered by LimeTechnologies Pvt Ltd
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Room_Effects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303749',
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
  ColorChange: {
    color: '#E92F24',
    opacity: 0.1,
  },
  SwitchView: {
    paddingVertical: heightPercentageToDP('2.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '3%',
    borderBottomWidth: 1,
    borderColor: '#303749',
  },
  SwitchTxt: {
    color: 'black',
  },
  TxtBox: {
    marginHorizontal: '2%',
    marginTop: '3%',
  },
  TxtStyle: {
    color: 'darkgrey',
    fontSize: 12,
  },
  logbox: {
    paddingVertical: heightPercentageToDP('2%'),
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
  },
  logtxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  power: {
    textAlign: 'center',
    ...headings.h8,
    color: 'white',
  },
});
