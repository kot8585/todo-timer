import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CreateCategoryType} from '../api/types';
import {Colors} from '../assets/color';
import ColorPaletteModal from '../components/ColorPaletteModal';
import DefaultText from '../components/ui/DefaultText';
import {COLORS} from '../constants/constant';
import useCategory from '../hooks/useCategory';
import useSelectedDateStore from '../store/selecteDateStore';
import useUserStore from '../store/userStore';

export default function CreateCategoryScreen() {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const {createCategoryMutation} = useCategory(selectedDate);
  const user = useUserStore(state => state.user);
  const navigation = useNavigation();
  const [form, setForm] = useState<CreateCategoryType>({
    title: '',
    color: COLORS[0],
  });
  const [showColorPaletteModal, setShowColorPaletteModal] = useState(false);

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-left" size={28} style={styles.icon} />
          </Pressable>
          <Text style={styles.headerText}>카테고리</Text>
          <View />
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
        <Pressable
          onPress={() => {
            createCategoryMutation.mutate({...form, userUid: user?.uid});
            navigation.navigate('HomeScreen');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>추가하기</Text>
        </Pressable>
      </View>
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
