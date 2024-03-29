import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors} from '../../assets/color';

// interface UnderlineInputProps extends TextInputProps {
//   ref: any;
// }

function BorderBottomInput({...props}, ref) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      {...props}
      ref={ref}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      style={styles.input(isFocused)}
      placeholderTextColor={'#6B6B6B'}
    />
  );
}

const styles = StyleSheet.create({
  input: isFocused => ({
    borderBottomWidth: 1,
    borderBottomColor: isFocused
      ? Colors.light.borderActive
      : Colors.light.borderDefault,
    fontSize: 16,
    height: 42,
    opacity: 0.9,
  }),
});

export default React.forwardRef(BorderBottomInput);
