import React from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {getLogInUser, sendEmail} from '../../lib/auth';
import {Colors} from '../assets/color';

export default function EmailConfirmModal({visible, setShowModal}) {
  const handleConfirm = async () => {
    let user = getLogInUser();
    // //TODO: loading바 보여주기

    const result = await sendEmail(user);

    //TODO: toast 띄우기
    Alert.alert(`${user?.email}로 인증 이메일이 다시 전송되었습니다. `);
    setShowModal(false);
  };
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable
        onPress={() => {
          setShowModal(false);
        }}
        style={styles.background}>
        <View style={styles.whiteBox}>
          <Text style={styles.buttonText}>이메일이 인증되지 않았습니다.</Text>
          <Text style={styles.buttonText}>
            인증 이메일을 다시 받으시겠습니까?
          </Text>
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
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: Colors.light.background,
    elevation: 2,
    borderRadius: 8,
    alignItems: 'center',
    padding: 12,
  },
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
