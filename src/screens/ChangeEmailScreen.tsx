import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {changeEmail} from '../../lib/auth';
import BackgroundColorButton from '../components/ui/BackgroundColorButton';
import BorderBottomInput from '../components/ui/BorderBottomInput';
import useUserStore from '../store/userStore';
import Toast from 'react-native-toast-message';

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
    if (!emailValidate(form.email)) {
      Toast.show({
        type: 'info',
        text1: '올바른 이메일 형식이 아닙니다',
        position: 'top',
      });
    }
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

function emailValidate(email: string) {
  return email.trim().length > 4 && email.includes('@') && email.includes('.');
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
