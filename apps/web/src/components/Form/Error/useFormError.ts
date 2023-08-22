import { useCallback, useState } from 'react';

export const ERROR_TYPE = {
  INVALID_FIELDS: 'INVALID_FIELDS',
  NETWORK: 'NETWORK',
  UNKNOWN: 'UNKNOWN',
} as const;

export type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];

export function useFormError(): {
  error?: ErrorType;
  set: (type: ErrorType) => void;
  clear: () => void;
} {
  const [error, setError] = useState<ErrorType | undefined>(undefined);

  const set = useCallback(
    (type: ErrorType) => {
      setError(type);
    },
    [setError],
  );

  const clear = useCallback(() => {
    setError(undefined);
  }, [setError]);

  return {
    error,
    set,
    clear,
  };
}
