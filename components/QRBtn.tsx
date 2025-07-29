"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { openQRPopup } from "./openQRPopup";
import { usePolling } from "./usePolling";
import { getQRImage } from "./getQRImage";

export default function QRBtn() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [popupRef, setPopupRef] = useState<Window | null>(null);

  const handleClick = async () => {
    try {
      const { qrImage } = await getQRImage();

      const popup = openQRPopup(qrImage);

      setSessionId(sessionId);
      setPopupRef(popup);
    } catch (error) {
      console.error("QR 생성 실패:", error);
    }
  };

  usePolling(sessionId, () => {
    if (popupRef && !popupRef.closed) {
      popupRef.close();
    }
    router.push("/success");
  });

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      클릭하세요
    </button>
  );
}
