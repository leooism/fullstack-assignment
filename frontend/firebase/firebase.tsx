// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBC0iehV2VxFOXR4KDgj4zSeO-qf4GyFwY",
	authDomain: "fullstack-assignment-34b51.firebaseapp.com",
	projectId: "fullstack-assignment-34b51",
	storageBucket: "fullstack-assignment-34b51.appspot.com",
	messagingSenderId: "516151329076",
	appId: "1:516151329076:web:9694f81c789ae5274f2561",
	measurementId: "G-GCE9GPWFT0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
