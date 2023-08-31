// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy9J0xNPdvFHTdAwoRyZHSMc08y6lHfV8",
  authDomain: "ats-resume-scorer.firebaseapp.com",
  projectId: "ats-resume-scorer",
  storageBucket: "ats-resume-scorer.appspot.com",
  messagingSenderId: "185790009497",
  appId: "1:185790009497:web:1d37aeb8e3716ad4086808"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const db=getFirestore()
export default app;
// export const storage = getStorage(app);
// export const provider=new GoogleAuthProvider();