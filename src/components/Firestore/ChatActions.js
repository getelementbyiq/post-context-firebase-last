import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { chatRoomsCollectionRef } from ".";
import { db } from "../../firebase";
import { ParticipantData } from "./ChatActions";
import { fetchUserData } from "../Redux/userApi";

export const createChatRoom = async (participants) => {
  const newChatRoomRef = await addDoc(chatRoomsCollectionRef, {
    participants,
    createdAt: serverTimestamp(),
  });
  return newChatRoomRef.id;
};

export const sendMessage = async (chatRoomId, message, senderId) => {
  if (!chatRoomId) {
    console.error("chatRoomId ist nicht gesetzt.");
    return;
  }

  const messagesCollectionRef = collection(
    db,
    "ChatRooms",
    chatRoomId,
    "Messages" // Stellen Sie sicher, dass "Messages" auf dieser Ebene ist
  );

  await addDoc(messagesCollectionRef, {
    senderId,
    message,
    createdAt: serverTimestamp(),
  });
};

export const Participants = (selectedPost, senderId) => {
  if (!selectedPost && !senderId) {
    return console.log("sender oder reciever ist null");
  }
  if (selectedPost === senderId) {
    return console.log("this is your post");
  } else {
    const postCreatorId = selectedPost;
    const participants = [postCreatorId, senderId];
    return participants;
  }
};

export const participantData = async (userId, chatRoom) => {
  const otherParticipantId = chatRoom.participants.find(
    (participantId) => participantId !== userId
  );
  const Participant = await fetchUserData(otherParticipantId);
  return {
    participantData: Participant,
  };
};
