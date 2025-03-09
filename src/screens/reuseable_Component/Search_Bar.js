import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  ChannelProfileType,
  IRtcEngine,
  createAgoraRtcEngine,
} from 'react-native-agora';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Search from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

import { useRef } from 'react';
import GameSheet from '../../components/GamesSheet';
import RbSheetComponent from './RbSheetComponent';
import AllIcons, { IconList } from '../../components/AllIcons';


const Search_Bar = ({onPressLocation}) => {
  const navigation = useNavigation();

  const userData = useSelector(state => state.auth.userData);
  const gameSheetRef = useRef(null);

  //my code

  const agoraEngineRef = useRef(IRtcEngine); // Agora engine instance

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  useEffect(() => {
    setupVideoSDKEngine();
  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.enableAudioVolumeIndication(500, 3, true)
      agoraEngine.initialize({
        appId: userData?.app_id,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
    } catch (e) {
      console.log('error searchbar screen setupVideoSDKEngine func', e);
    }
  };

  return (
    <View>
      {/* Searchbar */}
      <View
        style={{
          // backgroundColor:
        }}>
       
          <TouchableOpacity onPress={() => {
           onPressLocation()
          //  navigation.navigate('BaishunGames')
            //  navigation.navigate('SocketTesting')
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}>

             <AllIcons name={IconList.Ionicons} iconName={'location-outline'} size={25} color={'#F89501'}  />
         
            </View>
          </TouchableOpacity>
         
      </View>

      <RbSheetComponent
        view={
          <GameSheet />
        }
        refUse={gameSheetRef}
        close={true}
        height={heightPercentageToDP(21)}
      />

    </View>
  );
};

export default Search_Bar;

const styles = StyleSheet.create({
  modalbox1: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: wp(65),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    marginVertical: hp(1),
  },
  modaltxt: {
    fontSize: 18,

    color: 'white',
  },
  createoptiontxt: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  modalmaincontainer: {
    backgroundColor: '#303749',
    height: hp(40),
    borderRadius: 10,
    alignItems: 'center',
  },
  modalbox2: {
    flexDirection: 'row',
    backgroundColor: '#303749',
    width: wp(65),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    marginVertical: hp(1),
  },
  modalbox3: {
    flexDirection: 'row',
    backgroundColor: '#1AB846',
    width: wp(65),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 5,
    marginVertical: hp(1),
  },
  modalbox4: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    width: wp(65),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    marginVertical: hp(1),
  },
  modalchildbox1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '67%',
    justifyContent: 'space-between',
  },
  modalchildbox2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
    justifyContent: 'space-between',
  },
  modalchildbox3: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-between',

    marginRight: wp(9),
  },
  modalchildbox4: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '47%',
    justifyContent: 'space-between',
    marginRight: wp(8),
  },
  iconStyle: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
