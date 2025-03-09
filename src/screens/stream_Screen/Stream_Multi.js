import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
//-----------Styles---------

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useCallback} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ApiCallToken} from '../../Services/Apis';
import PTRView from 'react-native-pull-to-refresh';
import HostProfileBox from '../../components/HostProfileBox';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import EnterRoomPassword from '../../components/EnterRoomPassword';

const StreamMulti = () => {
  console.log('yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2222222222222222');
  const passwordSheetRef = useRef()
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.userData);
  const userUUID = JSON.stringify(userData.user.uuid);
  const userName = JSON.stringify(userData.user.full_name);
  const [liveUsers, setLiveUsers] = useState([]);
  const [uid, setUid] = useState(parseInt(userData?.user?.id));
  const [allHosts, setAllHosts] = useState([]);

  const [completeData, setCompleteData] = useState(null)
  const [allHostsCopy, setAllHostsCopy] = useState([]);
  const [offlineHostLoading, setOfflineHostLoading] = useState(true);

  const [liveHostLoading, setLiveHostLoading] = useState(true);
  const [liveUsersCopy, setLiveUsersCopy] = useState([]);
  const offLineHost = useSelector(state => state.hostRed.offLineHost)


  const GetLiveHosts = async () => {
    try {
      setLiveHostLoading(true);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'multi-room-user-list',
        verb: 'POST',
      });
        console.log("audio!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", res)
        
        setLiveUsers(res?.data ?? []);
        setLiveUsersCopy(res?.data ?? []);

      setLiveHostLoading(false);

    } catch (error) {
      console.log('error in streams GetLiveHosts func', error);
    }
  };

  // console.log('offlinehost', offLineHost)

  useFocusEffect(
    useCallback(() => {
      GetLiveHosts();
    }, []),
  );

  const onJoinPress = (item, isLive) => {
    // console.log('ikkkkkkkk', isLive)
    passwordSheetRef.current.close()
    const hostID = JSON.stringify(item.id);
    turnOnMicrophoneWhenJoining = true;
    useSpeakerWhenJoining = true;
    navigation.navigate('MultiCallUsers', {
      userID: userUUID,
      userName: userName,
      liveID: hostID,
      hostName: item?.name,
      hostCoins: item?.coins,
      hostUuid: item?.uuid,
      hostImage: item?.image,
      hostReceivedBeans: item?.receivedBeans,
      Region: item?.region,
      Followers: item?.followers,
      isHost: false,
      channelName: hostID.toString(),
      hostReceiverLevel: item?.receiver_level,
      hostSenderLevel: item?.sender_level,
      completeData: item,
      uid: uid,
      userLive: isLive,
    });
  };

  const liveAudioHostView = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCompleteData(item)
          item?.islock === 1 ? passwordSheetRef.current.open() : onJoinPress(item, true);
        }}
        style={{marginVertical: 5}}>
        <HostProfileBox item={item} live={true} />
      </TouchableOpacity>
    );
  };

  const renderViewForAllHosts = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onJoinPress(item);
        }}
        style={{marginVertical: 5}}>
       <HostProfileBox item={item} live={false} />
      </TouchableOpacity>
    );
  };


  const refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        GetLiveHosts();
        resolve();
      }, 2000);
    });
  };

  return (
    <PTRView
    onRefresh={refresh}
    style={{flex: 1, backgroundColor: 'white'}}>

    <View
      style={{
        flex: 1,
        marginBottom: heightPercentageToDP(0),
        marginTop: '1%',
        backgroundColor: 'white',
        paddingBottom: heightPercentageToDP(10),
      }}>
      {/* <StatusBar backgroundColor="#242A38" /> */}
     
      <View style={{alignItems: 'center'}}>
        {liveHostLoading ? (
          <ActivityIndicator style={{}} />
        ) : (
          <View
            style={{
              width: widthPercentageToDP(100),
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              horizontal={false}
              data={liveUsers}
              keyExtractor={(item, index) => item?.id}
              renderItem={liveAudioHostView}
            />
          </View>
        )}
      </View>
      {/* /////////////////// */}
      <View style={{alignItems: 'center'}}>
      
          <View
            style={{
              width: widthPercentageToDP(100),
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={offLineHost}
              renderItem={renderViewForAllHosts}
              numColumns={2}
              keyExtractor={item => item.id}
              contentContainerStyle={{flexGrow: 1}}></FlatList>
          </View>

      </View>
      {/* </ScrollView> */}
    </View>

    <RbSheetComponent
              view={
                <EnterRoomPassword completeData={completeData} handlePassword={onJoinPress}  />
              }
              backgroundColor={'transparent'}
              refUse={passwordSheetRef}
              close={false}
              height={heightPercentageToDP(30)}
            />
    </PTRView>
  );
};

export default StreamMulti;
const styles = StyleSheet.create({
  swiperimg: {
    height: 80,
    width: widthPercentageToDP(95),
    marginHorizontal: 3,
    borderRadius: 10,
  },
  text2: {
    marginHorizontal: 12,
    marginTop: 3,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
