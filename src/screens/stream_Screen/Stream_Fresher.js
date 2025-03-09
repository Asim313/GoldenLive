import React, { useState, useCallback, useLayoutEffect, useEffect, useContext } from 'react';
import {
  Text,
  StatusBar,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import PTRView from 'react-native-pull-to-refresh';

import CountryPicker, {
  DARK_THEME,
  FlagButton,
} from 'react-native-country-picker-modal';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import AntDesign from 'react-native-vector-icons/AntDesign';
//---------------country Pickerr-------------

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import { useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';
import { ApiCallToken } from '../../Services/Apis';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import HomeModal from '../reuseable_Component/HomeModal';
import { UserProfileContext } from '../../context/userProfile';
import HostProfileBox from '../../components/HostProfileBox';
import { memo } from 'react';
import LiveUserBannner from '../../components/LiveUserBannner';

const Data2 = [
  {
    img: require('../../assets/images/banner2.jpg'),
  },
  {
    img: require('../../assets/images/banner2.jpg'),
  },
  {
    img: require('../../assets/images/banner2.jpg'),
  },
  {
    img: require('../../assets/images/banner2.jpg'),
  },
  {
    img: require('../../assets/images/banner2.jpg'),
  },
];

const Stream_Fresher = memo(({ }) => {
  const navigation = useNavigation();

  const [joinChannelLoading, setJoinChannelLoading] = useState(false)
  const [liveUsers, setLiveUsers] = useState([]);
  const userData = useSelector(state => state.auth.userData);


  const liveHost = useSelector(state => state.hostRed.liveHost);
  const offLineHost = useSelector(state => state.hostRed.offLineHost)
  const bannerData = useSelector(state => state.hostRed.bannerData?.list_of_live_banners);


  useEffect(() => {
    setLiveUsers(liveHost)
  }, [liveHost])

  // my code

  const renderViewForHosts = ({ item }) => {
    const onJoinPress = async (
      hostID,
      item,
    ) => {
     
        turnOnMicrophoneWhenJoining = true;
        useSpeakerWhenJoining = true;
        navigation.navigate('AudiencePage', {
          channelId: hostID?.toString(),
          userLive: true,
          completeData: item,
        });
      
    };

    const checkBlockUser = async (id) => {
      // console.log("user data id to blcok", id)
      try {
        const res = await ApiCallToken({
          params: userData.token,
          paramsBody: {
            host_id: id,
          },
          route: `check-block-user`,
          verb: 'POST',
        });
        // setBlocked(blocked);
        // console.log("check block user ", res)
        if (res?.data == 0) {
          return res?.data
        }
        else if (res?.data == 1) {
          console.log("check2")
          alert(" " + res?.message)
        }
      } catch (error) {
        console.log('ERROR block user api', error);
      }
    }



    return (
      <TouchableOpacity
        onPress={() => {
          onJoinPress(
            item?.id,
            item,
          );
        }}>
        <HostProfileBox item={item} live={true} />
      </TouchableOpacity>
    );
  };

  const renderViewForAllHosts = ({ item }) => {
    // console.log("online host id==>",item.id)
    const onJoinPress = (
      hostID,
      item,
    ) => {

      setJoinChannelLoading(true)
      // const hostID = JSON.stringify(item.id);
      turnOnMicrophoneWhenJoining = true;
      useSpeakerWhenJoining = true;
      navigation.navigate('AudiencePage', {
        channelId: hostID?.toString(),
        userLive: false,
        completeData: item,
      });
      setJoinChannelLoading(false)
    };

    return (
      <TouchableOpacity
        onPress={() => {
          onJoinPress(
            item?.id,
            item,
          );
        }}>
        <HostProfileBox item={item} live={false} />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{ flex: 1, marginBottom: '15%', marginTop: '1%' }}>
      <ScrollView>
        {joinChannelLoading ?
          <View style={{
            alignItems: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
            <View style={{ top: 20, height: heightPercentageToDP(10) }}>
              <ActivityIndicator style={{}} />
              <Text style={{ color: 'black' }}>Joining Host</Text>
            </View>
          </View>

          :

          <>
            <View
              style={{
                width: widthPercentageToDP('100%'),
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              {!liveUsers ?
                <ActivityIndicator style={{}} />
                :
                <FlatList
                  data={[...liveUsers]?.splice(0, 4)}
                  numColumns={2}
                  contentContainerStyle={{ alignItems: 'center' }}
                  horizontal={false}
                  keyExtractor={(item) => item?.id}
                  listKey={'liveusers'}
                  renderItem={renderViewForHosts}
                />
              }
            </View>
            {!bannerData ? (
              <ActivityIndicator style={{}} />
            ) : (
              <View style={{ marginVertical: 5, marginHorizontal: 7 }}>
                <LiveUserBannner data={bannerData} width={92} height={15} />
              </View>
            )}


            <FlatList
              data={[...liveUsers]?.splice(4, 16)}
              numColumns={2}
              contentContainerStyle={{ alignItems: 'center' }}
              horizontal={false}
              keyExtractor={(item) => item?.id}
              listKey={'liveuserss'}
              renderItem={renderViewForHosts}
            />

            {!offLineHost ?
              <ActivityIndicator />
              :
              <View
                style={{
                  width: widthPercentageToDP('100%'),
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  data={[...offLineHost]?.splice(0, 25)}
                  renderItem={renderViewForAllHosts}
                  numColumns={2}
                  contentContainerStyle={{ alignItems: 'center' }}
                  horizontal={false}
                  listKey={'offlineUsers'}
                  keyExtractor={(item) => item.id}
                // onEndReachedThreshold={0.1}
                // onEndReached={handleEndReached}
                // ListFooterComponent={renderFooter}
                />
              </View>
            }

          </>

        }

      </ScrollView>


    </View>
  );
});

export default Stream_Fresher;

const styles = StyleSheet.create({
  countrypickerview: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 3,
    marginLeft: '3%',
    padding: 4,
    marginHorizontal: '65%',

    borderRadius: 5,
    justifyContent: 'space-evenly',
  },
  RegionList: {
    marginVertical: 8,
    fontSize: 17,
    borderBottomWidth: 0.3,
    color: 'black',
    paddingLeft: 10,
    marginLeft: '5%',
    width: '75%',
  },
  countrypickertxt: {
    color: 'white',
    marginHorizontal: '2%',
    marginLeft: 12,
    fontSize: 12,
    right: 4,
    width: '70%',
  },
  swiperimg: {
    height: 80,
    width: widthPercentageToDP('100%'),
    marginHorizontal: 6,
    borderRadius: 10,
  },
});
