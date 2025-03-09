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
import React, {useState} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const tasks = [
  {
    image: require('../../assets/images/myTasks/ferrari.png'),
    prize: 'Ferrari Car (3Days)',
  },
  {image: require('../../assets/images/myTasks/vip.png'), prize: 'VIP (3Days)'},
  {
    image: require('../../assets/images/myTasks/dragon.png'),
    prize: 'Roar (3Days)',
  },
  {
    image: require('../../assets/images/myTasks/ferrari.png'),
    prize: 'Speedboat (3Days)',
  },
  {
    image: require('../../assets/images/myTasks/confetti.png'),
    prize: 'Confetti (3Days)',
  },
];

const InamGhar = () => {
  const renderView = ({item}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '75%'}}>
            <View
              style={{
                width: '30%',
                height: 70,
                paddingVertical: 8,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={{height: 65, width: 65}}
              />
            </View>
            <View style={{}}>
              <Text style={{color: '#FFFFFF', marginLeft: 10, width: '100%'}}>
                {item.prize}
              </Text>
              <Text
                style={{
                  color: '#AEAECE',
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  width: '100%',
                }}>
                300 points
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', width: '25%'}}>
            <View
              style={{
                paddingVertical: 5,
                borderRadius: 15,
                backgroundColor: '#242A38',
                borderColor: '#E92F24',
                borderWidth: 1,
              }}>
              <TouchableOpacity style={{alignItems: 'center'}}>
                <Text
                  style={{color: '#E92F24', fontSize: 12, fontWeight: 'bold'}}>
                  Exchange
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#303749',
            marginVertical: 10,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#242A38'}}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <ScrollView style={{height: '70%', marginTop: 4}}>
          <View style={{marginHorizontal: 10}}>
            <FlatList data={tasks} renderItem={renderView} />
          </View>

          <Text style={{color: '#FFFFFF', fontWeight: 'bold', marginLeft: 15}}>
            Gift Instructions
          </Text>

          <View style={{marginHorizontal: 15, marginTop: 10}}>
            <Text style={{color: '#FFFFFF', fontSize: 12}} m>
              1_After exchange, any gifts received shall be immediately
              delivered to the user's backpack.
              {'\n'}
              {'\n'}
              2_After exchange, any cars or badges received shall be immediately
              delivered to the My Accessories page.
              {'\n'}
              {'\n'}
              3_Any gifts received can be counted towards user wealth level,
              talent star level, but will not be calculated toward the talent's
              income.
              {'\n'}
              {'\n'}
              <Text style={{color: 'red'}}>
                4_Points gifts will be counted in PK matches.
              </Text>
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
          }}>
          <View
            style={{
              marginHorizontal: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/wealthClass/profile.jpg')}
                resizeMode="contain"
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: '#242841',
                }}
              />
              <Text style={{color: '#FFFFFF', fontSize: 18, marginLeft: 5}}>
                {}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#FFFFFF', marginRight: 10, fontSize: 18}}>
                10,000
              </Text>
              <Image
                source={require('../../assets/images/myTasks/coin.png')}
                resizeMode="contain"
                style={{height: 35, width: 35}}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default InamGhar;

const styles = StyleSheet.create({});
