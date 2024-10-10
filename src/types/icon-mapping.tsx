import {
  BarChart,
  Briefcase,
  Calendar,
  File,
  Globe,
  LucideIcon,
  Users,
} from "lucide-react";
import { SearchItemType } from "./global-search";

/**
 * Mapping of search item types to their corresponding Lucide icons.
 * This object is used to display appropriate icons for different search result types.
 */
export const GlobalSearchIconMap: Record<SearchItemType, LucideIcon> = {
  all: Globe,
  file: File,
  team: Users,
  calendar: Calendar,
  analytics: BarChart,
  project: Briefcase,
  global: Globe,
};