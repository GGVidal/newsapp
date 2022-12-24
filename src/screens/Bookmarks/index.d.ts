export interface BookmarksProps {
  id: string;
  story: {
    id: string;
    title: string;
    summary: string;
    bookmarkId?: string | null;
  };
}
