// CustomComponent.js
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import AllIcons, { IconList } from '../AllIcons';
import { heightPercentageToDP } from 'react-native-responsive-screen';

// ... (previous code)

const CustomComponent = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const translationX = new Animated.Value(0);
  
    const toggleComponent = () => {
      setIsOpen(!isOpen);
    };
  
    const slideOut = () => {
      //  setIsOpen(true)
        console.log('here')
      Animated.timing(translationX, {
        toValue: -100, // Adjust the value based on your desired slide distance
        duration: 500,
        useNativeDriver: false,
      }).start();
  
      // Automatically close after 5 seconds
      setTimeout(() => {
        setIsOpen(false);
        slideBack();
      }, 3000);
    };
  
    const slideBack = () => {
      Animated.timing(translationX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    };
  
    const handleToggle = () => {

        console.log('setonnnnnnnnnn', isOpen)
      if (isOpen) {
        slideBack();
      } else {
        slideOut();
      }
  
      toggleComponent();
    };
  
    // ... (rest of the code)
  
    return (
      <View style={styles.container}>
        <PanGestureHandler
          //onGestureEvent={onGestureEvent}
          //onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.arrowContainer,
              {
                transform: [{ translateX: translationX }],
              },
            ]}
          >
            <TouchableOpacity onPress={slideOut}>
             {/* <Text>hello what is gion on</Text> */}
             
              <View style={styles.arrowIcon}>
                    <AllIcons name={IconList.Entypo} iconName={'arrow-bold-left'} size={15} color={'white'} />
                    {children}

              </View>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
       
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    right: -100,
    top: heightPercentageToDP(80),
    zIndex: 2,
  },
  arrowIcon: {
    paddingHorizontal: 5,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#451E08', // Adjust the style based on your design
  },
  contentView: {
    position: 'absolute',
    top: 0,
    zIndex: 50,
    left: 200,
    width: 200, // Adjust the width based on your design
    height: '100%',
    backgroundColor: 'red', // Adjust the style based on your design
  },
});

export default CustomComponent;
