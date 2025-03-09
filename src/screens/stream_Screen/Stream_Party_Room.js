import React, {useEffect, useState} from 'react';
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
import LiveUserBannner from '../../components/LiveUserBannner';
import Search_Bar from '../reuseable_Component/Search_Bar';
import PTRView from 'react-native-pull-to-refresh';
import AudioHostBox from '../../components/audioHostBox';
import New_Search_Bar from '../reuseable_Component/Search_Bar_New';
const Stream_Party_Room = () => {
  console.log('yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2222222222222222');

  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.userData);
  const userUUID = JSON.stringify(userData.user.uuid);
  const userName = JSON.stringify(userData.user.full_name);
  const [liveUsers, setLiveUsers] = useState([]);
  const [uid, setUid] = useState(parseInt(userData?.user?.id));
  const [allHosts, setAllHosts] = useState([]);

  const TOPUSERS = [
    {
      id: '1',
      name: 'New',
    },
    {
      id: '2',
      name: 'Popular',
    },
    // {
    //   id: '3',
    //   name: 'Party Room',
    // },
    {
      id: '4',
      name: 'Gaming room',
    },
  ];

  const [allHostsCopy, setAllHostsCopy] = useState([]);
  const [offlineHostLoading, setOfflineHostLoading] = useState(true);

  const [liveHostLoading, setLiveHostLoading] = useState(true);
  const [liveUsersCopy, setLiveUsersCopy] = useState([]);
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
      if (res?.data?.Banners) {
        setBanners(
          res?.data?.Banners?.filter(item => item?.banner_status === 'Active'),
        );
      }
      setBannersLoading(false);
    } catch (error) {
      console.log('error home screen getBanners func', error?.toString());
    }
  };

  const GetLiveHosts = async () => {
    try {
      setLiveHostLoading(true);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list-audio-host',
        verb: 'GET',
      });
        // console.log("audio!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", res)
        
        setLiveUsers(res?.data ?? []);
        setLiveUsersCopy(res?.data ?? []);

      setLiveHostLoading(false);

    } catch (error) {
      console.log('error in streams GetLiveHosts func', error);
    }
  };

  const GetOfflineHosts = async () => {
    try {
      setOfflineHostLoading(true);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list-ofline-host',
        verb: 'GET',
      });
      //  console.log('1111111111111111111111111111111111111111111111111111111', res)
      if (res?.data) {
        setAllHosts(res?.data);
        setAllHostsCopy(res?.data);
      }
      setOfflineHostLoading(false);
    } catch (error) {
      console.log('error in stream GetOfflineHosts func', error);
    }
  };

  useEffect(() => {
    GetLiveHosts();
    GetOfflineHosts();
    getBanenrs();
    // alert('a')
  }, []);

  const liveAudioHostView = ({item}) => {
    const onJoinPress = (
      name,
      coins,
      uuid,
      image,
      receivedBeans,
      region,
      followers,
      receiver_level,
      sender_level,
      item,
    ) => {
      const hostID = JSON.stringify(item.id);
      turnOnMicrophoneWhenJoining = true;
      useSpeakerWhenJoining = true;
      navigation.navigate('AudioCallUsers', {
        userID: userUUID,
        userName: userName,
        liveID: hostID,
        hostName: name,
        hostCoins: coins,
        hostUuid: uuid,
        hostImage: image,
        hostReceivedBeans: receivedBeans,
        Region: region,
        Followers: followers,
        isHost: false,
        channelName: hostID.toString(),
        hostReceiverLevel: receiver_level,
        hostSenderLevel: sender_level,
        completeData: item,
        uid: uid,
      });
    };

    return (
      <TouchableOpacity
        onPress={() => {
          onJoinPress(
            item?.nick_name ?? item?.full_name,
            item?.coins,
            item?.uuid,
            item?.image,
            item?.received_beans,
            item?.region,
            item?.no_of_followers,
            item?.reciever_level,
            item?.sender_level,
            item,
          );
        }}
        style={{marginVertical: 5, marginHorizontal: 5}}>
        <AudioHostBox item={item} live={true} />
      </TouchableOpacity>
    );
  };

  const renderViewForAllHosts = ({item}) => {
    // console.log("online host id==>",item.id)
    const onJoinPress = (
      name,
      coins,
      uuid,
      image,
      receivedBeans,
      region,
      followers,
      receiver_level,
      sender_level,
      item,
    ) => {
      const hostID = JSON.stringify(item.id);
      turnOnMicrophoneWhenJoining = true;
      useSpeakerWhenJoining = true;
      navigation.navigate('AudioCallUsers', {
        userID: userUUID,
        userName: userName,
        liveID: hostID,
        hostName: name,
        hostCoins: coins,
        hostUuid: uuid,
        hostImage: image,
        hostReceivedBeans: receivedBeans,
        Region: region,
        Followers: followers,
        isHost: false,
        channelName: hostID.toString(),
        hostReceiverLevel: receiver_level,
        hostSenderLevel: sender_level,
        uid: uid,
        completeData: item,
        userLive: false,
      });
    };

    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('StreamShow');
          //  alert(item.received_beans)
          //console.log('Specific user data====>>>>', item);
          onJoinPress(
            item?.nick_name ?? item?.full_name,
            item?.coins,
            item?.uuid,
            item?.image,
            item?.received_beans,
            item?.region,
            item?.no_of_followers,
            item?.reciever_level,
            item?.sender_level,
            item,
          );
        }}
        style={{marginVertical: 5, marginHorizontal: 5}}>
       <AudioHostBox item={item} live={false} />
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
      <View style={{ }}>
        <New_Search_Bar />
      </View>
      <View style={{...styles.gradiantbg2}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 8,
          }}>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            
          </View>
        </View>
      </View>

<View>
  
</View>
<View style={{ width: widthPercentageToDP(100), justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black'}}>Audio Room</Text>
</View>
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
              numColumns={3}
              horizontal={false}
              data={liveUsers}
              keyExtractor={(item, index) => index}
              renderItem={liveAudioHostView}
            />
          </View>
        )}
      </View>
      {/* /////////////////// */}
      <View style={{alignItems: 'center'}}>
        {offlineHostLoading ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              width: widthPercentageToDP(100),
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={allHosts}
              renderItem={renderViewForAllHosts}
              numColumns={3}
              keyExtractor={item => item.id}
              contentContainerStyle={{flexGrow: 1}}></FlatList>
          </View>
        )}
      </View>
      {/* </ScrollView> */}
    </View>
    </PTRView>
  );
};

export default Stream_Party_Room;
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
