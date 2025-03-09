import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {white} from '../../utils/Styles';

const Input = ({bgStyle, onChange, icon, title, length}) => {
  const [value, setValue] = useState('');

  return (
    <View
      style={{
        borderRadius: 5,
        ...bgStyle,
        alignSelf: 'center',
        borderColor: '#535C73',
        backgroundColor: '#303749',
      }}>
      {icon}
      <TextInput
        style={{
          height: 55,
          paddingHorizontal: 10,
          paddingVertical: 14,
          color: white,
        }}
        value={value}
        onChangeText={txt => handleonTextChange(txt)}
        placeholder={title}
        placeholderTextColor={'grey'}
        maxLength={length}
      />
    </View>
  );

  function handleonTextChange(txt) {
    setValue(txt);
    onChange && onChange(txt);
  }
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '80%',
  },
  btntext: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    marginTop: 10,
  },
  text: {
    color: '#5499C7',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    // marginLeft: 8,
    // marginTop: 9
  },
});

export default Input;
