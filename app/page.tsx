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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Clock, Github, List, Twitter } from "lucide-react";
import PomoTimer from "@/components/Pomo";
import Todo from "@/components/Todo";
import { Input } from "@/components/ui/input";
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

  const [username, setUsername] = useState("champ");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

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

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

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
          <Dialog>
            <DialogTrigger>
              <p className="text-xl justify-left text-left">
                Time to lock in,{" "}
                <span className="cursor-pointer">{username}</span>.
              </p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit username</DialogTitle>
                <DialogDescription>enter a username here</DialogDescription>
                <div className="my-6 flex flex-col">
                  <Input value={username} onChange={handleUsernameChange} />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/namishh/lockin">
            <Github size={24} />
          </a>
          <a href="https://x.com/namishh_">
            <Twitter size={24} />
          </a>
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
