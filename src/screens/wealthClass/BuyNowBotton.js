import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BuyNowBotton = () => {

    const [show, setShow] = useState(true);
    const refRBSheet = useRef();
    const [selectPkBtn, setselectPkBtn] = useState(0);

    const Month = [
        {
            id: 1,
            name: '1 month',
        },
        {
            id: 2,
            name: '3 month',
        },
        {
            id: 3,
            name: '6 month',
        },
        {
            id: 4,
            name: '12 month',
        },
        {
            id: 5,
            name: 'Recurring Subscription',
        },
    ];

    const ApplyForVip = async () => {
        try {
            const paramsBody = {
                id: 1,
                month: 1,
                beans: monthBeans,
            };

            const res = await ApiCallToken({
                params: userData.token,
                paramsBody: paramsBody,
                route: 'search',
                verb: 'POST',
            });

            console.log('Response for UPDATING DATA == >>', res);
        } catch (e) {
            console.log('user vip updating error ', e.toString());
        }
    };

    const GetVipDuration = async () => {
        try {
            const res = await ApiCallToken({
                params: userData.token,
                route: 'get-vip',
                verb: 'GET',
            });

            // console.log('here is the respone for VIP Duration', res[0].vip_duration);
            setVipDuration(res[0]?.vip_duration);
            setShow(false);
            // setGettingGiftsArray(res);
        } catch (e) {
            console.log('saga login error -- ', e.toString());
        }
    };

    useFocusEffect(
        useCallback(() => {
            GetVipDuration();
        }, []),
    );
    return (
        <>
            <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={{
                    backgroundColor: 'red',
                    padding: 15,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    marginTop: 20,
                }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
                    Buy Now
                </Text>
            </TouchableOpacity>

            <View>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        draggableIcon: {
                            backgroundColor: '#000',
                            height: 0,
                        },
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            backgroundColor: '#31384A',
                        },
                    }}>
                    <View style={{ flex: 1, backgroundColor: '#31384A' }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomWidth: 0.2,
                                borderColor: 'white',
                            }}>
                            <View style={{ flexDirection: 'row', bottom: 5 }}>
                                <Text style={{ color: 'white', fontSize: 12, left: 5 }}>
                                    Account ID:
                                </Text>
                                <Text style={{ color: 'white', fontSize: 12, left: 5 }}>
                                    12345678990
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'orange',
                                    right: 5,
                                    padding: 4,
                                    borderRadius: 20,
                                    bottom: 5,
                                }}>
                                <Text style={{ fontSize: 11 }}>Gift to a friend</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                            <Text style={{ color: 'white' }}>Lease Period</Text>
                            <AntDesign
                                name="questioncircleo"
                                color={'white'}
                                style={{ marginLeft: 6 }}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',

                                width: '100%',
                                flexWrap: 'wrap',
                            }}>
                            {Month.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setselectPkBtn(index);
                                    }}>
                                    <Text
                                        style={[
                                            styles.monthbtn,
                                            selectPkBtn == index && {
                                                borderColor: 'orange',
                                                color: 'orange',
                                            },
                                        ]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                            <Text style={{ color: 'white' }}>price:</Text>
                            <Text style={{ color: 'orange' }}>10,000 beans</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'orange',
                                padding: 10,
                                marginHorizontal: 70,
                                borderRadius: 20,
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                            <Text style={{ color: 'white' }}>Active</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </View>
        </>
    )
}

export default BuyNowBotton

const styles = StyleSheet.create({
    monthbtn: {
        color: 'white',
        color: 'white',
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: '#31384A',
        marginHorizontal: 12,
        marginVertical: 10,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: 'white',
      },
})