import type { FC, FormEvent, ChangeEvent } from 'react';

type Props = {
  id: string;
  name: string;
  errors: { name: string | undefined };
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
};

const UserUpdateForm: FC<Props> = ({
  id,
  name,
  errors,
  onSubmit,
  onChangeName,
}) => (
  <form onSubmit={onSubmit} aria-label="User Update Form">
    <div>
      <label htmlFor="id">ID</label>
      <input type="text" id="id" defaultValue={id} readOnly />
    </div>

    <div>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        defaultValue={name}
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

    <button type="submit">Update</button>
  </form>
);

export default UserUpdateForm;
