import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useTimerStore } from "@/lib/store"; // Adjust the import path as needed

const PomoTimer: React.FC = () => {
  const {
    timeLeft,
    isActive,
    setIsActive,
    increaseDuration,
    decreaseDuration,
    resetTimer,
  } = useTimerStore();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${Number(remainingSeconds.toFixed(0)) < 10 ? "0" : ""}${Number(remainingSeconds.toFixed(0))}`;
  };

  return (
    <div className="flex absolute top-10 -right-10 flex-col bg-primary items-center justify-center p-4 rounded-lg shadow-lg">
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
          <Button variant="secondary" onClick={() => setIsActive(false)}>
            Pause
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setIsActive(true)}>
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
