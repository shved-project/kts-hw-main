import { useEffect, useState } from 'react';

const useResponse = <T, U>(
  initState: T,
  effect: (
    setState: React.Dispatch<React.SetStateAction<T>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<U | null>>
  ) => void
) => {
  const [state, setState] = useState<T>(initState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<U | null>(null);

  useEffect(() => {
    effect(setState, setIsLoading, setError);
  }, []);

  return { state, isLoading, error };
};

export default useResponse;
