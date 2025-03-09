import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useNavigation} from 'react';
import User from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const TopUsers = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#80060C', '#A51318', '#C1130E', '#FF0401']}
      style={{
        alignSelf: 'center',
        width: '93%',
        marginTop: 20,
        height: '26%',
        borderRadius: 7,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TopUsers');
        }}>
        <View style={{}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
            <TouchableOpacity>
              <User
                name="user-friends"
                size={20}
                style={{color: 'white', alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginLeft: 5,
              }}>
              Top Users
            </Text>
          </View>
          <View
            style={{
              height: '66%',
              width: '75%',
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 10,
            }}>
            <View>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={require('../../../assets/images/records/profile.jpg')}
                  resizeMode="contain"
                  style={{height: 55, width: 55, borderRadius: 100}}
                />
                <Image
                  source={require('../../../assets/images/records/frame2.png')}
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
                style={{fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>
                2
              </Text>
            </View>

            <View style={{bottom: 10}}>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={require('../../../assets/images/records/profile.jpg')}
                  resizeMode="contain"
                  style={{height: 68, width: 68, borderRadius: 100}}
                />
                <Image
                  source={require('../../../assets/images/records/frame1.png')}
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
                style={{fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>
                1
              </Text>
            </View>
            <View>
              <View style={{alignSelf: 'center'}}>
                <Image
                  source={require('../../../assets/images/records/profile.jpg')}
                  resizeMode="contain"
                  style={{height: 56, width: 56, borderRadius: 100}}
                />
                <Image
                  source={require('../../../assets/images/records/frame3.png')}
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
                style={{fontSize: 20, color: '#FFFFFF', textAlign: 'center'}}>
                3
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default TopUsers;

const styles = StyleSheet.create({});
