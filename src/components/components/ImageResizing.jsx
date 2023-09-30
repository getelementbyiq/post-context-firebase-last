import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";

function ImageResize({ post }) {
  // Größe, auf die Sie das Bild verkleinern möchten
  const width = 40;
  const height = 40;

  const [resizedDataUrl, setResizedDataUrl] = useState(null);

  useEffect(() => {
    // Ein neues Image-Objekt erstellen und das Bild des Posts laden
    const img = new Image();
    img.src = post.avatarUrl;

    // Event-Handler, der aufgerufen wird, wenn das Bild geladen wurde
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const newResizedDataUrl = canvas.toDataURL("image/jpeg"); // Hier können Sie auch das Dateiformat anpassen

      // Setzen Sie den Wert von resizedDataUrl im lokalen State
      setResizedDataUrl(newResizedDataUrl);
    };
  }, [post]);

  // Die Avatar-Komponente wird im JSX gerendert, nachdem das Bild geladen wurde
  return (
    <Avatar
      src={resizedDataUrl}
      sx={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}

export default ImageResize;
