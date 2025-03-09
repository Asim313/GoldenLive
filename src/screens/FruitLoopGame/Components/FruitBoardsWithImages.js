import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import AnimatedLottieView from 'lottie-react-native';
import { useDispatch, useSelector } from "react-redux";
import { ApiCallToken, ApiUpdateUserData } from "../../../Services/Apis";
import { useNavigation } from "@react-navigation/native";
import database from '@react-native-firebase/database';
import { updateUserData } from "../../../Redux/Actions";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRef } from "react";
import RbSheetComponent from "../../reuseable_Component/RbSheetComponent";
import RecordCardComponent from "./RecordCardComponent";

const FruitBoardsWithImages = ({ winner, toggle, startAnimation, winnerApiStatus }) => {
    const recordRef = useRef()
    const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);
    const [totalBeans, setTotalBeans] = useState(userUpdatedData?.beans)
    const dispatch = useDispatch()
    const [beans, setBeans] = useState(userUpdatedData?.beans)

    const navigation = useNavigation()
    const userData = useSelector(state => state.auth.userData);
    const [winnerC, setWinnerC] = useState(null)
    const [isBiddingOn, setIsBiddingOn] = useState(true);

    const [showWinBar, setShowWinBar] = useState(false)
    const [winnerData, setWinnerData] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [data, setData] = useState([
        {
            fruitImage: require('../images/strawberry.png'), id: 1, card: 'A', pot: 0, you: 0, bg:
                require('../images/bg1.png'), vector: require('../images/vector.png')
        },

        {
            fruitImage: require('../images/melon.png'), id: 2, card: 'B', pot: 0, you: 0, bg:
                require('../images/bg2.png'), vector: require('../images/vector.png')
        },

        {
            fruitImage: require('../images/orange.png'), id: 3, card: 'C', pot: 0, you: 0, bg:
                require('../images/bg3.png'), vector: require('../images/vector.png')
        },
    ])

    const getUpdatedUserData = async () => {
        try {
            const res = await ApiUpdateUserData({
                params: userData.token,
                paramsBody: userData.user.id,
                route: 'user/updated-data',
                verb: 'POST',
            });
            dispatch(updateUserData(res?.data));
            setTotalBeans(res?.data?.beans)
        } catch (e) {
            console.log('error updateUserData func, Fruitboards screen ', e.toString());
        }
    };


    const updateBid = async (index, value) => {
        let cardVal = 'A'
        if (index === 0) { cardVal = 'A' }
        else if (index === 1) { cardVal = 'B' }
        else if (index === 2) { cardVal = 'C' }
        const paramsBody = {
            user_id: userData?.user?.id,
            card: cardVal,
            amount: value,
        };
        // console.log('params', paramsBody, cardVal)
        try {
            const res = await ApiCallToken({
                params: userData.token,
                paramsBody: paramsBody,
                route: 'userbit',
                verb: 'POST',
            });
           
            if (res?.message) {
                ToastAndroid.showWithGravityAndOffset(
                    res?.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    0,
                    0,
                );
            }
        } catch (error) {
            console.log('FruitBoardsWithImages in userbit', error);
        }
        
    };

    useEffect(() => {
        // console.log("winnneeeeeeeeeeeeee", winnerApiStatus)
        { winnerApiStatus === true && winnerApi() }
        { winnerApiStatus === true ? setIsBiddingOn(false) : setIsBiddingOn(true)}
    }, [winnerApiStatus])

    const winnerApi = async () => {
        try {
            const currentDate = new Date();
                    const res = await ApiCallToken({
                        params: userData.token,
                        route: 'get-winner',
                        verb: 'GET',
                    });
                       console.log("winner Api", res)
                       database()
                       .ref(`/Games/FruitLoopGame/winner`)
                       .update({
                        card: res?.code,
                        date: currentDate?.toString()
                       })
                    let winnerCard = 0
                    if (res?.code === 'A') {
                        winnerCard = 8.840
                    }
                    else if (res?.code === 'B') {
                        winnerCard = 9.500
                    }
                    else if (res?.code === 'C') {
                        winnerCard = 8.660
                    }
                    if (res?.code && winnerCard) {
                        setWinnerC(res?.code)
                        startAnimation(winnerCard)
                        const winPrice = data?.filter((item) => item?.card === res?.code)
                        // console.log('rrrrrrrrrrrr', winPrice, winPrice?.[0]?.you, winPrice?.[0]?.you * 2.9 )
                         {winPrice?.[0]?.you > 0 && setWinnerData(winPrice?.[0]?.you * 2.9)}
                    }
        } catch (error) {
            console.log('HwinnerApi code', error);
        }
    };



    const updateFruitBidFromFirebase = (datas) => {
        setData(data => data.map((item, index) => {
            if (item?.card === datas?.card) {
                return { ...item, pot: datas?.value };
            }
            return item;
        }));
    };

    const updateFrsdauitBet = (id, value) => {
        if (parseInt(totalBeans) >= parseInt(value)) {
            updateBid(id, value)
            setTotalBeans(totalBeans => parseInt(totalBeans) - parseInt(value))
            setData(data.map((item, index) => {
                if (parseInt(index) === parseInt(id)) {
                    return { ...item, you: parseInt(item?.you) + parseInt(value) };
                }
                return item;
            }));
        }
        else {
            ToastAndroid.showWithGravityAndOffset(
                'You dont have enough beans',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                0,
            );
        }
    };


    useEffect(() => {
        // getWinner()
        getOldBid()
        getBidding()
        return () => {
            database().ref(`/Games/FruitLoopGame/Bidding`).off();

        }
    }, [])

    const getOldBid = () => {
        database()
            .ref('/Games/FruitLoopGame/Bidding/A')
            .once('value')
            .then(snapshot => {
                { snapshot?.val() && updateFruitBidFromFirebase(snapshot?.val()) }
            });

        database()
            .ref('/Games/FruitLoopGame/Bidding/B')
            .once('value')
            .then(snapshot => {
                { snapshot?.val() && updateFruitBidFromFirebase(snapshot?.val()) }
            });

        database()
            .ref('/Games/FruitLoopGame/Bidding/C')
            .once('value')
            .then(snapshot => {
                { snapshot?.val() && updateFruitBidFromFirebase(snapshot?.val()) }
            });
    }

    const getBidding = () => {
        database()
            .ref(`/Games/FruitLoopGame/Bidding`)
            .on('child_changed', snapshot => {
                // console.log('Bidding Value', snapshot?.val())
                snapshot?.val() && updateFruitBidFromFirebase(snapshot?.val())
            });
    }



    const resetBidValues = () => {

        database()
            .ref('/Games/FruitLoopGame/status')
            .update({
            value: 0,
            card: 0
            })

        database()
            .ref(`/Games/FruitLoopGame/Bidding/A`)
            .update({
                value: 0
            })

        database()
            .ref(`/Games/FruitLoopGame/Bidding/B`)
            .update({
                value: 0
            })

        database()
            .ref(`/Games/FruitLoopGame/Bidding/C`)
            .update({
                value: 0
            })

        setData(data.map((item, index) => {
            return { ...item, you: 0, pot: 0 };
        }));
    };

    const ref = React.useRef();

    const [playCount, setPlayCount] = useState(0);

    useEffect(() => {
        // console.log("winner", winner)
        { winner === true && playAnim() }
        setPlayCount(0)
    }, [winner])

    const onAnimationFinish = () => {
        setPlayCount(prevCount => prevCount + 1);
        if (playCount < 2) {
            ref.current.play();
        }
        else {
            setShowWinBar(false)
            setWinnerData(null)
            ref.current?.pause();
            resetBidValues()
            toggle()
        }
    };

    const playAnim = () => {
        getUpdatedUserData()
        setShowWinBar(true)
        ref.current?.play();
    }


    return (
        <View>


            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    // console.log('item', item)
                    return (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 5 }}>

                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={styles.imageWithDashboardStyle}>
                                    <Image style={styles.fruitImageSize}
                                        source={item?.fruitImage} />
                                </View>
                                <TouchableOpacity onPress={() => setSelectedIndex(index)} >

                                    <View style={{ marginTop: '10%', justifyContent: 'center', alignItems: 'center', borderWidth: selectedIndex === index ? 1 : 0, borderRadius: 12, borderColor: 'white' }}>
                                        <Image style={styles.dashboardSize}
                                            source={item?.bg} />

                                        <View style={{ width: '100%', height: '40%', position: 'absolute', zIndex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                            {(item?.card === winnerC && winner) &&
                                                <AnimatedLottieView
                                                    ref={ref}
                                                    loop={false}
                                                    autoPlay={true}
                                                    iterations={4}
                                                    onAnimationFinish={onAnimationFinish}
                                                    style={{ height: 150, width: 150, position: 'absolute', zIndex: 5 }}
                                                    source={require('../images/winnerstrips.json')}
                                                />
                                            }
                                            <Image
                                                style={{ width: '100%', height: '100%' }}
                                                source={item?.vector}
                                            />
                                            <View style={{ position: 'absolute', zIndex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: heightPercentageToDP(1.2), borderBottomWidth: 1 }}>POT: {item?.pot}</Text>
                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: heightPercentageToDP(1.2) }}>You: {item?.you}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )

                }}
                contentContainerStyle={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 5 }}
                horizontal={false}
                listKey={'offlineUsers'}
                keyExtractor={(item) => item.id}
            />

    {(showWinBar && winnerData > 0) &&
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1,backgroundColor:"pink" }}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.2)', 'rgba(0, 0, 0, 0.7)', 'rgba(255, 255, 255, 0.2)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: 30, width: "100%", borderRadius: 5, flexDirection: 'row',  alignItems: 'center',justifyContent:"center" }}
            >
                
                <Icon name='crown' size={15} style={{ color: '#E2DC76' ,marginRight:12}} />
                    <Text style={{ color: '#E2DC76' }}>Right on! You win </Text>
                    <Text style={{color:"#A42650"}}>{winnerData}</Text>
                    <Text style={{ color: '#E2DC76' }}> beans</Text>
               
            </LinearGradient>
        </View>
        }

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 30, marginHorizontal: 5 }}>

                <TouchableOpacity onPress={() => { }} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={[styles.imageWithDashboardStyle, { width: 75, height: 26 }]}
                        source={require('../images/beans.png')}
                    />
                    <View style={{ position: 'absolute', left: 26 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 11 }}>{totalBeans}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                 // onPress={() => {navigation.navigate('Topup')}}
                >
                    <Image style={[styles.imageWithDashboardStyle, { width: 70, height: 26 }]}
                        source={require('../images/topup.png')}
                    />
                </TouchableOpacity>


                <TouchableOpacity onPress={() => isBiddingOn === true ? updateFrsdauitBet(selectedIndex, 100) : console.log("flaseeeeeeeeeeeeeeee")}>
                    <Image style={styles.imageWithDashboardStyle}
                        source={require('../images/100.png')}

                    />

                </TouchableOpacity>

                <TouchableOpacity onPress={() => isBiddingOn === true ? updateFrsdauitBet(selectedIndex, 1000) : console.log("flaseeeeeeeeeeeeeeee")}>
                    <Image style={styles.imageWithDashboardStyle}
                        source={require('../images/1k.png')}

                    />

                </TouchableOpacity>

                <TouchableOpacity onPress={() => isBiddingOn === true ? updateFrsdauitBet(selectedIndex, 10000) : console.log("flaseeeeeeeeeeeeeeee")}>
                    <Image style={styles.imageWithDashboardStyle}
                        source={require('../images/10k.png')}

                    />

                </TouchableOpacity>

                <TouchableOpacity onPress={() => isBiddingOn === true ? updateFrsdauitBet(selectedIndex, 100000) : console.log("flaseeeeeeeeeeeeeeee")}>
                    <Image style={styles.imageWithDashboardStyle}
                        source={require('../images/100k.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => recordRef.current.open()}>
                    <Image style={styles.imageWithDashboardStyle}
                        source={require('../images/show-record.png')}
                    />
                </TouchableOpacity>
            </View>

            <RbSheetComponent
              view={<RecordCardComponent onCrossPress={() => recordRef.current.close()} />}
              refUse={recordRef}
              close={false}
              height={heightPercentageToDP(50)}
            />


        </View>
    )
}

export default FruitBoardsWithImages;

const styles = StyleSheet.create({
    fruitImageSize: {
        height: 30,
        width: 30
    },
    imageWithDashboardStyle: {
        // backgroundColor: '#FFF7C5', 
        // height: heightPercentageToDP(4), 
        // aspectRatio: 1, 
        // borderRadius: 50, 
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',

        // paddingVertical: 20 
    },
    dashboardSize: {
        height: heightPercentageToDP(17),
        width: widthPercentageToDP(22)
    }

})