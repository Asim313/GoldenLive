import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Users from 'react-native-vector-icons/FontAwesome5';
import DropDown from 'react-native-vector-icons/MaterialIcons';

const SeatesHeader = () => {
    return (
        <View style={{ backgroundColor: '#242A38', width: '90%', alignSelf: 'center', marginTop: 10, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', paddingVertical: 10, alignSelf: 'center' }}>
                <View style={{  borderRadius: 100 }}>
                    <Image source={require('../../../assets/images/wealthClass/profile.jpg')} style={{ height: 60, width: 60, borderRadius: 100 }} />
                    <View style={{ backgroundColor: '#000000aa', position: 'absolute', right: 0, bottom: 0, padding: 1, borderRadius: 100, padding: 4 }}>
                        <DropDown name="camera-alt" size={15} style={{ color: 'white' }} />
                    </View>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 23 }}>Add a tittle a chat</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Users name="users" size={22} style={{ color: 'white', alignSelf: 'center' }} />
                        <View style={{ marginLeft: 8, }}>
                            <Text style={{ color: '#FFFFFF' }}>Public</Text>
                        </View>
                        <DropDown name="arrow-drop-down" size={30} style={{ color: 'white', alignSelf: 'center' }} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SeatesHeader

const styles = StyleSheet.create({})