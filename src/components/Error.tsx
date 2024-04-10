import React from 'react';
import {StyleSheet, View} from 'react-native';
import BackgroundColorButton from './ui/BackgroundColorButton';
import DefaultText from './ui/DefaultText';

type ErrorProps = {
  handlePress: () => {};
};

export default function Error({handlePress}: ErrorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <DefaultText text={'에러가 발생하였습니다'} />
        <DefaultText text={'잠시 후 다시 시도해주세요'} />
      </View>
      <BackgroundColorButton
        text="다시 시도"
        onPress={handlePress}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  textContainer: {
    alignItems: 'center',
  },
  button: {
    width: 100,
  },
});
