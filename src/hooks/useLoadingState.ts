import { useState } from "react";

export const useLoadingState = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetState = () => {
    setError(null);
    setIsLoading(false);
  };

  return {
    error,
    setError,
    isLoading,
    setIsLoading,
    resetState,
  };
};
