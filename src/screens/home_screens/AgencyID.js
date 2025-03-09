import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {primaryColor, white, txtgrey} from '../../utils/Styles';
import {useDispatch, useSelector} from 'react-redux';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import { ApiCallToken } from '../../Services/Apis';

const AgencyID = ({navigation, route}) => {

  // console.log('kkkkkkkkkkkkk', route?.params)

  const [input, setinput] = useState(route?.params?.agency_code ?? '');
  const userData = useSelector(state => state.auth.userData);

  const VerifyAgency = async () => {
    try {
      const paramsBody = {
        reference_code: input
      };

        const res = await ApiCallToken({
          params: userData.token,
          paramsBody: paramsBody,
          route: 'user/verify-agency-code',
          verb: 'POST',
        });
        
          if (res?.error == false) {
            alert(res?.message);
            navigation.navigate('Apply_Form', {refferenceCode: input});
          } else {
            alert(res?.message);
          }

    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 5,
            marginLeft: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrow
              name="arrow-back-ios"
              size={20}
              style={{color: 'white', alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Agency
          </Text>
        </View>
        {/* <Image
          source={require('../../assets/images/bg.png')}
          resizeMode="contain"
          style={{top: hp(30)}}
        /> */}
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 15,
          }}></View>
        <View style={{position: 'absolute', width: wp(100)}}>
          <View style={styles.ImgBox}>
            {/* <Image
              source={require('../../assets/images/faq.png')}
              style={styles.Img}
            /> */}
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 17}}>
              I want to join a GoldenLive Agency
            </Text>
          </View>
          <View>
            <Text style={styles.agencyTxt}>Agency ID*</Text>
            <TextInput
              value={input.toString()}
              placeholder="Enter Agency ID*"
              onChangeText={val => setinput(val.trim())}
              style={styles.input}
              placeholderTextColor={'white'}
              secureTextEntry={true}
              keyboardType={'numeric'}
            />
            <TouchableOpacity
              style={styles.btnBox}
              onPress={() => VerifyAgency()}
              // onPress={() =>
              //   navigation.navigate('Apply_Form', {refferenceCode: '210758905'})
              // }
            >
              <Text style={styles.btnTxt}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A38',
  },
  ImgBox: {
    alignItems: 'center',
    marginTop: hp(9),
  },
  Img: {
    height: 150,
    width: 150,
  },
  input: {
    width: wp(90),
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: hp(1.5),
    color: 'white',
    backgroundColor: '#535C73',
    paddingVertical: hp(1.7),
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#303749',
  },
  btnBox: {
    backgroundColor: '#FF6E1C',
    width: wp(85),
    alignSelf: 'center',
    paddingVertical: hp(1.8),
    borderRadius: 5,
    marginVertical: hp(1.5),
  },
  btnTxt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
  agencyTxt: {
    color: 'black',
    width: wp(85),
    alignSelf: 'center',
    marginBottom: hp(0.5),
    marginTop: hp(7),
    fontSize: 16,
    paddingLeft: 5,
  },
});

export default AgencyID;
