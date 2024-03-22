import React, {ReactNode} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import {Colors} from '../assets/color';

type CustomModalProps = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
  children: ReactNode;
};

export default function CustomModal({
  visible,
  setModalVisible,
  children,
}: CustomModalProps) {
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable
        onPress={() => {
          setModalVisible(false);
        }}
        style={styles.background}>
        <View style={styles.whiteBox}>{children}</View>
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
});
