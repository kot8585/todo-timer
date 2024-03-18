import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Colors} from '../assets/color';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: Colors.light.background},
      }}>
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
        name="ConfirmEmailScreen"
        component={ConfirmEmailScreen}
        options={{title: '이메일 인증'}}
      />
      <Stack.Screen
        name="ChangeEmailScreen"
        component={ChangeEmailScreen}
        options={{title: '이메일 변경'}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
