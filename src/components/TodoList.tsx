import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {getCategoryAndTodos} from '../../api/category';

type TodoListProps = {
  uid: string | undefined;
};

export default function TodoList({uid}: TodoListProps) {
  //react query로 데이터 가져와야돼.
  const result = useQuery('todos', getCategoryAndTodos);
  const {data, error, isLoading} = result;

  if (isLoading) {
    return <Text>로딩 중...</Text>;
  }
  if (error) {
    return <Text>에러 발생</Text>;
  }
  if (!data) {
    return <Text>아직 데이터 없음</Text>;
  }

  return (
    <SectionList
      sections={data}
      keyExtractor={index => index.title}
      renderItem={({item}) => (
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#DADADA',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 16}}>{item.title}</Text>
          {/* 시간은 어떻게 보여주지!!! */}
        </View>
      )}
      renderSectionHeader={({section}) => (
        <View
          style={{
            flexDirection: 'row',
            gap: 7,
          }}>
          <View style={{width: 5, backgroundColor: section.color}} />
          <Text style={{fontSize: 16, fontWeight: '600'}}>{section.title}</Text>
        </View>
      )}
      style={styles.container}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 15,
  },
});
