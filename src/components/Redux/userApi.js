// userAPI.js
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

// Funktion zum Abrufen von Benutzerdaten anhand der UserID
export const fetchUserData = async (userId) => {
  const usersCollectionRef = collection(db, "users"); // Stellen Sie sicher, dass "users" der Name Ihrer Firestore-Sammlung für Benutzer ist.
  const q = query(usersCollectionRef, where("uid", "==", userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Wenn ein Benutzer mit der angegebenen UID gefunden wurde
    const userData = querySnapshot.docs[0].data();
    return { from: userData.username, avatarUrl: userData.avatarUrl }; // Die Benutzerdaten zurückgeben
  } else {
    return null; // Wenn kein Benutzer gefunden wurde
  }
};
