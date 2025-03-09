

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {headings} from '../../utils/Styles';
import BackIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../../Services/Apis';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import Header from '../reuseable_Component/Header';

export default function WithdrawBind({navigation, route}) {
  const [name, setname] = useState('');
  const [number, setnumber] = useState('');
  const [email, setemail] = useState('');
  const [amount, setamount] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  const {account_name, country, amountUser, fromBeansScreen} = route.params;
  const userData = useSelector(state => state.auth.userData);
  console.log("ou", route.params.amountUser)

  const SendGiftsToHost = async () => {
    try {
      const paramsBody = {
        name: name,
        number: number,
        email: email,
        amount: JSON.parse(amountUser),
        country: country,
        account_name: account_name,
        account_number: accountNumber,
      };
      let res = null;
      console.log("jjjjjjjj", paramsBody)
      if(fromBeansScreen) {
        res = await ApiCallToken({
          params: userData.token,
          paramsBody: paramsBody,
          route: 'user/beans/withdraw',
          verb: 'POST',
        });
      } else {
        res = await ApiCallToken({
          params: userData.token,
          paramsBody: paramsBody,
          route: route?.params?.fromLucky ? 'user/withdraw/lucky/reward' :  'user/withdraw',
          verb: 'POST',
        });
      }
      ToastAndroid.showWithGravityAndOffset(
        res?.message ?? '',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        0,
      );
      console.log('send WithDrawBid response is -- ', fromBeansScreen, res);
      navigation.goBack();
    } catch (e) {
      console.log('send WithDrawBid error is -- ', e.toString());
    }
  };

  const checkValidation = () => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    let num = /^923\d{9}$|^03\d{9}$/;

    if (name == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Name is required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (email == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Enter your Email Address',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (!reg.test(email)) {
      ToastAndroid.showWithGravityAndOffset(
        'Enter a valid Email Address',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (accountNumber == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Enter your Bank Account Number',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } 
   
    else if (number == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Enter your Phone Number',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else if (!num.test(number)) {
      ToastAndroid.showWithGravityAndOffset(
        'Enter a valid Phone Number',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    } else {
      SendGiftsToHost();
    }
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.maincontainer}>
        <ImageBackground
          source={require('../../assets/images/image36.png')}
          resizeMode={'stretch'}
          style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="always">
          <Header name={'Bind'}  />
            <View style={styles.imgcontainer}>
              <Image
                source={require('../../assets/images/BanoLivePicture.png')}
                style={styles.img}
              />
              <View style={styles.txtscontainer}>
                <Text style={styles.Informationtxt}>
                  Enter Information, Or Your Withdrawal
                </Text>
                <Text style={styles.Affectedtxt}>Will Be Affected.</Text>
              </View>
            </View>

            <View style={styles.inputmainbox}>
              <Text style={styles.nicknametxt}>Name</Text>
              <View style={styles.Usernamebox}>
                <TextInput
                  style={styles.Usernametxt}
                  placeholder="Enter Name"
                  placeholderTextColor={'grey'}
                  onChangeText={e => setname(e)}
                />
              </View>
            </View>
            <View style={styles.inputmainbox}>
              <Text style={styles.nicknametxt}>Email</Text>
              <View style={styles.Usernamebox}>
                <TextInput
                  style={styles.Usernametxt}
                  placeholder="Enter Email"
                  autoCapitalize={false}
                  placeholderTextColor={'grey'}
                  onChangeText={e => setemail(e)}
                />
              </View>
              {/* <Text style={{color: 'white'}}>{error}</Text>
              <Text style={{color: 'white'}}>{errorEmail}</Text> */}
            </View>
            <View style={styles.inputmainbox}>
              <Text style={styles.nicknametxt}>Bank Name</Text>
              <View style={styles.Usernamebox}>
                <TextInput
                  style={styles.Usernametxt}
                  value={account_name}
                  // placeholder="Enter Bank Name"
                  placeholderTextColor={'grey'}
                  // onChangeText={(e)=>setname(e)}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.inputmainbox}>
              <Text style={styles.nicknametxt}>Bank Account</Text>
              <View style={styles.Usernamebox}>
                <TextInput
                  style={styles.Usernametxt}
                  placeholder="Enter Bank Account"
                  placeholderTextColor={'grey'}
                  onChangeText={e => setaccountNumber(e)}
                  keyboardType={'number-pad'}
                />
              </View>
            </View>
            <View style={styles.inputmainbox}>
              <Text style={styles.nicknametxt}>Amount</Text>
              <View style={styles.Usernamebox}>
                <TextInput
                  style={styles.Usernametxt}
                  value={amountUser.toString() ?? 0}
                  editable={false}
                  placeholder="Enter your amount"
                  placeholderTextColor={'grey'}
                  keyboardType={'number-pad'}
                  // onChangeText={e => setamount(e)}
                  maxLength={4}
                />
              </View>
            </View>
            <View style={styles.inputmainbox}>
              <Text style={styles.nicknametxt}>Phone Number</Text>
              <View style={styles.Usernamebox}>
                <TextInput
                  style={styles.Usernametxt}
                  placeholder="Enter Phone Number"
                  placeholderTextColor={'grey'}
                  keyboardType={'numeric'}
                  onChangeText={e => setnumber(e)}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonbox}
              onPress={() => {
                // SendGiftsToHost();
                // isEmailValid();
                checkValidation();
              }}>
              <Text style={styles.btntxt}>SUBMIT</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  maincontainer: {
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
  img: {
    height: 90,
    width: 90,
  },
  Informationtxt: {
    color: 'white',
    fontSize: 15,
  },
  imgcontainer: {
    alignItems: 'center',
    marginTop: heightPercentageToDP(4),
  },
  Affectedtxt: {
    color: 'white',
    fontSize: 15,
  },
  txtscontainer: {
    marginTop: heightPercentageToDP(1),
    alignItems: 'center',
  },
  Usernamebox: {
    flexDirection: 'row',
    top: 4,

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Usernametxt: {
    fontSize: 12,
    color: 'black',
    marginLeft: 4,

    width: '95%',
    borderRadius: 3,
    borderWidth: 0.4,
    borderColor: '#B06AB3',
    marginTop: '2%',
    paddingLeft: 7,
  },
  nicknametxt: {
    marginLeft: 5,
    color: 'black',
    fontSize: 11,
    top: 3,
  },
  inputmainbox: {
    alignSelf: 'center',
    marginTop: heightPercentageToDP(2),
  },
  buttonbox: {
    backgroundColor: '#c471ed',
    width: '85%',
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
    alignSelf: 'center',
    marginTop: heightPercentageToDP(4),
  },
  btntxt: {
    color: 'white',
  },
});
