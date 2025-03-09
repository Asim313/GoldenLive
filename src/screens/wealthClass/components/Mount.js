import { StyleSheet, Text, View, Image,Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
const dimensions = Dimensions.get('window');

const Mount = ({anime}) => {

    const dimensions = Dimensions.get('window');

    return (
        <View style={{ marginHorizontal: 15 }}>
            <View>
                <View style={{ alignSelf: 'center', justifyContent: 'flex-end', top: 8 }}>
                    <Image
                        source={require('../../../assets/images/wealthClass/crown.png')}
                        resizeMode="contain"
                        style={{ height: 40, width: 40 }}
                    />
                </View>
                <View style={{ backgroundColor: '#303749', paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', borderTopColor: '#FE9E00', borderTopWidth: 5 }}>

                    <LinearGradient colors={['#FE9E00', '#FE7816']} style={{ width: '50%', height: 30, justifyContent: 'center', borderBottomRightRadius: 25, borderBottomLeftRadius: 25, position: 'absolute' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }}>
                            Mount
                        </Text>
                    </LinearGradient>


                    <View style={{marginTop:30}}>
                        <LottieView
                            autoPlay
                            // ref={animation}
                            style={{
                                width: dimensions.width * 0.95,
                                height: dimensions.height * 0.16,
                        
                                
                                // backgroundColor: '#eee',
                            }}
                            source={anime}
                        />
                    </View>
                </View>
            </View>


        </View>
    )
}

export default Mount

const styles = StyleSheet.create({})