// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ImageBackground,
// } from 'react-native';
// import React from 'react';
// import BackIcon from 'react-native-vector-icons/AntDesign';
// import ForwardIcon from 'react-native-vector-icons/AntDesign';
// import FbIcon from 'react-native-vector-icons/Fontisto';
// // import GoogleIcon from 'react-native-vector-icons/AntDesign';
// // import TwitterIcon from 'react-native-vector-icons/AntDesign';
// import AppleIcon from 'react-native-vector-icons/AntDesign';
// // import VkIcon from 'react-native-vector-icons/Entypo';
// import LinearGradient from 'react-native-linear-gradient';
// import MobileIcon from 'react-native-vector-icons/AntDesign';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import {FlatList} from 'react-native';
// import {ScrollView} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// const Security = () => {
//   const navigation = useNavigation();
//   const Data = [
//     {
//       id: 1,
//       head: 'Safety Tips',
//       para1:
//         'Here we focus mainly on paragraph structure, but feel free to read our ultimate guide to paragraphs for more of the basics.',
//       para2:
//         'Here we focus mainly on paragraph structure, but feel free to read our ultimate guide to paragraphs for more of the basics.',
//     },
//     {
//       id: 2,
//       head: 'Account OwnerShip',
//       para1:
//         'Here we focus mainly on paragraph structure, but feel free to read our ultimate guide to paragraphs for more of the basics.',
//     },
//   ];
//   const ItemStyle = props => (
//     <View style={styles.FlatView}>
//       <Text style={styles.headStyle}>{props.item.head}</Text>
//       <Text style={{color: '#9293B0', paddingHorizontal: '1%'}}>
//         {props.item.para1}
//       </Text>
//       <Text style={{color: '#9293B0', paddingHorizontal: '1%'}}>
//         {props.item.para2}
//       </Text>
//     </View>
//   );
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require('../../assets/images/image36.png')}
//         resizeMode={'stretch'}
//         style={{height: '100%', width: '100%'}}>
//         <LinearGradient
//           colors={['#4568DC', '#B06AB3']}
//           style={styles.settingbox}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <BackIcon name="left" size={20} style={styles.icon} />
//           </TouchableOpacity>
//           <Text style={styles.settingtxt}>Security</Text>
//         </LinearGradient>
//         <ScrollView>
//           <View style={styles.bindBox}>
//             <Text style={styles.bindTxt}>Bind Account</Text>
//           </View>

//           <View style={styles.phoneContainer}>
//             <TouchableOpacity>
//               <View style={styles.PhoneBox}>
//                 <View style={styles.MobBox}>
//                   <MobileIcon name="mobile1" size={25} color={'#B06AB3'} />
//                   <Text style={styles.phoneTxt}>Phone</Text>
//                 </View>
//                 <View style={styles.NoBox}>
//                   <Text style={{color: 'black'}}>+123 456 7890</Text>
//                   <ForwardIcon name="right" size={20} color={'black'} />
//                 </View>
//               </View>
//             </TouchableOpacity>
//             <View
//               style={{
//                 paddingHorizontal: widthPercentageToDP('2.2%'),
//                 paddingVertical: heightPercentageToDP('1%'),
//               }}>
//               <Text style={styles.phonePara}>
//                 You have bound your mobile phone number,and the account security
//                 factor is better
//               </Text>
//             </View>
//           </View>
//           <View>
//             <TouchableOpacity>
//               <View style={styles.ListBox}>
//                 <View style={styles.IconsBox}>
//                   <FbIcon
//                     name="facebook"
//                     size={28}
//                     color={'dodgerblue'}
//                     style={{marginLeft: '4%'}}
//                   />
//                   <Text style={[styles.AppsName, {left: 25}]}>Facebook</Text>
//                 </View>
//                 <ForwardIcon name="right" size={20} color={'black'} />
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <View style={styles.ListBox}>
//                 <View style={styles.IconsBox}>
//                   <Image
//                     source={require('../../assets/images/twitter.png')}
//                     style={{height: 30, width: 30}}
//                   />
//                   <Text style={[styles.AppsName, {left: 15}]}>Twitter</Text>
//                 </View>
//                 <ForwardIcon name="right" size={20} color={'black'} />
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <View style={styles.ListBox}>
//                 <View style={styles.IconsBox}>
//                   <Image
//                     source={require('../../assets/images/google.png')}
//                     style={{height: 25, width: 25}}
//                   />
//                   {/* <GoogleIcon
//                   name="google"
//                   size={20}
//                   style={{paddingRight: widthPercentageToDP('3%')}}
//                   color={'red'}
//                 /> */}
//                   <Text style={[styles.AppsName, {left: 20}]}>Google</Text>
//                 </View>
//                 <ForwardIcon name="right" size={20} color={'black'} />
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <View style={styles.ListBox}>
//                 <View style={styles.IconsBox}>
//                   <Image
//                     source={require('../../assets/images/vk.png')}
//                     style={{height: 30, width: 30}}
//                   />
//                   {/* <VkIcon
//                   name="vk"
//                   size={20}
//                   style={{paddingRight: widthPercentageToDP('3%')}}
//                   color={'black'}
//                 /> */}
//                   <Text style={[styles.AppsName, {left: 16}]}>VK</Text>
//                 </View>
//                 <ForwardIcon name="right" size={20} color={'black'} />
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <View style={styles.ListBox}>
//                 <View style={styles.IconsBox}>
//                   <AppleIcon name="apple1" size={30} color={'#FF6E1C'} />
//                   <Text style={[styles.AppsName, {left: 15}]}>Apple</Text>
//                 </View>
//                 <ForwardIcon name="right" size={20} color={'black'} />
//               </View>
//             </TouchableOpacity>
//           </View>
//           <View>
//             <FlatList data={Data} renderItem={ItemStyle} />
//           </View>
//         </ScrollView>
//       </ImageBackground>
//     </View>
//   );
// };
// export default Security;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#242A38',
//   },
//   settingbox: {
//     flexDirection: 'row',
//     paddingVertical: heightPercentageToDP('2%'),
//     alignItems: 'center',
//     backgroundColor: '#303749',
//   },
//   settingtxt: {
//     fontSize: 19,
//     color: 'white',
//     fontWeight: '500',
//   },
//   icon: {
//     color: 'white',
//     paddingHorizontal: 5,
//   },
//   bindBox: {
//     paddingVertical: heightPercentageToDP('2%'),
//     paddingHorizontal: widthPercentageToDP('3%'),
//   },
//   bindTxt: {
//     fontSize: 17,
//     color: 'white',
//   },
//   PhoneBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: widthPercentageToDP('2%'),
//   },
//   MobBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   NoBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   phoneTxt: {
//     fontSize: 15,
//     color: 'white',
//     paddingLeft: widthPercentageToDP('2%'),
//   },
//   ItemBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: widthPercentageToDP('2%'),
//   },
//   ListBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 0.4,
//     borderColor: '#B06AB3',
//     paddingVertical: heightPercentageToDP('2.25%'),
//     paddingHorizontal: widthPercentageToDP('3%'),
//   },
//   IconsBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   phonePara: {
//     color: 'white',
//     fontSize: 12,
//   },
//   phoneContainer: {
//     borderBottomWidth: 1,
//     borderColor: '#303749',
//   },
//   headStyle: {
//     color: 'white',
//     fontSize: 15,
//     fontWeight: '400',
//   },
//   FlatView: {
//     marginTop: '2%',

//     width: '95%',
//     left: 8,
//   },
//   AppsName: {
//     color: 'white',

//     fontSize: 13,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import MobileIcon from 'react-native-vector-icons/AntDesign';
//////////Header////////////
//----------Vecto Icons---------//
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../reuseable_Component/Header';

const categories = [
  {
    id: '1',
    image: require('../../assets/images/facebook2.png'),
    name1: 'Facebook',
  },
  {
    id: '2',
    image: require('../../assets/images/twitter2.png'),
    name1: 'Twitter',
  },
  {
    id: '3',
    image: require('../../assets/images/google.png'),
    name1: 'Google',
  },
  {
    id: '4',
    image: require('../../assets/images/vk.png'),
    name1: 'Vk',
  },
  {
    id: '5',
    image: require('../../assets/images/apple2.png'),
    name1: 'Apple',
  },
];

const Setting_Security = ({navigation}) => {
  return (
    <View style={{...styles.bg}}>
      <Header
        name={'security'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={{...styles.txt_1}}>Blind Account</Text>
      <View style={{...styles.hd_2}}>
        <Image
          source={require('../../assets/images/phone.png')}
          resizeMode={'contain'}
          style={{
            ...styles.phn_image,
          }}
        />
        <View style={{flexDirection: 'row', marginRight: 14}}>
          <Text style={{...styles.num}}>+123 456 7890</Text>
          <AntDesign name="right" size={22} style={{color: '#000'}} />
        </View>
      </View>
      <Text style={{...styles.txt_2}}>
        You have bound you mobile phone number ,and the account security factor
        is better
      </Text>
      {/* FlatList */}
      <View
        style={{
          // marginTop: "5%",
          justifyContent: 'center',
        }}>
        <FlatList
          contentContainerStyle={{padding: 8}}
          keyExtractor={item => item.id}
          data={categories}
          renderItem={(item, index) => (
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                // onPress={() => navigation.navigate(item.item.navi)}
                style={{}}>
                <View
                  style={{
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={item.item.image}
                        style={{...styles.logo_image}}
                        resizeMode={'contain'}
                      />
                      <View style={{flexDirection: 'column', marginTop: 5}}>
                        <Text
                          style={{
                            ...styles.logo_name,
                          }}>
                          {item.item.name1}
                        </Text>
                      </View>
                    </View>
                    <View style={{...styles.back_icon}}>
                      <AntDesign
                        name="right"
                        size={18}
                        style={{...styles.icon}}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <Text style={{...styles.txt_1}}>Safety Tip</Text>
      <Text style={{...styles.txt_3}}>
        You have bound you mobile phone number ,and the account security factor
        is better You have bound you mobile phone number ,and the account
        security factor is betterYou have bound you mobile phone number ,and the
        account security factor is betterYou have bound you mobile phone number
        ,and the account security factor is better
      </Text>

      <Text style={{...styles.txt_1}}>Account OwnerShip</Text>
      <Text style={{...styles.txt_3}}>
        You have bound you mobile phone number ,and the account security factor
        is better You have bound you mobile phone number ,and the account
        security factor .
      </Text>
    </View>
  );
};

export default Setting_Security;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  txt_1: {
    color: '#000',
    fontSize: 21,
    fontFamily: 'Poppins_Regular',
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 5,
  },
  phn_image: {
    height: 23,
    width: 100,
  },
  num: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins_Regular',
    fontWeight: '500',
  },
  hd_2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  txt_2: {
    color: '#241F1F',
    fontFamily: 'Poppins_Regular',
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 18,
    marginRight: 80,
  },
  txt_3: {
    // color: "#BBB",
    color: '#241F1F',
    fontFamily: 'Poppins_Regular',
    fontSize: 9,
    fontWeight: '400',
    marginLeft: 18,
    marginRight: 30,
    marginTop: 2,
  },
  logo_name: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Pooppins-Regular',
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 15,
  },
  logo_image: {
    height: 38,
    width: 47,
    marginTop: 11,
    marginLeft: 9,
  },
  back_icon: {
    backgroundColor: '#F57200',
    borderRadius: 50,
    height: 26,
    width: 26,
    // left: 5,
    top: 15,
  },
  icon: {
    top: 3,
    color: '#fff',
    left: 5,
  },
});
