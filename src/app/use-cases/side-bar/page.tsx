"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Briefcase,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
  Search,
  Menu,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GlobalSearch from "@/features/global-search";

/**
 * SidebarLink Component
 * Renders a link with an icon for the sidebar navigation.
 */
const SidebarLink: React.FC<{
  href: string;
  icon: React.ElementType;
  label: string;
}> = ({ href, icon: Icon, label }) => (
  <Link
    href={href}
    className="flex items-center rounded-md px-4 py-2 text-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 hover:text-white"
  >
    <Icon className="mr-3 size-5" />
    <span>{label}</span>
  </Link>
);

/**
 * UseCaseLogo Component
 * Renders the logo SVG for the use case.
 */
const UseCaseLogo: React.FC = () => (
  <svg
    className="h-8 w-8"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * UseCasePage Component
 * Main component for the sidebar use case, demonstrating a responsive layout with a sidebar.
 */
const UseCasePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-screen flex-col bg-gray-100 md:flex-row">
      {/* Mobile Header */}
      <header className="z-20 flex h-16 w-full items-center justify-between px-4 md:hidden">
        <Link
          href="/"
          className="text-2xl font-bold text-stone-800"
          aria-label="Home"
        >
          <span className="sr-only">Logo</span>
          <UseCaseLogo />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-stone-700 via-stone-800 to-stone-900 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0`}
      >
        <div className="hidden h-16 items-center justify-center md:flex">
          <Link
            href="/"
            className="text-2xl font-bold text-white"
            aria-label="Home"
          >
            <span className="sr-only">Logo</span>
            <UseCaseLogo />
          </Link>
        </div>
        <nav className="relative mt-5" aria-label="Sidebar">
          <Popover>
            <PopoverTrigger asChild>
              <Link
                href="#"
                className="mb-4 hidden items-center rounded-md px-4 py-2 text-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 hover:text-white md:flex"
              >
                <Search className="mr-3 size-5" aria-hidden="true" />
                <span>Search</span>
              </Link>
            </PopoverTrigger>
            <PopoverContent
              className="w-[90vw] border-none p-0 md:w-full"
              align="start"
              side="right"
            >
              <GlobalSearch />
            </PopoverContent>
          </Popover>
          <SidebarLink href="/dashboard" icon={Home} label="Dashboard" />
          <SidebarLink href="/projects" icon={Briefcase} label="Projects" />
          <SidebarLink href="/team" icon={Users} label="Team" />
          <SidebarLink href="/reports" icon={BarChart2} label="Reports" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/help" icon={HelpCircle} label="Help & Support" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 py-2 md:px-10 md:py-6">
        <div className="mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-full text-gray-900"
                aria-label="Open search"
              >
                <Search className="size-4" aria-hidden="true" />
                <span>Search</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[90vw] border-none p-0 md:w-full"
              align="start"
            >
              <GlobalSearch />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome to the Dashboard
            </h1>
            <p className="mt-4 text-gray-600">
              This is where your main content would go.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCasePage;
