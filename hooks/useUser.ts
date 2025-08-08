import { useMemo } from "react";
import { useAuthStore } from "../store/authStore";
import { jwtDecode } from "jwt-decode";

interface DecodedPayload {
  username: string;
  role: string;
  category: string;
  issuedAt?: number;
  expiration?: number;
}

export const useUser = () => {
  // 1. 전역 상태에서 액세스 토큰을 가져옵니다.
  const accessToken = useAuthStore((state) => state.accessToken);

  // 2. useMemo를 사용해 토큰이 변경될 때만 디코딩하도록 최적화합니다.
  const user = useMemo(() => {
    if (!accessToken) {
      return null;
    }

    try {
      // 3. jwt-decode 라이브러리를 사용해 토큰을 디코딩합니다.
      const decoded = jwtDecode<DecodedPayload>(accessToken);
      return { username: decoded.username };
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }, [accessToken]); // accessToken이 변경될 때만 이 로직이 다시 실행됩니다.

  return user;
};
