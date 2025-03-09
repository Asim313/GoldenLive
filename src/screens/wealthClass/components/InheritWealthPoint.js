import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const InheritHealthPoints = ({ namplateImg, badgeImg, avatorImg }) => {
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
                <View
                    style={{
                        backgroundColor: '#303749',
                        paddingVertical: 15,
                        borderRadius: 8,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderTopColor: '#FE9E00',
                        borderTopWidth: 5,
                    }}>
                    <View
                        style={{
                            marginTop: 50,
                            backgroundColor: '#242A38',
                            width: '90%',
                            borderRadius: 10
                        }}>
                        <Text style={{ fontSize: 11, color: '#AEAECE', lineHeight: 20, paddingVertical: 5, paddingHorizontal: 5 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>

                    </View>

                    <LinearGradient
                        colors={['#FE9E00', '#FE7816']}
                        style={{
                            width: '50%',
                            height: 30,
                            justifyContent: 'center',
                            borderBottomRightRadius: 25,
                            borderBottomLeftRadius: 25,
                            position: 'absolute',
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#FFFFFF',
                            }}>
                            Inherit Wealth Point
                        </Text>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};

export default InheritHealthPoints;

const styles = StyleSheet.create({});
