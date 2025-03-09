import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const GameluckyGiftRecordHome = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('LuckyGiftRecord')}>
        <Image
          source={require('../assets/images/luckyGiftRecord.png')}
          style={{height: 75, width: 175}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('GameRecord')}>
        <Image
          source={require('../assets/images/GameRecord.png')}
          style={{height: 75, width: 175}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GameluckyGiftRecordHome;

const styles = StyleSheet.create({});
