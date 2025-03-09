import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../reuseable_Component/Header";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { formatNumerWithK } from "../../Services/GlobalFuntions";
import RbSheetComponent from "../reuseable_Component/RbSheetComponent";
import SelectPaymentMethods from "./PaymentMethods";
import { useNavigation } from "@react-navigation/native";
import PaymentScreenHeader from "./InApp/components/screensHeader";

const BeansPackage = ({route}) => {
    const { packages } = route?.params;
    const navigation = useNavigation();
    const selectPaymentMethodRef = useRef(null)
    const [selectedValue, setSelectedValue] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const handlePriceClick = (item) => {
        setSelectedValue(item)
        navigation.navigate('CheckOutScreen', {
            selectedValue: item,
            selectedMethod : '',
        })
        // selectPaymentMethodRef.current.open()
    }
    
    return(
        <View>
            <Header name={'My Wallet'} />
                <View style={styles.header}>
                        <PaymentScreenHeader />
                </View>
            <View style={styles.mainContainer}>

                <View style={{top: 10, height: heightPercentageToDP(100)}}>
                    <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>Recharge</Text>
                    {isLoading ?
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator />
                            <Text style={{color: 'black', fontSize: 11, top: 10}}>Loading data...</Text>
                        </View>
                    :
                    
                    <View>
                            <FlatList
                                data={packages}
                                renderItem={({item}) => {
                                    return(
                                        <View style={[styles.userBeansStyle, {justifyContent: 'space-between'}]}>
                                            <View style={[styles.userBeansStyle, {marginVertical: 0}]}>
                                                <Image source={require('../../assets/images/beanA.png')} style={{height: 20, width: 20}} />
                                                <Text style={{marginHorizontal: 10, fontSize: 16, color: 'black', fontWeight: '500'}}>{formatNumerWithK(item?.beans ?? 0)}</Text>
                                            </View>
                                            <TouchableOpacity style={styles.priceStyle} onPress={() => handlePriceClick(item)}>
                                                <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>US$ {item?.dollar}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />
                    </View>
                    }
                </View>
                
                <RbSheetComponent
                    view={<SelectPaymentMethods selectedValue={selectedValue} onPressClose={() => selectPaymentMethodRef.current.close()} />}
                    backgroundColor= {'white'}
                    refUse={selectPaymentMethodRef}
                    close={false}
                    height={heightPercentageToDP(50)}
                />
            </View>
           
        </View>
    )
}

export default BeansPackage;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 15,
    },
    header: {
        height: heightPercentageToDP(20),
    }, 
    userBeansStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    headerFontStyle: {
        color: 'white',
        fontSize: 16, 
        fontWeight: '500'
    },
    priceStyle: {
        backgroundColor: '#FFA800',
        padding: 5, 
        paddingHorizontal: 15,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})