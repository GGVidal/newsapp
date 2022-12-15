import {gql} from 'urql';

export const ADD_BOOKMARK_MUTATION = gql`
  mutation AddBookmark($storyId: ID!) {
    addBookmark(storyId: $storyId) {
      id
      story {
        id
        title
        bookmarkId
      }
    }
  }
`;
