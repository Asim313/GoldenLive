import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import React, {useState,useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import React from 'react';

import EventRulePagw from '../dailyStar/dailyStarComponents/EventRulePagw';
import StarsComponet from '../dailyStar/dailyStarComponents/StarsComponet';
import Get1MGift from '../dailyStar/dailyStarComponents/Get1MGift';
import {ApiCallToken} from '../../Services/Apis';
import { useSelector } from 'react-redux';
import {
  black,
  headings,
  secondaryColor,
  white,
} from '../../utils/Styles';

const DailyStar = ({navigation}) => {


  const userData = useSelector(state => state.auth);

  console.log('check data come from here userDATA============><><<>',userData)


  const [Regions, setRegions] = useState([]);


 
  const dailyStarApiData = async() => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'daily/stars',
        verb: 'GET',
      });
      setRegions(res)
      // console.log('check data of data star come from api  ',res)
    } catch (error) {
      console.log('Editprofile, countries func', error);
    }
  };


  useEffect(() => {
   dailyStarApiData()
  }, [])


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.topview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={white}></Ionicons>
        </TouchableOpacity>
        <Text style={{...headings.h3, color: 'white'}}>GoldenLive Daily Star</Text>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground source={require('../../assets/images/DailyStarAssests/background.jpeg')}>
        <View style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 40,
            }}>
            <Image
              source={require('../../assets/images/DailyStarAssests/StarUpperPic.png')}
              style={{height: 190, width: 170}}
            />
          </View>
          <TouchableOpacity style={{justifyContent:'center',alignItems:"center"}}>
          <EventRulePagw Sentence={'Event Rule Page >>'} />
        </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 45,
              marginTop: '5%',
            }}>
            <Text style={{fontWeight: '500'}}>
              Increase You Salary Bouns By Practicipating in Daily Star and Win
              Free Thousands of Gems
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <StarsComponet apiData = {Regions}/>
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/DailyStarAssests/Group-927.png')}
            style={{height: 120, width: 245}}
          />
        </View>

        <Get1MGift />

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              fontStyle: 'normal',
              color: 'black',
            }}>
            BROADCASTER REWARD
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 20,
              fontStyle: 'normal',
              color: 'black',
            }}>
            GENIE ENTRANCE EFFECT
          </Text>
        </View>
        <TouchableOpacity style={{justifyContent:'center',alignItems:"center",marginVertical:10}}>
          <EventRulePagw Sentence={'More Details >>'} />
      </TouchableOpacity>
          </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyStar;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
    paddingVertical: 12,
  },
  topview: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#F80D0B',
    paddingBottom: 10,
  },
});
