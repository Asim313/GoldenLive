import React, { useEffect, useRef } from "react";
import { ImageBackground, View, Animated,
    Easing, 
    Text,
    Image,
    Dimensions,
    StyleSheet, 
} from "react-native";
import { truncateAfterThreeCharacters } from "../../../Services/GlobalFuntions";

const GiftAnimationPatti = ({value, removeItem}) => {

  // console.log("valueeeeeeeeeeeeeee", value)

        ////Animation Code////
        const animatedValue = useRef(new Animated.Value(0)).current;
        const animationDuration = 1000;
        const isAnimating = useRef(false);
      
        const handleAnimation = () => {
            if (value?.length > 0 && !isAnimating.current) {
              isAnimating.current = true;
              animatedValue.setValue(0);
              Animated.timing(animatedValue, {
                toValue: 0.5,
                duration: animationDuration / 2,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start(() => {
                setTimeout(() => {
                  Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: animationDuration / 2,
                    easing: Easing.linear,
                    useNativeDriver: false,
                  }).start(() => {
                    removeItem();
                    isAnimating.current = false;
                  });
                }, 3000);
              });
            }
          };
        
          useEffect(() => {
              handleAnimation();
              // console.log('vallll', value, value?.[0]?.icon)
          }, [value]);
      
        const translateX = animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [
            Dimensions.get('window').width / 0.5,
            0,
            -Dimensions.get('window').width / 0.5,
          ],
        });

    return(    
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 50 }}>
              <Animated.View
                style={[
                  styles.box,
                  {
                    transform: [{ translateX }],
                  },
                ]}>
                <ImageBackground
                  source={require('../../../assets/images/L1.png')}
                  style={{
                    width: 330, height: 65,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}>
                  <Text style={{ fontSize: 11, color: 'white', fontWeight: 'bold', fontFamily: 'Roboto', top: 13 }}>
                    {value?.id} {truncateAfterThreeCharacters(value?.[0]?.senderName)} Has sent gift to host x{value?.[0]?.beans}
                  </Text>
                  {/* <Image
                    source={{ uri: value?.[0]?.img }}
                    style={{ height: 30, width: 50, }}
                  /> */}
                </ImageBackground>
              </Animated.View>
            </View>
    )
}

const styles = StyleSheet.create({

})

export default GiftAnimationPatti;