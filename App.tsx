import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
