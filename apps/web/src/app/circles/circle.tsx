import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NextLink from 'next/link';

type Props = {
  circle: {
    id: string;
    memberIds: string[];
    name: string;
    ownerId: string;
  };
};

import { client } from '../../data-access/profiles';

export async function Circle({ circle }: Props) {
  const { data: owner, error } = await client.GET('/{id}', {
    params: {
      path: { id: circle.ownerId },
    },
  });

  return (
    <TableRow
      key={circle.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Link href={`/circles/${circle.id}`} component={NextLink}>
          {circle.name}
        </Link>
      </TableCell>
      <TableCell>{circle.id}</TableCell>
      <TableCell>
        {error === undefined ? (
          <Link href={`/users/${owner.id}`} component={NextLink}>
            {owner.name}
          </Link>
        ) : (
          <>Unknown</>
        )}
      </TableCell>
      <TableCell align="right">{circle.memberIds.length}</TableCell>
    </TableRow>
  );
}
