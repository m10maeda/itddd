import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CircleList } from './circles/circle-list';
import { UserList } from './users/user-list';

export function HomePage() {
  return (
    <main>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom component="h1">
          Dashboard
        </Typography>

        <Box>
          <Typography variant="h5" gutterBottom component="h2">
            User List
          </Typography>
          <UserList />
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom component="h2">
            Circle List
          </Typography>
          <CircleList />
        </Box>
      </Stack>
    </main>
  );
}
