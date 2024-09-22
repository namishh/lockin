"use client";
import Player from "@/components/Player";
import Image from "next/image";
import { usePlayerStore } from "@/lib/store";

export default function Home() {
  const { image, loading, videoNames, currentVideoId } = usePlayerStore();
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex h-screen w-screen  flex-col justify-between p-8">
      <div className="flex z-[10] justify-between">
        <p>Now playing: {videoNames[currentVideoId]}</p>
      </div>
      <div className="flex justify-between">
        <Player />
        {loading == true ? (
          "LOADING"
        ) : (
          <div className="w-full h-full">
            <div className="absolute w-full top-0 left-0 z-[1] h-full bg-neutral-950/40"></div>
            <Image
              width={0}
              height={0}
              alt="background"
              src={`/0${image}.gif`}
              className="w-full h-full top-0 left-0 object-cover -z-1 absolute"
            />
          </div>
        )}
      </div>
    </div>
  );
}
