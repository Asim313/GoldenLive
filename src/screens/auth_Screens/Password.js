import React, { Component, useState, useEffect } from 'react';
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
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
//---------Vector icons-----------//
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//-----------reuseable components----------//
import PrimaryButton from '../reuseable_Component/PrimaryButton';
import Input from '../reuseable_Component/Input';
import Input_Passowrd from '../../components/Input_Password';

import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { loginRequest } from '../../Redux/Actions';
import { ApiCall } from '../../Services/Apis';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// class Password extends Component {
//   state = {
//     username: '',
//     email: '',
//     number: '',
//     password: '',
//     confirmPassword: '',
//   };
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
//             Enter Your Password
//           </Text>

//           {/* Reuseable TextInput */}
//           <Input_Passowrd
//             title={'Password'}
//             keyboardType="numeric"
//             // value={this.setState.phone_number}
//             // onChange={(txt) => this.setState({ phone_number: txt })}
//             bgStyle={{marginTop: '4%', borderWidth: 1, width: '80%'}}
//           />

//           <Input_Passowrd
//             title={'confirm Password'}
//             keyboardType="numeric"
//             // value={this.setState.phone_number}
//             // onChange={(txt) => this.setState({ phone_number: txt })}
//             bgStyle={{marginTop: '4%', borderWidth: 1, width: '80%'}}
//           />

//           {/* Reuseable Button */}

//           <PrimaryButton
//             bgStyle={{
//               backgroundColor: '#ED2D21',
//               width: '80%',
//               marginTop: '5%',
//             }}
//             // backgroundColor={"#fff"}
//             onPress={() => this.props.navigation.navigate('VerifiedCode')}
//             title={'SUBMIT NOW'}
//           />
//         </ImageBackground>
//       </View>
//     );
//   }
// }

export default function Password(props) {
  const [username, setUsername] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [fullname, setFullname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setemail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const params = {
    full_name: username,
    email: email,
    password: password,
  };

  const UserLoginFunction = async () => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    // const testpassword = /^[a-zA-Z0-9_.+-]+$/;
    const UpperCase = /^(?=.*[A-Z]).*$/;
    const LowerCase = /^(?=.*[a-z]).*$/;
    const ContainNumber = /^(?=.*[0-9]).*$/;
    const SpecialCharacter = /^(?=.*[!@#$%^&*]).*$/;
    // const ValidatPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    //console.log("checking", username, email, password, confirmPassword)
    if (
      username == '' ||
      email == '' ||
      password == '' ||
      confirmPassword == ''
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Enter All credentials',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (!reg.test(email)) {
      ToastAndroid.showWithGravityAndOffset(
        'Email not valid',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    }  else if (password.length<7) {
      ToastAndroid.showWithGravityAndOffset(
        'Password not strong',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
      Toast.show({
        type: ALERT_TYPE.WARNING,
        autoClose: 3000,
        textBody:
          'Password should be minimum 7 character. Example : BanoLive009',
        textBodyStyle: { color: 'grey', fontSize: 12 },
      });
    } 
    // else if (
    //   !UpperCase.test(password) || !LowerCase.test(password) || !ContainNumber.test(password) || !SpecialCharacter.test(password) || password.length<8
    // ) {
    //   ToastAndroid.showWithGravityAndOffset(
    //     'Password not strong',
    //     ToastAndroid.SHORT,
    //     ToastAndroid.TOP,
    //     0,
    //     0,
    //   );
    //   Toast.show({
    //     type: ALERT_TYPE.WARNING,
    //     autoClose: 3000,
    //     textBody:
    //       'Minimum 8 characters, Use at least one capital letter, small letter, number and special character. Example : GoldenLive@09',
    //     textBodyStyle: { color: 'grey', fontSize: 12 },
    //   });
    // } 
    else if (password !== confirmPassword) {
      ToastAndroid.showWithGravityAndOffset(
        'Password not matched',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else {
      setLoading(true);
     // console.log("checking22", username, email, password, confirmPassword)
      const res = await ApiCall({
        params: params,
        route: 'sign-up/user',
        verb: 'POST',
      });
      setLoading(false);
      console.log('response24', res)
      if (res.code == 200) {
        ToastAndroid.showWithGravityAndOffset(
          'OTP send to email, Please verify and then login',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          0,
          0,
        );
        // alert('OTP send to email, Please verify and then login');
        setLoading(false);
        navigation.navigate('VerifiedCode', { usermail: email });
      } else {
        setLoading(false);
        ToastAndroid.showWithGravityAndOffset(
          'Email Already Exist, Please Try Other One',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          0,
          0,
        );
      }
      // navigation.navigate('VerifiedCode', {usermail: email});
    }
  };

  //   try {
  //     if (
  //       username != '' &&
  //       password != '' &&
  //       email != '' &&
  //       confirmPassword != ''
  //     ) {
  //       if (!testpassword.test(password)) {
  //         ToastAndroid.showWithGravityAndOffset(
  //           'Password not strong',
  //           ToastAndroid.SHORT,
  //           ToastAndroid.TOP,
  //           0,
  //           0,
  //         );
  //       } else {
  //         if (password == confirmPassword) {
  //           setLoading(true);
  //           const res = await ApiCall({
  //             params: params,
  //             route: 'sign-up',
  //             verb: 'POST',
  //           });
  //           if (res.code == 200) {
  //             alert('OTP send to email, Please verify and then login');
  //             setLoading(false);
  //             navigation.navigate('VerifiedCode', {usermail: email});
  //             // console.log('here is the respone for sign up', res);
  //           } else {
  //             setLoading(false);
  //             if (!reg.test(email)) {
  //               ToastAndroid.showWithGravityAndOffset(
  //                 'Email Not valid',
  //                 ToastAndroid.SHORT,
  //                 ToastAndroid.TOP,
  //                 0,
  //                 0,
  //               );
  //             } else {
  //               ToastAndroid.showWithGravityAndOffset(
  //                 'Email Already Exist, Please Try Other One',
  //                 ToastAndroid.SHORT,
  //                 ToastAndroid.TOP,
  //                 0,
  //                 0,
  //               );
  //             }
  //           }
  //         } else {
  //           ToastAndroid.showWithGravityAndOffset(
  //             'Password not matched',
  //             ToastAndroid.SHORT,
  //             ToastAndroid.TOP,
  //             0,
  //             0,
  //           );
  //         }
  //       }
  //       if (password == confirmPassword) {
  //         setLoading(true);
  //         const res = await ApiCall({
  //           params: params,
  //           route: 'sign-up',
  //           verb: 'POST',
  //         });
  //         if (res.code == 200) {
  //           alert('OTP send to email, Please verify and then login');
  //           setLoading(false);
  //           navigation.navigate('VerifiedCode', {usermail: email});
  //           // console.log('here is the respone for sign up', res);
  //         } else {
  //           setLoading(false);
  //           if (!reg.test(email)) {
  //             ToastAndroid.showWithGravityAndOffset(
  //               'Email Not valid',
  //               ToastAndroid.SHORT,
  //               ToastAndroid.TOP,
  //               0,
  //               0,
  //             );
  //           } else {
  //             ToastAndroid.showWithGravityAndOffset(
  //               'Email Already Exist, Please Try Other One',
  //               ToastAndroid.SHORT,
  //               ToastAndroid.TOP,
  //               0,
  //               0,
  //             );
  //           }

  //           // alert('Email Already Exist, Please Try Other One');
  //           // console.log('here is the respone in Else for sign up', res);
  //         }
  //       } else {
  //         alert('password not match');
  //       }
  //     } else {
  //       ToastAndroid.showWithGravityAndOffset(
  //         'Enter All credentials',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.TOP,
  //         0,
  //         0,
  //       );
  //     }

  //     // if (res.code == 200) {
  //     //   console.log('res == 200 ... ', res.data);
  //     //   params.data.setMyLoginError(true);
  //     //   //   yield put({ type: ACTIONS.LOGIN_ERRORS, loginErrors: res });
  //     //   yield put(setLoginData(res.data));
  //     // } else if (res.code !== 200) {
  //     //   console.log('res.responseCode !== 200....', res);
  //     //   // yield put(setLoginData(res.body));
  //     // }
  //   } catch (e) {
  //     console.log('saga login error -- ', e.toString());
  //   }
  // };

  // const SignUpUser = async () => {
  //   try {
  //     if (username != '' || password != '' || email != '' || confirmPassword != '') {
  //       if (password == confirmPassword) {
  //         const result = await fetch('https://www.api.com/api/sign-up', {
  //           method: 'POST',
  //           headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({
  //             full_name: username,
  //             email: email,
  //             password: password
  //           })
  //         });

  //         const result1 = await result.json()
  //         console.log("result is   =====>>>  ", alert(result1.message))

  //         // console.log("result is   =====>>>  ", result1)
  //         navigation.navigate('VerifiedCode', { usermail: email });

  //       } else { alert('Password not match') }
  //     }
  //     else { alert('Fill all fields') }
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   console.log('Here You Go', props.route.params.number);
  //   setCountryCode(props.route.params.code);
  //   setUsername(props.route.params.number);
  // }, []);

  return (
    <AlertNotificationRoot theme="dark">
      <View style={styles.container}>
        {/* <StatusBar backgroundColor="#242A38" /> */}

        <ImageBackground
          source={require('../../assets/images/bg.png')}
          resizeMode="cover"
          style={styles.image}>
          <KeyboardAvoidingView>
            <ScrollView keyboardShouldPersistTaps="always">
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
                Enter Your Credentials
              </Text>

              {/* Reuseable TextInput */}
              <Input
                title={'User Name'}
                // keyboardType="numeric"
                // value={this.setState.phone_number}
                onChange={txt => setUsername(txt.trim())}
                bgStyle={{ marginTop: '4%', borderWidth: 1, width: '80%' }}
              />

              <Input
                title={'Email/Phone'}
                // keyboardType="numeric"
                // value={this.setState.phone_number}
                onChange={txt => setemail(txt.trim())}
                bgStyle={{ marginTop: '4%', borderWidth: 1, width: '80%' }}
              />

              <Input_Passowrd
                title={'Password'}
                keyboardType="numeric"
                // value={this.setState.phone_number}
                eye={true}
                onChange={txt => setPassword(txt.trim())}
                bgStyle={{ marginTop: '4%', borderWidth: 1, width: '80%' }}
              />

              <Input_Passowrd
                title={'Confirm Password'}
                keyboardType="numeric"
                // value={this.setState.phone_number}
                eye={true}
                onChange={txt => setConfirmPassword(txt.trim())}
                bgStyle={{ marginTop: '4%', borderWidth: 1, width: '80%' }}
              />

              {/* Reuseable Button */}

              {loading ? (
                <ActivityIndicator style={{ marginTop: 25 }} />
              ) : (
                <PrimaryButton
                  bgStyle={{
                    backgroundColor: '#ED2D21',
                    width: '80%',
                    marginTop: '5%',
                  }}
                  // backgroundColor={"#fff"}
                  onPress={() => {
                    {
                      UserLoginFunction();
                    }
                    // SignUpUser();
                  }}
                  title={'Sign Up'}
                />
              )}

              <View style={styles.AlreadymainView}>
                <Text style={styles.alreadytxt}>Already Have an Account?</Text>
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={styles.logintxt}>
                  Login
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </AlertNotificationRoot>
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

// export default Password;
