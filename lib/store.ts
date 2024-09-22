import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  image: number;
  volume: number;
  currentVideoId: number;
  videoIds: string[];
  videoNames: string[];
  loading: boolean;

  togglePlayPause: () => void;
  setPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setImage: () => void;
  nextVideo: () => void;
  setVideo: (videoId: number) => void;
  previousVideo: () => void;
  setLoading: (loading: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  volume: 100,
  image: 1,
  currentVideoId: 0,
  loading: true,
  videoIds: [
    "4xDzrJKXOOY", // Synthwave Radio
    "D58_3HqgRKA", // Purrple Cat Radio
    "jfKfPfyJRdk", // Lofi Hip Hop Radio
    "tGfQYbArQhc", // Jazz Lofi
    "J2i0cZWCdq4", // Study Lofi
    "bRnTGwCbr3E", // Japan Cafe Vibe
    "S_MOd40zlYU", // Dark Ambient
    "Na0w3Mz46GA", // Asian Lofi Radio
  ],
  videoNames: [
    "Synthwave Radio - Lofi Girl",
    "Purrple Cat Radio",
    "Lofi Hip Hop Radio - Lofi Girl",
    "Jazz Lofi - Abao In Tokyo",
    "Study Lofi - Lofi Girl",
    "Japan Cafe Vibe - Healing Me",
    "Dark Ambient - Lofi Girl",
    "Asian Lofi Radio - Lofi Girl",
  ],

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume: number) => set(() => ({ volume })),
  setPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
  setImage: () => {
    set((state) => {
      let newImage;
      do {
        newImage = Math.floor(Math.random() * 6) + 1;
      } while (newImage === state.image);
      return { image: newImage };
    });
  },
  nextVideo: () =>
    set((state) => ({
      currentVideoId:
        state.currentVideoId >= state.videoIds.length - 1
          ? 0
          : state.currentVideoId + 1,
      isPlaying: true,
    })),

  setVideo: (videoId: number) =>
   set(() => ({
     currentVideoId: videoId,
   })),

  previousVideo: () =>
    set((state) => ({
      currentVideoId:
        state.currentVideoId === 0
          ? state.videoIds.length - 1
          : state.currentVideoId - 1,
      isPlaying: true,
    })),
  setLoading: (loading: boolean) => set(() => ({ loading: loading })),
}));
