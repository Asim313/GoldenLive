import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';
import AnimationComponent from './AnimationComponent';

const MainAnimation = () => {

  const [value, setValue] = useState([]);
  const handleChildAdded = async (snapshot) => {
    const newData = snapshot.val();
    setValue(prevData => [...prevData, newData]);
  };
  
  useEffect(() => {
    const databaseRef = database().ref('Animation');
    databaseRef.on('child_added', handleChildAdded);
    return () => {
      database().ref('Animation').off();
    };
  }, []);

  return (
    <AnimationComponent
      value={value}
      setValue={setValue}
    />
  );
};

export default MainAnimation;
