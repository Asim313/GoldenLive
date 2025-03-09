import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {headings} from '../../utils/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Header from '../reuseable_Component/Header';
import { ApiCallToken } from '../../Services/Apis';
import { useSelector } from 'react-redux';

const payment = [
  {
    id: '1',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '2',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '3',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '4',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '5',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '6',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '7',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '8',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '9',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '10',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '11',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
  {
    id: '12',
    date: 'April, 2022',
    duration: 'Duration (12:30) 00:00',
    bean: require('../../assets/images/bean.png'),
    bean_quantity: '+20',
  },
];
const Earning_Records = () => {
  const navigation = useNavigation();

  const userData = useSelector(state => state.auth.userData);
  const [getHistoryRecords, setGetHistoryRecords] = useState([]);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  

  useEffect(() => {
    userRechargeHistory() 
  }, [])
const userRechargeHistory = async () => {
  try {
      const res = await ApiCallToken({
        params: userData?.token,
        route: 'user/recharge/history',
        verb: 'GET',
      });
   
        console.log("user/recharge/history ", res)
        setGetHistoryRecords(res?.data)
        return res
  } catch (e) {
    console.log('userRechargeHistory ', e.toString());
  }
}

  return (
    <View style={{flex: 1, backgroundColor: '#242A38'}}>
      <ImageBackground
        source={require('../../assets/images/image36.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <StatusBar backgroundColor="#242A38" />
        {/* 
            ///////////////////// */}
       <Header name={'Earning Records'} />

        {/* FlatList */}
        <View style={{paddingBottom: heightPercentageToDP(15)}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={getHistoryRecords}
            keyExtractor={item => item.id}
            renderItem={(item, index) => (
              <TouchableOpacity
                onPress={() => {
                 // navigation.navigate('Details')
                }}
                activeOpacity={0.7}
                style={{
                  ...styles.backgroundColor,
                }}>
                <View
                  style={{
                    ...styles.alignment,
                  }}>
                  <View>
                    <Text
                      style={{
                        ...styles.text_date,
                      }}>
                      {item.item.date}
                    </Text>
                    <Text
                      style={{
                        ...styles.text_duration,
                      }}>
                      {item.item.sender_name}
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.bean_view,
                    }}>
                    <Image
                      source={require('../../assets/images/bean.png')}
                      style={{
                        ...styles.bean,
                      }}
                    />
                    <Text
                      style={{
                        ...styles.bean_quantity,
                      }}>
                      {item.item.beans}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#ff8c00',
    borderRadius: 12,
    marginHorizontal: 15,
    height: widthPercentageToDP(15),
    marginTop: '1%',
  },
  text_date: {
    ...headings.h6,
    color: '#ffffff',
  },
  text_duration: {
    ...headings.h9,
    color: '#C6C6C6',
  },
  alignment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  bean: {
    // top: 2,
    alignSelf: 'center',
  },
  bean_quantity: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffff',
    marginLeft: 5,
  },
  bean_view: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default Earning_Records;
