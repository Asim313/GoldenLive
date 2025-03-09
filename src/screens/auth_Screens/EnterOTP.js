import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
const InputScreenOTP = ({navigation}) => {

    const [otpInput, setOtpInput] = useState()
    const [confirmData, setConfirmData] = useState()
    const [socialId,setSocailId] = useState([])
    const route = useRoute().params;
    const { mobileNo } = route

    const Sendotp = async () => {
        try {
            console.log("phone number", mobileNo)
            const responce = await auth().signInWithPhoneNumber(mobileNo)
            console.log("sendOTP function console", responce)
            setConfirmData(responce)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        Sendotp() 
       
    }, [])


    const SubmitOTP = async () => {
        try {
             responce =  await confirmData.confirm(otpInput); 
             console.log("check data responce ",responce, responce?.user?.uid)
             navigation.navigate('SetupProfile',{ mobileNo: mobileNo,social_id:responce?.user?.uid});
             setSocailId(responce)

             console.log("check data come or not in socal_id ",responce)
            // Alert.alert('Success', 'Phone number authentication successful');
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-verification-code') {
              Alert.alert('Error', 'Incorrect verification code');
            } else if (error.code === 'auth/credential-already-in-use') {
              Alert.alert('Error', 'This phone number has already been confirmed');
            } else {
              Alert.alert('Error', 'Failed to confirm verification code');
            }
          
        }
    }
   
    const CheckDara=()=>{
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#2b303e' }}>
            <View style={{ width: "100%", marginTop: '18%', }}>
                <View >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Image style={{ height: 92, width: 102 }} source={require('../assests/pic.png')} /> */}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Text style={{
                            fontSize: 35,
                            color: 'white',
                            fontWeight: '600'
                        }}>Golden</Text>
                        <Text style={{
                            fontSize: 35,
                            color: '#ED2D21',
                            fontWeight: '400'
                        }}>Live</Text>
                    </View>
                    <Text style={{ marginHorizontal: '36%', fontSize: 24, fontWeight: "300", color: '#FFFFFF', marginTop: "5%" }}>OTP Code</Text>

                </View>
                <View style={{ width: "100%", marginTop: "12%" }}>
                    <Text style={{ marginLeft: "8%", color: "#FFFFFF", fontSize: 17, fontWeight: "500" }}>
                        Enter Code
                    </Text>
                </View>
            </View>
            <View>
                <TextInput placeholder={'Enter OTP Code*'} placeholderTextColor="grey"
                    onChangeText={(value) => setOtpInput(value)}
                    style={{
                        marginTop: "3%", borderWidth: 1, borderColor: '#7B8FA1',
                        backgroundColor: '#303749', borderRadius: 4, fontSize: 15, marginHorizontal: '7%', paddingLeft: '5%', color: "white"
                    }}>
                </TextInput>
            </View>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={{ marginTop: 20, backgroundColor: "#5A6889", padding: 10, borderRadius: 4, width: "86%" }} 
                    onPress={() => SubmitOTP()}>
                    <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 20, padding: 0, color: "white" }}>NEXT</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "5%" }}>
                <Text style={{ color: "white", fontSize: 17, fontWeight: "500" }}>
                    Don't Received Code?
                </Text>
                <TouchableOpacity onPress={() => Sendotp()}>
                    <Text style={{ color: "#ED2D21", fontSize: 17, fontWeight: "500" }}> Resend</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: "5%" }} onPress={()=>CheckDara()}>
                <Text style={{ color: "#ED2D21", fontSize: 15, fontWeight: "400" }}>
                    Edit Phone Number
                </Text>
            </TouchableOpacity>
        </View>
    )
}
export default InputScreenOTP
const styles = StyleSheet.create({})