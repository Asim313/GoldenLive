import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
const SecondaryButton = ({ onPress, bgStyle, icon, title, }) => {

    const [value, setValue] = useState("")

    return (
        <View style={{ ...bgStyle, ...styles.Button, }}>

            <TouchableOpacity onPress={() => onPress && onPress()} style={{ alignItems: "center" }}>

                <View style={{ flexDirection:'row',justifyContent:"center",marginTop:10}}>
                    {icon}
              
                <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>

    )

    function handleonTextChange(txt) {
        setValue(txt)
        onChange && onChange(txt)
    }
}

export default SecondaryButton


const styles = StyleSheet.create({
    Button: {
        height: 45,
        borderRadius: 5,
        alignSelf: "center",
    },
    text: {
        // justifyContent: 'center',
        // textAlign: 'center',
        // textAlignVertical: "center",
        ontFamily: "Lato-Bold",
        color: "#fff",
        fontSize: 15,
        marginLeft:15
       

    }
})