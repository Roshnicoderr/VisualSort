import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  sortingArray,
  compareTime,
  swapTime,
  sortingAlgorithms,
} from "./config";

export const useControls = create(
  devtools((set) => ({
    // Initialize with 'start' to show the start button by default
    progress: "start",
    speed: 300, // Increased default speed for better UX
    compareTime: compareTime,
    swapTime: swapTime,
    doneCount: 0,

    startSorting: () => set({ progress: "start" }),
    pauseSorting: () => set({ progress: "pause" }),
    resetSorting: () => set({ progress: "reset", doneCount: 0 }),
    markSortingDone: () =>
      set((state) => {
        if (useData.getState().algorithm === sortingAlgorithms.length) {
          if (state.doneCount === sortingAlgorithms.length - 1)
            return { doneCount: 0, progress: "done" };
          else return { doneCount: state.doneCount + 1 };
        } else return { progress: "done" };
      }),
    setSpeed: (speed) =>
      set(() => {
        // Slower speed calculation for better visualization
        const minSpeed = 1;
        const maxSpeed = 100;
        // Invert the speed so that higher values mean slower animation
        const normalizedSpeed = maxSpeed - speed + minSpeed;
        // Calculate times with a larger range for slower speeds
        return { 
          swapTime: 5000 / speed, 
          compareTime: 2500 / speed, 
          speed 
        };
      }),
  }))
);

export const useData = create(
  devtools((set) => ({
    algorithm: 0,
    sortingArray: sortingArray,

    setSortingArray: (array) => set({ sortingArray: array }),
    setAlgorithm: (idx) => set({ algorithm: idx }),
  }))
);
