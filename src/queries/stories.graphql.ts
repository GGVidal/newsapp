import {gql} from 'urql';

export const STORIES_QUERY = gql`
  query AllStories {
    stories {
      id
      title
      summary
    }
  }
`;
