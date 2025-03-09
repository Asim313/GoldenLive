import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const EventRulePage = (props) => {
  return (
    // <View style={{justifyContent: 'center', alignItems: 'center',marginBottom:10}}>
    <>
      <Image
        source={require('../../../assets/images/DailyStarAssests/BubbleForEventRule.png')}
        style={{height: 47, width: 210}}
      />
      <Text style={{position: 'absolute', fontWeight: '600', color: 'white',marginLeft:props.marginLeftt}}>
        {props.Sentence}
      </Text>
      </>
    // </View>
  );
};

export default EventRulePage;

const styles = StyleSheet.create({});
