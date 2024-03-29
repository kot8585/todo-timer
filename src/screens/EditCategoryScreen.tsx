import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../assets/color';
import DefaultText from '../components/ui/DefaultText';
import useCategory from '../hooks/useCategory';
import useSelectedDateStore from '../store/selecteDateStore';
import dayjs from 'dayjs';
import CustomModal from '../components/CustomModal';

export default function EditCategoryScreen() {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const route = useRoute();
  const navigation = useNavigation();
  const category = route.params;
  const {updateCategoryMutation, deleteCategoryMutation} =
    useCategory(selectedDate);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const [form, setForm] = useState({
    title: category?.title,
    color: category?.color,
  });

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  const handleUpdate = () => {
    updateCategoryMutation.mutate({
      ...form,
      idx: category?.idx,
    });
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteCategoryMutation.mutate(category?.idx);
    navigation.goBack();
  };

  const handleEnd = () => {
    updateCategoryMutation.mutate({
      ...form,
      idx: category?.idx,
      endDate: dayjs().format('YYYY-MM-DD'),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-left" size={28} style={styles.icon} />
        </Pressable>
        <Text style={styles.headerText}>카테고리</Text>
        <Pressable onPress={handleUpdate}>
          <DefaultText text="확인" />
        </Pressable>
      </View>
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.textInput(category?.color)}
          placeholderTextColor={'#6B6B6B'}
          value={form.title}
          onChangeText={(text: string) => handleChangeText('title', text)}
        />
        <View style={styles.rowContainer}>
          <DefaultText text={'색상'} />
          <View style={styles.colorContainer}>
            <View style={styles.color(form.color)} />
            <Icon name="menu-down" size={28} style={styles.icon} />
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={handleEnd} style={styles.button}>
          <Text style={styles.buttonText}>종료하기</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setShowDeleteConfirmModal(true);
          }}
          style={styles.button}>
          <Text style={styles.buttonRedText}>삭제</Text>
        </Pressable>
      </View>
      <CustomModal
        visible={showDeleteConfirmModal}
        setModalVisible={setShowDeleteConfirmModal}>
        <Text>
          {category?.title}에 포함된 할일들이 모두 삭제됩니다. {'\n'}과거의
          할일들을 유지하고 싶다면 "종료하기" 버튼을 눌러주세요. {'\n'}정말
          삭제하시겠습니까?
        </Text>
        <View style={styles.buttons}>
          <Pressable
            onPress={() => {
              setShowDeleteConfirmModal(false);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>취소</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.button}>
            <Text style={styles.buttonRedText}>삭제</Text>
          </Pressable>
        </View>
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.light.bodyDefault,
    fontSize: 16,
    fontWeight: '900',
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
  textInput: (color: string) => ({
    borderBottomWidth: 2,
    borderBottomColor: color,
    color: color,
    fontSize: 16,
    height: 42,
    fontWeight: 'bold',
  }),
  icon: {
    color: Colors.light.captionDefault,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: (color: string) => ({
    backgroundColor: color,
    width: 20,
    height: 20,
    borderRadius: 20,
  }),
  buttons: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.light.bodyDefault,
  },
  buttonRedText: {
    fontSize: 14,
    color: '#F44D5E',
  },
  button: {
    backgroundColor: '#F5F5F5',
    borderColor: Colors.light.borderDefault,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
