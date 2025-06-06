import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { circles } from './presentation';

const app = new Hono();

app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});
app.route('/', circles);

export { app };

const server = serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(
      `Server is running on http://localhost:${info.port.toString()}`,
    );
  },
);

// graceful shutdown
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
