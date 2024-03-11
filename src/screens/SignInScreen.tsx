import React, {useState} from 'react';
import {Keyboard, SafeAreaView, StyleSheet, View} from 'react-native';
import {signIn} from '../../lib/auth';
import {Colors} from '../assets/color';
import BackgroundColorButton from '../components/BackgroundColorButton';
import BorderBottomInput from '../components/BorderBottomInput';
import TextButton from '../components/TextButton';

//TODO: {navigation}: any 타입 지정하기
export default function LogInScreen({navigation}: any) {
  //파라미터로 navigation을 받아오는거랑 const navigation = useNavigation()을 쓰는거랑 뭐가 다르지

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    console.log('회원가입 form 출력', form);
    signIn({email: form.email, password: form.password});
  };

  return (
    <SafeAreaView style={styles.container}>
      <BorderBottomInput
        placeholder="이메일"
        value={form.email}
        onChangeText={(text: string) => handleChangeText('email', text)}
      />
      <BorderBottomInput
        placeholder="비밀번호(8자 이상)"
        value={form.password}
        onChangeText={(text: string) => handleChangeText('password', text)}
      />
      <BackgroundColorButton text="로그인" onPress={handleSubmit} />
      <View style={styles.textButtons}>
        <TextButton
          text="회원가입"
          onPress={() => navigation.navigate('SignUpScreen')}
        />
        <TextButton
          text="비밀번호 찾기"
          onPress={() => {
            console.log('비밀번호 찾기');
          }}
        />
      </View>
      <View style={styles.textButton}>
        <TextButton
          text="게스트로 시작하기"
          onPress={() => {
            console.log('게스트로 시작하기');
          }}
        />
      </View>
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
  logInButton: {
    backgroundColor: Colors.light.buttonDefault,
    borderColor: Colors.light.borderDefault,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInButtonText: {
    fontSize: 16,
    color: '#626262',
  },
  textButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
