import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import globalStyles from "../utils/styles/global-styles";
import LinearGradient from "react-native-linear-gradient";

const VideoCallBtn = () => {
    const linearGradientColors = ['#9405C6', '#C203B0'];
    return(
        <LinearGradient 
        colors={linearGradientColors}
        style={[globalStyles.mainContainer, globalStyles.flexRowAndCenter, { height: '100%', borderRadius: 45}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}> 
        <Image source={require('../assets/images/profileViewer/videoCall.png')} style={{height: 20, width: 20}} />
        <View style={{left: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.fontStyleMain}>Video Chat</Text>
            <View style={globalStyles.flexRowAndCenter}>
                <Image source={require('../assets/images/profileViewer/beans.png')} style={{height: 10, width: 10, right: 2}} />
                <Text style={[styles.fontStyleMain, {fontSize: 9}]}>2000/Min</Text>
            </View>
        </View>
        </LinearGradient>
    )
}

export default VideoCallBtn;

const styles = StyleSheet.create({
    fontStyleMain: {
        color: 'white', 
        fontSize: 11,
        fontWeight: '500',

    }
})