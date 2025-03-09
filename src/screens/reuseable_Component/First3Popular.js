
// import AnimatedLottieView from 'lottie-react-native';
// import React from 'react';
// import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
// import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
// import { useSelector } from 'react-redux';

// const HostProfileBox = ({item, live}) => {

//     const userData = useSelector(state => state.auth.userData);

//   return (
//     <View>
//       <ImageBackground
//         style={{
//           height: heightPercentageToDP('22%'),
//           width: widthPercentageToDP('48%'),
//           marginHorizontal: 1,
//           marginTop: 5,
//         }}
//         source={
//           item.image == null
//             ? require('../assets/images/events.jpg')
//             : {uri: item?.image}
//         }
//         imageStyle={{borderRadius: 10}}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginHorizontal: '5%',
//             marginTop: 5,
//           }}>
//           {live == true ? (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 backgroundColor: 'rgba(50, 52, 52, 0.4)',
//                 width: 45,
//                 height: 17,
//                 borderRadius: 30,
//                 justifyContent: 'space-evenly',
//                 alignItems: 'center',
//               }}>
//               <AnimatedLottieView
//                 autoPlay
//                 style={{
//                   width: 14,
//                   height: 14,
//                 }}
//                 source={require('../assets/json/14467-music.json')}
//               />
//               <Text
//                 style={{
//                   marginHorizontal: 2,
//                   color: '#fff',
//                   fontSize: 10,
//                 }}>
//                 Live
//               </Text>
//             </View>
//           ) : null}
//           <View>
//         {item?.star_level_image &&
//           <Image
//             source={{uri: item?.star_level_image}}
//             style={{
//                 height: 15,
//                 width: 60,
//                }}
//             />
//         }
//           </View>
//         </View>

//         <TouchableOpacity
//           activeOpacity={1}
//           style={{
//             paddingVertical: 10,
//             flexDirection: 'row',
//             paddingHorizontal: 5,
//             position: 'absolute',
//             bottom: 5,
//             alignItems: 'center',
//           }}>
//           <Image
//             source={
//               item.image == null
//                 ? require('../assets/images/events.jpg')
//                 : {uri: item?.image}
//             }
//             style={{
//               height: 30,
//               width: 30,
//               borderRadius: 90,
//               borderWidth: 1,
//               borderColor: '#c471ed',
//             }}
//           />
//           <View style={{flexDirection: 'column', marginHorizontal: '5%'}}>
//             <Text
//               style={{
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 fontSize: 12,
//               }}>
//               {item?.nick_name ?? item?.full_name}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </ImageBackground>
//     </View>
//   );
// };

// export default HostProfileBox;

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const First3Popular = () => {
  return (
    <View>
      <Text>First3Popular</Text>
    </View>
  )
}

export default First3Popular

const styles = StyleSheet.create({})