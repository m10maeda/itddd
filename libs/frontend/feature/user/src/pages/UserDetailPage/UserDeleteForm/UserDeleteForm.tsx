import type { FC, FormEvent } from 'react';

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const UserDeleteForm: FC<Props> = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <button type="submit">Delete</button>
  </form>
);

export default UserDeleteForm;
