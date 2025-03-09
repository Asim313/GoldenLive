import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ApiCallToken } from '../../Services/Apis';
import LiveUserBannner from '../../components/LiveUserBannner';;
import { memo } from 'react';
import HostProfileBox from '../../components/HostProfileBox';
import { verifyRoomPassword } from '../../Services/ApisCall';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import EnterRoomPassword from '../../components/EnterRoomPassword';

const Stream_Popular = memo(({ banners, bannersLoading }) => {

  const [completeData, setCompleteData] = useState(null)
  const passwordSheetRef = useRef()
    const [joinChannelLoading, setJoinChannelLoading] = useState(false)
    const navigation = useNavigation();
    const [liveUsers, setLiveUsers] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    const liveHost = useSelector(state => state.hostRed.liveHost);
    const selectedCountry = useSelector(state => state.homeRed.selectedCountry);
    const offLineHost = useSelector(state => state.hostRed.offLineHost)
    const bannerData = useSelector(state => state.hostRed.bannerData?.list_of_home_banners);

    const [allHost, setAllHosts] = useState([]) 


    useEffect(() => {
      // console.log("fjkdaljdk", offLineHost?.[0]?.country_id, offLineHost?.[0]?.region)
      //   console.log("country list data", selectedCountry, offLineHost?.filter(
      //     item => parseInt(item?.country_id) === parseInt(selectedCountry)))
          if(selectedCountry) {
            hanleFilterCountries(selectedCountry)
          } else { 
            setLiveUsers(liveHost)
            setAllHosts(offLineHost)
          }
    }, [selectedCountry])

    useEffect(() => {
      setLiveUsers(liveHost)
      setAllHosts(offLineHost)
    }, [liveHost, offLineHost])

    const handlePassword = async (password) => {
      const res = await verifyRoomPassword({token: userData?.token, hostId: completeData?.id, password: password })
      if(res?.data === 1) {
        passwordSheetRef.current.close()
        console.log('resssssssssssss', res, completeData?.id, password)
        onJoinPress(item?.id, item, true)
      } else {
        alert(res?.message)
      }
    }

    const onJoinPress = (item, isLive) => {
      setJoinChannelLoading(true)
      passwordSheetRef.current.close()
      // const hostID = JSON.stringify(item.id);
      turnOnMicrophoneWhenJoining = true;
      useSpeakerWhenJoining = true;
      navigation.navigate('AudiencePage', {
        channelId: item?.id?.toString(),
        userLive: isLive,
        completeData: item,
      });
      setJoinChannelLoading(false)
    };

  const renderViewForHosts = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCompleteData(item)
          item?.islock === 1 ? passwordSheetRef.current.open() :  onJoinPress(item, true);
        }}>
        <HostProfileBox item={item} live={true} />
      </TouchableOpacity>
    );
  };



  const renderViewForAllHosts = ({ item }) => {

    return (
      <TouchableOpacity
        onPress={() => {
          onJoinPress(item, false);
        }}>
           <HostProfileBox item={item} live={false} />
      </TouchableOpacity>
    );
  };

    const hanleFilterCountries = (id) => {
      console.log("right111111111", id)
     // setSelectedIndex(id);
      setLiveUsers(
        liveHost?.filter(
          item => parseInt(item?.country_id) === parseInt(id),
        ),
      );
      setAllHosts(
        offLineHost?.filter(
          item => parseInt(item?.country_id) === parseInt(id),
        ),
      );
    };


  return (
    <View
      style={{ flex: 1, marginBottom: '15%', marginTop: '1%' }}>

      {
        joinChannelLoading ?
          <View style={{ alignItems: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ top: 20, height: heightPercentageToDP(10) }}>

              <ActivityIndicator style={{}} />
              <Text style={{ color: 'white' }}>Joining Host</Text>
            </View>
          </View>

            :
            <>
            

            <View
              style={{
                width: widthPercentageToDP('100%'),
              
              }}>
             {liveUsers?.[0] &&
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
          <LiveUserBannner data={bannerData} width={92} height={14} />
        </View>
      )}

            <View
              style={{
                width: widthPercentageToDP('100%'),
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              {
                // liveHostLoading && liveUsers?.[0]
                !liveUsers?.[0] ? (
                  <ActivityIndicator style={{}} />
                ) : (
                  <FlatList
                    data={[...liveUsers]?.splice(4)}
                    numColumns={2}
                    renderItem={renderViewForHosts}
                  />
                )}
            </View>

              {!allHost?.[0] ? (
                <ActivityIndicator />
              ) : (
                <View
                  style={{
                    width: widthPercentageToDP('100%'),
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <FlatList
                    data={[...allHost]?.splice(0, 25)}
                    renderItem={renderViewForAllHosts}
                    numColumns={2}
                  />
                </View>
              )}
            </>
        }

<RbSheetComponent
              view={
                <EnterRoomPassword completeData={completeData} handlePassword={onJoinPress}  />
              }
              backgroundColor={'transparent'}
              refUse={passwordSheetRef}
              close={false}
              height={heightPercentageToDP(30)}
            />
      </View>
    );
  },
);

export default Stream_Popular;

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
  itemContainer: {
    // backgroundColor: 'black',
    // marginVertical:''
    borderRadius: 12,
    justifyContent: 'space-between',
    height: heightPercentageToDP(28),
    width: widthPercentageToDP(55),
    // marginHorizontal: 1,
    // marginTop: 5,
    left: 17,
  },
  itemContainer2: {
    justifyContent: 'space-between',
    backgroundColor: 'black',
    borderRadius: 12,
    height: heightPercentageToDP(13.5),
    width: widthPercentageToDP(36),
    // marginHorizontal: 1,

    // marginTop: 5,
    left: 20,
  },
});
