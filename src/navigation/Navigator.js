import * as React from 'react';
//-----------Navigation-----------//
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//----------Bottom Navigation----------//
import BottomNavigation from '../navigation/BottomNavigation';
import {useSelector} from 'react-redux';
import Call from '../screens/home_screens/Call';
import Event from '../screens/EventScreens/Event';
import Eventrule from '../screens/EventScreens/Eventrule';
import Settings from '../screens/home_screens/Settings';
import BlockedList from '../screens/home_screens/BlockedList';
import Security from '../screens/home_screens/Security';
import Inbox from '../screens/home_screens/Inbox';
import Privacy from '../screens/home_screens/Privacy';
import Room_Effects from '../screens/home_screens/Room_Effects';
import Language from '../screens/home_screens/Language';
import Faq from '../screens/home_screens/Faq';
import ConnectWithUs from '../screens/home_screens/ConnectWithUs';
import AboutUs from '../screens/home_screens/AboutUs';
import PeopleLive from '../screens/home_screens/PeopleLive';
import Store from '../screens/Store/Store';
import OtherUserProfile from '../screens/home_screens/OtherUserProfile';
import MyTasksMain from '../screens/myTasks/MyTasksMain';
import TalentLevelExplaination from '../screens/levelExplanation/TalentLevelExplanation';
import Apply_Form from '../screens/home_screens/Apply_Form';
import MyBadgeMain from '../screens/myBadge/MyBadgeMain';
import ComingSoon from '../screens/reuseable_Component/ComingSoon';
import AgencyID from '../screens/home_screens/AgencyID';
import MyBagMain from '../screens/myBag/MyBagMain';
import MyInvites from '../screens/myInvites/MyInvitesMain';
import Followers from '../screens/home_screens/Followers';
import Follow from '../screens/home_screens/Follow';
import AudioCallHost from '../screens/home_screens/AudioCallHost';
import AudioCallUsers from '../screens/home_screens/AudioCallUsers';
import LuckyDraw from '../screens/home_screens/LuckyDraw';
import UserProfile from '../screens/home_screens/UserProfile';
import Terms from '../screens/home_screens/Terms';
import ProfileModalStyle from '../screens/reuseable_Component/ProfileModalStyle';
import RecordsMain from '../screens/records/RecordsMain';
import Topup from '../screens/home_screens/Topup';
import TopUsers from '../screens/records/TopUsersView';
import TopupAgent from '../screens/TopupScreens/TopupAgent';
import TopupDetails from '../screens/TopupScreens/TopupDetails';
import TopTalent from '../screens/records/TopTalentsView';
import WeeklyStar from '../screens/records/WeeklyStarView';
import Pk from '../screens/home_screens/Pk';
import InamGhar from '../screens/myTasks/InamGhar';
import SearchView from '../screens/reuseable_Component/SearchView';
import WealthLevelExplaination from '../screens/levelExplanation/WealthLevelExplanation';
import HomePage from '../screens/Agora/HomePage';
import HostPage from '../screens/Agora/HostPage';
import AudiencePage from '../screens/Agora/AudiencePage';
import WithdrawBind2 from '../screens/home_screens/WithDrawBind2';
import WithdrawBind from '../screens/home_screens/WithdrawBind';
import Exchange from '../screens/withdrawScreens/Exchange';
import Mylevel from '../screens/home_screens/Mylevel';
import Pending from '../screens/home_screens/Pending';
import Help from '../screens/reuseable_Component/Help';
import ChatTest from '../screens/ChatScreens/ChatTest';
import Rules from '../screens/FruitLoopGame/Components/rules';
import DailyStarGiftRecords from '../components/dailyStar/DailyStarGiftRecords';
import DailyRules from '../components/dailyStar/DailyRules';
import ViewersScreen from '../screens/records/weeklyTopGift&Gifter/ViewersScreen';
import Testing from '../Testing/testing';
import Empty from '../screens/Agora/Empty';
import UploadData from '../screens/spotLightScreens/UploadData';
import SpotLightScreen from '../screens/spotLightScreens/SpotLightScreen';
import SpotLightTalent from '../screens/spotLightScreens/SpotLightTalent';
import SpotLightHome from '../screens/spotLightScreens/SpotLightHome';
import Frames from '../screens/Store/Frames';
import AgencyRecords from '../screens/records/AgencyRecords';
import Rnfetchblob from '../Testing/Rnfetchblob';
import SvgaTesting from '../Testing/svgstesting';
import SocketTesting from '../Testing/socketTesting';
import PanResponderAnination from '../Testing/panResponderAnination';
import MultiCallHost from '../screens/Agora/multiChannel/MultiCallHost';
import MultiCallUsers from '../screens/Agora/multiChannel/MultiCallUsers';
import UserLevels from '../screens/home_screens/userLevels';
import SocketDilawar from '../Testing/SocketDilawar';
import BeansPackage from '../screens/beansPackage/BeansPackage';
import CheckOutScreen from '../screens/beansPackage/CheckoutScreen';
import MainBeansBuyScreen from '../screens/beansPackage/MainBeansBuyScreen';
// import InAppPurchase from '../screens/beansPackage/InAppPurchase';
import LuckyTopUp from '../screens/TopupScreens/LuckyTopUp';
import LuckyGiftRecord from '../components/LuckyGiftRecord';
import GameRecord from '../components/GameRecord';
import BaishunGames from '../screens/baishunGames/BaishunGames';
import ProfileViewerMainScreen from '../screens/profileViewer/ProfileViewerMainScreen';

const Stack = createNativeStackNavigator();

function HomeNavigations() {
  const token = useSelector(state => state.auth.userToken);
  return (
    <Stack.Navigator
      initialRouteName={token ? 'BottomNavigation' : 'Auth'}
      screenOptions={{
        headerShown: false,
        // animation: 'slide_from_bottom',
      }}>
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      {/* <Stack.Screen name="InAppPurchase" component={InAppPurchase} /> */}
      <Stack.Screen name="LuckyTopUp" component={LuckyTopUp} />
      <Stack.Screen name="MainBeansBuyScreen" component={MainBeansBuyScreen} />
      <Stack.Screen name="CallScreen" component={Call} />
      <Stack.Screen name="ProfileViewerMainScreen" component={ProfileViewerMainScreen} />
      <Stack.Screen name="BaishunGames" component={BaishunGames} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="LuckyGiftRecord" component={LuckyGiftRecord} />
      <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      <Stack.Screen name="BeansPackage" component={BeansPackage} />
      <Stack.Screen name="Exchange" component={Exchange} />
      <Stack.Screen name="BlockedList" component={BlockedList} />
      <Stack.Screen name="Pending" component={Pending} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Room_Effects" component={Room_Effects} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Topup" component={Topup} />
      <Stack.Screen name="EventInfo" component={Event} />
      <Stack.Screen name="ConnectWithUs" component={ConnectWithUs} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="PeopleLive" component={PeopleLive} />
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="MyTask" component={MyTasksMain} />
      <Stack.Screen name="MyBagMain" component={MyBagMain} />
      <Stack.Screen name="MyInvites" component={MyInvites} />
      <Stack.Screen name="MyBadgeMain" component={MyBadgeMain} />
      <Stack.Screen name="ComingSoon" component={ComingSoon} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="GameRecord" component={GameRecord} />
      <Stack.Screen name="Follow" component={Follow} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
      <Stack.Screen name="ProfileModalStyle" component={ProfileModalStyle} />
      <Stack.Screen name="Homepage" component={HomePage} />
      <Stack.Screen name="WithdrawBind2" component={WithdrawBind2} />
      <Stack.Screen name="WithdrawBind" component={WithdrawBind} />
      <Stack.Screen name="MyLevel" component={Mylevel} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="ViewersScreen" component={ViewersScreen} />
      <Stack.Screen name="Testing" component={Testing} />
      <Stack.Screen name="SvgaTesting" component={SvgaTesting} />
      <Stack.Screen
        name="PanResponderAnination"
        component={PanResponderAnination}
      />
      <Stack.Screen name="SocketTesting" component={SocketTesting} />
      <Stack.Screen name="Rnfetchblob" component={Rnfetchblob} />
      <Stack.Screen name="Empty" component={Empty} />
      {/* <Stack.Screen name="DeepAr" component={DeepAr} /> */}

      <Stack.Screen name="SpotLightScreen" component={SpotLightScreen} />
      <Stack.Screen name="UploadData" component={UploadData} />
      <Stack.Screen name="SpotLightTalent" component={SpotLightTalent} />
      <Stack.Screen name="UserLevels" component={UserLevels} />

      <Stack.Screen name="SpotLightHome" component={SpotLightHome} />

      <Stack.Screen
        options={{headerShown: false}}
        name="HostPage"
        component={HostPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AudiencePage"
        component={AudiencePage}
      />
      <Stack.Screen
        name="TalentLevelExplaination"
        component={TalentLevelExplaination}
      />
      <Stack.Screen
        name="WealthLevelExplaination"
        component={WealthLevelExplaination}
      />
      {/* <Stack.Screen name="WealthLevelExplaination" component={LuckyDraw} /> */}
      <Stack.Screen name="SocketDilawar" component={SocketDilawar} />
      <Stack.Screen name="AudioCallHost" component={AudioCallHost} />
      <Stack.Screen name="AudioCallUsers" component={AudioCallUsers} />
      <Stack.Screen name="MultiCallHost" component={MultiCallHost} />
      <Stack.Screen name="MultiCallUsers" component={MultiCallUsers} />
      <Stack.Screen name="LuckyDraw" component={LuckyDraw} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="TopTalent" component={TopTalent} />
      <Stack.Screen name="RecordsMain" component={RecordsMain} />
      <Stack.Screen name="AgencyRecords" component={AgencyRecords} />
      <Stack.Screen name="WeeklyStar" component={WeeklyStar} />
      <Stack.Screen name="TopUsers" component={TopUsers} />
      <Stack.Screen name="Apply_Form" component={Apply_Form} />
      <Stack.Screen name="AgencyID" component={AgencyID} />
      <Stack.Screen name="Pk" component={Pk} />
      <Stack.Screen name="InamGhar" component={InamGhar} />
      <Stack.Screen name="SearchUser" component={SearchView} />
      <Stack.Screen
        name="DailyStarGiftRecords"
        component={DailyStarGiftRecords}
      />
      <Stack.Screen name="DailyRules" component={DailyRules} />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="Eventrule" component={Eventrule} />
      <Stack.Screen name="TopupDetails" component={TopupDetails} />
      <Stack.Screen name="TopupAgent" component={TopupAgent} />
      <Stack.Screen name="ChatTest" component={ChatTest} />
      <Stack.Screen name="rules" component={Rules} />
      <Stack.Screen name="frame" component={Frames} />
      {/* Auth Screen */}
    </Stack.Navigator>
  );
}

export default HomeNavigations;
