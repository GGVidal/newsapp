import {gql} from 'urql';
import {StorySummaryFields} from './fragments.graphql';

export const STORIES_QUERY = gql`
  query AllStories {
    stories {
      __typename
      ...StorySummaryFields
    }
  }
  ${StorySummaryFields}
`;
