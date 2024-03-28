import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';

import RootStack from './src/navigation/RootStack';

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
