export type NoteCardProps = {
  content: string;
  user: {
    name: string;
    picture: string;
    pubKey: string;
  };
  created_at: number;
  hashtags: Array<string>;
};
