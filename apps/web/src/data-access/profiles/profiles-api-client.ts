import createClient from 'openapi-fetch';

import type { paths } from '@itddd/profiles-api';

export const client = createClient<paths>({
  baseUrl: process.env.PROFILES_SERVICE_URL ?? 'http://localhost:3001',
});
