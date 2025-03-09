import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { otpRequest, socialLoginRequest } from '../../Redux/Actions';
// import { TouchableOpacity } from 'react-native-gesture-handler/lib/typescript/components/touchables'

const SetupProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState()
  const [email,setEmail] = useState() 
  const route = useRoute().params;
  console.log("route", route)
  const { mobileNo, social_id } = route
  const [myLoginError, setMyLoginError] = useState(true);


  const socialLogin_Api = async () => {
     console.log("check", mobileNo, fullName, social_id, email)

     setMyLoginError(false);
    //  const currentUser = await GoogleSignin.getCurrentUser();
    //  console.log("current user", currentUser?.user)
     const params = {
        number : mobileNo,
        full_name : fullName,
        social_login_type: 'number',
        social_login_id : social_id,
        email: email
     }
      dispatch(otpRequest({params, setMyLoginError}))
      setMyLoginError(false)
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#2b303e' }}>
      <View style={{ width: "100%", marginTop: '27%', }}>
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 22, fontWeight: "400", color: 'white', marginTop: "3%" }}>Edit Profile</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: "3%" }}>
        <TextInput placeholder={'Full Name'} placeholderTextColor="grey"
          onChangeText={(value) => setFullName(value)}
          style={{
            marginTop: "6%", borderWidth: 1, borderColor: '#7B8FA1',
            backgroundColor: '#303749', borderRadius: 4, fontSize: 15, marginHorizontal: '7%', paddingLeft: '5%', color: "white"
          }}>
        </TextInput >
      </View>
      <View style={{ marginTop: "3%" }}>
        <TextInput placeholder={'Enter Your Email'} placeholderTextColor="grey"
          onChangeText={(value) => setEmail(value)}
          style={{
            marginTop: "6%", borderWidth: 1, borderColor: '#7B8FA1',
            backgroundColor: '#303749', borderRadius: 4, fontSize: 15, marginHorizontal: '7%', paddingLeft: '5%', color: "white"
          }}>
        </TextInput >
      </View>
      <View style={{ alignItems: "center", margin: '2%' }}>
        <TouchableOpacity 
          style={{ marginTop: 20, backgroundColor: "#ED2D21", padding: 10, borderRadius: 4, width: "86%" }} 
          onPress={()=>socialLogin_Api()}>
          <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 20, padding: 0, color: "white" }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SetupProfile

const styles = StyleSheet.create({})