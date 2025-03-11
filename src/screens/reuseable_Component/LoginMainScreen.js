import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {loginRequest, socialLoginRequest} from '../../Redux/Actions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { getAuth, signInWithCredential, GoogleAuthProvider } from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Linking} from 'react-native';
import Video from 'react-native-video';
import { GOOGLE_SIGNIN_WEBCLIENTID } from '../../Services/Constants';

GoogleSignin.configure({
  webClientId: GOOGLE_SIGNIN_WEBCLIENTID
});

const LoginMainScreen = () => {
  const navigation = useNavigation();
  const [arrowUp, setArrowUp] = React.useState(false);
  const [showAdvanceProfile, setShowAdvanceProfile] = useState(false);
  const dispatch = useDispatch();
  const [myLoginError, setMyLoginError] = useState(true);

  const url1 = 'http://www.golden-live.com/UserTermConditions';
  const handleTermServices = () => Linking.openURL(url1);
  const url = 'http://www.golden-live.com/PrivacyPolicy';
  const handlePrivacyPolicy = () => Linking.openURL(url);

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log('is signed in', isSignedIn);
  };

  async function onGoogleButtonPress() {
    console.log('in google sign in');
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const res = await GoogleSignin.signIn();
    console.log('Google sign-in token:', res?.idToken);
    let idToken =  res?.idToken
    // return

    if (idToken) {
      sendSocialLoginRequest();
    }

    const auth = getAuth();
    const googleCredential = GoogleAuthProvider.credential(idToken);
    return signInWithCredential(auth, googleCredential);
  }

  const sendSocialLoginRequest = async () => {
    setMyLoginError(false);
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('current user', currentUser?.user);
    const params = {
      full_name: currentUser?.user?.givenName,
      email: currentUser?.user?.email,
      social_login_type: 'google',
      social_login_id: currentUser?.user?.id,
    };
    dispatch(socialLoginRequest({ params, setMyLoginError }));
    setMyLoginError(false);
  };
  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('hello', currentUser);
  };

  signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#242A38',
        }}>
        <Video
          source={require('../../assets/videos/ProfileVideo.mp4')}
          repeat={true}
          style={styles.video}
          resizeMode="cover"
        />

        {!myLoginError && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              height: hp(100),
              width: wp(100),
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <ActivityIndicator size="large" />
            </View>
          </View>
        )}

        <View
          style={{
            height: '50%',
            width: '80%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{height: 210, width: 175}}
          />
          <View
            style={{
              height: '20%',
              width: '90%',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
              style={{
                height: '60%',
                width: '60%',
                backgroundColor: '#613404',
                borderRadius: 150 / 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{height: 25, width: 25, right: 20}}
                source={require('../../assets/images/google.png')}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  color: '#FFFFFF',
                }}>
               Google
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '20%',
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '30%',
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>____________</Text>
            </View>
            <Text style={{fontSize: 13, color: 'white', top: 4}}>
              More Login Methods
            </Text>
            <View
              style={{
                height: '30%',
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>____________</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: '5%',
            width: '40%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity activeOpacity={0.8}>
            <View
              style={{
                backgroundColor: '',
                height: 50,
                width: 50,
                borderRadius: 150 / 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="facebook-f" size={25} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SignUp_With_Number')}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 50,
                width: 50,
                borderRadius: 70,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="mobile" size={25} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: '15%',
            width: '80%',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 12, color: 'white'}}>
            By Using GoldenLive You Agree To This
          </Text>
        </View>
        <View
          style={{
            height: '5%',
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{marginRight: 7, marginTop: 5}}>
            <TouchableOpacity
              onPress={() => {
                setArrowUp(!arrowUp);
                setShowAdvanceProfile(showAdvanceProfile => {
                  return !showAdvanceProfile;
                });
              }}>
              <View>
                {arrowUp ? (
                  <Icon1
                    name="checkbox-marked-circle"
                    size={23}
                    color="white"
                  />
                ) : (
                  <Icon2
                    name="checkbox-blank-circle-outline"
                    size={23}
                    color="white"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleTermServices}
            style={{borderBottomWidth: 1, borderBottomColor: 'white'}}>
            <Text style={{fontSize: 13, color: 'white'}}>
              GoldenLive Term of Services
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 13, color: 'white', margin: 7}}>And</Text>
          <TouchableOpacity
            onPress={handlePrivacyPolicy}
            style={{borderBottomWidth: 1, borderBottomColor: 'white'}}>
            <Text style={{fontSize: 13, color: 'white'}}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginMainScreen;

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
