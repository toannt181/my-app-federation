import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GET($id: Int!) {
    user(id: $id) {
      username
      password
    }
  }
`;

export const useGetUser = () => {
  const queryResult = useQuery(GET_USER, { variables: { id: 1 } });

  return { queryResult };
};
