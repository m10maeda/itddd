import {
  createContext,
  useMemo,
  useContext,
  type PropsWithChildren,
} from 'react';

const FieldContext = createContext<boolean>(false);

type Props = PropsWithChildren<{
  fieldset?: boolean;
}>;

export function FieldProvider({ children, fieldset = false }: Props) {
  const value = useMemo(() => fieldset, [fieldset]);

  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
}

export function useFieldContext() {
  const context = useContext(FieldContext);

  return context;
}
