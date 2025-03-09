import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Mic from 'react-native-vector-icons/MaterialCommunityIcons';
import Gift from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';

const TopTalentsWeeklyStar = () => {
    return (
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,height:'23%'}}>
            <LinearGradient colors={['#093418', '#0E4724', '#16733C', '#26A757']} style={{  width: '48%', marginTop: 20, height: '90%', borderRadius: 7 }}>
                <TouchableOpacity>
                    <View style={{ alignSelf: 'center', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10,alignSelf:'center' }}>
                            <TouchableOpacity>
                                <Mic
                                    name="microphone-variant"
                                    size={22}
                                    style={{ color: 'white', alignSelf: 'center' }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', alignSelf: 'center', marginLeft: 5 }}>
                                Top Talents
                            </Text>
                        </View>
                        <View style={{ height: '70%', alignSelf: 'center', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'flex-end', marginTop: 10,width:'100%' }}>

                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    source={require('../../../assets/images/records/profile.jpg')}
                                    resizeMode="contain"
                                    style={{ height: 46, width: 46, borderRadius: 100 }}
                                />
                                <Image
                                    source={require('../../../assets/images/records/frame2.png')}
                                    resizeMode="contain"
                                    style={{ height: 64, width: 64, position: 'absolute', bottom: 0, right: -9 }}
                                />
                            </View>

                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    source={require('../../../assets/images/records/profile.jpg')}
                                    resizeMode="contain"
                                    style={{ height: 49, width: 49, borderRadius: 100 }}
                                />
                                <Image
                                    source={require('../../../assets/images/records/frame1.png')}
                                    resizeMode="contain"
                                    style={{ height: 63, width: 63, position: 'absolute', bottom: 0, right: -8 }}
                                />
                            </View>


                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    source={require('../../../assets/images/records/profile.jpg')}
                                    resizeMode="contain"
                                    style={{ height: 47, width: 47, borderRadius: 100 }}
                                />
                                <Image
                                    source={require('../../../assets/images/records/frame3.png')}
                                    resizeMode="contain"
                                    style={{ height: 64, width: 64, position: 'absolute', bottom: 0, right: -9 }}
                                />
                            </View>


                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>

            <LinearGradient colors={['#331346', '#431D5A', '#622487', '#8C35C2']} style={{  width: '48%', marginTop: 20, height: '90%', borderRadius: 7 }}>
                <TouchableOpacity>
                    <View style={{ alignSelf: 'center', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10,alignSelf:'center' }}>
                            <TouchableOpacity>
                                <Mic
                                    name="gift"
                                    size={22}
                                    style={{ color: 'white', alignSelf: 'center' }}
                                />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', alignSelf: 'center', marginLeft: 5 }}>
                                Weekly Star
                            </Text>
                        </View>
                        <View style={{ height: '70%', alignSelf: 'center', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'flex-end', marginTop: 10,width:'100%' }}>

                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    source={require('../../../assets/images/records/profile.jpg')}
                                    resizeMode="contain"
                                    style={{ height: 46, width: 46, borderRadius: 100 }}
                                />
                                <Image
                                    source={require('../../../assets/images/records/frame2.png')}
                                    resizeMode="contain"
                                    style={{ height: 64, width: 64, position: 'absolute', bottom: 0, right: -9 }}
                                />
                            </View>

                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    source={require('../../../assets/images/records/profile.jpg')}
                                    resizeMode="contain"
                                    style={{ height: 49, width: 49, borderRadius: 100 }}
                                />
                                <Image
                                    source={require('../../../assets/images/records/frame1.png')}
                                    resizeMode="contain"
                                    style={{ height: 63, width: 63, position: 'absolute', bottom: 0, right: -8 }}
                                />
                            </View>


                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    source={require('../../../assets/images/records/profile.jpg')}
                                    resizeMode="contain"
                                    style={{ height: 47, width: 47, borderRadius: 100 }}
                                />
                                <Image
                                    source={require('../../../assets/images/records/frame3.png')}
                                    resizeMode="contain"
                                    style={{ height: 64, width: 64, position: 'absolute', bottom: 0, right: -9 }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
            
        </View>
    )
}

export default TopTalentsWeeklyStar

const styles = StyleSheet.create({})