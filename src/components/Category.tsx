import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {TodoType} from '../../api/types';
import WriteTodoModal from './WriteTodoModal';

type CategoryProps = {
  category: {
    idx: number;
    userUid: string;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    data: TodoType[];
  };
};

export default function Category({category}: CategoryProps) {
  const [showTodoModal, setShowTodoModal] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 7,
        }}>
        <Pressable
          onPress={() => {
            console.log('클릭되었지: ', category.idx);
            setShowTodoModal(true);
          }}>
          <View style={{width: 5, backgroundColor: category.color}} />
          <Text style={{fontSize: 16, fontWeight: '600'}}>
            {category.title}
          </Text>
        </Pressable>
        <Text>0h 00m</Text>
      </View>
      <WriteTodoModal
        visible={showTodoModal}
        setShowTodoModal={setShowTodoModal}
        categoryIdx={category.idx}
      />
    </View>
  );
}
