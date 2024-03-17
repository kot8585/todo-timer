import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {changeEmail} from '../../lib/auth';
import BackgroundColorButton from '../components/BackgroundColorButton';
import BorderBottomInput from '../components/BorderBottomInput';
import useUserStore from '../store/userStore';

export default function ChangeEmailScreen({navigation}: any) {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const [form, setForm] = useState({
    email: '',
  });
  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = async () => {
    await changeEmail(user, form.email);

    setUser({...user, email: form.email});

    navigation.navigate('ConfirmEmailScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BorderBottomInput
        placeholder="변경할 이메일"
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
