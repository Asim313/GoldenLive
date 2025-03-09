import React from "react";
import { Text, View } from "react-native";
import database from '@react-native-firebase/database';
import { ApiCallToken } from "../Services/Apis";


const GameSheetComponent = () => {

    const [selectedGift, setselectedGift] = useState();
    const [selectedGiftData, setSelectedGiftData] = useState();
    const [sendedBeans, setsendedBeans] = useState();
    const [selectGiftBtn, setselectGiftBtn] = useState(0);

    const SendGiftsToHost = async beans => {
        try {
          const paramsBody = {
            user_id: userData.user.id,
            host_id: liveID,
            beans: beans,
          };
          if (userUpdatedData.beans < beans) {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              textBody: 'You Dont have enough beans',
              autoClose: 1000,
            });
          } else {
            const res = await ApiCallToken({
              params: userData.token,
              paramsBody: paramsBody,
              route: 'send-gift',
              verb: 'POST',
            });
            getUpdatedUserData();
            if (res.giftSent == "true") {
              await sendGiftToFirebase(selectedGiftData);
            }
            else {
              console.log("gift not sent", res.giftSent)
            }
            // dispatch(updateUserData(res.data));
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              textBody: '' + res.message,
              autoClose: 1000,
            });
          }
    
          // setGettingGiftsArray(res);
        } catch (e) {
          console.log('send gift error is -- ', e.toString());
        }
      };
    

    const sendGiftToFirebase = async (data) => {
        const currentDate = new Date();
        const newNodeKey = database().ref().child(`/gifts/${channelName}`).push().key;
        await database().ref(`/gifts/${channelName}/` + newNodeKey)
          .set({
            id: uid,
            giftId: data?.id,
            icon: data?.json,
            size: data?.size,
            date: currentDate.toString(),
          });
    
        const newNodeKey1 = database().ref().child(`/comments/${channelName}`).push().key;
        await database().ref(`/comments/${channelName}/` + newNodeKey1)
          .set({
            // id: uid,
            name: userData?.user?.nick_name,
            message: "has send " + data.title,
            uid: newNodeKey1,
            date: currentDate.toString(),
          });
      }

    return(
        <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: heightPercentageToDP(2),
        }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {gettingGiftsArray?.map((item, index) => (
            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              onPress={() => {
                setselectGiftBtn({
                  title: item?.title,
                  category: item.child_categorie,
                });
                showFlatList(item.child_categorie);
                setbtnClr('white');
              }}>
              <Text
                style={[
                  {
                    color: 'grey',
                    fontSize: 16,
                    fontWeight: '500',
                  },
                  selectGiftBtn.title == item?.title && {
                    color: 'white',
                  },
                ]}>
                {item?.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>{SelectGiftList(selectGiftBtn)}</View>
      <View style={{ position: 'absolute', right: 5, bottom: 10 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#c471ed',
            marginRight: 8,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 3,
          }}>
          <Text
            style={{
              color: 'white',

              fontWeight: '500',
              // marginVertical: 10,
            }}
            onPress={() => {
              SendGiftsToHost(sendedBeans);
              // UpdateHostBeans();
              //sendGiftToFirebase(selectedGiftData);
            }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 5,
          left: 10,
        }}>
        <Text style={{ color: 'white' }}>{userUpdatedData?.beans}</Text>
        <PlusIcon name="caretright" color="white" />
      </View>
    </View>
    )
}

export default GameSheetComponent