import React, {Component, useState} from 'react';
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
//---------Vector icons-----------//
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//-----------reuseable components----------//
import PrimaryButton from '../../screens/reuseable_Component/PrimaryButton';
import Input from '../../screens/reuseable_Component/Input';
import {useNavigation} from '@react-navigation/native';

// ]

export default function SignUp_With_Email() {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [isEmail, setIsEmail] = useState(true);

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
          Enter Your Email Address
        </Text>

        {/* Reuseable TextInput */}
        <Input
          title={'Enter Email Address'}
          keyboardType="email-address"
          placeholderTextColor={'grey'}
          // value={this.setState.phone_number}
          onChange={txt => setValue(txt)}
          bgStyle={{marginTop: '4%', borderWidth: 1, width: '80%'}}
        />

        {/* Reuseable Button */}

        <PrimaryButton
          bgStyle={{
            backgroundColor: '#ED2D21',
            width: '80%',
            marginTop: '5%',
          }}
          // backgroundColor={"#fff"}
          onPress={() =>
            navigation.navigate('Password', {
              number: value,
              // code: countryCode,
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
            top: '5%',
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '25%',
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
