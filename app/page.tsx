"use client";
import Player from "@/components/Player";
import Image from "next/image";
import { usePlayerStore } from "@/lib/store";

export default function Home() {
  const { image, loading } = usePlayerStore();
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex h-screen w-screen items-end justify-between p-8">
      <Player />
      {loading == true ? (
        "LOADING"
      ) : (
        <Image
          width={0}
          height={0}
          alt="background"
          src={`/0${image}.gif`}
          className="w-full h-full top-0 left-0 object-cover -z-1 absolute"
        />
      )}
    </div>
  );
}
