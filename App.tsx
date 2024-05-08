import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Toast, {InfoToast, ToastConfig} from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from 'react-query';
import {getLogInUser} from './lib/auth';
import {Colors} from './src/assets/color';
import DrawerStack from './src/navigation/DrawerStack';
import RootStack from './src/navigation/RootStack';
import useUserStore from './src/store/userStore';
import CodePush from 'react-native-code-push';

export const toastConfig: ToastConfig = {
  info: props => (
    <InfoToast
      {...props}
      style={{borderLeftWidth: 0, height: 45}}
      text1Style={{
        fontSize: 14,
        color: Colors.light.bodyInActive,
        fontWeight: '400',
        textAlign: 'center',
      }}
    />
  ),
};
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
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default CodePush(App);
