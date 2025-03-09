import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CoverPicProfile from '../reuseable_Component/CoverPicProfile';
import {headings, primaryColor, white} from '../../utils/Styles';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../reuseable_Component/CustomButton';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function Profile() {
  const userData = useSelector(state => state.auth.useData);
  console.log('sfdjska ', userData)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  ///////////Temporary Object for the Options
  const [profileGrid, setProfileGrid] = useState([
    {
      id: require('../../assets/images/topup1.png'),
      name: 'Top UP',
    },
    {
      id: require('../../assets/images/earnings.png'),
      name: 'Earnings',
      nav: 'Apply_Form',
    },
    {
      id: require('../../assets/images/tasks.png'),
      name: 'My Tasks',
    },
    {
      id: require('../../assets/images/vip.png'),
      name: 'VIP',
    },
    {
      id: require('../../assets/images/Group.png'),
      name: 'Store',
    },
    {
      id: require('../../assets/images/bag.png'),
      name: 'My Bag',
    },
    {
      id: require('../../assets/images/mylevel.png'),
      name: 'My Level',
    },
    {
      id: require('../../assets/images/badge.png'),
      name: 'My Badge',
      nav: 'Offical_Talent',
    },
    {
      id: require('../../assets/images/help.png'),
      name: 'Help',
    },
    {
      id: require('../../assets/images/profile.png'),
      name: 'Edit Profile',
    },
    {
      id: require('../../assets/images/invites.png'),
      name: 'My Invites',
    },
    {
      id: require('../../assets/images/history.png'),
      name: 'Ticket History',
    },
    {
      id: require('../../assets/images/settings.png'),
      name: 'Settings',
      nav: 'Privacy',
    },
  ]);

  ////////////Component for Grid in item
  const GridItem = props => {
    useEffect(() => {
      console.log('Here is the data------', userData);
    }, []);

    // const brands = props.item.brands
    return (
      <TouchableOpacity
        onPress={() => {
          // props.item.name == 'Settings'
          //   ? dispatch({
          //       type: 'LOGOUT',
          //     })
          //   : console.log('AnyOtherButton');
          props.item.nav ? navigation.navigate(props?.item?.nav) : null;
        }}
        style={styles.gridItem}>
        <View
          style={{
            height: widthPercentageToDP(20),
            width: widthPercentageToDP(20),
            overflow: 'hidden',
            backgroundColor: '#303749',
            borderRadius: 10,
          }}>
          <Image
            source={props.item.id}
            resizeMode="stretch"
            style={{
              //   marginRight: 5,
              //   height: widthPercentageToDP(20),
              //   width: widthPercentageToDP(20),
              //   margin: 10,
              alignSelf: 'center',
              //   padding: widthPercentageToDP(10),
            }}
          />
        </View>
        <Text style={{...headings.h7, color: white, alignSelf: 'center'}}>
          {props.item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.ScrollView}>
        <CoverPicProfile
          iconleft="chevron-back"
          iconright="ellipsis-horizontal"
        />
        <View style={{...styles.profileElipse}}>
          <View style={{...styles.image}}>
            <Image
              source={require('../../assets/images/dp.jpg')}
              resizeMode="contain"
              style={{flex: 1}}
            />
          </View>
          <View style={styles.profileInfo}>
            <View>
              <Text style={{...headings.h4b, color: white}}>John Doe</Text>
              <Text style={{...headings.h6M, color: 'grey'}}>NewYork, USA</Text>
            </View>
            <View>
              <CustomButton
                bgStyle={{
                  width: widthPercentageToDP(24),
                  height: widthPercentageToDP(8),
                  alignSelf: 'center',
                  backgroundColor: '#EC3E33',
                  borderRadius: 80,
                  //   alignItems: 'center',
                }}
                title="Follow"
                titleStyle={{...headings.h6, color: white}}
              />
            </View>
          </View>
        </View>
        <View style={{...styles.profileElipse}}>
          <Text
            style={{
              ...headings.h7,
              color: 'grey',
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <CustomButton
            bgStyle={{...styles.creditButton, backgroundColor: '#EC3E33'}}
            title="300K Beans"
            titleStyle={{...headings.h7, color: white}}
            icon={
              <Image
                source={require('../../assets/images/bean.png')}
                // resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'center',
                  marginRight: 5,
                }}
              />
            }
          />
          <CustomButton
            bgStyle={{...styles.creditButton, backgroundColor: '#1AB846'}}
            title="700K Coins"
            titleStyle={{...headings.h7, color: white}}
            icon={
              <Image
                source={require('../../assets/images/coin.png')}
                // resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'center',
                  marginRight: 5,
                }}
              />
            }
          />
          <CustomButton
            bgStyle={{...styles.creditButton, backgroundColor: '#27B0FF'}}
            title="Withdraw"
            titleStyle={{...headings.h7, color: white}}
          />
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            marginTop: heightPercentageToDP(2),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={styles.profileContent}>
            <Text style={{...headings.h5b, color: white}}>500</Text>
            <Text style={{...headings.h8, color: 'grey'}}>POSTS</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.profileContent}>
            <Text style={{...headings.h5b, color: white}}>600K</Text>
            <Text style={{...headings.h8, color: 'grey'}}>FOLLOWERS</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.profileContent}>
            <Text style={{...headings.h5b, color: white}}>60</Text>
            <Text style={{...headings.h8, color: 'grey'}}>FOLLOWINGS</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  ScrollView: {
    // backgroundColor: 'blue',
  },
  image: {
    height: widthPercentageToDP(30),
    width: widthPercentageToDP(30),
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderWidth: 8,
    borderColor: primaryColor,

    // position: 'absolute',
  },
  profileElipse: {
    // borderWidth: widthPercentageToDP(2),
    marginHorizontal: widthPercentageToDP(3),
    top: widthPercentageToDP(-10),
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  profileInfo: {
    alignSelf: 'center',
    marginLeft: '2%',
    marginTop: '5%',
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  creditButton: {
    width: widthPercentageToDP(28),
    height: widthPercentageToDP(8),
    alignSelf: 'center',

    borderRadius: 80,
    //   alignItems: 'center',
  },
  verticalDivider: {
    height: heightPercentageToDP(10),
    borderWidth: 1,
    width: widthPercentageToDP(0),
    borderColor: white,
  },
  profileContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP(20),
  },
  gridItem: {
    height: widthPercentageToDP(30),
    width: widthPercentageToDP(20),

    marginHorizontal: '3%',
    paddingTop: '5%',
  },
});
