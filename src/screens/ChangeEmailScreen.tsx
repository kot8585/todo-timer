import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BorderBottomInput from '../components/BorderBottomInput';
import BackgroundColorButton from '../components/BackgroundColorButton';
import {changeEmail, getLogInUser} from '../../lib/auth';

export default function ChangeEmailScreen({navigation}: any) {
  const [form, setForm] = useState({
    email: '',
  });
  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = async () => {
    const user = getLogInUser();
    await changeEmail(user, form.email);
    navigation.navigate('ConfirmEmailScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BorderBottomInput
        placeholder="변경할 무이메일"
        value={form.email}
        onChangeText={(text: string) => handleChangeText('email', text)}
      />
      <BackgroundColorButton text="확인" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 14,
    alignItems: 'stretch',
  },
});
