export interface AuthResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    profilePic?: string;
    followers: string[];
    following: string[];
  };
  token: string;
}
