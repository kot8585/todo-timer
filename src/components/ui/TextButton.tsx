import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';

type TextButtonProps = {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
};

export default function TextButton({text, onPress}: TextButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 14,
    color: '#949494',
    textAlign: 'center',
  },
});
