import React, {memo, useState} from 'react';
import database from '@react-native-firebase/database';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native-paper';
import { ApiCallToken } from '../Services/Apis';
import GiftSheetTopUsers from './BottomGiftSheet/GiftSheetTopUsers';

const EmojiListSheet = memo(({channelName, cohostData}) => {

  // console.log("cohost", cohostData)
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [emojiData, setEmojiData] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const [showSticker, setShowSticker] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null)

  const updateStickerValue = async (item) => {

    let senderSeat = cohostData?.filter((item) => item?.cohostID === userUpdatedData?.id)
    let receiverId = cohostData?.filter((item) => item?.cohostID === selectedUser)
    console.log("cohost", receiverId?.[0]?.position?.x)
    database()
      .ref(`/cohostaudioTest/${channelName}/${userUpdatedData?.id}`)
      .update({
        sticker: item?.json,
        stickerImg: item?.image,
        sendToPositionX: receiverId?.[0]?.position?.x,
        sendToPositionY: receiverId?.[0]?.position?.y,
        fromPositionX: senderSeat?.[0]?.position?.x,
        fromPositionY: senderSeat?.[0]?.position?.y,
        // senderSeat: senderSeat?.[0]?.cohostID,
        // receiverSeat: receiverId?.[0]?.cohostID,
      })

      await delay(6000)

      database()
      .ref(`/cohostaudioTest/${channelName}/${userUpdatedData?.id}`)
      .update({
        sticker: null,
        senderSeat: null,
        receiverSeat:  null,
        stickerImg:  null,
        sendToPositionX: null,
        sendToPositionY: null,
        fromPositionX: null,
        fromPositionY: null
      });

  };

  const getEmojies = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'get-emojies',
        verb: 'GET',
      });
      setEmojiData(res.data);
      setShowSticker(true);
    } catch (error) {
      console.log('ERROR getRecordData', error);
    }
  };
  useEffect(() => {
    getEmojies();
  }, []);
  return (
    <LinearGradient
      colors={['#3A0606', '#101355']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        justifyContent: 'center',
        position: 'absolute',
        height: 300,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
       // paddingVertical: 15,
        paddingTop: 35,
      }}>
      {!showSticker ? (
        <ActivityIndicator />
      ) : (
        <View style={{}}>
          <View style={{marginHorizontal: 5}}>
           <GiftSheetTopUsers
           selectedItem={() => console.log('hejkk')}
           channelName={channelName}
           handleUsers={(item) => setSelectedUser(item?.[0]?.cohostID)}
           setSelectedUsers={() => console.log('hejkk')}
           cohostData={cohostData}
           />
           </View>
           
          <FlatList
            numColumns={4}
            data={emojiData}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    padding: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '26%',
                  }}
                  onPress={() => {
                     updateStickerValue(item);
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 30.9, width: 30.9, bottom: 4}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 10,
                      alignSelf: 'center',
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
            contentContainerStyle={{justifyContent: 'space-evenly', paddingBottom: 30}}
          />
        </View>
      )}
    </LinearGradient>
  );
})

export default EmojiListSheet;
