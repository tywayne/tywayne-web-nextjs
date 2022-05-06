import { ReadTimeResults } from 'reading-time';

type PostType = {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  time: ReadTimeResults;
};

export default PostType;
