import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';

const KickUserComponent = ({DATA, name, marginVertical}) => {
  const renderView = item => {
    console.log('check data into flatlist', item.item.title);
    return (
      <TouchableOpacity style={{marginVertical:marginVertical}}>
        <Text style={{color: '#dcdce0', fontWeight: '400', fontSize: 20}}>
          {item.item.title}
        </Text>
     </TouchableOpacity>
    );
  };

  return (
    <View style={{marginLeft:'5%',marginTop:'5%'}}>
      <View>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 30,

            // alignItems: 'flex-start',
            // justifyContent: 'space-evenly',
            // backgroundColor:'red'
          }}>
          {name}
        </Text>
      </View>
      <View style={{height:'90%',width:'100%',justifyContent:'center'}}>
        <FlatList data={DATA} renderItem={renderView} />
      </View>
    </View>
  );
};

export default KickUserComponent;

const styles = StyleSheet.create({});
// #22263a
