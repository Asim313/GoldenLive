import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ChatNavigation from '../screens/ChatScreens/ChatNavigation';
import Apply_Form from '../screens/home_screens/Apply_Form';
import Earning_Records from '../screens/home_screens/Earning_Records';
import Earning from '../screens/home_screens/Earnings';
import EditProfile from '../screens/home_screens/EditProfile';
import Home from '../screens/home_screens/Home';
import NewProfile from '../screens/home_screens/NewProfile';
import Offical_Talent from '../screens/home_screens/Official_Talent';
import Record from '../screens/stream_Screen/Record';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import StreamModal from '../screens/reuseable_Component/StreamModal';
import MainWealthClass from '../screens/wealthClass/MainWealthClass';
import Details from '../screens/withdrawScreens/Details';
import WithdrawMain from '../screens/withdrawScreens/WithdrawMain';
import WithdrawMethod from '../screens/withdrawScreens/WithdrawMethod';
import ExchangeCoins from '../screens/home_screens/ExchangeCoins';
import Stream_Party_Room from '../screens/stream_Screen/Stream_Party_Room';
import StreamMulti from '../screens/stream_Screen/Stream_Multi';
import WithdrawMainBeans from '../screens/withdrawScreens/WithdrawMainBeans';
import AllIcons, { IconList } from '../components/AllIcons';
const HomeScreenStack = createNativeStackNavigator();

function HomeScreenStackScreen() {
  return (
    <HomeScreenStack.Navigator screenOptions={{headerShown: false}}>
      <HomeScreenStack.Screen name="Home" component={Home} />
    </HomeScreenStack.Navigator>
  );
}

const ProfileScreenStack = createNativeStackNavigator();
function ProfileScreenStackScreen() {
  return (
    <ProfileScreenStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileScreenStack.Screen name="Profile" component={NewProfile} />
      <ProfileScreenStack.Screen name="EditProfile" component={EditProfile} />

      <ProfileScreenStack.Screen name="Earnings" component={Earning} />
      <ProfileScreenStack.Screen name="ExchangeCoins" component={ExchangeCoins} />
      <ProfileScreenStack.Screen name="Apply_Form" component={Apply_Form} />
      <ProfileScreenStack.Screen name="WithdrawMain" component={WithdrawMain} />
      <ProfileScreenStack.Screen name="WithdrawMainBeans" component={WithdrawMainBeans} />
      {/* <ProfileScreenStack.Screen name="Store" component={Gifts01} /> */}
      <ProfileScreenStack.Screen
        name="MainWealthClass"
        component={MainWealthClass}
      />
      <ProfileScreenStack.Screen name="Details" component={Details} />
      <ProfileScreenStack.Screen
        name="WithdrawMethod"
        component={WithdrawMethod}
      />

      {/* <ProfileScreenStack.Screen name="Settings" component={Settings} /> */}
      <ProfileScreenStack.Screen
        name="Offical_Talent"
        component={Offical_Talent}
      />
      <ProfileScreenStack.Screen
        name="Earning_Records"
        component={Earning_Records}
      />
    </ProfileScreenStack.Navigator>
  );
}

const PasswordScreenStack = createNativeStackNavigator();

function PasswordScreenStackScreen() {
  return (
    <PasswordScreenStack.Navigator screenOptions={{headerShown: false}}>
      <PasswordScreenStack.Screen name="SplashScreen" component={Record} />
    </PasswordScreenStack.Navigator>
  );
}

const StreamScreenStack = createNativeStackNavigator();
function StreamScreenStackScreen() {
  return (
    <StreamScreenStack.Navigator screenOptions={{headerShown: false}}>
      {/* <StreamScreenStack.Screen name="Home" component={Stream_Party_Room} /> */}
      <StreamScreenStack.Screen name="Home" component={StreamMulti} />
    </StreamScreenStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  const messageArray = useSelector(state => state.homeRed.unseenMessages);
  const userUpdatedData = useSelector(state => state.homeRed.userUpdatedData);

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarBackground: () => (
          <View style={{flex: 1}}>
          
          </View>
        ),
        tabBarStyle: {
          position: 'absolute',
          elevation: 3,
          backgroundColor: 'white',
          height: 60,
          paddingTop: 10,
          ...styles.shadow,
          // borderRadius: 12,
          elevation: 15,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreenStackScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {/* source={require('../assets/images/bottom_nav/Home.png')} */}
              <Image
                source={ focused ? require('../assets/images/bottom_nav/homeFocused.png') : require('../assets/images/bottom_nav/Home.png')}
                style={{
                  height: 20,
                  width: 20,
                  // tintColor: focused ? "#E93025" : "white",
                }}
                focused={focused}
              />
              <Text
                style={{
                  color: focused ? 'black' : 'black',
                  fontSize: 10,
                  fontFamily: 'Lato-Regular',
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Moment"
        component={StreamScreenStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={focused ? require('../assets/images/bottom_nav/momentFocused.png') :  require('../assets/images/bottom_nav/moment.png')}
                style={{
                  height: 20,
                  width: 20,
                  // tintColor: focused ? "#E93025" : "white",
                }}
              />

              <Text
                style={{
                  color: focused ? 'black' : 'black',
                  fontSize: 10,
                }}>
                  Party
                {/* Audio */}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={StreamModal}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {/* <View  style={{
                  height: 35,
                  width: 45,
                  borderRadius: 5,
                  bottom: 5,
                  backgroundColor :'skyblue',
                  justifyContent: 'center',
                  alignItems: 'center'
                  // tintColor: focused ? "#E93025" : "white",
                }}>
                  <AllIcons iconName={'video-camera'} name={IconList.FontAwesome} size={20} color={'white'} />
              </View> */}
              <Image
                source={require('../assets/images/bottom_nav/Live.png')}
                style={{
                  height: 35,
                  width: 35,
                  bottom: 5,
                  // tintColor: focused ? "#E93025" : "white",
                }}
              />
         
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Messages"
        component={ChatNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
           {userUpdatedData?.total_message_count !== null && userUpdatedData?.total_message_count > 0 &&
            <View style={{ backgroundColor: 'red', borderRadius: 50, padding: 2, position: 'absolute', zIndex: 1, top: -5, right: 5}}>
                <Text style={{color: 'white', fontSize: 7, marginHorizontal: 3}}>{userUpdatedData?.total_message_count ?? ''}</Text>
              </View>}
            <Image
                source={focused ? require('../assets/images/bottom_nav/messageFocused.png') : require('../assets/images/bottom_nav/message.png')}
                style={{
                  height: 20,
                  width: 20,
                  // tintColor: focused ? "#E93025" : "white",
                }}
              />
              <Text
                style={{
                  color: focused ? 'black' : 'black',
                  fontSize: 10,
                  width: '20%'
                }}>
                Message
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={ProfileScreenStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              {/* <Image source={require('../assets/images/info.png')}
                                style={{ height: 30, width: 30, tintColor: focused ? "#5499C7" : "#154360", }}
                                focused={focused}
                            /> */}
              <Image
                source={focused ? require('../assets/images/bottom_nav/mineFocused.png') : require('../assets/images/bottom_nav/Mine.png')}
                style={{
                  height:  20,
                  width:  18,
                  // tintColor: focused ? "#E93025" : "white",
                }}
              />
              <Text
                style={{
                  color: focused ? 'black' : 'black',
                  fontSize: 10,
                  width: '20%'
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 5,
      height: 16,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 16,
  },
});
