import { useEffect } from "react";
import axios from "axios";

export function usePolling(
  onConfirm: () => void,
  intervalMs = 1000,
  isActive: boolean
) {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const interval = setInterval(async () => {
      if (!isActive) return;

      try {
        const res = await axios.get(`${url}/api/qr/status`, {
          withCredentials: true,
        });

        console.log(res.data.status);

        if (res.data.status === "SUCCESS") {
          clearInterval(interval);
          onConfirm();
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [onConfirm, intervalMs]);
}
