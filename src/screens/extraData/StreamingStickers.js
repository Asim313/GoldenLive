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
import RBSheet from 'react-native-raw-bottom-sheet';
import database from '@react-native-firebase/database';

import Icon from 'react-native-vector-icons/AntDesign';
import { ApiCallToken } from '../../Services/Apis';
import {useSelector} from 'react-redux';
import AllIcons from '../../components/AllIcons';


const supportedURL = 'https://www.facebook.com/';

const StreamingStickers = () => {
  const sheetRef = useRef(null);
  const [imagePath, setImagePath] = useState(null);
  const [getApiData, setgetApiData] = useState([]);
  const [fetchApiData, setfetchApiData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAnimationView, setShowAnimationView] = useState(false);
  const [openButtonVisible, setOpenButtonVisible] = useState(true);
  const [viewPosition, setViewPosition] = useState({x: 0, y: 0});
  const [firebasePosition, setFirebasePosition] = useState({x: 0, y: 0});
  const [textInputValue, setTextInputValue] = useState('');
  const [receivedTextValue, setReceivedTextValue] = useState('');
  const [fromFirebase, setFromFirebase] = useState(null);
  const userData = useSelector(state => state.auth.userData);

  const handleBttnClick = (imagePath, position) => {
    setImagePath(imagePath);
    setViewPosition(position);
  };

  const handleButtonClick = () => {
    sheetRef.current.open();
    setOpenButtonVisible(false);
    updateViewPosition(viewPosition);

  };

 
  const handleBtnClick = item => {
    console.log('item', item);
    setSelectedItem(item);
    setImagePath(item.image);
    sheetRef.current.close();
    setShowAnimationView(true);

    database().ref('imagePath').set({
      image: item?.sticker_image,
    });
  };

  const pan = useState(new Animated.ValueXY({x: 0, y: 0}))[0];

  const handlePanResponderMove = (_, gestureState) => {
    const newPosition = {x: gestureState.dx, y: gestureState.dy};
    pan.setValue({x: gestureState.dx, y: gestureState.dy});
    setViewPosition(newPosition);
    updateViewPosition(newPosition);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
        listener: handlePanResponderMove,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

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
      console.log('sn', snapshot?.val()?.image);
      setFromFirebase(snapshot?.val()?.image);
    });

    return () => {
      positionRef.off('value', positionListener);
      textRef.off('value', textListener);
      imagePathRef.off('value', imagePathListener);
    };
  }, []);

  const updateViewPosition = position => {
    database()
      .ref('viewPosition')
      .set(position)
      .then(() => {
        console.log('View position sent to Firebase:', position);
      })
      .catch(error => {
        console.log('Error sending view position to Firebase:', error);
      });
  };

  const handleSendText = () => {
    if (textInputValue.trim() !== '') {
      database()
        .ref('textValue')
        .set(textInputValue)
        .then(() => {
          console.log('Text value sent to Firebase:', textInputValue);
        })
        .catch(error => {
          console.log('Error sending text value to Firebase:', error);
        });
    }
  };

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


  
  const handleFetchApiData = async () => {
    // console.log("user data id to blcok", id)
      try {
        const res = await ApiCallToken({
          params: userData.token,
        
          route: `stickers-listing`,
          verb: 'GET',
        });
       // setBlocked(blocked);
        // console.log("check block user ", res)
        console.log(
          'Data fetched successfully:',res);
        setgetApiData(res?.data?.[0].stickers);
        setfetchApiData(res?.data?.[1].stickers);
      } catch (error) {
        console.log('ERROR block user api', error);
      }
  }

 useEffect(() => {
    handleFetchApiData();
  }, []);
  const renderItem = ({item}) => {
   return (
      <TouchableOpacity onPress={() => handleBtnClick(item)}>
        <View style={styles.linearGradient}>
          <Image
            source={{uri: item.sticker_image}}
            style={{height: 50, width: 50}}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: 'white',
              top: 3,
              marginHorizontal: 5,
            }}>
            {item?.id}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem2 = ({item}) => {
 
    return (
      <TouchableOpacity
        onPress={() => handleBtnClick(item)}
        style={{margin: 10}}>
        <Image
          source={{uri: item.sticker_image}}
          style={{height: 70, width: 70}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {openButtonVisible && (
        <TouchableOpacity
          onPress={() => handleButtonClick()}
          style={styles.button1}>
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>
      )}
      <RBSheet
        ref={sheetRef}

        height={550}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}>
        <View style={styles.sheetContent}>
          <View
            style={{
              height: '6%',
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFFFFF', right: 5}}>________________</Text>
            <Text style={{fontSize: 16, color: '#FFFFFF', top: 2}}>Word</Text>
            <Text
              style={{
                paddingHorizontal: 6,
                height: 25,
                backgroundColor: '#F6D236',
                fontSize: 16,
                borderRadius: 5,
                top: 3,
              }}>
              Stickers
            </Text>
            <Text style={{color: '#FFFFFF', left: 5}}>________________</Text>
          </View>
          <View
            style={{
              height: '40%',
              width: '100%',
              // backgroundColor: 'pink',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={getApiData}
              renderItem={renderItem}
              numColumns={3}
              contentContainerStyle={{
                justifyContent: 'space-evenly',
              }}
            />
          </View>
          <View
            style={{
              height: '6%',
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFFFFF', right: 5}}>________________</Text>
            <Text style={{fontSize: 16, color: '#FFFFFF', top: 2}}>
              Graphic
            </Text>
            <Text
              style={{
                paddingHorizontal: 6,
                height: 25,
                backgroundColor: '#F6D236',
                fontSize: 16,
                borderRadius: 5,
                top: 3,
              }}>
              Stickers
            </Text>
            <Text style={{color: '#FFFFFF', left: 5}}>________________</Text>
          </View>
          <View
            style={{
              height: '40%',
              width: '100%',
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={fetchApiData}
              renderItem={renderItem2}
              // keyExtractor={item => item.id.toString()}
              numColumns={3}
              contentContainerStyle={{
                justifyContent: 'space-evenly',
              }}
            />
          </View>
          <TouchableOpacity onPress={() => sheetRef.current.close()}>
            {/* <Icon name="close" size={30} color={'#FFFFFF'} /> */}
            <AllIcons name={'AntDesign'} iconName={"close"} size={30} color={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
      </RBSheet>
      {showAnimationView && (
        <TouchableOpacity>
          <Animated.View
            style={{
              transform: [{translateX: pan.x}, {translateY: pan.y}],
            }}
            {...panResponder.panHandlers}>
            <View style={styles.button}>
              {/* <Text style={styles.boxText}>{receivedTextValue}</Text> */}
              {/* <Button1button1 title="Open" onPress={handlePress} /> */}
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
                      // autoFocus={true}
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

export default StreamingStickers;

