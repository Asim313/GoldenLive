import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import PTRView from 'react-native-pull-to-refresh';
import {ApiCallToken} from '../../Services/Apis';
import Header from '../reuseable_Component/Header';
import UsersLevel from '../extraData/UsersLevel';
import AnimatedLottieView from 'lottie-react-native';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import EnterRoomPassword from '../../components/EnterRoomPassword';

const Follow = ({navigation, route}) => {

  const  showLives = route?.params?.showLives
  const userData = useSelector(state => state.auth.userData);
  const [show, setShow] = useState(true);
  const passwordSheetRef = useRef()

  console.log("lllllllllll", showLives)
  const [liveFollowers, setLiveFollowers] = useState([]);
  const [offlineFollowers, setOfflineFollowers] = useState([]);
  const [completeData, setCompleteData] = useState(null)
  useEffect(() => {
    GetRecommendations();
    {!showLives && getOfflineFollowing()}
  }, []);

  const refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        GetRecommendations();
        resolve();
      }, 4000);
    });
  };

  const GetRecommendations = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list-live-host-following',
        verb: 'GET',
      });
      // console.log('checekkkkkkkkkkkkkk', res);
      setLiveFollowers(res?.data ?? []);
      setShow(false);
    } catch (error) {
      console.log('ERROR GetRecommendations func ====>>>', error);
    }
  };


  const getOfflineFollowing = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list-off-host-following',
        verb: 'GET',
      });
      // console.log('checekkkkkkkkkkkkkk111', res);
      setOfflineFollowers(res?.data ?? []);
    } catch (error) {
      console.log('ERROR GetRecommendations func ====>>>', error);
    }
  };

  const onJoinPress = async (item) => {
    passwordSheetRef.current.close()
   if(item?.status_live === 1) {
    console.log("video live")
     turnOnMicrophoneWhenJoining = true;
     useSpeakerWhenJoining = true;
     navigation.navigate('AudiencePage', {
       channelId: item?.id?.toString(),
       userLive: true,
       completeData: item,
      });
    } else if(item?.multi_room_status === 1) {
      console.log("audio live")
      navigation.navigate('MultiCallUsers', {
        liveID: item?.id?.toString(),
        hostName: item?.nick_name ?? item?.full_name,
        completeData: item,
      });
    } else {
      console.log("not live")
    }
  
};

const unFollowUser = async userId => {
  try {
    const res = await ApiCallToken({
      params: userData.token,
      paramsBody: {id: userId},
      route: 'user/unfollow-host',
      verb: 'POST',
    });
    console.log('unFollowed', res);
    GetRecommendations();
  } catch (error) {
    console.log('ERROR addHourlyReward ====>>>', error);
  }
};
  const ItemStyle = ({item}) => {
    // console.log('Image', item.image)

    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setCompleteData(item)
            item?.islock === 1 ? passwordSheetRef.current.open() : onJoinPress(item);
     
          }}>
          <View style={styles.profileViewerbox}>
            <View style={{flexDirection: 'row'}}>
              {/* <Image source={item.image} style={styles.imgStyle} /> */}

              <Image
                source={
                  item.image == null
                    ? require('../../assets/images/events.jpg')
                    : {uri: item.image}
                }
                style={[styles.imgStyle, {backgroundColor: 'white'}]}
              />
              <View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    paddingVertical: 5,
                    marginHorizontal: 5,
                    fontSize: 12,
                  }}>
                  {item?.nick_name ?? item?.full_name}
                </Text>

                {(item?.status_live == true || item?.multi_room_status === 1) && (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 45,
                      height: 15,
                      borderRadius: 12,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <AnimatedLottieView
                      autoPlay
                      style={{
                        width: 14,
                        height: 14,
                      }}
                      source={require('../../assets/json/14467-music.json')}
                    />

                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 9,
                      }}>
                      {item?.viewerCount}
                    </Text>
                  </View>
                )}
</View>
                <View style={{bottom: 5, left: 5}}>
                  <UsersLevel
                    data={{
                      sender_level_image: item?.sender_level_image,
                      reciever_level_image: item?.reciever_level_image,
                      star_level_image: item?.star_level_image,
                      badge: item?.badge,
                    }}
                  />
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.LvTxt}>{item.id}</Text>
                  <View style={styles.CrownView}>
                    {/* <Image source={props.item.CoinImg} style={{ height: 11, width: 11, marginHorizontal: 1, paddingVertical: 1, }} /> */}
                    <Text style={{color: 'white', fontSize: 10}}>
                      {/* {props.item.Coin} */}12
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.UnblockView}>
              <TouchableOpacity onPress={() => unFollowUser(item.id)}>
                <Text style={styles.UnblockTxt}>Unfollow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    //  console.log('000000', userData),
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <PTRView onRefresh={refresh}>
          <Header name={'Following'} />
          {show ? (
            <View style={{flex: 1, alignSelf: 'flex-end'}}>
              <WaveIndicator color="#B06AB3" size={1100} />
            </View>
          ) : (
            <View style={{flex: 1}}>
              <FlatList data={liveFollowers} renderItem={ItemStyle} />
        
              <FlatList data={offlineFollowers} renderItem={ItemStyle} />
            </View>
          )}
        </PTRView>
      </ImageBackground>
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
};
export default Follow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingbox: {
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP('2%'),
    alignItems: 'center',
  },
  settingtxt: {
    fontSize: 19,
    color: 'white',
    fontWeight: '500',
  },
  icon: {
    color: 'white',
    paddingHorizontal: 5,
  },
  profileViewerbox: {
    flexDirection: 'row',
    paddingVertical: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: '2.5%',
    borderBottomWidth: 0.2,
    borderColor: '#B06AB3',
  },
  LvTxt: {
    color: 'white',
    marginLeft: 5,
    backgroundColor: 'dodgerblue',
    paddingHorizontal: 7,
    borderRadius: 10,
    fontSize: 10,
  },
  CrownView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 7,
  },
  //   UnblockView: {
  //     marginRight: '5%',
  //   },
  UnblockTxt: {
    borderWidth: 1,
    paddingHorizontal: '2.5%',
    color: '#B06AB3',
    borderRadius: 25,
    borderColor: '#B06AB3',
    fontSize: 12,
  },
  imgStyle: {
    height: 50,
    width: 50,
    borderRadius: 27.5,
  },
});
