import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CategoryType} from '../api/types';
import {Colors} from '../assets/color';
import {formatTime} from '../utils/formatDateTime';

type CategoryProps = {
  //이거 클래스로 만들어서 하는게 편할거같은데
  category: CategoryType;
  handlePress?: (category: CategoryType) => void;
  showDotsIcon: boolean;
};

export default function Category({
  category,
  handlePress,
  showDotsIcon,
}: CategoryProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress ? () => handlePress(category) : () => {}}>
        <Text style={styles.categoryText}>{category.title}</Text>
      </Pressable>

      <View style={{flexGrow: 1}} />
      <Text style={styles.timeText}>{formatTime(category.executionTime)}</Text>
      {showDotsIcon && (
        <Pressable
          onPress={() => navigation.navigate('EditCategoryScreen', category)}>
          <Icon name="dots-vertical" size={18} style={styles.icon} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 2,
    alignItems: 'center',
  },
  categoryText: {fontSize: 16, fontWeight: '700', color: '#535353'},
  timeText: {
    color: Colors.light.captionDefault,
    fontSize: 14,
  },
  icon: {
    color: Colors.light.captionDefault,
  },
});
