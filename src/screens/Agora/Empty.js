import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { View } from "react-native";

const Empty = (props) => {
    const navigation = useNavigation()
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const { route } = props;
    const { params } = route;
    const {
      channelId,
      userLive,
      completeData
    } = params;

    useEffect(() => {
        check()
    }, [])

    const check = async () => {
        await delay(2000);
        navigation.navigate('AudiencePage', {
            channelId: channelId, 
            userLive: true,
            completeData: completeData,
          });
    }
    return(
        <View>
            <Text>helo000000000000</Text>
        </View>
    )
}

export default Empty;
