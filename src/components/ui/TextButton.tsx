import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';

type TextButtonProps = {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
};

export default function TextButton({text, onPress}: TextButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.container} hitSlop={10}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#7f7f7f',
    textAlign: 'center',
  },
});
