"use client";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/store"; // import the Zustand store
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

const Player: React.FC = () => {
  const playerRef = useRef<HTMLIFrameElement>(null);

  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const volume = usePlayerStore((state) => state.volume);
  const currentVideoId = usePlayerStore((state) => state.currentVideoId);
  const videoIds = usePlayerStore((state) => state.videoIds);

  const togglePlayPause = usePlayerStore((state) => state.togglePlayPause);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const nextVideo = usePlayerStore((state) => state.nextVideo);
  const previousVideo = usePlayerStore((state) => state.previousVideo);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Toggle play/pause functionality
  const handleTogglePlayPause = () => {
    if (playerRef.current) {
      const iframe = playerRef.current.contentWindow;
      if (iframe) {
        const action = isPlaying ? "pauseVideo" : "playVideo";
        iframe.postMessage(
          `{"event":"command","func":"${action}","args":""}`,
          "*",
        );
      }
    }
    togglePlayPause();
  };

  const handleVideoChange = (direction: "next" | "previous") => {
    if (direction === "next") {
      nextVideo();
    } else {
      previousVideo();
    }

    setTimeout(() => {
      if (playerRef.current) {
        const iframe = playerRef.current.contentWindow;
        if (iframe) {
          iframe.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*",
          );
        }
      }
    }, 1000);
  };

  return (
    <div>
      <div className="video-responsive hidden">
        <iframe
          ref={playerRef}
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${videoIds[currentVideoId]}?autoplay=1&enablejsapi=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className="flex gap-4">
        <Button variant={"secondary"} onClick={handleTogglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </Button>

        <div className="bg-primary flex items-center p-3">
          <Slider
            onValueChange={(i) => {
              const newVolume = i[0];
              setVolume(newVolume);
              if (playerRef.current) {
                const iframe = playerRef.current.contentWindow;
                if (iframe) {
                  iframe.postMessage(
                    `{"event":"command","func":"setVolume","args":[${newVolume}]}`,
                    "*",
                  );
                }
              }
            }}
            min={0}
            className="w-48"
            value={[volume]}
            max={100}
            step={1}
          />
        </div>

        <Button onClick={() => handleVideoChange("next")}>Next Radio</Button>
        <Button onClick={() => handleVideoChange("previous")}>
          Previous Radio
        </Button>
      </div>
    </div>
  );
};

export default Player;
