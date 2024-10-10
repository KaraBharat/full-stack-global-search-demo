"use client";

import React from "react";

interface HighlightTextProps {
  text: string;
  searchTerm: string;
}

/**
 * HighlightText component for highlighting search terms within a given text.
 * @param {HighlightTextProps} props - The component props.
 * @returns {React.ReactNode} The rendered text with highlighted search terms.
 */
export const HighlightText: React.FC<HighlightTextProps> = ({ text, searchTerm }) => {
  if (!searchTerm) return text;

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark
            key={index}
            className="bg-yellow-200 font-semibold"
            aria-label={`Highlighted text: ${part}`}
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
};