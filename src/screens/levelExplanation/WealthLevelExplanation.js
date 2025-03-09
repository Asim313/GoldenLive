import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';

import {
  headings,
  primaryColor,
  secondaryColor,
  white,
} from '../../utils/Styles';
import LinearGradient from 'react-native-linear-gradient';
import {ApiCallToken, ApiUpdateUserData} from '../../Services/Apis/index';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserLevel} from '../../Redux/Actions';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const WealthLevelExplaination = () => {
  const [show, setshow] = useState(true);
  const dimensions = Dimensions.get('window');
  const userData = useSelector(state => state.auth.userData);
  const [userLevels, setUserLevels] = useState([]);
  const [saveUserBeans, setSaveUserBeans] = useState();
  const dispatch = useDispatch();
  const userUpdatedLevel = useSelector(state => state.homeRed.userUpdatedLevel);
  // console.log('Level of Wealth User Level ==>',userUpdatedLevel)

  const GetLevelForMatching = async () => {
    try {
      const beans = await getUpdatedUserData();
      // const beans = 4000
      console.log(' user beansss', beans);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'user/levelsList',
        verb: 'GET',
      });
      const settingUserLevel = res.data.map(item => item);
      const reversed = settingUserLevel.reverse();
      const result = reversed.find(obj => obj.coins <= beans);

      if (result == null) {
        setUserLevels(res.data);
        setSaveUserBeans(0);
      } else {
        setUserLevels(res.data);
        setSaveUserBeans(result.slug);
        dispatch(updateUserLevel(result.slug));
        console.log('Sending data to redux ==>>', result.slug);
      }
      setshow(false);
    } catch (e) {
      console.log('WealthLevelExplaination  error -- ', e.toString());
    }
  };

  const getUpdatedUserData = async () => {
    try {
      const res = await ApiUpdateUserData({
        params: userData.token,
        paramsBody: userData.user.id,
        route: 'user/updated-data',
        verb: 'POST',
      });

      // console.log('here is the respone for updated Data', res.data.send_beans);

      // setSaveUserBeans(res.data.send_beans)
      return res?.data.send_beans;
      // dispatch(updateUserData(res.data));

      // setGettingGiftsArray(res);
    } catch (e) {
      console.log('send gift error is -- ', e.toString());
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetLevelForMatching();
      getUpdatedUserData();
    }, []),
  );

  const renderView = ({item}) => {
    return item.slug <= 5 ? (
      <ImageBackground
        style={{
          height: 115,
          width: 100,
          margin: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../assets/images/levelExplaination/polygonOrange.png')}>
        {item.slug >= 11 ? (
          <Image source={item.image} style={{height: 20, width: 40}} />
        ) : (
          <View
            style={{
              backgroundColor: item.title <= 5 ? '#FE9E00' : '#19B14D',
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 20,
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 7, fontWeight: 'bold'}}>
              Lv. {item.slug}
            </Text>
          </View>
        )}

        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#E93126', fontSize: 16, marginVertical: 3}}>
            {item.title}
          </Text>
          <LinearGradient
            colors={['#ED2D21', '#EB392E', '#F45249']}
            style={{
              justifyContent: 'center',
              borderRadius: 25,
              paddingHorizontal: 8,
              paddingVertical: 5,
            }}>
            <TouchableOpacity>
              <Text style={{color: '#FFFFFF', fontSize: 9, fontWeight: 'bold'}}>
                Beans: {item.coins / 1000}K
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ImageBackground>
    ) : item.slug >= 6 && item.slug <= 10 ? (
      <ImageBackground
        style={{
          height: 115,
          width: 100,
          margin: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../assets/images/levelExplaination/polygonGreen.png')}>
        {item.slug >= 11 ? (
          <Image source={item.image} style={{height: 20, width: 40}} />
        ) : (
          <View
            style={{
              backgroundColor: item.title <= 5 ? '#FE9E00' : '#19B14D',
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 20,
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 7, fontWeight: 'bold'}}>
              Lv. {item.slug}
            </Text>
          </View>
        )}

        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#E93126', fontSize: 16, marginVertical: 3}}>
            {' '}
            {item.title}
          </Text>
          <LinearGradient
            colors={['#ED2D21', '#EB392E', '#F45249']}
            style={{
              justifyContent: 'center',
              borderRadius: 25,
              paddingHorizontal: 8,
              paddingVertical: 5,
            }}>
            <TouchableOpacity>
              <Text style={{color: '#FFFFFF', fontSize: 9, fontWeight: 'bold'}}>
                Beans: {item.coins / 1000}K
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ImageBackground>
    ) : (
      <ImageBackground
        style={{
          height: 115,
          width: 100,
          margin: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../assets/images/levelExplaination/polygonImages.png')}>
        {item.slug >= 11 ? (
          <View
            style={{
              backgroundColor: item.slug <= 5 ? '#FE9E00' : '#19B14D',
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 20,
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 7, fontWeight: 'bold'}}>
              Lv. {item.slug}
            </Text>
          </View>
        ) : (
          <Image source={item.image} style={{height: 20, width: 40}} />
        )}
        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#E93126', fontSize: 16, marginVertical: 3}}>
            {item.title}
          </Text>
          <LinearGradient
            colors={['#ED2D21', '#EB392E', '#F45249']}
            style={{
              justifyContent: 'center',
              borderRadius: 25,
              paddingHorizontal: 8,
              paddingVertical: 5,
            }}>
            <TouchableOpacity>
              <Text style={{color: '#FFFFFF', fontSize: 9, fontWeight: 'bold'}}>
                Beans: {item.coins / 1000}K
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ImageBackground>
    );
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/images/levelExplaination/levelWealth.jpg')}>
      {/* <Text style={{ color: '#FFFFFF', fontSize: 20 }}>{userUpdatedLevel}</Text> */}

      {/* <Image source={require('../../assets/images/levelExplaination/backgroundUp.png')}
            resizeMode="contain"
            style={{ height: '60%', width: '100%',position:'absolute',top:0 }}
        /> */}
      <View
        style={{
          backgroundColor: '#303749',
          height: 50,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            backgroundColor: '#303749',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <LeftArrow
                name="arrow-back-ios"
                size={20}
                style={{color: 'white', alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Wealth Level Explaination
            </Text>
          </View>
          <LinearGradient
            colors={['#ED2D21', '#EB392E', '#F45249']}
            style={{
              justifyContent: 'center',
              borderRadius: 25,
              paddingHorizontal: 12,
            }}>
            <TouchableOpacity>
              <Text
                style={{color: '#FFFFFF', fontSize: 10, fontWeight: 'bold'}}>
                CLOSE
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      {show ? (
        <View style={{flex: 1, alignSelf: 'flex-end'}}>
          <WaveIndicator color="#916321" size={1200} />
        </View>
      ) : (
        <View style={{marginTop: 120, alignItems: 'center'}}>
          <FlatList
            data={userLevels}
            renderItem={renderView}
            style={{height: '90%'}}
            numColumns={3}
          />
          {/* <View style={{ backgroundColor: '#FFFFFF', height: 100 }}>
                <Text>asdf</Text>
            </View> */}
        </View>
      )}
    </ImageBackground>
  );
};
export default WealthLevelExplaination;
const styles = StyleSheet.create({});

// const tempData = [
//   {
//     lv: 1,
//     level: '01',
//     beans: 0,
//     image: null,
//   },

//   {
//     lv: 2,
//     level: '02',
//     beans: 50,
//     image: null,
//   },
//   {
//     lv: 3,
//     level: '03',
//     beans: 100,
//     image: null,
//   },
//   {
//     lv: 4,
//     level: '04',
//     beans: 200,
//     image: null,
//   },
//   {
//     lv: 5,
//     level: '05',
//     beans: 500,
//     image: null,
//   },
//   {
//     lv: 6,
//     level: '06',
//     beans: 1200,
//     image: null,
//   },
//   {
//     lv: 7,
//     level: '07',
//     beans: 1500,
//     image: null,
//   },
//   {
//     lv: 8,
//     level: '08',
//     beans: 1700,
//     image: null,
//   },
//   {
//     lv: 9,
//     level: '09',
//     beans: 2000,
//     image: null,
//   },
//   {
//     lv: 10,
//     level: '10',
//     beans: 2200,
//     image: null,
//   },
//   {
//     lv: 11,
//     level: '11',
//     beans: 2500,
//     image: require('../../assets/images/levelExplaination/lvl11.png'),
//   },
//   {
//     lv: 12,
//     level: '12',
//     beans: 3000,
//     image: require('../../assets/images/levelExplaination/lvl12.png'),
//   },
//   {
//     lv: 13,
//     level: '13',
//     beans: 11000,
//     image: require('../../assets/images/levelExplaination/lvl13.png'),
//   },
//   {
//     lv: 14,
//     level: '14',
//     beans: 12000,
//     image: require('../../assets/images/levelExplaination/lvl14.png'),
//   },
//   {
//     lv: 15,
//     level: '15',
//     beans: 13000,
//     image: require('../../assets/images/levelExplaination/lvl15.png'),
//   },
// ];
