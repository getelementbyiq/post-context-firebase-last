// chatThunks.js

import { chatRoomsCollectionRef, usersCollectionRef } from "../Firestore";
import { setChatRooms, setChatParticipants } from "./chatSlice";
import { query, where, getDocs, doc, getDoc } from "firebase/firestore";

export const fetchChatRooms = (userId) => async (dispatch) => {
  try {
    // Erstellen Sie die Firestore-Abfrage für Chat-Räume
    const chatRoomsQuery = query(
      chatRoomsCollectionRef,
      where("participants", "array-contains", userId)
    );

    // Führen Sie die Firestore-Abfrage für Chat-Räume aus
    const chatRoomsQuerySnapshot = await getDocs(chatRoomsQuery);

    // Verarbeiten Sie die Ergebnisse und extrahieren Sie die Chat-Raumdaten
    const chatRooms = chatRoomsQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    // Aktualisieren Sie den Redux Store mit den Chat-Räumen
    dispatch(setChatRooms(chatRooms));

    // Erstellen Sie eine Liste der eindeutigen Benutzer-IDs aus den Chat-Räumen
    const uniqueUserIds = chatRooms.reduce((userIds, chatRoom) => {
      chatRoom.data.participants.forEach((participantId) => {
        if (participantId !== userId && !userIds.includes(participantId)) {
          userIds.push(participantId);
        }
      });
      return userIds;
    }, []);

    // Erstellen Sie eine Firestore-Abfrage für Benutzerdaten basierend auf den eindeutigen Benutzer-IDs
    const usersQuery = query(
      usersCollectionRef,
      where("uid", "in", uniqueUserIds)
    );

    // Führen Sie die Firestore-Abfrage für Benutzerdaten aus
    const usersQuerySnapshot = await getDocs(usersQuery);

    // Verarbeiten Sie die Ergebnisse und extrahieren Sie die Benutzerdaten
    const chatParticipants = usersQuerySnapshot.docs.map((userDoc) => ({
      id: userDoc.id,
      data: userDoc.data(),
    }));

    // Aktualisieren Sie den Redux Store mit den Chat-Teilnehmern
    dispatch(setChatParticipants(chatParticipants));
  } catch (error) {
    // Fehlerbehandlung, z. B. Fehlerprotokollierung
    console.error(
      "Fehler beim Abrufen der Chatrooms und Chat-Teilnehmer: ",
      error
    );
  }
};
