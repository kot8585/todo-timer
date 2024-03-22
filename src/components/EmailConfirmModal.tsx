import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {sendEmail} from '../../lib/auth';
import {Colors} from '../assets/color';
import useUserStore from '../store/userStore';
import CustomModal from './CustomModal';

export default function EmailConfirmModal({visible, setShowModal}) {
  const user = useUserStore(state => state.user);
  const handleConfirm = async () => {
    // //TODO: loading바 보여주기

    await sendEmail(user);

    //TODO: toast 띄우기
    Alert.alert(`${user?.email}로 인증 이메일이 다시 전송되었습니다. `);
    setShowModal(false);
  };
  return (
    <CustomModal visible={visible} setModalVisible={setShowModal}>
      <Text style={styles.buttonText}>이메일이 인증되지 않았습니다.</Text>
      <Text style={styles.buttonText}>인증 이메일을 다시 받으시겠습니까?</Text>
      <View style={styles.buttons}>
        <Pressable onPress={handleConfirm} style={styles.button}>
          <Text style={styles.buttonText}>확인</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setShowModal(false);
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>취소</Text>
        </Pressable>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    backgroundColor: Colors.light.buttonDefault,
    borderColor: Colors.light.borderDefault,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.light.bodyDefault,
  },
});
