import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';
import {Colors} from '../assets/color';

type BackgroundColorButtonProps = {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
};

export default function BackgroundColorButton({
  text,
  onPress,
}: BackgroundColorButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.buttonDefault,
    borderColor: Colors.light.borderDefault,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#626262',
  },
});
