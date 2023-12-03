import { useFormState } from 'react-dom';

import { update, type State } from './update';

export function useUpdateForm(): {
  state: State;
  dispatch: (payload: FormData) => void;
} {
  const initialState = {
    errors: {},
    isSubmitSuccessful: false,
  };

  const [state, dispatch] = useFormState<State, FormData>(update, initialState);

  return {
    state,
    dispatch,
  };
}
