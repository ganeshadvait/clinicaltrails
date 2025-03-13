import { create } from "zustand";
import { persist } from "zustand/middleware";

// Create the store
export const useStore = create(
  persist(
    (set) => ({
      totalTrails: 0,
      trails: [],
      nextPageToken: "",

      updateTotalTrail: (totalTrails) => set(() => ({ totalTrails })),

      updateTrails: (newTrails) =>
        set((state) => ({ trails: [...state.trails, ...newTrails] })),

      updateNextPageToken: (nextPageToken) => set(() => ({ nextPageToken })),

      clearTrails: () => set({ trails: [] }),
    }),
    { name: "trails-storage" }
  )
);
