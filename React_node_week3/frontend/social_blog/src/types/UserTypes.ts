export interface User {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
  followers: string[];
  following: string[];
}
