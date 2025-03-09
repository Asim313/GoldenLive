import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const DropDown = props => {
  return (
    <View
      style={[
        styles.container,
        {
          height: props.height,
          width: '98%',
        },
      ]}>
      <Text style={{color: '#9293B0'}}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
});

export default DropDown;
