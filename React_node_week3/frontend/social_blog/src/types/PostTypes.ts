export interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePic?: string;
  };
  text: string;
}

export interface Post {
  _id: string;
  author: {
    _id: string;
    username: string;
    profilePic?: string;
  };
  title: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
}
