interface AuthorProps {
  _id: string;
  username: string;
}

export interface PostProps {
  _id: string;
  title: string;
  author: AuthorProps;
  summary: string;
  content: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
}
