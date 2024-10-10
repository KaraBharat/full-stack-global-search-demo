import { motion } from "framer-motion";
import { SearchItem } from "@/types/global-search";
import { RecentSearches } from "./recent-searches";
import { TrendingSearches } from "./trending-searches";

interface DefaultViewProps {
  recentSearches: SearchItem[];
  trendingItems: SearchItem[];
}

/**
 * DefaultView component for displaying recent and trending searches.
 * @param {DefaultViewProps} props - The component props.
 * @returns {JSX.Element} The rendered DefaultView component.
 */
export const DefaultView: React.FC<DefaultViewProps> = ({
  recentSearches,
  trendingItems,
}) => (
  <motion.div
    key="default-view"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    role="region"
    aria-label="Search results"
  >
    {/* Recent Searches
     * TODO: Show recent searches for the current user
     */}
    {recentSearches.length > 0 && <RecentSearches results={recentSearches} />}
    {/* Trending Searches */}
    {trendingItems.length > 0 && <TrendingSearches results={trendingItems} />}
  </motion.div>
);
