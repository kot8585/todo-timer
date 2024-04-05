import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ValidateMessageType = {
  message: string;
};

export default function ValidateMessage({message}: ValidateMessageType) {
  return (
    <View style={styles.container}>
      <Icon name="info-outline" size={16} style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 2,
  },
  icon: {
    marginTop: 3,
    color: '#f94141',
  },
  message: {
    color: '#f94141',
  },
});
