import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

type LoadingProps = {
  loading: boolean;
};

export default function LoadingModal({loading}: LoadingProps) {
  return (
    <Modal visible={loading} transparent={true}>
      <View style={styles.modalBackground}>
        <ActivityIndicator size="large" style={styles.loadingBar} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.147)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBar: {
    elevation: 2,
    alignItems: 'center',
  },
});
