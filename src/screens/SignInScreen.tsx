import React, {useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import UnderlineInput from '../components/UnderlineInput';

export default function LogInScreen({navigation}: any) {
  //파라미터로 navigation을 받아오는거랑 const navigation = useNavigation()을 쓰는거랑 뭐가 다르지

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = () => {
    console.log('회원가입 form 출력', form);
  };

  return (
    <SafeAreaView>
      <UnderlineInput
        placeholder="이메일"
        value={form.email}
        onChangeText={(text: string) => handleChangeText('email', text)}
      />
      <UnderlineInput
        placeholder="비밀번호"
        value={form.password}
        onChangeText={(text: string) => handleChangeText('password', text)}
      />
      <Pressable onPress={handleSubmit}>
        <Text>로그인</Text>
      </Pressable>
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
          <Text>회원가입</Text>
        </Pressable>
        <Pressable>
          <Text>비밀번호 찾기</Text>
        </Pressable>
      </View>
      <Pressable>
        <Text>게스트로 시작하기</Text>
      </Pressable>
    </SafeAreaView>
  );
}
