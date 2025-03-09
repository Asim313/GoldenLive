import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {heightPercentageToDP} from 'react-native-responsive-screen';

import {
  formatNumerWithK,
  truncateAfterTenCharacters,
  truncateAfterThreeCharacters,
} from '../Services/GlobalFuntions';
import StarModal from '../screens/reuseable_Component/StarModal';
import SecondaryHeader from '../screens/reuseable_Component/SecondaryHeader';
import ProfileModalStyles from '../screens/reuseable_Component/ProfileModalStyle';
import {ApiCallToken} from '../Services/Apis';
import TextSlideAnimation2 from './Animation/TextSlideAnimationCopy';
import Header from '../screens/reuseable_Component/Header';

const LuckyGiftRecord = ({route}) => {
  // const {topUserAllData} = route?.params;
  //   const {topUsers} = route?.params;
  const [topUsers, setTopUsersData] = useState([]);

  const [sevenDays, setSevenDays] = useState(false);
  const [thirtyDays, setThirtyDaily] = useState(false);
  const [total, setTotal] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const modalRef2 = React.createRef();
  const modalRef = React.createRef();
  const modalRef3 = React.createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [dataShowType, setDataShowType] = useState([]);

  const sevenBtn = () => {
    setSevenDays(true);
    setThirtyDaily(false);
    setDataShowType(topUsers?.weeklyRecords);
    setTotal(false);
  };

  const thirtyBtn = () => {
    setSevenDays(false);
    setThirtyDaily(true);
    setDataShowType(topUsers?.MonthlyRecords);
    setTotal(false);
  };

  const totalBtn = () => {
    setSevenDays(false);
    setThirtyDaily(false);
    setDataShowType(topUsers?.AllRecords);
    setTotal(true);
  };

  useEffect(() => {
    getTopUsersList();
    sevenBtn();
  }, []);

  const getTopUsersList = async () => {
    setIsLoading(true);
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list/host/user/lucky/record',
        verb: 'GET',
      });
      console.log('TopUseeeeeeeeerrrrrrrrrrrrrrrrScreen', res.data.UserRecords);
      setTopUsersData(res?.data?.UserRecords);
      setDataShowType(res?.data?.UserRecords?.weeklyRecords);
      // setDataShowType(topUsers?.weeklyRecords);
    } catch (error) {
      console.log('ERROR IS ====>>>', error);
    }
    setIsLoading(false);
  };

  console.log('kkkkkkkkkkkk', dataShowType?.[0]);
  const renderView = ({item}) => {
    console.log('item', item);
    const modalRef4 = React.createRef();
    return (
      <View
        style={{width: '100%', marginVertical: '2%', marginHorizontal: '3%'}}>
        <View
          style={{
            height: 70,
            width: '95%',
            alignSelf: 'center',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //   marginHorizontal: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '75%',
              }}>
              <TouchableOpacity 
              // onPress={() => modalRef4.current.toggleModal()}
              >
                {item.image == null ? (
                  <Image
                    source={require('../assets/images/events.jpg')}
                    style={{
                      height: 70,
                      width: 70,
                      marginRight: '2%',
                      borderTopLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      borderWidth: 2,
                      // borderColor: 'red',
                    }}
                  />
                ) : (
                  <Image
                    source={{uri: item?.image}}
                    style={{
                      height: 70,
                      marginRight: '5%',
                      width: 70,
                      // borderTopLeftRadius: 20,
                      // borderBottomRightRadius: 20,
                      borderRadius: 50,
                      borderWidth: 2,
                      // borderColor: 'red',
                    }}
                  />
                )}
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'column',
                  marginHorizontal: 5,
                  //   marginTop: 8,
                  marginBottom: '6%',
                }}>
                <View
                  style={{
                    marginHorizontal: 5,
                    width: 120,
                    overflow: 'hidden',
                  }}>
                  <TextSlideAnimation2
                    name={item?.nick_name ?? item?.full_name}
                    fontSize={heightPercentageToDP(1.5)}
                    fontWeight={'bold'}
                    color={'black'}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#E78A00',
                    justifyContent: 'space-between',
                    width: 32,
                    paddingHorizontal: 4,
                    borderRadius: 20,
                    // left: '4%',
                    // marginVertical:"15%"
                    marginTop: '10%',
                    marginBottom: '10%',
                  }}>
                  <Image
                    source={require('../assets/images/profile/starLevel.png')}
                    style={{width: 16, height: 16}}
                  />
                  <Text style={{...styles.userid}}>{item?.sender_level}</Text>
                </View>
              </View>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#E78A00',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                  borderRadius: 20,
                  right: 20,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/images/profile/diamond.png')}
                  style={{height: 10, width: 10}}
                />
                <Text style={styles.beansFont}>
                  {formatNumerWithK(item?.total_beans)}
                </Text>
              </View>
            </View>
          </View>
          <StarModal
            view={
              <ProfileModalStyles
                data={item}
                onPressCros={() => modalRef4?.current?.toggleModal()}
              />
            }
            ref={modalRef4}
          />
        </View>
      </View>
    );
  };

  const [selectedItem, isSelectedItem] = useState('Daily');
  const [cases, setCases] = useState('Daily');
  const CasesFunction = props => {
    if (cases === 'Daily') {
      console.log('Hello');
    } else if (cases === '7 Days') {
      console.log('Hello2');
    } else if (cases === '30 Days') {
      console.log('Hello3');
    } else if (cases === 'Total') {
      console.log('Hello4');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{backgroundColor: '#9C0000', height: 410, width: '100%'}}>
        <ImageBackground
          source={require('../assets/images/LuckyGiftRecordBg.png')}
          style={{flex: 1}}>
            
            <Header name={'Lucky Gift Record'} />
          <View style={styles.topBottons}>
            <TouchableOpacity
              onPress={() => {
                sevenBtn();
              }}
              style={{
                backgroundColor: sevenDays ? '#FF6CFE' : null,
                ...styles.daysButton,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 9,
                    color: sevenDays ? '#42005C' : '#FFFFFF',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  7 Days
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                thirtyBtn();
              }}
              style={{
                backgroundColor: thirtyDays ? '#FF6CFE' : null,
                ...styles.daysButton,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 9,
                    color: thirtyDays ? '#42005C' : '#FFFFFF',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  30 Days
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                totalBtn();
              }}
              style={{
                backgroundColor: total ? '#FF6CFE' : null,
                ...styles.daysButton,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 9,
                    color: total ? '#42005C' : '#FFFFFF',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Total
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{...styles.alignItemsrow}}>
            {/* 3rd....................... */}
            <TouchableOpacity
            //  onPress={() => modalRef2.current.toggleModal()}
             >
              <View style={{...styles.position1bg}}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 53,
                    justifyContent: 'center',
                    alignItems: 'center',

                    // backgroundColor: 'red',
                    right: 20,
                  }}>
                  {dataShowType?.[2]?.image == null ? (
                    <Image
                      source={require('../assets/images/events.jpg')}
                      resizeMode="contain"
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 100,
                        top: 5,
                        // left: 15,
                        marginTop: 12,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: dataShowType?.[1]?.image}}
                      resizeMode="contain"
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 100,
                        top: 5,
                      }}
                    />
                  )}
                  <View
                    style={{
                      marginTop: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{...styles.username}}>
                      {truncateAfterTenCharacters(
                        dataShowType?.[1]?.nick_name,
                      ) ??
                        truncateAfterTenCharacters(
                          dataShowType?.[1]?.full_name,
                        )}
                    </Text>

                    <View style={styles.dataShowType}>
                      <Image
                        source={require('../assets/images/profile/starLevel.png')}
                        style={{width: 16, height: 16}}
                      />
                      <Text style={{...styles.userid}}>
                        {dataShowType?.[1]?.sender_level}
                      </Text>
                    </View>
                    {/* 
                    <View style={styles.totalBeans}>
                      <Image
                        source={require('../assets/images/profile/diamond.png')}
                        style={{height: 10, width: 10}}
                      />
                      <Text style={styles.beansFont}>
                        {formatNumerWithK(dataShowType?.[1]?.total_beans)}
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* 1st......................... */}
            <TouchableOpacity 
            // onPress={() => modalRef.current.toggleModal()}
            >
              <View
                style={{
                  flexDirection: 'column',
                  //   marginTop: '15%',
                  // backgroundColor:'red',
                  right: 15,
                }}>
                <View style={{}}>
                  {dataShowType?.[0]?.image == null ? (
                    <Image
                      source={require('../assets/images/events.jpg')}
                      resizeMode="contain"
                      style={[styles.userimg, {right: 50}]}
                    />
                  ) : (
                    <Image
                      source={{uri: dataShowType?.[0]?.image}}
                      resizeMode="contain"
                      style={[styles.userimg, {right: 90}]}
                    />
                  )}
                  {/* </ImageBackground> */}
                  <View style={{...styles.userdetails}}>
                    <Text style={{...styles.username, alignSelf: 'center'}}>
                      {truncateAfterThreeCharacters(
                        dataShowType?.[0]?.nick_name,
                      ) ??
                        truncateAfterThreeCharacters(
                          dataShowType?.[0]?.full_name,
                        )}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#E78A00',
                        justifyContent: 'space-between',
                        width: 37,
                        paddingHorizontal: '4%',
                        borderRadius: 20,
                        left: '2%',
                        // marginVertical:"15%"
                        marginTop: '9%',
                        marginBottom: '10%',
                      }}>
                      <Image
                        source={require('../assets/images/profile/starLevel.png')}
                        style={{width: 16, height: 16}}
                      />
                      <Text style={[styles.userid, {backgroundColor: 'red'}]}>
                        {dataShowType?.[0]?.sender_level}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* 2nd.......................... */}
            <TouchableOpacity 
            // onPress={() => modalRef3.current.toggleModal()}
            >
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '67%',
                  left: '8%',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '12%',
                    right: 20,

                    // marginLeft: 20,

                    left: 10,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {dataShowType?.[2]?.image == null ? (
                      <Image
                        source={require('../assets/images/events.jpg')}
                        resizeMode="contain"
                        style={{
                          height: 55,
                          width: 55,
                          borderRadius: 100,
                          //   top: 19,
                          // left: ,
                          //   right: 4,
                        }}
                      />
                    ) : (
                      <Image
                        source={{uri: dataShowType?.[2]?.image}}
                        resizeMode="contain"
                        style={{
                          height: 55,
                          width: 55,
                          borderRadius: 100,
                          //   top: 12,
                          // left: 1,
                        }}
                      />
                    )}
                  </View>
                  {/* </ImageBackground> */}
                  <View
                    style={{
                      left: '5%',
                      //   marginTop: 49,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 11,
                        // bottom: 5,
                        marginTop: 29,

                        fontFamily: 'Poppins-Bold',
                      }}>
                      {truncateAfterThreeCharacters(
                        dataShowType?.[2]?.nick_name,
                      ) ??
                        truncateAfterThreeCharacters(
                          dataShowType?.[2]?.full_name,
                        )}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#E78A00',
                        justifyContent: 'space-between',
                        width: 37,
                        paddingHorizontal: '4%',
                        borderRadius: 20,
                        left: '2%',
                        // marginVertical:"15%"
                        marginTop: '5%',
                        marginBottom: '10%',
                      }}>
                      <Image
                        source={require('../assets/images/profile/starLevel.png')}
                        style={{width: 16, height: 16}}
                      />
                      <Text style={{...styles.userid}}>
                        {dataShowType?.[2]?.sender_level}
                      </Text>
                    </View>

                    {/* <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#E78A00',
                        justifyContent: 'space-between',
                        width: 70,
                        paddingHorizontal: '10%',
                        borderRadius: 20,
                        // left: '4%',
                        // marginVertical:"15%"
                        alignItems: 'center',
                        marginTop: '23%',
                        marginBottom: '10%',
                      }}>
                      <Image
                        source={require('../assets/images/profile/diamond.png')}
                        style={{height: 10, width: 10}}
                      />
                      <Text style={styles.beansFont}>
                        {formatNumerWithK(dataShowType?.[2]?.total_beans)}
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        dataShowType && (
          <View style={{flex: 1, marginTop: 25}}>
            <FlatList data={dataShowType.slice(3)} renderItem={renderView} />
          </View>
        )
      )}
      <StarModal
        view={
          <ProfileModalStyles
            data={dataShowType?.[0]}
            onPressCros={() => modalRef?.current?.toggleModal()}
          />
        }
        ref={modalRef}
      />
      <StarModal
        view={
          <ProfileModalStyles
            data={dataShowType?.[1]}
            onPressCros={() => modalRef2?.current?.toggleModal()}
          />
        }
        ref={modalRef2}
      />
      <StarModal
        view={
          <ProfileModalStyles
            data={dataShowType?.[2]}
            onPressCros={() => modalRef3?.current?.toggleModal()}
          />
        }
        ref={modalRef3}
      />
    </View>
  );
};

export default LuckyGiftRecord;

const styles = StyleSheet.create({
  topBottons: {
    backgroundColor: 'rgba(66, 0, 92, 0.5)',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: '5%',
  },
  daysButton: {
    borderRadius: 20,
    paddingVertical: 8,
    width: '20%',
    alignSelf: 'center',
  },
  dataShowType: {
    flexDirection: 'row',
    backgroundColor: '#E78A00',
    justifyContent: 'space-between',
    width: 37,
    paddingHorizontal: '4%',
    borderRadius: 20,
    left: '4%',
    marginTop: '10%',
    marginBottom: '10%',
  },
  totalBeans: {
    flexDirection: 'row',
    backgroundColor: '#E78A00',
    justifyContent: 'space-between',
    width: 70,
    paddingHorizontal: '10%',
    borderRadius: 20,
    // left: '4%',
    // marginVertical:"15%"
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%',
  },
  username: {
    color: '#fff',
    fontSize: 11,
    // bottom: 5,
    marginTop: 15,
    fontFamily: 'Poppins-Bold',
  },
  beansFont: {
    color: '#fff',
    fontSize: 11,
    // left: 5,
    fontFamily: 'Poppins-Bold',
  },
  userdetails: {
    // top:10m
    marginTop: 49,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  crown: {
    height: 70,
    width: 70,
    alignSelf: 'flex-end',
  },
  userid: {
    color: '#fff',
    fontSize: 12,
    alignSelf: 'center',
    bottom: 1,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    // right:
  },
  userimg: {
    height: 72,
    width: 72,
    // backgroundColor:"red",
    borderRadius: 100,
    top: 10,
    left: 1,
  },
  crown: {
    height: 70,
    width: 70,
    alignSelf: 'flex-end',
  },
  position1bg: {
    // height: 170,
    // width: 90,
    // borderRadius: 10,
    // right: 20,
    // marginTop: 20,
    // backgroundColor: 'green',
  },
  alignItemsrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
    marginTop: '10%',
  },
});
