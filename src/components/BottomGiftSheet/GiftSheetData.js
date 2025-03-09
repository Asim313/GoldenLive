import React, {useState, useRef, useEffect, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  PixelRatio,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import {
  ApiCallToken,
  ApiCallTokenArrayData,
  ApiCallTokenNode,
} from '../../Services/Apis';
import {useDispatch, useSelector} from 'react-redux';
import GiftSheetTopUsers from './GiftSheetTopUsers';
import GiftSheetHostIcon from './GiftSheetHostIcon';
import Progressbar from './Progressbar';

import {
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';
import {listenLuckyGiftSocket, luckyGiftCounter, updateHostBeans, updatedData} from '../../Redux/Actions';
import AllIcons, {IconList} from '../AllIcons';
import AnimatedLottieView from 'lottie-react-native';
import {firebaseReadDataOnce} from '../../Services/Firebase';
import {formatNumerWithK} from '../../Services/GlobalFuntions';

const data = [
  {number: 1},
  {number: 10},
  {number: 35},
  {number: 45},
  {number: 65},
  {number: 95},
];

const GiftSheetData = memo(({
  beans,
  onPressClose,
  channelName,
  cohostData,
  isHost,
  fromVideoLiveStreaming,
  sendGiftTo,
  battleWith,
  inPK
}) => {
  //  console.log("cohosttttttttttt", sendGiftTo)
  const node = fromVideoLiveStreaming
    ? `/gifts/${channelName}`
    : `/giftsMultiRoom/${channelName}`;
  const commentsNode = fromVideoLiveStreaming
    ? `/comments/${channelName}`
    : `/commentsMulti/${channelName}`;
  const dispatch = useDispatch();
  const userIsHost = true; //If host then Icon will be show
  const refRBSheetG = useRef(null);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const hostUpdatedBeans = useSelector(state => state.hostRed.hostBeans);
  const getListGiftAll = useSelector(state => state.hostRed.getListGiftAll);

  useEffect(() => {
    {getListGiftAll?.[0] && GetGifts(getListGiftAll)}
  }, [getListGiftAll])

  const GetGifts = async (data) => {
    try {
      // const res = await getGiftsList({ token: userData?.token });
      if(fromVideoLiveStreaming) {
        setGetGifts(data?.filter(item => item?.title !== 'Friend Gift'));
      } else {
        setGetGifts(data);
      }
      setGiftChildData(data?.[0]?.child_categorie ?? []);
    } catch (e) {
      console.log('GetGifts error -- ', e.toString());
    }
  };

  // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", hostUpdatedBeans)
  // console.log("//////////////////]]", hostUpdatedBeans)
  const userData = useSelector(state => state.auth.userData);
  const [cohost, setCohost] = useState(cohostData);

  const {height: SCREEN_HEIGHT} = Dimensions.get('window');
  const scale = SCREEN_HEIGHT / 667;
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const socket = useSelector(state => state?.homeRed?.socketConnection)


  const [selectedGift, setSelectedGift] = useState([null]); //For Selected Singal Gift.
  const [selectedItem, setSelectedItem] = useState(null); //For Draws, Event and Popular GiftTop Menu.
  const [selectedButton, setSelectedButton] = useState([]); // For All Item, Mean Click on Draws, select all the Draws Gift Item.
  const [selectedNumber, setSelectedNumber] = useState(data[0]);
  const [showNum, setShowNum] = useState(false);

  const [getGifts, setGetGifts] = useState([]); //Fetch Gift Api
  const [giftChildData, setGiftChildData] = useState([]); //Store Gift Child Data, [child_categorie)]
  const [giftCounter, setGiftCounter] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showIcon, setShowIcon] = useState(false);
  const [giftNode, setGiftNode] = useState(null);
  const [count, setCount] = useState(1);

  const ref = useRef();

  const playAnim = async (count) => {
    try {
      setGiftCounter(true)
      let ch = selectedUsers?.filter(item => item?.cohostID);
      if(userUpdatedData?.beans < selectedGift?.beans) {
        Alert.alert('Do not have enough beans.')
        return;
      }
      console.log('inpk', inPK)
      
      
      if (selectedGift?.id && ch?.[0]) {

        if(selectedItem === 'Lucky Gift') {
            ref.current?.play();
            await handleSendButtonClick( selectedGift,
            selectedUsers,
            selectedNumber?.number,
            count);
            dispatch(listenLuckyGiftSocket(true))
            setCount(prev => prev + 1);
            setShowIcon(true);
            await delay(100)
            setGiftCounter(false)
            return
        } else {
          
          SendGiftsToHost(
            selectedGift,
            selectedUsers,
            selectedNumber?.number,
            count,
          )
        }     
      } else if (!selectedGift?.id) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          textBody: 'Please Select Gift.',
          autoClose: 1000,
        });
      } else if (ch === undefined || ch?.[0] === undefined) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          textBody: 'Please Select User Whom You Want To Send Gift.',
          autoClose: 1000,
        });
      }

      setGiftCounter(false)
    } catch (error) {
      console.error(error);
    }
  };

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

  const pauseAnim = giftNode => {
    socket.emit('LuckyGift',nullData);
    // sendLuckyGIftAPi(nullData)
    setCount(1);
    setShowIcon(false);
    ref.current?.pause();
  };

  const handleSendButtonClick = async (selectedGift, selectedUsers, selectedNumber, count) => {
    // console.log('selected, users', selectedGift)

    if(inPK) {
      const dataToEmit  = {
        matchId: battleWith?.channelName,
        playerId: battleWith?.sendGiftTo,
        giftCount: selectedGift?.beans,
      }
      await socket.emit('sendGift', dataToEmit)
       console.log('send gift done ?????????????????????????????????|||||||||||||||||', dataToEmit)
      // return
    }

    let check = fromVideoLiveStreaming ? cohost?.filter((item) => item?.id === selectedUsers?.[0].cohostID)
      :
      cohost?.filter((item) => item?.cohostID === selectedUsers?.[0].cohostID)
    const hostIdsArray = selectedUsers?.map(item => item?.cohostID);
    let filterData = hostIdsArray
    if(hostIdsArray?.[0]) {
       filterData = hostIdsArray.filter(item => item !== undefined);
    } 
    const currentDate = new Date();
    const data = {
      num_gift: 1,
      authorization: userData?.token, 
      gift_id: selectedGift?.id,
      host_ids: filterData,
      auth_id: userUpdatedData?.id,
      count_gift: count,
      date_time : currentDate.toString(),
      channel: channelName
    };
    
  const data1 = {
    senderNickname: userUpdatedData?.nick_name ?? userUpdatedData?.full_name ,
    sender_profile: userUpdatedData?.image,
    giftName: selectedGift?.title,
    giftImage: selectedGift?.image, 
    count: count,
    showBtn: true,
    num_gift: 1,
      authorization: userData?.token, 
      gift_id: selectedGift?.id,
      host_ids: filterData,
      auth_id: userUpdatedData?.id,
      count_gift: count,
      date_time : currentDate.toString(),
      channel: channelName

  }
  dispatch(luckyGiftCounter(data1))
  
  onPressClose()
  // console.log("dkkkkkkkk", cohostData)
 // await sendLuckyGIftAPi(data)
  };


  const sendLuckyGIftAPi = async (data) => {
    try {
      setGiftCounter(true)
      const res = await ApiCallTokenNode({
        paramsBody: data,
        route: `lucky/store`,
        verb: 'POST',
      });
       if(res?.message?.message === "Not enough beans") {
        alert("You don't have enough beans.")
       } else {
        dispatch(updateHostBeans(res?.message?.beans ?? null));
       }
      setGiftCounter(false)
    } catch (error) {
      console.log('ERROR lucky/store api');
    }
  }


  useEffect(() => {
    setCohost(cohostData);
  }, [cohostData]);

  useEffect(() => {
    {
      fromVideoLiveStreaming && setSelectedUsers(sendGiftTo);
    }

    return () => {
      socket.emit('LuckyGift',nullData);
    //  sendLuckyGIftAPi(nullData)
    };
  }, []);


  const SendGiftsToHost = async (giftId, hostId, numOfGifts, count) => {
    const hostIdsArray = hostId?.map(item => item?.cohostID);
    const filterData = hostIdsArray.filter(item => item !== undefined);
    try {
      const paramsBody = {
        host_id: filterData,
        gift_id: giftId?.id,
        num_gifts: numOfGifts,
      };
      if (userUpdatedData.beans < giftId?.beans) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          textBody: 'You Dont have enough beans',
          autoClose: 1000,
        });
      } else {
        const res = await ApiCallTokenArrayData({
          params: userData.token,
          paramsBody: paramsBody,
          route: 'send-gift/new',
          verb: 'POST',
        });
        
        console.log("are dfja ",res, userData.token,  paramsBody)
        if (res?.giftSent == true) {
          await sendGiftToFirebase(
            selectedGift,
            giftId?.beans,
            paramsBody,
            hostId,
            count,
            res?.receivedBeans,
          );
          dispatch(updatedData(userData));
        } else {
          console.log('gift not sent', res.giftSent);
        }
        // Toast.show({
        //   type: ALERT_TYPE.SUCCESS,
        //   textBody: '' + res.message,
        //   autoClose: 1000,
        // });
      }
    } catch (e) {
      console.log('send gift error is -- ', e.toString());
    }
  };

  const sendGiftToFirebase = async (
    data,
    beans,
    body,
    hostId,
    count,
    receivedBeans,
  ) => {
    // console.log('dataaaaaaaaaa', data, hostId);

    if(inPK) {
      const dataToEmit  = {
        matchId: battleWith?.channelName,
        playerId: battleWith?.sendGiftTo,
        giftCount: receivedBeans,
      }
      await socket.emit('sendGift', dataToEmit)
      // console.log('send gift done', dataToEmit)
      // return
    }

    const currentDate = new Date();
    try {
      if (selectedItem === 'Friend Gift') {
        const newNodeKey = database()
          .ref()
          .child(`/giftsaudio/friendGift/${channelName}`)
          .push().key;

        setGiftNode(newNodeKey);
        database()
          .ref(`/giftsaudio/friendGift/${channelName}/${newNodeKey}`)
          .set({
            id: data?.id,
            img: data?.image,
            status: count,
            date: currentDate.toString(),
            beans: receivedBeans,
            receiverId: hostId?.[0]?.cohostID,
            senderName: userUpdatedData?.nick_name ?? userUpdatedData?.full_name
          });
      } else {
        const newNodeKey = database().ref().child(node).push().key;

        database()
          .ref(`${node}/` + newNodeKey)
          .set({
            id: userUpdatedData?.id,
            giftId: data?.id,
            img: data?.image,
            icon: data?.json,
            audio: data?.audio_sound,
            date: currentDate.toString(),
            beans: receivedBeans,
            receiverId: hostId?.[0]?.cohostID,
            senderName: userUpdatedData?.nick_name ?? userUpdatedData?.full_name
          });

          database()
        .ref(`/globalNotificationQ/${newNodeKey}`)
        .set({
          id: userUpdatedData?.id,
          giftId: data?.id,
          img: data?.image,
          senderImage: userUpdatedData?.image,
          icon: data?.json,
          audio: data?.audio_sound,
          date: currentDate.toString(),
          beans: receivedBeans,
          receiverId: hostId?.[0]?.cohostID,
          receiverName: hostId?.[0]?.name,
          senderName: userUpdatedData?.nick_name ?? userUpdatedData?.full_name
        });
      }

      const nodeToReadGiftsReceived = fromVideoLiveStreaming
        ? `/cohostTest/${channelName}/${hostId?.[0]?.cohostID}`
        : `/cohostMultiRoom/${channelName}/${hostId?.[0]?.cohostID}`;
      //for audio cohostaudioTest
      const res = await firebaseReadDataOnce(nodeToReadGiftsReceived);
      if (res) {
        const total =
          parseInt(res?.giftsReceived ?? 0) + parseInt(receivedBeans ?? 0);
        database().ref(nodeToReadGiftsReceived).update({
          giftsReceived: total,
        });
      }

      const newNodeKey1 = database().ref().child(commentsNode).push().key;
      database()
        .ref(`${commentsNode}/` + newNodeKey1)
        .set({
          name: userData?.user?.nick_name,
          message: 'has send ' + data.title + ' x ' + body?.num_gifts,
          uid: newNodeKey1,
          colorType: '#00FFA3',
          date: currentDate.toString(),
        });

      
    } catch (e) {
      console.log('error in sending firebase', e.toString());
    }
  };

  const handleNumberPress = num => {
    setSelectedNumber(num);
    setShowNum(false);
  };

  const renderDataItem = ({item}) => (
    <TouchableOpacity onPress={() => handleNumberPress(item)}>
      <Text style={styles.helloText}>{item.number}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    // For Top Names (Draws, Event, Papular etc, [Volume, CPC, SB(Difficulty)])
    return (
      <View style={styles.box}>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={[
              selectedItem === item.title
                ? {
                    color: '#c268de',
                    borderBottomWidth: 1,
                    borderBottomColor: '#c268de',
                  }
                : {color: 'white'},
              {fontSize: 12},
            ]}
            onPress={() => {
              // console.log("item", item.child_categorie,[])
              setGiftChildData(item?.child_categorie);
              setSelectedItem(item?.title);
              setSelectedButton(item);
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderGiftItem = ({item}) => {
    // For Gifts (Gift Image, name and beans)
    return (
      <View style={styles.GiftView}>
        <TouchableOpacity
          style={[
            {
              alignItems: 'center',
              borderWidth: 2,
              borderColor: 'transparent',
              borderRadius: 4,
              padding: 3,
              marginVertical: 3,
              borderWidth: 1,
              borderColor: '#009470',
              width: 80,
            },
            selectedGift === item && {backgroundColor: '#009470'},
          ]}
          onPress={() => {
          //  console.log("item", item)
            setSelectedGift(item)
          }
          }>
          <Image source={{uri: item.image}} style={styles.itemImage} />
          <View>
            <Text style={{color: 'white', fontSize: 11}}>{item.title}</Text>
            <Text style={styles.bean}>{item.beans}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSelectedUsers = sendGiftToUser => {
    setSelectedUsers(sendGiftToUser);
  };

  const muteUser = userData => {
    if (userData?.cohostID) {
      database()
        .ref(`/cohostaudioTest/${channelName}/${userData?.cohostID}`)
        .update({
          isMicOn: 'false',
        });
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        textBody: 'Please select user.',
        autoClose: 1000,
      });
    }
  };

  const removeUserFromList = userData => {
    if (parseInt(userUpdatedData?.id) !== parseInt(userData?.cohostID)) {
      if (userData?.cohostID) {
        database()
          .ref(`/cohostaudioTest/${channelName}/${userData?.cohostID}`)
          .remove();
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          textBody: 'Please select user.',
          autoClose: 1000,
        });
      }
    }
  };

  const ViewProfile = () => {
  };


    // const socket = SOCKET

  return (
    <View style={{flex: 1}}>
      {
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 5,
          }}>
          <GiftSheetTopUsers
          selectedItem={selectedItem}
          channelName={channelName}
          handleUsers={handleSelectedUsers}
          cohostData={cohost}
        />
          {isHost && (
            <GiftSheetHostIcon
              onPressMic={() => muteUser(selectedUsers?.[0])}
              onPressRemoveFromCall={() =>
                removeUserFromList(selectedUsers?.[0])
              }
              onPressViewProfile={ViewProfile}
              selectedUser={selectedUsers?.[0]}
              CloseSheet={refRBSheetG}
              isHost={userIsHost}
            />
          )}
        </View>
      }
      <Progressbar />

      <View>
        <FlatList
          data={getGifts}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      </View>

      {/* {selectedButton && ( */}
      <FlatList
        // backgroundColor={'red'}
        data={giftChildData}
        renderItem={renderGiftItem}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        numColumns={4}
      />
      {/* )} */}

      <View style={styles.giftBottom}>
        <Text style={{fontSize: 12, color: 'white', fontWeight: 'bold'}}>
          Beans: {formatNumerWithK(userUpdatedData?.beans)}
        </Text>

        <View style={{}}>
          <TouchableOpacity onPress={() => setShowNum(!showNum)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.helloText}>
                {''}
                {selectedNumber ? selectedNumber.number : number}
              </Text>
              {showNum ? (
                <Ionicons
                  name="chevron-up"
                  size={16}
                  style={{color: 'white'}}
                />
              ) : (
                <Ionicons
                  name="chevron-down"
                  size={16}
                  style={{color: 'white'}}
                />
              )}
            </View>
          </TouchableOpacity>
          {showNum && (
            <FlatList
              data={data}
              renderItem={renderDataItem}
              keyExtractor={(item, index) => item.number + index}
              style={{
                position: 'absolute',
                top: PixelRatio.roundToNearestPixel(-195 * scale),
              }}
            />
          )}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: !showIcon ? '#c268de' : 'transparent',
            width: 70,
            padding: 7,
            borderRadius: 2,
          }}
          onPress={() => {

          playAnim(count)
          }}>
          {showIcon ? (
            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: -15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: 'red',
                  borderRadius: 200,
                  height: 70,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AllIcons
                  name={IconList.FontAwesome}
                  iconName={'send'}
                  color={'white'}
                  size={30}
                />
              </View>
              <AnimatedLottieView
                // autoPlay
                ref={ref}
                loop={false}
                autoPlay={true}
                style={{
                  width: 80,
                  height: 80,
                }}
                onAnimationFinish={() => pauseAnim(giftNode)}
                source={require('../../../src/assets/json/96199-round-circle-loading.json')}
              />
            </View>
          ) : (
            <Text style={{color: 'white', alignSelf: 'center'}}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default GiftSheetData;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    marginVertical: 5,
  },
  btn: {
    paddingHorizontal: 6.5,
    marginHorizontal: 5,
  },
  itemImage: {
    width: 60,
    height: 55,
  },
  helloText: {
    fontWeight: '500',
    color: 'white',
    fontSize: 16,
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#c268de',
    backgroundColor: '#3e4863',
    paddingHorizontal: 20,
    padding: 10,
  },
  GiftView: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  bean: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
  },
  giftBottom: {
    alignItems: 'center',
    backgroundColor: '#3e4863',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    padding: 10,
  },
});
