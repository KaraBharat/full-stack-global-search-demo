import { useInfiniteQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import {
  FetchSearchItemsParams,
  FetchSearchItemsResponse,
} from "@/types/global-search";
import { useGlobalSearchStore } from "../store/global-search-store";

/**
 * Fetches search items from the API
 * @param cursor - Pagination cursor
 * @param params - Search parameters
 * @returns Promise with the search response
 */
const fetchSearchItems = async (
  cursor: string | null,
  params: FetchSearchItemsParams,
): Promise<FetchSearchItemsResponse> => {
  /**
   * Fetches search items from the API using Hono client
   *
   * It provides both server-side and client-side TypeScript support.
   *
   * How Hono API and client work with TypeScript:
   *
   * 1. API Definition:
   *    - On the server-side, routes are defined using Hono's API (e.g., app.get('/path', handler)).
   *    - These routes can use TypeScript for request/response typing and validation.
   *
   * 2. Client Generation:
   *    - Hono can automatically generate a type-safe client based on your API routes.
   *    - This client (imported as 'client' here) knows the structure of your API.
   *
   * 3. Type Safety:
   *    - The client methods (like $get, $post) are fully typed based on your API definition.
   *    - This provides autocomplete and type checking for API calls.
   *
   * 4. Request Building:
   *    - The client automatically builds the correct URL and adds query parameters.
   *    - It ensures that you're passing the correct parameters as defined in your API.
   *
   * 5. Response Handling:
   *    - The response is typed according to what your API returns, enabling safe access to properties.
   *
   * This approach ensures end-to-end type safety between your API and client code.
   */
  const response = await client.api["global-search"].$get({
    query: {
      cursor: cursor ?? undefined,
      limit: params.limit.toString(),
      filter: params.filter,
      searchTerm: params.searchTerm,
      trending: params.trending.toString(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch search items");
  }

  const data = await response.json();

  return {
    items: data.items,
    totalCount: data.totalCount,
    nextCursor: data.nextCursor,
  };
};

/**
 * Custom hook for handling search queries
 * @param params - Search parameters
 * @returns Infinite query result
 */
export const useSearch = (params: FetchSearchItemsParams) => {
  const { setCurrentCursor } = useGlobalSearchStore();

  /**
   * useInfiniteQuery Hook for Paginated Search Results
   *
   * This hook manages the fetching of paginated search results using React Query's useInfiniteQuery.
   * Here's how it works:
   *
   * 1. Initial Query:
   *    - The first call is made with pageParam set to null (initialPageParam).
   *    - This fetches the first page of results.
   *
   * 2. Subsequent Queries:
   *    - When more data is needed (e.g., user scrolls to bottom), getNextPageParam is called.
   *    - It returns lastPage.nextCursor, which becomes the new pageParam for the next query.
   *
   * 3. Data Fetching Process:
   *    - queryFn is called with the current pageParam.
   *    - It updates the current cursor in the global store and fetches the next page of items.
   *
   * 4. Infinite Scrolling:
   *    - React Query manages the state of all fetched pages.
   *    - It concatenates the results of each query, creating an "infinite" list.
   *
   * 5. Caching and Refetching:
   *    - Results are cached based on the queryKey.
   *    - If params change, it triggers a new query series with a fresh cache.
   */
  return useInfiniteQuery<FetchSearchItemsResponse>({
    queryKey: ["infinite-search-list", params],
    queryFn: ({ pageParam }) => {
      setCurrentCursor(pageParam as string | undefined);
      return fetchSearchItems(pageParam as string | null, params);
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
