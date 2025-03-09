import React, {memo, useEffect} from "react";
import { Animated, Text, View } from "react-native";

const TextSlideAnimation = memo(({name}) => {
    const animated = new Animated.Value(-250);

    useEffect(() => {
        animateText()
    }, [])

    const animateText = (index) => {
        animated.setValue(-150)
        // Create an animated sequence
        Animated.loop(
          Animated.timing(animated, {
            toValue: 150,
            duration: 6000,
            useNativeDriver: true
          })
        ).start();
    }

    return(
        <View>
            <Animated.View style={[{ transform: [{ translateX: animated }] }]}>
                    <View style={{}}>
                         <Text style={{textAlign: 'center', width: 200, color:'white', fontSize: 12 }}>{name}</Text>
                    </View>
            </Animated.View>
        </View>
    )
})

export default TextSlideAnimation;