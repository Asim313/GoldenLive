import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import BackIcon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import { ApiCallToken } from '../../Services/Apis';
import Header from '../reuseable_Component/Header';
import { updatedData } from '../../Redux/Actions';


const ExchangeCoins = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userData);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

  const [beansCoins, setBeansCoins] = useState([]);
 // console.log('gggggggggg', beansCoins);

  useEffect(() => {
    GetBeansCoins();
  }, []);

  const renderView = ({item}) => {


    const exchangeBeans = async(coins) => {
        try {
            const paramsBody = {
                coins: coins
            };
              const res = await ApiCallToken({
                params: userData.token,
                paramsBody: paramsBody,
                route: 'exchange-coins-to-beans',
                verb: 'POST',
              });
              console.log('exhagne coins api response ', res);
                dispatch(updatedData(userData));

                Alert.alert(res?.message)


            
        } catch (e) {
            console.log('exchangeBeans error is -- ', e.toString());
          }
              
              
    }


    
    return (
      <TouchableOpacity
        onPress={() => exchangeBeans(item?.coins)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: '5%',
          marginVertical: '1%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: widthPercentageToDP(20), justifyContent: 'space-evenly'}}>
          <Text style={{color: 'black'}}>{item?.coins}</Text>
          <Image
            source={require('../../assets/images/profile/dollar.png')}
            style={{width: 30, height: 30}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#E6E6E6',
            borderRadius: 20,
          }}>
          <Text style={{marginRight: '5%', left: '20%', color: 'black'}}>{item?.beans}</Text>
          <Image
            source={require('../../assets/images/earning1.png')}
            style={{width: 30, height: 30}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const BeansAndCoins = () => {
    return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
            <View style={{justifyContent:'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/profile/dollar.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={{color: 'black', marginVertical: 10}}>{userUpdatedData?.coins}</Text>
        </View>


      
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/earning1.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={{color: 'black', marginVertical: 10}}>{userUpdatedData?.beans}</Text>
        </View>
       
        </View>
    );
  };

  const GetBeansCoins = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list-exchange-coins-to-beans',
        verb: 'GET',
      });
      console.log('GetBeansCoins', res?.data);
      // const keys = Object.keys(res);
      setBeansCoins(res?.data);
      // console.log('Data fetch from button component ',luckyDraw)
    } catch (e) {
      console.log('GetBeansCoins on balance screen ', e.toString());
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header name={'Balance'} />
      <View
        style={{
          height: '20%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#F8F5F5',
        }}>
        <BeansAndCoins />
    
      </View>
      <View
        style={{
          height: '5%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: '3%',
        }}>
        <View>
          <Text style={{color: '#000000', fontSize: 13, fontWeight: 'bold'}}>
            Exchange Coins to Beans
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>10</Text>
          <Image
            source={require('../../assets/images/profile/dollar.png')}
            style={{width: 20, height: 20, marginLeft: 10}}
          />
          <Text style={{color: 'black', marginLeft: 10}}>= 9 </Text>
          <Image
           source={require('../../assets/images/earning1.png')}
            style={{width: 20, height: 20, marginLeft: 10}}
          />
        </View>
      </View>
      <FlatList data={beansCoins} renderItem={renderView} />
    </View>
  );
};

export default ExchangeCoins;

const styles = StyleSheet.create({
  icon: {
    color: 'black',
    paddingHorizontal: 5,
  },
  settingbox: {
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP('2%'),
    alignItems: 'center',
    width: '100%',
    height: '9%',
    backgroundColor: '#303749',
  },
  settingtxt: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
  },
});
