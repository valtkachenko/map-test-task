import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAKucH2x6y2UC4Gqt7HwxoIe4F3-0vYAXY',
  authDomain: 'map-test-task-1959c.firebaseapp.com',
  projectId: 'map-test-task-1959c',
  storageBucket: 'map-test-task-1959c.appspot.com',
  messagingSenderId: '773291029131',
  appId: '1:773291029131:web:01f1430f96c8c5cd76da8e',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
