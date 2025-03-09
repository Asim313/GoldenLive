import React from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const Rules = () => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
            source={require('../images/rulesDesc.png')}
            style={{height: '95%', width: '95%'}}
            resizeMode="contain"
          />
        </View>
    )
}

export default Rules