import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Header from '../reuseable_Component/Header';
//////////Header////////////

const categories = [
  {
    id: '1',
    name1: 'Bounses',
    name2:
      'Loren ipusum dolor sit amet, consectetur adipiscing eit, sed do eiusmod tempor incididunt',
  },
  {
    id: '2',
    name1: 'Hide Your Online Status',
    name2:
      'Loren ipusum dolor sit amet, consectetur adipiscing eit, sed do eiusmod tempor incididunt',
  },
  {
    id: '3',
    name1: 'Hide Your Recent Active Time',
    name2:
      'Loren ipusum dolor sit amet, consectetur adipiscing eit, sed do eiusmod tempor incididunt',
  },
  {
    id: '4',
    name1: 'Comment Post',
    name2:
      'Loren ipusum dolor sit amet, consectetur adipiscing eit, sed do eiusmod tempor incididunt',
  },
  {
    id: '5',
    name1: 'Do Not Accept Strangers Line Invitations',
    name2:
      'Loren ipusum dolor sit amet, consectetur adipiscing eit, sed do eiusmod tempor incididunt',
  },
  {
    id: '6',
    name1: 'Do Not Accept Strangers Line Invitations',
    name2:
      'Loren ipusum dolor sit amet, consectetur adipiscing eit, sed do eiusmod tempor incididunt',
  },
  {
    id: '7',
    name1: 'Close Screenshots In Profile',
    name2:
      'Loren ipusum dolor sit amet, consectetur adipiscing eit, sed do eiusmod tempor incididunt',
  },
];

const Setting_Privacy = ({navigation}) => {
  return (
    <View style={{...styles.bg}}>
      <Header name={'Privacy'} />

      {/* FlatList */}
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <FlatList
          contentContainerStyle={{padding: 8}}
          keyExtractor={item => item.id}
          data={categories}
          renderItem={(item, index) => (
            <View style={{}}>
              <View
                style={{
                  marginVertical: 8,
                }}>
                <View style={{flexDirection: 'column', marginRight: '10%'}}>
                  <Text
                    style={{
                      ...styles.txt_1,
                    }}>
                    {item.item.name1}
                  </Text>
                  <Text
                    style={{
                      ...styles.txt_2,
                    }}>
                    {item.item.name2}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  ...styles.line,
                }}></View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Setting_Privacy;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  txt_1: {
    color: '#D24F05',
    fontSize: 16,
    fontFamily: 'Pooppins-Regular',
    fontWeight: '500',
    marginLeft: '5%',
    marginTop: 7,
  },
  txt_2: {
    color: '#242424',
    fontSize: 10,
    fontFamily: 'Pooppins-Regular',
    fontWeight: '400',
    marginLeft: '5%',
    marginTop: 2,
  },
  line: {
    height: 1,
    backgroundColor: '#242424',
    marginHorizontal: '4%',
    justifyContent: 'center',
  },
});
