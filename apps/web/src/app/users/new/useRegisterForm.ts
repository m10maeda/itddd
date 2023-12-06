import { useFormState } from 'react-dom';

import { register, type State } from './register';

export function useRegisterForm(): {
  state: State;
  dispatch: (payload: FormData) => void;
} {
  const initialState = {
    errors: {},
    isSubmitSuccessful: false,
  };

  const [state, dispatch] = useFormState<State, FormData>(
    register,
    initialState,
  );

  return {
    state,
    dispatch,
  };
}
