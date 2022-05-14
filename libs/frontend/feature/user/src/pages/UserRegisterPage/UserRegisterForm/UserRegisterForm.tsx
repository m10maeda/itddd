import type { FC, FormEvent, ChangeEvent } from 'react';

type Props = {
  errors: { name: string | undefined };
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
};

const UserRegisterForm: FC<Props> = ({ errors, onSubmit, onChangeName }) => (
  <form onSubmit={onSubmit} aria-label="User Register Form">
    <div>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        onChange={onChangeName}
        aria-errormessage="name-error-message"
        aria-invalid={errors.name !== undefined}
      />

      {errors.name !== undefined ? (
        <p role="alert" id="name-error-message">
          {errors.name}
        </p>
      ) : null}
    </div>

    <button type="submit">Register</button>
  </form>
);

export default UserRegisterForm;
