// TopUsersComponent.js

import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const RecordComponent = ({navigation, topUsersAllData, dataa,bgImage}) => {
  // console.log(
  //   'checkk the dedication ',
  //   navigation,
  //   topUsersAllData,
  //   dataa,
  // );
  return (
    <ImageBackground
      source={bgImage && bgImage}
      style={{
        alignSelf: 'center',
        width: 350,
        height: 300,
        borderRadius: 7,
      }}>
      <TouchableOpacity onPress={navigation}>
        <View style={{}}>
          <View
            style={{
              height: '66%',
              marginTop: '20%',
              width: '75%',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <View style={{marginTop: '10%'}}>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={{uri: dataa?.[1]?.image}}
                  resizeMode="contain"
                  style={{height: 55, width: 55, borderRadius: 100}}
                />
                <Image
                  source={require('../../assets/images/records/frame2.png')}
                  resizeMode="contain"
                  style={{
                    height: 76,
                    width: 76,
                    position: 'absolute',
                    bottom: 0,
                    right: -10,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                2
              </Text>
            </View>

            <View style={{bottom: 5}}>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={{uri: dataa?.[0]?.image}}
                  resizeMode="contain"
                  style={{height: 64, width: 63, borderRadius: 100}}
                />
                <Image
                  source={require('../../assets/images/records/frame2.png')}
                  resizeMode="contain"
                  style={{
                    height: 87,
                    width: 87,
                    position: 'absolute',
                    bottom: 0,
                    right: -10,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  marginTop: 30,
                }}>
                1
              </Text>
            </View>
            <View style={{top: '8%'}}>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={{uri: dataa?.[2]?.image}}
                  resizeMode="contain"
                  style={{height: 56, width: 56, borderRadius: 100}}
                />
                <Image
                  source={require('../../assets/images/records/frame2.png')}
                  resizeMode="contain"
                  style={{
                    height: 76,

                    width: 76,
                    position: 'absolute',
                    bottom: 0,
                    right: -10,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                3
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default RecordComponent;
