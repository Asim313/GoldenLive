import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RecordsFlatlistDataRender = ({item, index}) => {
    console.log("itemmmmmmmmmmmm", item)
    return(
        <View style={{}}>
            <Text style={{color: 'white'}}>{index + 1}</Text>
        </View>       
    )
}

export default RecordsFlatlistDataRender;

const styles = StyleSheet.create({

})