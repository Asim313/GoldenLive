import React, {useCallback, useRef, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import HomeModal from '../reuseable_Component/HomeModal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ApiCallToken, ApiUpdateUserData} from '../../Services/Apis';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import PTRView from 'react-native-pull-to-refresh';
import SpotFlatlist from './SpotFlatlist';
import NewScreen from './timerBotton/NewScreen';
import LiveUserBannner from '../../components/LiveUserBannner';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
import HostProfileBox from '../../components/HostProfileBox';

const modalRef = React.createRef();

const SpotLightHome = () => {

  const navigation = useNavigation()
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const [banners, setBanners] = useState(null);
  const [bannersLoading, setBannersLoading] = useState(true);

  const getBanenrs = async () => {
    try {
      setBannersLoading(true);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'banners',
        verb: 'GET',
      });
      // console.log("user11", res)
      setBanners(
        res?.data?.Banners?.filter(item => item?.banner_status === 'Active'),
      );
      setBannersLoading(false);
    } catch (error) {
      console.log('error home screen getBanners func', error?.toString());
    }
  };

  useEffect(() => {
    getBanenrs();
  }, []);

  const [liveHost, setLiveHost] = useState([]);
  const [spotLightLive, setSpotLightLive] = useState([]);
  const [liveHostLoading, setLiveHostLoading] = useState(true);

  useEffect(() => {
    getLiveHosts();
    getLiveHosts2();
  }, []);

  const getLiveHosts = async () => {
    try {
      setLiveHostLoading(true);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'spot/light/host/listing',
        verb: 'GET',
      });
      //  console.log("user13", res)
      setLiveHost(res?.data ?? []);

      setLiveHostLoading(false);
    } catch (error) {
      console.log('error in sopotlight home getlviehost func', error);
    }
  };

  const getLiveHosts2 = async () => {
    try {
      setLiveHostLoading(true);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list-live-spot-light-host',
        verb: 'GET',
      });
      setSpotLightLive(res.data);
      // console.log('1111111123457iiiii', res.data);

      setLiveHostLoading(false);
    } catch (error) {
      console.log('error in streamfresher getlviehost func', error);
    }
  };

  const renderViewForliveHost = ({item}) => {
    const onJoinPress = async (
      hostID,
      item,
    ) => {
       const checkBlock = await checkBlockUser(item?.id)
       if(checkBlock === 0){
          turnOnMicrophoneWhenJoining = true;
          useSpeakerWhenJoining = true;
          navigation.navigate('AudiencePage', {
            channelId: hostID?.toString(), 
            userLive: true,
            completeData: item,
          });
        }
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
          if(res?.data == 0){
            return res?.data
          }
          else if(res?.data == 1){
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

  const renderViewForAllHosts = ({item}) => {
    // console.log("online host id==>",item.id)
    const onJoinPress = (
      hostID,
      item,
    ) => {
      // const hostID = JSON.stringify(item.id);
      turnOnMicrophoneWhenJoining = true;
      useSpeakerWhenJoining = true;
      navigation.navigate('AudiencePage', {
        channelId: hostID?.toString(), 
        userLive: false,
        completeData: item,
      });
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


  const refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        getLiveHosts();
        resolve();
      }, 2000);
    });
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <PTRView
          onRefresh={refresh}
          style={{flex: 1, marginBottom: '15%', marginTop: '1%'}}>
          <StatusBar backgroundColor="#c471ed" />
          <ScrollView style={{height: heightPercentageToDP(100), width: widthPercentageToDP(100)}}>
            {bannersLoading ? (
              <ActivityIndicator style={{marginTop: 25}} />
            ) : (
              <View style={{marginTop: '2%',marginHorizontal: 7 }}>
                <LiveUserBannner data={banners} width={92} height={20} />
              </View>
            )}
            <View style={{marginVertical: '2%'}}>
              <NewScreen />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}
              onPress={() => navigation.navigate('SpotLightTalent')}>
              <Text
                style={{
                  color: '#ffff',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Editor's Pick
              </Text>
            </TouchableOpacity>

            {liveHostLoading ? (
              <ActivityIndicator style={{marginTop: 25}} />
            ) : (
              <View
                style={{
                  width: widthPercentageToDP('100%'),
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  data={spotLightLive}
                  contentContainerStyle={{alignItems: 'center'}}
                  horizontal={true}
                  renderItem={renderViewForliveHost}
                />
              </View>
            )}
            <View >
              <View style={{marginTop: '5%',justifyContent:'space-between',flexDirection:'row'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NewScreen')}>
                  <Text
                    style={{
                      color: '#ffff',
                      fontSize: 20,
                      fontWeight: 'bold',
                      left: 25,
                      bottom: 5,
                    }}>
                    Spotlight Talent
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight:'5%'}}
                  onPress={() => {navigation.navigate('SpotLightScreen')}}
                >
                  <Image
                    source={require('../../assets/images/DailyStarAssests/BubbleForEventRule.png')}
                    style={{height: 27, width: 120}}
                  />
                 
                  <Text
                    style={{
                      position: 'absolute',
                      fontSize: heightPercentageToDP(1.4),
                      fontWeight: 'bold',
                      color: 'white',
                      marginLeft: 20,
                      marginTop:'2%'
                    }}>
                  Join Spotlight
                  </Text>
                
                </TouchableOpacity>
              </View>

              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={liveHost}
                contentContainerStyle={{
                  bottom: 7,
                }}
                keyExtractor={item => item.id}
                renderItem={renderViewForAllHosts}
              />
            </View>
          </ScrollView>
        </PTRView>
      </ImageBackground>
      <View>
        <HomeModal
          view={
            <TouchableOpacity
              onPress={() => {
                modalRef.current.toggleModal();
              }}>
              <ImageBackground
                source={require('../../assets/images/comingsoon.jpeg')}
                resizeMode={'center'}
                style={{height: '100%', width: '100%'}}></ImageBackground>
            </TouchableOpacity>
          }
          ref={modalRef}
        />
      </View>
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
export default SpotLightHome;
