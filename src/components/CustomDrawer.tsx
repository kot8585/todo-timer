import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {signOut, withdraw} from '../../lib/auth';
import useUserStore from '../store/userStore';
import Toast from 'react-native-toast-message';

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
      <DrawerItem
        label="탈퇴하기"
        onPress={() => {
          withdraw();
          //백엔드로 데이터 삭제 요청
          clearUser();
          Toast.show({
            type: 'info',
            text1: '탈퇴가 완료되었습니다',
            position: 'top',
          });
        }}
      />
    </DrawerContentScrollView>
  );
}
