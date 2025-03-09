import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//---------Vector icons-----------//
import Entypo from 'react-native-vector-icons/Entypo';
//-----------reuseable components----------//
import SecondaryButton from '../reuseable_Component/SecondaryButton';

export default function Login_With_SocailMedia() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#242A38" /> */}

      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.img}
          />
          <Text style={styles.signupwithtxt}>Sign Up To Social Media</Text>

          {/* Social logins */}
          <SecondaryButton
            title={'Google'}
            bgStyle={styles.googlebtn}
            icon={<Entypo name="mail" size={18} color="#fff" />}
          />

          <SecondaryButton
            title={'Facebook'}
            bgStyle={styles.fbbtn}
            icon={<Entypo name="facebook" size={18} color="#fff" />}
          />
          {/* Social Logins */}

          <View style={styles.ormainview}>
            <View style={styles.orline}></View>
            <Text style={styles.ortxt}>Or</Text>
            <View style={styles.orline}></View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',

              width: wp(35),
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp_With_Number')}
              activeOpacity={0.8}>
              <View style={styles.mbliconview}>
                <Entypo
                  name="mobile"
                  size={20}
                  color="#fff"
                  style={styles.mblicon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigation.navigate('SignUp_With_Email')}
              onPress={() => navigation.navigate('Password')}
              activeOpacity={0.8}>
              <View style={styles.mailiconview}>
                <Entypo
                  name="mail"
                  size={20}
                  color="#fff"
                  style={styles.mblicon}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.AlreadymainView}>
            <Text style={styles.alreadytxt}>Already Have an Account?</Text>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.logintxt}>
              Login
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A38',
  },
  image: {
    flex: 1,
  },
  img: {
    alignSelf: 'center',
    resizeMode: 'center',
    // marginTop: '40%',
  },
  signupwithtxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 17,
    bottom: '5%',
  },
  fbbtn: {
    backgroundColor: '#3E95E5',
    width: '70%',
    marginTop: hp(2),
  },
  googlebtn: {
    backgroundColor: '#F74239',
    width: '70%',
  },
  ormainview: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(4),
  },
  orline: {
    backgroundColor: '#fff',
    height: 1,
    width: '20%',
  },
  ortxt: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
    marginRight: 20,
    bottom: 10,
    fontSize: 18,
  },

  mailiconview: {
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#3E95E5',
    borderRadius: 30,
  },
  mbliconview: {
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#F74239',
  },
  AlreadymainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp(5),
  },
  alreadytxt: {
    color: '#fff',
    fontSize: 15,
  },
  logintxt: {
    color: 'red',
    fontSize: 15,
    textDecorationLine: 'underline',
    left: 5,
  },
});
