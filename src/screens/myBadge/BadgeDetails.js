import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import React, {useState, useRef} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';

const tasks = [1, 2, 3, 4, 5, 6, 7, 8];

const BadgeDetails = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#242A38'}}>
      <View
        style={{
          backgroundColor: '#303749',
          height: 50,
          justifyContent: 'center',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 15,
            backgroundColor: '#303749',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <LeftArrow
                name="arrow-back-ios"
                size={20}
                style={{color: 'white', alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Badge Details
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{height: '85%', justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/myBadge/rocket.png')}
          resizeMode="contain"
          style={{height: 120, width: 120}}
        />
        <Text
          style={{
            fontSize: 22,
            color: '#FFFFFF',
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Rocket Man
        </Text>
        <Text style={{fontSize: 13, color: '#AEAECE'}}>
          Cumulaively Send 10 Rocket Gifts
        </Text>
      </View>
    </View>
  );
};

export default BadgeDetails;

const styles = StyleSheet.create({});
