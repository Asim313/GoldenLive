import React, {useEffect, useState} from 'react';
import AnimatedLottieView from 'lottie-react-native';

import {Image, StyleSheet, View, TouchableOpacity, Button} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import globalStyles from '../../utils/styles/global-styles';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {Text} from 'react-native';
import AgoraView from '../../screens/Agora/components/AgoraView';
import AllIcons, {IconList} from '../AllIcons';

const PKBattleHostsView = React.memo(
  ({
    battleWith,
    hostId,
    gifts,
    isHost,
    fromAudience,
    onPressEndPkMatch,
    matchStatus,
  }) => {
    const socket = useSelector(state => state?.homeRed?.socketConnection);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const [battle, setBattle] = useState(null);
    const [userUid, setUserUid] = useState(null);
    const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
    const [matchResult, setMatchResult] = useState(null);
    const [showAnimation, setShowAnimation] = useState(null);
    const [userBeans, setUserBeans] = useState(0);
    const [vsBeans, setVsBeans] = useState(0);

    const [timerDuration, setTimerDuration] = useState({
      time: 0,
      type: 'preparing',
    });

    const [btlEnded, setBtlEnded] = useState(false);
    const data = {
      '-NY8qUURQQiF4MI2jBu0': {
        beans: '500',
        date: 'Sat Jun 20 2023 23:54:44 GMT+0500',
        giftId: 75,
        hostId: '100000273',
        icon: 'https://www.golden-live.com/images/gifs/giftjson/birthdaycelebration.json1671791786.json1678794466.json',
        id: 100000273,
        size: 'small',
      },
      '-NY8rEjJnsA59bySJjub': {
        beans: '500',
        date: 'Sat Jun 20 2023 23:58:02 GMT+0500',
        giftId: 78,
        hostId: '100000273',
        icon: 'https://www.golden-live.com/images/gifs/giftjson/dog.json1671793426.json1678794571.json',
        id: 100000273,
        size: 'small',
      },
      '-NY8rFrrUhNkGe7pXQ7T': {
        beans: '1000',
        date: 'Sat Jun 20 2023 23:58:06 GMT+0500',
        giftId: 95,
        hostId: '100000275',
        icon: 'https://www.golden-live.com/images/gifs/giftjson/magichest.json1671798438.json1677751662.json',
        id: 100000273,
        size: 'small',
      },
      '-NY8rIyQM5PsrxW2qWhB': {
        beans: '500',
        date: 'Sat Jun 20 2023 23:58:23 GMT+0500',
        giftId: 81,
        hostId: '100000273',
        icon: 'https://www.golden-live.com/images/gifs/giftjson/splashanimation.json1671797337.json1678794785.json',
        id: 100000273,
        size: 'small',
      },
    };

    useEffect(() => {
        showPkAnimation()
    }, [])

    const showPkAnimation = async () => {
      setShowAnimation(require('../../assets/json/PK勋章.json'));
      await delay(3000) 
      setShowAnimation(null)
    }

    const msToTime = seconds => {
      let minutes = Math.floor(seconds / 60); // Get the number of minutes
      let remainingSeconds = seconds % 60; // Get the remaining seconds

      // Format the minutes and seconds to be two digits each
      minutes = minutes < 10 ? '0' + minutes : minutes;
      remainingSeconds =
        remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

      return minutes + ':' + remainingSeconds;
    };



    // socket listeners
    useEffect(() => {
      socket.on('countdown', data => {
          // console.log("countdown pk ", data)
        setTimerDuration({
          time: msToTime(data?.remainingTime),
          type: data?.timerType,
          matchId: data?.matchId,
        });
        // matchStatus({type: data?.timerType})
        //  {data?.timerType && manageImages(data?.timerType)}
        // {data?.winner && manageImages(data?.winner)}
      });

      socket.on('startPK', data => {
        console.log('startPK pk ', data);
        let value = 'pk';
        {
          data?.matchId && manageImages(value);
        }
      });

      socket.on('punishmentCountdown', data => {
        console.log('punishmentCountdown pk ', data);
      });

      socket.on('pkResult', data => {
        console.log('pkResult pk ', data);
        const winnerId = data?.winnerInfo?.id;
        {
          data?.winner && manageImages(data?.winner, winnerId);
        }
      });

      socket.on('giftReceived', async data => {
        console.log('giftReceived pk ', data?.gift_record);
        if (data?.gift_record?.userGifts?.[0]) {
          console.log('lllllllllll', data?.gift_record?.userGifts);
          let user = await data?.gift_record?.userGifts?.filter(
            item => parseInt(item?.id) === parseInt(battleWith?.id),
          );
          console.log('userrrrrrrrrrrrr', user);
          let vsBat = await data?.gift_record?.userGifts?.filter(
            item => parseInt(item?.id) === parseInt(battleWith?.vs),
          );
          console.log('userrrrrrrrrrrrr jjj', vsBat);

          console.log('user beans', user?.[0]?.beans, vsBat?.[0]?.beans);
          if (parseInt(user?.[0]?.id) === parseInt(battleWith?.sendGiftTo)) {
            setUserBeans(user?.[0]?.beans ?? 0);
            setVsBeans(vsBat?.[0]?.beans ?? 0);
          } else {
            setUserBeans(vsBat?.[0]?.beans ?? 0);
            setVsBeans(user?.[0]?.beans ?? 0);
          }
        }
        // else if (parseInt(data?.gift_record?.userGifts?.[0]?.id) === parseInt(battleWith?.vs)) {
        //   console.log("user vs beans", data?.gift_record?.userGifts?.[0]?.id)
        //   setVsBeans(data?.gift_record?.userGifts?.[0]?.beans);
        // }
      });

      return () => {
        socket.off('punishmentCountdown');
        socket.off('startPK');
        socket.off('countdown');
        socket.off('giftReceived');
        socket.off('pkResult');
      };
    }, []);

    // console.log('hostssssssss', hostId, userUid, battle)
    const handleTimer = () => {
      console.log('rihgttttttttt', userBeans, vsBeans);
      setBtlEnded(true);
    };

    useEffect(() => {
      // console.log('batt', battleWith)
      if (parseInt(userUpdatedData?.id) === parseInt(battleWith?.id)) {
        setUserUid(0);
        setBattle(battleWith?.vs);
      } else if (parseInt(userUpdatedData?.id) === parseInt(battleWith?.vs)) {
        setUserUid(0);
        setBattle(battleWith?.id);
      } else {
        if (parseInt(battleWith?.sendGiftTo) === battleWith?.vs) {
          setUserUid(battleWith?.vs);
          setBattle(battleWith?.id);
        } else if (parseInt(battleWith?.sendGiftTo) === battleWith?.id) {
          setUserUid(battleWith?.id);
          setBattle(battleWith?.vs);
        }
      }
    }, [battleWith]);

    const manageImages = async (data, winnerId) => {
      // if(data === 'preparing') {
      //   setShowAnimation(require('../../assets/json/PK勋章.json'));
        
      // }
      if (data === 'tie') {
        console.log('tieeeeee');
        setMatchResult(require('../../assets/images/PKFile/draw.png'));
      } else if (data === 'pk') {
        setShowAnimation(require('../../assets/json/pk-start.json'));
      }
      if (winnerId) {
        if (winnerId === parseInt(battleWith?.id)) {
          setMatchResult(require('../../assets/images/PKFile/winner.png'));
          console.log('from aueidka 1111111111111111', fromAudience);
        } else if (winnerId === 'tie') {
          console.log('from aueidka', fromAudience);
          setMatchResult(require('../../assets/images/PKFile/draw.png'));
        } else {
          console.log('from aueidka', fromAudience);
          setMatchResult(require('../../assets/images/PKFile/looser.png'));
        }
      }

      await delay(5000);
      // setMatchResult(null);
    };

    return (
      <View style={globalStyles.screenContainer}>
        <View style={styles.mainContainer}>

          <View style={styles.battleResultStyle}>
            
          {showAnimation && (
            <View>
              {/* <Image source={matchResult} style={{height: '52%', width: '51%'}} /> */}
              <AnimatedLottieView
                autoPlay
                loop={false}
                onAnimationFinish={() => setShowAnimation(false)}
                style={{
                  height: heightPercentageToDP(90),
                  width: widthPercentageToDP(80),
                }}
                source={showAnimation}
              />
            </View>
          )}

          {matchResult && (

              <Image source={matchResult} style={{height: heightPercentageToDP(15), width: widthPercentageToDP(35)}} />

          )}
   </View>

          <View style={styles.timerStyle}>
            <Image
              source={require('../../assets/images/PKFile/pkWithTimer.png')}
              style={{height: 15, width: 15}}
            />
            <Text style={{color: 'white', fontSize: 9, left: 3}}>
              {timerDuration?.time}
            </Text>
          </View>

          <View style={[styles.InnerScreens, {borderColor: '#0066FF'}]}>
            {btlEnded && (
              <AnimatedLottieView
                autoPlay
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: heightPercentageToDP(5),
                  height: heightPercentageToDP(20),
                  width: widthPercentageToDP(30),
                  left: widthPercentageToDP(5),
                }}
                source={
                  userBeans >= vsBeans
                    ? require('../../assets/json/winner.json')
                    : require('../../assets/json/loser.json')
                }
              />
            )}

            <AgoraView id={hostId ?? userUid} />

            <View
              style={[styles.topGiftCountPatti, {backgroundColor: '#0066FF'}]}>
              <View style={styles.giftPointBoxView}>
                <View style={[styles.starIconView, {backgroundColor: 'red'}]}>
                  <AllIcons
                    name={IconList.FontAwesome}
                    iconName={'star'}
                    size={11}
                    color={'#010D91'}
                  />
                </View>
                <Text style={styles.fontStyle}>
                  {userBeans}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.InnerScreens, {borderColor: '#FF5B9B'}]}>
            <AgoraView id={battle} />
            <View
              style={[styles.topGiftCountPatti, {backgroundColor: '#FF5B9B'}]}>
              <View style={styles.giftPointBoxView}>
                <View style={[styles.starIconView, {backgroundColor: 'green'}]}>
                  <AllIcons
                    name={IconList.FontAwesome}
                    iconName={'star'}
                    size={11}
                    color={'#89013A'}
                  />
                </View>
                <Text style={styles.fontStyle}>
                  {vsBeans}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Image
          source={require('../../assets/images/PKFile/pkVs.png')}
          style={{width: '100%', height: heightPercentageToDP(6)}}
        />
      </View>
    );
  },
);

export default PKBattleHostsView;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: heightPercentageToDP(14),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    height: heightPercentageToDP(40),
  },
  InnerScreens: {
    height: '100%',
    width: '50%',
    // borderTopWidth: heightPercentageToDP(3),
  },
  videoView: {width: '100%', height: '100%'},
  border: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
  },
  giftPointBoxView: {
    position: 'absolute',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
  },
  starIconView: {
    backgroundColor: 'green',
    height: 15,
    width: 15,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontStyle: {color: 'white', fontSize: 11, fontWeight: 'bold', marginLeft: 5},
  topGiftCountPatti: {
    position: 'absolute',
    width: '100%',
    height: heightPercentageToDP(3),
    justifyContent: 'center',
  },
  timerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: heightPercentageToDP(3),
    padding: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  battleResultStyle: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
