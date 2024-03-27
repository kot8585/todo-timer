import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TodoListScreen from './TodoListScreen';
import TimelineScreen from './TimelineScreen';
import CalendarModal from '../components/CalendarModal';
import useSelectedDateStore from '../store/selecteDateStore';
import 'dayjs/locale/ko'; // 한국어 locale을 추가
import dayjs from 'dayjs';
import TimerScreen from './TimerScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../assets/color';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>LOGO</Text>
        <Pressable
          onPress={() => {
            setShowCalendarModal(true);
          }}>
          <Text style={styles.headerText}>
            {dayjs(selectedDate).locale('ko').format('YYYY년 M월 D일(ddd)')}
          </Text>
        </Pressable>
        <Icon name="menu" size={24} style={styles.icon} />
      </View>
      <Tab.Navigator
        initialRouteName="TodoList"
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {
            justifyContent: 'space-between',
          },
          tabBarIndicatorStyle: {
            borderBottomColor: 'black', // 선택된 탭의 borderBottom 색상
            borderBottomWidth: 2, // 선택된 탭의 borderBottom 두께
          },
        }}
        sceneContainerStyle={{backgroundColor: 'white'}}>
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="TodoList" component={TodoListScreen} />
        <Tab.Screen name="Timeline" component={TimelineScreen} />
      </Tab.Navigator>
      <CalendarModal
        visible={showCalendarModal}
        setModalVisible={setShowCalendarModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  headerText: {
    color: '#222222',
    fontSize: 16,
  },
  icon: {
    color: Colors.light.iconDefault,
  },
});
