import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const DaysVipCom = () => {
    return (
        <View style={{flex: 1 }}>

            <View style={{ flexDirection: 'row', backgroundColor: 'white', top: 7, borderRadius: 10, paddingHorizontal: 5}}>

                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'red' }}>7-Days VIP</Text>
                    <Image source={require('../../../assets/images/DailyStarAssests/line.jpeg')} style={{ width: 160, height: 15 }}></Image>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../../assets/images/DailyStarAssests/line.jpeg')} style={{ width: 60, height: 60 }}></Image>
                    <Image source={require('../../../assets/images/DailyStarAssests/line.jpeg')} style={{ width: 60, height: 60 }}></Image>
                </View>

            </View>

        </View>
    )
}

export default DaysVipCom

const styles = StyleSheet.create({})