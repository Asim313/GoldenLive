import AnimatedLottieView from "lottie-react-native";
import React, { memo } from "react";
import { View } from "react-native-animatable";

const LottieViewLoop = memo(({}) => {
    console.log('jjjjjjjjjjaaaaaaaaaaaaooooooooooooooooooggggggggggggggggggggg')
    return(
        <View>
                   <AnimatedLottieView
                autoPlay
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require('../../assets/json/audio-waves.json')}
              />
                
        </View>
    )
})

export default LottieViewLoop