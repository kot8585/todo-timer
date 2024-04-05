import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from './CustomModal';
import {COLORS} from '../constants/constant';

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
