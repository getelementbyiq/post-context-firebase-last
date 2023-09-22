import { collection } from "firebase/firestore";
import { db } from "../../firebase";

export const postsCollectionRef = collection(db, "Posts");
export const chatRoomsCollectionRef = collection(db, "ChatRooms");
export const userCollectionRef = collection(db, "Users");
export const commentsCollectionRef = collection(db, "Comments");

export const messagesCollectionRef = collection(db, "Messages");
