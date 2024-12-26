import createClient from 'openapi-fetch';

import type { paths } from '@itddd/circles-api';

export const client = createClient<paths>({
  baseUrl: process.env.CIRCLES_SERVICE_URL ?? 'http://localhost:3002',
});
