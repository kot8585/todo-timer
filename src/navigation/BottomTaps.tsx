import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyScreen from '../screens/MyScreen';
import TimelineScreen from '../screens/TimelineScreen';

const Tab = createBottomTabNavigator();

export default function BottomTaps() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="타임라인" component={TimelineScreen} />
      <Tab.Screen name="마이" component={MyScreen} />
    </Tab.Navigator>
  );
}
