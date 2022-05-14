import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Can not register cirlce error */
export type CanNotRegisterCircleError = {
  __typename?: 'CanNotRegisterCircleError';
  message: Scalars['String'];
  name: Scalars['String'];
};

/** Can not register user error */
export type CanNotRegisterUserError = {
  __typename?: 'CanNotRegisterUserError';
  message: Scalars['String'];
  name: Scalars['String'];
};

/** circle */
export type Circle = {
  __typename?: 'Circle';
  id: Scalars['ID'];
  memberIds: Array<Scalars['ID']>;
  name: Scalars['String'];
  ownerId: Scalars['ID'];
};

/** Circle not found error */
export type CircleNotFoundError = {
  __typename?: 'CircleNotFoundError';
  id: Scalars['ID'];
  message: Scalars['String'];
};

/** Circle Registration Result */
export type CircleRegistrationResult =
  | CanNotRegisterCircleError
  | Circle
  | CircleNotFoundError
  | UserNotFoundError;

/** Circle Result */
export type CircleResult = Circle | CircleNotFoundError | UserNotFoundError;

export type Mutation = {
  __typename?: 'Mutation';
  createCircle: CircleRegistrationResult;
  deleteCircle: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  joinCircle: CircleResult;
  leaveCircle: CircleResult;
  registerUser: UserRegistrationResult;
  updateCircle: CircleRegistrationResult;
  updateUser: UserRegistrationResult;
};

export type MutationCreateCircleArgs = {
  name: Scalars['String'];
  ownerId: Scalars['ID'];
};

export type MutationDeleteCircleArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationJoinCircleArgs = {
  id: Scalars['ID'];
  userId: Scalars['ID'];
};

export type MutationLeaveCircleArgs = {
  id: Scalars['ID'];
  memberId: Scalars['ID'];
};

export type MutationRegisterUserArgs = {
  name: Scalars['String'];
};

export type MutationUpdateCircleArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  candidates: Array<User>;
  circle: CircleResult;
  circles: Array<Circle>;
  user: UserResult;
  users: Array<User>;
};

export type QueryCandidatesArgs = {
  id: Scalars['ID'];
};

export type QueryCircleArgs = {
  id: Scalars['ID'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

/** user */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** User not found error */
export type UserNotFoundError = {
  __typename?: 'UserNotFoundError';
  id: Scalars['ID'];
  message: Scalars['String'];
};

/** User Registration Result */
export type UserRegistrationResult =
  | CanNotRegisterUserError
  | User
  | UserNotFoundError;

/** User Result */
export type UserResult = User | UserNotFoundError;

export type UserDataFragment = { __typename: 'User'; id: string; name: string };

type UserResultFields_User_Fragment = {
  __typename: 'User';
  id: string;
  name: string;
};

type UserResultFields_UserNotFoundError_Fragment = {
  __typename: 'UserNotFoundError';
  id: string;
  message: string;
};

export type UserResultFieldsFragment =
  | UserResultFields_User_Fragment
  | UserResultFields_UserNotFoundError_Fragment;

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = {
  __typename?: 'Query';
  users: Array<{ __typename: 'User'; id: string; name: string }>;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetUserQuery = {
  __typename?: 'Query';
  user:
    | { __typename: 'User'; id: string; name: string }
    | { __typename: 'UserNotFoundError'; id: string; message: string };
};

export type RegisterUserMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type RegisterUserMutation = {
  __typename?: 'Mutation';
  registerUser:
    | { __typename?: 'CanNotRegisterUserError'; name: string; message: string }
    | { __typename: 'User'; id: string; name: string }
    | { __typename: 'UserNotFoundError'; id: string; message: string };
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  deleteUser: boolean;
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser:
    | { __typename?: 'CanNotRegisterUserError'; name: string; message: string }
    | { __typename: 'User'; id: string; name: string }
    | { __typename: 'UserNotFoundError'; id: string; message: string };
};

export const UserDataFragmentDoc = gql`
  fragment UserData on User {
    __typename
    id
    name
  }
`;
export const UserResultFieldsFragmentDoc = gql`
  fragment UserResultFields on UserResult {
    __typename
    ... on User {
      id
      name
    }
    ... on UserNotFoundError {
      id
      message
    }
  }
`;
export const GetAllUsersDocument = gql`
  query getAllUsers {
    users {
      ...UserData
    }
  }
  ${UserDataFragmentDoc}
`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options,
  );
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options,
  );
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersLazyQuery
>;
export type GetAllUsersQueryResult = Apollo.QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>;
export const GetUserDocument = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      ...UserResultFields
    }
  }
  ${UserResultFieldsFragmentDoc}
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const RegisterUserDocument = gql`
  mutation registerUser($name: String!) {
    registerUser(name: $name) {
      ...UserResultFields
      ... on CanNotRegisterUserError {
        name
        message
      }
    }
  }
  ${UserResultFieldsFragmentDoc}
`;
export type RegisterUserMutationFn = Apollo.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(RegisterUserDocument, options);
}
export type RegisterUserMutationHookResult = ReturnType<
  typeof useRegisterUserMutation
>;
export type RegisterUserMutationResult =
  Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options,
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) {
      ...UserResultFields
      ... on CanNotRegisterUserError {
        name
        message
      }
    }
  }
  ${UserResultFieldsFragmentDoc}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
