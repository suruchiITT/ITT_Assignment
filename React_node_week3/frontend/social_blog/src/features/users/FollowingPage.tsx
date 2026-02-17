import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import {
  fetchFollowing
} from "./userSlice";

import {
  useNavigate
} from "react-router-dom";

export default function FollowingPage(){

  const dispatch =
  useAppDispatch();

  const navigate =
  useNavigate();

  const following =
  useAppSelector(
    state=>state.users.following
  );

  useEffect(()=>{

    dispatch(fetchFollowing());

  },[dispatch]);

  return(

    <div>

      <h2>Following</h2>

      {

        following.map(user=>(

          <div

            key={user._id}

            onClick={()=>navigate(
              `/user/${user._id}`
            )}

          >

            {user.username}

          </div>

        ))

      }

    </div>

  );

}
