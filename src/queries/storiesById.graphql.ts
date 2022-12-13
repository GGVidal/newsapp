import {gql} from 'urql';

export const STORY_BY_ID = gql`
  query StoryById($id: ID!) {
    story(id: $id) {
      id
      title
      author
      summary
      text
    }
  }
`;
