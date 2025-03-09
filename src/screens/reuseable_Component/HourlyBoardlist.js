import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { ApiCallToken } from '../../Services/Apis';
const HourlyBoardlist = () => {
    useEffect(() => {
        GetLiveHosts()
    }, [])

    const [liveUsers, setLiveUsers] = useState([]);
    const [liveUsersCopy, setLiveUsersCopy] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    const [allHosts, setAllHosts] = useState([]);
    const [allHostsCopy, setAllHostsCopy] = useState([]);
    const [liveHostLoading, setLiveHostLoading] = useState(true);
    const GetLiveHosts = async () => {
        try {
            setLiveHostLoading(true);
            const res = await ApiCallToken({
                params: userData.token,
                route: 'list-live-host',
                verb: 'GET',
            });
            console.log('Hellloooooooooooooo', res?.data)
            setLiveUsers(res?.data);
            setLiveUsersCopy(res?.data);
            setLiveHostLoading(false);
        } catch (error) {
            console.log('error in streamfresher getlviehost func', error);
        }
    };
    return (
        <View style={{ backgroundColor: "#fff" }}>
            <FlatList
                contentContainerStyle={{ padding: 8, flexGrow: 1 }}
                // scrollEnabled={true}
                keyExtractor={item => item.id}
                data={liveUsers}
                renderItem={(item, index) => (
                    <View style={{ ...styles.alignRow, justifyContent: "space-between", marginHorizontal: 10 }}>
                        <View style={styles.alignRow}>
                            <Text style={{ ...styles.id }}>{item?.index + 1}</Text>
                            <Image source={{ uri: item?.item?.image }}
                                resizeMode='contain'
                                style={{ ...styles.itemProfile }} />
                            <View style={{ marginTop: 8 }}>
                                <Text style={{ ...styles.name }}>{item.item.nick_name}</Text>
                                <ImageBackground source={{ uri: item?.item?.sender_level_image }}
                                    resizeMode='contain' style={{ ...styles.badge }}>
                                    {/* <Text style={{ ...styles.itemCoin,color:"red" }}>{item.item.coins}</Text> */}
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={{ ...styles.alignRow, marginTop: 30 }}>
                            <Image source={require("../../assets/images/profile/diamond.png")}
                                resizeMode='contain'
                                style={{ ...styles.diamond }} />
                            <Text style={{ ...styles.itemtext }}>{item?.item?.beans}</Text>
                            <Image source={require("../../assets/images/toparrow.png")}
                                resizeMode='contain'
                                style={{ ...styles.diamond }} />
                        </View>
                    </View>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    alignRow: {
        flexDirection: "row",
        marginTop: 10
    },
    itemContainer: {
    },
    id: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#000",
        marginTop: 15
    },
    itemProfile: {
        height: 50,
        width: 50,
        borderRadius: 60,
        marginHorizontal: 10
    },
    badge: {
        height: 20,
        width: 30
    },
    itemCoin: {
        color: "#fff",
        fontWeight: "500",
        alignSelf: "center",
        fontSize: 10, top: 4, left: 4

    },
    diamond: {
        height: 15,
        width: 15
    },
    itemtext: {
        color: "rgba(255, 164, 7, 1)",
        fontWeight: "800",
        fontSize: 15,
        marginHorizontal: 5,
    },
    name: {
        color: "#000",
        fontSize: 17
    }
})
export default HourlyBoardlist