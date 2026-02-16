import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import FeedLayout
from "../layouts/FeedLayout";

import FeedPage
from "../features/posts/FeedPage";

import ProfilePage
from "../features/users/ProfilePage";

import UsersPage
from "../features/users/UserPage";

import FollowersPage
from "../features/users/FollowersPage";

import FollowingPage
from "../features/users/FollowingPage";

import CreatePostPage
from "../features/posts/createPostPage";

import LoginPage
from "../features/auth/LoginPage";

import RegisterPage
from "../features/auth/RegisterPage";

import { getToken }
from "../utils/token";
import type { JSX } from "react";
import EditProfileForm from "../features/users/EditProfileForm";

function PrivateRoute({

  children

}:{

  children: JSX.Element

}){

  const token =
  getToken();

  return token

    ? children

    : <Navigate to="/login"/>;

}

export default function AppRoutes(){

  return(

    <BrowserRouter>

      <Routes>

        <Route
        path="/login"
        element={<LoginPage/>}
        />

        <Route
        path="/register"
        element={<RegisterPage/>}
        />

        <Route

        path="/"

        element={

          <PrivateRoute>

            <FeedLayout/>

          </PrivateRoute>

        }

        >

          <Route
          index
          element={<FeedPage/>}
          />

          <Route
          path="/user/:id"
          element={<ProfilePage/>}
          />
          <Route
          path="Editprofile"
          element={<EditProfileForm/>}
          />


          <Route
          path="users"
          element={<UsersPage/>}
          />

          <Route
          path="followers"
          element={<FollowersPage/>}
          />

          <Route
          path="following"
          element={<FollowingPage/>}
          />

          <Route
          path="create-post"
          element={<CreatePostPage/>}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}
