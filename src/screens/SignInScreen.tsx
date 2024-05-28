import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Alert, Keyboard, SafeAreaView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {findPassword, signIn} from '../../lib/auth';
import {Colors} from '../assets/color';
import BackgroundColorButton from '../components/ui/BackgroundColorButton';
import BorderBottomInput from '../components/ui/BorderBottomInput';
import LoadingBar from '../components/ui/LoadingModal';
import TextButton from '../components/ui/TextButton';
import {FIREBASE_ERROR_MSG} from '../constants/constant';
import useUserStore from '../store/userStore';
import Toast from 'react-native-toast-message';
import ValidateMessage from '../components/ValidateMessage';

export default function SignInScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [validateMsg, setValidateMsg] = useState({
    emailMsg: undefined,
    passwordMsg: undefined,
  });

  const emailRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!emailValidate(form.email)) {
      setValidateMsg({
        ...validateMsg,
        emailMsg: '올바른 이메일 형식이 아닙니다',
      });
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return;
    }

    if (!passwordValidate(form.password)) {
      console.log('비번 에러');
      setValidateMsg({
        ...validateMsg,
        passwordMsg: '비밀번호는 6자 이상이여야 합니다.',
      });
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    }

    try {
      setLoading(true);
      const user = await signIn({email: form.email, password: form.password});
      useUserStore.setState({user: user.user});
    } catch (e) {
      const msg = FIREBASE_ERROR_MSG[e.code] || '로그인 실패';
      Toast.show({
        type: 'info',
        text1: msg,
        position: 'top',
      });
      console.error('로그인 에러: ', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFindPassword = () => {
    if (!emailValidate(form.email)) {
      Toast.show({
        type: 'info',
        text1: '올바른 이메일을 입력 후 다시 버튼을 눌러주세요',
        position: 'top',
      });
      return;
    }

    try {
      findPassword(form.email);
      Toast.show({
        type: 'info',
        text1: '비밀번호 재설정 이메일이 전송되었습니다.',
        position: 'top',
      });
    } catch {
      Toast.show({
        type: 'info',
        text1: '에러가 발생하였습니다.',
        position: 'top',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingBar loading={loading} />
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
          onSubmitEditing={() => passwordRef.current?.focus()}
          ref={emailRef}
          autoComplete="email"
          keyboardType="email-address"
          autoFocus
        />
        {validateMsg.emailMsg && (
          <ValidateMessage message={validateMsg.emailMsg} />
        )}
      </View>
      <View>
        <BorderBottomInput
          placeholder="비밀번호(6자 이상)"
          value={form.password}
          onChangeText={(text: string) => {
            handleChangeText('password', text);
            if (validateMsg.passwordMsg && passwordValidate(text)) {
              validateMsg.passwordMsg = undefined;
            }
          }}
          ref={passwordRef}
          secureTextEntry
        />
        {validateMsg.passwordMsg && (
          <ValidateMessage message={validateMsg.passwordMsg} />
        )}
      </View>
      <BackgroundColorButton text="로그인" onPress={handleSubmit} />
      <View style={styles.textButtons}>
        <TextButton
          text="회원가입"
          onPress={() => navigation.navigate('SignUpScreen')}
        />
        <TextButton text="비밀번호 찾기" onPress={handleFindPassword} />
      </View>
      {/* <View style={styles.textButton}>
        <TextButton
          text="게스트로 시작하기"
          onPress={() => {
            console.log('게스트로 시작하기');
          }}
        />
      </View> */}
    </SafeAreaView>
  );
}

function emailValidate(email: string) {
  return email.trim().length > 4 && email.includes('@') && email.includes('.');
}

function passwordValidate(password: string) {
  return password.trim().length > 5;
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
