import * as React from 'react';
//-----------Navigation-----------//
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//----------Auth Screens----------//
import Splash from '../screens/auth_Screens/Splash';
import Login_With_SocialMedia from '../screens/auth_Screens/Login_With_SocailMedia';
import Login from '../screens/auth_Screens/Login';
import SignUp_With_Number from '../screens/auth_Screens/SignUp_With_Number';
import SignUp_With_Email from '../screens/auth_Screens/SignUp_With_Email';
import VerifiedCode from '../screens/auth_Screens/VerifiedCode';
import Password from '../screens/auth_Screens/Password';
import ForgotPass from '../screens/auth_Screens/ForgotPass';
import MailForResetPass from '../screens/auth_Screens/MailForResetPass';
import EnterOTP from '../screens/auth_Screens/EnterOTP';
import SetupProfile from '../screens/auth_Screens/SetupProfile';

const Stack = createNativeStackNavigator();

function Auth() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}>
      {/* Auth Screens to Be Stacked Here! */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen
        name="Login_With_SocialMedia"
        component={Login_With_SocialMedia}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp_With_Number" component={SignUp_With_Number} />
      <Stack.Screen name="SignUp_With_Email" component={SignUp_With_Email} />
      <Stack.Screen name="VerifiedCode" component={VerifiedCode} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="ForgotPassword" component={ForgotPass} />
      <Stack.Screen name="MailForResetPass" component={MailForResetPass} />
      <Stack.Screen name="EnterOTP" component={EnterOTP} />
      <Stack.Screen name="SetupProfile" component={SetupProfile} />
    </Stack.Navigator>
  );
}

export default Auth;
