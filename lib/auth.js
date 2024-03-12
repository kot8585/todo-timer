import auth, {updateEmail} from '@react-native-firebase/auth';

export async function signIn({email, password}) {
  return await auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback) {
  return auth().onAuthStateChanged(callback);
}

export function getLogInUser() {
  return auth().currentUser;
}

export function signOut() {
  return auth().signOut();
}

export function sendEmail(user) {
  return user.sendEmailVerification();
}

export function changeEmail(user, changeEmail) {
  return user.verifyBeforeUpdateEmail(changeEmail);
}
