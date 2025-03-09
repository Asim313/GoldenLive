import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const EmptyMp3List = ({selectSongsFromGallery}) => {
  return (
    <View style={styles.container}>
        <Image source={require('../../../../assets/images/mp3playerImages/music.png')} style={styles.image} />
      <Text style={styles.smallFont}>You have not yet added music</Text>
      <TouchableOpacity style={styles.btnStyle} onPress={() => selectSongsFromGallery()}>
        <Text style={styles.btnTxt}>Add Music</Text>
      </TouchableOpacity>
      <Text style={styles.smallFont}>Support .mp3 format</Text>
    </View>
  );
};

export default EmptyMp3List;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    color: 'grey',
    marginVertical: 5,
    width: 70,
    height: 70,
  },
  smallFont: {
    color: '#6A6666',
    fontSize: 11,
  },
  btnStyle: {
    backgroundColor: '#D24F05',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  btnTxt: {
    color: 'white', 
    fontWeight: '500',
  }
});
