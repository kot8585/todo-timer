import React, {useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {changeEmail, getLogInUser, sendEmail} from '../../lib/auth';
import {Colors} from '../assets/color';
import BackgroundColorButton from '../components/BackgroundColorButton';
import TextButton from '../components/TextButton';
import EmailConfirmModal from '../components/EmailConfirmModal';

//TODO: 버튼 연타 방지하기
export default function ConfirmEmailScreen({navigation}: any) {
  let user = getLogInUser();

  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    //TODO: 회원정보가 바뀌었는데 탐지가 안됌
    if (user?.emailVerified) {
      navigation.navigate('BottomTaps');
    } else {
      setShowModal(true);
    }
  };
  // 로그인된 유저  가져오기
  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>
        이메일이 "{user?.email}"로 전송되었습니다. 이메일의 링크를 클릭한 후에
        아래 "인증하기" 버튼을 눌러주세요.
      </Text>

      <BackgroundColorButton text="인증하기" onPress={handleConfirm} />
      <Pressable
        onPress={async () => {
          try {
            console.log('이메일 변경 버튼 눌림');
            const result = await changeEmail(user);
            console.log(result);
            //TODO: 변경된 유저로 저장해야됌
            Alert.alert('이메일 변경이 완료되었습니다.');
            navigation.navigate('BottomTaps');
          } catch (e) {
            console.log(e);
          }
        }}>
        <TextButton
          text="이메일 변경"
          onPress={() => console.log('SignUpScreen')}
        />
      </Pressable>
      <EmailConfirmModal visible={showModal} setShowModal={setShowModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    gap: 18,
    alignItems: 'stretch',
  },
  textContainer: {
    color: Colors.light.bodyDefault,
    fontSize: 16,
  },
});
