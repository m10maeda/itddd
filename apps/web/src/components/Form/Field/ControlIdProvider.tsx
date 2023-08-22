import {
  createContext,
  useMemo,
  useContext,
  type PropsWithChildren,
} from 'react';

const ControlIdContext = createContext<string | undefined>(undefined);

type Props = PropsWithChildren<{
  controlId?: string;
}>;

export function ControlIdProvider({ children, controlId }: Props) {
  const value = useMemo(() => controlId, [controlId]);

  return (
    <ControlIdContext.Provider value={value}>
      {children}
    </ControlIdContext.Provider>
  );
}

export function useControlIdContext() {
  const context = useContext(ControlIdContext);

  return context;
}
