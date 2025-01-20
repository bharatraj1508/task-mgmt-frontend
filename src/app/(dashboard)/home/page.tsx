"use client";

import { useAuth } from "@/services/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Hello, {user?.name}</p>
    </div>
  );
}
