import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import EditCategoryScreen from '../screens/EditCategoryScreen';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <Drawer.Navigator
      screenOptions={{drawerPosition: 'left', headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="CreateCategoryScreen"
        component={CreateCategoryScreen}
        options={{title: '카테고리 추가'}}
      />
      <Drawer.Screen
        name="EditCategoryScreen"
        component={EditCategoryScreen}
        options={{drawerItemStyle: {height: 0}}}
      />
    </Drawer.Navigator>
  );
}
