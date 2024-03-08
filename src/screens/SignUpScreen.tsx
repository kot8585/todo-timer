import React, {useRef, useState} from 'react';
import {Text, Pressable, TextInput, Keyboard, Alert} from 'react-native';
import UnderlineInput from '../components/UnderlineInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signUp} from '../../lib/auth';

export default function SignUpScreen() {
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
    // 이메일이 비어있는지 확인
    // 이메일 타입인지 확인
    // 아니라면 에러메세지 보여주기
    // 비밀번호가 8자리가 넘는지 확인
    // 아니라면 비밀번호에 에러메세지 보여주기
    // 비밀번호가 일치하는지 확인
    // 아니라면 비밀번호확인에 에러메세지 보여주기
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;
    const info = {email, password};

    console.log('errorMsg', validateMsg);
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
        [password]: '비밀번호는 8자 이상이여야 합니다.',
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
        [confirmPassword]: '비밀번호가 일치하지 않습니다.',
      });
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.focus();
      }
      return;
    }

    // setLoading(true);
    // try {
    //   const {user} = await signUp(info);
    //   console.log(user);
    // } catch (e) {
    //   Alert.alert('실패');
    //   console.log(e);
    // } finally {
    //   // setLoading(false);
    // }
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
      {/* 이게 왜 에러나지? */}
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
