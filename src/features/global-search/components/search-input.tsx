"use client";

import React, { useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Search,
  FileText,
  Users,
  Calendar,
  BarChart2,
  Briefcase,
  Globe,
  X,
  ChevronDown,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGlobalSearchStore } from "../store/global-search-store";
import { SearchFilter } from "@/types/global-search";

// Define filter options for the search
export const filterOptions: SearchFilter[] = [
  { id: "all", title: "All", icon: Search },
  { id: "file", title: "File", icon: FileText },
  { id: "team", title: "Team", icon: Users },
  { id: "calendar", title: "Calendar", icon: Calendar },
  { id: "analytics", title: "Analytics", icon: BarChart2 },
  { id: "project", title: "Project", icon: Briefcase },
  { id: "global", title: "Global", icon: Globe },
];

type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

/**
 * SearchInput component for global search functionality
 * @param {string} searchTerm - Current search term
 * @param {function} setSearchTerm - Function to update search term
 */
export const SearchInput: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const { setSearchQuery, searchFilter, setSearchFilter } =
    useGlobalSearchStore();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Update search query when debounced search term changes
  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  // Handle search input change
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex-shrink-0 border-b p-4">
      {/* Search input field */}
      <div className="flex items-center justify-between">
        <div className="relative w-full flex-grow">
          <Input
            type="text"
            placeholder="Global search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="w-full pr-10"
            aria-label="Search input"
          />
          {searchTerm && (
            <Button
              variant="link"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Filter buttons for desktop view */}
      <div className="mt-4 hidden w-full overflow-x-auto md:block">
        <div className="flex items-center justify-evenly gap-2 py-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter.id}
              variant={searchFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchFilter(filter.id)}
              className="whitespace-nowrap"
              aria-pressed={searchFilter === filter.id}
            >
              <filter.icon className="mr-2 h-4 w-4" aria-hidden="true" />
              {filter.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Dropdown menu for mobile view */}
      <div className="mt-4 block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center">
                {filterOptions.find((filter) => filter.id === searchFilter)?.title}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
            {filterOptions.map((filter) => (
              <DropdownMenuItem
                key={filter.id}
                onSelect={() => setSearchFilter(filter.id)}
                className="flex items-center"
              >
                <filter.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                {filter.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};