import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyScreen from '../screens/MyScreen';
import TimelineScreen from '../screens/TimelineScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function BottomTaps() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          title: '타임라인',
          tabBarIcon: ({color, size}) => (
            <Icon name="view-timeline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My"
        component={MyScreen}
        options={{
          title: '마이',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
