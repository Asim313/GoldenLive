import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const Header = ({name, fontColor}) => {
  const navigation = useNavigation();
  return (
    // <LinearGradient
    //   start={{x: 0.2, y: 1}}
    //   end={{x: 1, y: 0.5}}
    //   colors={[
    //     'rgba(202, 73, 1, 1)',
    //     'rgba(255, 110, 28, 1)',
    //     'rgba(183, 66, 0, 1)',
    //   ]}
    //   style={styles.settingbox}>
    <View style={styles.settingbox}>
      <View style={{width: '10%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon name="left" size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View
        style={{width: '75%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.settingtxt, {color: fontColor ?? 'white'}]}>{name}</Text>
      </View>
    </View>
    // </LinearGradient>
  );
};

export default Header;
const styles = StyleSheet.create({
  icon: {
    color: 'black',
    paddingHorizontal: 5,
  },
  settingbox: {
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP('1%'),
    alignItems: 'center',
    width: '100%',
    // backgroundColor: '#FFFFFF',
  },
  settingtxt: {
    fontSize: 19,
    color:  'white',
    fontWeight: 'bold',
  },
});
 
