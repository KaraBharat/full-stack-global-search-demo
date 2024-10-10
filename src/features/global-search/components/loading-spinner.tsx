import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

/**
 * LoadingSpinner component
 * Displays a centered spinning loader icon
 * @param {LoadingSpinnerProps} props - Component props
 * @returns {JSX.Element} Rendered LoadingSpinner component
 */
export const LoadingSpinner = ({ className }: LoadingSpinnerProps): JSX.Element => (
  <div className="flex w-full h-full items-center justify-center">
    <Loader2 
      className={cn("size-6 animate-spin text-gray-400", className)} 
      aria-label="Loading"
      role="status"
    />
  </div>
);