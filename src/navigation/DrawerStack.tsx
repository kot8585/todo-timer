import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <Drawer.Navigator
      screenOptions={{drawerPosition: 'right', headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Category"
        component={CreateCategoryScreen}
        options={{title: '카테고리 추가'}}
      />
    </Drawer.Navigator>
  );
}
