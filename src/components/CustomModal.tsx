import React, {ReactNode} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import {Colors} from '../assets/color';

type CustomModalProps = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
  children: ReactNode;
  position: 'middle' | 'under';
};

export default function CustomModal({
  visible,
  setModalVisible,
  children,
  position,
}: CustomModalProps) {
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable
        onPress={() => {
          setModalVisible(false);
        }}
        style={
          position === 'middle'
            ? styles.middleBackground
            : styles.underBackground
        }>
        <Pressable
          onPress={() => {}}
          style={
            position === 'middle' ? styles.middleWhiteBox : styles.underWhiteBox
          }>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  middleBackground: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underBackground: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  middleWhiteBox: {
    minWidth: 300,
    backgroundColor: Colors.light.background,
    elevation: 2,
    borderRadius: 8,
    alignItems: 'center',
    padding: 12,
  },
  underWhiteBox: {
    width: '100%',
    backgroundColor: Colors.light.background,
    elevation: 2,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: 'flex-end',
    paddingBottom: 8,
  },
});
