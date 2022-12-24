import React from 'react';
import {NewsListItemProps} from '.';
import {Story} from '../Story/Story';

export const NewsListItem: React.FC<NewsListItemProps> = ({
  id,
  title,
  summary,
  bookmarkId,
  cta,
}) => {
  return (
    <Story
      cta={cta}
      id={id}
      bookmarkId={bookmarkId}
      title={title}
      summary={summary}
    />
  );
};
