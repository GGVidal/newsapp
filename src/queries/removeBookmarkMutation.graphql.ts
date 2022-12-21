import {gql} from 'urql';

export const REMOVE_BOOKMARK_MUTATION = gql`
  mutation RemoveBookmark($bookmarkId: ID!) {
    removeBookmark(bookmarkId: $bookmarkId)
  }
`;
