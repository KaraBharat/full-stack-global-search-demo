import React from 'react';
import { SearchItem } from '@/types/global-search';
import { SearchResults } from './search-results';

/**
 * TrendingSearches component displays a list of top trending searches.
 * 
 * @param {Object} props - Component props
 * @param {SearchItem[]} props.results - Array of trending search items
 * @returns {React.ReactElement} Rendered component
 */
export const TrendingSearches: React.FC<{ results: SearchItem[] }> = ({ results }) => (
  <section className="mb-4" aria-labelledby="trending-searches-heading">
    <h3 
      id="trending-searches-heading" 
      className="mb-2 text-sm font-semibold text-gray-600"
    >
      Top Trending Searches
    </h3>
    <SearchResults results={results} />
  </section>
);