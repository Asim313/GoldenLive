import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const TopLuckyCom = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <TouchableOpacity onPress={() => navigation.navigate('RecordsMain')}>
        <ImageBackground
          source={require('../../assets/images/profile/lucky.png')}
          style={{height: 100, width: 163}}>
          <View
            style={{
              height: '60%',
              width: '50%',
              top: 10,
              left: 10,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
            Top Family
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('AgencyRecords')}>
        <ImageBackground
          source={require('../../assets/images/profile/top.png')}
          style={{height: 100, width: 163}}>
          <View
            style={{
              height: '60%',
              width: '50%',
              alignItems: 'center',
              top: 10,
              left: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                width: '100%',
              }}>
              Agency Records
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default TopLuckyCom;

const styles = StyleSheet.create({});
