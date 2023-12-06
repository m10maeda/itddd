import { useFormState } from 'react-dom';

import { deleteAction, type State } from './delete';

export function useDeleteForm(): {
  state: State;
  dispatch: (payload: FormData) => void;
} {
  const initialState = {
    message: undefined,
  };

  const [state, dispatch] = useFormState<State, FormData>(
    deleteAction,
    initialState,
  );

  return {
    state,
    dispatch,
  };
}
