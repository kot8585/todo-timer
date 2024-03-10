import React, {useRef, useState} from 'react';
import {Alert, Keyboard, Pressable, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sendEmail, signUp} from '../../lib/auth';
import UnderlineInput from '../components/UnderlineInput';

export default function SignUpScreen({navigation}: any) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validateMsg, setValidateMsg] = useState({
    //이거 undefined를 넣어돋 되나?
    emailMsg: undefined,
    passwordMsg: undefined,
    confirmPasswordMsg: undefined,
  });
  // const [loading, setLoading] = useState(false);

  const emailRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();
  const confirmPasswordRef = useRef<TextInput>();

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;
    const info = {email, password};

    console.log('errorMsg', validateMsg);
    //TODO: 프론트랑 백엔드 에러메세지 어떻게 구분??
    //TODO: 올바른 이메일 형식인지 파이어베이스도 확인하는데 프론트에서도 할필요가 있을끼?
    if (email.trim().length < 5) {
      setValidateMsg({
        ...validateMsg,
        emailMsg: '올바른 이메일 형식이 아닙니다',
      });
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return;
    }

    if (password.trim().length < 8) {
      console.log('비번 에러');
      setValidateMsg({
        ...validateMsg,
        passwordMsg: '비밀번호는 8자 이상이여야 합니다.',
      });
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    }

    if (password !== confirmPassword) {
      console.log('비번확인 에러');
      setValidateMsg({
        ...validateMsg,
        confirmPasswordMsg: '비밀번호가 일치하지 않습니다.',
      });
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.focus();
      }
      return;
    }

    // setLoading(true);
    try {
      const {user} = await signUp(info);
      await sendEmail(user);
      console.log('user: ', user);
      navigation.navigate('ConfirmEmailScreen');
    } catch (e) {
      Alert.alert('실패');
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <UnderlineInput
        placeholder="이메일"
        value={form.email}
        onChangeText={(text: string) => handleChangeText('email', text)}
        onSubmitEditing={() => {
          console.log('이메일 호출', passwordRef);
          if (passwordRef.current) {
            passwordRef.current.focus();
          }
        }}
        ref={emailRef}
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        keyboardType="email-address"
      />
      {validateMsg.emailMsg && <Text>{validateMsg.emailMsg}</Text>}
      <UnderlineInput
        placeholder="비밀번호"
        value={form.password}
        onChangeText={(text: string) => handleChangeText('password', text)}
        onSubmitEditing={() => {
          console.log('비밀번호 호출', confirmPasswordRef);
          if (confirmPasswordRef.current) {
            confirmPasswordRef.current.focus();
          }
        }}
        ref={passwordRef}
        // secureTextEntry
      />
      {validateMsg.passwordMsg && <Text>{validateMsg.passwordMsg}</Text>}
      <UnderlineInput
        placeholder="비밀번호 확인"
        value={form.confirmPassword}
        onChangeText={(text: string) =>
          handleChangeText('confirmPassword', text)
        }
        ref={confirmPasswordRef}
        // secureTextEntry
      />
      {validateMsg.confirmPasswordMsg && (
        <Text>{validateMsg.confirmPasswordMsg}</Text>
      )}
      <Pressable onPress={handleSubmit}>
        <Text>회원가입</Text>
      </Pressable>
    </SafeAreaView>
  );
}
