export interface Post {

  _id: string;

  title: string;

  content: string;

  image?: string;

  author: {

    _id: string;

    username: string;

  };

  createdAt: string;

}
