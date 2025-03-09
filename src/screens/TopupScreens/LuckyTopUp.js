import React, {useEffect, useState} from 'react';
import {
    Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {luckyRewardList} from '../../Services/ApisCall/TopupAPis';
import {formatNumerWithK} from '../../Services/GlobalFuntions';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import TextSlideAnimation2 from '../../components/Animation/TextSlideAnimationCopy';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Header from '../reuseable_Component/Header';

const LuckyTopUp = () => {
    const navigation = useNavigation()
  const userData = useSelector(state => state.auth.userData);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const [getRecord, setGetRecord] = useState();
  const [isLoading, setIsLoading] = useState(null);
  useEffect(() => {
    getLuckyUserRecord();
  }, []);

  const getLuckyUserRecord = async () => {
    setIsLoading(true);
    const res = await luckyRewardList({token: userData?.token});
    console.log('ressssssss licky top up', res);
    setGetRecord(res?.data ?? []);
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
        <Header name={'Lucky Topup'} />
      <LinearGradient
        start={{x: 0.2, y: 1}}
        end={{x: 1, y: 0.5}}
        colors={['rgba(179, 55, 255, 1)', 'rgba(255, 0, 153, 1)']}
        style={{
          height: heightPercentageToDP(20),
          marginVertical: 10,
          borderRadius: 12,
          justifyContent: 'space-around',
          paddingHorizontal: 10
        }}>

            <View>
        <Text
          style={{fontWeight: '500', left: 5, color: 'white', fontSize: 22}}>
          ${formatNumerWithK(userUpdatedData?.lucky_reward)}
        </Text>
        <Text style={{left: 5, color: 'white', fontSize: 17}}>
          Withdraw Amount
        </Text>
        </View>

        <TouchableOpacity onPress={() => {
            if(parseInt(userUpdatedData?.lucky_reward) > 0) {
                console.log('jjjjjjjjjjjjjjjjjjjj', parseInt(userUpdatedData?.lucky_reward) )
                navigation.navigate('WithdrawMethod', {
                    amount: userUpdatedData?.lucky_reward,
                    fromLucky: true
                });
            } else {
                Alert.alert("You don't have enough amount.")
            }
        }}  style={{ backgroundColor: '#FF7A00', width: '60%', borderRadius: 12, padding: 5}}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
                alignSelf: 'center'
            }}>
            Add a Payment Method
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text style={{color: 'black', fontWeight: '500', alignSelf: 'center'}}>
        Record
      </Text>
      <View style={{top: 10}}>
        <FlatList
          data={getRecord}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlistMainContainer}>
                <View style={{flexDirection: 'row'}}>
                  {item?.image && (
                    <Image
                      source={{uri: item?.image}}
                      style={styles.listMainImage}
                    />
                  )}
                  <View style={{justifyContent: 'center', marginHorizontal: 5}}>
                    <Text
                      style={{color: 'black', fontSize: 11, fontWeight: '500'}}>
                      {item?.nick_name ?? item?.full_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#E78A00',
                        width: 40,
                        borderRadius: 30,
                        marginHorizontal: 5,
                        top: 3,
                      }}>
                      <Image
                        source={require('../../assets/images/profile/starLevel.png')}
                        style={{width: 16, height: 16}}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 9,
                          fontWeight: '500',
                          left: 2,
                        }}>
                        {item?.reciever_level}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text
                  style={{color: '#FF7A00', fontSize: 13, fontWeight: 'bold'}}>
                  {formatNumerWithK(item?.beans) ?? 0}
                </Text>
                <Text
                  style={{color: '#FF7A00', fontSize: 13, fontWeight: 'bold'}}>
                  ${formatNumerWithK(item?.dollar) ?? 0}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default LuckyTopUp;

const styles = StyleSheet.create({
  listMainImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  flatlistMainContainer: {
    backgroundColor: '#C927E2',
    marginVertical: 2,
    borderRadius: 12,
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
