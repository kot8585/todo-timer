import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../assets/color';
import DefaultText from '../components/ui/DefaultText';
import useCategory from '../hooks/useCategory';
import useSelectedDateStore from '../store/selecteDateStore';
import dayjs from 'dayjs';
import CustomModal from '../components/CustomModal';
import ColorPaletteModal from '../components/ColorPaletteModal';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function EditCategoryScreen() {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const navigation = useNavigation();
  const route = useRoute();
  const category = route.params;

  useEffect(() => {
    setForm({
      idx: route.params?.idx,
      title: route.params?.title,
      color: route.params?.color,
    });
  }, [route.params]);

  const {updateCategoryMutation, deleteCategoryMutation} =
    useCategory(selectedDate);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const [form, setForm] = useState({
    idx: undefined,
    title: undefined,
    color: '#ffffff',
  });

  const [showColorPaletteModal, setShowColorPaletteModal] = useState(false);

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  const handleUpdate = () => {
    updateCategoryMutation.mutate({
      ...form,
    });
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteCategoryMutation.mutate(form.idx);
    navigation.goBack();
  };

  const handleEnd = () => {
    updateCategoryMutation.mutate({
      ...form,
      endDate: dayjs().format('YYYY-MM-DD'),
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-left" size={28} style={styles.icon} />
        </Pressable>
        <Text style={styles.headerText}>카테고리</Text>
        <Pressable onPress={handleUpdate} hitSlop={10}>
          <DefaultText text="확인" />
        </Pressable>
      </View>
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.textInput(form.color)}
          placeholderTextColor={'#6B6B6B'}
          placeholder="투두입력"
          value={form.title}
          onChangeText={(text: string) => handleChangeText('title', text)}
        />
        <View style={styles.rowContainer}>
          <DefaultText text={'색상'} />
          <Pressable
            style={styles.colorContainer}
            onPress={() => {
              setShowColorPaletteModal(true);
            }}>
            <View style={styles.color(form.color)} />
            <Icon name="menu-down" size={28} style={styles.icon} />
          </Pressable>
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
        setModalVisible={setShowDeleteConfirmModal}
        position={'middle'}>
        <Text style={{textAlign: 'center'}}>
          "{category?.title}"에 포함된 할일들이 모두 삭제됩니다. {'\n'}과거의
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
      <ColorPaletteModal
        visible={showColorPaletteModal}
        setModalVisible={setShowColorPaletteModal}
        selectedColor={form.color}
        setSelectedColor={color => setForm({...form, color})}
      />
    </SafeAreaView>
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
    backgroundColor: Colors.light.buttonDefault,
    borderColor: Colors.light.borderDefault,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
