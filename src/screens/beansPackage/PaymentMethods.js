import React, { useState } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AllIcons, { IconList } from "../../components/AllIcons";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const SelectPaymentMethods = ({selectedValue, onPressClose}) => {
    const [selectedMethod, setSelectedMethod] = useState(null)
    const navigation = useNavigation()
    const methods = [{id: 1, name: 'Google Pay', image: require('../../assets/images/PaymentMethods/googlePay.png')}, {id: 2, name: 'Stripe', image: require('../../assets/images/PaymentMethods/stripe.png')}]
    
    const handleClick = (item) => {
        if(item?.name === 'Google Pay') {
            Alert.alert('Soon, we will add google pay.')
            return
        }
        setSelectedMethod(item?.name)
        onPressClose()
        navigation.navigate('CheckOutScreen', {
            selectedValue,
            selectedMethod : item?.name,
        })
    }

    return(
        <View style={styles.mainContainer}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'black', alignSelf: 'center' }}>Select Payment Method</Text>
            <View style={{height: widthPercentageToDP(100)}}>
                            <FlatList
                                data={methods}
                                renderItem={({item}) => {
                                    return(
                                        <TouchableOpacity style={[styles.userBeansStyle, {justifyContent: 'space-between'}]} onPress={() => handleClick(item)}>
                                            <View style={[styles.userBeansStyle, {marginVertical: 0}]}>
                                            {item?.image &&  <Image source={item?.image} style={{height: 22, width: 60}} />}
                                                <Text style={{marginHorizontal: 10, fontSize: 12, color: 'black', fontWeight: '500'}}>{item?.name}</Text>
                                            </View>
                                            <View style={styles.priceStyle}>
                                               <AllIcons name={IconList.Feather} iconName={'chevron-right'} size={20} color={'black'}  />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                    </View>
        </View>
    )
}

export default SelectPaymentMethods;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 15,
    },
    userBeansStyle: {
        top: 10,
        height: heightPercentageToDP(5),
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
   
})