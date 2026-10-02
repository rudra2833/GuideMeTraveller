import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';

const firebaseConfig = {
  databaseURL: "https://guidemetraveler-default-rtdb.firebaseio.com",
  projectId: "guidemetraveler"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export { ref, onValue, set, remove };
