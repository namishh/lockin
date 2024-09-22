"use client";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/lib/store"; // import the Zustand store
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { truncate } from "fs/promises";

const Player: React.FC = () => {
  const playerRef = useRef<HTMLIFrameElement>(null);
  const prefetchRef = useRef<HTMLIFrameElement>(null); // Ref for preloading

  const {
    setImage,
    isPlaying,
    volume,
    currentVideoId,
    videoIds,
    togglePlayPause,
    setVolume,
    nextVideo,
    previousVideo,
    loading,
    setLoading,
  } = usePlayerStore();

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
    togglePlayPause(); // Trigger Zustand play/pause
  };

  const handleVideoChange = (direction: "next" | "previous") => {
    if (direction === "next") {
      nextVideo();
      setLoading(true);
    } else {
      previousVideo();
      setLoading(true);
    }

    setImage();

    // Prefetch the next video in a hidden iframe
    setTimeout(() => {
      if (playerRef.current) {
        const iframe = playerRef.current.contentWindow;
        if (iframe) {
          iframe.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*",
          );
          setLoading(false);
        }
      }

      if (prefetchRef.current) {
        prefetchRef.current.src = ""; // Clear prefetch iframe after switch
      }
    }, 1000); // Wait for iframe to load the new video
  };

  // Prefetch the next video in a hidden iframe
  const prefetchNextVideo = () => {
    const nextId =
      currentVideoId === videoIds.length - 1 ? 0 : currentVideoId + 1;
    if (prefetchRef.current) {
      prefetchRef.current.src = `https://www.youtube.com/embed/${videoIds[nextId]}?enablejsapi=1`; // Preload next video
    }
  };

  useEffect(() => {
    prefetchNextVideo();
  }, [currentVideoId]);

  return (
    <div className="z-[10]">
      <div className="video-responsive hidden">
        <iframe
          ref={playerRef}
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${videoIds[currentVideoId]}?autoplay=1&enablejsapi=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoading(false)}
          title="Embedded youtube"
        />
      </div>
      <div style={{ display: "none" }}>
        <iframe
          ref={prefetchRef}
          width="853"
          height="480"
          title="Prefetch youtube"
        />
      </div>
      <div className="flex gap-4">
        <Button
          disabled={loading}
          variant={"secondary"}
          onClick={handleTogglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>

        <div className="bg-primary flex items-center p-3">
          <Slider
            disabled={loading}
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

        <Button disabled={loading} onClick={() => handleVideoChange("next")}>
          Next Radio
        </Button>
        <Button
          disabled={loading}
          onClick={() => handleVideoChange("previous")}
        >
          Previous Radio
        </Button>
      </div>
    </div>
  );
};

export default Player;
