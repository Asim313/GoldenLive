import AnimatedLottieView from "lottie-react-native";
import React, { memo } from "react";
import { View } from "react-native";

const Testing10 = memo(({gift, removeFromQueue}) => {
            return(
              <View>
             {gift &&  <AnimatedLottieView
                    loop={false}
                    // ref={isAnimatingRef}
                    autoPlay={true}
                    onAnimationFinish={() => {
                      console.log('Current animation ended');
                      // Start the next animation in the queue
                      removeFromQueue();
                    }}
                    style={{ height: 400, width: 400 }}
                    source={{ uri: gift }}
                  />}
              </View>   
    )
})

export default Testing10;