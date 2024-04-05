import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {changeEmail, getLogInUser} from '../../lib/auth';
import {Colors} from '../assets/color';
import EmailConfirmModal from '../components/EmailConfirmModal';
import BackgroundColorButton from '../components/ui/BackgroundColorButton';
import LoadingBar from '../components/ui/LoadingBar';
import TextButton from '../components/ui/TextButton';
import useUserStore from '../store/userStore';

//TODO: 버튼 연타 방지하기
export default function ConfirmEmailScreen() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const user = useUserStore(state => state.user);
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    const user = await getLogInUser();
    if (user?.emailVerified) {
      useUserStore.setState({user: user});
      navigation.navigate('HomeScreen');
    } else {
      setShowModal(true);
    }
    setLoading(false);
  };
  // 로그인된 유저  가져오기
  return (
    <View style={styles.container}>
      <LoadingBar loading={loading} />

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
            navigation.navigate('HomeScreen');
          } catch (e) {
            console.log(e);
          }
        }}>
        <TextButton
          text="이메일 변경"
          onPress={() => {
            navigation.navigate('ChangeEmailScreen');
          }}
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
