import React, { useEffect, useState } from "react";
import { BackHandler, Image } from "react-native";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import AllIcons, { IconList } from "./AllIcons";
import { useNavigation } from "@react-navigation/native";
import { ApiCallToken } from "../Services/Apis";
import { useSelector } from "react-redux";
import LoadingBar from "./LoadingBar";

const DailyStar = ({onPressCross}) => {

  const navigation = useNavigation()
  const [dailyStarData ,setDailyStarData] = useState([])
  const userData = useSelector(state => state.auth.userData);


  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const DailyStarApi = async () => {
    
    try {
      const res = await ApiCallToken({
        params: userData?.token,
        route: 'daily/stars/current/status',
        verb: 'GET',
      });
       console.log('weekly star api data ', res)
       setDailyStarData(res.data)
    } catch (e) {
      console.log('error updateUserData func, home screen ', e.toString());
    }
  };


  useEffect(() => {
      DailyStarApi()
  }, [])


  
    return(
        <View style={styles.modalView}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              marginRight: 5,
              top: heightPercentageToDP(1),
            }}>
            <TouchableOpacity onPress={onPressCross}>
              <AllIcons name={IconList.Entypo} iconName="cross" size={22} color={'white'} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 20, color: 'white', marginVertical: 5 }}>
            Daily Star
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri : dailyStarData?.[0]?.star_level_image}}
              style={{width:60,height:15}}
              />
              
            <Text style={{color: 'white', marginHorizontal: 10, fontSize: 16}}>
              {dailyStarData?.[0]?.star_level} Star
            </Text>
          </View>
          <View style={{width: '40%', marginVertical: 10}}>
            <LoadingBar total={2000000} current={dailyStarData?.[0]?.value ?? 0} />
          </View>
         {/* {
           dailyStarData?.[0]?.value?
            <Text style={{color: 'red', fontWeight: '500'}}>{dailyStarData?.[0]?.value}/2000,000</Text>
            :
            <Text style={{color: 'red', fontWeight: '500'}}>0/200,0000</Text>
          
         } */}
          {/* <Text style={{ color: 'red', fontWeight: '500' }}>0/100,000</Text> */}
          <Text style={{ color: 'grey' }}>
            Sending gifts can help me collect stars
          </Text>
          <TouchableOpacity style={styles.CheckBtnbox} onPress={() => navigation.navigate('DailyStarGiftRecords')} >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>
              Check Gifts Record
            </Text>
          </TouchableOpacity>
          <Text style={{ color: 'grey', width: '85%', textAlign: 'center' }}>
            After reaching 5 star, receive a big beans bag on sending gifts of
            worth 200k beans every time
          </Text>
        </View>
        <View>
          <Image
            source={require('../../src/assets/images/coinBag.png')}
            style={styles.coinbag}
            resizeMode="contain"
          />
          <TouchableOpacity>
            <Text style={styles.eventTxt}>Event Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

export default DailyStar;

const styles = StyleSheet.create({
    modalView: {
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'space-between',
        height: heightPercentageToDP(50),
      },
    CheckBtnbox: {
        backgroundColor: '#EC3E33',
        marginVertical: 10,
        height: 34,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
      },
      coinbag: {
        height: 70,
        width: 70,
        marginBottom: 5,
      },
      eventTxt: {
        color: '#EC3E33',
        fontSize: 17,
        borderBottomWidth: 1,
        borderColor: '#EC3E33',
        fontWeight: '500',
        marginVertical: 15,
      },
})