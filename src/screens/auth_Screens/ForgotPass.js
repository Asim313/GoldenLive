import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import BackIcon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Input_Passowrd from '../../components/Input_Password';
import { ApiCall } from '../../Services/Apis';


const ForgotPass = ({ navigation }) => {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)


  const route = useRoute();
  const email = route.params.mail
  console.log('Email from OTP screen', email)

  const params = {
    email: email,
    password: password,
    confirm_password: confirmPassword
  };
  const ChangePass = async () => {
    const UpperCase = /^(?=.*[A-Z]).*$/;
    const LowerCase = /^(?=.*[a-z]).*$/;
    const ContainNumber = /^(?=.*[0-9]).*$/;
    const SpecialCharacter = /^(?=.*[!@#$%^&*]).*$/;
    try {
      if (password == '' || confirmPassword == '') {
        ToastAndroid.showWithGravityAndOffset(
          'Enter credentials',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          0,
          0,
        );
      }
      else if (!UpperCase.test(password) || !LowerCase.test(password) || !ContainNumber.test(password) || !SpecialCharacter.test(password) || password.length<8) {
        ToastAndroid.showWithGravityAndOffset(
          'Minimum 8 characters, Use at least one capital letter, small letter, number and special character. Example : GoldenLive@09',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          0,
          0,
        );
      }
      else if (password !== confirmPassword) {
        ToastAndroid.showWithGravityAndOffset(
          'Password does not match',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          0,
          0,
        );

      }
      else {
        setLoading(true)
        const res = await ApiCall({
          params: params,
          route: 'user/reset-password',
          verb: 'POST',
        });
        setLoading(false)
        if (res.status == 200) {
          setLoading(false)
          ToastAndroid.showWithGravityAndOffset(
            'Password Changed',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            0,
          );
          navigation.navigate('Login')
        }


      }

      // if (password != '' && confirmPassword != '') {
      //   if (password.length >= 5 && confirmPassword.length >=5) {
      //     setLoading(true)
      //     const res = await ApiCall({
      //       params: params,
      //       route: 'user/reset-password',
      //       verb: 'POST',
      //     });
      //     // console.log('API response ====>>>> ',res.email[0])
      //     if (res.status == 200) {
      //       // alert('Password Changed')
      //       ToastAndroid.showWithGravityAndOffset(
      //         'Password Changed',
      //         ToastAndroid.SHORT,
      //         ToastAndroid.TOP,
      //         0, 
      //         0,
      //       );
      //       setLoading(false)
      //       navigation.navigate('Login')
      //       console.log('here is the respone for Change Pass', res);
      //     }
      //     else {
      //       // alert('Password does not match')
      //       ToastAndroid.showWithGravityAndOffset(
      //         'Password does not match',
      //         ToastAndroid.SHORT,
      //         ToastAndroid.TOP,
      //         0, 
      //         0,
      //       );
      //       setLoading(false)
      //       console.log(res)

      //     }
      //   }
      //   else {  ToastAndroid.showWithGravityAndOffset(
      //     'Minimum 8 characters, Use at least one capital letter, small letter, number and special character. Example : GoldenLive@09',
      //     ToastAndroid.SHORT,
      //     ToastAndroid.TOP,
      //     0, 
      //     0,
      //   );}


      //   // console.log('=========>>>>>.', res)


      // } else { alert('Fill all data first'); }


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
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        style={{ flex: 1 }}>
        <View style={styles.settingbox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon name="left" size={20} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.settingtxt}>Change Password</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View>
            <Image
              source={require('../../assets/images/faq.png')}
              style={{
                height: 150,
                width: 150,
                alignSelf: 'center',
                marginTop: '20%',
              }}
            />
          </View>
          <View>
            <Input_Passowrd
              title={'Password'}
              keyboardType="numeric"
              // value={this.setState.phone_number}
              eye={true}
              onChange={txt => setPassword(txt)}
              bgStyle={{ marginTop: '4%', borderWidth: 1, width: '80%' }}
            />
            <Input_Passowrd
              title={'Confirm Password'}
              keyboardType="numeric"
              // value={this.setState.phone_number}
              eye={true}
              onChange={txt => setConfirmPassword(txt)}
              bgStyle={{ marginTop: '4%', borderWidth: 1, width: '80%' }}
            />
          </View>
          <View>
            {
              loading ? <ActivityIndicator style={{ marginTop: 25 }} />
                :
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ED2D21',
                    width: '80%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    paddingVertical: '4%',
                    borderRadius: 5,
                    marginVertical: '5%',
                    elevation: 3,
                  }}
                  onPress={() => ChangePass()}
                >
                  <Text style={{ color: 'white', fontWeight: '500', fontSize: 15 }}>
                    Change Password
                  </Text>
                </TouchableOpacity>
            }

          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    backgroundColor: '#303749',
    marginVertical: '2%',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#535C73',
    paddingVertical: '3%',
    paddingLeft: 12,
    color: 'white',
  },
});

export default ForgotPass;
