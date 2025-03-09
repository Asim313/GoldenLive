import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { View, Text, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { heightPercentageToDP } from "react-native-responsive-screen";
import BackIcon from 'react-native-vector-icons/AntDesign';
import CrossIcon from 'react-native-vector-icons/Entypo';
import { ApiCallToken } from "../../Services/Apis";
import HourlyBoardlist from "./HourlyBoardlist";
const FansRanking = ({ liveID, userData, onPressCross }) => {
  const [selectButton, setselectButton] = useState(0);
  const [bg, setbg] = useState('grey');
  const [dailyGifts, setDailyGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(null)
  useEffect(() => {
    HostGiftReceive();
    GetTotalBeanSum();
  }, [])

  const HostGiftReceive = async () => {
    setIsLoading(true)
    const paramsBody = {
      id: liveID,
    };
    try {
      // console.log('HOST ID==>', liveID);
      const res = await ApiCallToken({
        params: userData.token,
        paramsBody: paramsBody,
        route: 'user/list-send-gift',
        verb: 'POST',
      });

      console.log(res)
      setDailyGifts(res);
      setIsLoading(false)
    } catch (error) {
      console.log('ERROR IS ====>>>', error);
    }
  };

  const SelectCategory = param => {
    switch (param) {
      case 0:
        return ButtonOne();
      case 1:
        return ButtonTwo();
      case 2:
        return ButtonThree();
      default: {
        break;
      }
    }
  };

  const Buttons = [
    { id: 1, BtnTxt: 'Daily' },
    { id: 2, BtnTxt: 'Weekly' },
    { id: 3, BtnTxt: 'Monthly' },
  ];

  const GetTotalBeanSum = () => {
    let temp = [];
    {
      dailyGifts?.[0] && dailyGifts?.filter(item => {
        temp.push(item.beans);
        // console.warn('host id', liveID);
      });
    }
    return temp == null ? '0' : temp.reduce((a, b) => a + b, 0);
  };

  const RankStyle = props => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* <Text style={{color: 'white', paddingHorizontal: 2}}>
              {props.index + 1}
            </Text> */}
        {props?.item?.image ? (
          <Image
            source={{ uri: props.item.image }}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        ) : (
          <Image
            source={require('../../assets/images/events.jpg')}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        )}
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: 'white' }}>{props?.item?.name}</Text>
          {/* <Text
                style={{
                  color: 'white',
                  backgroundColor: 'red',
                  width: widthPercentageToDP(9),
                  textAlign: 'center',
                  borderRadius: 15,
                  textAlignVertical: 'center',
                  height: heightPercentageToDP(2),
                  fontSize: 10,
                }}>
                {props.item.Lv}
              </Text> */}
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ color: 'red' }}>{props?.item?.beans}</Text>
      </View>
    </View>
  );

  const ButtonOne = () => {

    return (
      <View style={{ height: heightPercentageToDP(73) }}>
        <FlatList data={dailyGifts?.daily} renderItem={RankStyle} keyExtractor={(item, index) => index} />
      </View>
    )
  };
  const ButtonTwo = () => {

    return (
      <View style={{ height: heightPercentageToDP(73) }}>
        <FlatList data={dailyGifts?.weekly} renderItem={RankStyle} keyExtractor={(item, index) => index} />
      </View>
    )
  };

  const ButtonThree = () => {

    return (
      <View style={{ height: heightPercentageToDP(73) }}>
        <FlatList data={dailyGifts?.monthly} renderItem={RankStyle} keyExtractor={(item, index) => index} />
      </View>
    )
  };


  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 15,
        height: heightPercentageToDP(100),
      }}>
      {isLoading ?
        <View style={{ height: heightPercentageToDP(90), alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
        :
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <BackIcon name="left" size={22} color={'white'} />
              <Text style={{ color: 'white', fontSize: 22, paddingHorizontal: 5 }}>
                Fans Ranking
              </Text>
            </View>
            <TouchableOpacity onPress={onPressCross}>
              <CrossIcon
                name="cross"
                size={22}
                color={'white'}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            {Buttons.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setselectButton(index);
                  setbg('white');
                }}>
                <Text
                  style={[
                    { color: 'grey' },
                    selectButton == index && {
                      color: 'red',
                      borderBottomWidth: 1,
                      borderColor: 'red',
                    },
                  ]}>
                  {item.BtnTxt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Text
              style={{
                color: 'grey',
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: 17,
                fontWeight: '500',
              }}>
              Total {selectButton === 0 ? dailyGifts?.daily_total : selectButton === 1 ? dailyGifts?.weekly_total : dailyGifts?.monthly_total}
            </Text>
          </View>
          <View>{SelectCategory(selectButton)}</View>
        </>
      }
    </View>
  )
}

export default FansRanking;

// import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { TouchableOpacity } from 'react-native';
// import { FlatList } from 'react-native';
// import { View, Text, Image } from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import BackIcon from 'react-native-vector-icons/AntDesign';
// import CrossIcon from 'react-native-vector-icons/Entypo';
// import { ApiCallToken } from '../../Services/Apis';
// import LinearGradient from 'react-native-linear-gradient';
// import HourlyBoardlist from './HourlyBoardlist';

// const FansRanking = ({ liveID, userData, onPressCross }) => {
//   const [selectButton, setselectButton] = useState(0);
//   const [bg, setbg] = useState('grey');
//   const [dailyGifts, setDailyGifts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [total, setTotal] = useState(null);
//   useEffect(() => {
//     HostGiftReceive();
//     GetTotalBeanSum();
//   }, []);

//   const HostGiftReceive = async () => {
//     setIsLoading(true);
//     const paramsBody = {
//       id: liveID,
//     };
//     try {
//       // console.log('HOST ID==>', liveID);
//       const res = await ApiCallToken({
//         params: userData.token,
//         paramsBody: paramsBody,
//         route: 'user/list-send-gift',
//         verb: 'POST',
//       });

//       console.log("detaaaaaaaaaaaaaaa", res);
//       setDailyGifts(res);
//       setIsLoading(false);
//     } catch (error) {
//       console.log('ERROR IS ====>>>', error);
//     }
//   };

//   const SelectCategory = param => {
//     switch (param) {
//       case 0:
//         return ButtonOne();
//       case 1:
//         return ButtonTwo();
//       case 2:
//         return ButtonThree();
//       default: {
//         break;
//       }
//     }
//   };

//   const Buttons = [
//     { id: 1, BtnTxt: 'Daily' },
//     { id: 2, BtnTxt: 'Weekly' },
//     { id: 3, BtnTxt: 'Monthly' },
//   ];

//   const GetTotalBeanSum = () => {
//     let temp = [];
//     {
//       dailyGifts?.[0] &&
//         dailyGifts?.filter(item => {
//           temp.push(item.beans);
//           // console.warn('host id', liveID);
//         });
//     }
//     return temp == null ? '0' : temp.reduce((a, b) => a + b, 0);
//   };

//   const RankStyle = props => (
//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: 20,
//         paddingVertical: 10,
//       }}>
//       <Text>anuuuuuuuuuuuuuuuuuuuuuuuuuuuuu</Text>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}>
//         {/* <Text style={{color: 'white', paddingHorizontal: 2}}>
//               {props.index + 1}
//             </Text> */}
//         {props?.item?.image ? (
//           <Image
//             source={{ uri: props.item.image }}
//             style={{ height: 50, width: 50, borderRadius: 25 }}
//           />
//         ) : (
//           <Image
//             source={require('../../assets/images/img3.png')}
//             style={{ height: 50, width: 50, borderRadius: 25 }}
//           />
//         )}
//         <View style={{ marginLeft: 10 }}>
//           <Text style={{ color: 'white' }}>{props?.item?.name}</Text>
//         </View>
//       </View>
//       <View style={{ justifyContent: 'center' }}>
//         <Text style={{ color: 'red' }}>{props?.item?.beans}</Text>
//       </View>
//     </View>
//   );

//   const ButtonOne = () => {
//     return (
//       <View style={{ height: heightPercentageToDP(73) }}>
//         <FlatList
//           data={dailyGifts?.daily}
//           renderItem={RankStyle}
//           keyExtractor={(item, index) => index}
//         />
//       </View>
//     );
//   };
//   const ButtonTwo = () => {
//     return (
//       <View style={{ height: heightPercentageToDP(73) }}>
//         <FlatList
//           data={dailyGifts?.weekly}
//           renderItem={RankStyle}
//           keyExtractor={(item, index) => index}
//         />
//       </View>
//     );
//   };

//   const ButtonThree = () => {
//     return (
//       <View style={{ height: heightPercentageToDP(73) }}>
//         <FlatList
//           data={dailyGifts?.monthly}
//           renderItem={RankStyle}
//           keyExtractor={(item, index) => index}
//         />
//       </View>
//     );
//   };

//   return (
//     <View
//       style={{
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         height: heightPercentageToDP(100),
//       }}>
//       {isLoading ? (
//         <View
//           style={{
//             height: heightPercentageToDP(90),
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <ActivityIndicator />
//         </View>
//       ) : (
//         <>
//           <LinearGradient
//             colors={['#FFA500', '#FFB940', '#FFB940']}
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               height: '8%',
//               width: '100%',
//             }}>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 width: '90%',
//                 left: '20%',
//                 paddingHorizontal: 5,
//                 justifyContent: 'center',
//               }}>
//               <Text
//                 style={{
//                   color: '#6C4703',
//                   fontSize: 22,

//                   fontWeight: 'bold',

//                 }}>
//                 Hourly Board
//               </Text>
//               <Text
//                 style={{
//                   color: '#6C4703',
//                   fontSize: 14,

//                 }}>
//                 Count Down :
//               </Text>
//             </View>

//             <TouchableOpacity onPress={onPressCross}>
//               <CrossIcon
//                 name="cross"
//                 size={30}
//                 color={'#6C4703'}
//                 style={{ marginRight: 5 }}
//               />
//             </TouchableOpacity>
//           </LinearGradient>
//           <View style={{ backgroundColor: "white", flex: 1 }}>
//             <HourlyBoardlist />
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// export default FansRanking;
