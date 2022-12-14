import {gql} from 'urql';
import {StorySummaryFields} from './fragments.graphql';

export const BOOKMARKS_QUERY = gql`
  query AllBookmarks {
    bookmarks {
      id
      story {
        ...StorySummaryFields
      }
    }
  }
  ${StorySummaryFields}
`;
