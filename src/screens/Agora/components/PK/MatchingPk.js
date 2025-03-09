import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { heightPercentageToDP } from "react-native-responsive-screen";

const MatchingPk = ({onPressClose}) => {
    return(
           <LinearGradient
      start={{x: 0, y: 0.5}}
      end={{x: 0.2, y: 1}}
      colors={[
        '#9E07D3',
        '#FF0064',
      ]}
      style={styles.settingbox}>
        <Image source={require('../../../../assets/images/PKFile/pkMatching.png')} style={styles.pkImageStyle} />
        <Text style={styles.fontStyle}>Matching...</Text>
        <TouchableOpacity onPress={onPressClose}>
            <Text style={[styles.fontStyle, {backgroundColor: '#FFA800', fontWeight: 'bold', fontSize: 15, padding: 5, paddingHorizontal: 12, borderRadius: 20}]}>Cancel the Match</Text>
        </TouchableOpacity>
      </LinearGradient>
    )
}

export default MatchingPk;

const styles = StyleSheet.create({
    settingbox: {
        height: heightPercentageToDP(25),
        width: '75%',
        alignSelf: 'center',
        backgroundColor: 'pink',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    pkImageStyle: {
        height: 50,
        width: 85,
    },
    fontStyle: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 13
    }
})