import { Button } from "@/components/ui/button";
import { WelcomePage } from "@/components/welcome-page";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <WelcomePage />
    </main>
  );
}
