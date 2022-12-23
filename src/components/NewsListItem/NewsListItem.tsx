import React from 'react';
import {Story} from '../Story/Story';

interface NewsListItemProps {
  id: string;
  title: string;
  summary: string;
  bookmarkId?: string | null;
  cta: 'add' | 'remove';
}

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
