import {gql} from 'urql';
import {StorySummaryFields} from './fragments.graphql';

export const ADD_BOOKMARK_MUTATION = gql`
  mutation AddBookmark($storyId: ID!) {
    addBookmark(storyId: $storyId) {
      id
      story {
        ...StorySummaryFields
      }
    }
    ${StorySummaryFields}
  }
`;
