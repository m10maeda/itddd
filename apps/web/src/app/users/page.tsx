import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type Metadata } from 'next';
import Link from 'next/link';

import { UserList } from './user-list';

export const fetchCache = 'default-no-store';

export const metadata: Metadata = {
  title: 'User List',
};

export default function UserListPage() {
  return (
    <main>
      <Typography variant="h4" gutterBottom component="h1">
        User List
      </Typography>

      <Stack my={2} direction="row" spacing={2}>
        <Button variant="contained" LinkComponent={Link} href="/users/new">
          New user
        </Button>
      </Stack>

      <UserList />
    </main>
  );
}
