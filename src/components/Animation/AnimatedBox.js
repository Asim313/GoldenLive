import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import database from '@react-native-firebase/database';

const AnimatedBox = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animationDuration = 1000;
  // const [newItemText, setNewItemText] = useState('');
  const [value, setValue] = useState([]);
  const isAnimating = useRef(false);

  const removeElementAtIndex0 = () => {
    const newArray = [...value];
    newArray.shift();
    setValue(newArray);
  };

  const handleAddText = () => {
    const databaseRef = database().ref('Animation');
    databaseRef.push(newItemText);
    setNewItemText('');
  };

  const handleRemoveDataNode = () => {
    const databaseRef = database().ref('Animation');
    databaseRef
      .remove()
      .then(() => {
        console.log('DATA node removed successfully.');
      })
      .catch(error => {
        console.error('Error removing DATA node:', error);
      });
  };

  useEffect(() => {
    const dataRef = database().ref(`/gifts/${channelName}`)
    const handleChildAdded = snapshot => {
      const newItem = snapshot.val();
      setValue(prevData => {
        if (prevData.includes(newItem)) {
          return prevData;
        } else {
          return [...prevData, newItem];
        }
      });
    };
    dataRef.on('child_added', handleChildAdded);
    dataRef.once('value').then(snapshot => {
      const initialData = snapshot.val();
      if (initialData) {
        const dataArray = Object.values(initialData);
        setValue(dataArray);
      }
    });
    return () => {
      dataRef.off('child_added', handleChildAdded);
    };
  }, []);

  const handleAnimation = () => {
    if (value?.length > 0 && !isAnimating.current) {
      isAnimating.current = true;
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 0.5,
        duration: animationDuration / 2,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: animationDuration / 2,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => {
            removeElementAtIndex0();
            isAnimating.current = false;
          });
        }, 3000);
      });
    }
  };

  useEffect(() => {
    const animationInterval = setInterval(() => {
      handleAnimation();
      console.log('animation Value', value, value?.[0]);
    }, animationDuration + 3000);
    return () => {
      clearInterval(animationInterval);
    };
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      Dimensions.get('window').width / 0.5,
      0,
      -Dimensions.get('window').width / 0.5,
    ],
  });

  return (
    <View style={styles.container}>
      {/* <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TextInput
          value={newItemText}
          onChangeText={text => setNewItemText(text)}
          style={{
            flex: 1,
            marginRight: 10,
            padding: 10,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
          }}
        />
        <TouchableOpacity
          onPress={handleAddText}
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRemoveDataNode}
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>Remove</Text>
        </TouchableOpacity>
      </View> */}
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{translateX}],
          },
        ]}>
        <ImageBackground
          source={require('../../assets/images/L1.png')}
          style={{
            height: 45,
            width: 350,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, color: 'black'}}>{value[0]}</Text>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 45,
    width: 350,
    // backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedBox;
