import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
  useMemo,
} from 'react';

type ErrorMessageId = string | undefined;

const ErrorMessageIdContext = createContext<ErrorMessageId>(undefined);

export function useErrorMessageIdContext() {
  const context = useContext(ErrorMessageIdContext);

  return context;
}

const SetErrorMessageIdContext = createContext<{
  set: (id: string) => void;
  unset: () => void;
}>({
  set: () => {},
  unset: () => {},
});

export function useSetErrorMessageIdContext() {
  const context = useContext(SetErrorMessageIdContext);

  return context;
}

export function ErrorMessageIdProvider({ children }: PropsWithChildren) {
  const [id, setId] = useState<ErrorMessageId>(undefined);

  const set = useCallback((_id: string) => {
    setId(_id);
  }, []);

  const unset = useCallback(() => {
    setId(undefined);
  }, []);

  const memoSetErrorMessageIdContextValue = useMemo(
    () => ({ set, unset }),
    [set, unset],
  );

  return (
    <ErrorMessageIdContext.Provider value={id}>
      <SetErrorMessageIdContext.Provider
        value={memoSetErrorMessageIdContextValue}
      >
        {children}
      </SetErrorMessageIdContext.Provider>
    </ErrorMessageIdContext.Provider>
  );
}
