// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
// import React from 'react'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import Entypo from 'react-native-vector-icons/Entypo'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// const Record = ({ navigation }) => {
//     return (
//         <View style={{ ...styles.container }}>

//             <View style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 8 }}>
//                 <TouchableOpacity onPress={() => navigation.goBack('Streams')}>
//                     <AntDesign
//                         name="left"
//                         size={26}
//                         style={{ marginTop: 2 }}
//                     />
//                 </TouchableOpacity>
//                 <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'normal', marginLeft: 10 }}>
//                     Records
//                 </Text>
//             </View>

//             <View>

//                 <Image
//                     source={require('../../assets/images/record1.png')}
//                     style={styles.image1}
//                 />

//                 <View style={{ flexDirection: "row", marginHorizontal: 30, marginTop: 34 }}>
//                     <FontAwesome5
//                         name="user-friends"
//                         size={26}
//                         style={{ marginTop: 2, color: "#fff" }}
//                     />
//                     <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'normal', marginLeft: 10, marginTop: 4 }}>
//                         Top Users
//                     </Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", marginTop: 16 }}>

//                     <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//                         <Image
//                             source={require('../../assets/images/storedp.png')}
//                             style={{ ...styles.image3 }}
//                         />
//                         <Text style={{ color: "#fff", fontWeight: "normal", fontSize: 20, marginTop: 10 }}>2</Text>
//                     </View>
//                     <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//                         <Image source={require('../../assets/images/crown.png')}
//                             style={{ marginLeft: 28, }}
//                         />
//                         <Image
//                             source={require('../../assets/images/storedp.png')}
//                             style={{ ...styles.image2 }}
//                         />
//                         <Text style={{ color: "#fff", fontWeight: "normal", fontSize: 20, marginTop: 10 }}>1</Text>
//                     </View>
//                     <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//                         <Image source={require('../../assets/images/crown.png')}
//                             style={{ marginLeft: 28, marginBottom: -18 }}
//                         />
//                         <Image
//                             source={require('../../assets/images/storedp.png')}
//                             style={{ ...styles.image4 }}
//                         />
//                         <Text style={{ color: "#fff", fontWeight: "normal", fontSize: 20, marginTop: 10 }}>3</Text>
//                     </View>
//                 </View>
//             </View>

//             <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", margin: 5, }}>
//                 <View>
//                     <Image source={require('../../assets/images/record2.png')}

//                         style={{ ...styles.img, }} />
//                     <View style={{ flexDirection: "row", position: 'absolute', marginHorizontal: 30, marginTop: 34 }}>
//                         <Entypo
//                             name="modern-mic"
//                             size={26}
//                             style={{ marginTop: 5, color: "#fff" }}
//                         />
//                         <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'normal', marginLeft: 4, marginTop: 3 }}>
//                             Top Talents
//                         </Text>
//                     </View>

//                     <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", bottom: 80, }}>
//                         <View style={{ margin: 5 }}>
//                             <Image source={require('../../assets/images/crown.png')}
//                                 style={{ marginLeft: 25, bottom: 13 }}
//                             />
//                             <Image source={require('../../assets/images/storedp.png')}
//                                 style={{ height: 50, width: 50, position: 'absolute', borderRadius: 50, borderWidth: 1, borderColor: 'yellow' }}
//                             />
//                         </View>

//                         <View style={{ margin: 5 }}>
//                             <Image source={require('../../assets/images/crown.png')}
//                                 style={{ marginLeft: 25, bottom: 13 }}
//                             />
//                             <Image source={require('../../assets/images/storedp.png')}
//                                 style={{ height: 50, width: 50, position: 'absolute', borderRadius: 50, borderWidth: 1, borderColor: 'yellow' }}
//                             />
//                         </View>

//                         <View style={{ margin: 5 }}>
//                             <Image source={require('../../assets/images/crown.png')}
//                                 style={{ marginLeft: 25, bottom: 13 }}
//                             />
//                             <Image source={require('../../assets/images/storedp.png')}
//                                 style={{ height: 50, width: 50, position: 'absolute', borderRadius: 50, borderWidth: 1, borderColor: 'yellow' }}
//                             />
//                         </View>

//                     </View>



//                 </View>

//                 <View>
//                     <Image source={require('../../assets/images/record3.png')}

//                         style={{ ...styles.img, }} />
//                     <View style={{ flexDirection: "row", position: 'absolute', marginHorizontal: 30, marginTop: 34 }}>
//                         <Ionicons
//                             name="md-gift-sharp"
//                             size={26}
//                             style={{ marginTop: 5, color: "#fff" }}
//                         />
//                         <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'normal', marginLeft: 4, marginTop: 3 }}>
//                             Weekly Stars
//                         </Text>
//                     </View>

//                     <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", bottom: 80, }}>
//                         <View style={{ margin: 5 }}>
//                             <Image source={require('../../assets/images/crown.png')}
//                                 style={{ marginLeft: 25, bottom: 13 }}
//                             />
//                             <Image source={require('../../assets/images/storedp.png')}
//                                 style={{ height: 50, width: 50, position: 'absolute', borderRadius: 50, borderWidth: 1, borderColor: 'yellow' }}
//                             />
//                         </View>

//                         <View style={{ margin: 5 }}>
//                             <Image source={require('../../assets/images/crown.png')}
//                                 style={{ marginLeft: 25, bottom: 13 }}
//                             />
//                             <Image source={require('../../assets/images/storedp.png')}
//                                 style={{ height: 50, width: 50, position: 'absolute', borderRadius: 50, borderWidth: 1, borderColor: 'yellow' }}
//                             />
//                         </View>

//                         <View style={{ margin: 5 }}>
//                             <Image source={require('../../assets/images/crown.png')}
//                                 style={{ marginLeft: 25, bottom: 13 }}
//                             />
//                             <Image source={require('../../assets/images/storedp.png')}
//                                 style={{ height: 50, width: 50, position: 'absolute', borderRadius: 50, borderWidth: 1, borderColor: 'yellow' }}
//                             />
//                         </View>

//                     </View>



//                 </View>
//             </View>
//             <View>
//                 <Image source={require('../../assets/images/record4.png')}
//                     style={{
//                         width: "94%",
//                         borderRadius: 10,
//                         alignSelf: "center",
//                         marginTop: "1%",
//                         position: 'absolute'
//                     }}
//                 />
//                 <View style={{ marginHorizontal: 30, alignItems: 'center', justifyContent: "center" }}>
//                     <View style={{ flexDirection: 'row', marginTop: 10 }}>
//                         <Ionicons
//                             name="md-gift-sharp"
//                             size={26}
//                             style={{ marginTop: 5, color: "#fff" }}
//                         />
//                         <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'normal', marginLeft: 4, marginTop: 3, }}>
//                             Weekly Stars
//                         </Text>
//                     </View>
//                     <View style={{ flexDirection: "row", }}>
//                     <View>
//                             <Image source={require('../../assets/images/crown.png')}
//                                style={{top:5,marginLeft:50}}
//                             />
//                             <Image
//                                 source={require('../../assets/images/wallpaper.jpg')}
//                                 style={styles.img1}
//                             />
//                             <TouchableOpacity style={{height:30,width:"80%",backgroundColor:"#ED2D21",borderRadius:20,marginLeft:5,marginTop:2}}>
//                             <Text style={{textAlign:"center",color:"#fff",marginTop:4}}>Level 12</Text>
//                         </TouchableOpacity>
//                         </View>
                        
//                         <Text style={{color:"#fff",textAlign:"center",fontSize:18,fontWeight:'normal',marginTop:50}}>Send To</Text>
//                         <View>
//                             <Image source={require('../../assets/images/crown.png')}
//                                 style={{ marginLeft: 55,top:5}}
//                             />
//                             <Image
//                                 source={require('../../assets/images/wallpaper.jpg')}
//                                 style={styles.img2}
//                             />
//                              <TouchableOpacity style={{height:30,width:"80%",backgroundColor:"#ED2D21",borderRadius:20,marginLeft:5,marginTop:2}}>
//                             <Text style={{textAlign:"center",color:"#fff",marginTop:4}}>Level 06</Text>
//                         </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </View>


//         </View>
//     )
// }

// export default Record

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#242A38',
//     },
//     text: {
//         top: 7, fontSize: 12, textAlign: "center", marginLeft: 3, marginRight: 3, fontWeight: "normal",
//         fontSize: 13
//     },
//     image1: {
//         width: "94%",
//         borderRadius: 10,
//         alignSelf: "center",
//         marginTop: "6%",
//         position: 'absolute'
//     },
//     image2: {
//         height: 90,
//         width: 90,
//         borderRadius: 50,
//         justifyContent: 'center',
//         borderWidth: 1,
//         borderColor: "orange",
//         marginTop: -4
//     },
//     image3: {
//         height: 60,
//         width: 60,
//         borderRadius: 50,
//         justifyContent: 'center',
//         borderWidth: 1,
//         borderColor: "yellow",
//         marginHorizontal: 10,
//         marginTop: 14
//     },
//     image4: {
//         height: 60,
//         width: 60,
//         borderRadius: 50,
//         justifyContent: 'center',
//         borderWidth: 1,
//         borderColor: "yellow",
//         marginHorizontal: 10,
//         marginTop: 10
//     },
//     img: {
//         // height: 150,
//         // width: "48%",
//         borderRadius: 30,
//         margin: 3,
//         marginTop: 30,

//     },
//     img1: {
//         borderColor: "#727272",
//         height: 90, width: 90, borderRadius: 50, borderWidth: 1.5,
//         marginHorizontal:8
//     },
//     img2: {
//         borderColor: "yellow",
//         height: 90, width: 90, borderRadius: 50, borderWidth: 1,
//         marginHorizontal:8
//     }
// });
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Record = () => {
  return (
    <View>
      <Text>Record</Text>
    </View>
  )
}

export default Record

const styles = StyleSheet.create({})