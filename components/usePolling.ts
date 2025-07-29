import { useEffect } from "react";
import axios from "axios";

export function usePolling(
  sessionId: string | null,
  onConfirm: (txId: string, address: string, amount: string) => void,
  intervalMs = 1000
) {
  useEffect(() => {
    if (!sessionId) return;

    const url = process.env.NEXT_PUBLIC_API_URL;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${url}/bitcoinqr/status`, {
          params: { sessionId },
        });

        console.log(`get: ${sessionId}`);

        if (res.data.status === "CONFIRMED") {
          clearInterval(interval);
          onConfirm(res.data.txId, res.data.senderAddress, res.data.amount);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [sessionId, onConfirm, intervalMs]);
}
