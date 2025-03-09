import React, {useState, useEffect, memo} from 'react';
import {View, Text, Image, Animated, Easing, StyleSheet} from 'react-native';
import { formatNumerWithK } from '../../Services/GlobalFuntions';

const RewardWinningAnimation = memo(({socket}) => {
  const [giftedData, setGiftedData] = useState();

  useEffect(() => {
    socket.on('GiftPattiReward', response => {
        console.log('GiftPattiReward >>>>>>>>>>>>>>>>>>>>>',  response);
        setGiftedData(response)
      });

      return () => {
        socket.off('GiftPattiReward')
      }
  }, [socket])
//   // Animation values
  const animationValue = new Animated.Value(600); 

  useEffect(() => {
   {giftedData?.message && animateImage()}
  }, [giftedData]); 

  
  const animateImage = () => {

    const slideIn = Animated.timing(animationValue, {
        toValue: 100,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      });
  
      const slideOut = Animated.timing(animationValue, {
        toValue: -500,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      });

    Animated.sequence([slideIn, delay(2000), slideOut]).start(() => {
        console.log('animated ended')
         setGiftedData(null)
    });
  };

  const delay = (time) => {
    return Animated.delay(time);
  };


  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
   {giftedData?.reward_time &&   
    <Animated.View
        style={[
          styles.imageBackgroundContainer,
          {
            transform: [{translateX: animationValue}], 
          },
        ]}>
        <Image
          source={require('../../assets/images/bgLuckyGift.png')}
          style={styles.imageBackground}
        />
        <View style={styles.imageContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{formatNumerWithK(giftedData?.reward_time)}</Text>
          </View>
          <Image
            source={{uri: giftedData?.senderProfile}}
            style={styles.image}
          />
        </View>
        <View style={styles.rewardTextContainer}>
          <Text style={styles.rewardText}>
            Congratulations: {giftedData.senderNickname} win lucky gift{' '}
            <Text style={{color: '#FFF500'}}>{giftedData.reward_time} </Text>
            times
          </Text>
        </View>
      </Animated.View>
      }
    </View>
  );
});

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: 364,
    height: 45,
    flexDirection: 'row',
  },
  imageBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
    height: '100%',
  },
  textContainer: {
    marginBottom: '7%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF500',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    height: 35,
    width: 35,
    marginLeft: '12%',
    borderRadius: 30,
  },
  rewardTextContainer: {
    width: '69%',
    marginLeft: '2%',
    marginRight: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 11,
    color: 'white',
    fontWeight: '400',
  },
});

export default RewardWinningAnimation;