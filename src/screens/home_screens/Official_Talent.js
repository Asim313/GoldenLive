import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
//----------Vector Icons----------//
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageTop as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
const Offical_Talent = () => {
  const navigation = useNavigation();
  return (
    <View style={{...styles.container}}>
      {/* header */}
      <View
        style={{
          ...styles.header,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <AntDesign
            name="left"
            size={20}
            style={{alignSelf: 'center', color: '#fff'}}
          />
        </TouchableOpacity>
        <Text style={{...styles.headertxt}}>Official Talent</Text>
      </View>

      <ScrollView>
        <Text style={{...styles.qut}} numberOfLines={2}>
          What do you to become an {'\n'}official talent
        </Text>
        <Text style={{...styles.txt1}}>Official Talent Requirment</Text>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              ...styles.dot,
            }}></View>
          <Text numberOfLines={2} style={{...styles.txt2}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing {'\n'}
            elit, sed do eiusmod tempor incididunt
          </Text>
        </View>

        <Text
          style={{
            ...styles.qut,
          }}>
          OR
        </Text>

        <View style={{flexDirection: 'row', top: 15}}>
          <View
            style={{
              ...styles.dot,
            }}></View>
          <Text numberOfLines={3} style={{...styles.txt2}}>
            Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
        </View>
        <View style={{marginTop: '6%', bottom: 6}}>
          <Text style={{...styles.qut}}>
            What Should you become an official talent
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: '3%'}}>
          <View
            style={{
              ...styles.dot,
            }}></View>
          <Text numberOfLines={2} style={{...styles.txt2}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing {'\n'}
            elit, sed do eiusmod tempor incididunt
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: '3%'}}>
          <View
            style={{
              ...styles.dot,
            }}></View>
          <Text numberOfLines={3} style={{...styles.txt2}}>
            Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: '3%'}}>
          <View
            style={{
              ...styles.dot,
            }}></View>
          <Text numberOfLines={3} style={{...styles.txt2}}>
            Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: '3%'}}>
          <View
            style={{
              ...styles.dot,
            }}></View>
          <Text numberOfLines={2} style={{...styles.txt2}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing {'\n'}
            elit, sed do eiusmod tempor incididunt
          </Text>
        </View>

        <Text
          style={{
            ...styles.qut,
          }}>
          NOTE
        </Text>

        <Text style={{...styles.redtxt}}>
          Ut labore et dolore magna aliqua. Ut enim ad minim {'\n'}
          veniam, quis nostrud exercitation ullamco laboris nisi{'\n'}
          ut aliquip ex ea commodo consequat.
        </Text>
        <View style={{...styles.line}}></View>
        <Text style={{...styles.txt3}}>
          Current Gem Balance: 0 germs{'\n'}
          Gems Requrired to Apply: 200000 gems
        </Text>
        <TouchableOpacity
          style={{...styles.btn}}
          onPress={() => navigation.navigate('Earning')}>
          {/* <View > */}
          <Text style={{...styles.btntxt}}>CANNOT APPLY</Text>
          {/* </View> */}
        </TouchableOpacity>

        <Text
          style={{
            ...styles.txt4,
          }}>
          I have an agency ID
        </Text>
      </ScrollView>
    </View>
  );
};

export default Offical_Talent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A38',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#303749',
    // height: 46,
    paddingVertical: '2%',
  },
  headertxt: {
    color: '#fff',
    fontSize: 20,
    // fontWeight: 'normal',
    marginLeft: 10,
    alignSelf: 'center',
    // marginTop: 8,
  },
  qut: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    top: 24,
    left: 16,
  },
  txt1: {
    fontWeight: '600',
    fontSize: 16,
    top: 30,
    left: 16,
    color: '#fff',
    marginBottom: '7%',
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: '#E92F24',
    left: 16,
    borderRadius: 10,
    top: 18,
  },
  txt2: {
    color: '#9293B0',
    fontWeight: '500',
    fontSize: 13,
    left: 28,
    right: 39,
    top: 12,
  },
  redtxt: {
    color: '#E92F24',
    fontSize: 13,
    fontWeight: '500',
    left: 28,
    top: 36,
  },
  line: {
    backgroundColor: '#303749',
    height: 1,
    width: '100%',
    top: 60,
  },
  txt3: {
    color: '#9293B0',
    textAlign: 'center',
    top: 70,
  },
  btn: {
    height: 52,
    width: '90%',
    backgroundColor: '#303749',
    alignSelf: 'center',
    borderRadius: 50,
    top: 90,
  },
  btntxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
  },
  txt4: {
    color: '#fff',
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '500',
    textAlign: 'center',
    top: 100,
  },
});
