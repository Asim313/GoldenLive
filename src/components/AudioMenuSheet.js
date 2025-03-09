// MainScreen.js
import React, {memo, useRef, useState} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import RbSheetComponent from '../screens/reuseable_Component/RbSheetComponent';
import RoomSettings from './RoomSettings';
import { heightPercentageToDP } from 'react-native-responsive-screen';


const AudioMenuSheet = memo(({onPressShare, onPressChat, onPressPlayMusic, changeTheme, MicOptions, handleCamera, fromMulti, onPressClearChat, channelName}) => {

  // console.log('AudioMenuSheet');
  const MyFlatList = ({onPressPlayMusic, onPressChat, changeTheme, MicOptions, handleCamera, fromMulti, onPressClearChat}) => {
    const data = [
      // {
      //   id: '1',
      //   title: 'Lock',
      //   image: require('../assets/images/bottomMenuAudio/Lock.png'),
      // },
      {
        id: '2',
        title: 'Clean Chat',
        image: require('../assets/images/bottomMenuAudio/CleanChat.png'),
      },
      {
        id: '3',
        title: 'Inbox',
        image: require('../assets/images/bottomMenuAudio/chat.png'),
      },
      {
        id: '4',
        title: 'Theme',
        image: require('../assets/images/bottomMenuAudio/Theme.png'),
      },
      {
        id: '5',
        title: 'Hidden',
        image: require('../assets/images/bottomMenuAudio/Hidden.png'),
      },
      {
        id: '6',
        title: 'Scoreboard',
        image: require('../assets/images/bottomMenuAudio/Scoreboard.png'),
      },
      {
        id: '7',
        title: 'Music',
        image: require('../assets/images/bottomMenuAudio/Music.png'),
      },
      {
        id: '8',
        title: 'VoiceEffect',
        image: require('../assets/images/bottomMenuAudio/VoiceEffect.png'),
      },
      {
        id: '9',
        title: 'MicMode',
        image: require('../assets/images/bottomMenuAudio/MicMode.png'),
      },
      {
        id: '10',
        title: 'Camera',
        image: require('../assets/images/bottomMenuAudio/Camera.png'),
      },
      {
        id: '11',
        title: 'Room Settings',
        image: require('../assets/images/bottomMenuAudio/RoomSettings.png'),
      },
      {
        id: '12',
        title: 'share',
        image: require('../assets/images/StreamingMenuIcons/share.png'),
      },
      // {
      //   id: '11',
      //   title: 'Special Theme',
      //   image: require('../assets/images/bottomMenuAudio/SpecialTheme.png'),
      // },
    ];
  
    return (
      <View style={{}}>
        <FlatList
          numColumns={4} // Set the number of columns to 4
          data={data}
          renderItem={({item, index, separators}) => (
            // console.log('')
            <TouchableOpacity
              onPress={() => {
                if (item.title == 'Lock') {
                  console.log('Lock');
                } else if (item.title == 'Clean Chat') {
                  onPressClearChat()
                  console.log('Clean Chat');
                }  else if (item.title == 'Inbox') {
                  console.log('Chat');
                  onPressChat();
                } else if (item.title == 'Theme') {
                  // console.log('Theme');
                  changeTheme();
                } else if (item.title == 'Hidden') {
                  console.log('Hidden');
                } else if (item.title == 'Scoreboard') {
                  console.log('Scoreboard');
                } else if (item.title == 'Music') {
                  console.log('Music');
                  onPressPlayMusic() && onPressPlayMusic();
                } else if (item.title == 'VoiceEffect') {
                  console.log('VoiceEffect');
                } else if (item.title == 'Hidden') {
                  console.log('Hidden');
                } else if (item.title == 'MicMode') {
                  MicOptions()
                } else if (item.title == 'Special Theme') {
                  console.log('Special Theme');
                 
                }  else if (item.title == 'Camera') {
                  handleCamera()
                }
                 else if (item.title == 'Room Settings') {
                  roomSettingsRef.current.open()
                } else if(item.title === 'share') {
                  onPressShare();
                }
              }}
              style={{
                padding: 12,
                justifyContent: 'center',
                alignItems: 'center',
                width: '26%',
              }}>
              <Image
                source={item?.image}
                style={{height: 30.9, width: 30.9, bottom: 5}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  alignSelf: 'center',
                }}>
                {item?.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{justifyContent: 'space-evenly'}}
        />
      </View>
    );
  };

  const roomSettingsRef =  useRef()

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 16,
      }}>
      <MyFlatList
        onPressPlayMusic={onPressPlayMusic}
        onPressChat={onPressChat}
        changeTheme={changeTheme}
        MicOptions={MicOptions}
        handleCamera={handleCamera}
        fromMulti={fromMulti}
        onPressClearChat={onPressClearChat}
      />
    </View>

    <RbSheetComponent
              view={
                <RoomSettings channelName={channelName} />
              }
              backgroundColor={'transparent'}
              refUse={roomSettingsRef}
              close={false}
              height={heightPercentageToDP(100)}
            />
        </View>
  );
});

export default AudioMenuSheet;
