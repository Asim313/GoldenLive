import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
const PrimaryButton = ({ onPress, bgStyle, title, }) => {

    const [value, setValue] = useState("")

    return (
        <View style={{ ...bgStyle, ...styles.Button, }}>

            <TouchableOpacity onPress={() => onPress && onPress()} style={{ alignItems: "center" }}>

                <Text style={styles.text}>{title}</Text>

            </TouchableOpacity>
        </View>

    )

    function handleonTextChange(txt) {
        setValue(txt)
        onChange && onChange(txt)
    }
}

export default PrimaryButton


const styles = StyleSheet.create({
    Button: {
        height: 45,
        borderRadius: 5,
        alignSelf: "center",
        elevation: 6
    },
    text: {
        // justifyContent: 'center',
        // textAlign: 'center',
        // textAlignVertical: "center",
        color: "#fff",
        fontSize: 16,
        marginTop: 10,
        fontWeight:"normal"

    }
})