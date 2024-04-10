import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../assets/color';

type BackgroundColorButtonProps = {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  buttonStyle?: StyleProp<ViewStyle>;
};

export default function BackgroundColorButton({
  text,
  onPress,
  buttonStyle,
}: BackgroundColorButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle]}>
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
