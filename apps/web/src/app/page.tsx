import { HomePage } from './home-page';

export const fetchCache = 'default-no-store';

export default async function Home() {
  const profilesServiceUrl =
    process.env.PROFILES_SERVICE_URL ?? 'http://localhost:3001';

  const res = await fetch(profilesServiceUrl);
  const text = await res.text();

  return <HomePage>{text}</HomePage>;
}
