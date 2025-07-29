import { useEffect } from "react";
import axios from "axios";

export function usePolling(
  sessionId: string | null,
  onConfirm: () => void,
  intervalMs = 1000
) {
  useEffect(() => {
    if (!sessionId) return;

    const url = process.env.NEXT_PUBLIC_API_URL;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${url}/api/qr/status`);

        if (res.data.status === "SUCCESS") {
          clearInterval(interval);
          onConfirm();
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [sessionId, onConfirm, intervalMs]);
}
