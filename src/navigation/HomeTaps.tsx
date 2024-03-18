import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TodoList from '../components/TodoList';
import TimelineScreen from '../screens/TimelineScreen';

const Tab = createMaterialTopTabNavigator();

export default function HomeTaps() {
  return (
    <Tab.Navigator
      initialRouteName="TodoList"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarItemStyle: {width: 100},
        tabBarStyle: {backgroundColor: 'powderblue'},
      }}>
      <Tab.Screen name="TodoList" component={TodoList} />
      <Tab.Screen name="Timeline" component={TimelineScreen} />
    </Tab.Navigator>
  );
}
