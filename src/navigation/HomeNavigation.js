import * as React from 'react';
//-----------Navigation-----------//
import Auth from './AuthNavigation';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigations from './Navigator';
import DeviceInfo from 'react-native-device-info';
import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Linking,
  Text,
  View,
} from 'react-native';
import {checkAppVersion} from '../Services/ApisCall';
import { fetchImageFromCache } from '../Services/RnFetchBlob/FetchBlobImage';

const HomeNavigation = () => {
  const token = useSelector(state => state.auth.userToken);
  const userData = useSelector(state => state.auth.userData);
  const version = DeviceInfo.getVersion();
  const [isUpdateAvailable, setIsUpdateAvailable] = React.useState(false);
  const [isCheckingVersion, setIsCheckingVersion] = React.useState(true);
  const [homeBanner, setHomeBanner] = useState();
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const openURI = async () => {
    const url =
      'https://play.google.com/store/apps/details?id=com.bano.live&pcampaignid=web_share';
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const showAlert = () => {
    Alert.alert('Update Available', 'Newer version is available.', [
      {
        text: 'Update',
        onPress: () => openURI(),
        style: 'cancel',
      },
      // {
      //   text: 'Cancel',
      //   onPress: () => Alert.alert('cancel'),
      //   style: 'cancel',
      // },
    ]);
  };
  React.useEffect(() => {
    console.log('here is token', version);
     callApi();
  }, []);
  const callApi = async () => {
    setIsCheckingVersion(true);
    try {
      const res = await checkAppVersion(userData, version);
      console.log('ressss', res)
      if (res?.data?.homeBanner) {
        setHomeBanner(res?.data?.homeBanner);
      } 
      if(!res?.upToDate) {
        setIsUpdateAvailable(true)
        // showAlert();
      }
    } catch (error) {
      console.error('Error calling API:', error);
      showAlert(); // Handle the error as needed
    } finally {
      await delay(6000)
      setIsCheckingVersion(false);
    }
  };
  return (
    <NavigationContainer>
      {
      // !isUpdateAvailable && !isCheckingVersion ? (
      
      token ? (
          <HomeNavigations />
        ) : (
          <Auth />
        )
      // ) : (
      // <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      //   <ImageBackground
      //     resizeMode="cover"
      //     source={homeBanner? {uri: homeBanner} : require('../assets/images/BanoliveLoading.png')}
      //     style={{height: '100%', width: '100%'}}></ImageBackground>
      // </View>
      //  )
       } 
    </NavigationContainer>
  );
};
export default HomeNavigation;
