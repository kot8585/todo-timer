import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {CategoryType} from '../../api/types';
import {Colors} from '../assets/color';

type CategoryProps = {
  //이거 클래스로 만들어서 하는게 편할거같은데
  category: CategoryType;
  handlePress?: (category: CategoryType) => void;
};

export default function Category({category, handlePress}: CategoryProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress ? () => handlePress(category) : () => {}}>
        <Text style={styles.categoryText}>{category.title}</Text>
      </Pressable>
      <View style={{flexGrow: 1}} />
      <Text style={styles.timeText}>0h 00m</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 7,
    paddingTop: 24,
    paddingBottom: 2,
  },
  categoryText: {fontSize: 16, fontWeight: '700', color: '#535353'},
  timeText: {
    color: Colors.light.captionDefault,
  },
});
