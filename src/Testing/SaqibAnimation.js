import React, {useEffect, useState} from 'react';
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
import {NetworkType} from 'react-native-agora';

const SaqibAnimation = () => {
  const animatedValue = new Animated.Value(0);
  const animationDuration = 1000;
  const [newItemText, setNewItemText] = useState([34]);
  const [value, setValue] = useState([]);

  ///Remove array data///
  const removeElementAtIndex0 = () => {
    const newArray = [...value];
    newArray.shift();
    setValue(newArray);
  };

  ///firebase Send data///
  const handleAddText = () => {
    const databaseRef = database().ref('Animation');
    databaseRef.push('Animation'.length + 1);
  };

  ///fetch data from Firebase///
  const handleChildAdded = snapshot => {
    const newData = snapshot.val();
    setValue(prevData => [...prevData, newData]);
  };
  //remove node//
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
    const dataRef = database().ref('Animation');
    const handleChildAdded = snapshot => {
      const newItem = snapshot.val();
      // console.log('Fetched new data from Firebase:', newItem);
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
        // console.log('Fetched initial data from Firebase:', dataArray);
      }
    });
    return () => {
      dataRef.off('child_added', handleChildAdded);
    };
  }, []);

  useEffect(() => {
    handleAnimation();
    console.log('animation Value', value, value?.[0]);
  }, [value]);

  const handleAnimation = () => {
    if (value?.[0]) {
      Animated.timing(animatedValue, {
        toValue: 0.5,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        if (value?.[0]) {
          setTimeout(() => {
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: animationDuration,
              easing: Easing.linear,
              useNativeDriver: false,
            }).start(() => {
              removeElementAtIndex0();
            });
          }, 1000);
        }
      });
    }
  };

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
      <View style={{flexDirection: 'row', marginBottom: 10}}>
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
      </View>
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
          <Text style={{fontSize: 15, color: 'black'}}>{value?.[0]}</Text>
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
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SaqibAnimation;