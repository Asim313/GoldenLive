import React, { Component, useEffect, useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
//---------Vector icons-----------//
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//-----------reuseable components----------//
import PrimaryButton from '../../screens/reuseable_Component/PrimaryButton';
import Input from '../../screens/reuseable_Component/Input';
import { useDispatch } from 'react-redux';
import { otpRequest } from '../../Redux/Actions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ApiCall } from '../../Services/Apis';
import { BASE_URL } from '../../Services/Constants';
// class VerifiedCode extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar backgroundColor="#242A38" />

//         <ImageBackground
//           source={require('../../assets/images/bg.png')}
//           resizeMode="cover"
//           style={styles.image}>
//           <Image
//             source={require('../../assets/images/logo.png')}
//             style={{
//               alignSelf: 'center',
//               resizeMode: 'center',
//               marginTop: '10%',
//             }}></Image>
//           <Text
//             style={{
//               textAlign: 'center',
//               fontWeight: 'normal',
//               color: '#fff',
//               fontSize: 17,
//               bottom: 25,
//             }}>
//             OTP Code
//           </Text>
//           <View style={{marginLeft: '12%'}}>
//             <Text style={{color: '#fff'}}>Enter Code</Text>
//           </View>
//           {/* Reuseable TextInput */}
//           <Input
//             title={'Enter OTP Code'}
//             keyboardType="email-address"
//             // value={this.setState.phone_number}
//             // onChange={(txt) => this.setState({ phone_number: txt })}
//             bgStyle={{marginTop: '4%', borderWidth: 1, width: '80%'}}
//           />

//           {/* Reuseable Button */}

//           <PrimaryButton
//             bgStyle={{
//               backgroundColor: '#5A6889',
//               width: '80%',
//               marginTop: '5%',
//             }}
//             // backgroundColor={"#fff"}
//             onPress={() => this.props.navigation.navigate('BottomNavigation')}
//             title={'NEXT'}
//           />

//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               textAlign: 'center',
//               marginTop: '10%',
//             }}>
//             <Text
//               style={{
//                 color: '#fff',
//                 fontSize: 15,
//               }}>
//               Don't Recived Code?
//             </Text>
//             <Text
//               style={{
//                 color: 'red',
//                 fontSize: 15,
//                 textDecorationLine: 'underline',
//                 left: 5,
//               }}>
//               Resend
//             </Text>
//           </View>

//           <View style={{alignSelf: 'center', marginTop: '3%'}}>
//             <Text
//               onPress={() =>
//                 this.props.navigation.navigate('SignUp_With_Number')
//               }
//               style={{
//                 color: 'red',
//                 fontSize: 12,
//                 textDecorationLine: 'underline',
//                 left: 5,
//               }}>
//               Edit Phone Number
//             </Text>
//           </View>
//         </ImageBackground>
//       </View>
//     );
//   }
// }

export default function VerifiedCode(props) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [myLoginError, setMyLoginError] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  console.log('here is email ', route.params);
  const [loading, setLoading] = useState(false)

  // const UserLoginFunction = async () => {
  //   // console.log('This is UserName', username);
  //   // console.log('This is Password', password);
  //   const params = {
  //     code: otp,
  //     email: route.params.usermail,
  //   };

  //   if (otp != '') {
  //     console.log('otpfun');
  //     dispatch(otpRequest({params, setMyLoginError}));
  //     navigation.navigate('Login')
  //   } else {
  //     alert('Enter otp');
  //     // if (!username) {
  //     //   setEmailError(true);
  //     //   setEmailErrorTxt('PhoneNumber is required');
  //     // }
  //     // if (!password) {
  //     //   setPasswordError(true);
  //     //   setPasswordErrorTxt('Password is Required');
  //     // }
  //   }
  // };

  const VerifyUser = async () => {
    if (otp != '') {
      try {
        const result = await fetch(`${BASE_URL}/validate`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: otp,
            email: route.params.usermail,
          }),
        });

        const result1 = await result.json();
        console.log('result is  VerifyUser =====>>>  ', result1);
        if (result1.error == true) {
          // alert(result1.message);
          ToastAndroid.showWithGravityAndOffset(
            result1.message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0, 
            0,
          );
        } else {
          ToastAndroid.showWithGravityAndOffset(
            result1.message,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            0,
          );
          // alert(result1.message);
          navigation.navigate('Login');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'OPT Field is required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
      // alert('OPT Field is required');
    }
  };

  const ResendOTP = async () => {

    // console.log('This is Password', confirmPassword);
    try {
      const params = {
        email: route.params.usermail
      }

      setLoading(true)
      const res = await ApiCall({
        params: params,
        route: 'user/resend-code',
        verb: 'POST',
      });
      // console.log('API response ====>>>> ',res.email[0])
      if (res.code == 200) {
        ToastAndroid.showWithGravityAndOffset(
          res.message,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          0,
          0,
        );
        // alert(res.message)
        setLoading(false)
        // navigation.navigate('ForgotPassword', { mail: userMail })
        console.log('here is the respone for Resend OTP', res);
      }
      else {

        // alert('Write valid email')
        setLoading(false)
        console.log(res)
        console.log('userEmail isssss===>>>', route.params.usermail)
      }

      // if (res.code == 200) {
      //   console.log('res == 200 ... ', res.data);
      //   params.data.setMyLoginError(true);
      //   //   yield put({ type: ACTIONS.LOGIN_ERRORS, loginErrors: res });
      //   yield put(setLoginData(res.data));
      // } else if (res.code !== 200) {
      //   console.log('res.responseCode !== 200....', res);
      //   // yield put(setLoginData(res.body));
      // }
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  useEffect(() => {
    console.log('Here You Go OTP', props.route.params.username);
    // setCountryCode(props.route.params.code);
    setUsername(props.route.params.username);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#242A38" />

      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode="cover"
        style={styles.image}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            alignSelf: 'center',
            resizeMode: 'center',
            marginTop: '10%',
          }}></Image>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'normal',
            color: '#fff',
            fontSize: 17,
            bottom: 25,
          }}>
          OTP Code
        </Text>
        <View style={{ marginLeft: '12%' }}>
          <Text style={{ color: '#fff' }}>Enter Code</Text>
        </View>
        {/* Reuseable TextInput */}
        <Input
          title={'Enter OTP Code'}
          keyboardType="email-address"
          // value={this.setState.phone_number}
          onChange={txt => setOtp(txt)}
          bgStyle={{ marginTop: '4%', borderWidth: 1, width: '80%' }}
        />

        {/* Reuseable Button */}

        <PrimaryButton
          bgStyle={{
            backgroundColor: '#5A6889',
            width: '80%',
            marginTop: '5%',
          }}
          // backgroundColor={"#fff"}
          // onPress={() => UserLoginFunction()}
          onPress={() => VerifyUser()}
          title={'NEXT'}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '10%',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
            }}>
            Didn't Recived Code?
          </Text>
          {
            loading ? <ActivityIndicator style={{}} />
              :
              <TouchableOpacity onPress={()=> ResendOTP()}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                    left: 5,
                  }}>
                  Resend
                </Text>
              </TouchableOpacity>
          }


        </View>

        <View style={{ alignSelf: 'center', marginTop: '3%' }}>
          <Text
            // onPress={() => this.props.navigation.navigate('SignUp_With_Number')}
            style={{
              color: 'red',
              fontSize: 12,
              textDecorationLine: 'underline',
              left: 5,
            }}>
            Edit Phone Number
          </Text>
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
    // justifyContent:"center"
  },
});

// export default VerifiedCode;
