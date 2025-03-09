import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';

const DATA = [
  {
    ImagePath: require('../../../assets/images/DailyStarAssests/Star-10.png'),
    nameOfStar: '1 Star',
  },
  {
    ImagePath: require('../../../assets/images/DailyStarAssests/Star-06.png'),
    nameOfStar: '2 Star',
  },
  {
    ImagePath: require('../../../assets/images/DailyStarAssests/Star-05.png'),
    nameOfStar: '3 Star',
  },
  {
    ImagePath: require('../../../assets/images/DailyStarAssests/Star-08.png'),
    nameOfStar: '4 Star',
  },
  {
    ImagePath: require('../../../assets/images/DailyStarAssests/Star-04.png'),
    nameOfStar: '5 Star',
  },
];

const TargetFlatList = ({data}) => {

  console.log('check data==-=-==-',data)
  const renderView = item => {
    return (
      <View
      style={{
        flexDirection: 'row',
        //   borderWidth: 8,
        //   borderColor: 'green',
        borderRadius: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          backgroundColor: 'red',
          paddingHorizontal: 6,
          width: 55,
          borderRightColor: 'white',
          borderRightWidth: 1,
        }}>
        <Image
          source={require('../../../assets/images/DailyStarAssests/Star-05.png')}
          style={{ height: 33, width: 42, marginTop: 7 }}
        />
        <View
          style={{
            backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
          }}>
          <Text style={{ fontWeight: '600', color: 'white' }}>
            {/* {item.item.title} */}
            Star 1 
          </Text>
        </View>
      </View>
      {/* <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4%',
              backgroundColor: 'red',
              marginRight: 1,
            }}>
            <Text style={{color: 'white'}}>Target</Text>
          </View> */}
      <View
        style={{
          backgroundColor: 'red',
          width: 63,
          paddingHorizontal: 10,
          borderRightColor: 'white',
          borderRightWidth: 1,
        }}>
        <Image
          source={require('../../../assets/images/DailyStarAssests/Star-10.png')}
          style={{ height: 33, width: 42, marginTop: 7 }}
        />
        <View
          style={{
            //   backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
          }}>
          <Text style={{ fontWeight: '600', color: 'white' }}>
            200 k
          </Text>
        </View>
      </View>
      <View
        style={{
          // alignItems: 'center',
          // justifyContent: 'center',
          backgroundColor: 'red',
          width: 181,
          // marginRight: 1,
          flexDirection: 'row'
        }}>
        <View style={{
          // backgroundColor: 'red',
          paddingHorizontal: 10,
          borderRightColor: 'white',
          borderRightWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image source={{uri:item.item.image}} style={{ height: 23, width: 95, }} />
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          {/* <Text>Hello</Text> */}
        </View>
      </View>
    </View>
    );
  };
  return (
    <View
    style={{
      // flexDirection: 'row',
      borderWidth: 8,
      borderColor: '#FFE266',
      borderRadius: 10,
    }}>
    <View
      style={{
        flexDirection: 'row',
        //   borderWidth: 8,
        //   borderColor: 'green',
        borderRadius: 10,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // paddingHorizontal: '4%',
          backgroundColor: 'red',
          width: 54,
          marginRight: 1,
        }}>
        <Text style={{ color: 'white' }}>Stars</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // padding: '4%',
          // padding: 5.5,
          width: 62,
          backgroundColor: 'red',
          marginRight: 1,
        }}>
        <Text style={{ color: 'white' }}>Target</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          width: 181,
          // marginRight: 1,
        }}>
        <View>
          <Text style={{ color: 'white' }}>
            Broadcaster Reward
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // paddingHorizontal: '2%',
            backgroundColor: 'red',
            marginTop: 1,
          }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ paddingHorizontal: 5, color: 'white' }}>
              Home Screen
            </Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: '7%' }}>
            <Text style={{ paddingHorizontal: 5, color: 'white', }}>
              Entrance
            </Text>
          </View>
        </View>
      </View>
    </View>
    <FlatList
      data={data}
      renderItem={renderView}
    // horizontal={true}
    />
  </View>
  );
};

export default TargetFlatList;

const styles = StyleSheet.create({});
