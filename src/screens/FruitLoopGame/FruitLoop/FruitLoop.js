import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Animated, Button, SafeAreaView, ImageBackground, Text, Touchable, Pressable } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import FruitBoardsWithImages from '../Components/FruitBoardsWithImages';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import moment from 'moment-timezone';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ApiCallToken } from '../../../Services/Apis';
import RbSheetComponent from '../../reuseable_Component/RbSheetComponent';
import Rules from '../Components/rules';

const FruitLoop = () => {
  const userData = useSelector(state => state.auth.userData);

  const rulesRef = useRef(null)

  const navigation = useNavigation()
  const [spinValue] = useState(new Animated.Value(0));
  const [rotateTo, setRotateTo] = useState(8.840)
  const [startWinAnime, setStartWinAnime] = useState(false)
  const [startGame, setStartGame] = useState(false)


  const [seconds, setSeconds] = useState(null);
  const [stopTimer, setStopTimer] = useState(true);
  const [timerToRLDB, setTimerToRLDB] = useState(null)
  const [winner, setWinner] = useState(false);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

  //8.660 mango
  //8.840 strawberry
  //9.500 water melon

  const toggleWinner = () => {
    // console.log('toggle winner', winner)
    setWinner(!winner)
  }
  const toggleWinAnime = () => {
    // console.log('toggle', startWinAnime)
    setStartWinAnime(!startWinAnime)
  }

  useEffect(() => {
    database()
      .ref(`/Games/FruitLoopGame/winner`)
      .on('child_changed', snapshot => {
        {
          snapshot?.val() && setTimeout(() => {
            setStopTimer(true)
            setWinner(false)
          }, 15000);
        }
      });
    return () => {
      database().ref('/Games/FruitLoopGame/winner').off()
    }

  }, [])


  const deleteOldWinnerRecord = async () => {
    try {
      const res = await ApiCallToken({
          params: userData.token,
          route: 'delete-winner-record',
          verb: 'GET',
      });
         console.log("dlete record", res)
  } catch (error) {
  console.log('winner record delete', error);
  }
  }

  useEffect(() => {
    if (seconds <= 0 && stopTimer) {
      let timezone = 'Asia/Karachi';
      let now = moment().tz(timezone);
      let datetimeString = now.format('HH:mm:ss');
      let [hours, minutes, secondss] = datetimeString.split(':').map(Number);
      let totalSeconds = (hours * 3600) + (minutes * 60) + secondss;
      setSeconds(30 - (totalSeconds % 41))
      // {seconds > 0 &&  setStartGame(true);}
    }

    if (seconds > 0) {
      // console.log("start seconds")
      if(seconds === 10 )
      {
        deleteOldWinnerRecord()
      }
      const timer = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
      return () => {
        clearInterval(timer)
      };
    }

    else if (seconds <= 0) {
      setStopTimer(false)
      { !stopTimer && toggleWinner() }
    }
  }, [seconds, stopTimer]);

  const startRotation = (rotate) => {
    // Animated.loop(
    // let rotate = 8.840
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: rotate,
      duration: 8000,
      useNativeDriver: true,
    })
      .start(() => {
        toggleWinAnime()
        // console.log("start")
      });
    //)
  }

  const resetRotation = () => {
    // Animated.loop(
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    })
      .start(() => {

      });
    //)
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flex: 1 }}>
      
      <ImageBackground
        source={require('../images/background.png')}
        style={{
          height: '100%',
          width: '100%',
        }}>


        <View style={{ position: 'absolute', zIndex: 4, justifyContent: 'center', alignItems: 'center', top: -85, left: widthPercentageToDP(15) }} >
          <Image
            style={{ width: widthPercentageToDP(70), height: heightPercentageToDP(15), }}
            source={require('../images/gameHeader.png')}
          />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', }}>


          <Animated.Image
            style={{ width: 200, height: 200, position: 'absolute', zIndex: 3, transform: [{ rotate: spin }] }}
            source={require('../images/fruitSpinner.png')}
          />
          <Image
            style={{ width: 25, height: 35, position: 'absolute', zIndex: 999 }}
            source={require('../images/winningpin.png')}
          />
        </View>

        

        <View style={{ position: 'absolute', zIndex: 2, right: 70, justifyContent: 'center', top: '10%' }}>

          {seconds > 0 ? (
            <View style={[styles.imageWithDashboardStyle, { marginLeft: 10, paddingVertical: 0, backgroundColor: 'red' }]}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12 }}>{seconds}</Text>
            </View>
          ) : (
            <View style={[styles.imageWithDashboardStyle, { marginLeft: 10, paddingVertical: 0, backgroundColor: 'red' }]}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12 }}>0</Text>
            </View>
          )}
        </View>

        <Pressable onPress={() => rulesRef.current.open()} style={{ position: 'absolute', zIndex: 5, left: 5, justifyContent: 'center', top: '10%' }}>
           <Image
            style={{ width: widthPercentageToDP(13), height: heightPercentageToDP(1.7) }}
            source={require('../images/rules.png')}
          />

        </Pressable>


        <View style={{ marginTop: 20, height: '50%', top: '25%' }}>
          <FruitBoardsWithImages winner={startWinAnime} toggle={toggleWinAnime} startAnimation={startRotation} winnerApiStatus={winner} />
        </View>
      </ImageBackground>

      <RbSheetComponent
            view={<Rules onCrossPress={() => rulesRef.current.close()}  />}
            refUse={rulesRef}
            close={false}
            backgroundColor={'transparent'}
            height={heightPercentageToDP(50)}
          />

    </View>
  );
};

export default FruitLoop;

const styles = StyleSheet.create({
  imageWithDashboardStyle: {
    backgroundColor: '#FFF7C5',
    height: heightPercentageToDP(4),
    aspectRatio: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
})
