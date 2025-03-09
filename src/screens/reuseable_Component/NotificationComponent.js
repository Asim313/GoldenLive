import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
// import {Swipeable} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {headings, timeDifference, white} from '../../utils/Styles';
import PersonImgInChat from './PersonImgInChat';

const NotificationComponent = props => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const swipeRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={{
          transform: [{scale}],
        }}>
        <TouchableOpacity style={styles.swipeRight}>
          <FontAwesome5Icon name="trash-alt" color="white" size={30} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{}}>
      <AnimatedTouchable
        style={styles.itemContainer}
        // onPress={() => props.onPress()}
      >
        <View style={styles.itemMsg}>
          <PersonImgInChat
            // onPressDp={props.onPressDp}
            style={{borderRadius: 5}}
            image={{
              uri: props.profilePic,
            }}
          />
          <View style={[styles.nameMsg, ]}>
            <Text  style={styles.nameTxt}>
              {props?.title}{' '}
              <Text
                style={
                  props.unreadCounter > 0
                    ? {fontWeight: 'bold', color: 'grey'}
                    : {fontWeight: 'normal', color: 'grey'}
                }>
                {/* {props?.message?.split(' ').slice(0, 5).join(' ')} */}
                {props?.body}
              </Text>
            </Text>

            <Text
              style={
                props.unreadCounter > 0
                  ? {fontWeight: 'bold', color: 'grey'}
                  : {...headings.h8, fontWeight: 'normal', color: 'grey'}
              }>
              
              2m Ago
            </Text>
          </View>
        </View>
        <View style={styles.timCounter}>
          <Text style={styles.timTxt}>{props.time}</Text>
        </View>
      </AnimatedTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeRight: {
    backgroundColor: '#DF4B38',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    marginRight: 40,
  },
  swipeLeft: {
    backgroundColor: '#DF4B38',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(100),
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: '5%',
  },
  itemMsg: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '65%',
  },
  nameMsg: {marginBottom: 10, width: '100%'},
  nameTxt: {
    fontWeight: 'normal',
    color: white,
    width: '100%',
    // backgroundColor: 'blue',
  },
  unReadNameTxt: {
    fontWeight: 'bold',
    color: 'black',
    width: '42%',
  },
  timCounter: {
    height: '80%',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  timTxt: {color: 'black', fontWeight: 'bold'},
  counter: {
    backgroundColor: '#DF4B38',
    borderRadius: 50,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterTxt: {color: 'white', fontWeight: 'bold'},
});

export default NotificationComponent;
