import React, {useRef, useState} from 'react';
import {Alert, Keyboard, StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sendEmail, signUp} from '../../lib/auth';
import BackgroundColorButton from '../components/BackgroundColorButton';
import BorderBottomInput from '../components/BorderBottomInput';
import ValidateMessage from '../components/ValidateMessage';
import useUserStore from '../store/userStore';

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
    const {email, password} = form;
    const info = {email, password};

    console.log('errorMsg', validateMsg);

    //signup validation
    if (!emailValidate(email)) {
      setValidateMsg({
        ...validateMsg,
        emailMsg: '올바른 이메일 형식이 아닙니다',
      });
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return;
    }

    if (!passwordValidate(password)) {
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

    if (!confirmPasswordValidate) {
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
      //TODO: 에러처리 하기
      const {user} = await signUp(info);
      useUserStore.setState({user: user});
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
    <SafeAreaView style={styles.container}>
      <View>
        <BorderBottomInput
          placeholder="이메일"
          value={form.email}
          onChangeText={(text: string) => {
            handleChangeText('email', text);
            if (validateMsg.emailMsg && emailValidate(text)) {
              validateMsg.emailMsg = undefined;
            }
          }}
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
        {validateMsg.emailMsg && (
          <ValidateMessage message={validateMsg.emailMsg} />
        )}
      </View>
      <View>
        <BorderBottomInput
          placeholder="비밀번호(8자 이상)"
          value={form.password}
          onChangeText={(text: string) => {
            handleChangeText('password', text);
            if (validateMsg.passwordMsg && passwordValidate(text)) {
              validateMsg.passwordMsg = undefined;
            }
          }}
          onSubmitEditing={() => {
            console.log('비밀번호 호출', confirmPasswordRef);
            if (confirmPasswordRef.current) {
              confirmPasswordRef.current.focus();
            }
          }}
          ref={passwordRef}
          secureTextEntry
        />
        {validateMsg.passwordMsg && (
          <ValidateMessage message={validateMsg.passwordMsg} />
        )}
      </View>
      <View>
        <BorderBottomInput
          placeholder="비밀번호 확인(8자 이상)"
          value={form.confirmPassword}
          onChangeText={(text: string) => {
            handleChangeText('confirmPassword', text);
            if (
              validateMsg.confirmPasswordMsg &&
              confirmPasswordValidate(form.password, text)
            ) {
              validateMsg.confirmPasswordMsg = undefined;
            }
          }}
          ref={confirmPasswordRef}
          secureTextEntry
        />
        {validateMsg.confirmPasswordMsg && (
          <ValidateMessage message={validateMsg.confirmPasswordMsg} />
        )}
      </View>
      <BackgroundColorButton text="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

function emailValidate(email: string) {
  return email.trim().length > 4 && email.includes('@') && email.includes('.');
}

function passwordValidate(password: string) {
  return password.trim().length > 7;
}

function confirmPasswordValidate(password: string, confirmPassword: string) {
  return password === confirmPassword;
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
