import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  image: number;
  volume: number;
  currentVideoId: number;
  videoIds: string[];
  loading: boolean;

  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  setImage: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  setLoading: (loading: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  volume: 100,
  image: 1,
  currentVideoId: 0,
  loading: true,
  videoIds: ["4xDzrJKXOOY", "jfKfPfyJRdk", "7NOSDKb0HlU"],

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume: number) => set(() => ({ volume })),
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
