import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const SentenceView = (props) => {
  return (
    <View
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: '2%',
        flexDirection:'row'
      }}>
        
     <Entypo name={props.dotIcon} size={30} color='red'></Entypo> 
      <Text style={{fontWeight: '500'}}>
        {props.sentenceProp}
      </Text>
    </View>
  );
};

export default SentenceView;

const styles = StyleSheet.create({});

