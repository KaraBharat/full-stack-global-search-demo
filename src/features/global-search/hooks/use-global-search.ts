import { useEffect, useMemo, useRef } from "react";
import { useGlobalSearchStore } from "../store/global-search-store";
import { useSearch } from "../queries/use-search-query";
import { SearchItem } from "@/types/global-search";
import { PAGE_SIZE, TRADING_PAGE_SIZE } from "@/constants/common";

/**
 * Custom hook for managing global search functionality
 * @returns An object containing search-related state and functions
 */
const useGlobalSearch = () => {
  // Reference to the search results container
  const resultsRef = useRef<HTMLDivElement>(null);

  // Destructure values and functions from the global search store
  const { searchQuery, searchFilter, setSearchQuery, setSearchFilter } =
    useGlobalSearchStore();

  // TODO: Implement recent searches functionality
  const recentSearches: SearchItem[] = [];

  // Determine if we should fetch trending items
  const fetchTrending = useMemo(() => !searchQuery, [searchQuery]);

  // Use the search query hook
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useSearch({
    searchTerm: searchQuery,
    filter: searchFilter,
    limit: fetchTrending ? TRADING_PAGE_SIZE : PAGE_SIZE,
    trending: fetchTrending,
  });

  // Extract trending items from the search results
  const trendingItems = useMemo(() => {
    if (!searchQuery) {
      return data?.pages.flatMap((page) => page.items).slice(0, TRADING_PAGE_SIZE) ?? [];
    }
    return [];
  }, [data, searchQuery]);

  // Extract all search results
  const searchResults = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  // Scroll to top when search filter changes
  useEffect(() => {
    if (searchFilter) {
      resultsRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchFilter]);

  // Return an object with all necessary state and functions
  return {
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    searchResults,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    recentSearches,
    trendingItems,
    isFetchingNextPage,
    resultsRef,
    totalCount: data?.pages[0]?.totalCount,
  };
};

export default useGlobalSearch;