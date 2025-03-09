import React from "react";
import { StyleSheet, View, Image } from "react-native";

const AgencyRecordSingleUserView = ({item}) => {
    return(
        <View style={styles.container}>
              <Image
                    source={{uri: item?.agency_image}}
                    resizeMode="contain"
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: '#E92F24',
                    }}
                  />
        </View>
    )
}

export default AgencyRecordSingleUserView


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    }
})


