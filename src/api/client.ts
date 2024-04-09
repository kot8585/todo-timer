import axios from 'axios';
import {Platform} from 'react-native';

// const baseURL = 'http://localhost:8080';
// const baseURL = 'http://10.0.2.2:8080';
const baseURL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8080'
    : 'http://192.168.219.106:8080';

const client = axios.create({baseURL});

export default client;
