import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import AllIcons, {IconList} from '../../components/AllIcons';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const KeyBoardTextInput = ({inputVal}) => {
  const textInputRef = useRef(null);
  const [showTextInput, setShowTextInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', event => {
      console.log('show');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      console.log('hide');
      setShowTextInput(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    setShowTextInput(true);
  }, []);

  const handleTextInputBlur = () => {
    setShowTextInput(false);
    console.log('Entered Text:', inputValue);
  };
  
  const handleInputText = () => {
    console.log("input val", inputValue)
    setInputValue('')
    inputVal(inputValue)
    // Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.Container}>
        {showTextInput && (
          <View style={styles.textInputContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                height: 50,
                alignItems: 'center',
               
              }}>
              <TextInput
                ref={textInputRef}
                style={styles.textInput}
                placeholder="Enter comment here"
                placeholderTextColor={'black'}
                autoFocus={true}
                onChangeText={setInputValue}
                onBlur={handleTextInputBlur}
                onSubmitEditing={handleInputText}
                value={inputValue}
              />
              <TouchableOpacity
                onPress={() => handleInputText()}
                style={[styles.icon1box, {flex: 1}]}>
                <AllIcons
                  name={IconList.Feather}
                  iconName={'send'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default KeyBoardTextInput;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: widthPercentageToDP(85),
    color: 'black',
    // marginHorizontal: 10,
  },
  textInputContainer: {
    borderRadius: 5,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // marginHorizontal: 20,
    marginBottom: 0,
  },
  icon1box: {
    backgroundColor: '#19162A',
    height: 50,
    width: 30,
    
    justifyContent: 'center',
    alignItems: 'center',
   
  },
});
