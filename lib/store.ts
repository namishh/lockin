import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    "5yx6BWlEVcY", // Jazzy Hip Hop Beats
    "tNkZsRW7h2c", // Space Ambient Music
    "mwPR8aizAyo", // Coffee Shop Radio
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
    "Jazzy and lofi hip hop beats - Chillhop Music",
    "Space Ambient Music - Relaxation Music",
    "Coffee Shop Radio - STEEZYASF*CK",
  ],

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume: number) => set(() => ({ volume })),
  setPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
  setImage: () => {
    set((state) => {
      let newImage;
      do {
        newImage = Math.floor(Math.random() * 7) + 1;
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

interface TimerState {
  duration: number;
  timeLeft: number;
  isActive: boolean;
  lastTickTime: number | null;
  setDuration: (duration: number) => void;
  setTimeLeft: (timeLeft: number) => void;
  setIsActive: (isActive: boolean) => void;
  increaseDuration: () => void;
  decreaseDuration: () => void;
  resetTimer: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      duration: 25,
      timeLeft: 25 * 60,
      isActive: false,
      lastTickTime: null,
      setDuration: (duration) => set({ duration, timeLeft: duration * 60 }),
      setTimeLeft: (timeLeft) => set({ timeLeft }),
      setIsActive: (isActive) =>
        set(() => ({
          isActive,
          lastTickTime: isActive ? Date.now() : null,
        })),
      increaseDuration: () =>
        set((state) => ({
          duration: state.duration + 5,
          timeLeft: state.isActive ? state.timeLeft : (state.duration + 5) * 60,
        })),
      decreaseDuration: () =>
        set((state) => ({
          duration: state.duration > 5 ? state.duration - 5 : state.duration,
          timeLeft: state.isActive
            ? state.timeLeft
            : (state.duration > 5 ? state.duration - 5 : state.duration) * 60,
        })),
      resetTimer: () =>
        set((state) => ({
          timeLeft: state.duration * 60,
          isActive: false,
          lastTickTime: null,
        })),
      tick: () =>
        set((state) => {
          if (!state.isActive || state.timeLeft <= 0) {
            return { isActive: false, lastTickTime: null };
          }

          const now = Date.now();
          const elapsed = state.lastTickTime
            ? (now - state.lastTickTime) / 1000
            : 0;
          const newTimeLeft = Math.max(0, state.timeLeft - elapsed);

          return {
            timeLeft: newTimeLeft,
            lastTickTime: now,
            isActive: newTimeLeft > 0,
          };
        }),
    }),
    {
      name: "pomo-timer-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (str) return JSON.parse(str);
          return null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

// Create a separate function to handle the timer logic
const runTimer = () => {
  const { isActive, timeLeft, tick } = useTimerStore.getState();

  if (isActive && timeLeft > 0) {
    tick();
    requestAnimationFrame(runTimer);
  }
};

// Start the timer when the app loads
runTimer();

// Ensure the timer keeps running even if the component unmounts
if (typeof window !== "undefined") {
  setInterval(() => {
    const { isActive } = useTimerStore.getState();
    if (isActive) {
      runTimer();
    }
  }, 1000);
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text: string) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, completed: false }],
        })),
      toggleTodo: (id: number) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),
      deleteTodo: (id: number) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: "todo-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (str) return JSON.parse(str);
          return null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
