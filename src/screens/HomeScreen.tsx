import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../assets/color';
import CalendarModal from '../components/CalendarModal';
import MainTap from '../navigation/MainTap';
import useSelectedDateStore from '../store/selecteDateStore';

export default function HomeScreen() {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name="menu" size={24} style={styles.icon} />
        </Pressable>
        <Pressable
          onPress={() => {
            setShowCalendarModal(true);
          }}>
          <Text style={styles.headerText}>
            {dayjs(selectedDate).locale('ko').format('YYYY년 M월 D일(ddd)')}
          </Text>
        </Pressable>
        <View />
      </View>
      <MainTap />
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
