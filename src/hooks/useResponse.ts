import { useEffect, useState } from 'react';

export type effectFunctionType<T, U> = (
  setState: React.Dispatch<React.SetStateAction<T>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<U | null>>
) => Promise<void>;

const useResponse = <T, U>(initState: T, effect: effectFunctionType<T, U>) => {
  const [state, setState] = useState<T>(initState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<U | null>(null);

  useEffect(() => {
    effect(setState, setIsLoading, setError);
    // Хук предполагается использовать только для получения данных при загрузке страницы, поэтому зависимости не нужны
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { state, isLoading, error };
};

export default useResponse;
