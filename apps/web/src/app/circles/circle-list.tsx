import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Circle } from './circle';
import { client as circleApiClient } from '../../data-access/circles';

export async function CircleList() {
  const { data, error } = await circleApiClient.GET('/');

  if (error) throw new Error();

  if (data.length === 0) return <p>No circles.</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="list of users">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Members count</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((circle) => (
            <Circle
              key={circle.id}
              circle={{
                id: circle.id,
                name: circle.name,
                ownerId: circle.ownerId,
                memberIds: circle.memberIds,
              }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
