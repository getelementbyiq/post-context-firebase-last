export const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.toDate) {
    const date = new Date(timestamp.toDate());
    const day = date.getDate();
    const month = date.getMonth() + 1; // Monate sind nullbasiert, daher +1
    const year = date.getFullYear().toString().slice(-2); // Nur die letzten zwei Stellen des Jahres
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year} / ${hours}:${minutes}`;
  } else {
    return ""; // Oder eine andere Standard-Rückgabe, wenn `timestamp` ungültig ist
  }
};

export const formatUnixTimestamp = (timestamp) => {
  if (!timestamp || isNaN(timestamp)) {
    return ""; // Wenn der Timestamp ungültig ist, gib einen leeren String zurück
  }

  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Monate sind nullbasiert, daher +1
  const year = date.getFullYear().toString().slice(-2); // Nur die letzten zwei Stellen des Jahres
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} / ${hours}:${minutes}`;
};
