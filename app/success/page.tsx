"use client";

import { useUser } from "@/hooks/useUser";

export default function Success() {
  const user = useUser();
  return (
    <div>
      <h1>성공</h1>
      <h2>{user?.username}</h2>
    </div>
  );
}
