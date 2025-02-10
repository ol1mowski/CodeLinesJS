import { memo } from "react";

type LoadingSpinnerProps = {
  className?: string;
};

export const LoadingSpinner = memo(({ className = "py-12" }: LoadingSpinnerProps) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-js"></div>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner"; 