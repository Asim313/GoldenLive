import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { luckyGiftCounter, setLiveHost, updatedData } from '../Redux/Actions';

const LuckyGiftButton = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.userData);
    const lucky = useSelector(state => state.hostRed.luckyGiftData);
    const socket = useSelector(state => state?.homeRed?.socketConnection)
    const [isLoading, setIsLoading] = useState(false)
    const delay = ms => new Promise(res => setTimeout(res, ms));
    // console.log("lllllllllllllllll")
    const [seconds, setSeconds] = useState(20);

    useEffect(() => {
        setSeconds(20)
        const timer = setInterval(() => {
          setSeconds(prevSeconds => {
            const updatedSeconds = prevSeconds - 1;
    
            if (updatedSeconds <= 0) {
              clearInterval(timer);
                dispatch(luckyGiftCounter(null))
              return 0;
            }
    
            return updatedSeconds;
          });
        }, 1000);
    
        // Clear the interval when the component unmounts
        return () => {
            clearInterval(timer)
        };
      }, [lucky]);

    
const handleClick = async () => {
     setIsLoading(true)

    let makeIncrement = {
        ...lucky,
        count: lucky.count + 1
      }

      let makeIncrement2 = {
       num_gift: 1,
      authorization: lucky?.authorization, 
      gift_id: lucky?.gift_id,
      host_ids: lucky?.host_ids,
      auth_id: lucky?.auth_id,
      count_gift: lucky.count + 1,
      date_time : lucky?.date_time.toString(),
      channel: lucky?.channel
     }

      dispatch(luckyGiftCounter(makeIncrement))
       await delay(50)

       setIsLoading(false)

       socket.emit('LuckyGift', makeIncrement2);
       dispatch(updatedData(userData));
    // count.current = count.current + 1
}
  return (
    <View>
    { lucky?.showBtn && <TouchableOpacity onPress={() => {
       !isLoading && 
       handleClick()
    }} style={styles.mainContainer}>
            <Text style={{fontSize: 13, fontWeight: '500', color: 'black'}}>{seconds}</Text>
        </TouchableOpacity>}
    </View>
  )
};

export default LuckyGiftButton;

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#87CEEB',
    top: heightPercentageToDP(70),
    height: 90,
    borderRadius: 100,
    width: 90,
    left: widthPercentageToDP(70),
    justifyContent: 'center', 
    alignItems: 'center'
  },
});
