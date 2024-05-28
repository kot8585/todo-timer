import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import BackgroundColorButton from './ui/BackgroundColorButton';
import DefaultText from './ui/DefaultText';

type ErrorProps = {
  handlePress: () => {};
  error: any;
};

export default function Error({handlePress, error}: ErrorProps) {
  const [showError, setShowError] = useState(false);

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
      <View>
        <Pressable onPress={() => setShowError(!showError)}>
          <Text>자세히 보기</Text>
        </Pressable>
        {showError && (
          <View>
            <Text>code: {error.code}</Text>
            <Text>message : {error.messsage}</Text>
            <Text>
              request : {error?.request?._method} & {error?.request?._perfKey}
            </Text>
            <Text>response: {error?.response?.data}</Text>
          </View>
        )}
      </View>
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
