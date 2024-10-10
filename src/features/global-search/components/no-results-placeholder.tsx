"use client";

import React from "react";
import { motion } from "framer-motion";
import { FolderSearch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGlobalSearchStore } from "../store/global-search-store";

interface NoResultsPlaceholderProps {
  setSearchTerm: (term: string) => void;
}

/**
 * NoResultsPlaceholder component
 * Displays a message and button when no search results are found
 * @param {NoResultsPlaceholderProps} props - Component props
 * @returns {JSX.Element} Rendered NoResultsPlaceholder component
 */
export const NoResultsPlaceholder: React.FC<NoResultsPlaceholderProps> = ({ setSearchTerm }) => {
  const { clearSearchParams } = useGlobalSearchStore();

  const handleClearFilters = () => {
    setSearchTerm("");
    clearSearchParams();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex h-full w-full flex-col items-center justify-center p-4 text-center"
    >
      <FolderSearch size={48} className="mb-4 text-gray-400" aria-hidden="true" />
      <h3 className="mb-2 text-lg font-semibold text-gray-700">
        No results found
      </h3>
      <p className="mb-4 text-sm text-gray-500">
        We couldn&apos;t find any items matching your search. Try adjusting your
        keywords or filters.
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleClearFilters}
        aria-label="Clear filters and start a new search"
      >
        Clear filters
      </Button>
    </motion.div>
  );
};