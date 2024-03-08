import auth from '@react-native-firebase/auth';

export function signIn({email, password}) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth({email, password}) {
  return auth().onAuthStateChanged(email, password);
}

export function signOut({email, password}) {
  return auth().signOut(email, password);
}
