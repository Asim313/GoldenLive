import React, {memo, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import RbSheetComponent from '../screens/reuseable_Component/RbSheetComponent';
import Timer from './Timings';

const UserOptionsList = memo(
  ({
    isRoomAdmin,
    onPressRemoveFromAdmin,
    selectedUsers,
    onPressMakeAdmin,
    onPressKick,
    onPressViewProfile,
    onPressSendGift,
    onPressCancel,
    onPressMuteUser,
    channelName
  }) => {

    // console.log('kkkkkkkk', selectedUsers)
    // selectedUsers?.isAdmin?.toString() === 'true'
    const [type, setType] = useState(null)
    const reportSheetRef = useRef()
    const data = isRoomAdmin
      ? [
          {id: 3, name: 'View profile'},
          {id: 4, name: 'Send gift'},
          {id: 2, name: 'Leave mic'},
          {
            id: 5,
            name: selectedUsers?.isMicOn === 'true' ? 'Mute mic' : 'Unmute mic',
          },
          {id: 6, name: 'Mute user comments'},
          {id: 7, name: 'Cancel'},
        ]
      : [
          {
            id: 1,
            name:
              selectedUsers?.isAdmin?.toString() === 'true'
                ? 'Remove from admin'
                : 'Make admin',
          },
          {id: 3, name: 'View profile'},
          {id: 4, name: 'Send gift'},
          {id: 2, name: 'Leave mic'},
          {
            id: 5,
            name: selectedUsers?.isMicOn === 'true' ? 'Mute mic' : 'Unmute mic',
          },
          {id: 6, name: 'Mute user comments'},
          {id: 7, name: 'Block user'},
          {id: 8, name: 'Cancel'},
        ];
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.renderViewStyle}
                onPress={() => {
                  if (item?.name === 'Make admin') {
                    onPressMakeAdmin(selectedUsers);
                  } else if (item?.name === 'Leave mic') {
                    onPressKick(selectedUsers);
                  } else if (item?.name === 'View profile') {
                    onPressViewProfile(selectedUsers);
                  } else if (item?.name === 'Send gift') {
                    onPressSendGift();
                  } else if (item?.name === 'Cancel') {
                    onPressCancel();
                  } else if (
                    item?.name === 'Mute mic' ||
                    item?.name === 'Unmute mic'
                  ) {
                    onPressMuteUser(selectedUsers);
                  } else if (item?.name === 'Remove from admin') {
                    onPressRemoveFromAdmin(selectedUsers);
                  } else if (item?.name === 'Mute user comments') {
                    console.log("llllllllllll", parseInt(selectedUsers?.cohostID), parseInt(channelName))
                    if(parseInt(selectedUsers?.cohostID) === parseInt(channelName)){
                        alert('You can not mute host.')
                    } else {
                        setType('mute')
                        reportSheetRef.current.open()
                    }
                   // onPressCancel()
                  } else if (item?.name === 'Block user') {
                    setType('block')
                   // onPressCancel()
                    reportSheetRef.current.open()
                  }
                  //onPressCancel()
                }
                }>
                <Text style={styles.fontStyle}>{item?.name}</Text>
              </TouchableOpacity>
            );
          }}
        />

<RbSheetComponent
              view={<Timer
                fromAudio={true} 
                blockType={type}   
                userData={{full_name: selectedUsers?.name, id: selectedUsers?.cohostID}}
                channelName={channelName}
                onPressCross={() => {
                  reportSheetRef.current.close()
                 // onPressCancel()
                }
              }
              />}

              backgroundColor={'transparent'}
              refUse={reportSheetRef}
              close={false}
              height={heightPercentageToDP(45)}

            />
      </View>
    );
  },
);

export default UserOptionsList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  fontStyle: {
    color: 'black',
    fontSize: 15,
  },
  renderViewStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'silver',
    width: widthPercentageToDP(100),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
