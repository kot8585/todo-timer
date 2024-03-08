import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LogInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BottomTaps from './BottomTaps';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{title: '회원가입'}}
      />
      <Stack.Screen
        name="BottomTaps"
        component={BottomTaps}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
