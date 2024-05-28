import axios from 'axios';
import {Platform} from 'react-native';
import {ANDROID_API_URL, IOS_API_URL} from '@env';

const baseURL = Platform.OS === 'android' ? ANDROID_API_URL : IOS_API_URL;

const client = axios.create({baseURL});

export default client;
