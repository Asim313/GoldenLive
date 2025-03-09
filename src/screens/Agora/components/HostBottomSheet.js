import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import BottomIcon from '../../../components/BottomIcon';

const HostBottomSheet = ({
  onPressMsgSheet,
  onPressGiftSheet,
  onpressCall,
  onPressPk,
  onPressThreeBars,
  onPressGame,
  onPressMic,
  micCondition
  
}) => {

  
  return (
    <View style={styles.lefticonsbox}>
      <BottomIcon
        name="Fontisto"
        iconName="hipchat"
        size={20}
        color="#c471ed"
        onPress={onPressMsgSheet}
      />
      <BottomIcon
        name="Feather"
        iconName={micCondition}
        size={20}
        color="orange"
        onPress={onPressMic}
      />
      <BottomIcon
        name="Feather"
        iconName="phone-call"
        size={20}
        color="#c471ed"
        onPress={onpressCall}
      />

      <TouchableOpacity
        onPress={onPressPk}
        style={[styles.icon1box, {backgroundColor: 'red'}]}>
        <Text style={styles.PK}>PK</Text>
      </TouchableOpacity>

      <BottomIcon
        name="Entypo"
        iconName="game-controller"
        size={20}
        color="#c471ed"
        onPress={onPressGame}
      />

      <BottomIcon
        name="Octicons"
        iconName="three-bars"
        size={20}
        color="#fbc7d4"
        onPress={onPressThreeBars}
      />
    
    </View>
  );
};

export default HostBottomSheet;

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
    fontWeight: '500',
  },
});
