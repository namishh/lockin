import React, { useEffect, useState } from "react";
import { usePlayerStore } from "@/lib/store"; // Import the Zustand store

const Visualizer: React.FC = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const [barHeights, setBarHeights] = useState([10, 10, 10]); // Initial heights of bars

  useEffect(() => {
    let animationInterval: NodeJS.Timeout;

    if (isPlaying) {
      animationInterval = setInterval(() => {
        setBarHeights(() => [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ]);
      }, 300);
    } else {
      setBarHeights([10, 10, 10]);
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [isPlaying]);

  return (
    <div className="flex justify-around gap-[3px] items-end h-8 w-full">
      {barHeights.map((height, index) => (
        <div
          key={index}
          className="bg-secondary transition-all duration-300"
          style={{ height: `${height}%`, width: "10px" }} // Width for the bars
        />
      ))}
    </div>
  );
};

export default Visualizer;
