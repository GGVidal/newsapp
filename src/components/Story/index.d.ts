import {StorySummaryFieldsFragment} from '../../graphql/__generated__/operationTypes';

export interface StoryProps extends StorySummaryFieldsFragment {
  cta: 'add' | 'remove';
}
