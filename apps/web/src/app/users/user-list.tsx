import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import NextLink from 'next/link';

import { client as profileApiClient } from '../../data-access/profiles';

export async function UserList() {
  const { data, error } = await profileApiClient.GET('/');

  if (error) throw new Error();

  if (data.length === 0) return <p>No users.</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="list of users">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link href={`/users/${user.id}`} component={NextLink}>
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>{user.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
