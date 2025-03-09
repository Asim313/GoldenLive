import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GiftSheetHostIcon = ({ CloseSheet, isHost, onPressMic, onPressViewProfile, onPressRemoveFromCall, selectedUser }) => {
    const [micIcon, setMicIcon] = useState("mic")
    const handlePressCloseIcon = () => {
        CloseSheet.current?.close();
    };

    useEffect(() => {
        // console.log("llllllll", selectedUser)
        setMicIcon(selectedUser?.isMicOn === undefined || selectedUser?.isMicOn === "true" ? "mic" : "mic-off" )
    }, [selectedUser])

    return (
        <View>
                <View style={styles.Container}>
            {!isHost && (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 3, alignItems: 'center' }}>
                        <TouchableOpacity onPress={onPressMic}>
                            <Icon name= {micIcon} size={14} color={'white'} style={styles.MicIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressViewProfile}>
                            <Icon name="card" size={12} color={'white'} style={styles.CardIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressRemoveFromCall}>
                            <Icon name="person-remove" size={12} color={'white'} style={styles.PersonIcon} />
                        </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressCloseIcon} style={{ flexDirection: 'row' }}>
                        <Icon name="close" size={20} style={{ color: 'white' }}></Icon>
                    </TouchableOpacity>
                    </View>

                )}
                </View>
        </View>
    )
}

export default GiftSheetHostIcon

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'green',
        width: 145,
    },
    MicIcon: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 25
    },
    CardIcon: {
        marginHorizontal: 5,
        backgroundColor: 'red',
        borderRadius: 25,
        paddingLeft: 13,
        paddingRight: 13,
        padding: 7
    },
    PersonIcon: {
        backgroundColor: 'red',
        borderRadius: 25,
        paddingLeft: 13,
        paddingRight: 13,
        padding: 7
    }
})
