import { UseCaseLink } from "@/components/use-case-link";
import GlobalSearch from "@/features/global-search";

/**
 * Home Page Component
 * Renders the main page of the Global Search UI Demo
 */
export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-6 p-4">
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Global Search UI Demo</h1>
        <p className="text-sm text-stone-500">
          A demonstration of a global search interface with filter and infinite
          scrolling functionality.
        </p>
      </header>

      {/* Global Search Component */}
      <section className="flex w-full items-start justify-center" aria-label="Global Search">
        <div className="flex w-full max-w-[750px] items-start justify-center rounded-md border border-stone-200 bg-gradient-to-r from-stone-100 to-stone-50 p-2">
          <GlobalSearch />
        </div>
      </section>

      {/* Use Case Links */}
      <nav className="mb-4 flex w-full flex-wrap items-center justify-center gap-2" aria-label="Use Case Navigation">
        <UseCaseLink
          href="/use-cases/main-menu"
          title="Use Case 1: Main Menu"
        />
        <UseCaseLink 
          href="/use-cases/side-bar" 
          title="Use Case 2: Sidebar" 
        />
      </nav>
    </main>
  );
}