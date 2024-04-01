import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';

import RootStack from './src/navigation/RootStack';
import {getLogInUser} from './lib/auth';
import useUserStore from './src/store/userStore';
import DrawerStack from './src/navigation/DrawerStack';

const queryClient = new QueryClient();
function App(): React.JSX.Element {
  const user = useUserStore(state => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLogInUser();
      console.log('user 정보: ', user);
      useUserStore.setState({user: user});
    };

    fetchUser();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar />
        {user ? <DrawerStack /> : <RootStack />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
