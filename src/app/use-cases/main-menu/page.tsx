import Link from "next/link";
import { BarChart2, Briefcase, Home, Search, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GlobalSearch from "@/features/global-search";

/**
 * Main Menu Use Case Page
 * Demonstrates a navigation bar with a logo, menu items, and a global search feature.
 */
const UseCasePage = () => {
  // Navigation items configuration
  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/projects", icon: Briefcase, label: "Projects" },
    { href: "/team", icon: Users, label: "Team" },
    { href: "/reports", icon: BarChart2, label: "Reports" },
  ];

  return (
    <nav className="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-stone-700 via-stone-800 to-stone-900 shadow-lg" aria-label="Main Navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo and Navigation Links */}
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-white transition duration-300 hover:text-yellow-300"
                aria-label="Home"
              >
                <span className="sr-only">Logo</span>
                {/* Logo SVG */}
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* SVG paths */}
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            {/* Navigation Menu Items */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-100 transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-10"
                >
                  <Icon className="mr-2 h-5 w-5 transition duration-300 group-hover:text-yellow-300" aria-hidden="true" />
                  <span className="transition duration-300 group-hover:text-yellow-300">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {/* Global Search Popover */}
          <div className="flex items-center">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <button
                  className="rounded-full p-2 text-gray-100"
                  aria-label="Open search"
                >
                  <Search className="size-6" aria-hidden="true" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[90vw] border-none p-0 md:w-full"
                align="end"
              >
                <GlobalSearch />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UseCasePage;