import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import {
  fetchFollowers
} from "./userSlice";

export default function FollowersPage(){

  const dispatch =
  useAppDispatch();

  const followers =
  useAppSelector(
    state=>state.users.followers
  );

  useEffect(()=>{

    dispatch(fetchFollowers());

  },[]);

  return(

    <div>

      <h2>Followers</h2>

      {

        followers.map(user=>(
          <div key={user._id}>
            {user.username}
          </div>
        ))

      }

    </div>

  );

}

