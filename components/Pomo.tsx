import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const PomoTimer: React.FC = () => {
  const [duration, setDuration] = useState<number>(() => {
    const savedDuration = localStorage.getItem("pomoDuration");
    return savedDuration ? parseInt(savedDuration, 10) : 25;
  });
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    setTimeLeft(duration * 60);
    localStorage.setItem("pomoDuration", duration.toString()); // Save duration to localStorage
  }, [duration]);

  const resetTimer = () => {
    setTimeLeft(duration * 60);
    setIsActive(false);
  };

  const increaseDuration = () => {
    setDuration((prev) => prev + 5);
  };

  const decreaseDuration = () => {
    setDuration((prev) => (prev > 5 ? prev - 5 : prev));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex absolute top-10 -right-2 flex-col bg-primary items-center justify-center p-4 rounded-lg shadow-lg">
      <div className="flex mb-4 gap-4 items-center">
        <button onClick={decreaseDuration}>
          <ChevronLeft size={18} />
        </button>
        <div className="text-3xl font-bold">{formatTime(timeLeft)}</div>
        <button onClick={increaseDuration} className="">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex space-x-4">
        {isActive ? (
          <Button variant="secondary" onClick={() => setIsActive(!isActive)}>
            Pause
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setIsActive(!isActive)}>
            Start
          </Button>
        )}
        <Button variant="destructive" onClick={resetTimer}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default PomoTimer;
