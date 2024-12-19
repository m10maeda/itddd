import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { type Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';

import { AddMemberForm } from './_add-member-form';
import { client as circleClient } from '../../../../data-access/circles';
import { client as profileClient } from '../../../../data-access/profiles';

export const fetchCache = 'default-no-store';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const { data } = await circleClient.GET('/{id}', {
    params: { path: { id } },
  });

  return {
    title: data ? `Join ${data.name}` : 'Unknown',
  };
}

export default async function AddMember({ params }: Props) {
  const id = (await params).id;

  const { data: candidateMembers, error: circleError } = await circleClient.GET(
    '/{id}/candidates',
    {
      params: { path: { id } },
    },
  );
  if (circleError?.status === 404) return notFound();

  if (circleError) return <p>Error</p>;

  const { data: allProfiles } = await profileClient.GET('/');

  const candidateIds = candidateMembers.map(({ id }) => id);
  const candidates = allProfiles?.filter((profile) =>
    candidateIds.includes(profile.id),
  );

  return (
    <main>
      <Typography variant="h4" gutterBottom component="h1">
        Add Member Form
      </Typography>

      {candidateIds.length ? (
        <List>
          {candidates?.map((candidate) => (
            <ListItem
              key={candidate.id}
              disablePadding
              secondaryAction={
                <AddMemberForm
                  key={candidate.id}
                  circleId={id}
                  memberId={candidate.id}
                />
              }
            >
              <ListItemButton
                href={`/users/${candidate.id}`}
                component={NextLink}
              >
                <ListItemText primary={candidate.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : null}

      <Box mt={4}>
        <Link href={`/circles/${id}`} component={NextLink}>
          Back
        </Link>
      </Box>
    </main>
  );
}
