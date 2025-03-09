import React, {memo, useEffect, useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  truncateAfterTenCharacters,
  truncateAfterThreeCharacters,
} from '../../Services/GlobalFuntions';
import BubbleTextAnimation from './bounceTextAnimation';
import SlideInView from './slideAnimateView';
import {fetchImageFromCache} from '../../Services/RnFetchBlob/FetchBlobImage';
import {useDispatch, useSelector} from 'react-redux';
import {updateHostBeans, updatedData} from '../../Redux/Actions';
import AnimatedLottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import LuckyGiftButton from '../LuckyGiftButton';
import LottieGiftView from '../../Testing/lottieGiftView';
import Rnfetchblob from '../../Testing/Rnfetchblob';
import RewardWinningAnimation from './RewardWinningAnimation';

const LuckyGiftAnimationPatti = memo(({channelName}) => {
  // console.log('lllllllllllllllllll{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}{{{{{{{{{{{{{{{{{{{{{{[')
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  // console.log('jjjjjjjjjjjjj>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<~||||||||||||||||', channelName);
  const imageUrl =
    'https://www.golden-live.com/images/gifs/lucky_gift_reward/reward_image.png';
  const [imagePath, setImagePath] = useState(null);
  const socket = useSelector(state => state?.homeRed?.socketConnection);
  const lucky = useSelector(state => state.hostRed.luckyGiftData);
  const listenLuckyGift = useSelector(state => state.hostRed.listenLuckyGift);
  // const socket = useRef(TstSocket)
  const [luckyGiftData, setLuckyGiftData] = useState(null);
  const [designText, setDesignText] = useState(null);
  const [luckyBonusReward, setLuckyBonusReward] = useState(null);

  useEffect(() => {
    setLuckyGiftData(lucky);
    if (lucky) {
      socket.off('LuckyGiftSend');
    } else {
      handleSocket();
    }
  }, [lucky, listenLuckyGift]);

  const handleSocket = () => {
    // console.log("ponnnnnnnnnnnnnnn")
    socket.on('LuckyGiftSend', response => {
      if (!lucky) {
        //  console.log('response', response)
        setLuckyGiftData(response);
      }
      let hostsData = response?.hosts;
      //get hosts beadn adn send it to redux
      let ch = hostsData?.filter(
        item => parseInt(item?.HostId) === parseInt(channelName),
      );
      if (ch?.[0]?.HostCoins) {
        dispatch(updateHostBeans(ch?.[0]?.HostCoins));
      }
      //  UpdateUserData()
    });
  };
  useEffect(() => {
    if (socket) {
      socket.on('LuckyGifthNull', data => {
        if (data?.message === 1) {
          setLuckyGiftData(null);
        }
      });

      socket.on('notEnoughBeans', function (result) {
        alert("Don't have enough beans.");
        console.log('Received notEnoughBeans:', result);
      });
      socket.on('ChannelJoinMessage', data => {
        console.log('Channel Join Messages >>> :', data);
      });
      socket.on('ChannelLeaveMessage', data => {
        console.log('ChannelLeaveMessage >>> :', data);
      });

      socket.on('LuckyCountImage', response => {
        setDesignText(response);
      });

      socket.on('LuckyGiftReward', response => {
        setLuckyBonusReward(response);
      });

      socket.on('error', err => {
        console.log('Error to the server', err);
      });

      socket.on('updatedBeans', data => {
        // console.log('user updated beans', data);
        // if(data?.userId === userUpdatedData?.id) {
        //   dispatch(updateHostBeans(data?.Beans ?? 0));
        // }
      });

      socket.emit('channelJoin', {channel: channelName});
    }

    return () => {
      if (socket) {
        socket.off('connected');
        socket.off('LuckyGiftSend');
        socket.off('error');
        socket.off('LucyCount');
        socket.off('Lucky Gift');
        socket.off('updatedBeans');
        socket.off('countImage');
        socket.off('rewardLucky');
        socket.off('ChannelJoinMessage');
        socket.off('ChannelLeaveMessage');
        socket.off('notEnoughBeans');
        socket.off('LuckyGifthNull');
        socket.emit('channelLeave', {channel: channelName});
      }
    };
  }, []);

  const UpdateUserData = async () => {
    dispatch(updatedData(userData));
  };

  // useEffect(() => {
  //   {
  //     luckyBonusReward?.image && getImage(luckyBonusReward?.image);
  //   }
  // }, [luckyBonusReward]);

  useEffect(() => {
    {
      designText && handleFontStyle();
    }
  }, [designText]);

  const handleFontStyle = async () => {
    await delay(4000);
    setDesignText(null);
  };

  useEffect(() => {
    {
      luckyBonusReward && hanldeRewardBanner();
    }
  }, [luckyBonusReward]);

  const hanldeRewardBanner = async () => {
    await delay(10000);
    setLuckyBonusReward(null);
  };

  const getImage = async img => {
    console.log('vallllllll');
    let val = await fetchImageFromCache(img);
    console.log('vallllllll', val);
    setImagePath(val);
  };

  return (
    <View style={styles.container}>
      <View style={{top: heightPercentageToDP(10), position: 'absolute'}}>
        <RewardWinningAnimation socket={socket} />
      </View>
      <LuckyGiftButton />
      {luckyBonusReward?.image && (
        <View
          style={{
            position: 'absolute',
            zIndex: 3,
            top: heightPercentageToDP(0),
            left: widthPercentageToDP(0),
          }}>
          <AnimatedLottieView
            autoPlay
            loop={false}
            onAnimationFinish={() => console.log('jjjen ded')}
            style={{
              height: heightPercentageToDP(100),
              width: widthPercentageToDP(100),
            }}
            source={require('../../assets/json/lucky-gift-reward.json')}
          />
        </View>
      )}

      {designText?.image && (
        <View
          style={{
            position: 'absolute',
            // zIndex: 100,
            top: heightPercentageToDP(10),
            left: widthPercentageToDP(20),
            // backgroundColor: 'red',
          }}>
          {/* <Rnfetchblob giftData = {{icon: designText?.json, audio: designText?.sound }} handle  AnimationEnded={() => setDesignText(null)} /> */}
          {/* <LottieGiftView jsonPath={designText?.json} mp3Path={designText?.sound} hasFinished={() => console.log('animation ended')} /> */}
          <Image
            source={{uri: designText?.image}}
            style={{width: 250, height: 250}}
          />
        </View>
      )}
      {/* <Text>{JSON.stringify(data)}</Text> */}
      {luckyGiftData?.senderNickname && (
        <>
          <LinearGradient
            colors={['#0090CD', '#00FFC2', 'rgba(11, 171, 193, 0)']}
            start={{x: 0, y: 0.5}} // Start from the middle of the left side
            end={{x: 1, y: 0.5}} // End at the middle of the right side
            style={styles.mainContainer}>
            {luckyGiftData?.sender_profile && (
              <Image
                source={{uri: luckyGiftData?.sender_profile}}
                style={styles.imageStyle}
              />
            )}

            <View style={{left: 5}}>
              {luckyGiftData?.senderNickname && (
                <Text
                  style={[
                    styles.fontStyle,
                    {fontSize: 12, fontWeight: 'bold'},
                  ]}>
                  {truncateAfterTenCharacters(luckyGiftData?.senderNickname)}
                </Text>
              )}
              {luckyGiftData?.giftName && (
                <Text style={[styles.fontStyle, {fontSize: 9}]}>
                  sent {truncateAfterThreeCharacters(luckyGiftData?.giftName)}
                </Text>
              )}
            </View>

            {luckyGiftData?.giftImage && (
              <Image
                source={{uri: luckyGiftData?.giftImage}}
                style={[styles.imageStyle, {marginHorizontal: 5}]}
              />
            )}
            {luckyGiftData?.count && (
              <View style={{right: 10}}>
                <BubbleTextAnimation text={'x' + luckyGiftData?.count} />
              </View>
            )}
          </LinearGradient>
        </>
      )}
    </View>
  );
});

export default LuckyGiftAnimationPatti;

const styles = StyleSheet.create({
  fontStyle: {
    color: 'white',
    fontSize: 11,
  },
  imageStyle: {
    height: 30,
    width: 30,
    borderRadius: 13,
  },
  container: {
    left: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black'
  },
  mainContainer: {
    paddingHorizontal: 5,
    width: widthPercentageToDP(55),
    top: heightPercentageToDP(30),
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
