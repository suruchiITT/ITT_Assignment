import {
  useAppDispatch
} from "../../app/hooks";

import {
  followUser,
  unfollowUser
} from "./userSlice";

export default function FollowButton({

  userId,

  isFollowing

}:{

  userId:string;

  isFollowing:boolean;

}){

  const dispatch =
  useAppDispatch();

  return(

    <button

    onClick={()=>{

      if(isFollowing){

        dispatch(
        unfollowUser(userId)
        );

      }

      else{

        dispatch(
        followUser(userId)
        );

      }

    }}

    >

      {

        isFollowing
        ?
        "Unfollow"
        :
        "Follow"

      }

    </button>

  );

}