import React, {useState} from 'react';
import {Alert, Modal, Pressable, Text, View} from 'react-native';
import {changeEmail, getLogInUser, sendEmail} from '../../lib/auth';

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
    <View>
      <Text>
        이메일이 {user?.email}로 전송되었습니다. 이메일의 링크를 클릭한 후 아래
        "인증하기"버튼을 눌러주세요.
      </Text>
      <Pressable onPress={handleConfirm}>
        <Text>인증하기</Text>
      </Pressable>
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
        <Text>이메일 변경</Text>
      </Pressable>
      <Modal visible={showModal}>
        <Text>이메일이 인증되지 않았습니다.</Text>
        <Text>인증 이메일을 다시 받으시겠습니까?</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={async () => {
              // //TODO: loading바 보여주기

              const result = await sendEmail(user);

              Alert.alert(
                `${user?.email}로 인증 이메일이 다시 전송되었습니다. `,
              );
              setShowModal(false);
            }}>
            <Text>확인</Text>
          </Pressable>
          <Pressable onPress={() => setShowModal(false)}>
            <Text>취소</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
