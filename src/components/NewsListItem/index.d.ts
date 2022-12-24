export interface NewsListItemProps {
  id: string;
  title: string;
  summary: string;
  bookmarkId?: string | null;
  cta: 'add' | 'remove';
}
