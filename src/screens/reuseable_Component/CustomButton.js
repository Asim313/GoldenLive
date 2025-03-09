import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const CustomButton = ({onPress, bgStyle, title, titleStyle, icon}) => {
  const [value, setValue] = useState('');

  return (
    <View style={{...bgStyle, ...styles.Button}}>
      <TouchableOpacity
        onPress={() => onPress && onPress()}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          flex: 1,
          flexDirection: 'row',
        }}>
        {icon}
        <Text style={{...styles.text, ...titleStyle}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  function handleonTextChange(txt) {
    setValue(txt);
    onChange && onChange(txt);
  }
};

export default CustomButton;

const styles = StyleSheet.create({
  Button: {
    // height: 45,
    // borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  text: {
    // justifyContent: 'center',
    // textAlign: 'center',
    // textAlignVertical: "center",
    // color: '#fff',
    // fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
});
