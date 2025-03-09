import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import database from '@react-native-firebase/database';
import SlideAnimation from '../Animation/SlideAnimation';
import { getHostCoins } from '../../Services/ApisCall';
import { updateHostBeans } from '../../Redux/Actions';
import { useDispatch } from 'react-redux';

const AnimatedGiftView = ({channelName, cohostData, userData}) => {
  const ref = React.useRef();
  const checkDate = new Date();
  const dispatch = useDispatch()
  const [giftReceived, setGiftReceived] = useState();
  const [cohostList, setCohostList] = useState([]);

  useEffect(() => {
    setCohostList(cohostData);
  }, [cohostData]);

  useEffect(() => {
    checkGiftStatus();
  //  console.log('9999999999999999999', channelName);
  }, []);

  const checkGiftStatus = () => {
    database()
      .ref(`/giftsMultiRoom/${channelName}`)
      .on('child_added', snapshot => {
         console.log('aaaaaaaaaaaaaaaaaaaa', snapshot.val())
        receiveGiftFromFirebase(snapshot.val());
      });
  };

  const receiveGiftFromFirebase = async (val) => {
    let messageDate = new Date(val?.date);
    if (messageDate?.getTime() > checkDate.getTime() + 500) {
      setGiftReceived(val);
      paramsBody = {
        host_id: channelName
      }
      let res = await getHostCoins({paramsBody, token: userData?.token })
      // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', res)
      if(res?.message) {
        dispatch(updateHostBeans(res?.message?.coins))
      }
    }

  };

  useEffect(() => {
    playAnim();
  }, [giftReceived]);

  const playAnim = () => {
    // console.log('playanime')
    ref.current?.play();
  };

  const pauseAnim = () => {
    // console.log('paused2')
    ref.current?.pause();
    setGiftReceived(false);
  };

  return (
    <View
      style={styles.giftStyle}>
      {/* <View>
        <SlideAnimation channelName={channelName} cohostData={cohostList} />
      </View> */}
      {giftReceived && (
        <View style={{position: 'absolute', right: 0, left: 0, zIndex: 4}}>
          <AnimatedLottieView
            ref={ref}
            loop={false}
            autoPlay={false}
            onAnimationFinish={() => pauseAnim()} 
            style={
              giftReceived?.size === 'small'
                ? styles.giftSmallSize
                : giftReceived?.size === 'medium'
                ? styles.giftMediumSize
                : styles.giftLargeSize
            }
            source={{uri: giftReceived?.icon}}
          />
        </View>
      )}
    </View>
  );
};

export default AnimatedGiftView;

const styles = StyleSheet.create({
  giftSmallSize: {
    width: 320,
    height: 330,
  },
  giftMediumSize: {
    width: 500,
    height: 500,
  },
  giftLargeSize: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  giftStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  }
});
