import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { formatNumerWithK } from "../../../../Services/GlobalFuntions";
import { useSelector } from "react-redux";
import { heightPercentageToDP } from "react-native-responsive-screen";

const PaymentScreenHeader = () => {

    const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
    return(
        <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerFontStyle}>Remaining Beans</Text>
                    <View style={styles.userBeansStyle}>
                        <Image source={require('../../../../assets/images/beanA.png')} style={{height: 20, width: 20}} />
                    <Text style={[styles.headerFontStyle, {marginHorizontal: 10}]}>{formatNumerWithK(userUpdatedData?.beans ?? 0)}</Text>
                    </View>
                </View>
        </View>
    )
}

export default PaymentScreenHeader;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 15,
    },
    header: {
        backgroundColor: '#9A804B',
        width: '100%',
        height: heightPercentageToDP(20),
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 20
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
})