import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {Colors} from '../../assets/color';

type DefaultTextProps = {
  text: string;
  style?: TextStyle;
};

export default function DefaultText({text, style}: DefaultTextProps) {
  return <Text style={(styles.text, style)}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: Colors.light.bodyDefault,
    fontSize: 16,
  },
});
