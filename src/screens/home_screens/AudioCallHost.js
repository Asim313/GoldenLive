import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import CrossIcon from 'react-native-vector-icons/Entypo';

import OptionIcon from 'react-native-vector-icons/Octicons';
import { primaryColor, white, txtgrey, transparent } from '../../utils/Styles';

import RBSheet from 'react-native-raw-bottom-sheet';

import StarModal from '../reuseable_Component/StarModal';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import { Switch } from 'react-native-paper';

import { ApiCallToken } from '../../Services/Apis';

import {
  ClientRoleType,
  ChannelProfileType,
} from 'react-native-agora';
import database from '@react-native-firebase/database';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import ProfileModalStyles from '../reuseable_Component/ProfileModalStyle';
import FansRanking from '../reuseable_Component/FansRanking';
import UserList from '../Agora/components/UserList';
import { Keyboard } from 'react-native';
import { shareToWhatsApp } from '../reuseable_Component/SocialShare';
import AnimatedProfileDp from '../reuseable_Component/AnimatedProfileDP';
import SeatsLogic from '../reuseable_Component/SeatsLogic';
import { Alert } from 'react-native';
import { BackHandler } from 'react-native';
import MessageSheet from '../Agora/components/MessageSheet';
import FruitLoop from '../FruitLoopGame/FruitLoop/FruitLoop';
import { seatsDummyData } from '../../utils/DummyData/DummyData';
import SlidingText from '../../components/SlidingText';
import GameWinnerAnimation from '../Agora/components/GameWinnerAnimation';
import AllIcons, { IconList } from '../../components/AllIcons';
import GiftSheetData from '../../components/BottomGiftSheet/GiftSheetData';
import AnimatedGiftView from '../../components/ShowAnimatedGift/AnimatedGift';
import globalStyles from '../../utils/styles/global-styles';
import DailyStar from '../../components/DailyStar';
import KeyBoardTextInput from './KeyBoardTextInput';
import CommentsComponent from '../Agora/components/CommentsComponent';
import StreamingBottomMenu from '../Agora/components/StreamingBottomMenu';
import GameSheet from '../../components/GamesSheet';
import ThreeBarSheet from '../Agora/components/ThreeBarSheet';
import { updateHostBeans, updateVolumeIndication, updatedData } from '../../Redux/Actions';
import ReportUser from '../../components/ReportUser';
import TopLineFinalComponet from '../Agora/components/StreamHeader/TopLineFinalComponet';
import MP3Player from '../Agora/components/mp3Player/mp3Player';
import Rnfetchblob from '../../Testing/Rnfetchblob';
import GiftAnimationPatti from '../Agora/components/GiftAnimation';
import ChangeTheme from '../../components/changeThemeComponent';
import AudioMenuSheet from '../../components/AudioMenuSheet';
import { COHOST_DATA, GIFT_SOCKET } from '../../Services/Constants';
import LuckyGiftAnimationPatti from '../../components/Animation/LuckyGiftAnimationPatti';
import { generateAgoraToken, getGiftsList, makeHostLiveStatusInactive } from '../../Services/ApisCall';
import EmojiListSheet from '../../components/EmojiSheet';
import PanResponderAnimation from '../../Testing/panResponderAnination';
import GiftAnimationPattiGlobal from '../Agora/components/giftAnimationPattiGlobal';




export default AudioCallHost = props => {
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

  useKeepAwake();
  
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const gameSheetRef = useRef();
  const changeThemeRef = useRef();
  const reportSheetRef = useRef();
  const mp3PlayerRef = useRef();
  const cohostRemoveRef = useRef();

  const msgRef = useRef();
  const AllowCall = useRef();
  const stickerSheetRef = useRef();
  const refRBSheetOptions = useRef();
  const userListRef = useRef();

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

  const entryFrame = active_store?.filter(
    item => item?.parent_title === 'Garage',
  );

  const [gettingGiftsArray, setGettingGiftsArray] = useState([]);
  //console.log("user data11", userUpdatedData)
  const { route } = props;
  const { params } = route;
  const { userID, userName, liveID } = params;
  const [globalAnimation, setGlobalAnimation] = useState();

  const GetGifts = async () => {
    try {
      const res = await getGiftsList({ token: userData?.token });
      setGettingGiftsArray(res);
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  const [luckyGiftData, setLuckyGiftData] = useState(null)
  const [designText, setDesignText] = useState(null)
  const [luckyBonusReward, setLuckyBonusReward] = useState(null)

  const socket = useSelector(state => state?.homeRed?.socketConnection)

  useEffect(() => {
    if (socket) {
      console.log('useeffect ');
  
    
      socket.on('connected', data => {
        console.log('connected node', data);
      });
  
      socket.on('LuckyGiftSend', response => {
        console.log('Lucky gift', response);
        setLuckyGiftData(response);
        if (response?.message === 1) {
          console.log('statusssssssssssssssssssssssssssssssssssssssssssss');
          setLuckyGiftData(null);
        }
      });
  
   
      socket.on('notEnoughBeans', function (result) {
        alert("Don't have enough beans.")
        console.log('Received notEnoughBeans:', result);
      });
      socket.on('ChannelJoinMessage', (data) => {
        console.log('Channel Join Messages >>> :', data);
      });
      socket.on('ChannelLeaveMessage', (data) => {
        console.log('ChannelLeaveMessage >>> :', data);
      });
  
  
      
      socket.on('LuckyCountImage', response => {
        console.log('count bonus text', response?.message);
        setDesignText(response?.message);
        // setLuckyGiftData(response?.message)
      });
  
      socket.on('LuckyGiftReward', response => {
        console.log('rewardLucky', response?.message);
        setLuckyBonusReward(response?.message);
      });
  
      socket.on('error', err => {
        console.log('Error to the server', err);
      });
  
      socket.on('updatedBeans', data => {
        console.log('user updated beans', data);
        dispatch(updateHostBeans(data?.message ?? 0));
      });
  
      socket.emit('channelJoin', {channel: channelName});
    }
  
    return () => {
      if (socket) {
        socket.off('connected');
        socket.off('error');
        socket.off('Lucky Gift');
        socket.off('updatedBeans');
        socket.off('countImage');
        socket.off('rewardLucky');
        socket.off('ChannelJoinMessage');
        socket.off('ChannelLeaveMessage');
        socket.off('notEnoughBeans');
        socket.emit('channelLeave', {channel: channelName});
      }
    };
  }, [socket]);

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

  // useEffect(() => {
  //   database()
  //     .ref(`/LuckyGiftReward/${channelName}`)
  //     .on('child_added', snapshot => {
  //       {
  //         let messageDate = new Date(snapshot?.val()?.dateTime);
  //         if(snapshot?.val() && messageDate?.getTime() > checkDate.getTime() + 500) {
  //             setLuckyBonusReward(snapshot.val())
  //         }
  //       }
  //     });
  // }, []);

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


  //my code

  //console.log("Routes", route.params)
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(route?.params?.uid);
  const [channelName, setChannelName] = useState(route?.params?.channelName);
  const [userUid, setUserUid] = useState(null);

  const agoraEngineRef = useRef(route?.params?.agoraEngineRe); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(route?.params?.isHost); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user

  const [messages, setMessages] = useState([
    {
      colorType: '#41C2D2',
      uid: '-NMh31232k',
      message:
        'Sexual or violent content is strictly Prohibited.All violators will be banned.Do not expose your personal info such as Phone or location.',
    },
  ]);
  const [message, setMessage] = useState(''); // Message to the user
  const [coHost1Id, setCoHost1ID] = useState(null);
  const [tempData, setTempData] = useState(false);
  const [callRequests, setCallRequests] = useState([]);

  const checkDate = new Date();
  const [showTextInput, setShowTextInput] = useState(false);
  const [mentionedUser, setMentionedUser] = useState(false);

  
  const handleChatButton = (mentionedUser) => {
    console.log('mentaaaaaaaaaaaaaaaaaaaaaaaaaaaa', mentionedUser)
    setShowTextInput(false);
    setTimeout(() => {
      setShowTextInput(true);
      setMentionedUser(mentionedUser)
    }, 300);
    refRBSheetOptions.current.close();
  };

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/channelsaudio/${channelName}`)
      .on('child_added', snapshot => {
        {
          snapshot.val() && firebaseFunc(snapshot.val());
        }
      });
    // Stop listening for updates when no longer required
    return () => {
      database().ref(`/channelsaudio/${channelName}`).remove();
      database().ref(`/giftsaudio/${channelName}`).remove();
    };
  }, []);

  const setGiftsDBToFirebase = async data => {
    await database().ref(`/giftsaudio/${channelName}`).set({
      sendGifts: 'true',
    });
  };

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/commentsaudio/${channelName}`)
      .on('child_added', snapshot => {
        // console.log('new message node:  ', snapshot.val());
        checkfun(snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => {
      database()
        .ref(`/commentsaudio/${channelName}`)
        .off('child_added', onChildAdd);
      deleteMessageNode();
      //setMessages([])
    };
  }, []);

  useEffect(() => {
    // console.log("===========================================================<")
    database()
      .ref(`/cohostaudioTest/${channelName}`)
      .set({
        JoinCalls: 'false',
      })
      .then(() => {
        setCallRequests([]);
      });
  }, []);

  const [cohostlist, setcohostlist] = useState([]);
  const [cohostData, setCohostData] = useState(COHOST_DATA);

  const [selectedItems, setSelectedItems] = useState([]);

  const handlePress = data => {
    // console.log('id', data);
    setSelectedItems(data);
    cohostRemoveRef.current.open();
  };

  const handleLongPress = (value, isLocked) => {
    console.log('value', value, isLocked);
    lockSeatsRealTime(value, isLocked);
  };

  const lockSeatsRealTime = (seatId, isLocked) => {
    console.log('sss', seatId, isLocked);
    database()
      .ref(`/cohostaudioTest/${channelName}/lockedSeats/${seatId}`)
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
      .ref(`/cohostaudioTest/${channelName}/lockedSeats`)
      .on('child_changed', snapshot => {
        // console.log('lockseats ', snapshot.val());
        {
          snapshot.val()?.seatId && setLockSeatData(snapshot.val());
        }
      });
  };

  const handleReportButton = () => {
    ProfileRef?.current?.close()
    reportSheetRef.current.open();
  };


  const [handleUserMic, setHanldeUserMic] = useState(null);
  const coHostChildChange = () => {
    database()
      .ref(`/cohostaudioTest/${channelName}`)
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

  const deleteFromArrary = () => {
    //console.log("testing", cohostlist)
    setcohostlist(
      cohostlist.map(item => {
        if (item?.id === 4) {
          return { ...item, value: null };
        }
        return item;
      }),
    );
  };

  useEffect(() => {
    // console.log("cohost92")
    const onChildAdd = database()
      .ref(`/cohostaudioTest/${channelName}`)
      .on('child_added', snapshot => {
        {
          snapshot.val()?.id && handleCohost(snapshot.val());
        }
      });
    // Stop listening for updates when no longer required
    return () => {
      database()
        .ref(`/cohostaudioTest/${channelName}`)
        .off('child_added', onChildAdd);
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
              // isMicOn: coHost1Id?.isMicOn
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

  const [itemRemove, setItemRemove] = useState();

  const coHostChildRemove = () => {
    database()
      .ref(`/cohostaudioTest/${channelName}`)
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
            return { ...item, value: null, cohostID: null };
          }
          return item;
        }),
      );
      setItemRemove(null);
    }
  }, [itemRemove]);

  const deleteCoHostNode = async () => {
    await database().ref(`/cohostaudioTest/${channelName}/${userUpdatedData?.id}`).remove();
  };

  const deleteMessageNode = async () => {
    await database().ref(`/commentsaudio/${channelName}`).remove();
  };

  const checkfun = val => {
    let messageDate = new Date(val?.date);

    if (messageDate?.getTime() >= checkDate.getTime()) {
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
      .ref(`/channelsaudio/${channelName}`)
      .set({
        JoinCalls: 'false',
        theme: themeData?.[0]?.json_image,
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
      .ref(`/channelsaudio/${channelName}/${id}`)
      .update({
        coHostID: parseInt(id),
        status: parseInt(1),
      })
      .then(() => { });
  };

  const handleFireData = val => {
    let go = Object.keys(val)?.[0];
    //console.log("val12", Object.keys(val))
  };

  const firebaseWrite = () => {
    database()
      .ref(`/channelsaudio/${channelName}/${tempData}`)
      .set({
        cohostID: tempData,
        status: '0',
      })
      .then(() => { });
  };

  function showMessage(msg) {
    setMessage(msg);
  }

  const [data, setData] = useState([]);

  const generateToken = async () => {
    const paramsBody = {
      channelName: channelName,
      uid: parseInt(uid),
      role: 'RolePublisher',
      streaming_status: 2,
    };
    try {
      const res = await generateAgoraToken({paramsBody: paramsBody, token: userData?.token})
    
      console.log('jjjjjjjjjjjjjjjjjk', res)
      if (res?.data?.token) {
        join(res?.data?.token);
      } else {
        alert('' + res?.message)
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
        agoraEngineRef.current.enableAudioVolumeIndication(1000, 3, true)
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

  const [activeSpeakerValue, setActiveSpeakerValue] = useState(null)
  const agoraEvents = {
    onJoinChannelSuccess: () => {
      showMessage('Successfully joined the channel ' + channelName);
      setIsJoined(true);
      rldbCoHost();
      console.log('joined channel');
    },
    onUserJoined: (_connection, Uid) => {
      setRemoteUid(Uid);
      console.log('user Joined', Uid);
    },
    onUserOffline: (_connection, Uid) => {
      setRemoteUid(0);
      console.log('user offline', Uid);
    },
    onActiveSpeaker: () => {
      console.log("acctiveeeee")
    },
    onAudioVolumeIndication: (connection, speakers, speakerNumber, totalVolume) => {
      //  console.log('onAudioVolumeIndication ==> ', speakers, speakers?.[0]?.uid,  connection?.localUid, 'speakers', speakers?.[0]?.volume, 'speakerNumber', speakerNumber, 'totalVolume', totalVolume );
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
    const agoraEngine = agoraEngineRef.current;
    agoraEngineRef.current?.adjustAudioMixingVolume(30);
    agoraEngine.registerEventHandler(agoraEvents);
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

  const [heart, setHeart] = useState(0);
  const heartBeatInterval = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'heart-beat',
        verb: 'GET',
      });
       console.log("HeartBeatInterval", res)
      setHeart(heart => heart + 1);
    } catch (error) {
      console.log('ERROR HeartBeatInterval ====>>>', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      heartBeatInterval();
    }, 60000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const rldbCoHost = () => {
    const currentDate = new Date();
    try {
      database()
        .ref(`/cohostaudioTest/${channelName}/${uid}`)
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
        });

      database()
        .ref(`/cohostaudioTest/${channelName}/lockedSeats`)
        .set(seatsDummyData);
      handleSeatsLock();
    } catch (e) {
      console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', e);
    }
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
    GetGifts();
    setGiftsDBToFirebase();
    entryMessage();
    addJoinCallToFirebase();
    addToUserList();
    checkGiftStatus();
    firebaseFunc();
    callBackMethod();
    generateToken();
    checkupdate();
    onUserRemove();
    coHostChildRemove();
    getGiftStatusFromFirebase();
    coHostChildChange();
    getGlobalNotifications();
    senddddddd()
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
    await delay(1000)
    { entryFrame?.[0] && sendEntryGift() }
  }

  const addToUserList = async () => {
    // console.log("userdata", userData?.user)
    await database().ref(`/userlistaudio/${channelName}/${uid}`).set({
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
      .ref(`/userlistaudio/${channelName}`)
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
      .ref(`/userlistaudio/${channelName}`)
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
    await database().ref(`/userlistaudio/${channelName}/${userUpdatedData?.id}`).remove();
  };

  const removeUserFromList = userData => {
    console.log(userData);
    database()
      .ref(`/cohostaudioTest/${channelName}/${userData?.cohostID}`)
      .remove();
    setSelectedItems(null);
  };

  const muteUser = userData => {
    console.log(userData);
    database()
      .ref(`/cohostaudioTest/${channelName}/${userData?.cohostID}`)
      .update({
        isMicOn: 'false',
      });
    setSelectedItems(null);
  };

  const PkBtns = [
    { id: 1, name: 'Single Round PK' },
    { id: 2, name: 'Best of Three PK' },
  ];
  const TimeBtns = [
    { name: '5min' },
    { name: '10min' },
    { name: '12min' },
    { name: '15min' },
  ];

  const onToggleSwitch1 = () => {
    setswitch1(!switch1);
    database()
      .ref(`/channelsaudio/${channelName}`)
      .update({
        JoinCalls: !switch1 ? 'true' : 'false',
      })
      .then(() => {
        setCallRequests([]);
      });
  };

  const AllowSheet = () => (
    <View>
      <View style={{ alignItems: 'flex-end', paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={() => AllowCall.current.close()}>
          <CrossIcon name="cross" size={28} style={{ color: white }} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        <Text style={{ color: white, fontSize: 15, fontWeight: '500' }}>
          Allow Anyone to Join as Guest
        </Text>
        <Switch
          value={switch1}
          onValueChange={onToggleSwitch1}
          color="#E92F24"
        />
      </View>
    </View>
  );

  const modalRef = React.createRef();
  const modal2Ref = React.createRef();

  const ProfileRef = React.createRef();

  const [singleUserData, setSingleUserData] = useState();


  const handleSingleUserData = singleuser => {
    setSingleUserData(singleuser);
    list && setList(!list);
    {
      (singleuser?.sender_level || singleuser?.reciever_level) &&
        ProfileRef.current.open();
    }
  };

  const [list, setList] = useState(false);

  const FlatListController = () => {
    setList(!list);
  };

  const [isMicOn, setIsMicOn] = useState(true);
  const handleMicButton = () => {
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
  };



  const rldbSendMessage = async (txt, mentionedUser) => {
    const currentDate = new Date();
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
        message: txt,
        mentionedUser: mentionedUser,
        uid: newNodeKey,
        date: currentDate.toString(),
      });
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
        // id: uid,
        id: uid,
        name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
        message: 'has entered the room',
        sender_level: userUpdatedData?.sender_level,
        reciever_level: userUpdatedData?.reciever_level,
        sender_level_image: userUpdatedData?.sender_level_image,
        reciever_level_image: userUpdatedData?.reciever_level_image,
        badge: userUpdatedData?.badge,
        uid: newNodeKey,
        date: currentDate.toString(),
      });
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

  const getGiftStatusFromFirebase = () => {
    // database()
    //   .ref(`/GiftStatus`)
    //   .on('child_changed', snapshot => {
    //     console.log('from firebase', snapshot?.val()?.text);
    //     {
    //       snapshot?.val()?.text && setGlobalAnimation([snapshot?.val()?.text]);
    //     }
    //   });
  };

  
  const songVolume = useSelector(state => state.hostRed.songVolume)

  useEffect(() => {
    handleVolumeIndication(songVolume)
    console.log("<<<<<<<<<<<??????????>>>>>>>>>>>>>>>..")
  }, [songVolume])

  const handleVolumeIndication = (value) => {
      agoraEngineRef.current?.adjustAudioMixingVolume(value);
  
  }
  const handleSongPause = (value) => {
    if(value) {
      agoraEngineRef.current?.resumeAudioMixing();
    } else {
      agoraEngineRef.current?.pauseAudioMixing();
    }
  }

  const selectedSong = useSelector(state => state.hostRed.songSelectedByUser)

  useEffect(() => {
    audioMixing(selectedSong?.uri, true)
  }, [selectedSong])

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
  }

  const audioMixing = (selectedFile, playAudioFile) => {
    if (!isJoined) {
    return;
    }
    console.log("selected file is", selectedFile)

    if (playAudioFile) {
        try {
        agoraEngineRef.current?.startAudioMixing(
            selectedFile,
            false, // loopback
            -1, // cycle
            0, // startpos
        );
        console.log('Audio mixing started')
       // showMessage('Audio mixing started');
        } catch (e) {
          console.log('Exception playing audio\n ${e.toString()}')
          //  showMessage('Exception playing audio\n ${e.toString()}');
        }
    } else {
        agoraEngineRef.current?.stopAudioMixing();
    }
};


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
        <ImageBackground
          resizeMode="cover"
          source={
            themeData?.[0]?.json_image
              ? { uri: themeData?.[0]?.json_image }
              : require('../../assets/images/audioBackImage.png')
          }
          style={styles.Bg}>
          <View style={{ position: 'absolute', zIndex: 5 }}>


{/* <View style={{position: 'absolute', zIndex: 5}}>
    <PanResponderAnimation />
</View> */}
            <View>
              {/* header complete */}
              <TopLineFinalComponet
                onpresS={FlatListController}
                data={data}
                data2={data.length * 9}
                hostId={userUpdatedData?.id}
                hostImage={userUpdatedData?.image}
                starLevelImage={userUpdatedData?.star_level_image}
                userUpdateDataNickName={userUpdatedData?.nick_name ?? userUpdatedData?.full_name}
                onPress2={() => {
                  modal2Ref.current.open();
                  // UpdateHostBeans();
                }}
                onPressStarLevel={() => modalRef.current.toggleModal()}
                onPressCross={() => navigation.goBack()}
                updatedCoins={userUpdatedData?.coins}
              />
            </View>



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
              cohostData={cohostData}
              handleLongPress={handleLongPress}
              activeSpkeaker={activeSpeakerValue}
              handlePress={handlePress}
              callAllow={switch1}
              takeSeat={() => console.log('Seat')}
            />
          </View>


        {luckyGiftData &&  <View
                    style={{
                      zIndex: 4,
                      position: 'absolute',
                      // backgroundColor: 'pink',
                      // top: heightPercentageToDP(0),
                    }}>
                  <LuckyGiftAnimationPatti data={luckyGiftData} designText={designText} luckyBonusReward={luckyBonusReward} />
                  </View>
}

          {giftReceived && 
          <View style={{position: 'absolute', zIndex: 4, height: heightPercentageToDP(100), width: widthPercentageToDP(100)}}>
             <Rnfetchblob giftData = {giftReceived} handleAnimationEnded={() => setGiftReceived(false)} />
            </View>
          }
          {/* <View style={globalStyles.animatedGiftViewStyle}>
            <AnimatedGiftView
              updateCoins={() => {
                console.log("hitting new cons")
                dispatch(updatedData(userData))
              }}
              channelName={channelName}
              cohostData={cohostData}
            />
          </View> */}

          <View style={{ height: '100%', width: '100%' }}>
            <View style={styles.bottombox1}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  height: '100%',
                  bottom: 30,
                  width: '60%',
                }}>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    maxHeight: 250,
                    zIndex: 5,
                  }}>

                  <CommentsComponent
                    message={messages}
                    onPressComment={item => handleSingleUserData(item)}
                  />

                </View>

              </View>
            </View>

            {list && (
              <UserList
                data={data}
                onPressCross={() => setList(false)}
                onPressSingleUser={handleSingleUserData}
              />
            )}


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
                onPressGame={() => { gameSheetRef.current.open() }}
                onPressSticker={() => { stickerSheetRef.current.open() }}
                onPressThreeBars={() => refRBSheetOptions.current.open()}
                fromAudio={true}
              />
            </View>
          </View>

          <View>
            <RbSheetComponent
              view={<AudioMenuSheet
                changeTheme={() => {
                  refRBSheetOptions.current.close()
                  changeThemeRef.current.open()
                }}
                onPressChat={() => msgRef.current.open()}
                fromAudio={true} 
                onPressPlayMusic={() => {
                  refRBSheetOptions.current.close()
                  mp3PlayerRef.current.open()
                  //  pickMp3Files()
                }}
                />}
                backgroundColor={'white'}
              refUse={refRBSheetOptions}
              close={false}
              height={280}
            />
          </View>

          <RbSheetComponent
            view={<AllowSheet />}
            refUse={AllowCall}
            close={true}
            height={300}
          />


          <RbSheetComponent
            view={<EmojiListSheet channelName={channelName} cohostData={cohostData} />}
            backgroundColor={'transparent'}
            refUse={stickerSheetRef}
            close={false}
            height={300}
          />

          <View>
            <RbSheetComponent
              view={
                <GameSheet />
              }
              refUse={gameSheetRef}
              backgroundColor={'white'}
              close={true}
              height={heightPercentageToDP(30)}
            />
          </View>

          {showTextInput && <KeyBoardTextInput inputVal={(txt) => rldbSendMessage(txt, mentionedUser)} />}

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
              view={
                <GiftSheetData
                  giftsData={gettingGiftsArray}
                  channelName={channelName}
                  cohostData={cohostData}
                  isHost={true}
                  // socket={socket}
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
                handleSongPause={(value) => handleSongPause(value)}
                />
            }
            backgroundColor= {'white'}
            refUse={mp3PlayerRef}
            close={false}
            height={heightPercentageToDP(50)}
          />

<RbSheetComponent
              view={
                <ChangeTheme channelName={channelName} />
              }
              backgroundColor={'transparent'}
              refUse={changeThemeRef}
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
                  onPressMention={async (mentionedUser) => {
                    ProfileRef?.current?.open()
                    await delay(1000)
                    handleChatButton(mentionedUser)
                  }}
                />
              }
              refUse={ProfileRef}
              close={false}
              backgroundColor={'transparent'}
              height={heightPercentageToDP(55)}
            />

          </View>
        </ImageBackground>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  audioCohostNameStyle: {
    marginTop: 4,
    color: white,
    fontSize: 12,
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
    top: 20,
  },
  cohostStyle: {
    width: 120,
    height: 160,
    borderWidth: 3,
  },
  border: {
    width: 120,
    height: 164,
    borderWidth: 2,
    borderColor: 'white',
  },
  container: {
    flex: 1,
  },
  Bg: {
    height: '100%',
    width: '100%',
  },
  mainImg: {
    height: '100%',
    width: '100%',
  },
  profile: {
    height: 35,
    width: 35,
    borderRadius: 25,
  },
  profilecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  crossIcon: {
    color: 'white',
    right: 2,
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
  flowbox: {
    marginLeft: 10,
    backgroundColor: 'red',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  flowtxt: {
    color: 'white',
    fontWeight: '500',
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  heartIcon: {
    color: 'white',
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 25,
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
  bottombox1: {
    position: 'absolute',
    bottom: 20,
    //top: heightPercentageToDP(70),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',

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
  lefticonsbox: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 5,

    justifyContent: 'space-evenly',
  },
  icon1box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 35,
    width: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  icon1: {
    color: '#FFFFFF',
  },
  righticonsbox: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'flex-end',
    right: 5,
  },
  icon2box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  giftIcon: {
    color: 'yellow',
    marginHorizontal: 4,
  },
  PK: {
    color: 'white',
    fontWeight: '500',
  },
  Likebox: {
    position: 'absolute',
    flexDirection: 'row',
    top: 55,
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
  Lvbox: {
    backgroundColor: 'orange',
    paddingHorizontal: 7,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  Lvtxt: {
    color: 'white',
  },
  // commentcontainer: {
  //   position: 'absolute',
  //   bottom: '17%',
  //   width: '70%',
  // },
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
    top: 2,
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
  headingtxt1: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 3,
  },
  rbIconbox: {
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rbIconbox1: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gameIconView: {
    alignItems: 'center',
    width: '25%',
  },
  gameIconbox: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    // backgroundColor: '#3A3A3A',
    // opacity: 0.7,
  },
  gametxt: {
    color: '#FFFFFF',
    width: 90,
    textAlign: 'center',
  },
  batleHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  batleIconsbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  batleIconbox: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ED3B30',
  },
  batletxt: {
    color: '#FFFFFF',
    width: 90,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '400',
    fontSize: 15,
  },
  batleIconContainer: {
    backgroundColor: '#31384A',
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    height: 110,
    paddingTop: 20,
  },
  ViewerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  text: {
    color: 'white',
  },
  imgStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  profileViewerbox: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: '2%',
    alignItems: 'center',
    paddingHorizontal: '3%',
  },
  txt: {
    paddingLeft: '2%',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textAndButtonsContainer: {
    flexDirection: 'row',
    marginLeft: '15%',
  },
  pkBtn: {
    // backgroundColor: '#ED3B30',
    color: 'white',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#31384A',
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
    marginHorizontal: 10,
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
    height: 36,
    width: 36,
    borderRadius: 18,
    marginHorizontal: 5,
  },
  headerCounter: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: 30,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  headerCross: {
    marginLeft: 10,
  },
  text: {
    color: 'white',
  },
});
