import { LucideIcon } from 'lucide-react';

/**
 * Types for Global Search functionality
 */

/**
 * Possible types of search items
 */
export type SearchItemType =
  | 'all'
  | 'file'
  | 'team'
  | 'calendar'
  | 'analytics'
  | 'project'
  | 'global';

/**
 * Possible statuses for search items
 */
export type SearchItemStatus =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'completed'
  | 'archived'
  | 'scheduled';

/**
 * Structure of a search item
 */
export interface SearchItem {
  id: string;
  type: SearchItemType;
  name: string;
  description?: string;
  tags?: string[];
  date?: string;
  status?: SearchItemStatus;
  breadcrumbs?: string[];
  url?: string;
  trending?: boolean;
  trendingRank?: number;
}

/**
 * Structure of a search filter
 */
export interface SearchFilter {
  id: SearchItemType;
  title: string;
  icon: LucideIcon;
}

/**
 * Structure of the response from fetching search items
 */
export interface FetchSearchItemsResponse {
  items: SearchItem[];
  totalCount: number;
  nextCursor: string | null;
}

/**
 * Parameters for fetching search items
 */
export interface FetchSearchItemsParams {
  limit: number;
  searchTerm: string;
  filter: SearchItemType;
  trending: boolean;
}