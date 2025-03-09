import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign';
import LuckyDrawBox from '../reuseable_Component/LuckyDrawBox';
import {white, txtgrey} from '../../utils/Styles';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ApiCallToken} from '../../Services/Apis';
import {useSelector} from 'react-redux';
import {useEffect, useState, useRef} from 'react';
const LuckyDraw = ({navigation}) => {
  const [luckyDraw, setLuckyDraw] = useState(null);
  const [rewardDuration, setRewardDuration] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  const [buttonClicked, setButtonClicked] = useState(false);
  const intervalRef = useRef();
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(6);
  const [randomNumbeer, setRandomNubmer] = useState(null)

  const GetLuckyDraw = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'Lucky/draw',
        verb: 'GET',
      });
      console.log('here is the respone for Lucky Draw', res);
      // const keys = Object.keys(res);
      setLuckyDraw(res);
      // console.log('Data fetch from button component ',luckyDraw)
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };


  const GetRewardDuration = async (index) => {

    try {
      const params = {
        id: index,
      };
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: params,
        route: 'Lucky/draw/reward',
        verb: 'POST',
      });

      console.log('here is the respone for Lucky Draw ======================>',res, index);

      setRewardDuration(res);
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  useEffect(() => {
    GetLuckyDraw();
    setRandomNubmer(Math.floor(Math.random() * 7))
  }, [])

  useEffect(() => {
    {randomNumbeer && GetRewardDuration(randomNumbeer)}
  }, [randomNumbeer]);

  useEffect(() => {
    if (buttonClicked && randomNumbeer) {
      
      console.log('post api message ', rewardDuration.message);
      if (rewardDuration.message === 'You have gained reward for today') {
        alert(rewardDuration.message);
      } else {
        if (count <= randomNumbeer) {
          intervalRef.current = setInterval(() => {
            console.log('count1', count);
            setCount(prevCount => prevCount + 1);
          }, 500); // Update count every 10 seconds
        } else if (count >= randomNumbeer) {
          Alert.alert("you have won " + rewardDuration?.data)
          console.log("lcuccccccccc", rewardDuration)
          clearInterval(intervalRef.current);
        }

        return () => {
          clearInterval(intervalRef.current);
        };
      }
    }
  }, [buttonClicked, count, randomNumbeer]);
  const ItemStyle = ({item, index}) => {
    return <LuckyDrawBox data={item} count={count} index={index} />;
  };

  const CheckCount = data => {
    if (data?.data) {
      console.log('start animation');
    } else {
      alert('Already get reward try again aftyer 24 hours');
    }
    console.log('check data come or not ', count);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/images/image36.png')}>
        <View style={styles.settingbox}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <BackIcon name="left" size={20} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.settingtxt}>Lucky Draw</Text>
        </View>
        <View>
          <Image
            source={require('../../assets/images/LuckyDraw/shotTxt.png')}
            style={styles.imgstyle}
          />
          <Image
            source={require('../../assets/images/LuckyDraw/luckyTxt.png')}
            style={[styles.imgstyle, {width: wp(80), height: hp(6)}]}
          />
          <Image
            source={require('../../assets/images/LuckyDraw/dailyTxt.png')}
            style={[styles.imgstyle, {width: wp(90), height: hp(6)}]}
          />
          <FlatList
            data={luckyDraw}
            renderItem={ItemStyle}
            numColumns={3}
            key={'3'}
            style={{marginTop: 2}}
            columnWrapperStyle={{
              justifyContent: 'center',
            }}
          />
          <TouchableOpacity 
          // onPress={() => CheckCount(rewardDuration)}
           onPress={() => setButtonClicked(!buttonClicked)}
          >
            <ImageBackground
              source={require('../../assets/images/LuckyDraw/frame.png')}
              style={[
                styles.imgstyle,
                {
                  width: wp(51),
                  height: hp(6),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: hp(1),
                },
              ]}>
              <Image
                source={require('../../assets/images/LuckyDraw/check.png')}
                style={{
                  width: wp(35),
                  height: hp(4),
                  marginTop: 7,
                }}
              />
            </ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              width: wp(70),
              alignSelf: 'center',
            }}>
            <Text style={styles.para}>
              lx daily if you top-up a single transaction of 1000+ beans to win
              a lucky draw
            </Text>
          </View>
          <TouchableOpacity>
            <LinearGradient
              colors={['#E00303', '#F34F45']}
              style={styles.Linbox}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Prize Instructions
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{width: wp(85), alignSelf: 'center'}}>
            <Text style={{color: white, paddingVertical: 5}}>
              1. Any prize gifts received will be immediately delivered to your
              "Backpack."
            </Text>
            {/* <Button title="Click Me" onPress={() => setButtonClicked(true)} /> */}
            <Text style={{color: white, paddingVertical: 5}}>
              2. Any gifts received can be counted towards user wealth level,
              talent star level, talent income.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingbox: {
    flexDirection: 'row',
    paddingVertical: hp(2),
    alignItems: 'center',
    backgroundColor: '#242841',
  },
  settingtxt: {
    fontSize: 19,
    color: 'white',
    fontWeight: '400',
  },
  icon: {
    color: 'white',
    paddingHorizontal: 5,
  },
  imgstyle: {
    width: wp(50),
    height: hp(5),
    alignSelf: 'center',
    marginTop: hp(0.5),
  },
  para: {
    color: white,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: txtgrey,
    borderStyle: 'dashed',
    paddingTop: 10,
    paddingBottom: 15,
    fontSize: 14,
  },
  Linbox: {
    alignSelf: 'center',
    marginVertical: hp(2),
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 25,
  },
});
export default LuckyDraw;
