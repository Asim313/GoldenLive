import React, { useRef } from "react";
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import AllIcons, { IconList } from "./AllIcons";
import { Text } from "react-native";
import { ApiCallToken } from "../Services/Apis";
import { useSelector } from "react-redux";
import database from '@react-native-firebase/database';

const Timer = ({userData, channelName, onPressCross, blockType, fromAudio}) => {
    const User = useSelector(state => state.auth.userData);
    const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

    console.log('uerrrrrrrrrrrrrrrrrr', blockType, fromAudio)

    const muteTimings = [
        { title: 'Mute 5 mins', timing: '1 minute' },
        { title: 'Mute 1 hour', timing: '60 minute' },
        { title: 'Mute 1 day', timing: '1440 minute' },
        { title: 'Mute 7 days', timing: '10080 minute' },
        { title: 'Mute 30 days', timing: '43200 minute' },
      ];

    const kickTimings = [
        { title: 'Kick 1 min' , timing: '1 minute' },
        { title: 'Kick 1 hour', timing: '60 minute'  },
        { title: 'Kick 24 hours', timing: '1440 minute'  },
      ];

      const handleBlockUser = async (id, timing) => {
        console.log("block id block", id, timing)
        try {
          const res = await ApiCallToken({
            params: User?.token,
            paramsBody: {
                id : id,
               channel_id: channelName,
              duration: timing,
            },
            route: `block-user`,
            verb: 'POST',
          });
          console.log('user block response ', res, channelName, id)
          if (res.code == 200) {
           
              const currentDate = new Date();
              if(!fromAudio){
                await database().ref(`/userlist/${channelName}/${id}`)
                .remove()
                const newNodeKey1 = database().ref().child(`/comments/${channelName}`).push().key;
                await database().ref(`/comments/${channelName}/` + newNodeKey1)
                  .set({
                    // id: uid,
                    name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
                    message: `booted ${userData?.full_name}`,
                    uid: newNodeKey1,
                    date: currentDate.toString(),
                  });
              } else {
                // await database().ref(`/userlistaudio/${channelName}/${id}`)
                // .remove()
                await database().ref(`/userlistMultiRoom/${channelName}/${id}`)
                .remove()
                const newNodeKey1 = database().ref().child(`/commentsMulti/${channelName}`).push().key;
                await database().ref(`/commentsMulti/${channelName}/` + newNodeKey1)
                  .set({
                    // id: uid,
                    name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
                    message: `booted ${userData?.full_name}`,
                    uid: newNodeKey1,
                    date: currentDate.toString(),
                  });
                // await database().ref(`/commentsaudio/${channelName}/` + newNodeKey1)
                //   .set({
                //     // id: uid,
                //     name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
                //     message: `booted ${userData?.full_name}`,
                //     uid: newNodeKey1,
                //     date: currentDate.toString(),
                //   });
              }

                Alert.alert('user successfully kicked from room.')
                onPressCross()
          }
        } catch (error) {
          console.log('ERROR block user api', error);
        }
      }

      const musteUser = async (id, timing) => {
        console.log("block id mute", id, timing)
        try {
          const res = await ApiCallToken({
            params: User.token,
            paramsBody: {
              user_id : id,
              channel_id: channelName,
              duration: timing,
            },
            route: `mute/user`,
            verb: 'POST',
          });
          console.log('data', res, channelName, id)
          if (res.code == 200) {
            const currentDate = new Date();
            if(!fromAudio) {
            const newNodeKey1 = database().ref().child(`/comments/${channelName}`).push().key;
            await database().ref(`/comments/${channelName}/` + newNodeKey1)
              .set({
                name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
                message: `muted ${userData?.full_name}` ,
                uid: newNodeKey1,
                date: currentDate.toString(),
              });

            } else {
              const newNodeKey1 = database().ref().child(`/commentsMulti/${channelName}`).push().key;
              await database().ref(`/commentsMulti/${channelName}/` + newNodeKey1)
                .set({
                  name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
                  message: `muted ${userData?.full_name}` ,
                  uid: newNodeKey1,
                  date: currentDate.toString(),
                });
              // await database().ref(`/commentsaudio/${channelName}/` + newNodeKey1)
              //   .set({
              //     name: userUpdatedData?.nick_name ?? userUpdatedData?.full_name,
              //     message: `muted ${userData?.full_name}` ,
              //     uid: newNodeKey1,
              //     date: currentDate.toString(),
              //   });
            }

              Alert.alert('user successfully muted from room.')
              // await database().ref(`/userlist/${channelName}/${id}`)
              //   .remove()
              onPressCross()
          }
        } catch (error) {
          console.log('ERROR block user api', error);
        }
      }

    return(
        <View style={styles.blockSheetStyle}>
        <View style={{ alignItems: 'flex-end', paddingHorizontal: 10 }}>
          <TouchableOpacity onPress={onPressCross} >
          <AllIcons name={IconList.FontAwesome} iconName={'close'} color={'black'} size={28} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={blockType === 'mute' ? muteTimings : kickTimings}
          renderItem={({ item, index }) => (
            <View>
              <View style={{ borderBottomWidth: 0.3, width: '100%', borderBottomColor: '#dbe0d1' }}>
                <TouchableOpacity onPress={() => {
                    {blockType === 'mute' ? musteUser(userData?.id, item?.timing) : handleBlockUser(userData?.id, item?.timing)}
                  //  if(index === 1) {musteUser(userData?.id)}
                  //  if(index === 2) {handleBlockUser(userData?.id)}
                  
                }
                  }>
                  <Text style={{ fontSize: 17, textAlign: 'center', marginVertical: "3%", color: 'black' }}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        >
        </FlatList>

      </View>
    )
}

const styles = StyleSheet.create({
    blockSheetStyle: {
        // height: 250,
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // padding: 10,
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
      },
})

export default Timer