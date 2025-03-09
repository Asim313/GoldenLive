import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
//----------Vector Icons----------//
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { ApiCallToken } from '../../Services/Apis';
import { useSelector } from 'react-redux';
import Header from '../reuseable_Component/Header';
import AllIcons, { IconList } from '../../components/AllIcons';
// import {headings, black} from '../../utils/Styles';

const data = [
  {
    name: 'Bonuses',
    image: require('../../assets/images/earning1.png'),
    name1: '+20',
  },
  {
    name: 'Coins Withdraw',
    image: require('../../assets/images/earning1.png'),
    name1: '+20',
  },
  {
    name: 'Beans Withdraw',
    image: require('../../assets/images/earning1.png'),
    name1: '+20',
  },
  {
    name: 'Coins Exchange',
    image: require('../../assets/images/earning1.png'),
    name1: '+20',
  },
  {
    name: 'Others',
    image: require('../../assets/images/earning1.png'),
    name1: '+20',
  },
]


const Earning = () => {

  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

  const currentDate = new Date();

  // Define an array to store month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  
  // Extract the month name and year
  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const date = currentDate.getDate();

  const [Data, setData] = useState([])
  const userData = useSelector(state => state.auth.userData);
  const navigation = useNavigation()
  const GetHostRecord = async () => {
    try {
      const res = await ApiCallToken({
        params: userData.token,
        route: 'list/host/reward',
        verb: 'GET',
      });
      console.log("GetHostRecord", res?.data?.[0])
       setData(res?.data?.[0])
    } catch (error) {
      console.log('ERROR GetHostRecord ====>>>', error);
    }
  };

  useEffect(() => {
    GetHostRecord()
  }, [])
  
  return (
    <View style={styles.container}>
      <ScrollView>
       
          <View style={{ ...styles.header }}>
          <Header name={'Earning Records'} />
          </View>

          <View style={{ ...styles.view }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{ color: 'black', marginLeft: 15, marginTop: 5 }}>
               {date} {monthName} {year}
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate('Earning_Records');
                }}
                style={{
                  color: 'black',
                  marginRight: 15,
                  marginTop: 5,
                  backgroundColor: 'orange',
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 11,
                }}>
                Monthly Earnings Records
              </Text>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ ...styles.img}}
              source={require('../../assets/images/earning1.png')} />
            <Text style={{ fontSize: 47, fontWeight: '800', color: 'black', marginLeft: 5 }}>{userUpdatedData?.coins}</Text>
          </View> 
            <Text style={{ ...styles.txt1 }}>Expected Earnings</Text>
            <Text style={{ ...styles.txt2 }}>(This Month)</Text>
          </View>


          <View style={styles.View1}>
          <TouchableOpacity
            style={styles.View2}>
           <View style={{ height: 40, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ height: 20, width: 20, right: 5 }}
              source={require('../../assets/images/earning1.png')} />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>{userUpdatedData?.coins}</Text>
          </View>
          <Text style={{ color: 'black',fontSize: 13, }}>Actual Earning</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.View2}>
           <View style={{ height: 40, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ height: 20, width: 20, right: 5 }}
              source={require('../../assets/images/earning1.png')} />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>{Data?.total_time}h</Text>
          </View>
          <Text style={{ color: 'black',fontSize: 14, }}>Live Video Duration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.View2}>
           <View style={{ height: 40, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ height: 20, width: 20, right: 5 }}
              source={require('../../assets/images/earning1.png')} />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>{Data?.host_total_rewards}h</Text>
          </View>
          <Text style={{ color: 'black',fontSize: 13,}}>Valid Hours</Text>
          </TouchableOpacity>
        </View>


        <View style={{ alignItems: 'center' }}>
          <View style={{ height: 40, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ height: 20, width: 20, right: 5 }}
              source={require('../../assets/images/earning1.png')} />
            <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>+20</Text>
          </View>
          <Text style={{ color: 'black' }}>Estimate Basic Salary</Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity 
              onPress={() => {
                if(index === 1) {
                  navigation.navigate('WithdrawMain')
                } else if(index === 2) {
                  navigation.navigate('WithdrawMainBeans')
                } else if(index === 3) {
                  navigation.navigate('ExchangeCoins')
                }
              }}
              style={{}}>
              <View style={{ ...styles.list }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                    // flex: 1,
                  }}>
                  <Text style={{ ...styles.bns }}>{item?.name}</Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginRight: 10,
                      alignItems: 'center',
                      //   backgroundColor: 'blue',
                    }}>
                    <Image
                      source={item?.image}
                      style={{
                        height: 20,
                        width: 20,
                        alignSelf: 'center',
                        // backgroundColor: 'red',
                      }}
                      resizeMode={'stretch'}
                    />
               
                  <View style={{backgroundColor: 'orange', borderRadius: 50, padding: 2, justifyContent: 'center', alignItems: 'center'}}>

                    <AllIcons
                      name={IconList.AntDesign}
                      iconName={'right'}
                      size={16}
                      color={'white'}
                      />
                      
                  </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={{ right: 9, top: 10 }}>
          <Text style={{ ...styles.qut }}>
            How to calculate monthly earning?
          </Text>
          <Text style={{ ...styles.ans }}>
            orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text style={{ ...styles.qut }}>
            How to calculate the basic Salary?
          </Text>
          <Text style={{ ...styles.ans }}>
            orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </Text>
          <Text style={{ ...styles.qut }}>Note</Text>
          <Text style={{ ...styles.ans }}>
            orem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  View1: {
    height: 150,
    width: '100%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  View2: {
    height: '60%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10
  },
  header: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 0,
  },
  headertxt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
    marginLeft: '3%',
  },
  view: {
    // height: 200,
    // position: "absolute",
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingVertical: '5%',
  },
  img: {
    height: widthPercentageToDP(18),
    width: widthPercentageToDP(18),
    alignSelf: 'center',
    // marginTop: heightPercentageToDP(4),
    // backgroundColor: 'red',
  },
  txt1: {
    // ...headings.h7,
    color: '#fff',
    textAlign: 'center',
    top: 5,
  },
  txt2: {
    // ...headings.h8,
    color: '#C6C6C6',
    textAlign: 'center',
    top: 5,
  },
  list: {
    backgroundColor: 'transparent',
    height: 50,
    width: '100%',
    top: 10,
    marginBottom: '2%',
  },
  bns: {
    // ...headings.h7,
    // top: 10,
    left: 12,
    color: 'black',
  },
  num: {
    // ...headings.h6,
    color: '#fff',
    // top: 10,
    marginLeft: '2%',
  },
  qut: {
    color: '#fff',
    fontSize: 16,
    left: 16,
    color: 'black',
  },
  ans: {
    left: 17,
    color: '#a8c0ff',
    fontSize: 13,
  },
});

export default Earning;