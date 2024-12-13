import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { type PropsWithChildren } from 'react';

import { AppBar } from './app-bar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <AppBar />
      </header>

      <Container maxWidth="xl">
        <Box py={2}>{children}</Box>
      </Container>
    </>
  );
}
