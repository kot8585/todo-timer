import {View, Text} from 'react-native';
import React from 'react';

type ErrorProps = {
  message: string;
};

export default function Error({message}: ErrorProps) {
  return (
    <View>
      <Text>Error</Text>
    </View>
  );
}
