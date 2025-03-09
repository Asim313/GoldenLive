import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import RbSheetComponent from '../../reuseable_Component/RbSheetComponent';

import {primaryColor, transparent} from '../../../utils/Styles';
import StarModal from '../../reuseable_Component/StarModal';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {Switch} from 'react-native-paper';

import {ApiCallToken} from '../../../Services/Apis';

import {ClientRoleType, ChannelProfileType} from 'react-native-agora';
import database from '@react-native-firebase/database';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import ProfileModalStyles from '../../reuseable_Component/ProfileModalStyle';
import FansRanking from '../../reuseable_Component/FansRanking';
import UserList from '../components/UserList';
import {Keyboard} from 'react-native';
import {Alert} from 'react-native';
import {BackHandler} from 'react-native';
import MessageSheet from '../components/MessageSheet';
import {seatsDummyData} from '../../../utils/DummyData/DummyData';

import GiftSheetData from '../../../components/BottomGiftSheet/GiftSheetData';
import AnimatedGiftView from '../../../components/ShowAnimatedGift/AnimatedGift';
import globalStyles from '../../../utils/styles/global-styles';
import DailyStar from '../../../components/DailyStar';
import KeyBoardTextInput from '../../home_screens/KeyBoardTextInput';
import CommentsComponent from '../components/CommentsComponent';
import StreamingBottomMenu from '../components/StreamingBottomMenu';
import GameSheet from '../../../components/GamesSheet';
import {
  listenLuckyGiftSocket,
  luckyGiftCounter,
  updateHostBeans,
  updateVolumeIndication,
  updatedData,
} from '../../../Redux/Actions';
import ReportUser from '../../../components/ReportUser';
import TopLineFinalComponet from '../components/StreamHeader/TopLineFinalComponet';
import MP3Player from '../components/mp3Player/mp3Player';
import AudioMenuSheet from '../../../components/AudioMenuSheet';
import ChangeTheme from '../../../components/changeThemeComponent';
import MultiSeatsLogic from './multiSeatsLogic/MultiSeatsLoigic';
import MicOptions from './multiSeatsLogic/MicOptions';
import {
  generateAgoraToken,
  getHostCoins,
  heartBeatInterval,
  makeHostLiveStatusInactive,
  makeUserAdmin,
  removeUserAdmin,
} from '../../../Services/ApisCall';
import GiftAnimationPattiGlobal from '../components/giftAnimationPattiGlobal';
import CohostCallsList from '../../../components/CohostCallsList';
import UserOptionsList from '../../../components/UserOptionsList';
import LuckyGiftAnimationPatti from '../../../components/Animation/LuckyGiftAnimationPatti';
import { shareToWhatsApp } from '../../reuseable_Component/SocialShare';

export default MultiCallHost = props => {
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

  useKeepAwake();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const gameSheetRef = useRef();
  const changeThemeRef = useRef();
  const userOptionsListRef = useRef();
  const reportSheetRef = useRef();
  const mp3PlayerRef = useRef();
  const cohostRemoveRef = useRef();

  const msgRef = useRef();
  const AllowCall = useRef();
  const stickerSheetRef = useRef();
  const refRBSheetOptions = useRef();
  const refRBSheetOptions2 = useRef();

  const [switch1, setswitch1] = useState(false);

  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const messageArray = useSelector(state => state.homeRed.unseenMessages);
  const userData = useSelector(state => state.auth.userData);
  const active_store = useSelector(state => state.homeRed.activeStoreData);
  const frameData = active_store?.filter(
    item => item?.parent_title === 'Frames',
  );
  const themeData = active_store?.filter(
    item => item?.parent_title === 'Theme',
  );

  const [bgTheme, setBgTheme] = useState(themeData?.[0]?.json_image)
  const entryFrame = active_store?.filter(
    item => item?.parent_title === 'Garage',
  );
  
  //console.log("user data11", userUpdatedData)
  const {route} = props;
  const {params} = route;
  const {userID, userName, liveID} = params;

  //my code

  //console.log("Routes", route.params)
  const [uid, setUid] = useState(route?.params?.uid);
  const [channelName, setChannelName] = useState(route?.params?.channelName);

  const agoraEngineRef = useRef(route?.params?.agoraEngineRe); // Agora engine instance
  // console.log("kkkkkklllllllllllllllllllllllllllllll>>>>>>>>>>>>>>>..", agoraEngineRef?.current.getConnectionState())

  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(route?.params?.isHost); // Client role

  const [messages, setMessages] = useState([
    {
      colorType: '#41C2D2',
      uid: '-NMh31232k',
      message:
        'Sexual or violent content is strictly Prohibited.All violators will be banned.Do not expose your personal info such as Phone or location.',
    },
  ]);
  const [coHost1Id, setCoHost1ID] = useState(null);
  const [callRequests, setCallRequests] = useState([]);

  const checkDate = new Date();
  const [showTextInput, setShowTextInput] = useState(false);
  const [mentionedUser, setMentionedUser] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);

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

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const handleChatButton = mentionedUser => {
    console.log('mentaaaaaaaaaaaaaaaaaaaaaaaaaaaa', mentionedUser);
    setShowTextInput(false);
    setTimeout(() => {
      setShowTextInput(true);
      setMentionedUser(mentionedUser);
    }, 300);
    refRBSheetOptions.current.close();
  };

  useEffect(() => {

    database()
      .ref(`/multiRoom/${channelName}/theme`)
      .on('value', snapshot => {
        {
          console.log("thememe", snapshot.val())
          snapshot.val() && setBgTheme(snapshot.val())
        }
      });

    const onChildAdd = database()
      .ref(`/multiRoom/${channelName}`)
      .on('child_added', snapshot => {
        {
          snapshot.val() && firebaseFunc(snapshot.val());
        }
      });
    // Stop listening for updates when no longer required
    return () => {
      // database().ref(`/multiRoom/${channelName}`).remove();
      // database().ref(`/giftsMultiRoom/${channelName}`).remove();
    };
  }, []);

  const setGiftsDBToFirebase = async data => {
    await database().ref(`/giftsMultiRoom/${channelName}`).set({
      sendGifts: 'true',
    });
  };

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/commentsMulti/${channelName}`)
      .on('child_added', snapshot => {
        // console.log('new message node:  ', snapshot.val());
        checkfun(snapshot.val());
      });

      socket.on('GameWinningPatti', data => {
        checkfun(data, true);
      });
      // Stop listening for updates when no longer required
      return () => {
      socket.off('GameWinningPatti')
      database()
        .ref(`/commentsMulti/${channelName}`)
        .off('child_added', onChildAdd);

      deleteMessageNode();
      //setMessages([])
    };
  }, []);

  useEffect(() => {
    // console.log("===========================================================<")
    database()
      .ref(`/cohostMultiRoom/${channelName}`)
      .set({
        JoinCalls: 'true',
      })
      .then(() => {
        setCallRequests([]);
      });
  }, []);

  const [cohostData, setCohostData] = useState([
    {
      id: 1,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#971748', '#450920'],
    },
    {
      id: 2,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#606C38', '#293916'],
    },
    {
      id: 3,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#780C10', '#32030C'],
    },
    {
      id: 4,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#AF6B31', '#583101'],
    },
    {
      id: 5,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#025D88', '#01253B'],
    },
    {
      id: 6,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#203F67', '#1B263B'],
    },
    {
      id: 7,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#B14104', '#662400'],
    },
    {
      id: 8,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#5F6160', '#222725'],
    },
    {
      id: 9,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#9B2021', '#550A0D'],
    },
    {
      id: 10,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#284B63', '#031926'],
    },
    {
      id: 11,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#606C38', '#293916'],
    },
    {
      id: 12,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#780C10', '#32030C'],
    },
    {
      id: 13,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#AF6B31', '#583101'],
    },
    {
      id: 14,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#025D88', '#01253B'],
    },
    {
      id: 15,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#203F67', '#1B263B'],
    },
    {
      id: 16,
      value: null,
      isLocked: false,
      isMicOn: 'true',
      giftsReceived: 0,
      seatColors: ['#B14104', '#662400'],
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const handlePress = data => {
     console.log('id', data);
     setSelectedItems(data);
     if(data?.cohostID) {
      userOptionsListRef.current.open()
      // cohostRemoveRef.current.open();
      } else {
        userListRef.current.open()
     }
  };

  const handleViewProfileFromSheet = (userData) => {
     // console.log('kkkkkkkllllllll',  data?.filter((item) => parseInt(item?.id) === parseInt(userData?.cohostID)))
      let res =  data?.filter((item) => parseInt(item?.id) === parseInt(userData?.cohostID))
      res?.[0] && handleSingleUserData(res?.[0])
  }

  const updateAdminValue = async (data) => {
    await database()
    .ref(`/cohostMultiRoom/${channelName}/${data?.cohostID}`)
    .update({
      isAdmin: data?.isAdmin?.toString() === 'true' ? 'false' : 'true',
    });
    alert(data?.isAdmin?.toString() === 'true' ? 'Admin removed successfully.' : 'Admin created successfully.' + '')
  }

  const handleMakeAdmin = async (data) => {
    userOptionsListRef.current.close()
      const res = await makeUserAdmin({channelName: channelName, adminId: data?.cohostID, token: userData?.token})
      console.log('res')
      if(res?.code === 200) {
       updateAdminValue(data)
      }
      
      setSelectedItems(null);
  }

  const handleRemoveFromAdmin = async (data) => {
    userOptionsListRef.current.close()
      const res = await removeUserAdmin({token: userData?.token, adminId: data?.cohostID, channelName: channelName})
      console.log('res', res)
      if(res?.code === 200) {
        updateAdminValue(data)
      }
      setSelectedItems(null);
  }

  const handleMuteUser = userData => {
    userOptionsListRef.current.close()
    console.log(userData);
    database()
      .ref(`/cohostMultiRoom/${channelName}/${userData?.cohostID}`)
      .update({
        isMicOn: userData?.isMicOn === 'true' ? 'false' : 'true',
      });
    setSelectedItems(null);
  };

  const handleKickUser = (data) => {
    userOptionsListRef.current.close()

    database()
      .ref(`/cohostMultiRoom/${channelName}/${data?.cohostID}`)
      .remove();
    database()
      .ref(`/multiRoomInviteUser/${channelName}/${data?.cohostID}`)
      .remove();
      setSelectedItems(null);
  }

  const handleLongPress = (value, isLocked) => {
    console.log('value', value, isLocked);
    lockSeatsRealTime(value, isLocked);
  };

  const lockSeatsRealTime = (seatId, isLocked) => {
    console.log('sss', seatId, isLocked);
    database()
      .ref(`/cohostMultiRoom/${channelName}/lockedSeats/${seatId}`)
      .set({
        seatId: seatId,
        status: isLocked ? 'Available' : 'Locked',
      })
      .then(() => {
        console.log('done data send to fb');
      });
  };

  const [lockSeatData, setLockSeatData] = useState(null);
  const handleSeatsLock = () => {
    database()
      .ref(`/cohostMultiRoom/${channelName}/lockedSeats`)
      .on('child_changed', snapshot => {
        // console.log('lockseats ', snapshot.val());
        {
          snapshot.val()?.seatId && setLockSeatData(snapshot.val());
        }
      });
  };

  const handleReportButton = () => {
    ProfileRef?.current?.close();
    reportSheetRef.current.open();
  };

  const [handleUserMic, setHanldeUserMic] = useState(null);
  const coHostChildChange = () => {
    database()
      .ref(`/cohostMultiRoom/${channelName}`)
      .on('child_changed', snapshot => {
        {
          snapshot.val()?.id && setHanldeUserMic(snapshot.val());
        }
      });
  };

  useEffect(() => {
    if (handleUserMic?.id) {
      setCohostData(
        cohostData.map(item => {
          if (parseInt(item?.cohostID) === parseInt(handleUserMic?.id)) {
            return {
              ...item,
               id:  parseInt(handleUserMic?.seatId),
              isMicOn: handleUserMic?.isMicOn,
              giftsReceived: handleUserMic?.giftsReceived,
              sticker: handleUserMic?.sticker,
              receiverSeatY: handleUserMic?.sendToPositionY,
              receiverSeatX: handleUserMic?.sendToPositionX,
              senderPositionY: handleUserMic?.fromPositionY,
              senderPositionX: handleUserMic?.fromPositionX,
              stickerImg: handleUserMic?.stickerImg,
              isHost: handleUserMic?.isHost,
              isAdmin: handleUserMic?.isAdmin,
              isCamersOn: handleUserMic?.isCamersOn,
              seatId: handleUserMic?.seatId,
              json_image: handleUserMic?.json_image,
            };
          }
          return item;
        }),
      );
    }
  }, [handleUserMic]);

  useEffect(() => {
    setCohostData(
      cohostData.map((item, index) => {
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



  useEffect(() => {
    // console.log("cohost92")
    const onChildAdd = database()
      .ref(`/cohostMultiRoom/${channelName}`)
      .on('child_added', snapshot => {
        {
          snapshot.val()?.id && handleCohost(snapshot.val());
        }
      });
    // Stop listening for updates when no longer required
    return () => {
      database()
        .ref(`/cohostMultiRoom/${channelName}`)
        .off('child_added', onChildAdd);
      database()
        .ref(`/cohostMultiRoom/${channelName}/${userUpdatedData?.id}`)
        .remove();
      deleteCoHostNode();
    };
  }, []);

  const handleCohost = txt => {
    txt && setCoHost1ID(txt);
  };

  useEffect(() => {
    if (coHost1Id?.id) {
      let counter = 0;
      setCohostData(
        cohostData.map(item => {
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
              isHost: coHost1Id?.isHost,
              isAdmin: coHost1Id?.isAdmin,
              isCamersOn: coHost1Id?.isCamersOn,
              seatId: coHost1Id?.seatId,
              json_image: coHost1Id?.json_image,
              // isMicOn: coHost1Id?.isMicOn
            };
          }
          return item;
        }),
      );
    }

  }, [coHost1Id]);

  const [itemRemove, setItemRemove] = useState();

  const coHostChildRemove = () => {
    database()
      .ref(`/cohostMultiRoom/${channelName}`)
      .on('child_removed', snapshot => {
        {
          snapshot.val()?.id && setItemRemove(snapshot.val()?.id);
        }
      });
  };

  useEffect(() => {
    if (itemRemove) {
      let counter = 0;
      setCohostData(
        cohostData.map(item => {
          if (parseInt(item?.cohostID) === parseInt(itemRemove)) {
            counter = counter + 1;
            return {...item, value: null, cohostID: null};
          }
          return item;
        }),
      );
      setItemRemove(null);
    }
  }, [itemRemove]);

  const deleteCoHostNode = async () => {
    await database()
      .ref(`/cohostMultiRoom/${channelName}/${userUpdatedData?.id}`)
      .remove();
  };

  const deleteMessageNode = async () => {
    await database()
      .ref(`/commentsMulti/${channelName}/${userUpdatedData?.id}`)
      .remove();
  };

  const checkfun = (val, dontCheckTime) => {
    let messageDate = new Date(val?.date);

    if (messageDate?.getTime() >= checkDate.getTime() || dontCheckTime) {
      setMessages(prev => [...prev, val]);
    }
  };

  const firebaseFunc = val => {
    handleCohostList(val);
    //console.log("val101", val)
    setCallRequests(prev => [...prev, val]);
    // console.log("Firebase", val)

    handleCohostList();
  };

  const addJoinCallToFirebase = () => {
    database()
      .ref(`/multiRoom/${channelName}`)
      .set({
        JoinCalls: 'true',
        theme: themeData?.[0]?.json_image,
        totalSeats: selectSeats,
      })
      .then(() => {
        setCallRequests([]);
      });
  };

  const handleCohostList = () => {
    let check = callRequests.filter(
      (item, index) => callRequests.indexOf(parseInt(item)) === parseInt(index),
    );
    // console.log("filtering", check)
  };

  const changeCohostStatus = id => {
    database()
      .ref(`/multiRoom/${channelName}/${id}`)
      .update({
        coHostID: parseInt(id),
        status: parseInt(1),
      })
      .then(() => {});
  };

  const [data, setData] = useState([]);

  const generateToken = async () => {
    const paramsBody = {
      channelName: channelName,
      uid: parseInt(uid),
      role: 'RolePublisher',
      streaming_status: 3,
    };
    try {
      const res = await generateAgoraToken({
        paramsBody: paramsBody,
        token: userData?.token,
      });

      console.log('jjjjjjjjjjjjjjjjjk', res);
      if (res?.data?.token) {
        join(res?.data?.token);
      } else {
        alert('' + res?.message);
      }
    } catch (error) {
      console.log('Audiocallhost screen, generatetoken func', error);
    }
  };

  const join = async tok => {
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
          agoraEngineRef.current?.joinChannel(tok, channelName, parseInt(uid), {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          });
        } else {
          agoraEngineRef.current?.joinChannel(tok, channelName, parseInt(uid), {
            clientRoleType: ClientRoleType.ClientRoleAudience,
          });
        }
        agoraEngineRef.current.enableAudioVolumeIndication(1000, 3, true);
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
      setIsJoined(false);
    } catch (e) {
      console.log(e);
    }
  };

  const [activeSpeakerValue, setActiveSpeakerValue] = useState(null);
  const agoraEvents = {
    onJoinChannelSuccess: () => {
      setIsJoined(true);
      rldbCoHost();
      setIsStopwatchStart(true);
      console.log('joined channel');
    },
    // onUserJoined: (_connection, Uid) => {
    //   console.log('user Joined', Uid);
    // },
    // onUserOffline: (_connection, Uid) => {
    //   console.log('user offline', Uid);
    // },
    // onActiveSpeaker: () => {
    //   console.log('acctiveeeee');
    // },
    onAudioVolumeIndication: (
      connection,
      speakers,
      speakerNumber,
      totalVolume,
    ) => {
      //  console.log('onAudioVolumeIndication ==> ', speakers, speakers?.[0]?.uid,  connection?.localUid, 'speakers', speakers?.[0]?.volume, 'speakerNumber', speakerNumber, 'totalVolume', totalVolume );
      if (speakers?.[0]?.volume >= 30) {
        dispatch(
          updateVolumeIndication({
            id:
              speakers?.[0]?.uid === 0
                ? connection?.localUid
                : speakers?.[0]?.uid,
            volume: speakers?.[0]?.volume,
          }),
        );
        // setActiveSpeakerValue({id: connection?.localUid, volume: speakers?.[0]?.volume})
      } else {
        // dispatch(
        //   updateVolumeIndication({
        //     id:
        //       speakers?.[0]?.uid === 0
        //         ? connection?.localUid
        //         : speakers?.[0]?.uid,
        //     volume: 0,
        //   }),
        // );
        // setActiveSpeakerValue(false)
      }
    },
  };
  const callBackMethod = () => {
    const agoraEngine = agoraEngineRef.current;
    agoraEngineRef.current?.adjustAudioMixingVolume(30);
    agoraEngine.registerEventHandler(agoraEvents);
    agoraEngineRef.current.muteLocalVideoStream(true);
    agoraEngine.enableVideo();
    agoraEngine.setVideoEncoderConfiguration({
      width: 120,
      height: 120,
      frameRate: 15,
    });
    agoraEngine.setBeautyEffectOptions(true, {
      lighteningContrastLevel: 1,
        lighteningLevel: 1,
        smoothnessLevel: 1,
        rednessLevel: 0.7,
    });
  };


  
  // const heartBeatInterval = async () => {
  //   try {
  //     const res = await ApiCallToken({
  //       params: userData.token,
  //       route: 'heart-beat',
  //       verb: 'GET',
  //     });
  //      console.log("HeartBeatInterval", res)
  //   } catch (error) {
  //     console.log('ERROR HeartBeatInterval ====>>>', error);
  //   }
  // };

  useEffect(() => {
    const intervalId = setInterval(() => {
      heartBeatInterval({token: userData?.token});
    }, 60000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const rldbCoHost = () => {
    const currentDate = new Date();
    try {
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
          seatId: '1',
          isMicOn: isMicOn.toString(),
          date: currentDate.toString(),
          giftsReceived: 0,
          isHost: 'true',
          isCamersOn: 0,
        });

      database()
        .ref(`/cohostMultiRoom/${channelName}/lockedSeats`)
        .set(seatsDummyData);
      handleSeatsLock();
    } catch (e) {
      console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', e);
    }
  };

  const inviteUserOnCall = seatId => {
    try {
      const currentDate = new Date();
      database()
        .ref(`/cohostMultiRoom/${channelName}/invitedGuestList/${seatId}`)
        .set({
          id: seatId,
          date: currentDate.toString(),
        });
    } catch (e) {
      console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', e);
    }
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

  useEffect(() => {
    dispatch(luckyGiftCounter(null))
    setGiftsDBToFirebase();
    entryMessage();
    addJoinCallToFirebase();
    addToUserList();
    // checkGiftStatus();
    firebaseFunc();
    callBackMethod();
    generateToken();
    checkupdate();
    onUserRemove();
    coHostChildRemove();
    coHostChildChange();
    getGlobalNotifications();
    senddddddd();
    // getUserData()
    // getUserListyByChannel()
    return () => {
      console.log('cleaned up');
      agoraEngineRef.current.unregisterEventHandler(agoraEvents);
      agoraEngineRef.current?.stopAudioMixing();
      deleteUserListNode();
      database().ref().off();
      makeHostLiveStatusInactive({token: userData?.token});
      leave();
    };
  }, []);

  const senddddddd = async () => {
    await delay(1000);
    {
      entryFrame?.[0] && sendEntryGift();
    }
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
        badge: userUpdatedData?.badge,
        status: '0',
        json_image: frameData?.[0]?.json_image,
      });
  };

  const checkupdate = () => {
    // console.log("node3")
    const onChildAdd = database()
      .ref(`/userlistMultiRoom/${channelName}`)
      .on('child_added', snapshot => {
        // console.log('addnode4 ', snapshot.val());
        const newUser = snapshot.val();
        // console.log("data", data)
        if (!data.some(user => user.id === newUser.id)) {
          setData(prev => [...prev, newUser]);
        }
      });
  };

  const [tes, setTes] = useState(null);

  const onUserRemove = () => {
    // console.log("node6")
    database()
      .ref(`/userlistMultiRoom/${channelName}`)
      .on('child_removed', snapshot => {
        // console.log('child_removed from userlist', snapshot.val());
        setTes(snapshot.val()?.id);
      });
  };

  // filtering data from user list when any user left the channel checking real time through database (tes) is the id that user left the channel we are getting real time user remove in tes
  useEffect(() => {
    // console.log("==============================00", callRequests, " ", callRequests?.filter((item) => parseInt(item?.coHostID) !== parseInt(tes)))
    {
      callRequests?.[0] &&
        tes &&
        setCallRequests(
          callRequests?.filter(
            item => parseInt(item?.coHostID) !== parseInt(tes),
          ),
        );
    }
    {
      tes != uid &&
        data?.[0] &&
        tes &&
        setData(data?.filter(item => item?.id !== tes));
    }
    setTes(null);
  }, [tes]);

  const deleteUserListNode = async () => {
    setIsStopwatchStart(false);
    await database()
      .ref(`/userlistMultiRoom/${channelName}/${userUpdatedData?.id}`)
      .remove();

      database()
      .ref(`/multiRoomInviteUser/${channelName}`)
      .remove();

  };


  const onToggleSwitch1 = () => {
    setswitch1(!switch1);
    database()
      .ref(`/multiRoom/${channelName}`)
      .update({
        JoinCalls: !switch1 ? 'true' : 'false',
      })
      .then(() => {
        setCallRequests([]);
      });
  };


  const modalRef = React.createRef();
  const modal2Ref = React.createRef();

  const ProfileRef = React.createRef();

  const [singleUserData, setSingleUserData] = useState();

  const handleSingleUserData = singleuser => {
    console.log("singel user data", singleuser )
    setSingleUserData(singleuser);
    userListRef.current.close();
    {
      (singleuser?.sender_level || singleuser?.reciever_level) &&
        ProfileRef.current.open();
    }
  };

  const [selectSeats, setSelectedSeats] = useState(9);
  const userListRef = useRef();
  const FlatListController = () => {
    userListRef?.current?.open();
  };
  const handleUserListClose = () => {
    userListRef?.current?.close();
  };

  const [isMicOn, setIsMicOn] = useState(true);
  const handleMicButton = () => {
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
  };

  const rldbSendMessage = async (txt, mentionedUser) => {
    const currentDate = new Date();
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
        message: txt,
        mentionedUser: mentionedUser,
        uid: newNodeKey,
        colorType: 'white',
titleColor: userUpdatedData?.user_type_id === 3 ? '#FF51E3' : '#03FFF0',
        date: currentDate.toString(),
      });
    // Keyboard.dismiss();
  };

  const entryMessage = async () => {
    dispatch(updateHostBeans(userUpdatedData?.coins))
    const currentDate = new Date();
    // console.log(currentDate);
    const newNodeKey = database()
      .ref()
      .child(`/commentsMulti/${channelName}`)
      .push().key;
    await database()
      .ref(`/commentsMulti/${channelName}/` + newNodeKey)
      .set({
        // id: uid,
        id: uid,
        name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
        message: 'has entered the room',
        sender_level: userUpdatedData?.sender_level,
        reciever_level: userUpdatedData?.reciever_level,
        sender_level_image: userUpdatedData?.sender_level_image,
        reciever_level_image: userUpdatedData?.reciever_level_image,
        badge: userUpdatedData?.badge,
        colorType: 'white',
        titleColor: userUpdatedData?.user_type_id === 3 ? '#FF51E3' : '#03FFF0',
        uid: newNodeKey,
        date: currentDate.toString(),
      });
  };

  const songVolume = useSelector(state => state.hostRed.songVolume);

  useEffect(() => {
    handleVolumeIndication(songVolume);
    console.log('<<<<<<<<<<<??????????>>>>>>>>>>>>>>>..');
  }, [songVolume]);

  const handleVolumeIndication = value => {
    agoraEngineRef.current?.adjustAudioMixingVolume(value);
  };
  const handleSongPause = value => {
    if (value) {
      agoraEngineRef.current?.resumeAudioMixing();
    } else {
      agoraEngineRef.current?.pauseAudioMixing();
    }
  };

  const selectedSong = useSelector(state => state.hostRed.songSelectedByUser);

  useEffect(() => {
    audioMixing(selectedSong?.uri, true);
  }, [selectedSong]);

  const pickMp3Files = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const audioMixing = (selectedFile, playAudioFile) => {
    if (!isJoined) {
      return;
    }
    console.log('selected file is', selectedFile);

    if (playAudioFile) {
      try {
        agoraEngineRef.current?.startAudioMixing(
          selectedFile,
          false, // loopback
          -1, // cycle
          0, // startpos
        );
        console.log('Audio mixing started');
      } catch (e) {
        console.log('Exception playing audio\n ${e.toString()}');
      }
    } else {
      agoraEngineRef.current?.stopAudioMixing();
    }
  };

  const [value, setValue] = useState([]);
  const [giftReceived, setGiftReceived] = useState(null);

  const checkGiftStatus = () => {
    database()
      .ref(`/giftsMultiRoom/${channelName}`)
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
        // console.log('globalNotifications', snapshot.val());
        globalPatti(snapshot.val());
      });
  };

  const globalPatti = val => {
    let messageDate = new Date(val?.date);
    if (messageDate?.getTime() > checkDate.getTime() + 500) {
      const newItem = val;
      if (val?.beans) {
        setValue(prevData => {
          if (prevData.includes(newItem)) {
            return prevData;
          } else {
            return [...prevData, newItem];
          }
        });
      }
    }
  };

  const receiveGiftFromFirebase = async (val) => {
    let messageDate = new Date(val?.date);
    if (messageDate?.getTime() > checkDate.getTime() + 500) {
      setGiftReceived(val);

      paramsBody = {
        host_id: channelName
      }
      let res = await getHostCoins({paramsBody, token: userData?.token })
      // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', res)
      if(res?.message) {
        dispatch(updateHostBeans(res?.message?.coins))
      }
     
    }
  };

  const updateSeats = async (seat, cohostData) => {
    console.log('hreeeeeeeeee', cohostData);
    setSelectedSeats(seat);
    await database().ref(`/multiRoom/${channelName}`).update({
      totalSeats: seat,
    });
    console.log('kkkkkkkkkkkkkkkkkkkkkkkk', selectSeats, seat);
    if (selectSeats > seat) {
      cohostData?.map((item, index) => {
        console.log('steppppppppppppppp11111111111111', index, item);
        if (index + 1 > seat && item?.cohostID) {
          console.log(
            'steppppppppppppppp1222222222222222221111111111111',
            channelName,
            item?.cohostID,
          );
          database()
            .ref(`/cohostMultiRoom/${channelName}/${item?.cohostID}`)
            .set({})
            .then(() => console.log('hhhhhhhhhhhhhhhhhhhh'));
        }
      });
    }
  };

  const [camera, setCamera] = useState(null);
  const handleCamera = () => {
    setCamera(!camera);
    agoraEngineRef.current.muteLocalVideoStream(camera ? true : false);
    updateHostCamera(camera);
  };

  const updateHostCamera = cam => {
    let val = !cam ? 1 : 0;
    database().ref(`/cohostMultiRoom/${channelName}/${uid}`).update({
      isCamersOn: val,
    });
  };

  const [muteAllSpeaker, setMuteAllSpeaker] = useState(false);
  const hanldeOnPressSpeaker = () => {
    agoraEngineRef.current.muteAllRemoteAudioStreams(
      muteAllSpeaker ? false : true,
    );
    setMuteAllSpeaker(!muteAllSpeaker);
  };

  const handleClearChat = () => {
    refRBSheetOptions.current.close()
    setMessages([])
  }

  const inviteUserToCall = (seatId, id) => {
    console.log('seatid', seatId, id)
    userListRef.current.close()
    database()
    .ref(`/multiRoomInviteUser/${channelName}/${id}`).set({
      seatId: seatId,
      id: id
    })
    setSelectedItems(null)
  } 

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        {/* <LinearGradient
          colors={['#3A0606', '#101355']}
          start={{x: 0, y: 0.5}} // Start from the middle of the left side
          end={{x: 1, y: 0.5}} // End at the middle of the right side
          style={{
            height: '100%',
            width: '100%',
          }}> */}
          <ImageBackground
          resizeMode="cover"
          source={
            bgTheme
              ? {uri: bgTheme}
              : require('../../../assets/images/back.png')
          }
          style={styles.Bg}>
          <View style={{position: 'absolute', zIndex: 5}}>
            <View>
              {/* header complete */}
              <TopLineFinalComponet
                onpresS={FlatListController}
                data={data}
                data2={data.length * 9}
                frameData={frameData?.[0]?.json_image}
                hostId={userUpdatedData?.id}
                hostImage={userUpdatedData?.image}
                starLevelImage={userUpdatedData?.star_level_image}
                userUpdateDataNickName={
                  userUpdatedData?.nick_name ?? userUpdatedData?.full_name
                }
                onPress2={() => {
                  modal2Ref.current.open();
                  // UpdateHostBeans();
                }}
                onPressStarLevel={() => modalRef.current.toggleModal()}
                onPressCross={() => navigation.goBack()}
                isStopwatchStart={isStopwatchStart}
                resetStopwatch={false}
                time={time}
              />
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
            <View
              style={{
                height: 20,
                marginBottom: 10,
                top: heightPercentageToDP(15),
                zIndex: 5,
              }}>
              <GiftAnimationPattiGlobal
                value={value?.[0]}
                removeItem={removeElementAtIndex0}
              />
            </View>

            <View
              style={{
                height: heightPercentageToDP(100),
                width: widthPercentageToDP(100),
              }}>
              <MultiSeatsLogic
                cohostData={cohostData}
                handleLongPress={handleLongPress}
                activeSpkeaker={activeSpeakerValue}
                handlePress={handlePress}
                callAllow={switch1}
                takeSeat={() => console.log('Seat')}
                selectSeats={selectSeats}
              />
            </View>
          </View>

          <View style={globalStyles.animatedGiftViewStyle}>
            <AnimatedGiftView
              userData={userData}
              channelName={channelName}
              cohostData={cohostData}
            />
          </View>

          <View style={{height: '100%', width: '100%'}}>
            <View style={styles.bottombox1}>
              <CommentsComponent
                message={messages}
                onPressComment={item => handleSingleUserData(item)}
              />
            </View>

            <View
              style={[
                styles.bottombox,
                {
                  width: '100%',
                  alignSelf: 'flex-start',
                  backgroundColor: transparent,
                },
              ]}>
              <StreamingBottomMenu
                isMicOn={isMicOn}
                //callNotification={callRequestNotify}
                onPressMic={() => handleMicButton()}
                onPressMsgSheet={() => handleChatButton()}
                onpressCall={() => AllowCall.current.open()}
                onPressGame={() => {
                  gameSheetRef.current.open();
                }}
                onPressThreeBars={() => refRBSheetOptions.current.open()}
                fromMulti={true}
                muteAllSpeaker={muteAllSpeaker}
                onPressSpeaker={hanldeOnPressSpeaker}
              />
            </View>
          </View>

          <View>
            <RbSheetComponent
              view={
                <AudioMenuSheet
                  channelName={channelName}
                  onPressChat={() => msgRef.current.open()}
                  onPressClearChat={handleClearChat}
                  changeTheme={() => changeThemeRef.current.open()}
                  handleCamera={() => handleCamera()}
                  fromMulti={true}
                  onPressShare={() =>
                        shareToWhatsApp(
                          userUpdatedData?.nick_name ??
                            userUpdatedData?.full_name,
                          userUpdatedData?.id,
                        )
                      }
                  onPressPlayMusic={() => {
                    refRBSheetOptions.current.close();
                    mp3PlayerRef.current.open();
                    //  pickMp3Files()
                  }}
                  MicOptions={() => {
                    refRBSheetOptions.current.close();
                    refRBSheetOptions2.current.open();
                  }}
                />
              }
              refUse={refRBSheetOptions}
              close={false}
              height={280}
              backgroundColor={'white'}
            />
          </View>
          <View>
            <RbSheetComponent
              view={
                <MicOptions
                  selectedSeats={item => {
                    refRBSheetOptions2.current.close();
                    console.log('hhhhhhhhhhhhhhhhhhh');
                    updateSeats(item, cohostData);
                  }}
                />
              }
              refUse={refRBSheetOptions2}
              close={false}
              height={370}
              backgroundColor={'white'}
            />
          </View>

          <RbSheetComponent
            view={
              <UserList
                data={data}
                selectedItems={selectedItems}
                inviteUserToCall={inviteUserToCall}
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
            view={
              <CohostCallsList
                // callRequests={callRequests}
                changeCohostStatus={changeCohostStatus}
                switch1={switch1}
                onToggleSwitch1={onToggleSwitch1}
                onPressCross={() => AllowCall.current.close()}
              />
            }
            refUse={AllowCall}
            close={false}
            height={heightPercentageToDP(20)}
          />

          <View>
            <RbSheetComponent
              view={<GameSheet />}
              refUse={gameSheetRef}
              backgroundColor={'white'}
              close={true}
              height={heightPercentageToDP(30)}
            />
          </View>

          {showTextInput && (
            <View style={{zIndex: 6}}>
              <KeyBoardTextInput
                inputVal={txt => rldbSendMessage(txt, mentionedUser)}
              />
            </View>
          )}

          <View>
            <RbSheetComponent
              view={
                <MessageSheet onCrossPress={() => msgRef.current.close()} />
              }
              refUse={msgRef}
              backgroundColor={'white'}
              close={false}
              height={heightPercentageToDP(40)}
            />
            <RbSheetComponent
              view={<ChangeTheme channelName={channelName} />}
              backgroundColor={'transparent'}
              refUse={changeThemeRef}
              close={false}
              height={heightPercentageToDP(50)}
            />

            <RbSheetComponent
              view={
              <UserOptionsList 
              channelName={channelName}
              selectedUsers={selectedItems}
               onPressMakeAdmin={handleMakeAdmin}
               onPressRemoveFromAdmin={handleRemoveFromAdmin} 
               onPressKick={handleKickUser} 
               onPressViewProfile={handleViewProfileFromSheet}
               onPressMuteUser={handleMuteUser} 
               onPressSendGift={() => {
                userOptionsListRef.current.close()
                cohostRemoveRef.current.open()}} 
               onPressCancel={() => {
                userOptionsListRef.current.close()
                userOptionsListRef.current.close()}} 
               />}
              backgroundColor={'transparent'}
              refUse={userOptionsListRef}
              close={false}
              height={heightPercentageToDP(45)}
            />

            <RbSheetComponent
              view={
                <GiftSheetData
                onPressClose={() => cohostRemoveRef.current.close()}
                sendGiftTo={[selectedItems]}
                  channelName={channelName}
                  cohostData={cohostData}
                  isHost={true}
                  
                />
              }
              refUse={cohostRemoveRef}
              close={true}
              height={'55%'}
            />
          </View>

          <StarModal
            view={
              <DailyStar onPressCross={() => modalRef.current.toggleModal()} />
            }
            ref={modalRef}
          />
          <View>
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
              height={heightPercentageToDP(80)}
            />
          </View>

          <RbSheetComponent
            view={
              <MP3Player
                selectSongsFromGallery={() => pickMp3Files()}
                handleSongPause={value => handleSongPause(value)}
              />
            }
            backgroundColor={'white'}
            refUse={mp3PlayerRef}
            close={false}
            height={heightPercentageToDP(50)}
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

          <View>
            <RbSheetComponent
              view={
                <ProfileModalStyles
                  onPressCros={() => ProfileRef?.current?.close()}
                  data={singleUserData}
                  onPress={() => ProfileRef?.current?.open()}
                  onPresReport={() => handleReportButton()}
                  onPressMention={async mentionedUser => {
                    ProfileRef?.current?.close();
                    await delay(500);
                    handleChatButton(mentionedUser);
                  }}
                />
              }
              refUse={ProfileRef}
              close={false}
              backgroundColor={'transparent'}
              height={heightPercentageToDP(55)}
            />
          </View>
        {/* </LinearGradient> */}
        </ImageBackground>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Bg: {
    height: '100%',
    width: '100%',
  },

  bottombox1: {
    position: 'absolute',
    bottom: 30,
    //top: heightPercentageToDP(70),
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPercentageToDP(25),
    width: '60%',
    zIndex: 5,
    paddingVertical: 15,
  },
  bottombox: {
    position: 'absolute',
    zIndex: 5,
    top: heightPercentageToDP(93),
    // bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: primaryColor,
    paddingVertical: 15,
  },
});
