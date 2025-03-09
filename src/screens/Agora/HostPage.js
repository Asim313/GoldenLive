import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ImageBackground,
  BackHandler,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';

import RbSheetComponent from '../reuseable_Component/RbSheetComponent';
import CrossIcon from 'react-native-vector-icons/Entypo';
import {
  primaryColor,
  white,
  transparent,
} from '../../utils/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import { Switch } from 'react-native-paper';

import {ApiCallToken} from '../../Services/Apis';

import {
  ClientRoleType, 
  ChannelProfileType,
} from 'react-native-agora';
import database from '@react-native-firebase/database';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import ProfileModalStyles from '../reuseable_Component/ProfileModalStyle';
import UserList from './components/UserList';
import FansRanking from '../reuseable_Component/FansRanking';
import {
  firebaseReadDataOnce,
  firebaseRemoveNode,
  firebaseUpdateData,
  firebaseWriteData,
} from '../../Services/Firebase';
import MessageSheet from './components/MessageSheet';
import CohostStyle from './components/cohost';
import SlideAnimationView from './components/SlideAnimationView';
import FruitLoop from '../FruitLoopGame/FruitLoop/FruitLoop';
import ReportUser from '../../components/ReportUser';
import {FIREBASE_REF, GIFT_SOCKET} from '../../Services/Constants';
import StreamingBottomMenu from './components/StreamingBottomMenu';
import PKBattleHostsView from '../../components/Pk/PKBattleHostsView';
import AgoraView from './components/AgoraView';
import CommentsComponent from './components/CommentsComponent';
import PKSheet from './components/PKSheet';
import ThreeBarSheet from './components/ThreeBarSheet';
import DailyStar from '../../components/DailyStar';
import AllIcons, {IconList} from '../../components/AllIcons';
import StarModal from '../reuseable_Component/StarModal';
import TopLineFinalComponet from './components/StreamHeader/TopLineFinalComponet';
import {generateAgoraToken, getGiftsList, getHostCoins, heartBeatInterval, makeHostLiveStatusInactive} from '../../Services/ApisCall';
import KeyBoardTextInput from '../home_screens/KeyBoardTextInput';
import { listenLuckyGiftSocket, luckyGiftCounter, updateHostBeans, updateVolumeIndication, updatedData} from '../../Redux/Actions';
import GameSheet from '../../components/GamesSheet';
import DocumentPicker from 'react-native-document-picker';
import GiftAnimationPatti from './components/GiftAnimation';
import MP3Player from './components/mp3Player/mp3Player';
import Rnfetchblob from '../../Testing/Rnfetchblob';
import GiftSheetData from '../../components/BottomGiftSheet/GiftSheetData';
import LuckyGiftAnimationPatti from '../../components/Animation/LuckyGiftAnimationPatti';
import CohostCallsList from '../../components/CohostCallsList';
import AnimatedJsonEntry from './components/AnimatedJsonEntry';
import GiftAnimationPattiGlobal from './components/giftAnimationPattiGlobal';
import RoomSettings from '../../components/RoomSettings';
import MatchingPk from './components/PK/MatchingPk';




export default HostSDK = props => {
  useEffect(() => {
    database().ref(`/channels/${channelName}`).off();
  }, []);

  const songVolume = useSelector(state => state.hostRed.songVolume)

  useEffect(() => {
    handleVolumeIndication(songVolume)
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

  const delay = ms => new Promise(res => setTimeout(res, ms));

  useKeepAwake();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const gameSheetRef = useRef();
  const roomSettingsRef = useRef();

  const msgRef = useRef();
  const AllowCall = useRef();
  const matchingPkSheetRef = useRef(null)
  const refRBSheet1 = useRef();
  const reportSheetRef = useRef();
  const refRBSheetOptions = useRef();
  const mp3PlayerRef = useRef();
  const [switch1, setswitch1] = useState(false);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const userData = useSelector(state => state.auth.userData);
  const active_store = useSelector(state => state.homeRed.activeStoreData);

  const giftSheetRef = useRef()

  const frameData = active_store?.filter(
    item => item?.parent_title === 'Frames',
  );

  const entryFrame = active_store?.filter(
    item => item?.parent_title === 'Garage',
  );
  const {route} = props;
  const {params} = route;
  const {userID, userName, liveID} = params;
  const [hostName, setHostName] = useState(
    userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
  );
  const [giftReceived, setGiftReceived] = useState(null);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [inPK, setInPk] = useState(false);
  const [pkMatching, setPkMatching] = useState(false);

  const [pkBattleGiftReceived, setPKBattleGiftReceived] = useState(null);
  const [showTextInput, setShowTextInput] = useState(false);
  const [mentionedUser, setMentionedUser] = useState(false);
  
  const lucky = useSelector(state => state.hostRed.luckyGiftData);
  const listenLuckyGift = useSelector(state => state.hostRed.listenLuckyGift);
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

  }, [lucky])

  const handleChatButton = mentionedUser => {
    setShowTextInput(false);
    setTimeout(() => {
      setShowTextInput(true);
      setMentionedUser(mentionedUser);
    }, 300);

    refRBSheetOptions.current.close();
  };



  const sendEntryGift = () => {
    const node = `/gifts/${channelName}`;
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

  //my code

  useEffect(() => {
    // GetGifts()
    dispatch(luckyGiftCounter(null))
    dispatch(updateHostBeans(userUpdatedData?.coins))
    initialFunctions()
    return () => {
      removeListenersAndEvents();
    };
  }, []);

  const initialFunctions = async () => {
   await generateToken(channelName);
    setGiftsDBToFirebase();
    addToUserList();
    checkGiftStatus();
    getGlobalNotifications()
    entryMessage();
    addJoinCallToFirebase();
    firebaseFunc();
    checkupdate();
    onUserRemove();
    coHostChildRemove();
    senddddddd();
    // getUserListyByChannel()
    // getUserData()
  }

  const senddddddd = async () => {
    await delay(1000);
    {
      entryFrame?.[0] && sendEntryGift();
    }
  };

  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(route?.params?.uid);
  const [channelName, setChannelName] = useState(route?.params?.channelName);

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

  const [coHost1Id, setCoHost1ID] = useState([]);
  const [callRequests, setCallRequests] = useState([]);
  const [callRequestNotify, setCallRequestNotify] = useState(false);
  const checkDate = new Date();

  useEffect(() => {
    database()
      .ref(`/channels/${channelName}`)
      .on('child_added', snapshot => {
        {
          snapshot.val() && firebaseFunc(snapshot.val());
        }
      });
  }, []);

  const setGiftsDBToFirebase = async () => {
    let giftNode = `/gifts/${channelName}`;
    let data = {sendGifts: 'true'};
    firebaseWriteData(giftNode, data);
  };


  useEffect(() => {
    socket.on('joinChannelInfo', data => {
      console.log('join channel info pk ', data);
    });

    socket.on('match_id', data => {
      console.log('match id pk ', data);
    });

    //match between 2 user's have been started
    socket.on('match_started', data => {
      console.log('match_started pk ', data);
    });


    socket.on('matched', async data => {
      let newset = data;
      if (data?.matchId) {
        await checkingFUnction(data?.matchId);
        console.log('new set', newset);
        console.log('here id matched', newset, data);
        setInPk(true);
        setPkMatching(false);
        matchingPkSheetRef.current.close();
        setBattleWith({
          id: userUpdatedData?.id,
          vs: data?.opponentId,
          channelName: channelName,
        });
      }
      console.log('matched pk ', data);
    });

    socket.on('matchEnded ', data => {
      console.log('matchEnded  pk ', data);
    });

    socket.on('pkMatchEnded', async(data) => {
      // console.log('pkMatchEnded pk ', data, userUpdatedData?.id);
      await checkingFUnction(userUpdatedData?.id);
      // setPKBattleEnded();
      setInPk(false);
      setPkMatching(false);
      setBattleWith(null);
    });

    database()
      .ref(`/comments/${channelName}`)
      .on('child_added', snapshot => {
        checkfun(snapshot.val());
      });

    socket.on('GameWinningPatti', data => {
      checkfun(data, true);
    });

    return () => {
      socket.off('GameWinningPatti');
      socket.off('joinChannelInfo');
      socket.off('match_id');
      socket.off('match_started');
      // socket.off('countdown')
      // socket.off('startPK')
      socket.off('pkMatchEnded');
      // socket.off('punishmentCountdown')
      socket.off('matchEnded');
      socket.off('matched');
    };
  }, []);

  const [cohostlist, setcohostlist] = useState([]);

  useEffect(() => {
    database()
      .ref(`/${FIREBASE_REF.coHostNode}/${channelName}`)
      .on('child_added', snapshot => {
        snapshot.val()?.id && setCoHost1ID(snapshot.val());
      });
  }, []);

  useEffect(() => {
    let filter = cohostlist.filter(item => item?.id === coHost1Id?.id);
    if (filter?.[0]) {
      // console.log(`${coHost1Id} is available in the array`);
    } else {
      setcohostlist(prev => [...prev, coHost1Id]);
      // console.log(`${coHost1Id?.[0]} is not available in the array`);
    }
  }, [coHost1Id]);

  const [itemRemove, setItemRemvoe] = useState();

  const coHostChildRemove = () => {
    database()
      .ref(`/${FIREBASE_REF.coHostNode}/${channelName}`)
      .on('child_removed', snapshot => {
        {
          snapshot.val()?.id && setItemRemvoe(snapshot.val()?.id);
        }
      });
  };

  useEffect(() => {
    if (itemRemove) {
      setcohostlist(
        cohostlist.filter(item => parseInt(item?.id) != parseInt(itemRemove)),
      );
      setCallRequests(
        callRequests?.filter(
          item => parseInt(item?.coHostID) !== parseInt(itemRemove),
        ),
      );
    }

    setItemRemvoe(null);
  }, [itemRemove]);

  const checkfun = (val , dontCheckTime) => {
    let messageDate = new Date(val?.date);

    if (messageDate?.getTime() >= checkDate.getTime() || dontCheckTime) {
      setMessages(prev => [...prev, val]);
      // { val && handleEndReached() }
    }
  };

  const firebaseFunc = val => {
    setCallRequests(prev => [...prev, val]);
    {
      val?.coHostID && setCallRequestNotify(true);
    }
  };

  const addJoinCallToFirebase = () => {
    database()
      .ref(`/channels/${channelName}/calls`)
      .set({
        JoinCalls: 'false',
      })
      .then(() => {
        setCallRequests([]);
        setCallRequestNotify(false);
      });

    firebaseWriteData(`/channels/${channelName}/PKBattle`, {
      inPKBattle: 'false',
    });
  };

  const changeCohostStatus = id => {
    if (cohostlist?.length <= 3) {
      database()
        .ref(`/channels/${channelName}/${id}`)
        .update({
          coHostID: parseInt(id),
          status: parseInt(1),
        })
        .then(() => {
          // console.log('Data set.', tempData)
        });
    }
  };
  const coHostRemove = id => {
    database().ref(`/${FIREBASE_REF.coHostNode}/${channelName}/${id}`).remove();

    {
      id &&
        setcohostlist(
          cohostlist.filter(item => parseInt(item?.id) !== parseInt(id)),
        );
    }
    {
      id &&
        setCallRequests(
          callRequests?.filter(item => item?.coHostID !== parseInt(id)),
        );
    }
  };

  const [data, setData] = useState([]);

  const generateToken = async (channelName) => {
     console.log('setp1')
    const paramsBody = {
      uid: parseInt(uid),
      streaming_status: 1,
    };
    try {
      console.log('setp2')
      const res = await generateAgoraToken({paramsBody: paramsBody, token: userData?.token})
      console.log('setp3', res)
      if (res?.data?.token) {
        join(res?.data?.token, channelName);
      }
    } catch (error) {
      console.log('Hostpage screen, generatetoken func', error);
    }
  };

  const join = async (tok, channelName) => {
    if (tok) {
      if (isJoined && !fromPK) {
        console.log("step4")
        return;
      }
      console.log('step', 5)
      try {
        agoraEngineRef.current?.setChannelProfile(
          ChannelProfileType.ChannelProfileLiveBroadcasting,
        );

        if (isHost) {
          console.log("step 6");
          agoraEngineRef.current?.startPreview();
          callBackMethod();
        await agoraEngineRef.current?.joinChannel(tok, channelName, parseInt(uid), {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          });
        } else {
         await agoraEngineRef.current?.joinChannel(tok, channelName, parseInt(uid), {
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

  const leave = async () => {
    try {
      await agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      // agoraEngineRef.current.release();
    } catch (e) {
      console.log(e);
    }
  };

  const handleReportButton = () => {
    reportSheetRef.current.open();
  };

  const [remoteUidCam, setRemoteUidCam] = useState(null);
  const [counter, setCounter] = useState(0);

  const sendNotification = async fcmToken => {
    try {
      let hostName = userUpdatedData?.nick_name ?? userUpdatedData?.full_name;
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: {
          title: 'Host is acitve',
        },
        route: `send/notifications/to-all`,
        verb: 'POST',
      });
    } catch (error) {
      console.log('ERROR save/userlive notifi api', error);
    }
  };

  const agoraEvents = {
    onJoinChannelSuccess: () => {
      sendNotification();
      setIsJoined(true);
      setIsStopwatchStart(true);
       console.log('joined channel');
    },
    onUserJoined: (_connection, Uid) => {
      setRemoteUid(Uid);
      // console.log('user joined 1', Uid, 'connectionsss', _connection);
    },
    onUserOffline: (_connection, Uid) => {
      setRemoteUid(0);
      // console.log('user offline 1', Uid);
    },
    onAudioVolumeIndication: (connection, speakers, speakerNumber, totalVolume) => {
      // console.log('onAudioVolumeIndication ==> ', speakers, speakers?.[0]?.uid,  connection?.localUid, 'speakers', speakers?.[0]?.volume, 'speakerNumber', speakerNumber, 'totalVolume', totalVolume );
     if(speakers?.[0]?.volume >= 30) {
       dispatch(updateVolumeIndication({id: speakers?.[0]?.uid === 0 ?  connection?.localUid : speakers?.[0]?.uid, volume: speakers?.[0]?.volume}))
       // setActiveSpeakerValue({id: connection?.localUid, volume: speakers?.[0]?.volume})
     } else {
       dispatch(updateVolumeIndication({id: speakers?.[0]?.uid === 0 ?  connection?.localUid : speakers?.[0]?.uid, volume: 0}))
      // setActiveSpeakerValue(false)
     }
     },
  };

  useEffect(() => {
    database()
      .ref(`/${FIREBASE_REF.coHostNode}/${channelName}`)
      .on('child_changed', snapshot => {
        snapshot.val() && setRemoteUidCam(snapshot.val());
        setCounter(counter => counter + 1);
      });
  }, []);

  const updateCameraOn = (id, remoteUidCam) => {
    setcohostlist(
      cohostlist.map(user => {
        if (parseInt(user.id) === id) {
          return {
            ...user,
            cameraOn: parseInt(remoteUidCam?.cameraOn),
            giftsReceived: remoteUidCam?.giftsReceived,
          };
        }
        return user;
      }),
    );
  };

  useEffect(() => {
    let id = remoteUidCam?.id ? remoteUidCam?.id : null;
    updateCameraOn(parseInt(id), remoteUidCam);
  }, [counter]);

  const callBackMethod = async () => {
    try {
      const agoraEngine = await agoraEngineRef.current;
      agoraEngine.setBeautyEffectOptions(true, {
        lighteningContrastLevel: 1,
        lighteningLevel: 1,
        smoothnessLevel: 1,
        rednessLevel: 0.7,
      });
    } catch (error) {
      console.log('error11', error);
    }
  };

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
      //console.log("time inter val", time)
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      heartBeatInterval({token: userData?.token});
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const removeListenersAndEvents = () => {
    database().ref().off();
    
    handlePKMatchEnd()
    agoraEngineRef.current?.stopAudioMixing();
    agoraEngineRef.current.unregisterEventHandler(agoraEvents);
    leave();
    setIsStopwatchStart(false);
    // console.log('cleaned up');
    deleteFirebaseNodes();

    makeHostLiveStatusInactive({token: userData?.token});
  };

  const checkGiftStatus = () => {
    database()
      .ref(`/gifts/${channelName}`)
      .on('child_added', snapshot => {
        receiveGiftFromFirebase(snapshot.val());
      });
  };

  const UpdateUserData = async () => {
    dispatch(updatedData(userData));
  };

  const [value, setValue] = useState([]);
  
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

  const receiveGiftFromFirebase = async (val, fromPk) => {
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
      {
        fromPk && setPKBattleGiftReceived(val);
      }
      paramsBody = {
        host_id: channelName
      }
      let res = await getHostCoins({paramsBody, token: userData?.token })
      if(res?.message) {
        dispatch(updateHostBeans(res?.message?.coins))
      }
    }
  };


  // const makeHostLiveStatusActive = async () => {
  //   try {
  //     const res = await ApiCallToken({
  //       params: userData.token,
  //       route: 'status-live-active',
  //       verb: 'POST',
  //     });
  //     //console.log('makeHostLiveStatusActive ', res)
  //   } catch (error) {
  //     console.log('Hostpage screen, makeHostLiveStatusActive func', error);
  //   }
  // };

  // const makeHostLiveStatusInactive = async () => {
  //   try {
  //     const res = await ApiCallToken({
  //       params: userData.token,
  //       route: 'status-live-disable',
  //       verb: 'POST',
  //     });
  //   } catch (error) {
  //     console.log('Hostpage screen, makeHostLiveStatusInactive func', error);
  //   }
  // };

  const addToUserList = async () => {
    const currentDate = new Date();
    await database()
      .ref(`/${FIREBASE_REF.userListNode}/${channelName}/${uid}`)
      .set({
        id: uid,
        full_name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
        image: userUpdatedData?.image,
        sender_level: userUpdatedData?.sender_level,
        reciever_level: userUpdatedData?.reciever_level,
        reciever_level_image: userUpdatedData?.reciever_level_image,
        sender_level_image: userUpdatedData?.sender_level_image,
        status: '0',
        date: currentDate.toString(),
        json_image: frameData?.[0]?.json_image,
        badge: userUpdatedData?.badge,
      });
  };

  const [showEntry, setShowEntry] = useState(false);
  const [enteredUserName, setEnteredUserName] = useState(null);
  const [enteredUserImage, setEnteredUserImage] = useState(null);

  const [userDataFromFirebase, setUserDataFromFirebase] = useState(null);

  const checkupdate = () => {
    const onChildAdd = database()
      .ref(`/${FIREBASE_REF.userListNode}/${channelName}`)
      .on('child_added', snapshot => {
        // console.log('addnode4 ', snapshot.val(), data);
        setUserDataFromFirebase(snapshot.val());
        // setData(prev => [...prev, snapshot.val()]);

        let messageDate = new Date(snapshot.val()?.date);
        if (messageDate?.getTime() + 2000 >= checkDate.getTime() + 500) {
          setEnteredUserName(snapshot.val()?.full_name);
          setEnteredUserImage(snapshot.val()?.sender_level_image);
          toggleShowEntry();
        }
        // handleUserList(snapshot.val())
      });
  };

  useEffect(() => {
    // console.log("kkkkkkkkkkkkkkkkkkkkkkkk", data, userDataFromFirebase)
    if (userDataFromFirebase) {
      if (!data.some(user => user?.id === userDataFromFirebase?.id)) {
        setData(prev => [...prev, userDataFromFirebase]);
      }

      setUserDataFromFirebase(null);
    }
  }, [userDataFromFirebase]);

  const toggleShowEntry = () => {
    // console.log("toggle", showEntry)
    setShowEntry(!showEntry);
  };

  //  const handleUserList = (val) => {
  //     console.log("handle suerlsit", val, " " ,data, " ",  data?.filter((item) => item?.id !== val?.id))
  //  }

  const [tes, setTes] = useState(null);

  const onUserRemove = () => {
    database()
      .ref(`/${FIREBASE_REF.userListNode}/${channelName}`)
      .on('child_removed', snapshot => {
        setTes(snapshot.val()?.id);
      });
  };

  // filtering data from user list when any user left the channel checking real time through database (tes) is the id that user left the channel we are getting real time user remove in tes
  useEffect(() => {
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
      cohostlist?.[0] &&
        tes &&
        setcohostlist(
          cohostlist?.filter(item => parseInt(item?.id) !== parseInt(tes)),
        );
    }
    {
      parseInt(userUpdatedData?.id) === parseInt(tes) && navigation.goBack();
    }
    {
      tes != uid &&
        data?.[0] &&
        tes &&
        setData(data?.filter(item => item?.id !== tes));
    }
    setTes(null);
  }, [tes]);

  const deleteFirebaseNodes = async () => {
    firebaseRemoveNode(`${FIREBASE_REF.userListNode}/${channelName}`);
    firebaseRemoveNode(`${FIREBASE_REF.coHostNode}/${channelName}`);
    firebaseRemoveNode(`${FIREBASE_REF.commentsVideoStream}/${channelName}`);
    firebaseRemoveNode(`${FIREBASE_REF.PKsearch}/${channelName}`);
    firebaseRemoveNode(`${FIREBASE_REF.channelNode}/${channelName}`);
  };

  const FlipCamera = () => {
    // console.log('flip');
    agoraEngineRef.current.switchCamera();
  };
  
  // const PkBtns = [
  //   {id: 1, name: 'Single Round PK'},
  //   {id: 2, name: 'Best of Three PK'},
  // ];
  // const TimeBtns = [
  //   {name: '5min'},
  //   {name: '10min'},
  //   {name: '12min'},
  //   {name: '15min'},
  // ];

  const onToggleSwitch1 = () => {
    setswitch1(!switch1);
    database()
      .ref(`/channels/${channelName}/calls`)
      .update({
        JoinCalls: !switch1 ? 'true' : 'false',
      })
      .then(() => {
        setCallRequests([]);
        // console.log('Data set.', tempData);
      });
  };

  const modalRef = React.createRef();
  const modal2Ref = React.createRef();
  const ProfileRef = React.createRef();

  const [FollowingHost, setFollowingHost] = useState([]);
  const [singleUserData, setSingleUserData] = useState();
  const index = FollowingHost.findIndex(item => item.id == liveID);

  const handleSingleUserData = singleuser => {
    setSingleUserData(singleuser);
    userListRef.current.close()
    {
      (singleuser?.sender_level || singleuser?.reciever_level) &&
        ProfileRef.current.open();
    }
  };


  const [isMicOn, setIsMicOn] = useState(true);
  const handleMicButton = () => {
    setIsMicOn(!isMicOn);
    {
      isMicOn
        ? agoraEngineRef.current.muteLocalAudioStream(true)
        : agoraEngineRef.current.muteLocalAudioStream(false);
    }
    // console.log('mic', isMicOn);
  };
  
  const userListRef = useRef()
  const FlatListController = () => {
    userListRef?.current?.open()
  };
  const handleUserListClose = () => {
     userListRef?.current?.close()
  };

  const rldbSendMessage = async (txt, mentionedUser) => {
    const currentDate = new Date();
    const newNodeKey = database()
      .ref()
      .child(`/comments/${channelName}`)
      .push().key;
    await database()
      .ref(`/comments/${channelName}/` + newNodeKey)
      .set({
        id: uid,
        name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
        sender_level: userUpdatedData?.sender_level,
        reciever_level: userUpdatedData?.reciever_level,
        sender_level_image: userUpdatedData?.sender_level_image,
        reciever_level_image: userUpdatedData?.reciever_level_image,
        badge: userUpdatedData?.badge,
        image: userUpdatedData?.image,
        mentionedUser: mentionedUser,
        message: txt,
        uid: newNodeKey,
        colorType: 'white',
titleColor: userUpdatedData?.user_type_id === 3 ? '#FF51E3' : '#03FFF0',
        date: currentDate.toString(),
      });
   
  };

  const [battleWith, setBattleWith] = useState(null);

  
  const handlePKMatchEnd = async() => {
     await socket.emit('finishMatch', {user_id: userUpdatedData?.id});
  }

  const handleRandomPk = async () => {
    try {

      console.log('pk matkkkkkkkkkkk', pkMatching)
      await socket.emit('joinChannel', {channel: '1122', user_id: userUpdatedData?.id});
      setPkMatching(true);
      refRBSheet1.current.close();
      matchingPkSheetRef.current.open();
    } catch (e) {
      console.log('error pk btl', e);
    }
  };

  // const pkBattleGiftNode = id => {
  //   database()
  //     .ref(`${FIREBASE_REF.PKsearch}/gifts/${id}`)
  //     .on('child_added', snapshot => {
  //       receiveGiftFromFirebase(snapshot.val(), true);
  //     });
  // };

  // const pkBtlSearch = async id => {
  //   pkBattleGiftNode(id);
  //   // console.log(id);
  //   database()
  //     .ref(`${FIREBASE_REF.PKsearch}/${id}`)
  //     .on('child_changed', snapshot => {
  //       {
  //         firebaseUpdateData(
  //           `${FIREBASE_REF.channelNode}/${channelName}/PKBattle/`,
  //           {
  //             inPKBattle: 'true',
  //             channelId: id,
  //           },
  //         );
  //         if (parseInt(snapshot.val()?.vs)) {
  //           if (
  //             parseInt(snapshot.val()?.vs) === parseInt(userUpdatedData?.id)
  //           ) {
  //             checkingFUnction(snapshot.val()?.id);
  //           }
  //           setInPk(true);
  //           setPkMatching(false);
  //           matchingPkSheetRef.current.close()
  //           setBattleWith({
  //             id: snapshot.val()?.id,
  //             vs: snapshot.val()?.vs,
  //             channelName: channelName,
  //           });
  //         }
  //       }
  //     });

  //   database()
  //     .ref(`${FIREBASE_REF.PKsearch}/${id}`)
  //     .on('child_removed', snapshot => {
  //       //  console.log("pk child remove", snapshot.val())
  //       {
  //         if (snapshot.val()?.id) {
  //           if (
  //             parseInt(snapshot.val()?.vs) === parseInt(userUpdatedData?.id)
  //           ) {
  //             leave();
  //             // console.log("chan", channelName)
  //             generateToken(channelName, true);
  //           }
  //           setPKBattleEnded();
  //           setInPk(false);
  //           setPkMatching(false);
  //           setBattleWith(null);
  //         }
  //       }
  //     });
  // };

  const checkingFUnction = async id => {
    // console.log("id444444444444444", channelName)
    await generateToken2(id);
  };

  const generateToken2 = async channelName => {
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
        join2(res?.token, channelName);
      }
    } catch (error) {
      console.log('Hostpage screen, generatetoken func', error);
    }
  };

  const join2 = async (tok, channelName) => {
    if (tok) {
      try {
        agoraEngineRef.current?.startPreview();
        // console.log('inhost', tok, channelName);
        agoraEngineRef.current?.joinChannel(
          tok,
          channelName.toString(),
          parseInt(uid),
          {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          },
        );
        // console.log('inhost222222222222');
        // setJoinCall(false)
        // rldbCoHost()
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('no token', token);
    }
  };

  const entryMessage = async () => {
    const currentDate = new Date();
    // const secondsToAdd = 3; // Change this value to the number of seconds you want to add
    // currentDate.setSeconds(currentDate.getSeconds() + secondsToAdd);

    const newNodeKey = database()
      .ref()
      .child(`/comments/${channelName}`)
      .push().key;
    const commentsNode = `/comments/${channelName}/${newNodeKey}`;
    const data = {
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
    };
    firebaseWriteData(commentsNode, data);
  };


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

const [muteAllSpeaker, setMuteAllSpeaker] = useState(false)
const hanldeOnPressSpeaker = () => {
  agoraEngineRef.current.muteAllRemoteAudioStreams(muteAllSpeaker ? false : true)
  setMuteAllSpeaker(!muteAllSpeaker)
}

const handlePkMatchingCancel = () => {
  console.log("endddddddddddd")
  handlePKMatchEnd()
  matchingPkSheetRef.current.close()
  setPkMatching(false);
}

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <ImageBackground
         source={inPK ? require('../../assets/images/pkBgImage.png') : require('../../assets/images/image36.png')}
          style={styles.Bg}>
          <View style={{position: 'absolute', zIndex: 5, marginHorizontal: 5}}>
            <View>
              {/* header complete */}
              <TopLineFinalComponet
                onpresS={FlatListController}
                data={data}
                frameData={frameData?.[0]?.json_image}
                data2={data.length * 9}
                hostId={userUpdatedData?.id}
                hostImage={userUpdatedData?.image}
                starLevelImage={userUpdatedData?.star_level_image}
                userUpdateDataNickName={
                  hostName == null
                    ? hostName + hostName?.length > 7 && '...'
                    : userUpdatedData?.nick_name
                }
                onPress2={() => {
                  modal2Ref.current.open();
                }}
                onPressStarLevel={() => modalRef.current.toggleModal()}
                onPressCross={() => {
                  navigation.goBack()
                }}
                isStopwatchStart={isStopwatchStart}
                resetStopwatch={resetStopwatch}
                time={time}
                updatedCoins={userUpdatedData?.coins}
              />
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              top: heightPercentageToDP(15),
              left: 0,
              width: '100%',
              zIndex: 4,
              bottom: 30,
              height: '20%',
              //  backgroundColor:'red'
            }}>
            <GiftAnimationPattiGlobal value={value?.[0]} removeItem={removeElementAtIndex0} />
          </View>

            <View style={{position: 'absolute', zIndex: 3, height: heightPercentageToDP(100), width: widthPercentageToDP(100)}}>
            {giftReceived &&  <Rnfetchblob giftData = {giftReceived} handleAnimationEnded={() => setGiftReceived(false)} />}
            </View>

           <View style={{height: '100%', width: '100%'}}>
          

          
                
                  <View
                    style={{
                      zIndex: 50,
                      position: 'absolute',
                      height: heightPercentageToDP(75),
                    }}>
                  <LuckyGiftAnimationPatti channelName={channelName} />
                  </View>
                
                
            {isJoined && isHost && (
              <>
                {showEntry && (
                  <View
                    style={{
                      zIndex: 2,
                      position: 'absolute',
                      height: heightPercentageToDP(75),
                    }}>
                    <AnimatedJsonEntry
                      image={enteredUserImage}
                      inputValue={enteredUserName + ' has entered the room'}
                      onAnimationComplete={toggleShowEntry}
                    />
                  </View>
                 )}
                {!inPK ? (
                  <View style={styles.videoView}>
                    <AgoraView id={0} />
                  </View>
                ) : (
                  <View>
                    <PKBattleHostsView
                      battleWith={battleWith}
                      gifts={pkBattleGiftReceived}
                      PKBattleHostsView={handlePKMatchEnd}
                      isHost={true}
                    />
                  </View>
                )}
              </>
            )}

            {isJoined && (
              <View style={[styles.overlay]}>
                <FlatList
                  data={cohostlist}
                  keyExtractor={item => item?.id?.toString()}
                  renderItem={item => {
                    //  console.log('jkjkkkkkkkkkkkkkkkkkkkkkkkkkkk', cohostlist)
                    return (
                      <View>
                        <CohostStyle item={item?.item} />
                      </View>
                    );
                  }}
                />
              </View>
            )}

            <View style={styles.bottombox1}>
                <CommentsComponent
                  message={messages}
                  onPressComment={item => handleSingleUserData(item)}
                />
            </View>
            

            <View>
            <RbSheetComponent
              view={
                <PKSheet
                  onPressCross={() => refRBSheet1.current.close()}
                  onPressRandomPk={() => handleRandomPk()}
                />
              }
              refUse={refRBSheet1}
              close={false}
              backgroundColor={'white'}
              height={heightPercentageToDP(50)}
            />
          </View>
          
            <RbSheetComponent
            view={
              <MatchingPk onPressClose={handlePkMatchingCancel} />}
            refUse={matchingPkSheetRef}
            close={false}
            backgroundColor={'transparent'}
            height={heightPercentageToDP(70)}
          />

            {pkMatching && (
              <View
                style={[
                  styles.overlay,
                  {
                    bottom: 80,
                    right: 15,
                    backgroundColor: 'red',
                    padding: 7,
                    borderRadius: 20,
                    elevation: 5,
                  },
                ]}>
                <View>
                  <Text
                    style={{fontSize: 10, color: 'white', fontWeight: 'bold'}}>
                    Matching
                  </Text>
                </View>
              </View>
            )}

  

            <View
              style={[
                styles.bottombox,
                {
                  width: '100%',
                  alignSelf: 'flex-start',
                  backgroundColor: transparent,
                  zIndex: 5
                },
              ]}>
              <StreamingBottomMenu
                isMicOn={isMicOn}
                callNotification={callRequestNotify}
                onPressMic={() => handleMicButton()}
                onPressMsgSheet={() => handleChatButton()}
                onpressCall={() => AllowCall.current.open()}
                onPressPk={() => refRBSheet1.current.open()}
                onPressGame={() => {
                  gameSheetRef.current.open();
                }}
                onPressThreeBars={() => refRBSheetOptions.current.open()}
                muteAllSpeaker={muteAllSpeaker}
                onPressSpeaker={hanldeOnPressSpeaker}
              />
            </View>
          </View> 

<RbSheetComponent
            view={
              <CohostCallsList 
                  callRequests={callRequests} 
                  coHostRemove={coHostRemove} 
                  changeCohostStatus={changeCohostStatus} 
                  switch1={switch1}
                  onToggleSwitch1={onToggleSwitch1}
                  onPressCross={() => AllowCall.current.close()}
                  removeNotification={() => setCallRequestNotify(false)}
                />}
            refUse={AllowCall}
            close={false}
            height={heightPercentageToDP(40)}
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
            view={
              <ThreeBarSheet
                flipCamera={() => FlipCamera()}
                onPressChat={() => msgRef.current.open()}
                handleRoomClick={() => {
                  refRBSheetOptions.current.close()
                  roomSettingsRef.current.open()
                }}
                onPressPlayMusic={() => {
                  refRBSheetOptions.current.close()
                   mp3PlayerRef.current.open()
                //  giftSheetRef.current.open()
                  //  pickMp3Files()
                }}
              />
            }
            refUse={refRBSheetOptions}
            close={false}
            height={280}
          />

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
          <View></View>
         

          {showTextInput && (
            <View style={{zIndex: 6}}>
              <KeyBoardTextInput
                inputVal={txt => rldbSendMessage(txt, mentionedUser)}
              />
              </View>
          )}



            <RbSheetComponent
            view={<MessageSheet onCrossPress={() => msgRef.current.close()} />}
            refUse={msgRef}
            backgroundColor={'white'}
            close={false}
            height={heightPercentageToDP(40)}
            />
          
          

            <RbSheetComponent
              view={
                <ReportUser
                  userData={singleUserData}
                  channelName={channelName}
                  onPressCross={() => reportSheetRef.current.close()}
                />
              }
              refUse={reportSheetRef}
              close={false}
              height={heightPercentageToDP(30)}
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
              height={heightPercentageToDP(100)}
            />

          <StarModal
            view={
              <DailyStar onPressCross={() => modalRef.current.toggleModal()} />
            }
            ref={modalRef}
          />

          <View>
            <RbSheetComponent
              view={
                <ProfileModalStyles
                  onPressCros={() => ProfileRef?.current?.open()}
                  data={singleUserData}
                  onPress={() => ProfileRef?.current?.open()}
                  onPresReport={() => handleReportButton()}
                  onPressMention={async mentionedUser => {
                    ProfileRef?.current?.open();
                    await delay(1000);

                    handleChatButton(mentionedUser);
                  }}
                  fromLiveStreaming={true}
                />
              }
              refUse={ProfileRef}
              close={false}
              backgroundColor={'transparent'}
              height={heightPercentageToDP(55)}
            />

<RbSheetComponent
              view={
                <RoomSettings channelName={channelName} />
              }
              backgroundColor={'transparent'}
              refUse={roomSettingsRef}
              close={false}
              height={heightPercentageToDP(100)}
            />

<RbSheetComponent
            view={
              <GiftSheetData
                // sendGiftTo={[{ cohostID: 100013149 }]}
                // giftsData={gettingGiftsArray}
                onPressClose={() => giftSheetRef.current.close()}
                channelName={channelName}
                cohostData={data}
                isHost={true}
                fromVideoLiveStreaming={true}
              />
            }
            backgroundColor={'black'}
            refUse={giftSheetRef}
            close={true}
            height={'50%'}
          />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  videoView: {width: '100%', height: '100%'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
  giftReceived: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    zIndex: 3,
    //backgroundColor: 'white',
    right: 5,
    bottom: 150,
  },
  cohostStyle: {
    width: 116,
    height: 130,
  },
  container: {
    flex: 1,
  },
  Bg: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black'
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

  bottombox1: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    width: '60%',
    height: heightPercentageToDP(25),
    zIndex: 4
  },
  bottombox: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: primaryColor,
    paddingVertical: 15,
  },
  profileViewerbox: {
    flexDirection: 'row',
    marginLeft: 10,
    paddingVertical: 5,
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
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginHorizontal: 10,
  },

  header: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  giftSmallSize: {
    width: 320,
    height: 330,
  },
  giftMediumSize: {
    width: 500,
    height: 500,
  },
  giftLargeSize: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
});
