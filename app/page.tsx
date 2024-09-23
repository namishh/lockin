"use client";
import Player from "@/components/Player";
import Image from "next/image";
import { usePlayerStore } from "@/lib/store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Clock, List } from "lucide-react";
import PomoTimer from "@/components/Pomo";
import Todo from "@/components/Todo";

export default function Home() {
  const {
    image,
    loading,
    videoNames,
    currentVideoId,
    setVideo,
    setImage,
    setPlaying,
  } = usePlayerStore();

  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  );

  useEffect(() => {
    setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000);
  });

  const [pomo, openPomo] = useState(false);
  const [todo, openTodo] = useState(false);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex h-screen w-screen  flex-col justify-between p-8">
      <div className="flex z-[10] justify-between">
        <div className="flex flex-col gap-4">
          <Sheet>
            <SheetTrigger>
              Now playing: {videoNames[currentVideoId]}
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Select Your Station</SheetTitle>
                <SheetDescription>
                  Yea lmao, these are just hidden iframes from youtube.
                </SheetDescription>
                <div className="mt-2 flex items-start flex-col gap-4">
                  {videoNames.map((i, j) => {
                    return (
                      <button
                        className="hover:text-neutral-500 transition"
                        onClick={() => {
                          setVideo(j);
                          setImage();
                          setPlaying(true);
                        }}
                        key={j}
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <p className="text-4xl">{time}</p>
          <p className="text-xl">Time to lock in, loser.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Clock
              onClick={() => openPomo(!pomo)}
              size={24}
              className="cursor-pointer"
            />
            {pomo && <PomoTimer />}
          </div>
          <div className="relative">
            <List
              onClick={() => openTodo(!todo)}
              size={24}
              className="cursor-pointer"
            />
            {todo && <Todo />}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Player />
        {loading == true ? (
          "LOADING"
        ) : (
          <div className="w-full h-full">
            <div className="absolute w-full top-0 left-0 z-[1] h-full bg-neutral-950/60"></div>
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
