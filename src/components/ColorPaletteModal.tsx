import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from './CustomModal';

type ColorPaletteModal = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
};

export const COLORS = [
  '#E4D4C8',
  '#D0B49F',
  '#A47551',
  '#523A28',
  '#ACBAAD',
  '#C7A19B',
  '#7B794C',
  '#3B4C64',
  '#F0F7E0',
  '#D3BBDD',
  '#BC96CA',
  '#95BA61',
];

type ColorPaletteModalType = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
  selectedColor: string;
  setSelectedColor: (value: string) => void;
};

export default function ColorPaletteModal({
  visible,
  setModalVisible,
  selectedColor,
  setSelectedColor,
}: ColorPaletteModalType) {
  return (
    <CustomModal
      visible={visible}
      setModalVisible={setModalVisible}
      position="under">
      <View style={styles.container}>
        <View style={styles.colorContainer}>
          {COLORS.map(color => {
            return (
              <Pressable
                key={color}
                style={styles.color(color)}
                onPress={() => {
                  setSelectedColor(color);
                  setModalVisible(false);
                }}>
                {selectedColor === color && (
                  <Icon name="check" size={24} style={styles.icon} />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {padding: 10, alignItems: 'center'},
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  color: (color: string) => ({
    width: 42,
    height: 42,
    backgroundColor: color,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  icon: {
    color: 'white',
  },
});
