import { UserList } from './_components/UserList';
import { graphql } from '../../lib/api-client/__generated__/gql';
import { getClient } from '../../lib/api-client/client';

const FindAllUsersQueryDocument = graphql(`
  query findAllUsers {
    users {
      __typename
      results {
        ... on User {
          __typename
          id
          name
          type
        }
      }
    }
  }
`);

export async function UserListContainer() {
  const { data } = await getClient().query({
    query: FindAllUsersQueryDocument,
  });

  const { users } = data;

  return <UserList users={users.results} />;
}
