import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import {Pressable, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TodoList from '../components/TodoList';
import TimelineScreen from './TimelineScreen';
import CalendarModal from '../components/CalendarModal';
import useSelectedDateStore from '../store/selecteDateStore';
import 'dayjs/locale/ko'; // 한국어 locale을 추가
import dayjs from 'dayjs';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Pressable
        onPress={() => {
          setShowCalendarModal(true);
        }}>
        <Text>
          {dayjs(selectedDate).locale('ko').format('YYYY년 M월 D일(ddd)')}
        </Text>
      </Pressable>
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
      <CalendarModal
        visible={showCalendarModal}
        setModalVisible={setShowCalendarModal}
      />
    </SafeAreaView>
  );
}
