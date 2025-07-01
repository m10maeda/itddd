import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

import { RemoveMemberForm } from './_remove-member-form';
import { client } from '../../../../data-access/profiles';

type Props = {
  circleId: string;
  memberIds: string[];
};

export async function MemberList({ circleId, memberIds: memberIds }: Props) {
  const { data } = await client.GET('/');
  const members = data?.filter((member) => memberIds.includes(member.id));

  return (
    <Box>
      <Typography variant="h5" gutterBottom component="h2">
        Members
      </Typography>

      <Stack my={2} direction="row" spacing={2}>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`/circles/${circleId}/add-member`}
        >
          Add Member
        </Button>
      </Stack>

      {members?.length ? (
        <List>
          {members.map((member) => (
            <ListItem
              key={member.id}
              disablePadding
              secondaryAction={
                <RemoveMemberForm circleId={circleId} memberId={member.id} />
              }
            >
              <ListItemButton href={`/users/${member.id}`} component={NextLink}>
                <ListItemText primary={member.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No members</p>
      )}
    </Box>
  );
}
