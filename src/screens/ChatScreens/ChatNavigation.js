import {View, Text} from 'react-native';
import React from 'react';
//-----------Navigation-----------//
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chats from './Chats';
const Stack = createNativeStackNavigator();

export default function ChatNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={'Chats'}
      screenOptions={{
        headerShown: false,
        // animation: 'slide_from_bottom',
      }}>
      <Stack.Screen name="Chats" component={Chats} />
    </Stack.Navigator>
  );
}
