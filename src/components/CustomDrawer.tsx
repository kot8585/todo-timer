import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {signOut} from '../../lib/auth';
import useUserStore from '../store/userStore';

export default function CustomDrawer(props) {
  const clearUser = useUserStore(state => state.clearUser);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="로그아웃"
        onPress={() => {
          signOut();
          clearUser();
        }}
      />
    </DrawerContentScrollView>
  );
}
