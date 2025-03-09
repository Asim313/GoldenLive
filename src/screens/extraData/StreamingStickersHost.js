import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  PanResponder,
  Button,
  Linking,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';

import {useSelector} from 'react-redux';


const supportedURL = 'https://www.facebook.com/';

const StreamingStickersHost = () => {
 
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAnimationView, setShowAnimationView] = useState(false);
  
  const [firebasePosition, setFirebasePosition] = useState({x: 0, y: 0});
  const [textInputValue, setTextInputValue] = useState('');
  const [receivedTextValue, setReceivedTextValue] = useState('');
  const [fromFirebase, setFromFirebase] = useState(null);
  const userData = useSelector(state => state.auth.userData);

  const pan = useState(new Animated.ValueXY({x: 0, y: 0}))[0];


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  // getting data from node
  useEffect(() => {
    const textRef = database().ref('textValue');
    const positionRef = database().ref('viewPosition');

    const positionListener = positionRef.on('value', snapshot => {
      const position = snapshot.val();
      setFirebasePosition(position);
      console.log('Position received from Firebase:', position);
    });

    const textListener = textRef.on('value', snapshot => {
      const textValue = snapshot.val();
      setReceivedTextValue(textValue);
      console.log('Text value received from Firebase:', textValue);
    });

    const imagePathRef = database().ref('imagePath');
    const imagePathListener = imagePathRef.on('value', snapshot => {
      console.log('sn', snapshot?.val());
      setFromFirebase(snapshot?.val()?.image);
    });

    return () => {
      positionRef.off('value', positionListener);
      textRef.off('value', textListener);
      imagePathRef.off('value', imagePathListener);
    };
  }, []);


  const handlePress = async () => {
    const supported = await Linking.canOpenURL(supportedURL);

    if (supported) {
      await Linking.openURL(supportedURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${supportedURL}`);
    }
  };

  useEffect(() => {
    if (textInputValue.trim() !== '') {
      handleSendText();
    }
  }, [textInputValue]);

  return (
    <View style={styles.container}>
      {showAnimationView && (
        <TouchableOpacity>
          <Animated.View
            style={{
              transform: [{translateX: pan.x}, {translateY: pan.y}],
            }}
            {...panResponder.panHandlers}>
            <View style={styles.button}>
              <View style={styles.modalContainer}>
                {selectedItem && (
                  <View style={styles.linearGradient1}>
                    <TouchableOpacity onPress={handlePress}>
                      <Image
                        source={{uri: selectedItem.sticker_image}}
                        style={{height: 50, width: 50}}
                      />
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.textInput, {width: 80}]}
                      multiline={true}
                      numberOfLines={2}
                      placeholder="Enter text"
                      placeholderTextColor={'white'}
                      value={textInputValue}
                      onChangeText={setTextInputValue}
                    />
                  </View>
                )}
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      )}
      {receivedTextValue !== '' && (
        <Animated.View
          style={{
            transform: [
              {translateX: firebasePosition.x},
              {translateY: firebasePosition.y},
            ],
          }}>
          <View style={styles.box}>
            {fromFirebase && (
              <Image
                source={{uri: fromFirebase}}
                style={{height: 100, width: 100,}}
              />
            )}
            <Text style={{color: 'white'}}>Click Me</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 10,
    color: '#fff',
  },
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.75,
  },
  linearGradient: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    margin: 8,
    top: 10,
    backgroundColor: '#392749',
    borderRadius: 10,
  },
  button: {
    // backgroundColor: 'blue',
    // padding: ,
    borderRadius: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linearGradient1: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    margin: 8,
    // top: 10,
    backgroundColor: '#392749',
  },
  sheetWrapper: {},
  sheetDraggableIcon: {
    backgroundColor: '#000',
  },
  box: {
    height: 100,
    width: 100,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    // backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StreamingStickersHost;

