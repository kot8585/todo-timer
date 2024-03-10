import auth, {updateEmail} from '@react-native-firebase/auth';

export function signIn({email, password}) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth({email, password}) {
  return auth().onAuthStateChanged(email, password);
}

export function getLogInUser() {
  return auth().currentUser;
}

export function signOut({email, password}) {
  return auth().signOut(email, password);
}

export function sendEmail(user) {
  return user.sendEmailVerification();
}

export function changeEmail(user) {
  return user.verifyBeforeUpdateEmail('ansgywjd12345@gmail.com');
}
