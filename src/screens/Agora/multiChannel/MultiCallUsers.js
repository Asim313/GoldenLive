import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  Keyboard,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import RbSheetComponent from '../../reuseable_Component/RbSheetComponent';
import StarModal from '../../reuseable_Component/StarModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import React, {useRef, useState, useEffect} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {ApiCallToken, ApiUpdateUserData} from '../../../Services/Apis';
import {
  AlertNotificationRoot,
} from 'react-native-alert-notification';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {listenLuckyGiftSocket, luckyGiftCounter, updateHostBeans, updateVolumeIndication, updatedData} from '../../../Redux/Actions';
import LinearGradient from 'react-native-linear-gradient';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';

import database from '@react-native-firebase/database';
import Feather from 'react-native-vector-icons/Feather';
import DeviceInfo from 'react-native-device-info';
import Call from '../../home_screens/Call';
import ProfileModalStyles from '../../reuseable_Component/ProfileModalStyle';
import UserList from '../components/UserList';
import FansRanking from '../../reuseable_Component/FansRanking';
import GiftSheetData from '../../../components/BottomGiftSheet/GiftSheetData';
import AnimatedGiftView from '../../../components/ShowAnimatedGift/AnimatedGift';
import globalStyles from '../../../utils/styles/global-styles';
import MessageSheet from '../components/MessageSheet';
import AllIcons, {IconList} from '../../../components/AllIcons';
import DailyStar from '../../../components/DailyStar';
import {Alert} from 'react-native';
import {BackHandler} from 'react-native';
import CommentsComponent from '../components/CommentsComponent';
import GameSheet from '../../../components/GamesSheet';
import TopLineFinalComponet from '../components/StreamHeader/TopLineFinalComponet';
import MultiSeatsLogic from './multiSeatsLogic/MultiSeatsLoigic';
import GiftAnimationPattiGlobal from '../components/giftAnimationPattiGlobal';
import { checkUserFollowing, checkUserIsAdminOrNot, followHost } from '../../../Services/ApisCall';
import UserOptionsList from '../../../components/UserOptionsList';
import LuckyGiftAnimationPatti from '../../../components/Animation/LuckyGiftAnimationPatti';
import ReportUser from '../../../components/ReportUser';
import { shareToWhatsApp } from '../../reuseable_Component/SocialShare';


const screenHeight = Dimensions.get('window').height;

const MultiCallUsers = props => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit Streaming!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.goBack('Streams')},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);


  const {route} = props;
  const {params} = route;
  const { completeData } = params;

  const [updatedCoins, setupdatedCoins] = useState();
  const navigation = useNavigation();

  const gameSheetRef = useRef();
  const userOptionsListRef = useRef();

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
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  //console.log("user11", userUpdatedData)
  const dispatch = useDispatch();
  // console.log('Updated data for beans', userData?.user);
  const [FollowingHost, setFollowingHost] = useState([]);
  useKeepAwake();

  //my code

  //console.log("Routes", route.params)
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(userData?.user?.id);
  const [channelName, setChannelName] = useState(route?.params?.channelName);
  const agoraEngineRef = useRef(IRtcEngine);
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(route?.params?.isHost); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [exitCall, setExitCall] = useState(false);
  const [selectSeats, setSelectSeats] = useState(0);

  const [coHost1Id, setCoHost1ID] = useState(null);

  const [joinCall, setJoinCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [flipCamera, setFlipCamera] = useState(true);
  const [camera, setCamera] = useState(true);
  const [hostBgTheme, setHostBgTheme] = useState(null);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const lucky = useSelector(state => state.hostRed.luckyGiftData);
  const socket = useSelector(state => state?.homeRed?.socketConnection);
  const datetimekk = new Date();
  const nullData = {
    authorization: userData?.token,
      num_gift: 1, 
      gift_id: null,
      host_ids: null,
      auth_id: userUpdatedData?.id,
      count_gift: 0,
      date_time : datetimekk.toString(),
      channel: channelName
  };

  useEffect(() => {
    if(!lucky) {
      socket.emit('LuckyGift',nullData);
      dispatch(listenLuckyGiftSocket(false))
    }

    return () => {
    
    }
  }, [lucky])

  useEffect(() => {
    // Initialize Agora engine when the app starts
    initialFunctions()
    return () => {
      console.log('cleaned up');
      agoraEngineRef.current.unregisterEventHandler(agoraEvents);
      removeUserFromNode();
      leave();
      database().ref().off();
    };
  }, []);

  const initialFunctions = async () => {
    dispatch(luckyGiftCounter(null))
    await handle();
    firebaseFunc();
    entryMessage();
    addToUserList();
    onUserRemove();
    coHostChildRemove();
    coHostChildChange();
    getUserListFromRLDB();
    handleSeatsLockAdded();
    handleSeatsLock();
    getGlobalNotifications();
    muteUser();
    senddddddd();
    checkFollowUser()
    inviteUserToSeat()
    checkRoomAdminOrNot()
    checkAdmin()
  }

  const handleMicButton = () => {
    console.log('yesssssss', exitCall, !isMicOn);
    if (agoraEngineRef.current.muteLocalAudioStream) {
      setIsMicOn(!isMicOn);
      if (isMicOn) {
        console.log('val');
        agoraEngineRef.current.muteLocalAudioStream(true);
        database()
          .ref(`/cohostMultiRoom/${channelName}/${userUpdatedData?.id}`)
          .update({
            isMicOn: 'false',
          });
      } else {
        console.log('val2');
        agoraEngineRef.current.muteLocalAudioStream(false);
        database()
          .ref(`/cohostMultiRoom/${channelName}/${userUpdatedData?.id}`)
          .update({
            isMicOn: 'true',
          });
      }
    }
    // { isMicOn ? agoraEngineRef.current.muteLocalAudioStream(true) : agoraEngineRef.current.muteLocalAudioStream(false) }
  };

  const [disableComments, setDisableComments] = useState(false);

  const muteUser = async () => {
    database()
      .ref(`/muteList/${channelName}`)
      .on('child_added', snapshot => {
        console.log('mutedddddd added', snapshot.val()?.id);
        if (parseInt(snapshot.val()?.id) === parseInt(userUpdatedData?.id)) {
          setDisableComments(true);
        }
      });

    database()
      .ref(`/muteList/${channelName}`)
      .on('child_removed', snapshot => {
        console.log('mutedddddd removed', snapshot.val()?.id);
        if (parseInt(snapshot.val()?.id) === parseInt(userUpdatedData?.id)) {
          setDisableComments(false);
        }
      });
  };

  const flipCameraHandle = () => {
    setFlipCamera(!flipCamera);
    agoraEngineRef.current.switchCamera();
  };

  const handleCamera = () => {
    setCamera(!camera);
    agoraEngineRef.current.muteLocalVideoStream(!camera ? true : false)
      database().ref(`/cohostMultiRoom/${channelName}/${uid}`).update({
        isCamersOn: camera ? 1 : 0
      });

  };

  const firebaseFunc = () => {
    database()
      .ref(`/multiRoom/${channelName}`)
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

    console.log("kkkkkkkk", filtered)
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
    {
      val?.totalSeats && setSelectSeats(parseInt(val?.totalSeats));
    }
  };

  useEffect(() => {
    console.log('cohost99', channelName);
    const onChildAdd = database()
      .ref(`/cohostMultiRoom/${channelName}`)
      .on('child_added', snapshot => {
        {
          snapshot.val()?.id && handleCohost(snapshot.val());
        }
      });
    return () => {
      database()
        .ref(`/cohostMultiRoom/${channelName}`)
        .off('child_added', onChildAdd);
      deleteCoHostNode();
    };
  }, []);

  const [handleUserMic, setHanldeUserMic] = useState(null);
  const coHostChildChange = () => {
    database()
      .ref(`/cohostMultiRoom/${channelName}`)
      .on('child_changed', snapshot => {
        {
          snapshot.val()?.id && setHanldeUserMic(snapshot.val());
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
    if (handleUserMic?.id) {
      setCohostData(
        cohsotData.map(item => {
          if (parseInt(item?.cohostID) === parseInt(handleUserMic?.id)) {
            return {
              ...item,
              isMicOn: handleUserMic?.isMicOn,
              giftsReceived: handleUserMic?.giftsReceived,
              isCamersOn: handleUserMic?.isCamersOn,
              isHost: handleUserMic?.isHost,
              isAdmin: handleUserMic?.isAdmin,
              seatId: handleUserMic?.seatId,
              json_image: handleUserMic?.json_image,

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
      .ref(`/multiRoom/${channelName}/${uid}`)
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

  const generateToken = async (skipJoin) => {
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
      // console.log("checkkng and geneerateo toekn", res)
      if (res?.data?.token) {
        join(res?.data?.token, skipJoin);
      } else {
        navigation.goBack()
        alert('' + res?.message)
      }
    } catch (error) {
      console.log('audiocalluser screen, generatetoken func', error);
    }
  };

  const join = async (tok, skipJoin) => {
    setExitCall(false);
     console.log("remove 6" ,isJoined)
    if (tok) {
      if (isJoined  && skipJoin) {
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

        agoraEngineRef.current.enableAudioVolumeIndication(1000, 3, true)
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
    } catch (e) {
      console.log(e);
    }
  };

  const agoraEvents = {
    onJoinChannelSuccess: () => {
      setIsJoined(true);
      // console.log('joined channel');
    },
    onUserJoined: (_connection, Uid) => {
      setRemoteUid(Uid);
    },
    onUserOffline: (_connection, Uid) => {
      setRemoteUid(0);
      console.log('user offline', Uid);
    },
    onAudioVolumeIndication: (connection, speakers, speakerNumber, totalVolume) => {
      //  console.log('onAudioVolumeIndication ==> ', speakers, speakers?.[0]?.uid,  connection?.localUid, 'speakers', speakers?.[0]?.volume, 'speakerNumber', speakerNumber, 'totalVolume', totalVolume );
      if(speakers?.[0]?.volume >= 30) {
        dispatch(updateVolumeIndication({id: speakers?.[0]?.uid === 0 ?  connection?.localUid : speakers?.[0]?.uid, volume: speakers?.[0]?.volume}))
        // setActiveSpeakerValue({id: connection?.localUid, volume: speakers?.[0]?.volume})
      } else {
        // dispatch(updateVolumeIndication({id: speakers?.[0]?.uid === 0 ?  connection?.localUid : speakers?.[0]?.uid, volume: 0}))
       // setActiveSpeakerValue(false)
      }
      },
  };

  const callBackMethod = () => {
    agoraEngineRef.current = createAgoraRtcEngine();
    const agoraEngine = agoraEngineRef.current;
    agoraEngine.enableVideo();
    agoraEngine.registerEventHandler(agoraEvents);
  };



  const sendEntryGift = () => {
    const node = `/giftsMultiRoom/${channelName}`;
    const currentDate = new Date();
    const newNodeKey = database().ref().child(node).push().key;

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
  };

  const [value, setValue] = useState([]);

  const getGlobalNotifications = () => {
    database()
      .ref(`/globalNotificationQ`)
      .on('child_added', snapshot => {
        //  console.log('globalNotifications', snapshot.val());
         globalPatti(snapshot.val());
      });
  };


  const [isRoomAdmin, setIsRoomAdmin] = useState(false)

  const checkRoomAdminOrNot = () => {
    database()
      .ref(`/RoomAdmin/${channelName}`)
      .on('child_added', snapshot => {
        //  console.log('globalNotifications', snapshot.val());
         if(parseInt(snapshot?.val().admin_id) === parseInt(userUpdatedData?.id)) {
            setIsRoomAdmin(true)
         }
      });

    database()
      .ref(`/RoomAdmin/${channelName}`)
      .on('child_removed', snapshot => {
         if(parseInt(snapshot?.val().admin_id) === parseInt(userUpdatedData?.id)) {
            setIsRoomAdmin(false)
         }
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

  const removeElementAtIndex0 = () => {
    const newArray = [...value];
    newArray.shift();
    setValue(newArray);
  };
  
 

  const checkAdmin = async () => {
    const res = await checkUserIsAdminOrNot({channelName: channelName, token: userData?.token})
    console.log('>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<', res)
    if(res?.is_admin === 1) {
      setIsRoomAdmin(true)
    } else { setIsRoomAdmin(false)}
  }
  const senddddddd = async () => {
    await delay(1000);
    {
      entryFrame?.[0] && sendEntryGift();
    }
  };

  const getUserListFromRLDB = () => {
    //console.log("node3")
    const onChildAdd = database()
      .ref(`/userlistMultiRoom/${channelName}`)
      .on('child_added', snapshot => {
        //console.log('userlistMultiRoom ', snapshot.val());
        setData(prev => [...prev, snapshot.val()]);
      });
    // Stop listening for updates when no longer required
    return () => {
      database()
        .ref(`/userlistMultiRoom/${channelName}`)
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


  const [tes, setTes] = useState(null);
  const onUserRemove = () => {
    database()
      .ref(`/userlistMultiRoom/${channelName}`)
      .on('child_removed', snapshot => {
        //console.log('removeChild7 ', snapshot.val());
        setTes(snapshot.val()?.id);
      });
  };

  useEffect(() => {
    // if hostleft the channel
    {
      // parseInt(channelName) === parseInt(tes) && leave();
    }

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
    database().ref(`/multiRoom/${channelName}/${uid}`).remove();
    //console.log("7")
    await database()
      .ref(`/userlistMultiRoom/${channelName}/${uid}`)
      .remove()
      .then(() => console.log('successfully user removed from channel'));

      database()
      .ref(`/multiRoomInviteUser/${channelName}/${userUpdatedData?.id}`)
      .remove();

  };

  const addToUserList = async () => {
    // console.log("userdata", userData?.user)
    await database()
      .ref(`/userlistMultiRoom/${channelName}/${uid}`)
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

  const handle = async () => {
    callBackMethod();
   await generateToken(true);
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
        database()
          .ref(`/cohostMultiRoom/${channelName}/${uid}`)
          .set({
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
            isAdmin: isRoomAdmin.toString(),
            date: currentDate.toString(),
            isCamersOn: 0
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

  const UpdateUserData = async () => {
    dispatch(updatedData(userData));
  };

  useFocusEffect(
    useCallback(() => {
      console.log('heloooooooooooooooooo');
      UpdateUserData();
    }, []),
  );

  const [messsageR, setMessageR] = useState(null);
  const [messages, setMessages] = useState([
    {
      colorType: '#41C2D2',
      uid: '-NMh31232k',
      message:
        'Sexual or violent content is strictly Prohibited.All violators will be banned.Do not expose your peronal info such as Phone or location.',
    },
    {
      colorType: 'white',
titleColor: userUpdatedData?.user_type_id === 3 ? '#FF51E3' : '#03FFF0',
      name: userData?.user?.nick_name,
      message: 'has entered the room',
    },
  ]);
  const checkDate = new Date();

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/commentsMulti/${channelName}`)
      .on('child_added', snapshot => {
        // console.log('new message node: 2  ', snapshot.val());
        checkfun(snapshot.val());
      });

      socket.on('GameWinningPatti', data => {
        checkfun(data, true);
      });

    const checkfun = (val, dontCheckTime) => {
      let messageDate = new Date(val?.date);

      if (messageDate?.getTime() > checkDate.getTime() + 3000 || dontCheckTime) {
        setMessages(prev => [...prev, val]);
      }
    };

    // Stop listening for updates when no longer required
    return () => {
      database()
        .ref(`/commentsMulti/${channelName}`)
        .off('child_added', onChildAdd);

        socket.off('GameWinningPatti')
    };
  }, []);

  const [cohostlist, setcohostlist] = useState([]);
  const [cohsotData, setCohostData] = useState([
    {id: 1, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#971748', '#450920']},
    {id: 2, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#606C38', '#293916']},
    {id: 3, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#780C10', '#32030C']},
    {id: 4, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#AF6B31', '#583101']},
    {id: 5, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#025D88', '#01253B']},
    {id: 6, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#203F67', '#1B263B']},
    {id: 7, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#B14104', '#662400']},
    {id: 8, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#5F6160', '#222725']},
    {id: 9, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#9B2021', '#550A0D']},
    {id: 10, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#284B63', '#031926']},
    {id: 11, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#606C38', '#293916']},
    {id: 12, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#780C10', '#32030C']},
    {id: 13, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#AF6B31', '#583101']},
    {id: 14, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#025D88', '#01253B']},
    {id: 15, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#203F67', '#1B263B']},
    {id: 16, value: null, isLocked: false, isMicOn: 'true', giftsReceived: 0, seatColors: ['#B14104', '#662400']},
  ]);

  const leaveAsCohost = () => {
    database()
      .ref(`/cohostMultiRoom/${channelName}/${userUpdatedData?.id}`)
      .remove();
    database()
      .ref(`/multiRoomInviteUser/${channelName}/${userUpdatedData?.id}`)
      .remove();
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const handlePress = data => {
    console.log("indexxxxxxxxxxxxxxxxxx", data, isRoomAdmin)
    setSelectedItems(data);
    if(data?.cohostID && isRoomAdmin) {
      userOptionsListRef.current.open()
      // cohostRemoveRef.current.open();
      } else if(data?.cohostID) {
        Gift.current.open()
      }
    // setSelectedItems(prev => {
    //   if (prev.includes(index)) {
    //     return prev.filter(item => item !== index);
    //   } else {
    //     //console.log("check ...prev", ...prev)
    //     return [...prev, index];
    //   }
    // });
  };

  // const [luckyGiftData, setLuckyGiftData] = useState(null)
  // const [designText, setDesignText] = useState(null)
  // const [luckyBonusReward, setLuckyBonusReward] = useState(null)
  // const socket = useSelector(state => state?.homeRed?.socketConnection)

  // useEffect(() => {
  //   if (socket) {
  //     console.log('useeffect ');
  
    
  //     socket.on('connected', data => {
  //       console.log('connected node', data);
  //     });
  
  //     socket.on('LuckyGiftSend', response => {
  //       console.log('Lucky gift', response);
  //       setLuckyGiftData(response);
  //       if (response?.message === 1) {
  //         console.log('statusssssssssssssssssssssssssssssssssssssssssssss');
  //         setLuckyGiftData(null);
  //       }
  //     });
  
   
  //     socket.on('notEnoughBeans', function (result) {
  //       alert("Don't have enough beans.")
  //       console.log('Received notEnoughBeans:', result);
  //     });
  //     socket.on('ChannelJoinMessage', (data) => {
  //       console.log('Channel Join Messages >>> :', data);
  //     });
  //     socket.on('ChannelLeaveMessage', (data) => {
  //       console.log('ChannelLeaveMessage >>> :', data);
  //     });
  
  
      
  //     socket.on('LuckyCountImage', response => {
  //       console.log('count bonus text', response?.message);
  //       setDesignText(response?.message);
  //       // setLuckyGiftData(response?.message)
  //     });
  
  //     socket.on('LuckyGiftReward', response => {
  //       console.log('rewardLucky', response?.message);
  //       setLuckyBonusReward(response);
  //     });
  
  //     socket.on('error', err => {
  //       console.log('Error to the server', err);
  //     });
  
  //     socket.on('updatedBeans', data => {
  //       console.log('user updated beans', data);
  //       dispatch(updateHostBeans(data?.message ?? 0));
  //     });
  
  //     socket.emit('channelJoin', {channel: channelName});
  //   }
  
  //   return () => {
  //     if (socket) {
  //       socket.off('connected');
  //       socket.off('error');
  //       socket.off('Lucky Gift');
  //       socket.off('updatedBeans');
  //       socket.off('countImage');
  //       socket.off('rewardLucky');
  //       socket.off('ChannelJoinMessage');
  //       socket.off('ChannelLeaveMessage');
  //       socket.off('notEnoughBeans');
  //       socket.emit('channelLeave', {channel: channelName});
  //     }
  //   };
  // }, [socket]);

  // useEffect(() => {
  //   database()
  //     .ref(`/LuckyGift/${channelName}`)
  //     .on('child_added', snapshot => {
  //       {
  //         let messageDate = new Date(snapshot?.val()?.dateTime);
  //         // console.log("snpshkkkkkkkkkkk", snapshot?.val(), messageDate?.getTime() > checkDate.getTime() + 500)
  //         if (snapshot?.val() && messageDate?.getTime() > checkDate.getTime() + 500) {
  //           if(snapshot.val()?.count !== "0") {
  //               setLuckyGiftData(snapshot.val())
  //             }
  //             else  {
  //               setLuckyGiftData(null)
  //             }
  //         }
            
  //       }
  //     });
  // }, []);

  const handleViewProfileFromSheet = (userData) => {
    // console.log('kkkkkkkllllllll',  data?.filter((item) => parseInt(item?.id) === parseInt(userData?.cohostID)))
     let res =  data?.filter((item) => parseInt(item?.id) === parseInt(userData?.cohostID))
     res?.[0] && handleSingleUserData(res?.[0])
 }

 const handleMuteUser = userData => {
  userOptionsListRef.current.close()
  console.log(userData);
  if(parseInt(userData?.cohostID) !== parseInt(channelName)) {
  database()
    .ref(`/cohostMultiRoom/${channelName}/${userData?.cohostID}`)
    .update({
      isMicOn: userData?.isMicOn === 'true' ? 'false' : 'true',
    });
  } else {
    alert("You can't mute host.")
  }
  setSelectedItems(null);
};

const handleKickUser = (data) => {
  userOptionsListRef.current.close()
if(parseInt(data?.cohostID) !== parseInt(channelName)) {
  database()
  .ref(`/cohostMultiRoom/${channelName}/${data?.cohostID}`)
  .remove();
  database()
  .ref(`/multiRoomInviteUser/${channelName}/${data?.cohostID}`)
  .remove();
} else {
  alert("You can't kick host.")
}
  setSelectedItems(null);
}

  const [lockSeatData, setLockSeatData] = useState(null);
  const handleSeatsLock = () => {
    database()
      .ref(`/cohostMultiRoom/${channelName}/lockedSeats`)
      .on('child_changed', snapshot => {
        // console.log('lockseats audio user ', snapshot.val());
        {
          snapshot.val()?.seatId && setLockSeatData(snapshot.val());
        }
      });
  };

  const handleLongPress = () => {};

  const handleSeatsLockAdded = () => {
    database()
      .ref(`/cohostMultiRoom/${channelName}/lockedSeats`)
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
            isHost: lockSeatData?.isHost,
            giftsReceived: lockSeatData?.giftsReceived,
            seatId: lockSeatData?.seatId,

          };
        }
        return item;
      }),
    );
    setLockSeatData(null);
  }, [lockSeatData]);


  const inviteUserToSeat = () => {
    database()
    .ref(`/multiRoomInviteUser/${channelName}`)
    .on('child_added', snapshot => {
      {
        if(snapshot.val()?.id && snapshot.val().id === userUpdatedData?.id){
          bookSeat(snapshot.val()?.seatId)
          alert('You have been added by host on call')
        }
      }
    });
  }

  const bookSeat = seatId => {
    console.log('book seat id ', seatId)
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
              giftsReceived: coHost1Id?.giftsReceived,
              isCamersOn: coHost1Id?.isCamersOn,
              isHost: coHost1Id?.isHost,
              isAdmin: coHost1Id?.isAdmin,
              seatId: coHost1Id?.seatId,
              json_image: coHost1Id?.json_image,
              
            };
          }
          return item;
        }),
      );
    }

    if (cohostlist.indexOf({coHost1Id}) !== -1) {
      console.log(`${coHost1Id} is available in the array`);
    } else {
      console.log(`${coHost1Id} is not available in the array`);
    }
  }, [coHost1Id]);

  const coHostChildRemove = () => {
    database()
      .ref(`/cohostMultiRoom/${channelName}`)
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
            return {...item, value: null, cohostID: null};
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
    setIsJoined(false)
    generateToken(false);
  };

  const deleteCoHostNode = async () => {
    await database().ref(`/cohostMultiRoom/${channelName}/${uid}`).remove();
  };

  const rldbSendMessage = async (disableComments, mentionedUser) => {
    if (!disableComments) {
      const currentDate = new Date();
      //console.log(currentDate);
      const newNodeKey = database()
        .ref()
        .child(`/commentsMulti/${channelName}`)
        .push().key;
      await database()
        .ref(`/commentsMulti/${channelName}/` + newNodeKey)
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
          isAdmin: isRoomAdmin,
          colorType: 'white',
titleColor: userUpdatedData?.user_type_id === 3 ? '#FF51E3' : '#03FFF0',
          date: currentDate.toString(),
        });
    } else {
      Alert.alert('You are muted by host.');
    }
    setMessageR('');
    Keyboard.dismiss();
  };

  const entryMessage = async () => {
    dispatch(updateHostBeans(completeData?.coins))
    const currentDate = new Date();
    // console.log(currentDate);
    const newNodeKey = database()
      .ref()
      .child(`/commentsMulti/${channelName}`)
      .push().key;
    await database()
      .ref(`/commentsMulti/${channelName}/` + newNodeKey)
      .set({
        id: uid,
        name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
        message: 'has entered the room',
        uid: newNodeKey,
        sender_level: userUpdatedData?.sender_level,
        reciever_level: userUpdatedData?.reciever_level,
        sender_level_image: userUpdatedData?.sender_level_image,
        reciever_level_image: userUpdatedData?.reciever_level_image,
        colorType: 'white',
titleColor: userUpdatedData?.user_type_id === 3 ? '#FF51E3' : '#03FFF0',
        isAdmin: isRoomAdmin,
        badge: userUpdatedData?.badge,
        date: currentDate.toString(),
      });
  };


  const userListRef = useRef()
  const FlatListController = () => {
    userListRef?.current?.open()
  };
  const handleUserListClose = () => {
     userListRef?.current?.close()
  };

  const handleSingleUserData = singleuser => {
    
    setSingleUserData(singleuser);
    userListRef.current.close()
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
  const reportSheetRef = useRef();

  const handleReportButton = () => {
    ProfileRef?.current?.close();
    reportSheetRef.current.open();
  };

  const handleButtonPress = mentionedUser => {
    Keyboard.dismiss();
    setMentionedUser(mentionedUser);
    textInputRef.current.focus();
  };
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

  const [muteAllSpeaker, setMuteAllSpeaker] = useState(false)
const hanldeOnPressSpeaker = () => {
  agoraEngineRef.current.muteAllRemoteAudioStreams(muteAllSpeaker ? false : true)
  setMuteAllSpeaker(!muteAllSpeaker)
}

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        {/* <Button title='hello' onPress={() => rldbCoHost()}>hello</Button> */}
        <ImageBackground
          source={
            hostBgTheme
              ? { uri: hostBgTheme }
              : require('../../../assets/images/audioBackImage.png')
          }
          style={styles.Bg}>
          {/* <Text>{JSON.stringify(cohostlist)}</Text> */}
          <View style={{position: 'absolute', zIndex: 5}}>
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
                userUpdateDataNickName={
                  completeData?.nick_name ?? completeData?.full_name
                }
                fromAudiencePage={true}
                onPressHostImage={() => {
                  setSingleUserData(completeData);
                  ProfileRef.current.open();
                }}
                onPress2={() => {
                  modal2Ref.current.open();
                }}
                onPressStarLevel={() => modalRef.current.toggleModal()}
                onPressCross={() => navigation.goBack()}
              />
            </View>
          </View>

          <View>
            <View style={{flex: 1}}>
              {/* <Text>Remote user uid: {remoteUid}</Text> */}

              <View style={{height: screenHeight, width: '100%'}}>
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
                        {color: 'white', width: '85%'},
                      ]}
                      onChangeText={text => setMessageR(text)}
                      value={messsageR}
                      // maxLength={25}
                      // value={message}
                      placeholder="Leave a comment..."
                      placeholderTextColor="grey"
                    />
                    {keyboardHeight != 0 && (
                      <TouchableOpacity
                        onPress={() =>
                          rldbSendMessage(disableComments, mentionedUser)
                        }
                        style={styles.icon1box}>
                        <Feather name="send" size={16} color="white" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <View style={[styles.overlay, {bottom: 80, right: 15}]}>
                  {exitCall && (
                    //  firebaseWrite()
                    <TouchableOpacity
                      style={{width: 60}}
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
                          source={require('../../../assets/images/join.png')}
                          style={{height: 20, width: 20}}
                        />
                        <Text style={{fontSize: 10, color: 'white'}}>
                          Exit Call
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.bottombox1}>
                      <CommentsComponent
                        message={messages}
                        onPressComment={item => handleSingleUserData(item)}
                      />
              
                </View>
              </View>
            </View>


            <View
                    style={{
                      zIndex: 5,
                      position: 'absolute',
                      height: heightPercentageToDP(75),
                    }}>
                  <LuckyGiftAnimationPatti channelName={channelName} />
                  </View>
            <View
              style={{
                position: 'absolute',
                zIndex: 4,
                top: heightPercentageToDP(7),
                width: widthPercentageToDP(100),
              }}>

              <View style={{height: 20, marginBottom: 10, top: heightPercentageToDP(8), zIndex: 5}}>
              <GiftAnimationPattiGlobal value={value?.[0]} removeItem={removeElementAtIndex0} />
              </View>
              <MultiSeatsLogic
                takeSeat={bookSeat}
                cohostData={cohsotData}
                handleLongPress={handleLongPress}
                handlePress={handlePress}
                callAllow={joinCall}
                selectSeats={selectSeats}
              />
            </View>

            <View style={globalStyles.animatedGiftViewStyle}>
              <AnimatedGiftView
              userData={userData}
                channelName={channelName}
                cohostData={cohsotData}
              />
            </View>

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
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity
        onPress={hanldeOnPressSpeaker}
        style={[styles.icon1box]}>
        <AllIcons name={IconList.FontAwesome} iconName={!muteAllSpeaker ? 'volume-up' : 'volume-off'} size={20} color={'white'} />
      </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // shareToWhatsApp(hostName, channelName)
                  handleCamera()
                }}
                style={styles.icon1box}>
                  <AllIcons name={IconList.Entypo} iconName={'camera'} size={20} color={'white'} />
                {/* <Simple name="share-alt" size={20} color="#FFE000" /> */}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  shareToWhatsApp(completeData?.nick_name ?? completeData?.full_name, channelName)
                  // handleCamera()
                }}
                style={styles.icon1box}>
                  {/* <AllIcons name={IconList.Entypo} iconName={'camera'} size={20} color={'white'} /> */}
                <AllIcons name={IconList.FontAwesome} iconName="share" size={20} color="#FFE000" />
              </TouchableOpacity>

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
                    color={'white'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.icon1box}
                  onPress={() => gameSheetRef.current.open()}>
                  <Entypo name="game-controller" color="white" size={22} />
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


          <RbSheetComponent
              view={
              <UserOptionsList
              channelName={channelName} 
              selectedUsers={selectedItems}
               isRoomAdmin={isRoomAdmin}
               onPressKick={handleKickUser} 
               onPressViewProfile={handleViewProfileFromSheet}
               onPressMuteUser={handleMuteUser} 
               onPressSendGift={() => {
                userOptionsListRef.current.close()
                Gift.current.open()}} 
               onPressCancel={() => {
                userOptionsListRef.current.close()
              }} 
               />}
              backgroundColor={'transparent'}
              refUse={userOptionsListRef}
              close={false}
              height={heightPercentageToDP(35)}
            />

          <RbSheetComponent
              view={
                <UserList
                data={data}
                onPressCross={handleUserListClose}
                onPressSingleUser={handleSingleUserData}
              />
              }
              refUse={userListRef}
              backgroundColor={'rgba(255, 255, 255, 0.3)'}
              close={false}
              height={heightPercentageToDP(70)}
            />

          <RbSheetComponent
            view={<GameSheet />}
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
              onPressClose={() => Gift.current.close()}
              sendGiftTo={[selectedItems]}
                channelName={channelName}
                cohostData={cohsotData}
              />
            }
            refUse={Gift}
            close={true}
            height={'50%'}
          />

          <RbSheetComponent
            view={
              <FansRanking
                liveID={channelName}
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
                onPresReport={() => {isRoomAdmin && handleReportButton()}}
                onPressCros={() => ProfileRef?.current?.close()}
                onPressMention={async mentionedUser => {
                  ProfileRef?.current?.close();
                  await delay(1000);

                  handleButtonPress(mentionedUser);
                }}
              />
            }
            refUse={ProfileRef}
            close={false}
            backgroundColor={'transparent'}
            height={heightPercentageToDP(55)}
          />

<RbSheetComponent
            view={
              <ReportUser
                userData={singleUserData}
                channelName={channelName}
                onPressCross={() => reportSheetRef.current.close()}
                fromAudio={true}
              />
            }
            refUse={reportSheetRef}
            close={false}
            height={heightPercentageToDP(30)}
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

  bottombox1: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    height: heightPercentageToDP(25),
    zIndex: 5,
    paddingVertical: 15,
  },
  overlay: {
    position: 'absolute',
    zIndex: 10,
    right: 5,
    bottom: 150,
  },
  container: {
    flex: 1,
  },
  Bg: {
    height: '100%',
    width: '100%',
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
    marginHorizontal: widthPercentageToDP(2),
  },
  
});
export default MultiCallUsers;
