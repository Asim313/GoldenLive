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
import {useDispatch, useSelector} from 'react-redux';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  headings,
  primaryColor,
  secondaryColor,
  white,
} from '../../utils/Styles';
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
import LinearGradient from 'react-native-linear-gradient';
import {ApiCallToken, ApiUpdateUserData} from '../../Services/Apis';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {updateHostLevel, updateUserLevel} from '../../Redux/Actions';

const tempData = [
  {
    lv: 1,
    level: '01',
    beans: 0,
  },

  {
    lv: 2,
    level: '02',
    beans: 50,
  },
  {
    lv: 3,
    level: '03',
    beans: 100,
  },
  {
    lv: 4,
    level: '04',
    beans: 200,
  },
  {
    lv: 5,
    level: '05',
    beans: 500,
  },
  {
    lv: 6,
    level: '06',
    beans: 1200,
  },
  {
    lv: 7,
    level: '07',
    beans: 1500,
  },
  {
    lv: 8,
    level: '08',
    beans: 1700,
  },
  {
    lv: 9,
    level: '09',
    beans: 2000,
  },
  {
    lv: 10,
    level: '10',
    beans: 2200,
  },
  {
    lv: 11,
    level: '11',
    beans: 2500,
  },
  {
    lv: 12,
    level: '12',
    beans: 3000,
  },
  {
    lv: 13,
    level: '13',
    beans: 3200,
  },
  {
    lv: 14,
    level: '14',
    beans: 3500,
  },
  {
    lv: 15,
    level: '15',
    beans: 4000,
  },
];
const TalentLevelExplaination = () => {
  const userData = useSelector(state => state.auth.userData);
  const [userLevels, setUserLevels] = useState([]);
  const [show, setshow] = useState(true);
  const [saveUserBeans, setSaveUserBeans] = useState();
  const dispatch = useDispatch();
  const userUpdatedLevel = useSelector(state => state.homeRed.userUpdatedLevel);

  const GetLevelForMatching = async () => {
    try {
      const beans = await getUpdatedUserData();
      console.log('RECEIVED BEANS from updated data', beans);
      // const beans = 4000
      console.log(' user received beansss', beans);
      const res = await ApiCallToken({
        params: userData.token,
        route: 'host/levelsList',
        verb: 'GET',
      });

      // console.log("Getting HOST data from API", res.data)
      const settingHostLevel = res.data.map(item => item);
      const reversed = settingHostLevel.reverse();
      const result = reversed.find(obj => obj.beans <= beans);
      // console.log('Result ==>> ',result.slug)

      if (result == null) {
        setUserLevels(res.data);
        setSaveUserBeans(0);
        dispatch(updateHostLevel(0));
      } else {
        setUserLevels(res.data);
        setSaveUserBeans(result.slug);
        dispatch(updateHostLevel(result.slug));
        console.log('Sending host Level to redux ==>>', result.slug);
      }
      setshow(false);
    } catch (e) {
      console.log('saga login error -- ', e.toString());
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

      return res.data.received_beans;
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
    return (
      <ImageBackground
        style={{
          height: 115,
          width: 100,
          margin: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../assets/images/levelExplaination/polygonGreen.png')}>
        <View
          style={{
            backgroundColor: '#FE9E00',
            paddingHorizontal: 7,
            paddingVertical: 2,
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: item.image}}
            resizeMode={'contain'}
            style={{width: 10, height: 10, marginRight: 1}}
          />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 7,
              fontWeight: 'bold',
              marginLeft: 1,
            }}>
            Lv. {item.slug}
          </Text>
        </View>

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
                Beans: {item.beans}
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
      source={require('../../assets/images/levelExplaination/talenWealth.png')}>
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
              Talent Level Explaination
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
      {/* <Text style={{color:'#FFFFFF',fontSize:20}}>user Level {userUpdatedLevel}</Text> */}

      {show ? (
        <View style={{flex: 1, alignSelf: 'flex-end'}}>
          <WaveIndicator color="#2bff52" size={1200} />
        </View>
      ) : (
        <View style={{marginTop: 130, alignItems: 'center'}}>
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
export default TalentLevelExplaination;
const styles = StyleSheet.create({});

// const renderView = ({ item }) => {
//     return (
//         item.lv <= 5 ?

//             <ImageBackground style={{ height: 115, width: 100, margin: 8, justifyContent: 'center', alignItems: 'center' }}
//                 source={require('../../assets/images/levelExplaination/polygonOrange.png')}
//             >
//                 <View style={{ backgroundColor: item.lv <= 5 ? '#FE9E00' : item.lv <= 10 ? '#27B0FF' : '#19B14D', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20, flexDirection: 'row' }}>
//                     <Image source={require('../../assets/images/levelExplaination/dia.png')} resizeMode={'contain'} style={{ width: 10, height: 10, marginRight: 1 }} />
//                     <Text style={{ color: '#FFFFFF', fontSize: 7, fontWeight: 'bold', marginLeft: 1 }}>Lv. {item.lv}</Text>
//                 </View>

//                 <View style={{ alignItems: 'center' }}>
//                     <Text style={{ color: '#E93126', fontSize: 16, marginVertical: 3 }}>Level {item.level}</Text>
//                     <LinearGradient colors={['#ED2D21', '#EB392E', '#F45249']} style={{ justifyContent: 'center', borderRadius: 25, paddingHorizontal: 8, paddingVertical: 5 }}>
//                         <TouchableOpacity >
//                             <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: 'bold' }}>Beans: {item.beans}K</Text>
//                         </TouchableOpacity>
//                     </LinearGradient>
//                 </View>

//             </ImageBackground>
//             :

//             item.lv >= 6 && item.lv <= 10 ?
//                 <ImageBackground style={{ height: 115, width: 100, margin: 8, justifyContent: 'center', alignItems: 'center' }}
//                     source={require('../../assets/images/levelExplaination/polygonImages.png')}
//                 >
//                     <View style={{ backgroundColor: item.lv <= 5 ? '#FE9E00' : item.lv <= 10 ? '#27B0FF' : '#19B14D', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20, flexDirection: 'row' }}>
//                         <Image source={require('../../assets/images/levelExplaination/butterfly.png')} resizeMode={'contain'} style={{ width: 10, height: 10, marginRight: 1 }} />
//                         <Text style={{ color: '#FFFFFF', fontSize: 7, fontWeight: 'bold', marginLeft: 1 }}>Lv. {item.lv}</Text>
//                     </View>

//                     <View style={{ alignItems: 'center' }}>
//                         <Text style={{ color: '#E93126', fontSize: 16, marginVertical: 3 }}>Level {item.level}</Text>
//                         <LinearGradient colors={['#ED2D21', '#EB392E', '#F45249']} style={{ justifyContent: 'center', borderRadius: 25, paddingHorizontal: 8, paddingVertical: 5 }}>
//                             <TouchableOpacity >
//                                 <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: 'bold' }}>Beans: {item.beans}K</Text>
//                             </TouchableOpacity>
//                         </LinearGradient>
//                     </View>

//                 </ImageBackground>
//                 :
//                 <ImageBackground style={{ height: 115, width: 100, margin: 8, justifyContent: 'center', alignItems: 'center' }}
//                     source={require('../../assets/images/levelExplaination/polygonGreen.png')}
//                 >
//                     <View style={{ backgroundColor: item.lv <= 5 ? '#FE9E00' : item.lv <= 10 ? '#27B0FF' : '#19B14D', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20, flexDirection: 'row' }}>
//                         <Image source={require('../../assets/images/levelExplaination/firebeetle.png')} resizeMode={'contain'} style={{ width: 10, height: 10, marginRight: 1 }} />
//                         <Text style={{ color: '#FFFFFF', fontSize: 7, fontWeight: 'bold', marginLeft: 1 }}>Lv. {item.lv}</Text>
//                     </View>

//                     <View style={{ alignItems: 'center' }}>
//                         <Text style={{ color: '#E93126', fontSize: 16, marginVertical: 3 }}>Level {item.level}</Text>
//                         <LinearGradient colors={['#ED2D21', '#EB392E', '#F45249']} style={{ justifyContent: 'center', borderRadius: 25, paddingHorizontal: 8, paddingVertical: 5 }}>
//                             <TouchableOpacity >
//                                 <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: 'bold' }}>Beans: {item.beans}K</Text>
//                             </TouchableOpacity>
//                         </LinearGradient>
//                     </View>
//                 </ImageBackground>

//     )
// }
