"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center gap-8 mt-16">
      <Button onClick={() => router.push("/login")}>Login</Button>
      <Button onClick={() => router.push("/signup")}>Get Started</Button>
    </div>
  );
}
