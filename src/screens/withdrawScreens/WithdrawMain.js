import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import Card from 'react-native-vector-icons/FontAwesome5';
import RoundArrow from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Close from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StatusBar} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {updateUserData} from '../../Redux/Actions';
import { ApiCallToken } from '../../Services/Apis';

const WithdrawMain = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
  const dispatch = useDispatch();
  const [coinsData, setCoinsData] = useState(null);
  const [coinsLimit, setCoinsLimit] = useState(null);
  const [coinsExchangeRate, setCoinsExchangeRate] = useState(null);
  //console.log('userData **************************', userUpdatedData);

  // useFocusEffect(() => { CoinExchange() }, [])
  useEffect(() => {
    coinsDetails()
    setTimeout(() => {
      AsyncStorage.removeItem('@CoinExchange');
    }, 1000);
  }, []);

  
  const coinsDetails = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'money/limit',
        verb: 'GET',
      });
   
      console.log('res2222', JSON.stringify(res)  + '\n', res?.data?.exchange_rate)
      setCoinsExchangeRate(res?.data?.coins_exchange?.[0]?.coins)
      setCoinsData(res?.data?.exchange_rate?.[0])
      setCoinsLimit(res?.data?.money_limit?.[0])
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  const walletCalculations = () => {
    console.log("oins", coinsExchangeRate)
    if(coinsExchangeRate) {
      const total = userUpdatedData.coins / coinsExchangeRate;
      const RoundTotal = Math.floor(total);
      return RoundTotal;
    }
  };

  return (
    <View style={{flex: 1, marginBottom: '14%'}}>
      <StatusBar backgroundColor={'#c471ed'} />
      <ImageBackground
        source={require('../../assets/images/bg.png')}
        resizeMode={'stretch'}
        style={{height: '100%', width: '100%'}}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <LeftArrow
                  name="arrow-back-ios"
                  size={20}
                  style={{color: 'black', alignSelf: 'center'}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Withdraw
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Earnings')}
                style={{
                  backgroundColor: '#c471ed',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                  Records
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <LinearGradient
              colors={['#4568DC', '#B06AB3']}
              style={{
                backgroundColor: '#9A0D15',
                paddingVertical: 5,
                borderRadius: 15,
                paddingHorizontal: 10,
              }}>
              <View>
                <Image
                  source={require('../../assets/images/withdrawVector.png')}
                  resizeMode="cover"
                  style={{backgroundColor: ''}}
                />
                <Text
                  style={{
                    color: 'white',
                    position: 'absolute',
                    top: 10,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  
                </Text>
                <Text
                  style={{
                    color: 'white',
                    position: 'absolute',
                    top: 25,
                    fontSize: 45,
                    fontWeight: 'bold',
                  }}>
                  ${walletCalculations()}
                  {/* {selectedPair == null ? 0 : selectedPair == 0 ? 10 : 50} */}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    bottom: 35,
                    position: 'absolute',
                    width: '100%',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Withdraw Amount
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 30,
                        fontWeight: 'bold',
                      }}>
                      ${}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      position: 'absolute',
                      right: 0,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Points to be confirmed
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../../assets/images/coin.png')}
                        resizeMode="cover"
                        style={{height: 22, width: 22}}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 30,
                          fontWeight: 'bold',
                          marginLeft: 5,
                        }}>
                        {userUpdatedData.coins - walletCalculations() * coinsExchangeRate}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#FFFFFFaa',
                    height: 1,
                    width: '100%',
                    position: 'absolute',
                    bottom: 30,
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 2,
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    $0.00
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                    }}>
                    =
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/beanA.png')}
                      resizeMode="cover"
                      style={{height: 15, width: 15}}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft: 4,
                      }}>
                      0
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginHorizontal: 7,
                    }}>
                    +
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/coinA.png')}
                      resizeMode="cover"
                      style={{height: 15, width: 15}}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft: 4,
                      }}>
                      0
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={{marginHorizontal: 15, marginTop: 20}}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '400'}}>
              Withdraw Method
            </Text>
            <LinearGradient
              colors={['#4568DC', '#B06AB3']}
              style={{marginTop: 10, borderRadius: 10}}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('WithdrawMethod')}
                onPress={() =>
                  navigation.navigate('Exchange', {
                    coinsUser: userUpdatedData?.coins,
                    coinsLimit: coinsLimit?.dollar,
                    coinsExhangeRate: coinsExchangeRate
                  })
                }
                style={{
                  justifyContent: 'center',
                  paddingVertical: 8,
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    Add a Payment Method
                  </Text>
                  <LeftArrow
                    name="keyboard-arrow-right"
                    size={20}
                    style={{color: 'white', alignSelf: 'center'}}
                  />
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}>

            {/* <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: '#c471ed',
                width: '60%',
                alignItems: 'center',
                paddingVertical: 10,
                borderRadius: 6,
              }}>
              <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                WITHDRAW NOW
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                width: '75%',
                alignItems: 'center',
                paddingVertical: 12,
                borderRadius: 10,
                marginTop: 20,
                borderColor: '#f64f59',
                borderWidth: 0.5,
              }}
              onPress={() => {
                navigation.navigate('Exchange', {
                  coinsUser: userUpdatedData?.coins,
                  coinsLimit: coinsLimit?.dollar
                });
              }}>
              <Text
                style={{fontSize: 13, color: '#f64f59', fontWeight: 'bold'}}>
                EXCHANGE POINTS FOR COINS
              </Text>
            </TouchableOpacity> */}
          </View>

          <View style={{marginHorizontal: 15, marginTop: 20}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              Withdraw Rules
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                borderBottomColor: '#3A4257',
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'orange',
                  borderBottomWidth: 0,
                  width: '55%',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderTopLeftRadius: 15,
                  borderRightColor: '#3A4257',
                  borderRightWidth: 1,
                }}>
                <Text style={{color: 'black'}}>Exchange ratio</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderBottomWidth: 0,
                  borderColor: 'orange',
                  width: '45%',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  borderTopRightRadius: 15,
                }}>
                <Image
                  source={require('../../assets/images/beanA.png')}
                  resizeMode="cover"
                  style={{height: 15, width: 15}}
                />
                <Text style={{color: 'black', fontSize: 12, marginLeft: 5}}>
                  {coinsData?.beans}
                </Text>
                <Text
                  style={{color: 'black', fontSize: 12, marginHorizontal: 5}}>
                  =
                </Text>
                <Text style={{color: 'black', fontSize: 12}}>{coinsData?.dollar}$</Text>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  width: '55%',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderBottomLeftRadius: 15,
                  borderWidth: 1,
                  borderColor: 'orange',
                }}>
                <Text style={{color: 'black'}}>
                  Minimum withdrawal amount
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: 'orange',
                  width: '45%',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  borderBottomRightRadius: 15,
                }}>
                <Image
                  source={require('../../assets/images/beanA.png')}
                  resizeMode="cover"
                  style={{height: 15, width: 15}}
                />
                <Text style={{color: 'black', fontSize: 12, marginLeft: 5}}>
                  {coinsLimit?.dollar}$
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 15, marginTop: 15}}>
            <Text style={{color: 'black', fontSize: 12}} m>
              Exchange rate  {coinsData?.beans} = {coinsData?.dollar}${'\n'}
              {'\n'}
              1$=250 (PAKISTAN) {'\n'} {'\n'}
              1$ = 73 INR (INDIA) {'\n'} {'\n'}
              BAN 1$ = 93 (BANGLADESH)
              {/* 1. Bcoins withdrawal rules: 30%Bcoins + 70%Beans = 100% withdrawal
              amount, Bcoins will be settled first prior to Beans. For example:
              30,000Bcoins + 70,000Beans = 10 USD. */}
              {'\n'}
              {'\n'}
              1. Coins cannot withdraw.
              {'\n'}
              {'\n'}
              2. Different payment method, service charge might be var y, Please
              select the appropriate payment method.
            </Text>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <LinearGradient
                colors={['#4568DC', '#B06AB3']}
                style={styles.modalView}>
                <TouchableOpacity
                  style={{position: 'absolute', right: 0, padding: 24}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Close
                    name="close"
                    size={20}
                    style={{color: 'white', alignSelf: 'center'}}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: 'orange',
                    bottom: 10,
                    borderWidth: 1,
                    padding: 8,
                    borderRadius: 10,
                    borderColor: 'orange',
                  }}>
                  Please Complete First
                </Text>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: 'orange',
                        width: 35,
                        height: 35,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../assets/images/GroupA.png')}
                        resizeMode="center"
                        style={{height: 22, width: 22}}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        width: '80%',
                        textAlign: 'center',
                        fontSize: 12,
                      }}>
                      Completed Authentication Process
                    </Text>
                    <RoundArrow
                      name="chevron-forward-circle-outline"
                      size={28}
                      style={{color: 'orange', alignSelf: 'center'}}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: 'orange',
                        width: 35,
                        height: 35,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../assets/images/payment.png')}
                        resizeMode="center"
                        style={{height: 22, width: 22}}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        width: '80%',
                        textAlign: 'center',
                      }}>
                      Add a Payment Method
                    </Text>
                    <RoundArrow
                      name="chevron-forward-circle-outline"
                      size={28}
                      style={{color: 'orange', alignSelf: 'center'}}
                    />
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </Modal>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default WithdrawMain;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'red',

    borderRadius: 20,
    // padding: 35,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
