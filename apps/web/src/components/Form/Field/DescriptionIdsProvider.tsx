import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
  useMemo,
} from 'react';

const DescriptionIdsContext = createContext<Set<string>>(new Set());

export function useDescriptionIdsContext() {
  const context = useContext(DescriptionIdsContext);

  if (context.size === 0) return undefined;

  return Array.from(context);
}

const SetDescriptionIdsContext = createContext<{
  addId: (id: string) => void;
  removeId: (id: string) => void;
}>({
  addId: () => {},
  removeId: () => {},
});

export function useSetDescriptionIdsContext() {
  const context = useContext(SetDescriptionIdsContext);

  return context;
}

export function DescriptionIdsProvider({ children }: PropsWithChildren) {
  const [ids, setId] = useState<Set<string>>(new Set());

  const addId = useCallback((id: string) => {
    setId((_ids) => new Set([...Array.from(_ids), id]));
  }, []);

  const removeId = useCallback((id: string) => {
    setId((_ids) => new Set(Array.from(_ids).filter((_id) => _id !== id)));
  }, []);

  const memoSetDescriptionIdsContext = useMemo(
    () => ({ addId, removeId }),
    [addId, removeId],
  );

  return (
    <DescriptionIdsContext.Provider value={ids}>
      <SetDescriptionIdsContext.Provider value={memoSetDescriptionIdsContext}>
        {children}
      </SetDescriptionIdsContext.Provider>
    </DescriptionIdsContext.Provider>
  );
}
