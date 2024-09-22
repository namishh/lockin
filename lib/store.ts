import {create} from "zustand";

interface PlayerState {
  isPlaying: boolean;
  volume: number;
  currentVideoId: number;
  videoIds: string[];
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  nextVideo: () => void;
  previousVideo: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  volume: 100,
  currentVideoId: 0,
  videoIds: ["4xDzrJKXOOY", "jfKfPfyJRdk", "7NOSDKb0HlU"],

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume: number) => set(() => ({ volume })),
  nextVideo: () =>
    set((state) => ({
      currentVideoId:
        state.currentVideoId >= state.videoIds.length - 1
          ? 0
          : state.currentVideoId + 1,
      isPlaying: true,
    })),
  previousVideo: () =>
    set((state) => ({
      currentVideoId:
        state.currentVideoId === 0
          ? state.videoIds.length - 1
          : state.currentVideoId - 1,
      isPlaying: true,
    })),
}));
