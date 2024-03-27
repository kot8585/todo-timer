import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {CategoryType} from '../../api/types';

type CategoryProps = {
  //이거 클래스로 만들어서 하는게 편할거같은데
  category: CategoryType;
  handlePress?: (category: CategoryType) => void;
};

export default function Category({category, handlePress}: CategoryProps) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 7,
        }}>
        <Pressable
          onPress={handlePress ? () => handlePress(category) : () => {}}>
          <View style={{width: 5, backgroundColor: category.color}} />
          <Text style={{fontSize: 16, fontWeight: '600'}}>
            {category.title}
          </Text>
        </Pressable>
        <Text>0h 00m</Text>
      </View>
    </View>
  );
}
