import { UserList } from './_components/UserList';
import { graphql } from '../../lib/api-client/__generated__/gql';
import { getClient } from '../../lib/api-client/client';

const GetAllUsersQueryDocument = graphql(`
  query getAllUsers {
    users {
      __typename
      id
      name
      type
    }
  }
`);

export async function UserListContainer() {
  const { data } = await getClient().query({
    query: GetAllUsersQueryDocument,
  });

  const { users } = data;

  return <UserList users={users} />;
}
