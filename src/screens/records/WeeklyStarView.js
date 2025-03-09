import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarModal from '../reuseable_Component/StarModal';
import LeftArrow from 'react-native-vector-icons/MaterialIcons';
import ProfileModalStyles from '../../screens/reuseable_Component/ProfileModalStyle';
import {useSelector} from 'react-redux';
import {ApiCallToken} from '../../Services/Apis';
import SecondaryHeader from '../reuseable_Component/SecondaryHeader';
import {
  formatNumerWithK,
  truncateAfterThreeCharacters,
} from '../../Services/GlobalFuntions';

const WeeklyStarView = ({navigation}) => {
  const [weekly, setWeekly] = useState(true);
  const [lastWeek, setLastWweek] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const [topHostData, setTopHostData] = useState([]);
  const [lstWeek, setLastWeek] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef2 = React.createRef();
  const modalRef = React.createRef();
  const modalRef3 = React.createRef();
  const modalRef4 = React.createRef();

  const weeklyBtn = () => {
    setWeekly(true);
    setLastWweek(false);
    // setDataShowType(topHostData);
  };

  const lastWweekBtn = () => {
    setWeekly(false);
    setLastWweek(true);
    // setDataShowType(lstWeek);
  };

  const renderView = ({item}) => {
    console.log('check data come from api --------', item);

    const id = item?.gift_id;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewersScreen', {id: id})}
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
              <TouchableOpacity>
                {item.image == null ? (
                  <Image
                    source={require('../../assets/images/events.jpg')}
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
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  {item.title}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Image
                  source={{uri: item?.hosts?.[0]?.image}}
                  style={{height: 30, width: 30, borderRadius: 30}}
                />
                <Image
                  source={{uri: item?.hosts?.[1]?.image}}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    right: 15,
                  }}
                />
                <Image
                  source={{uri: item?.hosts?.[2]?.image}}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    right: 30,
                  }}
                />
              </View>
              <AntDesign
                name={'right'}
                color={'black'}
                size={20}
                style={{right: 25, marginTop: 22}}
              />
            </View>
          </View>
          <StarModal
            view={<ProfileModalStyles data={item} />}
            ref={modalRef4}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const UpdateUserData2 = async () => {
    setIsLoading(true);
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'weekly-stars/top-gifts',
        verb: 'POST',
      });

      //  console.log('weekly star api data ', res?.data)

      setTopHostData(res.data);
    } catch (e) {
      console.log('error updateUserData func, home screen ', e.toString());
    }
    setIsLoading(false);
  };

  const LastWeekApi = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'last-weekly-stars/top-gifts',
        verb: 'POST',
      });
      setLastWeek(res.data);
    } catch (e) {
      console.log('error updateUserData func, home screen ', e.toString());
    }
  };

  useEffect(() => {
    UpdateUserData2();
    LastWeekApi();
  }, []);

  // console.log('-----------=-----------=',topHostData)

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/profile/backgrud.png')}
        style={{flex: 1}}>
        <SecondaryHeader name={'Weekly Star'} color={'black'} />
        <View>
          <View
            style={{
              backgroundColor: 'rgba(3, 9, 71, 0.5)',
              flexDirection: 'row',
              alignSelf: 'center',
              borderRadius: 20,
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => weeklyBtn()}
              style={{
                backgroundColor: weekly ? '#BAA8FF' : null,
                borderRadius: 20,
                paddingVertical: 5,
                width: '18%',
                alignSelf: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: weekly ? '#241F1F' : '#FFFFFF',
                    textAlign: 'center',
                    fontWeight: 'normal',
                    fontSize: 12,
                  }}>
                  Weekly
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => lastWweekBtn()}
              style={{
                backgroundColor: lastWeek ? '#BAA8FF' : null,
                borderRadius: 20,
                paddingVertical: 5,
                width: '18%',
                alignSelf: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: lastWeek ? '#241F1F' : '#FFFFFF',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  Last Week
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{...styles.alignItemsrow}}>
            {/* 3rd....................... */}
            <TouchableOpacity>
              <View style={{...styles.position1bg}}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '55%',
                    // backgroundColor:"red",
                    marginLeft: 5,
                  }}>
                  {topHostData?.[2]?.image == null ? (
                    <Image
                      source={require('../../assets/images/events.jpg')}
                      resizeMode="contain"
                      style={styles.userimg}
                    />
                  ) : (
                    <Image
                      source={{uri: topHostData?.[1]?.image}}
                      resizeMode="contain"
                      style={{height: 55, width: 55, borderRadius: 100}}
                    />
                  )}
                  {/* </ImageBackground> */}
                  <View style={{...styles.userdetails}}>
                    <Text style={{...styles.username}}>
                      {/* {truncateAfterThreeCharacters(
                        topHostData?.[1]?.nick_name,
                      ) ??
                        truncateAfterThreeCharacters(
                          topHostData?.[1]?.full_name,
                        )} */}
                      {topHostData?.[1]?.title}
                    </Text>
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#E78A00',
                        justifyContent: 'space-between',
                        width: 37,
                        paddingHorizontal: '4%',
                        borderRadius: 20,
                        left: '4%',
                        // marginVertical:"15%"
                        marginTop: '10%',
                        marginBottom: '10%',
                      }}>
                      <Image
                        source={require('../../assets/images/profile/starLevel.png')}
                        style={{width: 16, height: 16}}
                      />
                      <Text style={{...styles.userid}}>
                        {topHostData?.[1]?.sender_level}
                      </Text>
                    </View>

                    <View
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
                        marginTop: '10%',
                        marginBottom: '10%',
                      }}>
                      <Image
                        source={require('../../assets/images/profile/diamond.png')}
                        style={{height: 10, width: 10}}
                      />
                      <Text style={styles.beansFont}>
                        {formatNumerWithK(topHostData?.[1]?.total_beans)}
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {/* 1st......................... */}
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '15%',
                }}>
                <View style={{}}>
                  {topHostData?.[0]?.image !== null &&
                    <Image
                      source={{uri: topHostData?.[0]?.image}}
                      resizeMode="contain"
                      style={[styles.userimg, {left: 10}]}
                    />
                  }
                  {/* </ImageBackground> */}
                  <View style={{...styles.userdetails, top: '10%'}}>
                    <Text style={{...styles.username, alignSelf: 'center'}}>
                      {/* {truncateAfterThreeCharacters(
                        topHostData?.[0]?.nick_name,
                      ) ??
                        truncateAfterThreeCharacters(
                          topHostData?.[0]?.full_name,
                        )} */}
                      {topHostData?.[0]?.title}
                    </Text>
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#E78A00',
                        justifyContent: 'space-between',
                        width: 37,
                        paddingHorizontal: '4%',
                        borderRadius: 20,
                        left: '13%',
                        // marginVertical:"15%"
                        marginTop: '10%',
                        
                      }}>
                      <Image
                        source={require('../../assets/images/profile/starLevel.png')}
                        style={{width: 16, height: 16}}
                      />
                      <Text style={{...styles.userid}}>
                        {topHostData?.[0]?.sender_level}
                      </Text>
                    </View> */}

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
                        source={require('../../assets/images/profile/diamond.png')}
                        style={{height: 10, width: 10}}
                      />
                      <Text style={styles.beansFont}>
                        {formatNumerWithK(topHostData?.[0]?.total_beans)}
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* 2nd.......................... */}
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '55%',
                  // backgroundColor: 'red',
                  marginLeft: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '15%',
                    marginLeft: 14,
                  }}>
                  {topHostData?.[2]?.image !== null && 
                    <Image
                      source={{uri: topHostData?.[2]?.image}}
                      resizeMode="contain"
                      style={{height: 55, width: 55, borderRadius: 100}}
                    />
                  }
                  {/* </ImageBackground> */}
                  <View style={{...styles.userdetails}}>
                    <Text style={[styles.username, {marginLeft: 10}]}>
                      {topHostData?.[2]?.title}
                    </Text>
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#E78A00',
                        justifyContent: 'space-between',
                        width: 37,
                        paddingHorizontal: '4%',
                        borderRadius: 20,
                        left: '13%',
                        // marginVertical:"15%"
                        marginTop: '23%',
                        marginBottom: '10%',
                      }}>
                      <Image
                        source={require('../../assets/images/profile/starLevel.png')}
                        style={{width: 16, height: 16}}
                      />
                      <Text style={{...styles.userid}}>
                        {topHostData?.[2]?.sender_level}
                      </Text>
                    </View>

                    <View
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
                        source={require('../../assets/images/profile/diamond.png')}
                        style={{height: 10, width: 10}}
                      />
                      <Text style={styles.beansFont}>
                        {formatNumerWithK(topHostData?.[2]?.total_beans)}
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={{flex: 1}}>
        {isLoading ? (
          <View style={{}}>
            <ActivityIndicator size="large" />
          </View>
        ) : weekly ? (
          <FlatList data={topHostData} renderItem={renderView} />
        ) : isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList data={lstWeek} renderItem={renderView} />
        )}
      </View>
    </View>
  );
};

export default WeeklyStarView;

const styles = StyleSheet.create({
  rankimg: {
    height: 160,
    width: '99%',
    marginTop: '10%',
  },
  alignItemsrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
    marginTop: '10%',
  },
  FLBackground: {
    // ackgroundGradient: "vertical",
    height: 30,
    width: 60,
    marginTop: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    bottom: 10,
  },
  position2bg: {
    height: 180,
    width: 100,
    borderRadius: 10,
    bottom: 14,
  },
  plusimg: {
    height: 10,
    width: 10,
    alignSelf: 'center',
    top: 1,
  },
  addbutton: {
    backgroundColor: '#fff',
    height: 12,
    width: 55,
    borderRadius: 10,
    marginTop: 4,
  },
  userid: {
    color: '#fff',
    fontSize: 12,
    alignSelf: 'center',
    bottom: 1,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
  },
  username: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    // bottom: 5,
    marginTop: 15,
    fontFamily: 'Poppins-Bold',
  },
  beansFont: {
    color: '#fff',
    fontSize: 13,
    // left: 5,
    fontFamily: 'Poppins-Bold',
  },
  userdetails: {
    marginTop: 0,
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
    top: 14,
    left: 2,
  },
  crown: {
    height: 70,
    width: 70,
    alignSelf: 'flex-end',
  },
  position1bg: {
    height: 170,
    width: 90,
    borderRadius: 10,
    marginTop: 20,
  },
  alignItemsrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
    marginTop: '10%',
  },
});
