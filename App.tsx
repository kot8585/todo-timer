import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import RootStack from './src/navigation/RootStack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
