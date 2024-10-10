import { create } from "zustand";
import { SearchItemType } from "@/types/global-search";

/**
 * Interface defining the state and actions for the global search store
 */
interface GlobalSearchState {
  searchQuery: string;
  searchFilter: SearchItemType;
  currentCursor?: string;
  setSearchQuery: (query: string) => void;
  setSearchFilter: (filter: SearchItemType) => void;
  setCurrentCursor: (cursor?: string) => void;
  clearSearchParams: () => void;
}

/**
 * Custom hook for managing global search state
 */
export const useGlobalSearchStore = create<GlobalSearchState>((set) => ({
  searchQuery: "",
  searchFilter: "all",
  currentCursor: undefined,

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSearchFilter: (filter: SearchItemType) => set({ searchFilter: filter }),
  setCurrentCursor: (cursor?: string) => set({ currentCursor: cursor }),
  clearSearchParams: () => set({ searchQuery: "", searchFilter: "all", currentCursor: undefined }),
}));