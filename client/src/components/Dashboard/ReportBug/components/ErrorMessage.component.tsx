import { memo } from "react";

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = memo(({ message }: ErrorMessageProps) => (
  <div className="mb-4 bg-red-500/20 border border-red-500/30 rounded-lg p-3">
    <p className="text-red-400">{message}</p>
  </div>
));

ErrorMessage.displayName = "ErrorMessage"; 