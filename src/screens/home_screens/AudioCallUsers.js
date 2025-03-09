import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  PermissionsAndroid,
  Dimensions,
  findNodeHandle,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { primaryColor, white, txtgrey, transparent } from '../../utils/Styles';

import StarIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import StarModal from '../reuseable_Component/StarModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import React, { useRef, useState, useEffect } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { ApiCallToken, ApiUpdateUserData } from '../../Services/Apis';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { addSticker, updateHostBeans, updateUserData, updateVolumeIndication } from '../../Redux/Actions';
import LinearGradient from 'react-native-linear-gradient';
import TalentLevelExplaination from '../levelExplanation/TalentLevelExplanation';
import Simple from 'react-native-vector-icons/SimpleLineIcons';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import SocialLinks from '../myInvites/SocialLinks';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';

import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import Feather from 'react-native-vector-icons/Feather';
import DeviceInfo from 'react-native-device-info';
import AnimatedLottieView from 'lottie-react-native';
import Call from '../home_screens/Call';
import ProfileModalStyles from '../reuseable_Component/ProfileModalStyle';
import UserList from '../Agora/components/UserList';
import FansRanking from '../reuseable_Component/FansRanking';
import { shareToWhatsApp } from '../reuseable_Component/SocialShare';
import FruitLoop from '../FruitLoopGame/FruitLoop/FruitLoop';
import SeatsLogic from '../reuseable_Component/SeatsLogic';
import GameWinnerAnimation from '../Agora/components/GameWinnerAnimation';
import GiftSheetData from '../../components/BottomGiftSheet/GiftSheetData';
import AnimatedGiftView from '../../components/ShowAnimatedGift/AnimatedGift';
import globalStyles from '../../utils/styles/global-styles';
import MessageSheet from '../Agora/components/MessageSheet';
import AllIcons, { IconList } from '../../components/AllIcons';
import DailyStar from '../../components/DailyStar';
import { Alert } from 'react-native';
import { BackHandler } from 'react-native';
import CommentsComponent from '../Agora/components/CommentsComponent';
import GameSheet from '../../components/GamesSheet';
import TopLineFinalComponet from '../Agora/components/StreamHeader/TopLineFinalComponet';
import Rnfetchblob from '../../Testing/Rnfetchblob';
import GiftAnimationPatti from '../Agora/components/GiftAnimation';
import { COHOST_DATA, GIFT_SOCKET } from '../../Services/Constants';
import LuckyGiftAnimationPatti from '../../components/Animation/LuckyGiftAnimationPatti';
import { checkUserFollowing, followHost, getGiftsList } from '../../Services/ApisCall';
import EmojiListSheet from '../../components/EmojiSheet';
import GiftAnimationPattiGlobal from '../Agora/components/giftAnimationPattiGlobal';


const deviceName = DeviceInfo.getDeviceName();

const granted =
  Platform.OS == 'android'
    ? PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.RECORD_AUDIO,
    )
    : undefined;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AudioCallUsers = props => {

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit Streaming!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => navigation.goBack('Streams') },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [luckyGiftData, setLuckyGiftData] = useState(null)
  const [designText, setDesignText] = useState(null)
  const [luckyBonusReward, setLuckyBonusReward] = useState(null)

  useEffect(() => {
    database()
      .ref(`/LuckyGift/${channelName}`)
      .on('child_added', snapshot => {
        {
          let messageDate = new Date(snapshot?.val()?.dateTime);
          // console.log("snpshkkkkkkkkkkk", snapshot?.val(), messageDate?.getTime() > checkDate.getTime() + 500)
          if (snapshot?.val() && messageDate?.getTime() > checkDate.getTime() + 500) {
            if(snapshot.val()?.count !== "0") {
                setLuckyGiftData(snapshot.val())
              }
              else  {
                setLuckyGiftData(null)
              }
          }
            
        }
      });
  }, []);

  useEffect(() => {
    database()
      .ref(`/LuckyGiftReward/${channelName}`)
      .on('child_added', snapshot => {
        {
          let messageDate = new Date(snapshot?.val()?.dateTime);
          if(snapshot?.val() && messageDate?.getTime() > checkDate.getTime() + 500) {
              setLuckyBonusReward(snapshot.val())
          }
        }
      });
  }, []);


useEffect(() => {
 { designText && handleFontStyle()}
}, [designText]);

const handleFontStyle = async () => {
  await delay(4000)
  setDesignText(null)
}

useEffect(() => {
 { luckyBonusReward && hanldeRewardBanner()}
}, [luckyBonusReward]);

const hanldeRewardBanner = async () => {
  await delay(10000)
  setLuckyBonusReward(null)
}


  const fruitLoopGameRef = useRef();
  const teenPattiRef = useRef();

  const { route } = props;
  const { params } = route;
  const {
    liveID,
    hostName,
    completeData,
  } = params;

  const [updatedCoins, setupdatedCoins] = useState();
  const navigation = useNavigation();
  const [selectGiftBtn, setselectGiftBtn] = useState(0);

  const gameSheetRef = useRef();
  const stickerSheetRef = useRef();
  const userListRef = useRef();

  const Gift = useRef();
  const msgRef = useRef();
  const modalRef = React.createRef();
  const modal2Ref = React.createRef();
  const ProfileRef = React.createRef();
  const joinCallModalRef = React.createRef();

  const messageArray = useSelector(state => state.homeRed.unseenMessages);
  const userData = useSelector(state => state.auth.userData);
  const active_store = useSelector(state => state.homeRed.activeStoreData);
  const frameData = active_store?.filter(
    item => item?.parent_title === 'Frames',
  );

  const entryFrame = active_store?.filter(
    item => item?.parent_title === 'Garage',
  );
  // console.log("----------------------------------", " ", params)
  const [gettingGiftsArray, setGettingGiftsArray] = useState([]);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  //console.log("user11", userUpdatedData)
  const dispatch = useDispatch();
  const [hostLevel, setHostLevel] = useState();
  // console.log('Updated data for beans', userData?.user);
  const [FollowingHost, setFollowingHost] = useState([]);
  useKeepAwake();

  //my code

  //console.log("Routes", route.params)
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(userData?.user?.id);
  const [channelName, setChannelName] = useState(route?.params?.liveID);
  const agoraEngineRef = useRef(IRtcEngine);
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(route?.params?.isHost); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const [exitCall, setExitCall] = useState(false);

  const [coHost1Id, setCoHost1ID] = useState(null);

  const [joinCall, setJoinCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [flipCamera, setFlipCamera] = useState(true);
  const [camera, setCamera] = useState(true);
  const [hostBgTheme, setHostBgTheme] = useState(null);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const handleMicButton = () => {
    console.log('yesssssss', exitCall, !isMicOn);
    if (agoraEngineRef.current.muteLocalAudioStream) {
      setIsMicOn(!isMicOn);
      if (isMicOn) {
        console.log('val');
        agoraEngineRef.current.muteLocalAudioStream(true);
        database()
          .ref(`/cohostaudioTest/${channelName}/${userUpdatedData?.id}`)
          .update({
            isMicOn: 'false',
          });
      } else {
        console.log('val2');
        agoraEngineRef.current.muteLocalAudioStream(false);
        database()
          .ref(`/cohostaudioTest/${channelName}/${userUpdatedData?.id}`)
          .update({
            isMicOn: 'true',
          });
      }
    }
    // { isMicOn ? agoraEngineRef.current.muteLocalAudioStream(true) : agoraEngineRef.current.muteLocalAudioStream(false) }
  };

  const [disableComments, setDisableComments] = useState(false)

  const muteUser = async () => {
    database().ref(`/muteList/${channelName}`)
      .on('child_added', snapshot => {
        console.log("mutedddddd added", snapshot.val()?.id)
        if (parseInt(snapshot.val()?.id) === parseInt(userUpdatedData?.id)) {
          setDisableComments(true)
        }
      });

    database().ref(`/muteList/${channelName}`)
      .on('child_removed', snapshot => {
        console.log("mutedddddd removed", snapshot.val()?.id)
        if (parseInt(snapshot.val()?.id) === parseInt(userUpdatedData?.id)) {
          setDisableComments(false)
        }
      });
  }

  const flipCameraHandle = () => {
    setFlipCamera(!flipCamera);
    agoraEngineRef.current.switchCamera();
  };

  const handleCamera = () => {
    setCamera(!camera);
    {
      camera
        ? agoraEngineRef.current.muteLocalVideoStream(true)
        : agoraEngineRef.current.muteLocalVideoStream(false);
    }
  };

  const firebaseFunc = () => {
    database()
      .ref(`/channelsaudio/${channelName}`)
      .on('value', snapshot => {
        // console.log('User data: aud', snapshot.val());
        snapshot.val() && handleJoinCall(snapshot.val());
      });
  };

  const [stop, setStop] = useState(0);
  const handleJoinCall = val => {
    let filtered = Object.entries(val).filter(
      ([key, value]) => value.status === 1,
    );
    filtered?.map(item => {
      if (item?.[1]?.coHostID === uid && stop === 0) {
        generateToken2();
      }
    });
    {
      val?.theme && setHostBgTheme(val?.theme);
    }
    {
      val?.JoinCalls === 'true' ? setJoinCall(true) : setJoinCall(false);
    }
  };

  useEffect(() => {
    console.log('cohost99', channelName);
    const onChildAdd = database()
      .ref(`/cohostaudioTest/${channelName}`)
      .on('child_added', snapshot => {
        {
          snapshot.val()?.id && handleCohost(snapshot.val());
        }
      });
    return () => {
      database()
        .ref(`/cohostaudioTest/${channelName}`)
        .off('child_added', onChildAdd);
      deleteCoHostNode();
    };
  }, []);

  const [handleUserMic, setHanldeUserMic] = useState(null);
  const coHostChildChange = () => {
    database()
      .ref(`/cohostaudioTest/${channelName}`)
      .on('child_changed', snapshot => {
        {
          snapshot.val()?.id && setHanldeUserMic(snapshot.val());
          // if(snapshot?.val()?.sticker) {
          //   dispatch(addSticker(snapshot?.val()?.sticker))
          // }
        }
        if (parseInt(snapshot.val()?.id) === parseInt(userUpdatedData?.id)) {
          {
            snapshot.val()?.isMicOn === 'true'
              ? agoraEngineRef.current.muteLocalAudioStream(false)
              : agoraEngineRef.current.muteLocalAudioStream(true);
          }
        }
      });
  };

  useEffect(() => {
    console.log('handlemic serjeka', handleUserMic);
    if (handleUserMic?.id) {
      setCohostData(
        cohsotData.map(item => {
          if (parseInt(item?.cohostID) === parseInt(handleUserMic?.id)) {
            return {
              ...item,
              isMicOn: handleUserMic?.isMicOn,
              giftsReceived: handleUserMic?.giftsReceived,
              sticker: handleUserMic?.sticker,
              receiverSeatY: handleUserMic?.sendToPositionY,
              receiverSeatX: handleUserMic?.sendToPositionX,
              senderPositionY: handleUserMic?.fromPositionY,
              senderPositionX: handleUserMic?.fromPositionX,
              stickerImg: handleUserMic?.stickerImg,
            };
          }
          return item;
        }),
      );
    }
  }, [handleUserMic]);

  const firebaseWrite = () => {
    //console.log("user data", userData?.user)
    database()
      .ref(`/channelsaudio/${channelName}/${uid}`)
      .set({
        coHostID: uid,
        full_name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
        img: userData?.user?.image,
        status: '0',
      })
      .then(() => {
        //console.log('Data set.')
        joinCallModalRef.current.toggleModal();
      });
  };

  function showMessage(msg) {
    setMessage(msg);
  }

  const generateToken = async () => {
    // console.log("remove 5" ,itemRemove)
    const paramsBody = {
      channelName: channelName,
      uid: parseInt(uid),
      role: 'RoleAttendee',
    };
    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'check-block-and-status',
        verb: 'POST',
      });
      console.log("checkkng and geneerateo toekn", res)
      if (res?.data?.token) {
        join(res?.data?.token);
      } else {
        navigation.goBack()
        alert('' + res?.message)
      }
    } catch (error) {
      console.log('audiocalluser screen, generatetoken func', error);
    }
  };

  const join = async tok => {
    setExitCall(false);
    // console.log("remove 6" ,itemRemove)
    if (tok) {
      if (isJoined) {
        return;
      }

      try {
        agoraEngineRef.current?.setChannelProfile(
          ChannelProfileType.ChannelProfileLiveBroadcasting,
        );

        if (isHost) {
          agoraEngineRef.current?.startPreview();
          //console.log("inhost", tok)
          agoraEngineRef.current?.joinChannel(tok, channelName, parseInt(uid), {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          });
        } else {
          // console.log("hereeeeeeee")

          agoraEngineRef.current?.joinChannel(tok, channelName, parseInt(uid), {
            clientRoleType: ClientRoleType.ClientRoleAudience,
          });
        }
        agoraEngineRef.current.enableAudioVolumeIndicationEx(1000, 3, true)
        agoraEngineRef.current.disableVideo()
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('no token', token);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  const agoraEvents = {
    onJoinChannelSuccess: () => {
      showMessage('Successfully joined the channel ' + channelName);
      setIsJoined(true);
      // console.log('joined channel');
    },
    onUserJoined: (_connection, Uid) => {
      showMessage('user joined ' + Uid);
      setRemoteUid(Uid);
    },
    onUserOffline: (_connection, Uid) => {
      setRemoteUid(0);
      console.log('user offline', Uid);
    },
    onLocalVideoStateChanged: (remoteUid, state) => {
      // console.log('remoteuid', remoteUid, 'state', state);
    },
    onAudioVolumeIndication: (connection, speakers, speakerNumber, totalVolume) => {
        // console.log('onAudioVolumeIndication audience side ==> ', speakers,  connection?.localUid, 'speakers', speakers?.[0]?.volume, 'speakerNumber', speakerNumber, 'totalVolume', totalVolume );
       if(speakers?.[0]?.volume >= 30) {
         dispatch(updateVolumeIndication({id: speakers?.[0]?.uid === 0 ?  connection?.localUid : speakers?.[0]?.uid, volume: speakers?.[0]?.volume}))
         // setActiveSpeakerValue({id: connection?.localUid, volume: speakers?.[0]?.volume})
       } else {
         dispatch(updateVolumeIndication({id: speakers?.[0]?.uid === 0 ?  connection?.localUid : speakers?.[0]?.uid, volume: 0}))
        // setActiveSpeakerValue(false)
       }
       },
  };

  const callBackMethod = () => {
    agoraEngineRef.current = createAgoraRtcEngine();
    const agoraEngine = agoraEngineRef.current;
    agoraEngine.registerEventHandler(agoraEvents);
  };

  const sendEntryGift = () => {
    const node = `/giftsaudio/${channelName}`;
    const currentDate = new Date();
    const newNodeKey = database()
      .ref()
      .child(node)
      .push().key;

    database()
      .ref(`${node}/` + newNodeKey)
      .set({
        id: userUpdatedData?.id,
        // giftId: data?.id,
        icon: entryFrame?.[0]?.json_image,
        date: currentDate.toString(),
        // beans: receivedBeans,
        // receiverId: hostId?.[0]?.cohostID
      });
  }

  useEffect(() => {
    // Initialize Agora engine when the app starts
    entryMessage();
    addToUserList();
    checkGiftStatus()
    handle();
    firebaseFunc();
    onUserRemove();
    coHostChildRemove();
    coHostChildChange();
    getUserListFromRLDB();
    handleSeatsLockAdded();
    handleSeatsLock();
    getGlobalNotifications();
    muteUser()
    senddddddd()
    checkFollowUser();
    return () => {
      console.log('cleaned up');
      agoraEngineRef.current.unregisterEventHandler(agoraEvents);
      removeUserFromNode();
      leave();
      database().ref().off();
    };
  }, []);

  const senddddddd = async () => {
    await delay(1000)
    { entryFrame?.[0] && sendEntryGift() }
  }

  const getUserListFromRLDB = () => {
    //console.log("node3")
    const onChildAdd = database()
      .ref(`/userlistaudio/${channelName}`)
      .on('child_added', snapshot => {
        //console.log('userlistaudio ', snapshot.val());
        setData(prev => [...prev, snapshot.val()]);
      });
    // Stop listening for updates when no longer required
    return () => {
      database()
        .ref(`/userlistaudio/${channelName}`)
        .off('child_added', onChildAdd);
    };
  };

  // filtering data from user list when any user left the channel checking real time through database (tes) is the id that user left the channel we are getting real time user remove in tes
  useEffect(() => {
    //console.log("setData==============================00")
    {
      tes != uid &&
        data?.[0] &&
        tes &&
        setData(data?.filter(item => item?.id !== tes));
    }
  }, [tes]);

  const [data, setData] = useState([]);
  const [singleUserData, setSingleUserData] = useState();
  const [list, setList] = useState(false);

  const FlatListController = () => {
    setList(!list);
  };

  const [tes, setTes] = useState(null);
  const onUserRemove = () => {
    database()
      .ref(`/userlistaudio/${channelName}`)
      .on('child_removed', snapshot => {
        //console.log('removeChild7 ', snapshot.val());
        setTes(snapshot.val()?.id);
      });
  };

  useEffect(() => {
    // if hostleft the channel
    // {
    //   parseInt(channelName) === parseInt(tes) && leave();
    // }

    if (parseInt(userUpdatedData?.id) === parseInt(tes)) {
      leave();
      navigation.goBack();
    }

    {
      tes != uid && tes && setData(data?.filter(item => item?.id !== tes));
    }
    setTes(null);
  }, [tes]);

  //if host remove this user from call
  const handleCurrentUserOutOfCall = () => {
    console.log('removed');
  };

  const removeUserFromNode = async () => {
    database().ref(`/channelsaudio/${channelName}/${uid}`).remove();
    //console.log("7")
    await database()
      .ref(`/userlistaudio/${channelName}/${uid}`)
      .remove()
      .then(() => console.log('successfully user removed from channel'));
  };

  const addToUserList = async () => {
    // console.log("userdata", userData?.user)
    await database()
      .ref(`/userlistaudio/${channelName}/${uid}`)
      .set({
        id: uid,
        full_name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
        image: userUpdatedData?.image,
        sender_level: userUpdatedData?.sender_level,
        reciever_level: userUpdatedData?.reciever_level,
        reciever_level_image: userUpdatedData?.reciever_level_image,
        sender_level_image: userUpdatedData?.sender_level_image,
        status: '0',
        json_image: frameData?.[0]?.json_image,
        badge: userUpdatedData?.badge,
      })
      .then(() => console.log('Data set.'));
  };

  const handle = () => {
    callBackMethod();
    generateToken();
  };

  const generateToken2 = async seatId => {
    leave();
    const paramsBody = {
      channelName: channelName,
      uid: parseInt(uid),
      role: 'RolePublisher',
    };
    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'get-token',
        verb: 'POST',
      });
      if (res?.token) {
        join2(res?.token, seatId);
      }
    } catch (error) {
      console.log('Hostpage screen, generatetoken func', error);
    }
  };

  const join2 = async (tok, seatId) => {
    //console.log("token from funct", tok, " ", isCoHost)
    if (tok) {
      try {
        agoraEngineRef.current?.startPreview();
        //console.log("inhost", tok)
        agoraEngineRef.current?.joinChannel(tok, channelName, parseInt(uid), {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });

        agoraEngineRef.current.disableVideo()
        // setJoinCall(false)
        rldbCoHost(seatId);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('no token', token);
    }
  };

  const rldbCoHost = seatId => {
    setExitCall(true);
    console.log('enter');

    try {
      const currentDate = new Date();
      if (seatId) {
        console.log('seat id', seatId);
        database().ref(`/cohostaudioTest/${channelName}/${uid}`).set({
          id: uid,
          full_name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
          image: userUpdatedData?.image,
          name: userData?.user?.nick_name,
          sender_level: userUpdatedData?.sender_level,
          reciever_level: userUpdatedData?.reciever_level,
          json_image: frameData?.[0]?.json_image,
          isMicOn: isMicOn.toString(),
          seatId: seatId,
          giftsReceived: 0,
          date: currentDate.toString(),
        });
      } else {
        console.log('not seat id', seatId);

        let counter = 0;
        cohsotData?.map(item => {
          if (
            item?.value === null &&
            !item?.isLocked &&
            counter === 0 &&
            parseInt(item?.id) !== 1
          ) {
            counter = counter + 1;
            rldbCoHost(item?.id);
          }
          return item;
        });
      }
    } catch (e) {
      console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', e);
    }
  };

  const UpdateHostBeans = async () => {
    const paramsBody = {
      id: liveID,
    };

    try {
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'user/host-updated-data',
        verb: 'POST',
      });

      console.warn(res.data.coins);
      setupdatedCoins(res.data.coins);

      // console.log('Getting HOST BEANS ===>>',res?.data?.coins)
      // setHostUpdatedCoins(res?.data?.coins)
    } catch (error) { }
  };

  useFocusEffect(
    useCallback(() => {
      UpdateHostBeans();
    }, []),
  );

  const JoinCallModal = props => {
    return (
      <View
        style={{
          height: heightPercentageToDP(25),
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderRadius: 15,
        }}>
        <Call
          onPressAPllyBtn={() => {
            firebaseWrite();
          }}
          flipCamera={() => flipCameraHandle()}
          handleCamera={() => handleCamera()}
          camera={camera}
          isMicOn={isMicOn}
          handleMicButton={() => handleMicButton()}
        />
      </View>
    );
  };

  const index = FollowingHost.findIndex(item => item?.id == liveID);

  const GetGifts = async () => {
    try {
      const res = await getGiftsList({ token: userData?.token });
      setGettingGiftsArray(res);
      setselectGiftBtn({
        title: res?.[0]?.title,
        category: res?.[0]?.child_categorie,
      });
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  const getUpdatedUserData = async () => {
    try {
      const res = await ApiUpdateUserData({
        params: userData.token,
        paramsBody: userData.user.id,
        route: 'user/updated-data',
        verb: 'POST',
      });
      dispatch(updateUserData(res?.data));
    } catch (e) {
      console.log('send gift error is -- ', e.toString());
    }
  };

  const GetHostLevelForMatching = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'host/levelsList',
        verb: 'GET',
      });

      const settingUserLevel = res.data.map(item => item);
      const beansForMatching = res.data.map(item => item?.beans);
      const reversed = settingUserLevel.reverse();
      const result = reversed.find(obj => obj.beans <= completeData?.received_beans);

      if (result == null) {
        //console.log('result iss...', result, hostReceiverLevel, route.params);
        setHostLevel(0);
      } else {
        setHostLevel(result.slug);
      }
    } catch (e) {
      console.log('Errorrrr ==========?>>>>> -- ', e.toString());
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('heloooooooooooooooooo');
      GetGifts();
      getUpdatedUserData();
      GetHostLevelForMatching();
    }, []),
  );



  const [messsageR, setMessageR] = useState(null);
  const [messages, setMessages] = useState([
    {
      colorType: '#41C2D2',
      uid: '-NMh31232k',
      message:
        'Sexual or violent content is strictly Prohibited.All violators will be banned.Do not expose your personal info such as Phone or location.',
    },
    {
      name: userData?.user?.nick_name,
      message: 'has entered the room',
    },
  ]);
  const checkDate = new Date();

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/commentsaudio/${channelName}`)
      .on('child_added', snapshot => {
        // console.log('new message node: 2  ', snapshot.val());
        checkfun(snapshot.val());
      });

    const checkfun = val => {
      let messageDate = new Date(val?.date);

      if (messageDate?.getTime() > checkDate.getTime() + 3000) {
        setMessages(prev => [...prev, val]);
      }
    };

    // Stop listening for updates when no longer required
    return () => {
      database()
        .ref(`/commentsaudio/${channelName}`)
        .off('child_added', onChildAdd);
      //setMessages([])
    };
  }, []);

  const [cohostlist, setcohostlist] = useState([]);
  const [cohsotData, setCohostData] = useState(COHOST_DATA);

  const leaveAsCohost = () => {
    database()
      .ref(`/cohostaudioTest/${channelName}/${userUpdatedData?.id}`)
      .remove();
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const handlePress = index => {
    setSelectedItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(item => item !== index);
      } else {
        //console.log("check ...prev", ...prev)
        return [...prev, index];
      }
    });
  };

  const [lockSeatData, setLockSeatData] = useState(null);
  const handleSeatsLock = () => {
    database()
      .ref(`/cohostaudioTest/${channelName}/lockedSeats`)
      .on('child_changed', snapshot => {
        // console.log('lockseats audio user ', snapshot.val());
        {
          snapshot.val()?.seatId && setLockSeatData(snapshot.val());
        }
      });
  };

  const handleLongPress = () => { };

  const handleSeatsLockAdded = () => {
    database()
      .ref(`/cohostaudioTest/${channelName}/lockedSeats`)
      .on('child_added', snapshot => {
        // console.log('lockseats ', snapshot.val());
        {
          snapshot.val()?.seatId && setLockSeatData(snapshot.val());
        }
      });
  };

  useEffect(() => {
    // console.log("locked", lockSeatData)
    setCohostData(
      cohsotData.map((item, index) => {
        if (parseInt(lockSeatData?.seatId) === parseInt(item?.id)) {
          return {
            ...item,
            isLocked: lockSeatData?.status !== 'Locked' ? false : true,
          };
        }
        return item;
      }),
    );
    setLockSeatData(null);
  }, [lockSeatData]);

  const bookSeat = seatId => {
    const checkSeat = cohsotData?.filter(item => item?.id === parseInt(seatId));
    {
      checkSeat?.[0]?.isLocked == false && generateToken2(seatId);
    }
  };

  const handleCohost = data => {
    data && setCoHost1ID(data);
  };

  useEffect(() => {
    if (coHost1Id?.id) {
      let counter = 0;
      setCohostData(
        cohsotData.map(item => {
          if (
            item?.value === null &&
            !item?.isLocked &&
            counter === 0 &&
            parseInt(item?.id) === parseInt(coHost1Id?.seatId)
          ) {
            counter = counter + 1;
            return {
              ...item,
              value: 'book',
              name: coHost1Id?.full_name,
              image: coHost1Id?.image,
              cohostID: coHost1Id?.id,
              json_image: coHost1Id?.json_image,
              giftsReceived: coHost1Id?.giftsReceived
            };
          }
          return item;
        }),
      );
    }

    if (cohostlist.indexOf({ coHost1Id }) !== -1) {
      console.log(`${coHost1Id} is available in the array`);
    } else {
      console.log(`${coHost1Id} is not available in the array`);
    }
  }, [coHost1Id]);

  const coHostChildRemove = () => {
    database()
      .ref(`/cohostaudioTest/${channelName}`)
      .on('child_removed', snapshot => {
        // console.log("remove 1" ,snapshot.val())
        removeCohost(snapshot.val()?.id);
      });
  };
  const [itemRemove, setItemRemvoe] = useState();
  function removeCohost(itemToRemove) {
    // console.log("remove 2" ,itemRemove)
    setItemRemvoe(itemToRemove);
  }

  useEffect(() => {
    // console.log("remove 3" ,itemRemove)
    let index = cohostlist.indexOf(itemRemove);
    if (index !== -1) {
      let newCohostList = [...cohostlist];
      newCohostList.splice(index, 1);
      setcohostlist(newCohostList);
    }
    if (itemRemove) {
      let counter = 0;
      setCohostData(
        cohsotData.map(item => {
          if (parseInt(item?.cohostID) === parseInt(itemRemove)) {
            counter = counter + 1;
            return { ...item, value: null, cohostID: null };
          }
          return item;
        }),
      );
    }
    // console.log('yesssssssss', itemRemove)
    if (parseInt(itemRemove) === parseInt(userUpdatedData?.id)) {
      leaveAndGenerateUserToken();
    }
    setItemRemvoe(0);
  }, [itemRemove]);

  const leaveAndGenerateUserToken = async () => {
    // console.log("remove 4" ,itemRemove)
    await leave();
    generateToken();
  };

  const deleteCoHostNode = async () => {
    await database().ref(`/cohostaudioTest/${channelName}/${uid}`).remove();
  };

  const rldbSendMessage = async (disableComments, mentionedUser) => {
    if (!disableComments) {
      const currentDate = new Date();
      //console.log(currentDate);
      const newNodeKey = database()
        .ref()
        .child(`/commentsaudio/${channelName}`)
        .push().key;
      await database()
        .ref(`/commentsaudio/${channelName}/` + newNodeKey)
        .set({
          id: uid,
          name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
          sender_level: userUpdatedData?.sender_level,
          reciever_level: userUpdatedData?.reciever_level,
          sender_level_image: userUpdatedData?.sender_level_image,
          reciever_level_image: userUpdatedData?.reciever_level_image,
          image: userUpdatedData?.image,
          badge: userUpdatedData?.badge,
          message: messsageR,
          mentionedUser: mentionedUser,
          uid: newNodeKey,
          date: currentDate.toString(),
        });
    } else {
      Alert.alert("You are muted by host.")
    }
    setMessageR('');
    Keyboard.dismiss();
  };

  const entryMessage = async () => {
    const currentDate = new Date();
    // console.log(currentDate);
    const newNodeKey = database()
      .ref()
      .child(`/commentsaudio/${channelName}`)
      .push().key;
    await database()
      .ref(`/commentsaudio/${channelName}/` + newNodeKey)
      .set({
        id: uid,
        name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
        message: 'has entered the room',
        uid: newNodeKey,
        sender_level: userUpdatedData?.sender_level,
        reciever_level: userUpdatedData?.reciever_level,
        sender_level_image: userUpdatedData?.sender_level_image,
        reciever_level_image: userUpdatedData?.reciever_level_image,
        badge: userUpdatedData?.badge,
        date: currentDate.toString(),
      });
  };

  const handleSingleUserData = singleuser => {
    setSingleUserData(singleuser);
    list && setList(!list);
    {
      (singleuser?.sender_level || singleuser?.reciever_level) &&
        ProfileRef.current.open();
    }
  };

  // keyboard functions to hide and show and set height of input
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', event => {
      setKeyboardHeight(event.endCoordinates.height);
      //console.log('Keyboard height:', keyboardHeight);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');

      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const textInputRef = useRef(null);
  const [mentionedUser, setMentionedUser] = useState(false);

  const handleButtonPress = (mentionedUser) => {

    Keyboard.dismiss();
    setMentionedUser(mentionedUser)
    textInputRef.current.focus();
  }

  const [value, setValue] = useState([]);
const [giftReceived, setGiftReceived] = useState(null);

const checkGiftStatus = () => {
  database()
    .ref(`/giftsaudio/${channelName}`)
    .on('child_added', snapshot => {
      // console.log("<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>.")
      receiveGiftFromFirebase(snapshot.val());
    });
};

  
const removeElementAtIndex0 = () => {
  const newArray = [...value];
  newArray.shift();
  setValue(newArray);
};

const getGlobalNotifications = () => {
  database()
    .ref(`/globalNotificationQ`)
    .on('child_added', snapshot => {
      //  console.log('globalNotifications', snapshot.val());
       globalPatti(snapshot.val());
    });
};

const globalPatti = (val) => {
  let messageDate = new Date(val?.date);
  if (messageDate?.getTime() > checkDate.getTime() + 500) {
    const newItem = val;
    if(val?.beans) {  
      setValue(prevData => {
        if (prevData.includes(newItem)) {
          return prevData;
        } else {
          return [...prevData, newItem];
        }
      });
    }
   
  }
}

const [isFollowing, setIsFollowing] = useState(true);
const checkFollowUser = async () => {
  const res = await checkUserFollowing({
    token: userData?.token,
    host_id: completeData?.id,
  });
  setIsFollowing(res?.data === 1 ? true : false);
};

const handleFollowUser = async () => {
  const res = await followHost({
    id: completeData?.id,
    token: userData?.token,
  });
  if (res?.[0].code === '200') {
    entryMessage('Has follow the host')
    setIsFollowing(true);
  }
};

const receiveGiftFromFirebase = (val, fromPk) => {
  let messageDate = new Date(val?.date);
  if (messageDate?.getTime() > checkDate.getTime() + 500) {
    const newItem = val;
    // if(val?.beans) {  
    //   setValue(prevData => {
    //     if (prevData.includes(newItem)) {
    //       return prevData;
    //     } else {
    //       return [...prevData, newItem];
    //     }
    //   });
    // }
     setGiftReceived(val);
   
    // UpdateUserData();
  }
};

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        {/* <Button title='hello' onPress={() => rldbCoHost()}>hello</Button> */}
        <ImageBackground
          source={
            hostBgTheme
              ? { uri: hostBgTheme }
              : require('../../assets/images/audioBackImage.png')
          }
          style={styles.Bg}>
          {/* <Text>{JSON.stringify(cohostlist)}</Text> */}
          <View style={{ position: 'absolute', zIndex: 5 }}>
            <View>
              {/* header complete */}
              <TopLineFinalComponet
              onPressFollow={() => handleFollowUser()}
              isFollowing={isFollowing}
                onpresS={FlatListController}
                data={data}
                data2={data.length * 9}
                hostId={completeData?.id}
                hostImage={completeData?.image}
                starLevelImage={completeData?.star_level_image}
                userUpdateDataNickName={completeData?.nick_name ?? completeData?.full_name}
                fromAudiencePage={true}
                onPressHostImage={() => {
                  setSingleUserData(completeData)
                  ProfileRef.current.open()
                }
                }
                onPress2={() => {
                  modal2Ref.current.open();
                  UpdateHostBeans();
                }}
                onPressStarLevel={() => modalRef.current.toggleModal()}
                onPressCross={() => navigation.goBack()}
                updatedCoins={completeData?.coins}
              />
            </View>

          </View>

          <View>
            <View style={{ flex: 1 }}>
              {/* <Text>Remote user uid: {remoteUid}</Text> */}

              <View style={{ height: screenHeight, width: '100%' }}>
                <View
                  style={{
                    position: 'absolute',
                    bottom: keyboardHeight + 2,
                    left: keyboardHeight != 0 ? 0 : 20,
                    backgroundColor:
                      keyboardHeight == 0 ? 'transparent' : 'white',
                    zIndex: 50,
                    justifyContent: 'space-evenly',
                    height: 60,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width:
                        keyboardHeight == 0 ? '0%' : widthPercentageToDP(100),
                    }}>
                    <TextInput
                      ref={textInputRef}
                      style={[
                        keyboardHeight != 0 && styles.input,
                        { color: 'white', width: '85%' },
                      ]}
                      onChangeText={text => setMessageR(text)}
                      value={messsageR}
                      maxLength={25}
                      // value={message}
                      placeholder="Leave a comment..."
                      placeholderTextColor="grey"
                    />
                    {keyboardHeight != 0 && (
                      <TouchableOpacity
                        onPress={() => rldbSendMessage(disableComments, mentionedUser)}
                        style={styles.icon1box}>
                        <Feather name="send" size={16} color="white" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                
                <View style={[styles.overlay, { bottom: 80, right: 15 }]}>
                  {exitCall && (
                    //  firebaseWrite()
                    <TouchableOpacity
                      style={{ width: 60 }}
                      onPress={() => leaveAsCohost()}>
                      <View
                        style={{
                          backgroundColor: '#191D26',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 5,
                          paddingVertical: 10,
                          borderRadius: 5,
                        }}>
                        <Image
                          source={require('../../assets/images/join.png')}
                          style={{ height: 20, width: 20 }}
                        />
                        <Text style={{ fontSize: 10, color: 'white' }}>
                          Exit Call
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.bottombox1}>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      height: '100%',
                      bottom: 30,
                      width: '60%',
                    }}>
                    <View style={{ justifyContent: 'flex-end', maxHeight: 250 }}>
                      <CommentsComponent
                        message={messages}
                        onPressComment={item => handleSingleUserData(item)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View
                    style={{
                      zIndex: 4,
                      position: 'absolute',
                      height: heightPercentageToDP(75),
                    }}>
                  <LuckyGiftAnimationPatti data={luckyGiftData} designText={designText} luckyBonusReward={luckyBonusReward} />
                  </View>

            <View
              style={{
                position: 'absolute',
                zIndex: 4,
                top: heightPercentageToDP(10),
                width: widthPercentageToDP(100),
              }}>
              <View style={{ height: 20, marginBottom: 10, top: 30, zIndex: 5 }}>
              <GiftAnimationPattiGlobal value={value?.[0]} removeItem={removeElementAtIndex0} />
              </View>
              <SeatsLogic
                takeSeat={bookSeat}
                cohostData={cohsotData}
                handleLongPress={handleLongPress}
                handlePress={handlePress}
                callAllow={joinCall}
                handleAnimationEnd={(data) => setHanldeUserMic(data)}
              />
            </View>

            {giftReceived && 
          <View style={{position: 'absolute', zIndex: 4, height: heightPercentageToDP(100), width: widthPercentageToDP(100)}}>
             <Rnfetchblob giftData = {giftReceived} handleAnimationEnded={() => setGiftReceived(false)} />
            </View>
          }
            {/* <View style={globalStyles.animatedGiftViewStyle}>
              <AnimatedGiftView
                updateCoins={() => {
                  console.log("hitting new cons")
                  // dispatch(updatedData(userData))
                }}
                channelName={channelName}
                cohostData={cohsotData} />
            </View> */}



            <View style={[styles.bottombox]}>
              <TouchableOpacity style={{}}>
                <TouchableOpacity
                  onPress={() => handleButtonPress()}
                  style={styles.icon1box}>
                  <Feather name="message-circle" size={24} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  exitCall && handleMicButton(exitCall);
                }}
                style={styles.icon1box}>
                <Feather
                  name={isMicOn ? 'mic' : 'mic-off'}
                  size={22}
                  color="orange"
                />
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => shareToWhatsApp(hostName, channelName)}
                style={styles.icon1box}>
                <Simple name="share-alt" size={20} color="#FFE000" />
              </TouchableOpacity> */}

              <View style={styles.lefticonsbox}>
                <TouchableOpacity
                  onPress={() => {
                    msgRef.current.open();
                  }}
                  style={styles.icon1box}>
                  <AllIcons
                    name={IconList.MaterialIcons}
                    iconName={
                      messageArray?.[0] ? 'messenger' : 'messenger-outline'
                    }
                    size={22}
                    color={'#c471ed'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.icon1box}
                  onPress={() => stickerSheetRef.current.open()}>
                    <AllIcons name={IconList?.Entypo} iconName={'emoji-happy'} color={'white'} size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.icon1box}
                  onPress={() => gameSheetRef.current.open()}>
                  <Entypo name="game-controller" color="#12c2e9" size={22} />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    Gift.current.open();
                  }}>
                  <LinearGradient
                    style={[styles.icon2box]}
                    name="gift"
                    colors={['#c471ed', '#f64f59']}>
                    <FontAwesome
                      name="gift"
                      size={20}
                      style={[
                        styles.giftIcon,
                        {
                          color: 'white',
                        },
                      ]}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {list && (
            <UserList
              data={data}
              onPressCross={FlatListController}
              onPressSingleUser={handleSingleUserData}
            />
          )}

          <RbSheetComponent
            view={
              <GameSheet />
            }
            refUse={gameSheetRef}
            backgroundColor={'white'}
            close={true}
            height={heightPercentageToDP(30)}
          />

          <RbSheetComponent
            view={<MessageSheet onCrossPress={() => msgRef.current.close()} />}
            refUse={msgRef}
            backgroundColor={'white'}
            close={false}
            height={heightPercentageToDP(40)}
          />

          <RbSheetComponent
            view={
              <GiftSheetData
                giftsData={gettingGiftsArray}
                channelName={channelName}
                cohostData={cohsotData}
                // socket={socket}
              />
            }
            refUse={Gift}
            close={true}
            height={'50%'}
          />

          <RbSheetComponent
            view={
              <EmojiListSheet
                channelName={channelName}
                cohostData={cohsotData}
              />
            }
            backgroundColor={'transparent'}
            refUse={stickerSheetRef}
            close={false}
            height={300}
          />



          <RbSheetComponent
            view={
              <FansRanking 
                liveID={liveID}
                userData={userData}
                onPressCross={() => modal2Ref.current.close()}
              />
            }
            refUse={modal2Ref}
            close={false}
            height={heightPercentageToDP(50)}
          />


          <StarModal
            view={
              <DailyStar onPressCross={() => modalRef.current.toggleModal()} />
            }
            ref={modalRef}
          />

          <RbSheetComponent
            view={
              <ProfileModalStyles
                data={singleUserData}
                onPress={() => ProfileRef.current.close()}
                onPressCros={() => ProfileRef?.current?.close()}
                onPressMention={async (mentionedUser) => {
                  ProfileRef?.current?.close()
                  await delay(1000)

                  handleButtonPress(mentionedUser)
                }}
              />
            }
            refUse={ProfileRef}
            close={false}
            backgroundColor={'transparent'}
            height={heightPercentageToDP(55)}
          />

          <StarModal
            view={
              <JoinCallModal
                onPress={() => joinCallModalRef.current.toggleModal()}
              />
            }
            ref={joinCallModalRef}
          />
        </ImageBackground>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  audioCohostNameStyle: {
    marginTop: 2,
    color: white,
  },
  commentContainer: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    fontSize: 10,
  },
  bottombox1: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    zIndex: 4,
    paddingVertical: 15,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: { height: '100%', alignItems: 'center' },
  scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
  scrollContainer: { alignItems: 'center' },
  videoView: { width: '100%', height: '100%' },
  btnContainer: { flexDirection: 'row', justifyContent: 'center' },
  head: { fontSize: 20 },
  info: { backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff' },

  overlay: {
    position: 'absolute',
    zIndex: 10,
    //backgroundColor: 'white',
    right: 5,
    bottom: 150,
  },
  overlayContainer: {
    position: 'absolute',
    zIndex: 1,
    //backgroundColor: 'white',
    left: 20,
    top: 20,
  },
  cohostStyle: {
    width: 120,
    height: 150,
    borderWidth: 3,
  },
  border: {
    width: 120,
    height: 154,
    borderWidth: 2,
    borderColor: 'white',
  },
  container: {
    flex: 1,
  },
  profilecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  txtbox: {
    marginLeft: 3,
  },
  id: {
    color: 'white',
    fontSize: 10,
  },
  name: {
    color: 'white',
    fontSize: 12,
  },
  profilebox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 30,
    marginHorizontal: 5,
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 2,
    width: 135,
  },
  profile: {
    height: 35,
    width: 35,
    borderRadius: 25,
  },
  crossIcon: {
    color: 'white',
    right: 2,
  },
  flowbox: {
    marginLeft: 0,
    backgroundColor: 'red',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noTxt: {
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 25,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
  Bg: {
    height: '100%',
    width: '100%',
  },
  Likebox: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  Kbox: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Ktxt: {
    color: 'white',
    fontSize: 11,
  },
  Starbox: {
    backgroundColor: 'green',
    paddingHorizontal: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Startxt: {
    color: 'white',
    fontSize: 11,
  },
  commentcontainer: {
    marginTop: heightPercentageToDP(5),
    width: '70%',
  },
  commentbox: {
    marginVertical: 5,
    marginLeft: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 25,
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  commenttxt: {
    color: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  LvIcon: {
    color: 'white',
    backgroundColor: 'orange',
    borderRadius: 25,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    height: 17,
    justifyContent: 'center',
    fontSize: 11,
    top: 1,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '75%',
    borderRadius: 25,
    marginLeft: 10,
    paddingHorizontal: 13,
    height: 40,
    color: 'white',
  },
  bottombox: {
    top: heightPercentageToDP(94),
    flexDirection: 'row',
    width: widthPercentageToDP(100),
    justifyContent: 'flex-start',
    zIndex: 5,
  },
  lefticonsbox: {
    flexDirection: 'row',
    width: '83%',
  },
  righticonsbox: {
    flexDirection: 'row',
    position: 'absolute',
    right: 5,
  },
  icon2box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  giftIcon: {
    color: 'white',
    marginHorizontal: 1,
  },
  icon1box: {
    backgroundColor: '#19162A',
    height: 35,
    width: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: widthPercentageToDP(4),
  },
  FlatListView: {
    paddingHorizontal: 15,
  },
  FlatListView1: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  rbIconbox1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rbIconbox2: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    paddingBottom: 10,
    alignSelf: 'center',
  },
  gameIconView: {
    alignItems: 'center',
    width: '25%',
    marginBottom: heightPercentageToDP(3),
  },
  gameIconbox: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  gametxt: {
    color: '#FFFFFF',
    width: 90,
    textAlign: 'center',
  },
  headingtxt1: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 15,
    borderRadius: 3,
  },
  headingtxt2: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 15,
    borderRadius: 3,
    marginBottom: 15,
  },
  IconView: {
    alignItems: 'center',
    paddingVertical: heightPercentageToDP(2),
    marginHorizontal: 3,
  },
  ViewerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  profileViewerbox: {
    flexDirection: 'row',
    marginLeft: 10,
    paddingVertical: 5,
  },
  hostBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: heightPercentageToDP(5),
    marginVertical: 14,
  },
  iconBg: {
    backgroundColor: '#303749',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon1: {
    color: '#FFFFFF',
  },
  headingtxt: {
    color: 'white',
    marginLeft: 15,
    fontSize: 15,
    fontWeight: '400',
    backgroundColor: '#3A3A3A',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 3,
  },
  rbIconbox: {
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  Likebox: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  Kbox: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Ktxt: {
    color: 'white',
    fontSize: 11,
  },
  Starbox: {
    backgroundColor: 'green',
    paddingHorizontal: 5,
    borderRadius: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Startxt: {
    color: 'white',
    fontSize: 11,
  },
  container: {
    flex: 1,
  },
  flatContainer: {
    height: 600,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    zIndex: 11,
    // padding: 20,
  },
  flatListHeaderText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  flatInnerContainer: {
    height: 80,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  listImage: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelTextContainer: {
    backgroundColor: '#27B0FF',
    height: 20,
    width: 50,
    borderRadius: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  listText: {
    flex: 7,
    justifyContent: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  flatListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 20,
    alignItems: 'center',
  },
  headerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  headerImage: {
    height: 32,
    width: 32,
    borderRadius: 18,
    marginHorizontal: 5,
  },
  headerCounter: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: 30,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 5,
  },
  headerCross: {
    marginLeft: 10,
  },
  text: {
    color: 'white',
  },
});
export default AudioCallUsers;
