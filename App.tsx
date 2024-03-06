import React from 'react';
import {StatusBar} from 'react-native';
import BottomTaps from './src/navigation/BottomTaps';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar />
      <BottomTaps />
    </NavigationContainer>
  );
}

export default App;
