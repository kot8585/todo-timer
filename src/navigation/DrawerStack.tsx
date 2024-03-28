import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <Drawer.Navigator screenOptions={{drawerPosition: 'left'}}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="Category"
        component={CreateCategoryScreen}
        options={{title: '카테고리 추가'}}
      />
    </Drawer.Navigator>
  );
}
