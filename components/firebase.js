import { initializeApp } from "firebase/app";
import { getDatabase, push, remove, ref, onValue } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyA7-0Sr8EufVYcVPjTDAtI66Q8I8MQQaSc",
  authDomain: "mobiiliohjelmointi-d6a9f.firebaseapp.com",
  databaseURL:
    "https://mobiiliohjelmointi-d6a9f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mobiiliohjelmointi-d6a9f",
  storageBucket: "mobiiliohjelmointi-d6a9f.appspot.com",
  messagingSenderId: "668728250652",
  appId: "1:668728250652:web:fa1aeb87d2a59994fa2ad9",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const saveItems = (param) => {
  if (param) {
    push(ref(database, "/played-games/"), {
      game: param
    });
    console.log("Saved item");
    return;
  } else {
    return console.error("Error", "Something went wrong");
  }
}
