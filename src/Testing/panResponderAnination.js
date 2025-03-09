import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StickerAnimatedBox from '../components/Animation/stickerMoveAnimation';

const PanResponderAnimation = () => {

    const [gestureValue, setGestureValue] = useState({x: 310, y: 285})
    const [sendGiftTo, setSendGiftTo] = useState({x: 133, y: 105})


  return (
    <View style={styles.container}>
    <StickerAnimatedBox position={gestureValue} toValue={sendGiftTo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1
  },
});

export default PanResponderAnimation;
