import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {FIREBASE_REF} from '../Services/Constants';
import database from '@react-native-firebase/database';

const StopWatchComponent = ({timeIntervals, isRunning, id, isHost, handleEnd}) => {
  const [remainingTime, setRemainingTime] = useState(timeIntervals[0]);
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timerId;

    if (isRunning && remainingTime > 0) {
      timerId = setTimeout(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0 && isRunning) {
      if (currentIntervalIndex < timeIntervals.length - 1) {
        setCurrentIntervalIndex(prevIndex => prevIndex + 1);
        setRemainingTime(timeIntervals[currentIntervalIndex + 1]);
      } else {
        endPkBattle()
        console.log('All intervals have been completed');
      }
    }

    return () => clearTimeout(timerId);
  }, [isRunning, remainingTime, currentIntervalIndex, timeIntervals]);

  useEffect(() => {
    if (currentIntervalIndex === 0) {
      setShowMessage(true);
    } else if (currentIntervalIndex === 1) {
      setShowMessage(false);
    } else if (currentIntervalIndex === 2) {
        // setShowMessage(false);
        handleEnd()
      }
  }, [currentIntervalIndex]);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const endPkBattle = () => {
    database().ref(`${FIREBASE_REF.PKsearch}/${id}`).remove();
  };

  return (
    <TouchableOpacity
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      onPress={() => {
        (showMessage && isHost) && endPkBattle();
      }}>
      {(isRunning && isHost) && (
        <View style={styles.time}>
          <Text style={styles.textStyle}>
            {(showMessage) && (isHost ? 'PK End' : 'Start In')} ({formatTime(remainingTime)})
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default StopWatchComponent;

const styles = StyleSheet.create({
  time: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP(3),
    borderWidth: 1,

    backgroundColor: 'red',
    borderColor: 'red',
    borderRadius: 7,
    alignItems: 'center',
    paddingVertical: 3,
  },
  textStyle: {
    fontSize: heightPercentageToDP(1.4),
    fontWeight: 'bold',
    color: 'white',
  },
  messageContainer: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  messageText: {
    color: 'green',
  },
});
