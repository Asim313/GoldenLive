// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   ScrollView,
// } from 'react-native';

// import {useSelector} from 'react-redux';
// import {ApiCallToken} from '../../Services/Apis';

// import SecondaryHeader from '../reuseable_Component/SecondaryHeader';
// import RecordComponent from './RecordComponent';

// const RecordsMain = ({navigation}) => {
//   const userData = useSelector(state => state.auth.userData);
//   const [topUsersData, setTopUsersData] = useState([]);
//   const [topHostData, setTopHostData] = useState([]);
//   const [lstWeek, setLastWeek] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoadingTop, setIsLoadingTop] = useState(true);
//   const [topUsersAllData, setTopUserAllData] = useState([]);
//   const [TopTalentAllData, setTopTalentAllData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         await LastWeekApi();
//         await getTopUsersList();
//         await getTopHostsList();
//         setIsLoading(false);
//       } catch (error) {
//         console.log('Error:', error.toString());
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//     return () => {
//       console.log('Cleanup function');
//     };
//   }, []);

//   const LastWeekApi = async () => {
//     try {
//       const res = await ApiCallToken({
//         params: userData.token,
//         route: 'last-weekly-stars/top-gifts',
//         verb: 'POST',
//       });
//       setLastWeek(res?.data);
//     } catch (e) {
//       console.log('error updateUserData func, home screen ', e.toString());
//     }
//   };

//   const getTopUsersList = async () => {
//     try {
//       const res = await ApiCallToken({
//         params: userData.token,
//         route: 'list/top-up/user',
//         verb: 'GET',
//       });
//       // console.log("user11", res?.data)
//       setTopUsersData(res.data.AllRecords);
//       setTopUserAllData(res?.data);
//     } catch (error) {
//       console.log('Error Recordsmain screen gettopuser func ', error);
//     }
//   };

//   const getTopHostsList = async () => {
//     try {
//       const res = await ApiCallToken({
//         params: userData.token,
//         route: 'list/top-up/host',
//         verb: 'GET',
//       });
//       //  console.log("user12", res)
//       setTopHostData(res?.data?.AllRecords);
//       setTopTalentAllData(res?.data);
//       // console.log('neeeeeeeeeeeeeeeeeeeeeeeewwwwwwwwwwwwww', res);
//     } catch (error) {
//       console.log('Error Recordsmain screen getoptalent func ', error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={{flex: 1, backgroundColor: 'white'}}>
//         <SecondaryHeader name={'Records'} color={'black'} />
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <ActivityIndicator size="large" style={{}} />
//           <Text style={{color: '#fff', fontSize: 11, textAlign: 'center'}}>
//             Loading Data
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
//       <View resizeMode={'stretch'} style={{height: '100%', width: '100%'}}>
//         <SecondaryHeader name={'Records'} color={'black'} />
//         <RecordComponent
//           navigation={() =>
//             navigation.navigate('TopUsers', {id: 1, topUsers: topUsersAllData})
//           }
//           dataAll={topUsersAllData}
//           dataa={topUsersData}
//           bgImage={require('../../assets/images/profile/TopUserUpperBg.png')}
//         />
//         <RecordComponent
//           navigation={() =>
//             navigation.navigate('TopTalent', {
//               id: 1,
//               topTalent: TopTalentAllData,
//             })
//           }
//           dataAll={TopTalentAllData}
//           dataa={topHostData}
//           bgImage={require('../../assets/images/profile/TopTalent.png')}
//         />
//         <RecordComponent
//           navigation={() =>
//             navigation.navigate('WeeklyStar', {
//               id: 1,
//               weeklystar: lstWeek,
//             })
//           }
//           dataAll={lstWeek}
//           dataa={lstWeek}
//           bgImage={require('../../assets/images/profile/weeklyStar.png')}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default RecordsMain;

// const styles = StyleSheet.create({});

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from '../../utils/styles/global-styles';
import RecordsTopHeader from '../../components/recordsComponets/RecordsTopHeader';
import {textFont} from '../../utils/Styles';
import AllIcons, {IconList} from '../../components/AllIcons';
import {useNavigation} from '@react-navigation/native';
import RecordsToShow from '../../components/recordsComponets/RecordToShow';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  gameRecordApis,
  hostRecordApis,
  usersRecordApi,
} from '../../Services/ApisCall/RecordsApis';
import {useSelector} from 'react-redux';
import {
  formatNumerWithK,
  truncateAfterTenCharacters,
} from '../../Services/GlobalFuntions';
import {ScrollView} from 'react-native';
import LinearGradientComponent from '../../components/LinearGradientComponent';
import CatLoadingComponent from '../../components/loadings/CatLoadingComponent';
import AnimatedLottieView from 'lottie-react-native';

const RecordsMain = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.userData);
  const list = [
    {
      id: 1,
      title: 'Sending',
      headingTxtColor: '#FF84D9',
      unselectedDaysTxtColor: '#D38FFC',
      selectedDaysTxtColor: '#2A012B',
      selectedDaysBgColor: '#FB4EFF',
      selectedDaysMainBgColor: 'rgba(60, 0, 96, 0.7)',
      topCoinsBgColor: '#35024D',
      top1: require('../../assets/images/records/tophost/top1.png'),
      top2: require('../../assets/images/records/tophost/top2.png'),
      top3: require('../../assets/images/records/tophost/top3.png'),
      bgTop: require('../../assets/images/records/tophost/topImg.png'),
      flatlistBgColor: '#3E0462',
      gradientColor: ['#3E0462', '#C709E7']
    },
    {
      id: 2,
      title: 'Charitable',
      headingTxtColor: '#FADB6E',
      unselectedDaysTxtColor: '#DBBC50',
      selectedDaysTxtColor: '#541700',
      selectedDaysBgColor: '#FADB6E',
      topCoinsBgColor: '#FFA000',
      selectedDaysMainBgColor: 'rgba(60, 14, 1, 0.7)',
      top1: require('../../assets/images/records/topuser/top1.png'),
      top2: require('../../assets/images/records/topuser/top2.png'),
      top3: require('../../assets/images/records/topuser/top3.png'),
      bgTop: require('../../assets/images/records/topuser/topImg.png'),
      flatlistBgColor: '#261501',
      gradientColor: ['#261501', '#AC5300']

    },
    {
      id: 3,
      title: 'Game',
      headingTxtColor: '#F485B7',
      unselectedDaysTxtColor: '#FFB1D6',
      selectedDaysTxtColor: '#570229',
      selectedDaysBgColor: '#FF69AE',
      topCoinsBgColor: '#460122',
      selectedDaysMainBgColor: 'rgba(69, 0, 33, 0.7)',
      top1: require('../../assets/images/records/games/top1.png'),
      top2: require('../../assets/images/records/games/top2.png'),
      top3: require('../../assets/images/records/games/top3.png'),
      bgTop: require('../../assets/images/records/games/topImg.png'),
      flatlistBgColor: '#3D011D',
      gradientColor: ['#450021', '#FC036F']

    },
  ];
  const [recordsData, setRecordsData] = useState([]);
  const [filteredRecordsData, setFilteredRecordsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(list?.[0]);
  const [isLoading, setIsLoading] = useState(null)
  const [showGradientBar, setShowGradientBar] = useState(null)
  const nullGradient = ['rgba(60, 0, 96, 0)', 'rgba(69, 0, 33, 0)']
  useEffect(() => {
    handleApis(selectedCategory);
  }, [selectedCategory]);

  const handleApis = async data => {
    setIsLoading(true)
    let res = [];
    if (data?.title === 'Sending') {
      res = await usersRecordApi({token: userData?.token});
    } else if (data?.title === 'Charitable') {
      res = await hostRecordApis({token: userData?.token});
    } else if (data?.title === 'Game') {
      res = await gameRecordApis({token: userData?.token});
    }

    setRecordsData(res);
    setFilteredRecordsData(res?.data?.TodayRecords);
    setIsLoading(false)
    // console.log('res', res?.data?.TodayRecords)
  };
  const handleCategoryPress = item => {
    setSelectedCategory(item);
  };

  const hanldeFilterRecord = data => {
    console.log('data', data);
    if (data?.title === 'Today') {
      console.log('hreee');
      setFilteredRecordsData(recordsData?.data?.TodayRecords);
    } else if (data?.title === '7 Days') {
      setFilteredRecordsData(recordsData?.data?.weeklyRecords);
    } else if (data?.title === '30 Days') {
      setFilteredRecordsData(recordsData?.data?.MonthlyRecords);
    }
  };

  const RecordsFlatlistDataRender = ({item, index}) => {
    //  console.log("itemmmmmmmmmmmm", item, filteredRecordsData?.length)
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
          <Text style={{color: 'white'}}>{index + 4}</Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>

            {item?.status_live === 1 ? (
              <View style={styles.liveStatusStyle}>
                <AnimatedLottieView
                  loop={true}
                  autoPlay={true}
                  style={{
                    height: 12,
                    width: 12,
                  }}
                  source={require('../../assets/json/user_live_animation.json')}
                />
                <Text
                  style={{
                    fontSize: 9,
                    color: 'white',
                    left: 5,
                    fontWeight: '500',
                    width: 20,
                  }}>
                  Live
                </Text>
              </View>
            ) :
              <>
            {item?.online_status === 1  && (
              <View style={styles.onlineStatusStyle} />
            )}
            </>
          }
            <Image
              source={{uri: item?.image}}
              style={{
                height: 60,
                width: 60,
                borderRadius: 50,
                marginHorizontal: 15,
              }}
            />
          </View>
          <Text style={styles.topUsersNameStyle}>
            {truncateAfterTenCharacters(item?.name)}
          </Text>
        </View>
        <View style={{...styles.coinsMainStyle}}>
          <Image
            style={{height: 18, width: 18, right: 3}}
            source={require('../../assets/images/records/coin.png')}
          />
          <Text style={styles.coinsStyle}>
            {formatNumerWithK(item?.total_beans)}
          </Text>
        </View>
      </View>
    );
  };

  const handleScrollEvent = (event) => {
    if(event.nativeEvent.contentOffset.y === 0) {
      setShowGradientBar(false)
    } else if(event.nativeEvent.contentOffset.y > 0) {
      setShowGradientBar(true)
    }
  }

  return (
    <View style={[globalStyles.mainContainer, {backgroundColor: selectedCategory.flatlistBgColor}]}>
     {isLoading &&  
        <View style={{position: 'absolute' , zIndex: 2}}>
          <CatLoadingComponent txt={'Loading Records...'} />
        </View>
      }
      <LinearGradientComponent colors={showGradientBar ? selectedCategory?.gradientColor : nullGradient}
        style={{ 
        height: '12%',
        position: 'absolute',
        zIndex: 1,
        // backgroundColor: 'red',
        width: widthPercentageToDP(100),}}>
   
          <View style={{height: '50%'}}>
            <TouchableOpacity
              style={{left: 20, top: 22, width: '8%'}}
              onPress={() => navigation.goBack()}>
              <AllIcons
                name={IconList.Feather}
                iconName={'chevron-left'}
                size={20}
                color={'white'}
              />
            </TouchableOpacity>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              {list?.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{}}
                    onPress={() => handleCategoryPress(item)}>
                    <Text
                      style={{
                        color:
                          selectedCategory.title === item?.title
                            ? selectedCategory?.headingTxtColor
                            : 'white',
                        fontWeight:
                          selectedCategory?.id === item?.id ? 'bold' : 'normal',
                        fontSize: 14,
                      }}>
                      {item?.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{width: '80%', left: '10%', top: '5%'}}>
            <RecordsToShow
              selectedItem={selectedCategory}
              filterRecord={hanldeFilterRecord}
            />
          </View>
      </LinearGradientComponent>
      <ScrollView onScroll={handleScrollEvent}>
        <ImageBackground
          style={styles.topImageStyle}
          source={selectedCategory.bgTop}>
          <View
            style={{
              width: widthPercentageToDP(100),
              height: '70%',
              top: '30%',
            }}>
            <RecordsTopHeader
              selectedItem={selectedCategory}
              topUsersData={filteredRecordsData?.slice(0, 3)}
              top1={selectedCategory.top1}
              top2={selectedCategory.top2}
              top3={selectedCategory.top3}
            />
          </View>
        </ImageBackground>

        <View
          style={[
            globalStyles.mainContainer,
            {
              backgroundColor: selectedCategory.flatlistBgColor,
              borderWidth: filteredRecordsData?.[0] ? 1 : 0,
              borderTopColor: '#FF84E8',
            },
          ]}>
          {filteredRecordsData?.[0] ? (
            <FlatList
              data={filteredRecordsData?.slice(3)}
              contentContainerStyle={{paddingHorizontal: 20, paddingTop: 15}}
              renderItem={RecordsFlatlistDataRender}
              ItemSeparatorComponent={
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    marginVertical: 10,
                  }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
          ) : 
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP(20)}}>
              {!isLoading && <Text style={{color: 'white', fontSize: 11}}>No Record Found. List is Empty</Text>}
          </View>
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default RecordsMain;

const styles = StyleSheet.create({
  topImageStyle: {
    height: heightPercentageToDP(47),
    overflow: 'hidden',
  },
  topUsersNameStyle: {
    color: 'white',
    fontSize: 13,
  },
  coinsMainStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinsStyle: {
    fontSize: 11,
    color: 'white',
  },
  customGradient: {
    width: 300,
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveStatusStyle: {   
    borderRadius: 50,
    backgroundColor: '#BF07FF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 55,
    paddingVertical: 3,
    position: 'absolute',
    zIndex: 1,
    bottom: 0
  },
  onlineStatusStyle: {   
    borderRadius: 50,
    backgroundColor: '#00FF38',
    flexDirection: 'row',
    width: 13,
    height: 13,
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 20,
  }
});
