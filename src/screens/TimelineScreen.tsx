import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import TimelineTable from '../components/TimelineTable';

export default function TimelineScreen() {
  return (
    <ScrollView style={styles.container}>
      <TimelineTable />
    </ScrollView>
  );
}

// dk
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
});
