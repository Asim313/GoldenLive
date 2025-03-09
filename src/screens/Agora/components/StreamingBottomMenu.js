import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import TouchableIcon from './TouchableIcon';
import AllIcons, {IconList} from '../../../components/AllIcons';

const StreamingBottomMenu = ({
  callNotification,
  onPressMsgSheet,
  onPressGiftSheet,
  fromAudio,
  onpressCall,
  onPressPk,
  onPressThreeBars,
  onPressGame,
  onPressMic,
  isMicOn,
  onPressSticker,
  fromMulti,
  onPressSpeaker,
  muteAllSpeaker
}) => {
  return (
    <View style={styles.lefticonsbox}>
      {/* <TouchableIcon
        name={IconList.MaterialCommunityIcons}
        iconName="facebook-messenger"
        size={20}
        color="#c471ed"
        onPress={onPressMsgSheet}
      /> */}

      <TouchableOpacity onPress={() => onPressMsgSheet() } style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingHorizontal: 10, borderRadius: 12, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <AllIcons name={IconList.AntDesign} iconName={'message1'} size={15} color={'white'} />
        <Text style={{color: 'white', fontSize: 9}}>   Say hi...</Text>
      </TouchableOpacity>

      <TouchableIcon
        name="Feather"
        iconName={isMicOn ? 'mic' : 'mic-off'}
        size={20}
        color={'white'}
        onPress={onPressMic}
      />

<TouchableOpacity
        onPress={onPressSpeaker}
        style={[styles.icon1box]}>
        <AllIcons name={IconList.FontAwesome} iconName={!muteAllSpeaker ? 'volume-up' : 'volume-off'} size={20} color={'white'} />
      </TouchableOpacity>

    {!fromMulti &&
      <View style={{}}>
      <TouchableIcon
        name="Feather"
        iconName="phone-call"
        size={20}
        color="white"
        onPress={onpressCall}
        />
        {callNotification &&
      <View style={{height: 10, width: 10, backgroundColor: 'red', position: 'absolute', borderRadius: 30,  alignSelf: 'flex-end', right: 5}}></View>
        }
      </View>
    }

      {!fromAudio && !fromMulti && 
      <TouchableOpacity
        onPress={onPressPk}
        style={[styles.icon1box, {backgroundColor: 'red'}]}>
        <Text style={styles.PK}>PK</Text>
      </TouchableOpacity>
}

{fromAudio && 
<TouchableIcon
        name={IconList.Entypo}
        iconName="emoji-happy"
        size={20}
        color="white"
        onPress={onPressSticker}
      />
}
      <TouchableIcon
        name="Entypo"
        iconName="game-controller"
        size={20}
        color="white"
        onPress={onPressGame}
      />

   

      <TouchableIcon
        name="Octicons"
        iconName="three-bars"
        size={20}
        color="white"
        onPress={onPressThreeBars}
      />
    </View>
  );
};

export default StreamingBottomMenu;

const styles = StyleSheet.create({
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
  PK: {
    color: 'white',
    fontWeight: 'bold',
  },
});
