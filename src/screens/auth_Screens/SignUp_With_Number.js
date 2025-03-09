import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ScreenOTP = () => {
  const [mobileNo, setMobileNo] = useState();
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#2b303e'}}>
      <ImageBackground
        source={require('../../assets/images/profile/backimage.png')}
        resizeMode="cover"
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#242A38',
        }}>
        <View>
          <View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {/* <Image style={{ height: 92, width: 102 }} source={require('../assests/pic.png')} /> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 35,
                  color: 'white',
                  fontWeight: '600',
                }}>
               Golden
              </Text>
              <Text
                style={{
                  fontSize: 35,
                  color: '#52FF00',
                  fontWeight: '800',
                }}>
                Live
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '400',
                  color: 'white',
                  marginTop: '3%',
                }}>
                Enter Your Phone Number
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: '3%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder={'Enter OTP Code +92'}
            placeholderTextColor="grey"
            onChangeText={value => setMobileNo(value)}
            style={{
              marginTop: '6%',
              borderWidth: 1,
              borderColor: '#7B8FA1',
              backgroundColor: '#FFFFFF',
              borderRadius: 4,
              fontSize: 15,
              color: 'black',
              width: '90%',
            }}></TextInput>
        </View>
        <View style={{alignItems: 'center', margin: '2%'}}>
          <TouchableOpacity
            onPress={() => {
              if (mobileNo) {
                navigation.navigate('EnterOTP', {mobileNo: mobileNo});
              } else {
                alert('Please enter a valid mobile number');
              }
            }}
            style={{
              marginTop: 20,
              backgroundColor: '#FF6E1C',
              padding: 10,
              borderRadius: 4,
              width: '86%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 20,
                padding: 0,
                color: 'white',
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginVertical: '5%',
          }}>
          <Text style={{color: 'white', fontSize: 21}}>
            -------------- OR --------------
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            // onPress={() => CheckData()}
            activeOpacity={0.8}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 45,
                width: 45,
                borderRadius: 70,
                marginRight: 12,
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
      </ImageBackground>
    </View>
  );
};

export default ScreenOTP;

const styles = StyleSheet.create({});
