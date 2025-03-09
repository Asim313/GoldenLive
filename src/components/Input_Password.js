import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const Input_Passowrd = ({bgStyle, onChange, icon, title, eye}) => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  return (
    <View
      style={{
        borderRadius: 5,
        ...bgStyle,
        alignSelf: 'center',
        borderColor: '#535C73',
        backgroundColor: '#303749',
      }}>
      <TextInput
        style={{
          height: 55,
          paddingHorizontal: 10,
          paddingVertical: 14,
          color: '#ffff',
        }}
        value={value}
        onChangeText={txt => handleonTextChange(txt)}
        secureTextEntry={visible}
        placeholder={title}
        placeholderTextColor={'grey'}
      />
      {eye ? (
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            right: 20,
            marginTop: 18,
          }}
          onPress={() => {
            setShow(!show);
            setVisible(!visible);
          }}>
          <Entypo
            name={show === false ? 'eye-with-line' : 'eye'}
            size={20}
            color="#C6C6C6"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );

  function handleonTextChange(txt) {
    setValue(txt);
    onChange && onChange(txt);
  }
};

const styles = StyleSheet.create({});

export default Input_Passowrd;
