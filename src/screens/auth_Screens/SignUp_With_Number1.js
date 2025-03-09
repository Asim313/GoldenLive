// import React from 'react';
// import { Text, View, StatusBar, ImageBackground,StyleSheet,Image } from 'react-native';

// const SignUp_With_Number = () => {

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#242A38" />

//       <ImageBackground
//         source={require('../../assets/images/persian_cat_2_.png')}
//         resizeMode="cover"
//         style={styles.image}>

//       </ImageBackground>
//     </View>

//   );

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#242A38',
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     marginTop: '60%',
//   },
// })

// export default SignUp_With_Number;

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
//---------Vector icons-----------//
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//---------Phone Input Library-----------//
import PhoneInput from 'react-native-phone-number-input';
//---------Primary Button-----------//
import PrimaryButton from '../reuseable_Component/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import {black, Colors, headings, primaryColor, white} from '../../utils/Styles';
import CountryPicker from 'react-native-country-codes-picker';
import {InputField} from '../../components/InputField';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const SignUp_With_Number1 = () => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+92');
  const [countryFlag, setCountryFlag] = useState('🇸🇦');
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Image Background*/}
      <ImageBackground
        source={require('../../assets/images/persian_cat_2_.png')}
        resizeMode="cover"
        style={styles.image}>
        <View>
          {/* Logo Image*/}
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              alignSelf: 'center',
              resizeMode: 'center',
              // marginTop: '-40%',
            }}
          />

          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'normal',
              color: '#fff',
              fontSize: 17,
              bottom: 25,
            }}>
            Enter Your Password
          </Text>
          <View
            style={{
              // width: '80%',
              // paddingHorizontal: '10%',
              // alignSelf: 'center',
              height: 45,
              // backgroundColor: 'red',
            }}>
            {showMessage && (
              <View>
                <Text>Value : {value}</Text>
                <Text>Formatted Value : {formattedValue}</Text>
                <Text>Valid : {valid ? 'true' : 'false'}</Text>
              </View>
            )}
            {/* <PhoneInput
            ref={phoneInput}
            defaultValue={86787687}
            defaultCode="DM"
            // layout="first"
            // style={{
            //   color: black,
            // }}
            onChangeText={text => {
              setValue(text);
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus

          /> */}
            <InputField
              // keyboardType="numb"
              containerStyle={{
                backgroundColor: primaryColor,
                height: heightPercentageToDP(8),
                borderWidth: 0,

                // width: heightPercentageToDP(65),
              }}
              keyboardType="phone-pad"
              textInputStyle={{backgroundColor: primaryColor}}
              lefticon={
                <Text
                  style={{
                    ...headings.h6M,
                    marginRight: '2%',
                    color: Colors.gray,
                  }}
                  onPress={() => {
                    setShow(true);
                  }}>
                  {countryFlag} {countryCode}
                </Text>
              }
              lable="Phone Number"
              icon={<Fontisto name="phone" size={20} color={Colors.gray} />}
              value={value}
              onChange={txt => setValue(txt)}
            />
            <CountryPicker
              show={show}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={item => {
                setCountryCode(item.dial_code);
                setCountryFlag(item.flag);
                setShow(false);
              }}
            />
            {/* <TouchableOpacity
            //style={styles.button}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
            }}
          >

          </TouchableOpacity> */}
          </View>
          {/* Reuseable Button*/}
          <PrimaryButton
            bgStyle={{
              backgroundColor: '#ED2D21',
              width: '85%',
              marginTop: '10%',
            }}
            // backgroundColor={"#fff"}
            onPress={() =>
              navigation.navigate('Password', {
                number: value,
                code: countryCode,
                isEmail: isEmail,
              })
            }
            title={'SignUp'}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '10%',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 0.5,
                width: '24%',
              }}></View>
            <Text
              style={{
                fontWeight: 'normal',
                color: '#fff',
                marginLeft: 10,
                marginRight: 10,
                bottom: 13,
                fontSize: 18,
              }}>
              OR
            </Text>
            <View
              style={{
                backgroundColor: '#fff',
                height: 0.5,
                width: '24%',
              }}></View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '36%',
              // top: '5%',
            }}>
            <TouchableOpacity activeOpacity={0.8}>
              <View
                style={{
                  backgroundColor: '#fff',
                  height: 45,
                  width: 45,
                  borderRadius: 70,
                  backgroundColor: '#375B95',
                }}>
                <FontAwesome
                  name="facebook-f"
                  size={20}
                  color="#fff"
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 12,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <View
                style={{
                  backgroundColor: '#fff',
                  height: 45,
                  width: 45,
                  borderRadius: 70,
                  backgroundColor: '#ED2D21',
                }}>
                <FontAwesome
                  name="google"
                  size={20}
                  color="#fff"
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 12,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '5%',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
            }}>
            Already Have an Account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text
              style={{
                color: 'red',
                fontSize: 15,
                textDecorationLine: 'underline',
                left: 5,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUp_With_Number1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A38',
    // paddingVertical: '5%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    // paddingVertical: '5%',
    // marginTop: '60%',
  },
});
