import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
// import {
//     getProducts, //For fetching available products
//     requestPurchase, //For initiating in-app purchases
//     purchaseUpdatedListener, //For listening to purchase events
//     purchaseErrorListener, //For listening to purchase errors
//     finishTransaction  //For acknowledging a purchase
// } from "react-native-iap";
import ProductItem from "./components/productItem";
import { FlatList } from "react-native";
import { formatNumerWithK } from "../../../Services/GlobalFuntions";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Header from "../../reuseable_Component/Header";
import PaymentScreenHeader from "./components/screensHeader";
import { useDispatch, useSelector } from "react-redux";
import { buyBeansFromStripe } from "../../../Services/ApisCall/StripeApis";
import { updatedData } from "../../../Redux/Actions";

const Paywall = ({ packages }) => {
    // const currentProduct = useRef(null)
    // const [products, setProducts] = useState([]);
    // const [transactionComplete, setTransactionComplete] = useState(false)
    // const [isLoading, setLoading] = useState(true);
    // const userData = useSelector(state => state.auth.userData);
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     {transactionComplete && callApi()}
    // }, [transactionComplete])

    // useEffect(() => {
    //     console.log('pack deatail', packages?.map((item) => String(item?.id)))
    //    if(packages?.[0]) {
    //         const pkgsDataIds = packages?.map((item) => String(item?.id))
    //         console.log('hello', pkgsDataIds)
    //        fetchProducts(pkgsDataIds)
    //    }
    // }, [packages])

    // const fetchProducts = async (ids) => {
    //     try {
    //         if(ids?.[0]) {
    //             const productSkus = Platform.select({
    //                 android: ids
    //             })
    //             const result = await getProducts({ skus: productSkus });
    //             console.log("products", result?.map((item) => item?.productId))
    //             setProducts(result);
    //         }
    //         setLoading(false);
    //     }
    //     catch (error) {
    //         console.log('Error fetching products', error.toString())
    //         // Alert.alert('Error fetching products', error.toString())
    //     }
    // }

    // const callApi = async () => {
    //     const paramsBody = {beans_id: currentProduct.current}
    //     console.log('updating user beans <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>', currentProduct.current)
    //     // Alert.alert(`Payment of usd ${amount} is successful! `);
    //     const res = await buyBeansFromStripe({paramsBody, token: userData?.token})
    //     if(res?.data === 1) {
    //         UpdateUserData()
    //     }

    //     currentProduct.current = null
    // }

    // const UpdateUserData = async () => {
    //     dispatch(updatedData(userData));
    //   };


    // useEffect(() => {

    //     const purchaseUpdateSubscription = purchaseUpdatedListener(
    //         async (purchase) => {
    //             const receipt = purchase.transactionReceipt;

    //             if (receipt) {
    //                 try {
    //                     await finishTransaction({ purchase, isConsumable: true });
    //                 } catch (error) {
    //                     console.error("An error occurred while completing transaction", error);
    //                 }
    //                 notifySuccessfulPurchase(currentProduct.current);
    //             }
    //         });

    //     const purchaseErrorSubscription = purchaseErrorListener((error) =>
    //         console.error('Purchase error 2', currentProduct.current, error.message));


    //     return () => {
    //         purchaseUpdateSubscription.remove();
    //         purchaseErrorSubscription.remove();
    //     }


    // }, []);

    // const notifySuccessfulPurchase = () => {
    //     // callApi()
    //     setTransactionComplete(true)
    //     Alert.alert("Success", "Purchase successful", [
    //         {
    //             text: 'ok',
    //             // onPress: () => navigation.goBack()
    //         }
    //     ])
    // }

    // const handlePurchase = async (productId) => {
    //     currentProduct.current = productId
    //     // setProductId(productId)
    //     try {
    //         await requestPurchase({ skus: [productId] });
    //     } catch (error) {
    //         Alert.alert('Error occurred while making purchase')
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }



    

    return (
        <View style={styles.container}>
            {/* <View style={styles.header}>
                    <PaymentScreenHeader />
            </View>

            <View style={styles.mainContainer}>
               
            {
                !isLoading ?
                        <View style={{width: widthPercentageToDP(100), height: heightPercentageToDP(100), paddingHorizontal: 15}} >
                           {products?.[0] && <FlatList
                                data={products}
                                renderItem={({item}) => {
                                    return(
                                        <View style={[styles.userBeansStyle, {justifyContent: 'space-between'}]}>
                                            <View style={[styles.userBeansStyle, {marginVertical: 0}]}>
                                                <Image source={require('../../../assets/images/beanA.png')} style={{height: 20, width: 20}} />
                                                <Text style={{marginHorizontal: 10, fontSize: 16, color: 'black', fontWeight: '500'}}>{formatNumerWithK(parseInt(item?.name) ?? 0)}</Text>
                                            </View>
                                            <TouchableOpacity style={styles.priceStyle} onPress={() => handlePurchase(item?.productId)}>
                                                <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{item?.localizedPrice}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />}
                    </View>
                    :

                    <View style={styles.indicator}>
                        <ActivityIndicator size='large' />
                    </View>
            }

            </View> */}

        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
   
    header: {
        height: 200,
        width: '100%',
    },
    image: {
        resizeMode: 'cover',
        opacity: 0.5,
        height: 200,
        width: '100%',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    heading: {
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    subText: {
        fontSize: 18,
        color: '#333',
        overflow: 'hidden'
    },
    indicator: {
        justifyContent: 'center',
        flex: 1
    },
    userBeansStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    priceStyle: {
        backgroundColor: '#FFA800',
        padding: 5, 
        paddingHorizontal: 15,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Paywall;

