import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const SecondaryHeader = ({name}) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      start={{x: 0.2, y: 1}}
      end={{x: 1, y: 0.5}}
      colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
      style={{...styles.settingbox}}>
      <View style={{...styles.rowalignment}}>
        <View style={{}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon name="left" size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '85%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.settingtxt}>{name}</Text>
        </View>

        {/* <Image
          source={require('../images/header/vector.png')}
          style={{height: 30, width: 30}}
        /> */}
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  icon: {
    color: '#000',
    top: 4,
    // paddingHorizontal: 5,
  },
  icon2: {
    color: 'white',
    top: 5,
    // paddingHorizontal:4,
  },
  rowalignment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    bottom: 3,
    // marginRight:15
  },
  settingbox: {
    paddingVertical: heightPercentageToDP('1%'),
    alignItems: 'center',
    width: '100%',
    height: heightPercentageToDP('5%'),
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    // backgroundColor: '#303749',
  },
  settingtxt: {
    fontSize: 19,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    fontWeight: '500',
  },
});

export default SecondaryHeader;
