import React, { memo } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import AllIcons, { IconList } from './AllIcons';

const InviteAsGuest = memo(({onPressReject, onPressAPllyBtn}) => {
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  return (
    <View style={styles.mainContainer}>
      <Image source={{uri: userUpdatedData?.image}} style={styles.topImage} />
      <TouchableOpacity onPress={onPressReject}>
        <Text style={styles.textStyle}>Reject</Text>
      </TouchableOpacity>
      <Text style={styles.midTextStyle}>
        invites you as a guest to {userUpdatedData?.nick_name} join LIVE
      </Text>

      <TouchableOpacity style={styles.btnStyle} onPress={onPressAPllyBtn}>
        <AllIcons name={IconList.Feather} iconName={'mic'} color={'black'} size={20} />
        <Text style={styles.btnText}>Audio Join</Text>
      </TouchableOpacity>
    </View>
  );
});

export default InviteAsGuest;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    top: 37,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  topImage: {
    position: 'absolute',
    height: 70,
    width: 70,
    borderRadius: 200,
    alignSelf: 'center',
    top: -30,
  },
  textStyle: {
    color: '#736E6E',
    fontWeight: '500',
    alignSelf: 'flex-end',
    margin: 15,
  },
  midTextStyle: {
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
    width: widthPercentageToDP(65),
    fontSize: 14,
    margin: 15,
  },
  btnText: {
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    margin: 15,
  },
  btnStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A59D9D',
    width: widthPercentageToDP(65), 
    alignSelf: 'center',
    borderRadius: 50,
    bottom: 5,
}
});
