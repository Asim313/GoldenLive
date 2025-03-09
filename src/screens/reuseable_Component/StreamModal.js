import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import {useRef} from 'react';
import {ApiCallToken} from '../../Services/Apis';
import {ActivityIndicator} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import NoUserSeat2 from '../Agora/multiChannel/multiSeatsLogic/NoUserSeat2';
import TwoSeatLogicForStream from './TwoSeatLogicForStream';
import NoUserSeatForStream from './NoUserSeatForStream';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { channelSettings } from '../../Services/ApisCall';

const StreamModal = () => {
  const [soon, setsoon] = useState('CREATE A STORY');
  const navigation = useNavigation();
  const userUpdatedLevel = useSelector(state => state.homeRed.userUpdatedLevel);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const userData = useSelector(state => state.auth.userData);

  const hostName = userData?.user?.full_name;
  const hostLiveID = JSON.stringify(userData?.user?.id);
  const hostUUID = JSON.stringify(userData?.user?.uuid);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(null)

  const channelTitle = async () => {
    try {
      const res = await channelSettings({token: userData?.token, title: title.toString()})
       setTitle(null)
    } catch (error) {
      console.log('HostERROR IS user/host-updated-data ====>>>', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setTitle(null)
    }, []),
  );

  checkUserTypeForAudioCall = async () => {
  
    if (
      userUpdatedData?.user_type_id == 3 ||
      userUpdatedData?.sender_level >= 2
    ) {
      navigation.navigate('AudioCallHost', {
        userID: hostUUID,
        userName: hostName,
        liveID: hostLiveID,
        channelName: channelName,
        uid: uid,
        isHost: true,
        agoraEngineRe: agoraEngineRef.current,
      });
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'You must be a host or minimum level 2',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        0,
      );
    }
  };

  const onJoinPress = async isHost => {
    // if (
    //   userUpdatedData?.user_type_id == 3 ||
    //   userUpdatedData?.sender_level >= 5
    // ) {
      navigation.navigate('HostPage', {
        userID: hostUUID,
        userName: hostName,
        liveID: hostLiveID,
        channelName: 'channelName',
        channelName: channelName,
        uid: uid,
        isHost: true,
        agoraEngineRe: agoraEngineRef?.current,
      });
    // } else {
    //   ToastAndroid.showWithGravityAndOffset(
    //     'You must be a host or minimum level 5',
    //     ToastAndroid.SHORT,
    //     ToastAndroid.TOP,
    //     0,
    //     0,
    //   );
    // }
  };

  const onJoinPress333 = async isHost => {
    
    // if (
    //   userUpdatedData?.user_type_id == 3 ||
    //   userUpdatedData?.sender_level >= 2
    // ) {
      navigation.navigate('MultiCallHost', {
        userID: hostUUID,
        userName: hostName,
        liveID: hostLiveID,
        channelName: channelName,
        uid: uid,
        isHost: true,
        agoraEngineRe: agoraEngineRef.current,
      });
    // } else {
    //   ToastAndroid.showWithGravityAndOffset(
    //     'You must be a host or minimum level 2',
    //     ToastAndroid.SHORT,
    //     ToastAndroid.TOP,
    //     0,
    //     0,
    //   );
    // }
  };

  const [uid, setUid] = useState(parseInt(userData?.user?.id));
  const [selectedItem, setSelectedItem] = useState(0);
  const [channelName, setChannelName] = useState(
    userData?.user?.id ? userData?.user?.id.toString() : null,
  );

  const startLive = (selectedItem) => {
    if(title) {
      if (selectedItem === 0) {
        onJoinPress();
      } else if (selectedItem === 1) {
        checkUserTypeForAudioCall();
      } else if (selectedItem === 2) {
        onJoinPress333();
      }
      channelTitle()
    } else {
      alert('Please enter channel title')
    }
  };


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
      agoraEngine.initialize({
        appId: userData?.app_id,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
    } catch (e) {
      console.log('error searchbar screen setupVideoSDKEngine func', e);
    }
  };

  const dataOFSeats = [
    {id: 1, seatColors: ['#971748', '#450920']},
    {id: 2, seatColors: ['#606C38', '#293916']},
    {id: 3, seatColors: ['#780C10', '#32030C']},
    {id: 4, seatColors: ['#AF6B31', '#583101']},
    {id: 5, seatColors: ['#025D88', '#01253B']},
    {id: 6, seatColors: ['#203F67', '#1B263B']},
    {id: 7, seatColors: ['#B14104', '#662400']},
    {id: 8, seatColors: ['#5F6160', '#222725']},
  ];
  const renderItem = ({item, index}) => {

    return <NoUserSeatForStream data={item} />;
  };

  return (
    <ImageBackground
      source={require('../../assets/images/profile/streambg.png')}
      style={{flex: 1}}>
      <View
        style={{
          height: '20%',

          marginTop: '10%',
          // marginBottom: '5%',
          width: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: heightPercentageToDP(16),
            width: '90%',
            backgroundColor: 'rgba(255, 255, 255, 0.20)', // rgba(0, 0, 0, 0.42) represents a transparent black color
            borderRadius: 10,
            flexDirection: 'row',
            paddingVertical: '1%',
            paddingLeft: '1%',
          }}>
          <ImageBackground
            style={{
              height: 95,
              width: 95,
              borderRadius: 10,
              justifyContent: 'flex-end',
              // left: 10,
              marginLeft: '1%',
              marginTop: '1%',
              overflow: 'hidden',
            }}
            source={
              userUpdatedData?.image
                ? require('../../assets/images/profile/streamUse.png')
                : {uri: userUpdatedData?.image}
            }>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 11,
                color: '#FFFFFF',
              }}>
              Change Avatar
            </Text>
          </ImageBackground>
          <View
            style={{
              marginLeft: '3%',
              marginTop: '1%',
              width: '68%',
              height: 95,
              justifyContent: 'space-between'
            }}>
            <Text style={{color: '#FFFFFF', fontWeight: '500'}}>
              Live title
            </Text>
            <View style={{ bottom: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginRight: '5%',
                  
                }}>
            
                <TextInput
                  style={{color: '#FFFFFF', fontWeight: '400', fontSize: 11, padding: 0,}}
                  placeholder='Write a live title'
                  onChangeText={(txt) => setTitle(txt)}
                  value={title ? title : ''}
                  maxLength={30}
                />
                <Text
                  style={{color: '#FFFFFF', fontWeight: '400', fontSize: 11}}>
                  {title?.length ?? 0}/30
                </Text>
              </View>
              <View style={styles.container}>
                <View style={styles.line} />

              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{height: heightPercentageToDP(30)}}>

      {selectedItem === 2 &&
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'row',
          }}>
          <TwoSeatLogicForStream
            cohostData={dataOFSeats?.[0]}
          />
          <FlatList
            data={[...dataOFSeats]?.splice(1, 4)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={{padding: 3}}
            />
        </View>
      }
      </View>
      <View style={styles.modalmaincontainer}>
        <View
          style={{
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            top: heightPercentageToDP(10),
          }}>
          <Text style={{color: 'white', fontSize: 14, bottom: 5}}>
            Change Room Skin{' '}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#F4900C',
              top: heightPercentageToDP(11),
              width: wp(90),

              height: hp(5),
              alignItems: 'center',
              justifyContent: 'space-evenly',
              borderRadius: 30,
              marginVertical: hp(2),
            }}
            onPress={() => {
              !isLoading && startLive(selectedItem);
            }}>
            <View style={{}}>
              {isLoading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    left: 5,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  GO Live
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            top: hp(12),
            flexDirection: 'row',
            width: '75%',
            justifyContent: 'space-evenly',

          }}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              setSelectedItem(0);
            }}>
            <LinearGradient
              colors={
                selectedItem === 0 ? ['#FF7A00', '#FAFF00'] : ['grey', 'grey']
              }
              style={[
                styles.modalchildbox1,
                {
                  borderRadius: 50,
                },
              ]}>
              <Ionicons name="videocam" size={20} color={'white'} />
            </LinearGradient>
            <Text
              style={{
                color: 'white',
                top: 5,
                fontSize: 9,
              }}>
              Video Mode
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              setSelectedItem(1);
            }}>
            <LinearGradient
              colors={
                selectedItem === 1 ? ['#FF7A00', '#FAFF00'] : ['grey', 'grey']
              }
              style={[
                styles.modalchildbox1,
                {
                  borderRadius: 50,
                },
              ]}>
              <Ionicons name="headset" size={25} color={'white'} />
            </LinearGradient>
            <Text
              style={{
                color: 'white',
                top: 5,
                textAlign: 'center',
                fontSize: 9,
              }}>
              AUDIO Mode
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              setSelectedItem(2);
            }}>
            <LinearGradient
              colors={
                selectedItem === 2 ? ['#FF7A00', '#FAFF00'] : ['grey', 'grey']
              }
              style={[
                styles.modalchildbox1,
                {
                  borderRadius: 50,
                },
              ]}>
              <View>
                <MaterialCommunityIcons
                  name="account-group"
                  size={25}
                  color={'white'}
                />
              </View>
            </LinearGradient>
            <Text
              style={{
                color: 'white',
                top: 5,
                textAlign: 'center',
                fontSize: 9,
              }}>
              Multi Mode
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default StreamModal;

const styles = StyleSheet.create({
  modalbox1: {

    width: wp(70),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    marginVertical: hp(2),
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
    height: hp(30),
    borderRadius: 10,
    alignItems: 'center',
  },
  modalchildbox1: {
    borderRadius: 50,
    width: 35,
    height: 35,
    alignItems: 'center',

    justifyContent: 'center',
  },
  container: {
    marginTop: '4%',
  },
  line: {
    height: 1, 
    width: '96%', 
    backgroundColor: 'white',
  },
});
