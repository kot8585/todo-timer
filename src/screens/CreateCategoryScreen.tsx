import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import BorderBottomInput from '../components/ui/BorderBottomInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../assets/color';
import DefaultText from '../components/ui/DefaultText';
import useCategory from '../hooks/useCategory';
import useSelectedDateStore from '../store/selecteDateStore';
import {CreateCategoryType} from '../api/types';
import {useNavigation} from '@react-navigation/native';

export default function CreateCategoryScreen() {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const {createCategoryMutation} = useCategory(selectedDate);
  const navigation = useNavigation();
  const [form, setForm] = useState<CreateCategoryType>({
    title: '',
    color: '#8E94C5',
  });

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="chevron-left" size={28} style={styles.icon} />
        <Text style={styles.headerText}>카테고리</Text>
        <View />
      </View>
      <View style={styles.bodyContainer}>
        <BorderBottomInput
          placeholder="투두 입력"
          value={form.title}
          onChangeText={(text: string) => handleChangeText('title', text)}
        />
        <View style={styles.rowContainer}>
          <DefaultText text={'색상'} />
          <View style={styles.colorContainer}>
            <View style={styles.color} />
            <Icon name="menu-down" size={28} style={styles.icon} />
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => {
          createCategoryMutation.mutate(form);
          navigation.navigate('HomeScreen');
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>추가하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.light.bodyDefault,
    fontSize: 16,
    fontWeight: '700',
  },
  headerIcon: {
    color: Colors.light.bodyDefault,
  },
  bodyContainer: {
    paddingHorizontal: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderDefault,
    height: 48,
  },
  icon: {
    color: Colors.light.captionDefault,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    backgroundColor: '#ffc4c4',
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.light.bodyDefault,
  },
  button: {
    backgroundColor: Colors.light.buttonDefault,
    borderColor: Colors.light.borderDefault,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
