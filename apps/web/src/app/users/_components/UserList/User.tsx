import Link from 'next/link';

type UserType = 'Normal' | 'Premium';

type Props = {
  id: string;
  name: string;
  type: UserType;
};

export function User({ id, name, type }: Props) {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>
        <Link href={`/users/${id}`}>{name}</Link>
      </td>
      <td>{type}</td>
    </tr>
  );
}
