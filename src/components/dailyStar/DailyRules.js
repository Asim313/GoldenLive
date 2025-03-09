import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import EventRulePage from '../dailyStar/dailyStarComponents/EventRulePage';
import {black, headings, secondaryColor, white} from '../../utils/Styles';
import SentenceView from './dailyStarComponents/SentenceView';
import TargetFlatList from './dailyStarComponents/TargetFlatList';
import {ApiCallToken} from '../../Services/Apis';
import {useSelector} from 'react-redux';
import DaysVipCom from './dailyStarComponents/DaysVipCom';
const DailyRules = ({navigation}) => {
  const userData = useSelector(state => state.auth.userData);
  const [data, setData] = useState([]);


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


  const dailyStarApiData = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'daily/stars',
        verb: 'GET',
      });
      setData(res);
      // console.log('check data of data star come from api  ', res);
    } catch (error) {
      console.log('Editprofile, countries func', error);
    }
  };

  useEffect(() => {
    dailyStarApiData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.topview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={white}></Ionicons>
        </TouchableOpacity>
        <Text style={{...headings.h3, color: 'white'}}>
          GoldenLive Daily Rules
        </Text>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={require('../../assets/images/DailyStarAssests/Background2.jpeg')}>
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
            {/* <View style={{justifyContent:'center',alignItems:"center"}}> */}
            {/* <EventRulePage /> */}
            {/* </View> */}
            {/* <View
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
        </View> */}
            <SentenceView
              dotIcon="dot-single"
              sentenceProp="Collect Star and become a star streamer!"
            />
            {/* Daily Star Event is exclusively designed for our talented streamers on GoldenLive */}
            <SentenceView
              dotIcon="dot-single"
              sentenceProp="Daily Star Event is exclusively designed for our talented streamers on GoldenLive"
            />
            <SentenceView
              dotIcon="dot-single"
              sentenceProp="Finish different levels of tasks every day, you will win rowards according to your gift collection."
            />
            {/* Finish different levels of tasks every day, you will win rowards according to your gift collection. */}
            {/* </View> */}
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                marginVertical: 20,
                marginLeft: 20,
              }}>
              <EventRulePage marginLeftt={60} Sentence = {'Detailed Rules'}/>
           </TouchableOpacity>
            <View style={{marginVertical:10}}>
            <SentenceView sentenceProp="Event runs from 00.00UTC (05:00 am PST/05:30 am PST) to 23:59 UTC every day, streamers can collect stars by receiving as many gifts as they can during their live stream." />
            </View>
            

            <View
              style={{
                marginHorizontal: '6%',
                borderRadius: 10,
                borderColor: 'red',
                borderWidth: 1,
              }}>
              <TargetFlatList data={data} />
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <EventRulePage marginLeftt={60} Sentence={'Host Reward'} />
        </TouchableOpacity>

          <View style={{alignItems: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'yellow',
                width: 320,
                height: 162,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'red',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'red',
                  width: 300,
                  height: 150,
                  alignItems: 'center',
                  borderRadius: 10,
                  top: 5,
                }}>
                <DaysVipCom />
                <DaysVipCom />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <EventRulePage Sentence = {'User Reward'} marginLeftt={60} />
         </TouchableOpacity>
          <View style={{alignItems: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'yellow',
                width: 320,
                height: 162,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'red',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'red',
                  width: 300,
                  height: 150,
                  alignItems: 'center',
                  borderRadius: 10,
                  top: 5,
                }}>
                <DaysVipCom />
                <DaysVipCom />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      {/* <Text>DailyRules</Text> */}
    </SafeAreaView>
  );
};

export default DailyRules;

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
    backgroundColor: '#E3A542',
    paddingBottom: 10,
  },
});
