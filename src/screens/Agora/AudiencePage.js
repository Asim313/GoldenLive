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
  BackHandler,
  Alert,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import { primaryColor, transparent } from '../../utils/Styles';
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { useCallback } from 'react';
import { listenLuckyGiftSocket, luckyGiftCounter, updateHostBeans, updateVolumeIndication, updatedData } from '../../Redux/Actions';
import LinearGradient from 'react-native-linear-gradient';
import Simple from 'react-native-vector-icons/SimpleLineIcons';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
} from 'react-native-agora';

import database from '@react-native-firebase/database';
import Feather from 'react-native-vector-icons/Feather';
import DeviceInfo from 'react-native-device-info';
import AnimatedLottieView from 'lottie-react-native';
import Call from '../home_screens/Call';
import ProfileModalStyles from '../reuseable_Component/ProfileModalStyle';
import FansRanking from '../reuseable_Component/FansRanking';
import UserList from './components/UserList';
import { shareToWhatsApp } from '../reuseable_Component/SocialShare';
import { firebaseReadDataOnce } from '../../Services/Firebase';
import MessageSheet from './components/MessageSheet';
import SlideAnimationView from './components/SlideAnimationView';
import FruitLoop from '../FruitLoopGame/FruitLoop/FruitLoop';
import AgoraView from './components/AgoraView';
import PKBattleHostsView from '../../components/Pk/PKBattleHostsView';
import { FIREBASE_REF, GIFT_SOCKET } from '../../Services/Constants';
import TopLineFinalComponet from './components/StreamHeader/TopLineFinalComponet';
import {
  checkUserFollowing,
  followHost,
  getGiftsList,
  getHostCoins,
} from '../../Services/ApisCall';
import CommentsComponent from './components/CommentsComponent';
import GiftSheetData from '../../components/BottomGiftSheet/GiftSheetData';
import DailyStar from '../../components/DailyStar';
import GameSheet from '../../components/GamesSheet';
import CohostStyle from './components/cohost';
import AnimatedProfileDp from '../reuseable_Component/AnimatedProfileDP';
import MainAnimation from '../../components/Animation/MainAnimation';
import TopUsersView from '../records/TopTalentsView';
import GiftAnimationPatti from './components/GiftAnimation';
import Rnfetchblob from '../../Testing/Rnfetchblob';
import LuckyGiftAnimationPatti from '../../components/Animation/LuckyGiftAnimationPatti';
import AnimatedJsonEntry from './components/AnimatedJsonEntry';
import GiftAnimationPattiGlobal from './components/giftAnimationPattiGlobal';
import InviteAsGuest from '../../components/InviteAsGuest';


const screenHeight = Dimensions.get('window').height;

const AudiencePage = props => {
  const { route } = props;
  const { params } = route;
  const { channelId, userLive, completeData } = params;

  const [channelName, setChannelName] = useState(channelId?.toString());
  const hostReceiverLevel = completeData?.reciever_level;
  const hostReceivedBeans = completeData?.received_beans;

  const [hostName, setHostName] = useState(
    completeData?.nick_name ?? completeData?.full_name,
  );


  const navigation = useNavigation();

  const gameSheetRef = useRef();
  const Gift = useRef();
  const Msg = useRef();

  const channelListenerRef = useRef(null);
  const pkGiftRef = useRef(null);

  const modalRef = React.createRef();
  const modal2Ref = React.createRef();
  const ProfileRef = React.createRef();
  const joinCallModalRef = React.createRef();
  const userData = useSelector(state => state.auth.userData);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const dispatch = useDispatch();
  useKeepAwake();

  //my code

  //console.log("Routes", route.params)
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(userData?.user?.id);
  const active_store = useSelector(state => state.homeRed.activeStoreData);
  const frameData = active_store?.filter(
    item => item?.parent_title === 'Frames',
  );
  const entryFrame = active_store?.filter(
    item => item?.parent_title === 'Garage',
  );

  const agoraEngineRef = useRef(IRtcEngine);
  //const agoraEngineRef = useRef(route?.params?.agoraEngineRe); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(route?.params?.isHost); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [coHost1Id, setCoHost1ID] = useState(null);

  const [joinCall, setJoinCall] = useState(false);
  const [giftReceived, setGiftReceived] = useState(null);

  const [isMicOn, setIsMicOn] = useState(true);
  const [flipCamera, setFlipCamera] = useState(true);
  const [camera, setCamera] = useState(false);

  const [remoteUidCam, setRemoteUidCam] = useState(null);
  const [counter, setCounter] = useState(0);
  const [cohostlist, setcohostlist] = useState([]);

  const [inPK, setInPk] = useState(false);
  const [battleWith, setBattleWith] = useState(null);
  // const [pKStatus, setPkStatus] = useState({type: 'true'});
  const [disableComments, setDisableComments] = useState(false);

  const [sendGiftToUserId, setSendGiftToUserId] = useState(null);

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
    
  const inviteSheetRef = useRef()
    const handleReject = useCallback(() => {
      inviteSheetRef.current.close();
    }, [inviteSheetRef]);

  const handleInvitation = () => {
    joinCallModalRef.current.toggleModal();
    inviteSheetRef.current.close()
  }
  
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
  //   // database()
  //   //   .ref(`/LuckyGiftReward/${channelName}`)
  //   //   .on('child_added', snapshot => {
  //   //     {
  //   //       let messageDate = new Date(snapshot?.val()?.dateTime);
  //   //       if(snapshot?.val() && messageDate?.getTime() > checkDate.getTime() + 500) {
  //   //           setLuckyBonusReward(snapshot.val())
  //   //       }
  //   //     }
  //   //   });
  // }, []);

// useEffect(() => {
//  { designText && handleFontStyle()}
// }, [designText]);

// const handleFontStyle = async () => {
//   await delay(4000)
//   setDesignText(null)
// }

// useEffect(() => {
//  { luckyBonusReward && hanldeRewardBanner()}
// }, [luckyBonusReward]);

// const hanldeRewardBanner = async () => {
//   await delay(10000)
//   setLuckyBonusReward(null)
// }



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

  const [battleNodeRoot, setBattleNodeRoot] = useState(null);
  useFocusEffect(
    useCallback(() => {
      console.log('heree createing');
      setBattleNodeRoot(props?.route?.params?.channelId.toString());

      agoraEngineRef.current = createAgoraRtcEngine();
    }, []),
  );

  const muteUser = async () => {
    database()
      .ref(`/muteList/${channelName}`)
      .on('child_added', snapshot => {
        // console.log('mutedddddd added', snapshot.val()?.id);
        if (parseInt(snapshot.val()?.id) === parseInt(userUpdatedData?.id)) {
          setDisableComments(true);
        }
      });

    database()
      .ref(`/muteList/${channelName}`)
      .on('child_removed', snapshot => {
        // console.log('mutedddddd removed', snapshot.val()?.id);
        if (parseInt(snapshot.val()?.id) === parseInt(userUpdatedData?.id)) {
          setDisableComments(false);
        }
      });
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

  useFocusEffect(
    useCallback(() => {
      dispatch(luckyGiftCounter(null))
      // Initialize Agora engine when the app starts
      // console.log('zzzzzzzzzzzzz', props, props?.route?.params?.channelId)
      let fromPk = props?.route?.params?.fromPk;
      entryMessage('has entered the room');
      if (!fromPk) {
        console.log(
          'inttttttttttttt',
          parseInt(props?.route?.params?.channelId),
        );
        setRemoteUid(parseInt(props?.route?.params?.channelId));
      }
      addToUserList();
      {
        userLive && handle(props?.route?.params?.channelId.toString(), fromPk);
        channelChildChanged();
        onUserRemove();
        senddddddd();
        // firebaseCallValueOneTimeRead()
      }
      checkGiftStatus();
      getGlobalNotifications();
      checkupdate();
      coHostChildRemove();
      muteUser();
      checkFollowUser();
      //  cohostAdded()
      return () => {
        clearAllNodesAndRef(true);
      };
    }, [props]),
  );

  const senddddddd = async () => {
    await delay(1000);
    {
      entryFrame?.[0] && sendEntryGift();
    }
  };

  useEffect(() => {
    setRemoteUid(parseInt(props?.route?.params?.channelId));
  }, [isJoined]);

  const clearAllNodesAndRef = async inPk => {
    if (channelListenerRef.current) {
      // console.log("nulllllllllllllllllll")
      const channelRef = database().ref(`/channels/${channelName}`);
      channelRef.off('child_changed', channelListenerRef.current);
      channelListenerRef.current = null;
    }
    database().ref('Animation').off();
    // if (pkGiftRef.current) {
    //   const channelRef = database().ref(`${FIREBASE_REF.PKsearch}/gifts/`);
    //   channelRef.off('child_added', pkGiftRef.current);
    //   pkGiftRef.current = null;
    // }
    database().ref().off();
    agoraEngineRef.current?.unregisterEventHandler(agoraEvents);
    leave();
    removeUserFromNode();
    deleteCoHostNode();
    console.log('cleaned up');
  };

  const handleMicButton = () => {
    setIsMicOn(!isMicOn);
    {
      isMicOn
        ? agoraEngineRef.current.muteLocalAudioStream(true)
        : agoraEngineRef.current.muteLocalAudioStream(false);
    }
    console.log('mic', isMicOn);
  };

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
    updateHostCamera(camera);
  };

  const updateHostCamera = cam => {
    let val = !cam ? 1 : 0;
    database().ref(`/cohostTest/${channelName}/${uid}`).update({
      id: uid,
      image: userUpdatedData?.image,
      cameraOn: val,
      micOn: 1,
      yo: 'yes',
    });
  };

  useEffect(() => {
    firebaseCallValueOneTimeRead();
  }, []);

  const firebaseCallValueOneTimeRead = async () => {
    const channelNodeData = await firebaseReadDataOnce(
      `${FIREBASE_REF.channelNode}/${channelName}`,
    );
    // console.log('inbattle or not', channelNodeData);

    {
      if(channelNodeData?.calls?.JoinCalls === 'true') {
        setJoinCall(true)
        inviteSheetRef.current.open()
      } else {
        setJoinCall(false);
      }
    }
    {
      channelNodeData?.PKBattle?.inPKBattle === 'true' &&
        handlePkBattle(channelNodeData?.PKBattle);
    }
  };


  useEffect(() => {

    socket.emit('pkInfo', {user_id: completeData?.id})

    console.log("pkintoooooooooooooo hittedd suejkd ")
    socket.on('matchInfo', async(data) => {
      console.log("match infoooooooo", data)
    })
   
    socket.on('pkInfo', async(data) => {
       console.log("pkInfo infoooooooo!!!!!!!!!!!!!!!!!!!AAAAAAAAAAAAAAAAAAAAA!!}}}}}}}}}}}}", data)

       let dataMangae = data?.match_info;
       console.log("pkInfo infoooooooo!!!!!!!!!!!!!!!!!!!AAAAAAAAAAAAAAAAAAAAA!!}}}}}}}}}}}}", dataMangae?.match_id)
       if(completeData?.id === parseInt(dataMangae?.player1_id) || completeData?.id === parseInt(dataMangae?.player2_id)) {
          socket.emit('watchMatch', {matchId: dataMangae?.match_id})
          setInPk(true);
            console.log('found id');
            setBattleWith({
              id: dataMangae?.player1_id,
              vs: dataMangae?.player2_id,
              channelName: dataMangae?.match_id,
              sendGiftTo: completeData?.id
            });
            handlePKView(dataMangae?.match_id);
        }
    })
   
    socket.on('match_id', async(data) => {
      let dataMangae = data;
      console.log("match_id infoooooooo", data, dataMangae?.match_id)
      if(completeData?.id === parseInt(dataMangae?.player1_id) || completeData?.id === parseInt(dataMangae?.player2_id)) {
        socket.emit('watchMatch', {matchId: dataMangae?.match_id})
        setInPk(true);
        // if (data?.match_id) {
          console.log('found id');
          setBattleWith({
            id: dataMangae?.player1_id,
            vs: dataMangae?.player2_id,
            channelName: dataMangae?.match_id,
            sendGiftTo: completeData?.id
          });
          handlePKView(dataMangae?.match_id);
        // }
      }
    })

    socket.on('pkMatchEnded', async(data) => {
       console.log('pkMatchEnded pk from ari side ))))))))))))))@@@@@@@@@@@@@@@@@@', data, userUpdatedData?.id);
        pkBattleEnd()
    });

    return () => {
      socket.off('match_id')
      socket.off('matchInfo')
      socket.off('pkMatchEnded')
      socket.off('pkInfo')
    }
  }, [])

  const startPkBattle = () => {
    
  }

  const handlePkBattle = async data => {
    // console.log("zzlllllllllllllll", data)
    const pkData = await firebaseReadDataOnce(
      `${FIREBASE_REF.PKsearch}/${data?.channelId}`,
    );
    const filteredData = Object.values(pkData).filter(
      item => item.status === 'InBattle',
    );
    console.log('zz2222222222222222', filteredData);
    setInPk(true);
    if (filteredData?.[0]) {
      console.log('found id');
      setBattleWith({
        id: filteredData?.[0]?.id,
        vs: filteredData?.[0]?.vs,
        channelName: channelName,
      });
      handlePKView(filteredData?.[0]?.id);
    } else {
      console.log('not found id');
    }
  };

  // here id is channelID
  const handlePKView = async id => {
    clearAllNodesAndRef();
    navigation.navigate('AudiencePage', {
      channelId: id?.toString(),
      userLive: true,
      fromPk: true,
      completeData: completeData,
    });
    pkBattleGiftNode(id);
  };

  const pkBattleGiftNode = id => {
    // console.log('idddddddddddd', id)
    pkGiftRef.current = database()
      .ref(`${FIREBASE_REF.PKsearch}/gifts/${id}`)
      .on('child_added', snapshot => {
        console.log('gifttt', snapshot.val());
        receiveGiftFromFirebase(snapshot.val(), true);
      });
  };

  const channelChildChanged = () => {
    channelListenerRef.current = database()
      .ref(`/channels/${channelName}`)
      .on('child_changed', snapshot => {
        console.log('channels child changed11111111', snapshot.val());
        snapshot.val() && handleJoinCall(snapshot.val());
        {
          snapshot.val()?.inPKBattle === 'true' &&
            handlePkBattle(snapshot.val());
        }
        // { snapshot.val()?.inPKBattle === "false" && pkBattleEnd()}
      });
  };

  const pkBattleEnd = async () => {
    setInPk(false);
    // setPkStatus({type: 'true'})
   await leave();
    console.log('complete', completeData?.id);
   await generateToken(completeData?.id?.toString());
  };

  const handleJoinCall = val => {
    if (
      parseInt(val?.coHostID) === parseInt(userUpdatedData?.id) &&
      parseInt(val?.status) === 1
    ) {
      generateToken2();
    } else if (
      parseInt(val?.coHostID) === parseInt(userUpdatedData?.id) &&
      parseInt(val?.status) === 0
    ) {
      generateToken(channelName);
    }

    {
      val?.JoinCalls === 'true' ? setJoinCall(true) : setJoinCall(false);
    }
  };

  const firebaseWrite = async inCall => {
    if (!inCall) {
      await database()
        .ref(`/cohostTest/${channelName}/${userUpdatedData?.id}`)
        .remove();
      await database()
        .ref(`/channels/${channelName}/${userUpdatedData?.id}`)
        .remove();
      // joinCallModalRef.current.toggleModal()
    } else if (inCall) {
      database()
        .ref(`/channels/${channelName}/${uid}`)
        .set({
          coHostID: uid,
          full_name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
          img: userUpdatedData?.image,
          status: '0',
        });
    }
    joinCallModalRef.current.toggleModal();
  };

  const generateToken = async (channelName, fromPK) => {
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
        join(res?.data?.token, channelName, fromPK);
      } else {
        alert('' + res?.message)
      }
    } catch (error) {
      console.log('Hostpage screen, generatetoken func', error);
    }
  };

  const join = async (tok, channelName, fromPK) => {
    if (tok) {
      // console.log('innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', fromPK);
      if (isJoined && !fromPK) {
        return;
      }
      try {
        if (isHost) {
          agoraEngineRef.current?.startPreview();
          agoraEngineRef.current?.joinChannel(tok, channelName, parseInt(uid), {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          });
        } else {
          callBackMethod();
          // console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn2")
          // console.log('tokennnnnnnnnnnn', channelName)
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

  const leave = async () => {
    try {
      await agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
    } catch (e) {
      console.log(e);
    }
  };

  const agoraEvents = {
    onJoinChannelSuccess: () => {
      setIsJoined(true);
      console.log('joined channel');
    },
    onUserJoined: (_connection, Uid) => {
      setRemoteUid(props?.route?.params?.channelId);
      console.log('ermote uid', Uid, props?.route?.params?.channelId);

      // console.log(completeData?.id, "user joined", Uid, "connectionsss", _connection)
    },
    onUserOffline: (_connection, Uid) => {
      // setRemoteUid(0);
      // console.log('user offline 1', Uid, 'connectionk', _connection);
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

  const callBackMethod = async () => {
    try {
      const agoraEngine = agoraEngineRef.current;
      await agoraEngine.registerEventHandler(agoraEvents);
      agoraEngine.enableVideo();
      agoraEngine.setVideoEncoderConfiguration({
        width: 120,
        height: 120,
        frameRate: 15,
      });
    } catch (error) {
      console.log('error11', error);
    }
  };

  useEffect(() => {
    database()
      .ref(`/cohostTest/${channelName}`)
      .on('child_changed', snapshot => {
        //let check = [...cohostlist]
        // console.log('cohost96 child changed audience screen', snapshot.val());
        snapshot.val() && setRemoteUidCam(snapshot.val())
        setCounter(counter => counter + 1)
      });
  }, []);

  const updateCameraOn = (id, remoteUidCam) => {
    setcohostlist(
      cohostlist.map(user => {
        if (parseInt(user?.id) === id) {
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

  const [showEntry, setShowEntry] = useState(false);
  const [enteredUserName, setEnteredUserName] = useState(null);
  const [enteredUserImage, setEnteredUserImage] = useState(null);
  const [userDataFromFirebase, setUserDataFromFirebase] = useState(null);

  const checkupdate = () => {
    const onChildAdd = database()
      .ref(`/userlist/${channelName}`)
      .on('child_added', snapshot => {
        setUserDataFromFirebase(snapshot.val());
        let messageDate = new Date(snapshot.val()?.date);
        if (messageDate?.getTime() + 2000 > checkDate.getTime() + 500) {
          {
            snapshot.val()?.full_name &&
              setEnteredUserName(snapshot.val()?.full_name);
            setEnteredUserImage(snapshot.val()?.sender_level_image);
            toggleShowEntry();
          }
        }
        // handleUserList(snapshot.val())
      });
    // Stop listening for updates when no longer required
    return () => {
      database().ref(`/userlist/${channelName}`).off('child_added', onChildAdd);
    };
  };

  useEffect(() => {
    if (userDataFromFirebase) {
      if (!data.some(user => user?.id === userDataFromFirebase?.id)) {
        setData(prev => [...prev, userDataFromFirebase]);
      }
    }
    setUserDataFromFirebase(null);
  }, [userDataFromFirebase]);

  const toggleShowEntry = () => {
    // console.log("toggle", showEntry)
    setShowEntry(!showEntry);
  };

  // filtering data from user list when any user left the channel checking real time through database (tes) is the id that user left the channel we are getting real time user remove in tes
  useEffect(() => {
    {
      tes != uid &&
        data?.[0] &&
        tes &&
        setData(data?.filter(item => item?.id !== tes));
    }
    setTes(null);
  }, [tes]);

  const [data, setData] = useState([]);
  const [singleUserData, setSingleUserData] = useState();

  const userListRef = useRef()
  const FlatListController = () => {
    userListRef?.current?.open()
  };
  const handleUserListClose = () => {
     userListRef?.current?.close()
  };

  const [tes, setTes] = useState(null);
  const onUserRemove = () => {
    const onChildAdd = database()
      .ref(`/userlist/${channelName}`)
      .on('child_removed', snapshot => {
        setTes(snapshot.val()?.id);
      });
  };

  useEffect(() => {
    // if hostleft the channel
    
     if(parseInt(channelName) === parseInt(tes)) {
       leave();
      alert("Broad has been ended by Host")
     }
    
    if (parseInt(userUpdatedData?.id) === parseInt(tes)) {
      leave();
      // setDisableComments(true)
     // navigation.goBack();
    }
    // { parseInt(userUpdatedData?.id) === parseInt(tes) &&  leave();}
    {
      tes &&
        setcohostlist(
          cohostlist?.filter(item => parseInt(item?.id) !== parseInt(tes)),
        );
    }
    {
      tes != uid && tes && setData(data?.filter(item => item?.id !== tes));
    }
    setTes(null);
  }, [tes]);

  const removeUserFromNode = async () => {
    database().ref(`/channels/${channelName}/${uid}`).remove();
    await database()
      .ref(`/userlist/${channelName}/${uid}`)
      .remove()
      .then(() => console.log('successfully user removed from channel'));
  };

  const addToUserList = async () => {
    if (userUpdatedData?.id === 100000199) {
    } else {
      const currentDate = new Date();
      await database()
        .ref(`/userlist/${channelName}/${uid}`)
        .set({
          id: uid,
          full_name: userUpdatedData?.nick_name,
          image: userUpdatedData?.image,
          sender_level: userUpdatedData?.sender_level,
          reciever_level: userUpdatedData?.reciever_level,
          reciever_level_image: userUpdatedData?.reciever_level_image,
          sender_level_image: userUpdatedData?.sender_level_image,
          user_type_id: userUpdatedData?.user_type_id,
          status: '0',
          json_image: frameData?.[0]?.json_image,
          date: currentDate.toString(),
          badge: userUpdatedData?.badge,
        })
        .then(() => console.log('Data set.'));
    }
  };

  const handle = (channelName, fromPK) => {
    // callBackMethod();

    generateToken(channelName, fromPK);
  };

  const generateToken2 = async () => {
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
        join2(res?.token);
      }
    } catch (error) {
      console.log('Hostpage screen, generatetoken func', error);
    }
  };

  const join2 = async tok => {
    if (tok) {
      try {
        agoraEngineRef.current?.startPreview();
        console.log('inhost', tok);
        agoraEngineRef.current?.joinChannel(tok, channelName, parseInt(uid), {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
        setJoinCall(false);
        rldbCoHost();
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('no token', token);
    }
  };

  const rldbCoHost = () => {
    try {
      let val = camera ? 1 : 0;
      database()
        .ref(`/cohostTest/${channelName}/${uid}`)
        .set({
          id: uid,
          image: userUpdatedData?.image,
          cameraOn: 0,
          name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
          micOn: true,
        });
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
          inCall={props?.joinCall}
          onPressAPllyBtn={inCall => {
            firebaseWrite(inCall);
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
      UpdateUserData()
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
      colorType: 'white',
titleColor: userUpdatedData?.user_type_id === 3 ? '#FF51E3' : '#03FFF0',
      name: userData?.user?.nick_name,
      message: 'has entered the room',
    },
  ]);

  const checkDate = new Date();

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/comments/${channelName}`)
      .on('child_added', snapshot => {
        checkfun(snapshot.val());
      });

      socket.on('GameWinningPatti', data => {
        checkfun(data, true);
      });

    const checkfun = (val, dontCheckTime) => {
      let messageDate = new Date(val?.date);

      if (messageDate?.getTime() > checkDate.getTime() + 3000 || dontCheckTime) {
        setMessages(prev => [...prev, val]);
        //  handleEndReached()
      }
    };

    // Stop listening for updates when no longer required
    return () => {
      database().ref(`/comments/${channelName}`).off('child_added', onChildAdd);
      socket.off('GameWinningPatti')

      //setMessages([])
    };
  }, []);

  useEffect(() => {
    database()
      .ref(`/cohostTest/${channelName}`)
      .on('child_added', snapshot => {
        // console.log("cohostadded", snapshot.val())
        snapshot.val()?.id && setCoHost1ID(snapshot.val());
        // handleCohost(snapshot.val()?.id)
      });
  }, []);

  useEffect(() => {
    let filter = cohostlist.filter(item => item?.id === coHost1Id?.id);
    if (filter?.[0]) {
      console.log(`${coHost1Id} is available in the array`);
    } else {
      setcohostlist(prev => [...prev, coHost1Id]);
      //handleCohostCam(cohostlist, coHost1Id)
      console.log(`${coHost1Id?.[0]} is not available in the array`);
    }
  }, [coHost1Id]);

  const checkGiftStatus = () => {
    database()
      .ref(`/gifts/${channelName}`)
      .on('child_added', snapshot => {
        // console.log('dataaaaaaaaaasdfdsfdsfaaaaaa', snapshot);
        receiveGiftFromFirebase(snapshot.val());
      });
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

  const receiveGiftFromFirebase = async (val, fromPK) => {
    let messageDate = new Date(val?.date);
    if (messageDate?.getTime() > checkDate.getTime() + 500) {
      // console.log('gift recirveddddddddddddddddddd', val)
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

  useEffect(() => {
    playAnim();
  }, [giftReceived]);

  const ref = React.useRef();

  const playAnim = () => {
    ref.current?.play();
  };

  const pauseAnim = () => {
    ref.current?.pause();
    setGiftReceived(false);
  };

  const [itemRemove, setItemRemvoe] = useState();

  const coHostChildRemove = () => {
    database()
      .ref(`/cohostTest/${channelName}`)
      .on('child_removed', snapshot => {
        snapshot.val()?.id && setItemRemvoe(snapshot.val()?.id);
      });
  };

  useEffect(() => {
    // console.log("cohostlsit1111111111111", cohostlist, itemRemove, cohostlist.filter((item) => parseInt(item?.id) !== parseInt(itemRemove) ))
    {
      itemRemove &&
        setcohostlist(
          cohostlist.filter(
            item => parseInt(item?.id) !== parseInt(itemRemove),
          ),
        );
    }
    if (userUpdatedData?.id === parseInt(itemRemove)) {
      database()
        .ref(`/channels/${channelName}/${uid}`)
        .update({
          coHostID: uid,
          full_name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
          img: userUpdatedData?.image,
          status: '0',
        })
        .then(() => {
          leave();
        });
    }
    setItemRemvoe(null);
  }, [itemRemove]);

  const deleteCoHostNode = async () => {
    await database()
      .ref(`/cohostTest/${channelName}/${userUpdatedData?.id}`)
      .remove();
  };

  const rldbSendMessage = async (disableComments, mentionedUser) => {
    if (!disableComments) {
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
          image: userUpdatedData?.image,
          badge: userUpdatedData?.badge,
          message: messsageR,
          mentionedUser: mentionedUser,
          uid: newNodeKey,
          colorType: 'white',
titleColor: userUpdatedData?.user_type_id === 3 ? '#FF51E3' : '#03FFF0',
          date: currentDate.toString(),
        });
    } else {
      Alert.alert('You are muted by host.');
    }
    setMessageR('');
    // Keyboard.dismiss();
  };

  const entryMessage = async (msgText) => {
    dispatch(updateHostBeans(completeData?.coins))
    const currentDate = new Date();
    if (userUpdatedData?.id === 100000199) {
    } else {
      const newNodeKey = database()
        .ref()
        .child(`/comments/${channelName}`)
        .push().key;
      await database()
        .ref(`/comments/${channelName}/` + newNodeKey)
        .set({
          // id: uid,
          id: uid,
          name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
          message: msgText,
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
    }
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
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', event => {
      setKeyboardHeight(event.endCoordinates.height);
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

  const handleButtonPress = mentionedUser => {
    Keyboard.dismiss();
    setMentionedUser(mentionedUser);
    textInputRef.current.focus();
  };

  const handleCohostClick = id => {
    console.log('handleCohostClick ', id);
    if (parseInt(id) === parseInt(userUpdatedData?.id)) {
      joinCallModalRef.current.toggleModal();
    } else {
      // setSendGiftToUserId(id)
      Gift.current.open();
    }
  };

    ////Animation Code////
    const [value, setValue] = useState([]);
  
    const removeElementAtIndex0 = () => {
      const newArray = [...value];
      newArray.shift();
      setValue(newArray);
    };


  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <View style={styles.Bg}>
       

          <View style={{position: 'absolute', zIndex: 13, marginHorizontal: 5}}>
            <View>
              {/* header complete */}
              <TopLineFinalComponet
                onPressFollow={() => handleFollowUser()}
                fromAudiencePage={true}
                frameData={completeData?.frame}
                completeHostData={completeData}
                isFollowing={isFollowing}
                onPressHostImage={() => {
                  setSingleUserData(completeData)
                  ProfileRef.current.open()}
                }
                onpresS={FlatListController}
                data={data}
                data2={data.length * 9}
                hostId={completeData?.id}
                starLevelImage={completeData?.star_level_image}
                hostImage={completeData?.image}
                userUpdateDataNickName={
                  hostName == null
                    ? hostName + hostName.length > 7 && '...'
                    : completeData?.nick_name
                }
                onPress2={() => {
                  modal2Ref.current.open();
             
                }}
                onPressCross={() => navigation.goBack()}
                onPressStarLevel={() => modalRef.current.toggleModal()}
              />
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              top: heightPercentageToDP(15),
              left: 0,
              width: '100%',
              zIndex: 50,
              bottom: 30,
              height: '20%',
              //  backgroundColor:'red'
            }}>
            <GiftAnimationPattiGlobal value={value?.[0]} removeItem={removeElementAtIndex0} />
          </View>

          <View
                    style={{
                      zIndex: 50,
                      position: 'absolute',
                      height: heightPercentageToDP(75),
                    }}>
                  <LuckyGiftAnimationPatti channelName={channelName} />
                  </View>

          {!userLive && (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <AnimatedProfileDp
                img={completeData?.image}
                imgSize={60}
                frameSize={20}
                frame={frameData?.[0]?.json_image}
              />
              <Text style={{ color: 'white', fontSize: 12, top: 45 }}>
                Broad has been ended.
              </Text>
            </View>
          )}

          <View>
            <View style={{ flex: 1 }}>
              <View style={{ height: screenHeight, width: '100%' }}>
                {giftReceived && (
                  <View style={{position: 'absolute', zIndex: 12, height: heightPercentageToDP(100), width: widthPercentageToDP(100)}}>
                  {giftReceived &&  <Rnfetchblob giftData = {giftReceived} handleAnimationEnded={() => setGiftReceived(false)} />}
                  </View>
                )}
                

                <View style={{}}>
                  {isJoined && remoteUid != 0 && (
                    <View>
                      {showEntry && (
                        <View
                          style={{
                            zIndex: 12,
                            position: 'absolute',
                            height: heightPercentageToDP(75),
                          }}>
                          <AnimatedJsonEntry
                            image={enteredUserImage}
                            inputValue={
                              enteredUserName + ' has entered the room'
                            }
                            onAnimationComplete={toggleShowEntry}
                          />
                        </View>
                      )}

                      {inPK === false ? (
                        <View style={styles.videoView}>
                          <AgoraView id={remoteUid} />
                        </View>
                      ) : (
                        <View>
                          <PKBattleHostsView
                            battleWith={battleWith}
                            fromAudience={true}
                            // matchStatus={(data) => setPkStatus(data)}
                          />
                        </View>
                      )}
                    </View>
                  )}
                </View>

                {isJoined && remoteUid != 0 && (
                  <View style={[styles.overlay]}>
                    <FlatList
                      data={cohostlist}
                      keyExtractor={item => item?.id?.toString()}
                      renderItem={item => {
                        return (
                          <View>
                            <CohostStyle
                              item={item?.item}
                              onPressCohost={id => handleCohostClick(id)}
                            />
                          </View>
                        );
                      }}
                    />
                  </View>
                )}

                {
                  <View
                    style={{
                      position: 'absolute',
                      borderRadius: 12,
                      bottom: keyboardHeight + 2,
                      left: keyboardHeight != 0 ? 0 : 20,
                      backgroundColor:
                        keyboardHeight == 0 ? 'transparent' : 'white',
                      zIndex: 13,
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
                        // maxLength={40}
                        // value={message}
                        placeholder="Leave a comment..."
                        placeholderTextColor="grey"
                      />
                      {keyboardHeight != 0 && (
                        <TouchableOpacity
                          onPress={() =>
                            rldbSendMessage(disableComments, mentionedUser)
                          }
                          style={[styles.icon1box, { flex: 1 }]}>
                          <Feather name="send" size={16} color="white" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                }

                <View style={[styles.overlay, { bottom: 80, right: 15 }]}>
                  {joinCall && (
                    //  firebaseWrite()
                    <TouchableOpacity
                      style={{ width: 60 }}
                      onPress={() => joinCallModalRef.current.toggleModal()}>
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
                          Join Call
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.bottombox1}>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      height: heightPercentageToDP(25),
                      bottom: 30,
                      width: '60%',
                      zIndex: 12,
                    }}>
                      <CommentsComponent
                        message={messages}
                        onPressComment={item => handleSingleUserData(item)}
                      />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.bottombox,
                {
                  width: '100%',
                  backgroundColor: transparent,
                  marginHorizontal: 10,
                },
              ]}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity style={{}}>
                  <TouchableOpacity
                    onPress={() => handleButtonPress()}
                    style={styles.icon1box}>
                    <Feather name="message-circle" size={24} color="white" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity
                  onPress={() => shareToWhatsApp(hostName, channelName)}
                  style={styles.icon1box}>
                  <Simple name="share-alt" size={20} color="#FFE000" />
                </TouchableOpacity>

                <View style={styles.lefticonsbox}>
                  <TouchableOpacity
                    onPress={() => {
                      Msg.current.open();
                    }}
                    style={styles.icon1box}>
                    <MessageIcon
                      name="facebook-messenger"
                      size={22}
                      color="#c471ed"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.icon1box}
                    onPress={() => gameSheetRef.current.open()}>
                    <Entypo name="game-controller" color="#12c2e9" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setSendGiftToUserId(completeData?.id);
                      Gift.current.open()
                      // {pKStatus?.type === 'pk' || pKStatus?.type === 'true' && Gift.current.open()}
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
          </View>

          <View>
            <RbSheetComponent
              view={<GameSheet />}
              refUse={gameSheetRef}
              backgroundColor={'black'}
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
            view={<MessageSheet onCrossPress={() => Msg.current.close()} />}
            refUse={Msg}
            backgroundColor={'white'}
            close={false}
            height={heightPercentageToDP(40)}
          />

          <RbSheetComponent
            view={
              <GiftSheetData
                onPressClose={() => Gift.current.close()}
                sendGiftTo={[{ cohostID: sendGiftToUserId, name: completeData?.nick_name ?? completeData?.full_name }]}
                channelName={channelName}
                cohostData={data}
                isHost={true}
                fromVideoLiveStreaming={true}
                battleWith={battleWith}
                inPK={inPK}
              />
            }
            backgroundColor={'black'}
            refUse={Gift}
            close={true}
            height={'50%'}
          />

          <RbSheetComponent
            view={
              <FansRanking
                liveID={completeData?.id}
                userData={userData}
                onPressCross={() => modal2Ref.current.close()}
              />
            }
            refUse={modal2Ref}
            close={false}
            height={heightPercentageToDP(80)}
          />

          <StarModal view={<DailyStar />} ref={modalRef} />

          <RbSheetComponent
            view={
              <ProfileModalStyles
                data={singleUserData}
                onPress={() => ProfileRef.current.close()}
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
                <InviteAsGuest onPressReject={handleReject} onPressAPllyBtn={handleInvitation} />
              }
              animationType={'slide'}
              refUse={inviteSheetRef}
              backgroundColor={'transparent'}
              close={false}
              height={heightPercentageToDP(30)}
            />
        
          <StarModal
            view={
              <JoinCallModal
                joinCall={joinCall}
                onPress={() => joinCallModalRef.current.toggleModal()}
              />
            }
            ref={joinCallModalRef}
          />
        </View>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  giftReceived: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    width: 116,
    height: 140,
    borderWidth: 3,
  },
  border: {
    width: 120,
    height: 144,
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
    backgroundColor: 'black',
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
    position: 'absolute',
    zIndex: 12,
    top: heightPercentageToDP(94),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: primaryColor,
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
    marginHorizontal: 3,
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
  modalView: {
    width: '80%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    height: heightPercentageToDP(50),
  },
  coinbag: {
    height: 70,
    width: 70,
    marginBottom: 5,
  },
  Eventtxt: {
    color: '#EC3E33',
    fontSize: 17,
    borderBottomWidth: 1,
    borderColor: '#EC3E33',
    fontWeight: '500',
    marginVertical: 15,
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
  DrawListStyleView: {
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'space-around',
    marginHorizontal: widthPercentageToDP(1.5),
    width: widthPercentageToDP(22),
    marginVertical: 2,
    paddingVertical: 2,
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
    zIndex: 13,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
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
  animation: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: '100%',
    // height: '100%',
    zIndex: 1,
    // backgroundColor: 'red'
  },
});
export default AudiencePage;
