import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RootStack from './src/navigation/RootStack';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar />
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
