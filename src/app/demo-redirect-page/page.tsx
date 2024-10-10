"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * DemoRedirectPage Component
 * Renders a demo page that displays information from URL search parameters.
 */
const DemoRedirectPage: React.FC = () => {
  return (
    // TODO: add loading state
    <Suspense fallback={<div aria-live="polite">Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

/**
 * PageContent Component
 * Displays the content of the demo redirect page, including title, name, URL, and ID from search parameters.
 */
const PageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  const url = searchParams.get("url");

  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col gap-4 p-14">
        <h1 className="text-xl font-bold text-stone-800">
          This is demo redirect page
        </h1>
        <p className="text-2xl text-stone-900">
          Title: <span className="font-semibold">{name}</span>
        </p>
        {url && (
          <p className="text-lg text-stone-500">
            Url:{" "}
            <a
              href={url}
              className="rounded bg-stone-200 px-2 py-1 font-mono"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${url} (opens in a new tab)`}
            >
              {url}
            </a>
          </p>
        )}
        <p className="text-lg text-stone-500">
          Id:{" "}
          <span className="rounded bg-stone-200 px-2 py-1 font-mono">{id}</span>
        </p>
      </div>
    </main>
  );
};

export default DemoRedirectPage;
