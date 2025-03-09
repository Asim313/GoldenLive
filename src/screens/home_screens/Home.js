import React, {memo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

//---------Vector icons-----------//
import HomeModal from '../reuseable_Component/HomeModal';

import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import PTRView from 'react-native-pull-to-refresh';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  addMessageInArray,
  updatedData,
  listAllHostData,
  setLiveHost,
  selectCountryToSearch,
} from '../../Redux/Actions';
import {ApiCallToken} from '../../Services/Apis';
import {checkFcmTokenValidation} from '../../Services/ApisCall';
import {firebaseBlockUser, firebaseReadDataOnce} from '../../Services/Firebase';
import Search_Bar from '../reuseable_Component/Search_Bar';
import Games from '../stream_Screen/Games';
import Stream_Fresher from '../stream_Screen/Stream_Fresher';
import Stream_Popular from '../stream_Screen/Stream_Popular';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import CountryListData from '../../components/CountryListData';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import FollowLiveBtn from '../Agora/components/followLiveBtn';
import CustomComponent from '../../components/Animation/LeftSlideAnimation';
import New_Search_Bar from '../reuseable_Component/Search_Bar_New';
import StreamMulti from '../stream_Screen/Stream_Multi';
import DeviceInfo from 'react-native-device-info';
import GameluckyGiftRecordHome from '../../components/GameluckyGiftRecordHome';
import useSocket from '../../hooks/socketHook';

export const CasesFunction = memo(({cases}) => {
  if (cases == 'Popular') {
    return <Stream_Fresher />;
  } else if (cases == 'Games') {
    return <Games />;
  } else if (cases == 'Global Popular') {
    return <Stream_Popular />;
  } else if (cases == 'Party Room') {
    return <StreamMulti />;
  }
});

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  // console.log("jdklasfjlskdkl", userData?.token)
  const [selectedItem, isSelectedItem] = useState('Global Popular');
  const [cases, setCases] = useState('Global Popular');

  const countryListRef = useRef();
  const [countryListData, setCountryListData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [liveHostLoading, setLiveHostLoading] = useState(false);

  const deviceID = DeviceInfo.getUniqueId();
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  }
  const TstSocket = useRef(null);
  const {connectSocket, disconnectSocket} = useSocket();
  useEffect(() => {
    checkData();
  }, []);

  const checkData = async () => {
    let ch = await firebaseReadDataOnce('socketTesting');
    console.log('jjjjjjjjjjj', ch, userData?.user?.id);
    if (parseInt(ch?.id) === 1) {
      console.log('hewwwwwwwwwwwwwwww');
      TstSocket.current = connectSocket(userData?.user?.id);
    } else {
      disconnectSocket();
      console.log('socket closed');
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');

    const data = {token: userData?.token, deviceID: deviceID._j};
    const token = await checkFcmTokenValidation(data);

    console.log('chekc token', fcmToken, token);

    if (token?.code === 500) {
      const fcmToken = await messaging().getToken();
      try {
        if (fcmToken) {
          console.log('generated token=====', fcmToken);
          sendDeviceToken(fcmToken);
          // setTokenGene(fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log('error arise ', error);
      }
    }
  };
  const myVariable = 'myVariableValue';
  const notificationServices = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
        myVariable,
      );
    });

    // foreground notification
    messaging().onMessage(async remoteMessage => {
      // console.log("notification in foreground",remoteMessage)
      // console.log("notification in foreground", remoteMessage?.data)
      {
        remoteMessage?.data?.id &&
          dispatch(addMessageInArray(remoteMessage?.data));
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };

  const sendDeviceToken = async fcmToken => {
    console.log('token in api', fcmToken);
    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: {
          token: fcmToken,
        },
        route: `save/token`,
        verb: 'POST',
      });
      // setBlocked(blocked);
      console.log('save/token api ', res);
    } catch (error) {
      console.log('ERROR save/token api', error);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    await UpdateUserData();
    console.log('111111111111111111111111111111');
    await AllApiData();
    console.log('2222222222222222222222222');
    await GetCountryList();
    console.log('33333333333333333333333333333333');
    await requestUserPermission();
    await notificationServices();
  };

  useEffect(() => {
    firebaseBlockUser(userData?.user?.id, dispatch);
  }, []);

  const UpdateUserData = async () => {
    console.log('11229988')
    dispatch(updatedData(userData));
  };
  const AllApiData = async () => {
    dispatch(listAllHostData(userData));
  };

  const GetLiveHosts = async () => {
    try {
      setLiveHostLoading(true);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list-live-host',
        verb: 'GET',
      });
      console.log(
        '<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
        res?.data?.[0]?.id,
      );
      dispatch(setLiveHost(res?.data ?? []));
      setLiveHostLoading(false);
    } catch (error) {
      console.log('error in GetLiveHosts screen home.js ', error);
    }
  };

  const GetCountryList = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'host/country',
        verb: 'GET',
      });
      setCountryListData(res);
      //  console.log('countries with images ', res);
    } catch (e) {
      console.log('saga error GetCountryList -- ', e.toString());
    }
  };

  const refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        GetLiveHosts();
        // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        dispatch(selectCountryToSearch(null));
        resolve();
      }, 2000);
    });
  };

  useFocusEffect(
    useCallback(() => {
      console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      GetLiveHosts();
    }, []),
  );

  const streamingScreens = [
    {
      id: '1',
      name: 'Popular',
    },
    {
      id: '2',
      name: 'Global Popular',
    },
    {
      id: '4',
      name: 'Games',
    },
    {
      id: '5',
      name: 'Party Room',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <CustomComponent>
        <View>
          <FollowLiveBtn />
        </View>
      </CustomComponent>

      <ImageBackground
        source={{}}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
        <PTRView onRefresh={refresh} style={{flex: 1, marginBottom: '15%'}}>
          {/* <StatusBar backgroundColor="#c471ed" /> */}

          <View style={{marginVertical: 10}}>
            <New_Search_Bar />
          </View>

          <View style={{...styles.gradiantbg2}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 8,
                marginVertical: 5
              }}>
             

              <View style={{width: '90%'}}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  scrollEnabled={true}
                  contentContainerStyle={{alignSelf: 'center', flexGrow: 1,justifyContent: 'space-evenly',}}
                  keyExtractor={item => item.id}
                  data={streamingScreens}
                  renderItem={(item, index) => (
                    <TouchableOpacity
                      style={{ marginHorizontal: 7}}
                      activeOpacity={0.3}
                      onPress={() => {
                        isSelectedItem(item.item.name);
                        setCases(item.item.name);
                        // console.log('item', selectedItem);
                      }}>
                      <View style={{
                        height: 35,
                        backgroundColor: selectedItem === item.item.name ? '#C207C6' : '#EEECEE',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 16
                      }}>
                        <Text
                          style={{
                            color:
                              selectedItem === item.item.name
                                ? 'white'
                                : '#666563',
                            alignSelf: 'center',
                            ...styles.text2,
                           
                          }}>
                          {item.item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>

              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Search_Bar
                  onPressLocation={() => countryListRef.current.open()}
                />
              </View>

            </View>
          </View>
          <GameluckyGiftRecordHome />

          <View style={{flex: 1}}>
            {liveHostLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator />
              </View>
            ) : (
              <CasesFunction cases={cases} />
            )}
          </View>

          {/* Post */}
        </PTRView>
      </ImageBackground>

      <RbSheetComponent
        view={
          <CountryListData
            selectedCountry={selectedIndex}
            countryListData={countryListData}
            onPressCountry={() => countryListRef.current.close()}
          />
        }
        refUse={countryListRef}
        close={true}
        backgroundColor={'white'}
        height={heightPercentageToDP(80)}
      />
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    borderRadius: 20,
    marginHorizontal: '5%',
  },
  child: {width, justifyContent: 'center'},
  swiperimg: {
    height: 180,
    width: 390,
    marginHorizontal: 6,
    borderRadius: 10,
    alignSelf: 'center',
  },

  modalbox1: {
    flexDirection: 'row',
    backgroundColor: '#27B0FF',
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
  gradiantbg2: {
    height: 50,
  },
  text2: {
    marginHorizontal: 12,
    fontSize: 13,
  },
  modalmaincontainer: {
    backgroundColor: '#303749',
    height: hp(45),
    borderRadius: 10,
    alignItems: 'center',
  },
  modalbox2: {
    flexDirection: 'row',
    backgroundColor: '#1AB846',
    width: wp(65),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    marginVertical: hp(1),
  },
  modalbox3: {
    flexDirection: 'row',
    backgroundColor: '#EB352A',
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
});
export default Home;
