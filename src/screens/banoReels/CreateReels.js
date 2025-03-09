// import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import React, { useRef } from 'react'
// import { Camera, useCameraDevices } from 'react-native-vision-camera'
// import LeftArrow from 'react-native-vector-icons/MaterialIcons';
// import CameraIcons from 'react-native-vector-icons/Ionicons';





// const CreateReels = () => {

//     const devices = useCameraDevices('wide-angle-camera')
//     const device = devices.back
//     if (device == null) return <ActivityIndicator />
//     const camera = useRef < Camera > (null)

//     const takePhoto = async () => {
//         const photo = await camera.current.takePhoto({
//             qualityPrioritization: 'quality',
//             flash: 'on',
//             enableAutoRedEyeReduction: true
//         })
//     }

//     return (
//         <View style={{ flex: 1 }}>
//             <Camera
//                 style={StyleSheet.absoluteFill}
//                 device={device}
//                 isActive={true}
//                 photo={true}
//                 preset="medium"
//             // ref={camera}



//             />


//             <View style={{ flex: 1, backgroundColor: '#3323' }}>
//                 <View>
//                     <TouchableOpacity style={{ alignSelf: 'flex-start', margin: 10 }} >
//                         <LeftArrow name="arrow-back-ios" size={20} style={{ color: 'white', alignSelf: 'center' }} />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{ alignSelf: 'flex-end', marginRight: 10 }}>
//                     <View style={{ alignItems: 'center', width: '12%', marginBottom: 10 }}>
//                         <TouchableOpacity>
//                             <View style={{ backgroundColor: '#3E352Faa', width: 35, height: 35, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
//                                 <CameraIcons name="camera-reverse-outline" size={20} style={{ color: 'white' }} />
//                             </View>
//                         </TouchableOpacity>
//                         <Text style={{ color: '#FFFFFF', fontSize: 13 }}>Flip</Text>
//                     </View>

//                     <View style={{ alignItems: 'center', width: '12%', marginBottom: 10 }}>
//                         <TouchableOpacity>
//                             <View style={{ backgroundColor: '#3E352Faa', width: 35, height: 35, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
//                                 <CameraIcons name="speedometer-outline" size={20} style={{ color: 'white' }} />
//                             </View>
//                         </TouchableOpacity>
//                         <Text style={{ color: '#FFFFFF', fontSize: 13 }}>Speed</Text>
//                     </View>

//                     <View style={{ alignItems: 'center', width: '12%', marginBottom: 10 }}>
//                         <TouchableOpacity>
//                             <View style={{ backgroundColor: '#3E352Faa', width: 35, height: 35, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
//                                 <CameraIcons name="color-filter-outline" size={20} style={{ color: 'white' }} />
//                             </View>
//                         </TouchableOpacity>
//                         <Text style={{ color: '#FFFFFF', fontSize: 13 }}>Filters</Text>
//                     </View>

//                     <View style={{ alignItems: 'center', width: '12%', marginBottom: 10 }}>
//                         <TouchableOpacity>
//                             <View style={{ backgroundColor: '#3E352Faa', width: 35, height: 35, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
//                                 <CameraIcons name="timer-outline" size={20} style={{ color: 'white' }} />
//                             </View>
//                         </TouchableOpacity>
//                         <Text style={{ color: '#FFFFFF', fontSize: 13 }}>Timer</Text>
//                     </View>

//                     <View style={{ alignItems: 'center', width: '12%', marginBottom: 10 }}>
//                         <TouchableOpacity>
//                             <View style={{ backgroundColor: '#3E352Faa', width: 35, height: 35, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
//                                 <CameraIcons name="ios-musical-notes-outline" size={20} style={{ color: 'white' }} />
//                             </View>
//                         </TouchableOpacity>
//                         <Text style={{ color: '#FFFFFF', fontSize: 13 }}>Music</Text>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     )
// }

// export default CreateReels

// const styles = StyleSheet.create({})