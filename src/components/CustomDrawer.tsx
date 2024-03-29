import {View, Text, Alert} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="로그아웃"
        onPress={() => {
          Alert.alert('로그아웃');
        }}
      />
    </DrawerContentScrollView>
  );
}
